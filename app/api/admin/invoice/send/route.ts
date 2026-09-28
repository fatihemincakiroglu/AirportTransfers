// Faturayı PDF olarak üretir, müşteriye ve işletmeye e-postayla gönderir, gönderim zamanını kaydeder
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "../../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../../../lib/db";
import { renderInvoicePdf, type InvoiceRow } from "../../../../lib/invoice-pdf";
import { sendInvoiceMail } from "../../../../lib/mail";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false, error: "Veritabanı yok" }, { status: 503 });
  const { id } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ ok: false, error: "Kayıt yok" }, { status: 400 });
  await ensureSchema();

  const [b] = (await sql`
    SELECT ref, invoice_no, invoiced_at, price, payment, vehicle, status, lang,
           pickup, dropoff, stops, ride_date, ride_time, pax, first_name, last_name, email, phone
    FROM bookings WHERE id = ${Number(id)}`) as unknown as (InvoiceRow & { lang: string | null })[];
  if (!b || !b.invoice_no) return NextResponse.json({ ok: false, error: "Önce fatura oluşturulmalı" }, { status: 400 });

  try {
    const pdf = await renderInvoicePdf(b);
    const r = await sendInvoiceMail({ ...b, invoice_no: b.invoice_no }, pdf);
    if (r.customer || r.office) await sql`UPDATE bookings SET invoice_sent_at = now() WHERE id = ${Number(id)}`;
    await logEvent("invoice_mail", `${b.ref}: fatura ${b.invoice_no} e-postayla gönderildi (müşteri: ${r.customer ? b.email : "hayır"}, kopya: ${r.office ? "evet" : "hayır"})`, { actor: "panel", ref: b.ref });
    if (!r.customer && !r.office) return NextResponse.json({ ok: false, error: "E-posta gönderilemedi (SMTP ayarlarını kontrol edin)" }, { status: 500 });
    return NextResponse.json({ ok: true, customer: r.customer, office: r.office, email: b.email });
  } catch (e) {
    console.error("[invoice] gönderim", e);
    return NextResponse.json({ ok: false, error: "PDF üretilemedi" }, { status: 500 });
  }
}
