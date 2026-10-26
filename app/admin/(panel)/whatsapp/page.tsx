// WhatsApp ref kodları (iş listesi T6): müşteri WhatsApp mesajındaki "Ref: XXXXXX" kodu buradan aranır,
// reklam tıklama kimliği (gclid/gbraid/wbraid) ve kampanya bulunur → satış Google Ads'e offline dönüşüm olarak yüklenir.
import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { PageTitle, NoDb } from "../../ui";

export const dynamic = "force-dynamic";

type Row = {
  ref: string; gclid: string | null; gbraid: string | null; wbraid: string | null;
  utm_source: string | null; utm_campaign: string | null; utm_term: string | null;
  landing_page: string | null; last_page: string | null; lang: string | null; clicks: number;
  created_at: Date; last_click_at: Date;
};

const fmt = (d: Date) => new Date(d).toLocaleString("tr-TR", { timeZone: "Europe/Zurich", dateStyle: "short", timeStyle: "short" });

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  if (!dbReady) return (<><PageTitle title="WhatsApp Ref" /><NoDb /></>);
  await ensureSchema();
  const q = ((await searchParams).q ?? "").trim().toUpperCase().replace(/^REF:?\s*/, "").slice(0, 10);
  const rows = (q
    ? await sql`SELECT * FROM wa_refs WHERE ref LIKE ${q + "%"} ORDER BY last_click_at DESC LIMIT 50`
    : await sql`SELECT * FROM wa_refs ORDER BY last_click_at DESC LIMIT 300`) as unknown as Row[];
  const ads = rows.filter((r) => r.gclid || r.gbraid || r.wbraid).length;

  return (
    <>
      <PageTitle title="WhatsApp Ref" sub={`${rows.length} kod · ${ads} tanesi Google Ads tıklamasından`} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <form className="flex gap-2">
          <input name="q" defaultValue={q} placeholder="Ref kodu (ör. G7K2QX)" className="h-10 rounded-lg border border-stone-300 px-3 font-mono text-sm uppercase" />
          <button className="h-10 rounded-lg bg-stone-900 px-4 text-sm font-bold text-white">Ara</button>
        </form>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- dosya indirme (API) */}
        <a href="/api/admin/export?type=wa_refs" className="text-sm font-bold underline">CSV indir (Google Ads offline dönüşüm için)</a>
      </div>
      <p className="mb-4 max-w-3xl text-sm text-stone-600">
        Müşterinin WhatsApp mesajının sonundaki <b>Ref</b> kodunu arayın. GCLID / GBRAID / WBRAID doluysa müşteri reklamdan gelmiştir;
        satış kapanınca bu kimlik, tarih ve tutarla Google Ads&apos;e offline dönüşüm olarak yüklenir.
      </p>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 text-[11px] uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-3 py-2">Ref</th><th className="px-3 py-2">Son tıklama</th><th className="px-3 py-2">Kaynak</th>
              <th className="px-3 py-2">Kampanya / terim</th><th className="px-3 py-2">Tıklama kimliği</th><th className="px-3 py-2">Sayfa</th><th className="px-3 py-2">Tık</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ref} className="border-t border-stone-100 align-top">
                <td className="px-3 py-2 font-mono font-bold">{r.ref}</td>
                <td className="whitespace-nowrap px-3 py-2">{fmt(r.last_click_at)}</td>
                <td className="px-3 py-2">{r.utm_source ?? (r.gclid || r.gbraid || r.wbraid ? "google (ads)" : "—")}</td>
                <td className="px-3 py-2">{[r.utm_campaign, r.utm_term].filter(Boolean).join(" · ") || "—"}</td>
                <td className="max-w-[220px] break-all px-3 py-2 font-mono text-[10.5px]">
                  {r.gclid ? `gclid: ${r.gclid}` : r.gbraid ? `gbraid: ${r.gbraid}` : r.wbraid ? `wbraid: ${r.wbraid}` : "—"}
                </td>
                <td className="px-3 py-2">{r.last_page ?? r.landing_page ?? "—"}</td>
                <td className="px-3 py-2">{r.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
