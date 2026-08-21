import { sql, ensureSchemaSafe as ensureSchema, dbReady } from "../../../lib/db";
import Link from "next/link";
import { C, Card, PageTitle, NoDb } from "../../ui";

export const dynamic = "force-dynamic";

type Row = { id: number; kind: string; detail: string | null; ip: string | null; actor: string | null; ref: string | null; created_at: string };

// Olay türü → Türkçe etiket, simge ve renk
const KIND: Record<string, { label: string; icon: string; bg: string; fg: string }> = {
  login_ok:       { label: "Giriş",            icon: "🔓", bg: "#D1FAE5", fg: "#065F46" },
  login_failed:   { label: "Başarısız giriş",  icon: "⛔", bg: "#FEE2E2", fg: "#B91C1C" },
  booking_new:    { label: "Yeni rezervasyon", icon: "🚗", bg: "#FEF3C7", fg: "#92400E" },
  booking_status: { label: "Durum değişikliği",icon: "🔄", bg: "#DBEAFE", fg: "#1E40AF" },
  booking_note:   { label: "Not eklendi",      icon: "📝", bg: "#EDE9FE", fg: "#5B21B6" },
  contact_new:    { label: "Yeni mesaj",       icon: "✉️", bg: "#E0F2FE", fg: "#075985" },
  contact_status: { label: "Mesaj durumu",     icon: "📬", bg: "#E0F2FE", fg: "#075985" },
  invoice:        { label: "Fatura",           icon: "🧾", bg: "#D1FAE5", fg: "#065F46" },
};

const ACTOR: Record<string, string> = { panel: "Yönetici", site: "Ziyaretçi", sistem: "Sistem" };

function relTime(d: string) {
  const diff = (Date.now() - new Date(d).getTime()) / 1000;
  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} gün önce`;
  return new Date(d).toLocaleDateString("tr-TR");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ tur?: string }> }) {
  if (!dbReady) return (<><PageTitle title="Sistem Logları" /><NoDb /></>);
  await ensureSchema();

  const { tur } = await searchParams;
  const rows = (tur && KIND[tur]
    ? await sql`SELECT id, kind, detail, ip, actor, ref, created_at FROM logs WHERE kind = ${tur} ORDER BY created_at DESC LIMIT 300`
    : await sql`SELECT id, kind, detail, ip, actor, ref, created_at FROM logs ORDER BY created_at DESC LIMIT 300`
  ) as unknown as Row[];

  const counts = (await sql`SELECT kind, COUNT(*)::int AS n FROM logs GROUP BY kind`) as unknown as { kind: string; n: number }[];
  const countOf = (k: string) => counts.find((c) => c.kind === k)?.n ?? 0;

  // Günlere göre grupla
  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const day = new Date(r.created_at).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    groups.set(day, [...(groups.get(day) ?? []), r]);
  }

  return (
    <>
      <PageTitle title="Sistem Logları" sub="Sitede ve panelde olan biten her şey" />

      {/* Tür filtreleri */}
      <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
        <Link href="/admin/loglar" className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold shadow-sm"
           style={!tur ? { background: C.pine, color: "#fff" } : { background: "#fff", color: C.pine }}>
          Tümü ({counts.reduce((s, c) => s + c.n, 0)})
        </Link>
        {Object.entries(KIND).map(([key, k]) => (
          <Link key={key} href={`/admin/loglar?tur=${key}`}
             className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-opacity"
             style={tur === key ? { background: k.fg, color: "#fff" } : { background: k.bg, color: k.fg, opacity: countOf(key) ? 1 : 0.45 }}>
            {k.icon} {k.label} ({countOf(key)})
          </Link>
        ))}
      </div>

      {rows.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Kayıt yok.</p></Card>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([day, list]) => (
            <div key={day}>
              <div className="mb-2 flex items-baseline gap-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: C.pine }}>{day}</h2>
                <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
                <span className="text-[11px] text-stone-400">{list.length} olay</span>
              </div>
              <div className="space-y-2">
                {list.map((r) => {
                  const k = KIND[r.kind] ?? { label: r.kind, icon: "•", bg: "#F5F5F4", fg: "#57534E" };
                  return (
                    <Card key={r.id} className="flex items-start gap-3 py-3.5 sm:gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm" style={{ background: k.bg }}>
                        {k.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ background: k.bg, color: k.fg }}>
                            {k.label}
                          </span>
                          <span className="text-[11px] font-semibold text-stone-400">{ACTOR[r.actor ?? "sistem"] ?? r.actor}</span>
                          {r.ref && <span className="text-[11px] font-bold" style={{ color: C.pine }}>{r.ref}</span>}
                        </div>
                        <p className="mt-1 break-words text-sm leading-relaxed text-stone-700">{r.detail}</p>
                      </div>
                      <div className="shrink-0 text-right text-[10px] sm:text-xs">
                        <p className="text-[11px] font-semibold text-stone-500">
                          {new Date(r.created_at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <p className="text-[10px] text-stone-400">{relTime(r.created_at)}</p>
                        {r.ip && <p className="mt-0.5 text-[10px] text-stone-300">{r.ip}</p>}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
