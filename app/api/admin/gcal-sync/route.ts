// Mevcut kabul edilmiş yolculukları toplu olarak Google Takvim'e aktarır
import { NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sql, ensureSchemaSafe as ensureSchema, logEvent, dbReady } from "../../../lib/db";
import { syncBooking, gcalReady, type CalBooking } from "../../../lib/gcal";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST() {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });
  if (!dbReady) return NextResponse.json({ ok: false, reason: "db-off" });
  if (!gcalReady()) return NextResponse.json({ ok: false, reason: "not-configured" });

  await ensureSchema();
  const rows = (await sql`
    SELECT id, ref, status, pickup, dropoff, stops, ride_date, ride_time, pax, luggage,
           vehicle, price, payment, first_name, last_name, phone, email, flight,
           notes, admin_note, google_event_id
    FROM bookings
    WHERE status IN ('confirmed','done')
      AND ride_date >= to_char(now() - interval '7 days', 'YYYY-MM-DD')
    ORDER BY ride_date LIMIT 200`) as unknown as CalBooking[];

  let synced = 0;
  for (const b of rows) {
    const eventId = await syncBooking(b);
    if (eventId) {
      if (eventId !== b.google_event_id) {
        await sql`UPDATE bookings SET google_event_id = ${eventId} WHERE id = ${b.id}`;
      }
      synced++;
    }
  }
  await logEvent("gcal_sync", `Google Takvim toplu aktarım: ${synced}/${rows.length} yolculuk`, { actor: "panel" });
  return NextResponse.json({ ok: true, synced, total: rows.length });
}
