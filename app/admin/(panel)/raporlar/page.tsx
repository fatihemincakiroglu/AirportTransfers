import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb, STATUS_DOT, STATUS_LABEL } from "../../ui";
import { BarChart, AreaChart, DonutChart, RankBars } from "../../charts";

export const dynamic = "force-dynamic";

const chf = (n: number) => `CHF ${n.toLocaleString("de-CH", { maximumFractionDigits: 0 })}`;
const TR_SHORT = ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Raporlar" /><NoDb /></>);
  await ensureSchema();

  const monthly = (await sql`
    SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS ym,
           COUNT(*)::int AS n,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS revenue
    FROM bookings WHERE created_at > now() - interval '12 months'
    GROUP BY 1 ORDER BY 1`) as unknown as { ym: string; n: number; revenue: number }[];

  const label = (ym: string) => TR_SHORT[Number(ym.split("-")[1]) - 1];

  const topRoutes = (await sql`
    SELECT COALESCE(dropoff, '—') AS label, COUNT(*)::int AS n,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS revenue
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 8`) as unknown as { label: string; n: number; revenue: number }[];

  const byVehicle = (await sql`
    SELECT COALESCE(vehicle, '—') AS label, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 6`) as unknown as { label: string; n: number }[];

  const byLang = (await sql`
    SELECT COALESCE(lang, '—') AS label, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 11`) as unknown as { label: string; n: number }[];

  const byStatus = (await sql`
    SELECT status AS label, COUNT(*)::int AS n FROM bookings GROUP BY 1`) as unknown as { label: string; n: number }[];

  const byWeekday = (await sql`
    SELECT EXTRACT(dow FROM created_at)::int AS d, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY 1`) as unknown as { d: number; n: number }[];

  const [tot] = (await sql`
    SELECT COUNT(*)::int AS n,
           COALESCE(AVG(price) FILTER (WHERE price IS NOT NULL), 0)::float AS avg_price,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS revenue,
           COUNT(*) FILTER (WHERE status IN ('confirmed','done'))::int AS won
    FROM bookings`) as unknown as { n: number; avg_price: number; revenue: number; won: number }[];

  // Son iki ayın karşılaştırması (trend rozeti)
  const last = monthly.at(-1)?.n ?? 0;
  const prev = monthly.at(-2)?.n ?? 0;
  const trend = prev ? Math.round(((last - prev) / prev) * 100) : 0;
  const convRate = tot.n ? Math.round((tot.won / tot.n) * 100) : 0;

  const LANG_TR: Record<string, string> = {
    de: "Almanca", en: "İngilizce", it: "İtalyanca", pt: "Portekizce", fr: "Fransızca", es: "İspanyolca",
    tr: "Türkçe", sr: "Sırpça", hr: "Hırvatça", ar: "Arapça", ru: "Rusça",
  };
  const LANG_COLORS = ["#0C2E25", "#C9A24B", "#1D4ED8", "#059669", "#D97706", "#7C3AED", "#DC2626", "#0891B2", "#65A30D", "#DB2777", "#78716C"];
  const WD = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

  const kpis: { label: string; value: string; note?: string; accent: string }[] = [
    { label: "Toplam rezervasyon", value: String(tot.n), note: trend ? `${trend > 0 ? "▲" : "▼"} geçen aya göre %${Math.abs(trend)}` : undefined, accent: C.pine },
    { label: "Onaylı ciro", value: chf(tot.revenue), note: `${tot.won} yolculuk`, accent: "#059669" },
    { label: "Ortalama sepet", value: chf(tot.avg_price), accent: C.gold },
    { label: "Dönüşüm oranı", value: `%${convRate}`, note: "onaylanan / toplam", accent: "#1D4ED8" },
  ];

  return (
    <>
      <PageTitle title="Raporlar" sub="Son 12 ayın performans özeti" />

      {/* KPI kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <span className="absolute inset-y-0 left-0 w-1" style={{ background: k.accent }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{k.label}</p>
            <p className="mt-2 text-3xl font-semibold" style={{ color: C.pine }}>{k.value}</p>
            {k.note && <p className="mt-1 text-[11px] font-semibold" style={{ color: k.accent }}>{k.note}</p>}
          </div>
        ))}
      </div>

      {/* Ciro trendi */}
      <Card className="mt-6">
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Ciro trendi</h2>
          <span className="text-xs text-stone-400">onaylı ve tamamlanmış yolculuklar · CHF</span>
        </div>
        <AreaChart data={monthly.map((m) => ({ label: label(m.ym), value: m.revenue }))} format={(n) => chf(n)} />
      </Card>

      {/* Aylık adet + durum dağılımı */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-1 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Aylık rezervasyon adedi</h2>
          <BarChart data={monthly.map((m) => ({ label: label(m.ym), value: m.n }))} valueLabel="Aylık rezervasyon" />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Durum dağılımı</h2>
          <DonutChart data={byStatus.map((s) => ({
            label: STATUS_LABEL[s.label] ?? s.label,
            value: s.n,
            color: STATUS_DOT[s.label] ?? "#A8A29E",
          }))} />
        </Card>
      </div>

      {/* Rota / araç / dil / gün */}
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">En çok gidilen yerler</h2>
          <RankBars rows={topRoutes.map((r) => ({ label: r.label, value: r.n }))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">En çok ciro getiren yerler</h2>
          <RankBars rows={topRoutes.slice().sort((a, b) => b.revenue - a.revenue).map((r) => ({ label: r.label, value: r.revenue }))}
                    format={(n) => chf(n)} accent={`linear-gradient(90deg, #059669, ${C.gold})`} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Araç sınıfı dağılımı</h2>
          <RankBars rows={byVehicle.map((r) => ({ label: r.label, value: r.n }))} accent={`linear-gradient(90deg, ${C.pine}, #1D4ED8)`} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Talebin geldiği dil</h2>
          <DonutChart data={byLang.slice(0, 7).map((l, i) => ({
            label: LANG_TR[l.label] ?? l.label, value: l.n, color: LANG_COLORS[i % LANG_COLORS.length],
          }))} />
        </Card>
      </div>

      {/* Haftanın günleri */}
      <Card className="mt-6">
        <h2 className="mb-1 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Haftanın günlerine göre talep</h2>
        <BarChart
          data={[1, 2, 3, 4, 5, 6, 0].map((d) => ({ label: WD[d], value: byWeekday.find((w) => w.d === d)?.n ?? 0 }))}
          valueLabel="Gün bazında talep"
        />
      </Card>

      {/* Dışa aktarma */}
      <div className="mt-6 flex flex-wrap gap-3">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/admin/export?type=bookings" className="rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
          ⬇ Rezervasyonları CSV indir
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/admin/export?type=contacts" className="rounded-full bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-stone-600 shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-0.5">
          ⬇ Mesajları CSV indir
        </a>
      </div>
    </>
  );
}
