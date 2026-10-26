// Panelden CSV dışa aktarma (Excel uyumlu: BOM + noktalı virgül)
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";

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
