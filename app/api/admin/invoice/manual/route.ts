// Sistem dışı fatura: panelden girilen bilgilerle "tamamlandı" durumunda manuel kayıt
// oluşturur (ref F… = fatura), fatura numarası atar ve kaydın id'sini döner.
// Takvime yazılmaz, müşteriye e-posta gitmez, ölçüm hedeflerine gönderilmez (web dışı kanal).
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../../../lib/db";
import { assignInvoiceNo } from "../../../../lib/invoice";

export const runtime = "nodejs";

const str = (v: unknown, max = 200) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Geçersiz istek" }, { status: 400 });

  const price = Number(b.price);
  const required: [string, unknown][] = [
    ["Ad", b.first_name], ["Soyad", b.last_name], ["E-posta", b.email], ["Telefon", b.phone],
    ["Ödeme tipi", b.payment], ["Araç", b.vehicle], ["Alış konumu", b.pickup], ["Bırakış konumu", b.dropoff],
    ["Alış tarihi", b.ride_date], ["Alış saati", b.ride_time],
  ];
  const missing = required.filter(([, v]) => !str(v)).map(([k]) => k);
  if (!Number.isFinite(price) || price <= 0) missing.push("Toplam tutar");
  if (missing.length) return NextResponse.json({ ok: false, error: `Eksik: ${missing.join(", ")}` }, { status: 400 });

  await ensureSchema();
  const ref = "F" + Math.random().toString(16).slice(2, 9).toUpperCase();
  await sql`
    INSERT INTO bookings (ref, status, source, channel, lang, pickup, dropoff,
      ride_date, ride_time, vehicle, price, payment, payment_status,
      first_name, last_name, email, phone, admin_note)
    VALUES (${ref}, 'done', 'panel', 'manuel fatura', 'de',
      ${str(b.pickup, 300)}, ${str(b.dropoff, 300)},
      ${str(b.ride_date, 20)}, ${str(b.ride_time, 10)},
      ${str(b.vehicle, 120)}, ${Math.round(price * 100) / 100}, ${str(b.payment, 40)}, 'paid',
      ${str(b.first_name, 80)}, ${str(b.last_name, 80)}, ${str(b.email, 160)}, ${str(b.phone, 40)},
      'Sistem dışı fatura — panelden elle girildi')`;
  const [created] = (await sql`SELECT id FROM bookings WHERE ref = ${ref}`) as unknown as { id: number }[];
  if (!created) return NextResponse.json({ ok: false, error: "Kayıt oluşturulamadı" }, { status: 500 });

  await logEvent("booking_manual", `Sistem dışı fatura kaydı: ${ref} · ${str(b.pickup) ?? "—"} → ${str(b.dropoff) ?? "—"} (CHF ${price.toFixed(2)})`, { actor: "panel", ref });
  const no = await assignInvoiceNo(created.id);
  return NextResponse.json({ ok: true, id: created.id, ref, no });
}
