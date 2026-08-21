import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb } from "../../ui";
import BookingsClient, { type Booking } from "./bookings-client";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ ay?: string }> }) {
  if (!dbReady) return (<><PageTitle title="Rezervasyonlar" /><NoDb /></>);
  await ensureSchema();

  const { ay } = await searchParams;
  const month = /^\d{4}-\d{2}$/.test(ay ?? "") ? (ay as string) : "all";

  const rows = (month === "all"
    ? await sql`
        SELECT id, ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
               pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
               flight, nameboard, extras, notes, admin_note, created_at
        FROM bookings ORDER BY created_at DESC LIMIT 500`
    : await sql`
        SELECT id, ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
               pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
               flight, nameboard, extras, notes, admin_note, created_at
        FROM bookings
        WHERE to_char(created_at, 'YYYY-MM') = ${month} OR ride_date LIKE ${month + "%"}
        ORDER BY created_at DESC LIMIT 500`
  ) as unknown as Booking[];

  // Ay listesi (kayıt veya yolculuk tarihine göre)
  const months = (await sql`
    SELECT DISTINCT ym FROM (
      SELECT to_char(created_at, 'YYYY-MM') AS ym FROM bookings
      UNION
      SELECT substring(ride_date, 1, 7) FROM bookings WHERE ride_date IS NOT NULL AND ride_date <> ''
    ) x WHERE ym IS NOT NULL ORDER BY ym DESC`) as unknown as { ym: string }[];

  const revenue = rows
    .filter((r) => r.status === "confirmed" || r.status === "done")
    .reduce((s, r) => s + Number(r.price ?? 0), 0);

  return (
    <>
      <PageTitle title="Rezervasyonlar" sub={`${rows.length} kayıt · onaylı ciro CHF ${revenue.toFixed(2)}`} />
      <BookingsClient rows={rows} months={months.map((m) => m.ym)} month={month} />
    </>
  );
}
