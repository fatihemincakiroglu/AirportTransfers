import Link from "next/link";
import { sql, ensureSchema, dbReady } from "../../lib/db";
import { C, Card, PageTitle, StatusPill, NoDb, STATUS_DOT } from "../ui";

export const dynamic = "force-dynamic";

type Trip = {
  id: number; ref: string; status: string; ride_time: string | null; ride_date: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null; vehicle: string | null;
  price: string | null; pax: number | null; flight: string | null;
  first_name: string | null; last_name: string | null; phone: string | null;
  driver_name: string | null;
};

const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Bugünün ve yarının tarihleri (sunucuda, render dışında hesaplanır) */
function todayAndTomorrow() {
  const now = new Date();
  return {
    today: iso(now),
    tomorrow: iso(new Date(now.getTime() + 86400000)),
    label: now.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}

/** Belirli bir günün yolculukları (şoför adıyla birlikte) */
async function tripsFor(day: string) {
  return (await sql`
    SELECT b.id, b.ref, b.status, b.ride_time, b.ride_date, b.pickup, b.dropoff, b.stops,
           b.vehicle, b.price, b.pax, b.flight, b.first_name, b.last_name, b.phone,
           d.name AS driver_name
    FROM bookings b LEFT JOIN drivers d ON d.id = b.driver_id
    WHERE b.ride_date = ${day} AND b.status <> 'cancelled'
    ORDER BY b.ride_time`) as unknown as Trip[];
}

/** Tek yolculuk satırı (modül seviyesinde — render içinde bileşen tanımlanmaz) */
function TripRow({ t }: { t: Trip }) {
  return (
    <Link href={`/admin/rezervasyonlar?ref=${encodeURIComponent(t.ref)}`}
          className="block transition-transform hover:-translate-y-0.5">
    <Card className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
      <span className="w-14 shrink-0 text-base font-semibold tabular-nums sm:w-16 sm:text-lg" style={{ color: STATUS_DOT[t.status] ?? C.pine }}>
        {t.ride_time || "--:--"}
      </span>
      <span className="min-w-0 flex-1 basis-[60%]">
        <span className="block break-words text-sm font-medium text-stone-700">{t.pickup} → {t.dropoff}</span>
        <span className="block text-xs text-stone-400">
          {[t.first_name, t.last_name].filter(Boolean).join(" ")}
          {t.pax ? ` · ${t.pax} kişi` : ""}
          {t.flight ? ` · ✈ ${t.flight}` : ""}
          {t.stops ? ` · durak: ${t.stops}` : ""}
        </span>
      </span>
      <span className="text-xs" style={{ color: t.driver_name ? C.pine : "#DC2626" }}>
        {t.driver_name ? `👤 ${t.driver_name}` : "şoför atanmadı"}
      </span>
      {t.price && <span className="text-sm font-bold tabular-nums" style={{ color: C.pine }}>CHF {Number(t.price).toFixed(2)}</span>}
      <StatusPill status={t.status} />
      {t.phone && (
        <a href={`https://wa.me/${t.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
           onClick={(e) => e.stopPropagation()}
           className="rounded-full px-3 py-1.5 text-[11px] font-bold text-white" style={{ background: "#25D366" }}>WhatsApp</a>
      )}
    </Card>
    </Link>
  );
}

export default async function Dashboard() {
  if (!dbReady) return (<><PageTitle title="Bugün" /><NoDb /></>);
  await ensureSchema();

  const { today, tomorrow, label: todayLabel } = todayAndTomorrow();

  const todayTrips = await tripsFor(today);
  const tomorrowTrips = await tripsFor(tomorrow);

  const pending = (await sql`
    SELECT id, ref, pickup, dropoff, ride_date, ride_time, price, first_name, last_name, created_at
    FROM bookings WHERE status = 'new' ORDER BY created_at DESC LIMIT 6`) as unknown as Record<string, string>[];

  const [msg] = (await sql`SELECT COUNT(*) FILTER (WHERE status = 'new')::int AS n FROM contacts`) as unknown as { n: number }[];

  const [stats] = (await sql`
    SELECT COUNT(*) FILTER (WHERE status = 'new')::int AS new_count,
           COUNT(*) FILTER (WHERE ride_date >= ${today} AND status <> 'cancelled')::int AS upcoming,
           COALESCE(SUM(price) FILTER (WHERE status IN ('confirmed','done')
             AND to_char(created_at, 'YYYY-MM') = to_char(now(), 'YYYY-MM')), 0)::float AS month_revenue,
           COUNT(*) FILTER (WHERE driver_id IS NULL AND ride_date >= ${today} AND status <> 'cancelled')::int AS unassigned
    FROM bookings`) as unknown as { new_count: number; upcoming: number; month_revenue: number; unassigned: number }[];

  const kpis: [string, string, string, string?][] = [
    ["Bugünkü yolculuk", String(todayTrips.length), C.pine],
    ["Yanıt bekleyen", String(stats.new_count), "#D97706", "/admin/rezervasyonlar"],
    ["Şoför atanmamış", String(stats.unassigned), stats.unassigned ? "#DC2626" : "#059669"],
    ["Bu ay ciro", `CHF ${stats.month_revenue.toLocaleString("de-CH", { maximumFractionDigits: 0 })}`, "#059669"],
  ];

  return (
    <>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <PageTitle
          title="Bugün"
          sub={todayLabel}
        />
        <Link href="/admin/rezervasyonlar/yeni" className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm"
              style={{ background: C.gold, color: C.pine }}>
          + Yeni rezervasyon
        </Link>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {kpis.map(([label, value, color]) => (
          <div key={label} className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
            <span className="absolute inset-y-0 left-0 w-1" style={{ background: color }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold sm:text-3xl" style={{ color: C.pine }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Bugünün programı */}
      <div className="mt-8">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="text-sm font-bold" style={{ color: C.pine }}>Bugünün programı</h2>
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
          <span className="text-xs text-stone-400">{todayTrips.length} yolculuk</span>
        </div>
        {todayTrips.length === 0 ? (
          <Card><p className="text-sm text-stone-500">Bugün planlanmış yolculuk yok.</p></Card>
        ) : (
          <div className="space-y-2">{todayTrips.map((t) => <TripRow key={t.id} t={t} />)}</div>
        )}
      </div>

      {/* Yarına hazırlık */}
      <div className="mt-8">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="text-sm font-bold" style={{ color: C.pine }}>Yarına hazırlık</h2>
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
          <span className="text-xs text-stone-400">{tomorrowTrips.length} yolculuk</span>
        </div>
        {tomorrowTrips.length === 0 ? (
          <Card><p className="text-sm text-stone-500">Yarın için kayıt yok.</p></Card>
        ) : (
          <div className="space-y-2">{tomorrowTrips.map((t) => <TripRow key={t.id} t={t} />)}</div>
        )}
      </div>

      {/* Yanıt bekleyenler */}
      <div className="mt-8">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="text-sm font-bold" style={{ color: C.pine }}>Yanıt bekleyen talepler</h2>
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
          {msg.n > 0 && (
            <Link href="/admin/talepler" className="rounded-full px-2.5 py-1 text-[11px] font-extrabold text-white" style={{ background: "#DC2626" }}>
              {msg.n} yeni mesaj
            </Link>
          )}
        </div>
        {pending.length === 0 ? (
          <Card><p className="text-sm text-stone-500">Bekleyen talep yok — her şey yolunda.</p></Card>
        ) : (
          <div className="space-y-2">
            {pending.map((r) => (
              <Link key={r.id} href={`/admin/rezervasyonlar?ref=${encodeURIComponent(r.ref)}`}
                    className="block transition-transform hover:-translate-y-0.5">
                <Card className="flex flex-wrap items-center gap-x-4 gap-y-1.5 py-3.5">
                  <span className="text-sm font-bold" style={{ color: C.pine }}>{r.ref}</span>
                  <span className="min-w-0 flex-1 basis-[50%] break-words text-sm text-stone-700">{r.pickup} → {r.dropoff}</span>
                  <span className="text-xs text-stone-500">{r.ride_date} {r.ride_time}</span>
                  {r.price && <span className="text-sm font-bold tabular-nums" style={{ color: C.pine }}>CHF {Number(r.price).toFixed(2)}</span>}
                  <span className="rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ background: `${C.gold}22`, color: C.pine }}>
                    İşle →
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
