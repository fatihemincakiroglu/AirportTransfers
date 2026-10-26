// Ölçüm makbuzu (measurement receipt) — spec §14 "browser mirror":
// Tarayıcıdaki booking_complete yalnızca backend'in kaydından türeyen, imzalı ve
// kısa ömürlü bu makbuzla basılır. Tarayıcı kendi başına Purchase üretemez.
//
// GTM doğrulaması (iş listesi 5.3): zaman alanları UNIX SANİYE tam sayı; booking_id yalnızca
// harf/rakam/_/- ; expires_at ≤ issued_at + 60 sn; dedup_deadline_at ≤ event_time + 48 saat.
import crypto from "node:crypto";
import { fleet, VAT_RATE } from "../config";

export type Receipt = {
  kind: "backend_receipt";
  event_id: string;                // purchase_<booking_id>
  booking_id: string;              // "#" vb. olmadan (dataLayer kimliği)
  booking_type: "transfer" | "hourly";
  currency: "CHF";
  gross_value: number; net_value: number; tax_value: number;
  items: { item_id: string; item_name: string; item_category: string; item_category2: string; item_variant: string; price: number; tax_unit_value: number; gross_unit_value: number; quantity: number }[];
  issued_at: number;               // unix saniye
  expires_at: number;              // unix saniye, issued_at + 60
  dedup_deadline_at: number;       // unix saniye, satın alma anı + 48 saat (en geç şimdi + 48 saat)
  /** Gelişmiş dönüşümler: SHA-256 (normalize edilmiş) — ham veri asla gönderilmez; tarayıcı yalnızca pazarlama onayı varsa basar */
  user_data?: { sha256_email_address?: string; sha256_phone_number?: string };
  sig: string;                     // HMAC-SHA256(secret, alanlar)
};

const secret = () => process.env.AUTH_SECRET ?? process.env.CRON_SECRET ?? "";
const sec = (d: Date) => Math.floor(d.getTime() / 1000);
export const dlBookingId = (ref: string) => ref.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 100);
const sha256 = (v: string) => crypto.createHash("sha256").update(v).digest("hex");

/** E-posta: küçük harf, boşluksuz. Telefon: E.164 (+ ve rakamlar; 00 → +). Geçersizse undefined */
function hashedUserData(email?: string | null, phone?: string | null): Receipt["user_data"] {
  const out: NonNullable<Receipt["user_data"]> = {};
  const e = (email ?? "").trim().toLowerCase().replace(/\s+/g, "");
  if (/^[^@]+@[^@]+\.[a-z]{2,}$/.test(e)) out.sha256_email_address = sha256(e);
  let p = (phone ?? "").trim().replace(/^00/, "+").replace(/[^\d+]/g, "");
  if (p && !p.startsWith("+")) p = "";
  if (/^\+\d{8,15}$/.test(p)) out.sha256_phone_number = sha256(p);
  return Object.keys(out).length ? out : undefined;
}

function sign(payload: Omit<Receipt, "sig" | "user_data">): string {
  const base = [payload.event_id, payload.booking_id, payload.gross_value.toFixed(2), payload.issued_at, payload.expires_at].join("|");
  return crypto.createHmac("sha256", secret()).update(base).digest("hex");
}

export function issueReceipt(b: {
  ref: string; price: string | number | null; vehicle: string | null; dropoff: string | null;
  confirmed_at?: string | Date | null; purchased_at?: string | Date | null;
  email?: string | null; phone?: string | null;
}): Receipt {
  const gross = Math.round(Number(b.price ?? 0) * 100) / 100;
  const netC = Math.round((gross * 100) / (1 + VAT_RATE));
  const net = netC / 100, tax = Math.round(gross * 100 - netC) / 100;
  const v = b.vehicle ? fleet.find((f) => b.vehicle!.includes(f.car)) : null;
  const hourly = /Stundenmiete|Hourly hire/i.test(b.dropoff ?? "");
  const type = hourly ? "hourly" : "transfer";
  const id = dlBookingId(b.ref);
  const now = new Date();
  const anchorRaw = b.purchased_at ?? b.confirmed_at;
  const anchor = anchorRaw ? new Date(anchorRaw) : now;
  const payload: Omit<Receipt, "sig" | "user_data"> = {
    kind: "backend_receipt", event_id: `purchase_${id}`, booking_id: id, booking_type: type, currency: "CHF",
    gross_value: gross, net_value: net, tax_value: tax,
    items: v ? [{
      item_id: `${type}_${v.id}`, item_name: type === "hourly" ? "Hourly Chauffeur" : "Private Transfer", item_category: type,
      item_category2: v.id.replace(/_[a-z]$/, ""), item_variant: v.id, price: net, tax_unit_value: tax, gross_unit_value: gross, quantity: 1,
    }] : [],
    issued_at: sec(now),
    expires_at: sec(now) + 60,
    // event_time (= şimdi) + 48 saati geçemez
    dedup_deadline_at: Math.min(sec(anchor) + 48 * 3600, sec(now) + 48 * 3600),
  };
  const ud = hashedUserData(b.email, b.phone);
  return { ...payload, ...(ud ? { user_data: ud } : {}), sig: sign(payload) };
}

export function verifyReceipt(r: Receipt): boolean {
  const { sig, user_data: _ud, ...payload } = r;
  void _ud;
  return sig === sign(payload) && r.expires_at * 1000 > Date.now();
}
