// Siteden gelen rezervasyon talebini kaydeder (WhatsApp/e-posta akışına ek olarak).
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, logEvent } from "../../lib/db";
import { sendBookingMail } from "../../lib/mail";
import { captureMeasurement } from "../../lib/measurement";
import { serverPriceAsync } from "../../lib/pricing";

export const runtime = "nodejs";

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.slice(0, max) : null);
const num = (v: unknown) => (typeof v === "number" && isFinite(v) ? v : null);

export async function POST(req: NextRequest) {
  if (!dbReady) return NextResponse.json({ ok: false, reason: "db-off" }, { status: 200 });
  try {
    const b = await req.json();
    const ref = str(b.ref, 32);
    if (!ref) return NextResponse.json({ ok: false }, { status: 400 });

    await ensureSchema();
    const mm = captureMeasurement(req, b); // onay + kimlik anlık görüntüsü (yalnızca izinli alanlar)
    await sql`
      INSERT INTO bookings (
        ref, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
        pax, luggage, vehicle, price, payment,
        first_name, last_name, email, phone, flight, nameboard, extras, notes,
        ga_client_id, ga_session_id, fbp, fbc, client_ip, client_ua, consent, source_url
      ) VALUES (
        ${ref}, ${str(b.lang, 5)}, ${str(b.channel, 20)}, ${str(b.pickup)}, ${str(b.dropoff)},
        ${str(b.stops)}, ${str(b.date, 20)}, ${str(b.time, 10)},
        ${num(b.pax)}, ${num(b.luggage)}, ${str(b.vehicle, 120)}, ${(await serverPriceAsync(b)) ?? num(b.price)}, ${str(b.payment, 40)},
        ${str(b.firstName, 80)}, ${str(b.lastName, 80)}, ${str(b.email, 160)}, ${str(b.phone, 40)},
        ${str(b.flight, 40)}, ${str(b.nameboard, 120)}, ${str(b.extras, 200)}, ${str(b.notes, 1000)},
        ${mm.ga_client_id}, ${mm.ga_session_id}, ${mm.fbp}, ${mm.fbc}, ${mm.client_ip}, ${mm.client_ua},
        ${sql.json(mm.consent)}, ${mm.source_url}
      )
      ON CONFLICT (ref) DO UPDATE SET
        ga_client_id = COALESCE(bookings.ga_client_id, EXCLUDED.ga_client_id),
        ga_session_id= COALESCE(bookings.ga_session_id, EXCLUDED.ga_session_id),
        fbp          = COALESCE(bookings.fbp, EXCLUDED.fbp),
        fbc          = COALESCE(bookings.fbc, EXCLUDED.fbc),
        client_ip    = COALESCE(bookings.client_ip, EXCLUDED.client_ip),
        client_ua    = COALESCE(bookings.client_ua, EXCLUDED.client_ua),
        consent      = COALESCE(bookings.consent, EXCLUDED.consent),
        source_url   = COALESCE(bookings.source_url, EXCLUDED.source_url),
        channel   = EXCLUDED.channel,
        pickup    = COALESCE(EXCLUDED.pickup, bookings.pickup),
        dropoff   = COALESCE(EXCLUDED.dropoff, bookings.dropoff),
        stops     = COALESCE(EXCLUDED.stops, bookings.stops),
        ride_date = COALESCE(EXCLUDED.ride_date, bookings.ride_date),
        ride_time = COALESCE(EXCLUDED.ride_time, bookings.ride_time),
        pax       = COALESCE(EXCLUDED.pax, bookings.pax),
        luggage   = COALESCE(EXCLUDED.luggage, bookings.luggage),
        vehicle   = COALESCE(EXCLUDED.vehicle, bookings.vehicle),
        price     = COALESCE(EXCLUDED.price, bookings.price),
        payment   = COALESCE(EXCLUDED.payment, bookings.payment),
        first_name= COALESCE(EXCLUDED.first_name, bookings.first_name),
        last_name = COALESCE(EXCLUDED.last_name, bookings.last_name),
        email     = COALESCE(EXCLUDED.email, bookings.email),
        phone     = COALESCE(EXCLUDED.phone, bookings.phone),
        flight    = COALESCE(EXCLUDED.flight, bookings.flight),
        extras    = COALESCE(EXCLUDED.extras, bookings.extras),
        notes     = COALESCE(EXCLUDED.notes, bookings.notes),
        updated_at= now()`;

    const isDraft = str(b.channel, 20) === "taslak";
    if (!isDraft) await logEvent(
      "booking_new",
      `Yeni rezervasyon talebi: ${ref} · ${str(b.pickup) ?? "—"} → ${str(b.dropoff) ?? "—"} · ${str(b.date, 20) ?? ""} ${str(b.time, 10) ?? ""}` +
        (b.price ? ` · CHF ${Number(b.price).toFixed(2)}` : "") +
        ` (${str(b.channel, 20) ?? "site"})`,
      { actor: "site", ref, ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined },
    );

    // Bildirim e-postası yalnızca müşteri talebi gönderdiğinde
    if (!isDraft) {
      const [saved] = (await sql`SELECT id FROM bookings WHERE ref = ${ref}`) as unknown as { id: number }[];
      await sendBookingMail(b, saved?.id);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/bookings]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
