import { ensureSchemaSafe as ensureSchema, dbReady } from "../../../../lib/db";
import { PageTitle, NoDb } from "../../../ui";
import NewBookingForm from "./new-booking-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Yeni rezervasyon" /><NoDb /></>);
  await ensureSchema();
  return (
    <>
      <PageTitle title="Yeni rezervasyon" sub="Telefon, WhatsApp veya yüz yüze gelen talepleri buradan kaydedin" />
      <NewBookingForm />
    </>
  );
}
