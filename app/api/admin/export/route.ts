// Panelden CSV dışa aktarma (Excel uyumlu: BOM + noktalı virgül)
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { dlBookingId, hashedUserData } from "../../../lib/receipt";
import { isTestRecord } from "../../../lib/ads-click";

export const runtime = "nodejs";

const cell = (v: unknown) => {
  if (v === null || v === undefined) return "";
  const s = String(v).replace(/"/g, '""').replace(/\r?\n/g, " ");
  return `"${s}"`;
};

export async function GET(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  await ensureSchema();

  const t = req.nextUrl.searchParams.get("type");
  if (t === "ads_conversions") return adsConversions();
  const type = t === "contacts" ? "contacts" : t === "wa_refs" ? "wa_refs" : "bookings";
  let head: string[]; let rows: Record<string, unknown>[];

  if (type === "wa_refs") {
    // Google Ads offline dönüşüm yüklemesi için ham liste (dönüşüm adı/değeri satış kapanınca eklenir)
    head = ["Ref", "GCLID", "GBRAID", "WBRAID", "İlk görülme", "Son tıklama", "utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content", "Giriş sayfası", "Son sayfa", "Dil", "Tık"];
    const r = await sql`SELECT ref, gclid, gbraid, wbraid, created_at, last_click_at, utm_source, utm_medium, utm_campaign, utm_id, utm_term, utm_content, landing_page, last_page, lang, clicks
                        FROM wa_refs ORDER BY last_click_at DESC`;
    rows = r as unknown as Record<string, unknown>[];
  } else if (type === "contacts") {
    head = ["Tarih", "Dil", "Ad", "E-posta", "Telefon", "Mesaj"];
    const r = await sql`SELECT created_at, lang, name, email, phone, message FROM contacts ORDER BY created_at DESC`;
    rows = r as unknown as Record<string, unknown>[];
  } else {
    head = ["Ref", "Durum", "Kayıt", "Yolculuk", "Saat", "Nereden", "Nereye", "Ara duraklar",
            "Ad", "Soyad", "E-posta", "Telefon", "Uçuş", "Yolcu", "Bagaj", "Araç", "Tutar (CHF)",
            "Ödeme", "Ekstralar", "Not", "Panel notu", "Fatura no", "Dil", "Kanal"];
    const r = await sql`
      SELECT ref, status, created_at, ride_date, ride_time, pickup, dropoff, stops,
             first_name, last_name, email, phone, flight, pax, luggage, vehicle, price,
             payment, extras, notes, admin_note, invoice_no, lang, channel
      FROM bookings ORDER BY created_at DESC`;
    rows = r as unknown as Record<string, unknown>[];
  }

  const body = [
    head.map(cell).join(";"),
    ...rows.map((r) => Object.values(r).map((v) => cell(v instanceof Date ? v.toISOString().slice(0, 16).replace("T", " ") : v)).join(";")),
  ].join("\r\n");

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse("\uFEFF" + body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${type}-${stamp}.csv"`,
    },
  });
}

// ── Google Ads offline dönüşüm dışa aktarması (Seoroas talebi 08.11.2026, bölüm 3.4) ──────────
// Standart CSV (virgül, UTF-8, BOM yok) — reklamcının API betiği okur. Son 120 gün.
// Her satır bir web rezervasyonu ya da bir WhatsApp Ref kaydı. Ham e-posta/telefon YOK; hash yalnızca izinlilerde.

/** ISO 8601, Europe/Zurich ofsetiyle: 2026-11-05T09:30:00+01:00 */
function zurichIso(d: Date | string | null): string {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "";
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(dt).map((x) => [x.type, x.value]));
  const local = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  const off = Math.round((local - Math.floor(dt.getTime() / 1000) * 1000) / 60000);
  const sign = off >= 0 ? "+" : "-", a = Math.abs(off);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}${sign}${String(Math.floor(a / 60)).padStart(2, "0")}:${String(a % 60).padStart(2, "0")}`;
}
const csv = (v: unknown) => {
  if (v === null || v === undefined || v === "") return "";
  const s = String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const STATUS: Record<string, string> = { done: "completed", cancelled: "cancelled", rejected: "cancelled", no_show: "no_show", confirmed: "confirmed", new: "pending" };

async function adsConversions() {
  const bookings = (await sql`
    SELECT ref, status, price, collected_chf, email, phone, first_name, last_name, consent,
           gclid, gbraid, wbraid, click_landing_at, created_at, completed_at, paid_at,
           CASE WHEN ride_date ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' AND coalesce(ride_time, '') ~ '^[0-9]{2}:[0-9]{2}'
                THEN (ride_date || ' ' || substring(ride_time, 1, 5))::timestamp AT TIME ZONE 'Europe/Zurich' END AS ride_at
    FROM bookings
    WHERE coalesce(source, 'site') = 'site' AND coalesce(channel, '') <> 'taslak'
      AND created_at > now() - interval '120 days'
    ORDER BY created_at`) as unknown as {
      ref: string; status: string; price: string | null; collected_chf: string | null; email: string | null; phone: string | null;
      first_name: string | null; last_name: string | null; consent: { ad_user_data?: string } | null;
      gclid: string | null; gbraid: string | null; wbraid: string | null; click_landing_at: Date | null;
      created_at: Date; completed_at: Date | null; paid_at: Date | null; ride_at: Date | null;
    }[];
  const refs = (await sql`
    SELECT ref, gclid, gbraid, wbraid, captured_at, created_at, sale_status, sale_value_chf, sale_at, marketing_consent, is_test
    FROM wa_refs
    WHERE coalesce(sale_at, last_click_at) > now() - interval '120 days'
    ORDER BY created_at`) as unknown as {
      ref: string; gclid: string | null; gbraid: string | null; wbraid: string | null; captured_at: Date | null; created_at: Date;
      sale_status: string | null; sale_value_chf: string | null; sale_at: Date | null; marketing_consent: boolean | null; is_test: boolean;
    }[];

  const head = ["record_type", "order_id", "gclid", "gbraid", "wbraid", "click_landing_at", "conversion_at", "status", "value_chf",
    "email_sha256", "phone_sha256", "marketing_consent", "test", "record_created_at"];
  const lines: string[] = [head.join(",")];

  for (const b of bookings) {
    const consent = b.consent?.ad_user_data === "granted";
    const status = STATUS[b.status] ?? b.status;
    const completed = status === "completed";
    const value = completed ? Number(b.collected_chf ?? b.price ?? 0) : Number(b.price ?? 0);
    // Satış anı: "Tamamlandı" işareti → yoksa ödeme anı → yoksa yolculuk saati
    const convAt = completed ? (b.completed_at ?? b.paid_at ?? b.ride_at) : null;
    const ud = consent ? hashedUserData(b.email, b.phone) : undefined;
    lines.push([
      "booking", dlBookingId(b.ref), b.gclid, b.gbraid, b.wbraid, zurichIso(b.click_landing_at), zurichIso(convAt), status,
      value > 0 ? value.toFixed(2) : "", ud?.sha256_email_address, ud?.sha256_phone_number, consent ? "true" : "false",
      isTestRecord(b) ? "true" : "false", zurichIso(b.created_at),
    ].map(csv).join(","));
  }
  for (const r of refs) {
    const status = r.sale_status === "sale" ? "completed" : r.sale_status === "no_sale" ? "cancelled" : "pending";
    lines.push([
      "whatsapp", r.ref, r.gclid, r.gbraid, r.wbraid, zurichIso(r.captured_at ?? r.created_at), zurichIso(r.sale_at), status,
      r.sale_value_chf ? Number(r.sale_value_chf).toFixed(2) : "", "", "", r.marketing_consent ? "true" : "false",
      r.is_test || isTestRecord(r) ? "true" : "false", zurichIso(r.created_at),
    ].map(csv).join(","));
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="google-ads-donusum-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
