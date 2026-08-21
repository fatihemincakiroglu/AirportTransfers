"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card, StatusPill, STATUS_DOT } from "../../ui";

export type Trip = {
  id: number; ref: string; status: string;
  ride_date: string | null; ride_time: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null;
  vehicle: string | null; price: string | null;
  first_name: string | null; last_name: string | null; phone: string | null; pax: number | null;
};

const TR_MONTHS = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const shift = (ym: string, delta: number) => {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export default function CalendarView({ month, trips, months }: { month: string; trips: Trip[]; months: string[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const [year, mon] = month.split("-").map(Number);
  const first = new Date(year, mon - 1, 1);
  const daysInMonth = new Date(year, mon, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7; // Pazartesi = 0
  const todayStr = new Date().toISOString().slice(0, 10);

  const byDay = new Map<string, Trip[]>();
  for (const t of trips) {
    const k = t.ride_date as string;
    byDay.set(k, [...(byDay.get(k) ?? []), t]);
  }

  const go = (ym: string) => router.push(`/admin/takvim?ay=${ym}`);
  const shown = selected ? (byDay.get(selected) ?? []) : trips;

  const cells: (string | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <>
      {/* Ay gezinme + hızlı seçim */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex items-center justify-between gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5 sm:justify-start">
          <button type="button" onClick={() => go(shift(month, -1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100" aria-label="Önceki ay">‹</button>
          <span className="flex-1 text-center text-sm font-bold sm:min-w-[150px] sm:flex-none" style={{ color: C.pine }}>
            {TR_MONTHS[mon - 1]} {year}
          </span>
          <button type="button" onClick={() => go(shift(month, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100" aria-label="Sonraki ay">›</button>
        </div>

        <button type="button" onClick={() => { setSelected(null); go(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`); }}
          className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm ring-1 ring-black/5" style={{ color: C.pine }}>
          Bu ay
        </button>

        <select
          value={months.includes(month) ? month : ""}
          onChange={(e) => { if (e.target.value) { setSelected(null); go(e.target.value); } }}
          className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold outline-none sm:ml-auto sm:w-auto"
          style={{ color: C.pine }}
        >
          <option value="">Kayıtlı aylar…</option>
          {months.map((m) => {
            const [y, mm] = m.split("-").map(Number);
            return <option key={m} value={m}>{TR_MONTHS[mm - 1]} {y}</option>;
          })}
        </select>
      </div>

      {/* Ay ızgarası */}
      <Card className="p-2 sm:p-3 md:p-5">
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 md:gap-2">
          {WEEKDAYS.map((w) => (
            <div key={w} className="pb-1 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{w}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`e${i}`} />;
            const list = byDay.get(day) ?? [];
            const isToday = day === todayStr;
            const isSelected = day === selected;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelected(isSelected ? null : day)}
                className="flex min-h-[54px] flex-col items-start rounded-lg p-1.5 text-left transition-all hover:-translate-y-0.5 sm:min-h-[68px] sm:rounded-xl sm:p-2 md:min-h-[84px]"
                style={{
                  background: isSelected ? C.pine : list.length ? "#FBF9F3" : "#FAFAF9",
                  boxShadow: isToday ? `inset 0 0 0 2px ${C.gold}` : "inset 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                <span className="text-xs font-bold" style={{ color: isSelected ? "#fff" : list.length ? C.pine : "#A8A29E" }}>
                  {Number(day.slice(-2))}
                </span>
                <span className="mt-1 flex flex-wrap gap-1">
                  {list.slice(0, 4).map((t) => (
                    <span key={t.id} className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_DOT[t.status] ?? "#A8A29E" }} />
                  ))}
                </span>
                {list.length > 0 && (
                  <span className="mt-auto text-[10px] font-semibold" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "#A8A29E" }}>
                    <span className="hidden sm:inline">{list.length} yolculuk</span>
                    <span className="sm:hidden">{list.length}×</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Liste */}
      <div className="mt-5">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="text-sm font-bold" style={{ color: C.pine }}>
            {selected
              ? `${Number(selected.slice(-2))} ${TR_MONTHS[mon - 1]} ${year}`
              : `${TR_MONTHS[mon - 1]} ${year} — tüm yolculuklar`}
          </h2>
          <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
          {selected && (
            <button type="button" onClick={() => setSelected(null)} className="text-xs font-bold text-stone-400 hover:text-stone-600">
              filtreyi kaldır
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <Card><p className="text-sm text-stone-500">Bu dönemde yolculuk yok.</p></Card>
        ) : (
          <div className="space-y-2">
            {shown.map((t) => (
              <Card key={t.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
                <span className="w-14 shrink-0 text-base font-semibold tabular-nums sm:w-16 sm:text-lg" style={{ color: STATUS_DOT[t.status] ?? C.pine }}>
                  {t.ride_time || "--:--"}
                </span>
                <span className="min-w-0 flex-1 basis-[60%]">
                  <span className="block break-words text-sm font-medium text-stone-700">{t.pickup} → {t.dropoff}</span>
                  {t.stops && <span className="block text-xs text-stone-400">Ara durak: {t.stops}</span>}
                </span>
                <span className="text-sm text-stone-500">
                  {[t.first_name, t.last_name].filter(Boolean).join(" ")}
                  {t.pax ? ` · ${t.pax} kişi` : ""}
                </span>
                <span className="text-xs text-stone-400">{t.vehicle}</span>
                {t.price && <span className="text-sm font-bold tabular-nums" style={{ color: C.pine }}>CHF {Number(t.price).toFixed(2)}</span>}
                <StatusPill status={t.status} />
                {t.phone && (
                  <a href={`https://wa.me/${t.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                     className="rounded-full px-3 py-1.5 text-[11px] font-bold text-white" style={{ background: "#25D366" }}>
                    WhatsApp
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

    </>
  );
}
