// Siteden gelen rezervasyon talebini kaydeder (WhatsApp/e-posta akışına ek olarak).
import { NextRequest, NextResponse } from "next/server";
import { sql, ensureSchema, dbReady, logEvent } from "../../lib/db";
import { sendBookingMail } from "../../lib/mail";

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
    await sql`
      INSERT INTO bookings (
        ref, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
        pax, luggage, vehicle, price, payment,
        first_name, last_name, email, phone, flight, nameboard, extras, notes
      ) VALUES (
        ${ref}, ${str(b.lang, 5)}, ${str(b.channel, 20)}, ${str(b.pickup)}, ${str(b.dropoff)},
        ${str(b.stops)}, ${str(b.date, 20)}, ${str(b.time, 10)},
        ${num(b.pax)}, ${num(b.luggage)}, ${str(b.vehicle, 120)}, ${num(b.price)}, ${str(b.payment, 40)},
        ${str(b.firstName, 80)}, ${str(b.lastName, 80)}, ${str(b.email, 160)}, ${str(b.phone, 40)},
        ${str(b.flight, 40)}, ${str(b.nameboard, 120)}, ${str(b.extras, 200)}, ${str(b.notes, 1000)}
      )
      ON CONFLICT (ref) DO NOTHING`;

    await logEvent(
      "booking_new",
      `Yeni rezervasyon talebi: ${ref} · ${str(b.pickup) ?? "—"} → ${str(b.dropoff) ?? "—"} · ${str(b.date, 20) ?? ""} ${str(b.time, 10) ?? ""}` +
        (b.price ? ` · CHF ${Number(b.price).toFixed(2)}` : "") +
        ` (${str(b.channel, 20) ?? "site"})`,
      { actor: "site", ref, ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined },
    );

    // Bildirim e-postası (yapılandırılmışsa) — kaydı bekletmez
    await sendBookingMail(b);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/bookings]", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
