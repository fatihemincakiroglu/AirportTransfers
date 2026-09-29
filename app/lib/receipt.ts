// Ölçüm makbuzu (measurement receipt) — spec §14 "browser mirror":
// Tarayıcıdaki booking_complete yalnızca backend'in "confirmed" kaydından türeyen, imzalı ve
// kısa ömürlü bu makbuzla basılır. Tarayıcı kendi başına Purchase üretemez.
import crypto from "node:crypto";
import { fleet, VAT_RATE } from "../config";

export type Receipt = {
  kind: "backend_receipt";
  event_id: string;                // purchase_<ref>
  booking_id: string;
  booking_type: "transfer" | "hourly";
  currency: "CHF";
  gross_value: number; net_value: number; tax_value: number;
  items: { item_id: string; item_name: string; item_category: string; item_category2: string; item_variant: string; price: number; quantity: number }[];
  issued_at: string;               // ISO
  expires_at: string;              // makbuz geçerliliği (24 saat)
  dedup_deadline_at: string;       // browser mirror için son an (48 saat)
  sig: string;                     // HMAC-SHA256(secret, alanlar)
};

const secret = () => process.env.AUTH_SECRET ?? process.env.CRON_SECRET ?? "";

function sign(payload: Omit<Receipt, "sig">): string {
  const base = [payload.event_id, payload.booking_id, payload.gross_value.toFixed(2), payload.issued_at, payload.expires_at].join("|");
  return crypto.createHmac("sha256", secret()).update(base).digest("hex");
}

export function issueReceipt(b: { ref: string; price: string | number | null; vehicle: string | null; dropoff: string | null; confirmed_at?: string | null }): Receipt {
  const gross = Math.round(Number(b.price ?? 0) * 100) / 100;
  const netC = Math.round((gross * 100) / (1 + VAT_RATE));
  const net = netC / 100, tax = Math.round(gross * 100 - netC) / 100;
  const v = b.vehicle ? fleet.find((f) => b.vehicle!.includes(f.car)) : null;
  const hourly = /Stundenmiete|Hourly hire/i.test(b.dropoff ?? "");
  const type = hourly ? "hourly" : "transfer";
  const issued = new Date();
  const anchor = b.confirmed_at ? new Date(b.confirmed_at) : issued;
  const payload: Omit<Receipt, "sig"> = {
    kind: "backend_receipt", event_id: `purchase_${b.ref}`, booking_id: b.ref, booking_type: type, currency: "CHF",
    gross_value: gross, net_value: net, tax_value: tax,
    items: v ? [{ item_id: `${type}_${v.id}`, item_name: type === "hourly" ? "Hourly Chauffeur" : "Private Transfer", item_category: type, item_category2: v.id.replace(/_[a-z]$/, ""), item_variant: v.id, price: net, quantity: 1 }] : [],
    issued_at: issued.toISOString(),
    expires_at: new Date(issued.getTime() + 24 * 3600_000).toISOString(),
    dedup_deadline_at: new Date(anchor.getTime() + 48 * 3600_000).toISOString(),
  };
  return { ...payload, sig: sign(payload) };
}

export function verifyReceipt(r: Receipt): boolean {
  const { sig, ...payload } = r;
  return sig === sign(payload) && new Date(r.expires_at).getTime() > Date.now();
}
