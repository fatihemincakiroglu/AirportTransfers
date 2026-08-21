import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { Card, PageTitle, NoDb, fmtDate } from "../../ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Sistem Logları" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`SELECT id, kind, detail, ip, created_at FROM logs ORDER BY created_at DESC LIMIT 200`) as Record<string, string>[];

  return (
    <>
      <PageTitle title="Sistem Logları" sub="Giriş denemeleri ve durum değişiklikleri" />
      <Card className="overflow-x-auto p-0">
        {rows.length === 0 ? <p className="p-6 text-sm text-stone-500">Kayıt yok.</p> : (
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                <th className="px-5 py-3">Zaman</th><th className="px-4 py-3">Olay</th>
                <th className="px-4 py-3">Ayrıntı</th><th className="px-4 py-3">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="whitespace-nowrap px-5 py-3 text-xs text-stone-500">{fmtDate(r.created_at)}</td>
                  <td className="px-4 py-3 font-semibold text-stone-700">{r.kind}</td>
                  <td className="px-4 py-3 text-stone-600">{r.detail}</td>
                  <td className="px-4 py-3 text-xs text-stone-400">{r.ip || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
