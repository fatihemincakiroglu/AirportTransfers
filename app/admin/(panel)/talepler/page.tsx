import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb } from "../../ui";
import ContactsClient, { type Contact } from "./contacts-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="İletişim Talepleri" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`
    SELECT id, status, lang, name, email, phone, message, created_at
    FROM contacts ORDER BY (status <> 'new'), created_at DESC LIMIT 300`) as unknown as Contact[];

  const yeni = rows.filter((r) => r.status === "new").length;
  return (
    <>
      <PageTitle title="İletişim Talepleri" sub={`${rows.length} mesaj · ${yeni} yanıtlanmamış`} />
      <ContactsClient rows={rows} />
    </>
  );
}
