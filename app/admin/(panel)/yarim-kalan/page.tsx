// Yarım kalanlar: ad, soyad, e-posta veya telefonu eksik kayıtlar (son adıma gelip
// bilgileri tamamlamayanlar, denemeler). Rezervasyon sayılmaz; 14 günden eskiler cron ile silinir.
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb, Card } from "../../ui";
import IncompleteClient, { type Incomplete } from "./incomplete-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Yarım Kalanlar" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`
    SELECT id, ref, lang, channel, pickup, dropoff, ride_date, ride_time, pax, vehicle, price, payment, payment_status,
           first_name, last_name, email, phone, created_at
    FROM bookings
    WHERE NOT (COALESCE(first_name, '') <> '' AND COALESCE(last_name, '') <> '' AND COALESCE(email, '') <> '' AND COALESCE(phone, '') <> '')
      AND status = 'new'
    ORDER BY created_at DESC LIMIT 300`) as unknown as Incomplete[];

  return (
    <>
      <PageTitle title="Yarım Kalanlar" sub={`${rows.length} kayıt · rezervasyon değil: ad, soyad, e-posta veya telefon eksik`} />
      <Card className="mb-5">
        <p className="text-sm text-stone-600">
          Bu kayıtlar rezervasyon listesinde <b style={{ color: "#0C2E25" }}>görünmez</b>. Müşteri son adıma geldi ama bilgilerini tamamlamadan ayrıldı ya da deneme yaptı.
          Telefon veya e-posta girmiş olanlara ulaşılabilir; 14 günden eski kayıtlar her gece otomatik silinir.
        </p>
      </Card>
      <IncompleteClient rows={rows} />
    </>
  );
}
