// Rezervasyonu kaydeder ve Stripe ödeme sayfasını hazırlar
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../lib/db";
import { createCheckout, stripeReady } from "../../lib/stripe";
import { SITE_URL } from "../../config";

export const runtime = "nodejs";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max) : null);
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);

export async function POST(req: NextRequest) {
  if (!dbReady || !stripeReady()) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }
  try {
    const b = await req.json();
    const ref = str(b.ref, 32);
    const amount = num(b.price);
    if (!ref || !amount || amount <= 0) return NextResponse.json({ ok: false }, { status: 400 });

    await ensureSchema();

    // Kaydı oluştur/güncelle — ödeme beklemede
    await sql`
      INSERT INTO bookings (
        ref, lang, channel, payment_status, pickup, dropoff, stops, ride_date, ride_time,
        pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
        flight, nameboard, extras, notes
      ) VALUES (
        ${ref}, ${str(b.lang, 5)}, 'site', 'pending', ${str(b.pickup)}, ${str(b.dropoff)}, ${str(b.stops)},
        ${str(b.date, 20)}, ${str(b.time, 10)}, ${num(b.pax)}, ${num(b.luggage)},
        ${str(b.vehicle, 120)}, ${amount}, 'Online (Stripe)',
        ${str(b.firstName, 80)}, ${str(b.lastName, 80)}, ${str(b.email, 160)}, ${str(b.phone, 40)},
        ${str(b.flight, 40)}, ${str(b.nameboard, 120)}, ${str(b.extras, 200)}, ${str(b.notes, 1000)}
      )
      ON CONFLICT (ref) DO UPDATE SET
        payment_status = 'pending', price = EXCLUDED.price, payment = 'Online (Stripe)',
        pickup = COALESCE(EXCLUDED.pickup, bookings.pickup),
        dropoff = COALESCE(EXCLUDED.dropoff, bookings.dropoff),
        ride_date = COALESCE(EXCLUDED.ride_date, bookings.ride_date),
        ride_time = COALESCE(EXCLUDED.ride_time, bookings.ride_time),
        first_name = COALESCE(EXCLUDED.first_name, bookings.first_name),
        last_name = COALESCE(EXCLUDED.last_name, bookings.last_name),
        email = COALESCE(EXCLUDED.email, bookings.email),
        phone = COALESCE(EXCLUDED.phone, bookings.phone),
        updated_at = now()`;

    const [row] = (await sql`SELECT id FROM bookings WHERE ref = ${ref}`) as unknown as { id: number }[];
    const lang = str(b.lang, 5) ?? "en";

    const session = await createCheckout({
      ref,
      bookingId: row?.id ?? 0,
      amount,
      description: `${str(b.pickup) ?? ""} → ${str(b.dropoff) ?? ""} · ${str(b.date, 20) ?? ""} ${str(b.time, 10) ?? ""}`,
      email: str(b.email, 160),
      lang,
      successUrl: `${SITE_URL}/${lang}/buchung?paid=${encodeURIComponent(ref)}`,
      cancelUrl: `${SITE_URL}/${lang}/buchung?canceled=1`,
    });

    if (!session) return NextResponse.json({ ok: false, reason: "stripe-error" }, { status: 200 });

    await sql`UPDATE bookings SET stripe_session = ${session.id} WHERE ref = ${ref}`;
    await logEvent("payment_start", `${ref} için ödeme sayfası açıldı (CHF ${amount.toFixed(2)})`, { actor: "site", ref });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error("[api/checkout]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
