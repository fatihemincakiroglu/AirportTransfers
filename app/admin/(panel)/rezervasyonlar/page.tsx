import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb } from "../../ui";
import BookingsClient, { type Booking } from "./bookings-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Rezervasyonlar" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`
    SELECT id, ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
           pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
           flight, nameboard, extras, notes, admin_note, created_at
    FROM bookings ORDER BY created_at DESC LIMIT 500`) as unknown as Booking[];

  return (
    <>
      <PageTitle title="Rezervasyonlar" sub={`${rows.length} kayıt`} />
      <BookingsClient rows={rows} />
    </>
  );
}
