import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb, StatusPill } from "../../ui";

export const dynamic = "force-dynamic";

type Row = { id: number; ref: string; status: string; ride_date: string | null; ride_time: string | null;
  pickup: string | null; dropoff: string | null; first_name: string | null; last_name: string | null; vehicle: string | null };

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Takvim" /><NoDb /></>);
  await ensureSchema();
  const rows = (await sql`
    SELECT id, ref, status, ride_date, ride_time, pickup, dropoff, first_name, last_name, vehicle
    FROM bookings
    WHERE status <> 'cancelled' AND ride_date IS NOT NULL AND ride_date <> ''
    ORDER BY ride_date, ride_time LIMIT 400`) as unknown as Row[];

  // Yolculuk tarihine göre grupla; geçmiş günleri ayır
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = rows.filter((r) => (r.ride_date ?? "") >= today);
  const groups = new Map<string, Row[]>();
  for (const r of upcoming) {
    const k = r.ride_date as string;
    groups.set(k, [...(groups.get(k) ?? []), r]);
  }

  const dayLabel = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageTitle title="Takvim" sub={`${upcoming.length} yaklaşan yolculuk`} />
      {groups.size === 0 ? (
        <Card><p className="text-sm text-stone-500">Yaklaşan yolculuk yok.</p></Card>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([day, list]) => (
            <div key={day}>
              <div className="mb-2 flex items-baseline gap-3">
                <h2 className="text-sm font-bold" style={{ color: C.pine }}>{dayLabel(day)}</h2>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
                <span className="text-xs text-stone-400">{list.length} yolculuk</span>
              </div>
              <div className="space-y-2">
                {list.map((r) => (
                  <Card key={r.id} className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3.5">
                    <span className="w-14 shrink-0 text-lg font-semibold tabular-nums" style={{ color: C.pine }}>{r.ride_time || "--:--"}</span>
                    <span className="min-w-0 flex-1 text-sm text-stone-700">{r.pickup} → {r.dropoff}</span>
                    <span className="text-sm text-stone-500">{[r.first_name, r.last_name].filter(Boolean).join(" ")}</span>
                    <span className="text-xs text-stone-400">{r.vehicle}</span>
                    <StatusPill status={r.status} />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
