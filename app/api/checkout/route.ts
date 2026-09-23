// Rezervasyonu kaydeder ve Stripe ödeme sayfasını hazırlar
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../lib/db";
import { createCheckout, stripeReady } from "../../lib/stripe";
import { SITE_URL } from "../../config";
import { captureMeasurement } from "../../lib/measurement";
import { serverPriceAsync } from "../../lib/pricing";

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
    // Sabit rota / saatlik: tarifeden yeniden hesapla; özel güzergâh: tarayıcı tahmini
    const realPrice = (await serverPriceAsync(b)) ?? num(b.price);
    let amount = realPrice;
    // Canlı ödeme testi: CHECKOUT_TEST_EMAIL tanımlıysa ve müşteri e-postası ona eşitse Stripe'a CHF 1.00 gider.
    // Kayıt gerçek fiyatla tutulur; log satırı bunu belirtir. Test bitince Vercel'den değişkeni sil.
    const testEmail = (process.env.CHECKOUT_TEST_EMAIL ?? "").trim().toLowerCase();
    const isTestPayment = Boolean(testEmail) && typeof b.email === "string" && b.email.trim().toLowerCase() === testEmail;
    if (isTestPayment) amount = 1;
    if (!ref || !amount || amount <= 0) return NextResponse.json({ ok: false }, { status: 400 });

    await ensureSchema();
    const mm = captureMeasurement(req, b); // onay + kimlik anlık görüntüsü (yalnızca izinli alanlar)

    // Kaydı oluştur/güncelle — ödeme beklemede
    await sql`
      INSERT INTO bookings (
        ref, lang, channel, payment_status, pickup, dropoff, stops, ride_date, ride_time,
        pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
        flight, nameboard, extras, notes,
        ga_client_id, ga_session_id, fbp, fbc, client_ip, client_ua, consent, source_url
      ) VALUES (
        ${ref}, ${str(b.lang, 5)}, 'site', 'pending', ${str(b.pickup)}, ${str(b.dropoff)}, ${str(b.stops)},
        ${str(b.date, 20)}, ${str(b.time, 10)}, ${num(b.pax)}, ${num(b.luggage)},
        ${str(b.vehicle, 120)}, ${realPrice}, 'Online (Stripe)',
        ${str(b.firstName, 80)}, ${str(b.lastName, 80)}, ${str(b.email, 160)}, ${str(b.phone, 40)},
        ${str(b.flight, 40)}, ${str(b.nameboard, 120)}, ${str(b.extras, 200)}, ${str(b.notes, 1000)},
        ${mm.ga_client_id}, ${mm.ga_session_id}, ${mm.fbp}, ${mm.fbc}, ${mm.client_ip}, ${mm.client_ua},
        ${sql.json(mm.consent)}, ${mm.source_url}
      )
      ON CONFLICT (ref) DO UPDATE SET
        ga_client_id = COALESCE(EXCLUDED.ga_client_id, bookings.ga_client_id),
        ga_session_id= COALESCE(EXCLUDED.ga_session_id, bookings.ga_session_id),
        fbp          = COALESCE(EXCLUDED.fbp, bookings.fbp),
        fbc          = COALESCE(EXCLUDED.fbc, bookings.fbc),
        client_ip    = COALESCE(EXCLUDED.client_ip, bookings.client_ip),
        client_ua    = COALESCE(EXCLUDED.client_ua, bookings.client_ua),
        consent      = COALESCE(EXCLUDED.consent, bookings.consent),
        source_url   = COALESCE(EXCLUDED.source_url, bookings.source_url),
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
    await logEvent("payment_start", `${ref} için ödeme sayfası açıldı (CHF ${amount.toFixed(2)})${isTestPayment ? " — TEST ÖDEMESİ (CHECKOUT_TEST_EMAIL)" : ""}`, { actor: "site", ref });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error("[api/checkout]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
