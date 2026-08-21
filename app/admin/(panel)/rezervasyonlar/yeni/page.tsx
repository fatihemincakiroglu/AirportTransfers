import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../../lib/db";
import { PageTitle, NoDb } from "../../../ui";
import NewBookingForm from "./new-booking-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Yeni rezervasyon" /><NoDb /></>);
  await ensureSchema();
  const drivers = (await sql`SELECT id, name FROM drivers WHERE active ORDER BY name`.catch(() => [])) as unknown as { id: number; name: string }[];
  return (
    <>
      <PageTitle title="Yeni rezervasyon" sub="Telefon, WhatsApp veya yüz yüze gelen talepleri buradan kaydedin" />
      <NewBookingForm drivers={drivers} />
    </>
  );
}
