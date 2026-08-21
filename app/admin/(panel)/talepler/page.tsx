import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb, fmtDate } from "../../ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="İletişim Talepleri" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`SELECT id, lang, name, email, phone, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 300`) as Record<string, string>[];

  return (
    <>
      <PageTitle title="İletişim Talepleri" sub={`${rows.length} mesaj`} />
      {rows.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Henüz mesaj yok.</p></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold" style={{ color: C.pine }}>{r.name || "—"}</p>
                  <p className="text-xs text-stone-500">{r.email} {r.phone ? `· ${r.phone}` : ""}</p>
                </div>
                <span className="whitespace-nowrap text-[11px] text-stone-400">{fmtDate(r.created_at)}</span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-stone-600">{r.message}</p>
              <div className="mt-4 flex gap-2">
                {r.email && <a href={`mailto:${r.email}`} className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-600">E-posta</a>}
                {r.phone && <a href={`https://wa.me/${String(r.phone).replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: "#25D366" }}>WhatsApp</a>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
