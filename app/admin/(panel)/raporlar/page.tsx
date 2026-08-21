import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb } from "../../ui";
import { BarChart, RankBars } from "../../charts";

export const dynamic = "force-dynamic";

const chf = (n: number) => `CHF ${n.toLocaleString("de-CH", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Raporlar" /><NoDb /></>);
  await ensureSchema();

  // Son 12 ay: adet ve ciro
  const monthly = (await sql`
    SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS ym,
           COUNT(*)::int AS n,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS revenue
    FROM bookings
    WHERE created_at > now() - interval '12 months'
    GROUP BY 1 ORDER BY 1`) as unknown as { ym: string; n: number; revenue: number }[];

  const monthLabel = (ym: string) => {
    const [y, m] = ym.split("-");
    return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("tr-TR", { month: "short" });
  };

  const topRoutes = (await sql`
    SELECT COALESCE(dropoff, '—') AS label, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 8`) as unknown as { label: string; n: number }[];

  const byVehicle = (await sql`
    SELECT COALESCE(vehicle, '—') AS label, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 6`) as unknown as { label: string; n: number }[];

  const byLang = (await sql`
    SELECT COALESCE(lang, '—') AS label, COUNT(*)::int AS n
    FROM bookings GROUP BY 1 ORDER BY n DESC LIMIT 11`) as unknown as { label: string; n: number }[];

  const byStatus = (await sql`
    SELECT status AS label, COUNT(*)::int AS n FROM bookings GROUP BY 1 ORDER BY n DESC`) as unknown as { label: string; n: number }[];

  const [tot] = (await sql`
    SELECT COUNT(*)::int AS n,
           COALESCE(AVG(price) FILTER (WHERE price IS NOT NULL), 0)::float AS avg_price,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0)::float AS revenue
    FROM bookings`) as unknown as { n: number; avg_price: number; revenue: number }[];

  const STATUS_TR: Record<string, string> = { new: "Yeni", confirmed: "Onaylı", done: "Tamamlandı", cancelled: "İptal" };
  const LANG_TR: Record<string, string> = {
    de: "Almanca", en: "İngilizce", it: "İtalyanca", pt: "Portekizce", fr: "Fransızca", es: "İspanyolca",
    tr: "Türkçe", sr: "Sırpça", hr: "Hırvatça", ar: "Arapça", ru: "Rusça",
  };

  return (
    <>
      <PageTitle title="Raporlar" sub="Son 12 ayın özeti" />

      <div className="grid gap-4 sm:grid-cols-3">
        {([
          ["Toplam rezervasyon", String(tot.n)],
          ["Onaylı ciro", chf(tot.revenue)],
          ["Ortalama sepet", chf(tot.avg_price)],
        ] as [string, string][]).map(([l, v]) => (
          <Card key={l}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{l}</p>
            <p className="mt-2 text-3xl font-semibold" style={{ color: C.pine }}>{v}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Aylık rezervasyon</h2>
          <BarChart data={monthly.map((m) => ({ label: monthLabel(m.ym), value: m.n }))} valueLabel="Aylık rezervasyon" format={(n) => String(Math.round(n))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Aylık ciro (onaylı)</h2>
          <BarChart data={monthly.map((m) => ({ label: monthLabel(m.ym), value: m.revenue }))} valueLabel="Aylık ciro" format={(n) => chf(n)} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">En çok gidilen yerler</h2>
          <RankBars rows={topRoutes.map((r) => ({ label: r.label, value: r.n }))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Araç sınıfı dağılımı</h2>
          <RankBars rows={byVehicle.map((r) => ({ label: r.label, value: r.n }))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Talebin geldiği dil</h2>
          <RankBars rows={byLang.map((r) => ({ label: LANG_TR[r.label] ?? r.label, value: r.n }))} />
        </Card>
        <Card>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Durum dağılımı</h2>
          <RankBars rows={byStatus.map((r) => ({ label: STATUS_TR[r.label] ?? r.label, value: r.n }))} />
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/admin/export?type=bookings" className="rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide" style={{ background: C.gold, color: C.pine }}>
          Rezervasyonları CSV indir
        </a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/admin/export?type=contacts" className="rounded-full bg-stone-100 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-stone-600">
          Mesajları CSV indir
        </a>
      </div>
    </>
  );
}
