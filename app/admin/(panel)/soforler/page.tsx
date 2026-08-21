import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb } from "../../ui";
import DriversClient, { type Driver } from "./drivers-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Şoförler" /><NoDb /></>);
  await ensureSchema();

  const drivers = (await sql`
    SELECT d.id, d.name, d.phone, d.email, d.vehicle, d.note, d.active,
           COUNT(b.id)::int AS trips,
           COUNT(b.id) FILTER (WHERE b.ride_date >= to_char(now(), 'YYYY-MM-DD'))::int AS upcoming
    FROM drivers d
    LEFT JOIN bookings b ON b.driver_id = d.id AND b.status <> 'cancelled'
    GROUP BY d.id ORDER BY d.active DESC, d.name`) as unknown as Driver[];

  return (
    <>
      <PageTitle title="Şoförler" sub={`${drivers.filter((d) => d.active).length} aktif şoför`} />
      <DriversClient rows={drivers} />
    </>
  );
}
