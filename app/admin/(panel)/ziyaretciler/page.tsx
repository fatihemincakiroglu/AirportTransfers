import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb } from "../../ui";
import { BarChart, DonutChart, RankBars } from "../../charts";

export const dynamic = "force-dynamic";

// Ülke kodu → bayrak + Türkçe ad
const COUNTRY: Record<string, [string, string]> = {
  CH: ["🇨🇭", "İsviçre"], DE: ["🇩🇪", "Almanya"], AT: ["🇦🇹", "Avusturya"], FR: ["🇫🇷", "Fransa"],
  IT: ["🇮🇹", "İtalya"], GB: ["🇬🇧", "Birleşik Krallık"], US: ["🇺🇸", "ABD"], TR: ["🇹🇷", "Türkiye"],
  RU: ["🇷🇺", "Rusya"], ES: ["🇪🇸", "İspanya"], PT: ["🇵🇹", "Portekiz"], NL: ["🇳🇱", "Hollanda"],
  BE: ["🇧🇪", "Belçika"], SE: ["🇸🇪", "İsveç"], PL: ["🇵🇱", "Polonya"], AE: ["🇦🇪", "BAE"],
  SA: ["🇸🇦", "S. Arabistan"], QA: ["🇶🇦", "Katar"], KW: ["🇰🇼", "Kuveyt"], IN: ["🇮🇳", "Hindistan"],
  CN: ["🇨🇳", "Çin"], JP: ["🇯🇵", "Japonya"], BR: ["🇧🇷", "Brezilya"], RS: ["🇷🇸", "Sırbistan"],
  HR: ["🇭🇷", "Hırvatistan"], LI: ["🇱🇮", "Liechtenstein"], CA: ["🇨🇦", "Kanada"], AU: ["🇦🇺", "Avustralya"],
};
const flag = (c: string) => COUNTRY[c]?.[0] ?? "🏳️";
const cname = (c: string) => COUNTRY[c]?.[1] ?? (c === "??" ? "Bilinmiyor" : c);

const LANG_TR: Record<string, string> = {
  de: "Almanca", en: "İngilizce", it: "İtalyanca", pt: "Portekizce", fr: "Fransızca", es: "İspanyolca",
  tr: "Türkçe", sr: "Sırpça", hr: "Hırvatça", ar: "Arapça", ru: "Rusça",
};
const COLORS = ["#0C2E25", "#C9A24B", "#1D4ED8", "#059669", "#D97706", "#7C3AED", "#DC2626", "#0891B2"];

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Ziyaretçiler" /><NoDb /></>);
  await ensureSchema();

  const [tot] = (await sql`
    SELECT COALESCE(SUM(hits), 0)::int AS all_hits,
           COALESCE(SUM(hits) FILTER (WHERE day = CURRENT_DATE), 0)::int AS today,
           COALESCE(SUM(hits) FILTER (WHERE day > CURRENT_DATE - 7), 0)::int AS week,
           COUNT(DISTINCT country)::int AS countries
    FROM visits`) as unknown as { all_hits: number; today: number; week: number; countries: number }[];

  const daily = (await sql`
    SELECT to_char(day, 'DD.MM') AS label, SUM(hits)::int AS n
    FROM visits WHERE day > CURRENT_DATE - 30 GROUP BY day ORDER BY day`) as unknown as { label: string; n: number }[];

  const byCountry = (await sql`
    SELECT country, SUM(hits)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC LIMIT 10`) as unknown as { country: string; n: number }[];

  const byCity = (await sql`
    SELECT city, country, SUM(hits)::int AS n FROM visits
    WHERE city <> '' GROUP BY 1, 2 ORDER BY n DESC LIMIT 12`) as unknown as { city: string; country: string; n: number }[];

  const byLang = (await sql`
    SELECT lang, SUM(hits)::int AS n FROM visits WHERE lang <> '' GROUP BY 1 ORDER BY n DESC LIMIT 8`) as unknown as { lang: string; n: number }[];

  const byPage = (await sql`
    SELECT page, SUM(hits)::int AS n FROM visits GROUP BY 1 ORDER BY n DESC LIMIT 10`) as unknown as { page: string; n: number }[];

  const kpis: [string, string, string][] = [
    ["Bugün", String(tot.today), C.pine],
    ["Son 7 gün", String(tot.week), "#1D4ED8"],
    ["Toplam görüntüleme", String(tot.all_hits), C.gold],
    ["Ülke sayısı", String(tot.countries), "#059669"],
  ];

  return (
    <>
      <PageTitle title="Ziyaretçiler" sub="Siteye gelen ziyaretçilerin ülke ve şehir dağılımı" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map(([label, value, color]) => (
          <div key={label} className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
            <span className="absolute inset-y-0 left-0 w-1" style={{ background: color }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold sm:text-3xl" style={{ color: C.pine }}>{value}</p>
          </div>
        ))}
      </div>

      {tot.all_hits === 0 ? (
        <Card className="mt-6">
          <p className="text-sm text-stone-500">
            Henüz ziyaret kaydı yok. Site canlıya alındıktan sonra veriler burada birikmeye başlar.
            <span className="mt-1 block text-xs text-stone-400">
              Not: Ülke ve şehir bilgisi yalnızca canlı ortamda (Vercel) çözülür; yerelde &quot;Bilinmiyor&quot; görünür.
            </span>
          </p>
        </Card>
      ) : (
        <>
          <Card className="mt-6">
            <h2 className="mb-1 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Son 30 gün</h2>
            <BarChart data={daily.map((d) => ({ label: d.label, value: d.n }))} suffix="görüntüleme" />
          </Card>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <Card>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Ülkelere göre</h2>
              <RankBars rows={byCountry.map((c) => ({ label: `${flag(c.country)} ${cname(c.country)}`, value: c.n }))} />
            </Card>
            <Card>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Şehirlere göre</h2>
              <RankBars
                rows={byCity.map((c) => ({ label: `${flag(c.country)} ${c.city}`, value: c.n }))}
                accent={`linear-gradient(90deg, #1D4ED8, ${C.gold})`}
              />
            </Card>
            <Card>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Site dili</h2>
              <DonutChart data={byLang.map((l, i) => ({
                label: LANG_TR[l.lang] ?? l.lang, value: l.n, color: COLORS[i % COLORS.length],
              }))} />
            </Card>
            <Card>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">En çok görüntülenen sayfalar</h2>
              <RankBars rows={byPage.map((p) => ({ label: p.page, value: p.n }))}
                        accent={`linear-gradient(90deg, ${C.pine}, #059669)`} />
            </Card>
          </div>
        </>
      )}

      <p className="mt-5 text-xs leading-relaxed text-stone-400">
        Konum bilgisi ziyaretçinin bağlantısından (Vercel) çözülür ve yaklaşıktır; IP adresi kaydedilmez.
        Yalnızca gün, ülke, şehir, dil ve sayfa türü bazında toplam sayaç tutulur.
      </p>
    </>
  );
}
