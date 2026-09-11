// Stripe ödeme bildirimi: ödeme tamamlanınca kaydı "ödendi" yapar
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../../lib/db";
import { verifyWebhook } from "../../../lib/stripe";
import { sendBookingMail } from "../../../lib/mail";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  if (!verifyWebhook(payload, req.headers.get("stripe-signature"))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!dbReady) return NextResponse.json({ received: true });

  const event = JSON.parse(payload);
  if (event.type !== "checkout.session.completed") return NextResponse.json({ received: true });

  const s = event.data.object;
  const ref = s.metadata?.ref ?? s.client_reference_id;
  const intent = s.payment_intent;
  if (!ref) return NextResponse.json({ received: true });

  await ensureSchema();
  await sql`
    UPDATE bookings
    SET payment_status = 'paid', stripe_intent = ${intent ?? null}, paid_at = now(), updated_at = now()
    WHERE ref = ${ref}`;

  const [b] = (await sql`
    SELECT id, ref, lang, pickup, dropoff, stops, ride_date, ride_time, pax, luggage,
           vehicle, price, payment, first_name, last_name, email, phone, flight, extras, notes
    FROM bookings WHERE ref = ${ref}`) as unknown as Record<string, unknown>[];

  await logEvent("payment_paid", `${ref} için ödeme alındı (CHF ${Number(b?.price ?? 0).toFixed(2)})`, { actor: "site", ref: String(ref) });

  // Ödeme tamamlandığında bildirim maili (kabul/ret düğmeleriyle)
  if (b) {
    await sendBookingMail(
      {
        ref: b.ref, lang: b.lang, channel: "online ödeme",
        pickup: b.pickup, dropoff: b.dropoff, stops: b.stops,
        date: b.ride_date, time: b.ride_time, pax: b.pax, luggage: b.luggage,
        vehicle: b.vehicle, price: b.price, payment: "Online ödendi ✓",
        firstName: b.first_name, lastName: b.last_name, email: b.email, phone: b.phone,
        flight: b.flight, extras: b.extras, notes: b.notes,
      },
      Number(b.id),
    );
  }

  return NextResponse.json({ received: true });
}
