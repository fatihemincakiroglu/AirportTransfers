import { sql, ensureSchema, dbReady } from "../../lib/db";
import { C, Card, PageTitle, StatusPill, NoDb, fmtDate } from "../ui";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!dbReady) return (<><PageTitle title="Kontrol Paneli" /><NoDb /></>);
  await ensureSchema();

  const [stats] = (await sql`
    SELECT
      COUNT(*)::int                                                        AS total,
      COUNT(*) FILTER (WHERE status = 'new')::int                          AS new,
      COUNT(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS last30,
      COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')), 0) AS revenue
    FROM bookings`) as { total: number; new: number; last30: number; revenue: string }[];

  const recent = (await sql`
    SELECT id, ref, status, pickup, dropoff, ride_date, ride_time, vehicle, price, first_name, last_name, created_at
    FROM bookings ORDER BY created_at DESC LIMIT 8`) as Record<string, string>[];

  const [contacts] = (await sql`SELECT COUNT(*) FILTER (WHERE status = 'new')::int AS n FROM contacts`) as { n: number }[];

  const cards: [string, string][] = [
    ["Toplam rezervasyon", String(stats.total)],
    ["Yeni (işlem bekleyen)", String(stats.new)],
    ["Son 30 gün", String(stats.last30)],
    ["Onaylı ciro", `CHF ${Number(stats.revenue).toFixed(2)}`],
    ["Yeni mesaj", String(contacts.n)],
  ];

  return (
    <>
      <PageTitle title="Kontrol Paneli" sub="Rezervasyon ve talep özeti" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {cards.map(([label, value]) => (
          <Card key={label}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold sm:text-3xl" style={{ color: C.pine }}>{value}</p>
          </Card>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Son rezervasyonlar</h2>
      {recent.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Henüz kayıt yok. Siteden bir rezervasyon talebi geldiğinde burada görünür.</p></Card>
      ) : (
      <>
      {/* Mobil: kart listesi */}
      <div className="space-y-2 md:hidden">
        {recent.map((r) => (
          <Card key={r.id} className="py-3.5">
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <span className="block text-sm font-bold" style={{ color: C.pine }}>{r.ref}</span>
                <span className="block truncate text-xs text-stone-500">{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</span>
              </span>
              <StatusPill status={r.status} />
            </div>
            <p className="mt-2 break-words text-sm text-stone-700">{r.pickup} → {r.dropoff}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 text-xs text-stone-500">
              <span>{r.ride_date} {r.ride_time}</span>
              {r.price && <span className="ml-auto font-bold tabular-nums" style={{ color: C.pine }}>CHF {Number(r.price).toFixed(2)}</span>}
            </div>
          </Card>
        ))}
      </div>

      <Card className="hidden overflow-x-auto p-0 md:block">
        {(
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                <th className="px-5 py-3">Ref</th><th className="px-4 py-3">Müşteri</th>
                <th className="px-4 py-3">Güzergâh</th><th className="px-4 py-3">Tarih</th>
                <th className="px-4 py-3">Tutar</th><th className="px-4 py-3">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {recent.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3 font-bold" style={{ color: C.pine }}>{r.ref}</td>
                  <td className="px-4 py-3">{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3 text-stone-600">{r.pickup} → {r.dropoff}</td>
                  <td className="px-4 py-3 text-stone-600">{r.ride_date} {r.ride_time}</td>
                  <td className="px-4 py-3 tabular-nums">{r.price ? `CHF ${Number(r.price).toFixed(2)}` : "—"}</td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      </>
      )}
      {recent.length > 0 && (
        <p className="mt-3 text-xs text-stone-400">Son kayıt: {fmtDate(recent[0].created_at)}</p>
      )}
    </>
  );
}
