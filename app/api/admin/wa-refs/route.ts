// Panel: WhatsApp Ref kaydına satış sonucu girme (offline dönüşüm — Seoroas talebi 08.11.2026).
// Operatör WhatsApp mesajındaki "Ref: XXXXXX" kodunu bulur → "satış oldu (tutar, tarih)" / "satış olmadı" / "test".
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent } from "../../../lib/db";

export const runtime = "nodejs";

/** İsviçre saatiyle girilen tarih/saat → gerçek an (yaz/kış saati dahil; sunucu saat diliminden bağımsız) */
function zurichToDate(date: string, time: string): Date {
  const [y, mo, d] = date.split("-").map(Number), [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const offsetAt = (ms: number) => {
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(ms / 60000) * 60000;
  };
  let t = guess - offsetAt(guess);
  t = guess - offsetAt(t); // DST sınırında ikinci tur
  return new Date(t);
}

export async function PATCH(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const ref = typeof b?.ref === "string" && /^[A-Z2-9]{6}$/.test(b.ref) ? b.ref : null;
  if (!b || !ref) return NextResponse.json({ ok: false, error: "Geçersiz Ref" }, { status: 400 });
  await ensureSchema();

  // Yalnızca test işareti
  if (typeof b.is_test === "boolean" && b.sale_status === undefined) {
    await sql`UPDATE wa_refs SET is_test = ${b.is_test} WHERE ref = ${ref}`;
    return NextResponse.json({ ok: true });
  }

  const status = b.sale_status === "sale" || b.sale_status === "no_sale" ? b.sale_status : b.sale_status === null ? null : undefined;
  if (status === undefined) return NextResponse.json({ ok: false, error: "Geçersiz durum" }, { status: 400 });
  const note = typeof b.note === "string" ? b.note.trim().slice(0, 300) || null : null;

  if (status === "sale") {
    const value = Number(b.value);
    if (!(value > 0 && value < 100000)) return NextResponse.json({ ok: false, error: "Tutar girin (CHF)" }, { status: 400 });
    const date = typeof b.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.date) ? b.date : null;
    const time = typeof b.time === "string" && /^\d{2}:\d{2}$/.test(b.time) ? b.time : "12:00";
    if (!date) return NextResponse.json({ ok: false, error: "Satış tarihini girin" }, { status: 400 });
    // Satış anı İsviçre saatiyle girilir; Google Ads kuralı: tıklamadan SONRA olmalı
    const saleAt = zurichToDate(date, time);
    const [row] = (await sql`SELECT created_at FROM wa_refs WHERE ref = ${ref}`) as unknown as { created_at: Date }[];
    if (!row) return NextResponse.json({ ok: false, error: "Ref bulunamadı" }, { status: 404 });
    // WhatsApp tıklaması (kayıt anı) ile aynı dakika içinde girilebilsin diye dakika hassasiyetinde karşılaştırılır
    if (saleAt.getTime() < Math.floor(new Date(row.created_at).getTime() / 60000) * 60000)
      return NextResponse.json({ ok: false, error: "Satış tarihi, WhatsApp tıklamasından önce olamaz" }, { status: 400 });
    if (saleAt.getTime() > Date.now() + 36 * 3600_000)
      return NextResponse.json({ ok: false, error: "Satış tarihi gelecekte olamaz" }, { status: 400 });
    await sql`
      UPDATE wa_refs SET sale_status = 'sale', sale_value_chf = ${value}, sale_at = ${saleAt},
        sale_note = ${note}, sale_marked_at = now()
      WHERE ref = ${ref}`;
    await logEvent("wa_sale", `WhatsApp Ref ${ref}: satış girildi (CHF ${value.toFixed(2)}, ${date} ${time})`, { actor: "panel" });
  } else if (status === "no_sale") {
    await sql`UPDATE wa_refs SET sale_status = 'no_sale', sale_value_chf = NULL, sale_at = NULL, sale_note = ${note}, sale_marked_at = now() WHERE ref = ${ref}`;
    await logEvent("wa_sale", `WhatsApp Ref ${ref}: satış olmadı olarak işaretlendi`, { actor: "panel" });
  } else {
    await sql`UPDATE wa_refs SET sale_status = NULL, sale_value_chf = NULL, sale_at = NULL, sale_note = NULL, sale_marked_at = NULL WHERE ref = ${ref}`;
    await logEvent("wa_sale", `WhatsApp Ref ${ref}: satış kaydı geri alındı`, { actor: "panel" });
  }
  return NextResponse.json({ ok: true });
}
