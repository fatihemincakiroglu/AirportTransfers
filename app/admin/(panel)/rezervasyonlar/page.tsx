import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import Link from "next/link";
import { PageTitle, NoDb } from "../../ui";
import BookingsClient, { type Booking } from "./bookings-client";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ ay?: string; ref?: string }> }) {
  if (!dbReady) return (<><PageTitle title="Rezervasyonlar" /><NoDb /></>);
  await ensureSchema();

  const { ay, ref } = await searchParams;
  // Belirli bir kayda bağlantı geldiyse ay filtresi devre dışı kalır
  const month = ref ? "all" : (/^\d{4}-\d{2}$/.test(ay ?? "") ? (ay as string) : "all");

  const rows = (month === "all"
    ? await sql`
        SELECT id, ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
               pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
               flight, nameboard, extras, notes, admin_note, created_at, driver_id, source
        FROM bookings ORDER BY created_at DESC LIMIT 500`
    : await sql`
        SELECT id, ref, status, lang, channel, pickup, dropoff, stops, ride_date, ride_time,
               pax, luggage, vehicle, price, payment, first_name, last_name, email, phone,
               flight, nameboard, extras, notes, admin_note, created_at, driver_id, source
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

  const drivers = (await sql`SELECT id, name FROM drivers WHERE active ORDER BY name`.catch(() => [])) as unknown as { id: number; name: string }[];

  // Müşteri geçmişi: telefon/e-posta bazında toplam yolculuk ve ciro
  const history = (await sql`
    SELECT lower(coalesce(nullif(email,''), phone, '')) AS key,
           COUNT(*)::int AS trips,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS spent
    FROM bookings
    WHERE coalesce(nullif(email,''), phone, '') <> ''
    GROUP BY 1 HAVING COUNT(*) > 1`) as unknown as { key: string; trips: number; spent: number }[];

  const revenue = rows
    .filter((r) => r.status === "confirmed" || r.status === "done")
    .reduce((s, r) => s + Number(r.price ?? 0), 0);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <PageTitle title="Rezervasyonlar" sub={`${rows.length} kayıt · onaylı ciro CHF ${revenue.toFixed(2)}`} />
        <Link href="/admin/rezervasyonlar/yeni"
          className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm"
          style={{ background: "#C9A24B", color: "#0C2E25" }}>
          + Yeni rezervasyon
        </Link>
      </div>
      <BookingsClient rows={rows} months={months.map((m) => m.ym)} month={month} openRef={ref ?? null} drivers={drivers} history={Object.fromEntries(history.map((h) => [h.key, { trips: h.trips, spent: h.spent }]))} />
    </>
  );
}
