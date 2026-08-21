import { sql, ensureSchema, dbReady } from "../../../lib/db";
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
    SELECT id, ref, status, ride_date, ride_time, pickup, dropoff, stops, vehicle, price,
           first_name, last_name, phone, pax
    FROM bookings
    WHERE ride_date IS NOT NULL AND ride_date <> '' AND ride_date LIKE ${month + "%"}
    ORDER BY ride_date, ride_time`) as unknown as Trip[];

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
        <CalendarView month={month} trips={trips} months={months.map((m) => m.ym)} />
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
