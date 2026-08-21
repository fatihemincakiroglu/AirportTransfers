import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb } from "../../ui";
import CalendarView, { type Trip } from "./calendar-view";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ ay?: string }> }) {
  if (!dbReady) return (<><PageTitle title="Takvim" /><NoDb /></>);
  await ensureSchema();

  const { ay } = await searchParams;
  const now = new Date();
  const month = /^\d{4}-\d{2}$/.test(ay ?? "")
    ? (ay as string)
    : `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const trips = (await sql`
    SELECT b.id, b.ref, b.status, b.ride_date, b.ride_time, b.pickup, b.dropoff, b.stops,
           b.vehicle, b.price, b.first_name, b.last_name, b.phone, b.pax,
           b.driver_id, d.name AS driver_name
    FROM bookings b LEFT JOIN drivers d ON d.id = b.driver_id
    WHERE b.ride_date IS NOT NULL AND b.ride_date <> '' AND b.ride_date LIKE ${month + "%"}
    ORDER BY b.ride_date, b.ride_time`) as unknown as Trip[];

  const drivers = (await sql`SELECT id, name FROM drivers WHERE active ORDER BY name`.catch(() => [])) as unknown as { id: number; name: string }[];

  const months = (await sql`
    SELECT DISTINCT substring(ride_date, 1, 7) AS ym
    FROM bookings
    WHERE ride_date IS NOT NULL AND ride_date <> ''
    ORDER BY ym DESC`) as unknown as { ym: string }[];

  const revenue = trips
    .filter((t) => t.status === "confirmed" || t.status === "done")
    .reduce((s, t) => s + Number(t.price ?? 0), 0);

  return (
    <>
      <PageTitle title="Takvim" sub={`${trips.length} yolculuk · onaylı ciro CHF ${revenue.toFixed(2)}`} />
      {months.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Henüz tarihli yolculuk yok.</p></Card>
      ) : (
        <CalendarView month={month} trips={trips} months={months.map((m) => m.ym)} drivers={drivers} />
      )}
      <p className="mt-4 text-xs text-stone-400">
        Renkler durumu gösterir: <span style={{ color: "#D97706" }}>■ yeni</span>{" · "}
        <span style={{ color: "#1D4ED8" }}>■ onaylı</span>{" · "}
        <span style={{ color: "#059669" }}>■ tamamlandı</span>{" · "}
        <span style={{ color: "#DC2626" }}>■ iptal</span>
        {" — gün kutusuna tıklayınca o günün yolculukları listelenir. "}
        <span style={{ color: C.pine }}>Bugün</span> altın çerçeveyle işaretlidir.
      </p>
    </>
  );
}
