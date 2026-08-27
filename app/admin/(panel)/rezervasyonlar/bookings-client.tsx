"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card, StatusPill, STATUS_LABEL, STATUS_STYLE, STATUS_SOLID, fmtDate } from "../../ui";
import DecisionButtons from "../../decision-buttons";

export type Booking = {
  id: number; ref: string; status: string; lang: string | null; channel: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null; luggage: number | null;
  vehicle: string | null; price: string | null; payment: string | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null;
  flight: string | null; nameboard: string | null; extras: string | null;
  notes: string | null; admin_note: string | null; created_at: string;
  driver_id?: number | null; source?: string | null; reject_reason?: string | null;
};

/** Ret sebebi anahtarı → Türkçe etiket */
const REJECT_LABEL: Record<string, string> = {
  busy: "Araç o saatte dolu", distance: "Konum hizmet alanı dışında", service: "Araç bakımda",
  capacity: "Kapasite yetersiz", short: "Talep çok kısa sürede", other: "Diğer",
};

type Driver = { id: number; name: string };
type History = Record<string, { trips: number; spent: number }>;

/** Düzenlenebilir alanlar: [anahtar, etiket, tip] */
const EDIT_FIELDS: [keyof Booking, string, string][] = [
  ["pickup", "Alınış", "text"], ["dropoff", "Varış", "text"], ["stops", "Ara duraklar", "text"],
  ["ride_date", "Yolculuk tarihi", "date"], ["ride_time", "Saat", "time"],
  ["pax", "Yolcu", "number"], ["luggage", "Bagaj", "number"],
  ["vehicle", "Araç", "text"], ["price", "Tutar (CHF)", "number"], ["payment", "Ödeme", "text"],
  ["first_name", "Ad", "text"], ["last_name", "Soyad", "text"],
  ["phone", "Telefon", "text"], ["email", "E-posta", "text"],
  ["flight", "Uçuş no", "text"], ["extras", "Ekstralar", "text"], ["notes", "Müşteri notu", "text"],
];

const FILTERS: [string, string][] = [
  ["all", "Tümü"], ["new", "Yeni"], ["confirmed", "Onaylı"], ["done", "Tamamlandı"], ["cancelled", "İptal"],
];

const TR_MONTHS = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
/** Kayıtları yolculuk tarihine (yoksa kayıt tarihine) göre aya böler */
function groupByMonth(rows: Booking[]): [string, Booking[]][] {
  const map = new Map<string, Booking[]>();
  for (const r of rows) {
    const ym = (r.ride_date && /^\d{4}-\d{2}/.test(r.ride_date))
      ? r.ride_date.slice(0, 7)
      : String(r.created_at).slice(0, 7);
    map.set(ym, [...(map.get(ym) ?? []), r]);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

const monthName = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${TR_MONTHS[m - 1]} ${y}`;
};

export default function BookingsClient({
  rows, months, month, openRef = null, drivers = [], history = {},
}: {
  rows: Booking[]; months: string[]; month: string; openRef?: string | null;
  drivers?: Driver[]; history?: History;
}) {
  const [filter, setFilter] = useState("all");
  const [edit, setEdit] = useState<Record<string, string> | null>(null);
  const [note, setNote] = useState("");
  const [q, setQ] = useState("");
  // Bugün ekranı/takvimden gelen bağlantı doğrudan ilgili kaydı açar
  const [open, setOpen] = useState<Booking | null>(() => rows.find((r) => r.ref === openRef) ?? null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const list = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (!q.trim()) return true;
    const hay = [r.ref, r.first_name, r.last_name, r.email, r.phone, r.pickup, r.dropoff, r.flight]
      .filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const update = async (id: number, patch: { status?: string; adminNote?: string; fields?: Record<string, string> }) => {
    setBusy(true);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    setBusy(false);
    setOpen(null);
    setEdit(null);
    router.refresh();
  };

  /** Müşteri geçmişi anahtarı: e-posta varsa e-posta, yoksa telefon */
  const histOf = (b: Booking) => {
    const key = (b.email || b.phone || "").toLowerCase();
    return key ? history[key] : undefined;
  };

  const startEdit = (b: Booking) => {
    const init: Record<string, string> = {};
    for (const [k] of EDIT_FIELDS) init[k as string] = b[k] == null ? "" : String(b[k]);
    init.driver_id = b.driver_id ? String(b.driver_id) : "";
    setEdit(init);
    setNote(b.admin_note ?? "");
  };

  return (
    <>
      {/* Filtre + arama */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className="rounded-full px-4 py-2 text-xs font-bold transition-colors"
              style={
                filter === key
                  ? key === "all" ? { background: C.pine, color: "#fff" } : STATUS_SOLID[key]
                  : key === "all" ? { background: "#fff", color: C.pine } : STATUS_STYLE[key]
              }
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center md:ml-auto">
          <select
            value={month}
            onChange={(e) => router.push(e.target.value === "all" ? "/admin/rezervasyonlar" : `/admin/rezervasyonlar?ay=${e.target.value}`)}
            className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-bold outline-none sm:w-auto"
            style={{ color: C.pine }}
          >
            <option value="all">Tüm aylar</option>
            {months.map((m) => <option key={m} value={m}>{monthName(m)}</option>)}
          </select>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ref, isim, e-posta, telefon, uçuş…"
            className="w-full rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#C9A24B] sm:max-w-xs"
          />
        </div>
      </div>

      {/* Aylara bölünmüş liste */}
      {list.length === 0 ? (
        <Card><p className="p-6 text-sm text-stone-500">Kayıt bulunamadı.</p></Card>
      ) : (
        <div className="space-y-7">
          {groupByMonth(list).map(([ym, items]) => {
            const rev = items
              .filter((r) => r.status === "confirmed" || r.status === "done")
              .reduce((sum, r) => sum + Number(r.price ?? 0), 0);
            return (
              <div key={ym}>
                {/* Ay başlığı */}
                <div className="mb-2.5 flex flex-wrap items-baseline gap-3">
                  <h2 className="text-sm font-bold" style={{ color: C.pine }}>{monthName(ym)}</h2>
                  <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}55, transparent 70%)` }} />
                  <span className="text-xs font-semibold text-stone-400">{items.length} kayıt</span>
                  {rev > 0 && (
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-extrabold" style={{ background: `${C.gold}22`, color: C.pine }}>
                      CHF {rev.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Mobil: kart listesi */}
                <div className="space-y-2 md:hidden">
                  {items.map((r) => (
                    <button key={r.id} type="button" onClick={() => setOpen(r)}
                      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-black/5 active:scale-[0.99]">
                      <div className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className="block text-sm font-bold" style={{ color: C.pine }}>{r.ref}</span>
                          <span className="block truncate text-xs text-stone-500">
                            {[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}
                          </span>
                        </span>
                        <StatusPill status={r.status} />
                      </div>
                      <p className="mt-2.5 break-words text-sm text-stone-700">{r.pickup} → {r.dropoff}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                        <span>📅 {r.ride_date} {r.ride_time}</span>
                        {r.vehicle && <span className="truncate">🚘 {r.vehicle.split("·")[0].trim()}</span>}
                        {r.price && (
                          <span className="ml-auto font-bold tabular-nums" style={{ color: C.pine }}>
                            CHF {Number(r.price).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Masaüstü: tablo */}
                <Card className="hidden overflow-x-auto p-0 md:block">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                        <th className="px-5 py-3">Ref</th><th className="px-4 py-3">Geliş</th>
                        <th className="px-4 py-3">Müşteri</th><th className="px-4 py-3">Güzergâh</th>
                        <th className="px-4 py-3">Yolculuk</th><th className="px-4 py-3">Araç</th>
                        <th className="px-4 py-3">Tutar</th><th className="px-4 py-3">Durum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                      {items.map((r) => (
                        <tr key={r.id} onClick={() => setOpen(r)} className="cursor-pointer hover:bg-stone-50">
                          <td className="px-5 py-3 font-bold" style={{ color: C.pine }}>{r.ref}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-stone-500">{fmtDate(r.created_at)}</td>
                          <td className="px-4 py-3">{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</td>
                          <td className="px-4 py-3 text-stone-600">{r.pickup} → {r.dropoff}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-stone-600">{r.ride_date} {r.ride_time}</td>
                          <td className="px-4 py-3 text-stone-600">{r.vehicle ?? "—"}</td>
                          <td className="px-4 py-3 tabular-nums">{r.price ? `CHF ${Number(r.price).toFixed(2)}` : "—"}</td>
                          <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Detay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={() => setOpen(null)}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">Rezervasyon</p>
                <h3 className="text-xl font-semibold" style={{ color: C.pine }}>{open.ref}</h3>
              </div>
              <StatusPill status={open.status} />
            </div>

            {/* Müşteri geçmişi rozeti */}
            {histOf(open) && (
              <div className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: `${C.gold}18` }}>
                <span className="text-lg">🏅</span>
                <span className="text-sm">
                  <b style={{ color: C.pine }}>{histOf(open)!.trips}. yolculuk</b>
                  <span className="block text-xs text-stone-500">
                    Bu müşteriden toplam CHF {histOf(open)!.spent.toFixed(2)} ciro
                  </span>
                </span>
              </div>
            )}

            {edit ? (
              /* ── Düzenleme modu ── */
              <div className="mt-5 space-y-3">
                {EDIT_FIELDS.map(([k, label, type]) => (
                  <label key={k as string} className="block">
                    <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-400">{label}</span>
                    <input
                      type={type}
                      value={edit[k as string] ?? ""}
                      onChange={(e) => setEdit({ ...edit, [k as string]: e.target.value })}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24B]"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-400">Şoför</span>
                  <select
                    value={edit.driver_id ?? ""}
                    onChange={(e) => setEdit({ ...edit, driver_id: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24B]"
                  >
                    <option value="">— atanmadı —</option>
                    {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-400">Panel notu</span>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2}
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24B]" />
                </label>
                <div className="flex gap-2 pt-1">
                  <button type="button" disabled={busy}
                    onClick={() => update(open.id, { fields: edit, adminNote: note })}
                    className="flex-1 rounded-xl py-3 text-xs font-extrabold uppercase tracking-wide disabled:opacity-40"
                    style={{ background: C.gold, color: C.pine }}>
                    {busy ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
                  </button>
                  <button type="button" onClick={() => setEdit(null)}
                    className="rounded-xl bg-stone-100 px-5 py-3 text-xs font-extrabold uppercase text-stone-600">
                    Vazgeç
                  </button>
                </div>
              </div>
            ) : (
              <>
            <dl className="mt-5 space-y-2 text-sm">
              {([
                ["Müşteri", [open.first_name, open.last_name].filter(Boolean).join(" ")],
                ["E-posta", open.email], ["Telefon", open.phone],
                ["Güzergâh", `${open.pickup ?? "—"} → ${open.dropoff ?? "—"}`],
                ["Ara duraklar", open.stops], ["Tarih / saat", `${open.ride_date ?? ""} ${open.ride_time ?? ""}`],
                ["Yolcu / bagaj", `${open.pax ?? "—"} / ${open.luggage ?? "—"}`],
                ["Araç", open.vehicle],
                ["Şoför", drivers.find((d) => d.id === open.driver_id)?.name ?? null],
                ["Tutar", open.price ? `CHF ${Number(open.price).toFixed(2)}` : null],
                ["Ödeme", open.payment], ["Uçuş", open.flight], ["İsim tabelası", open.nameboard],
                ["Ekstralar", open.extras], ["Müşteri notu", open.notes],
                ["Panel notu", open.admin_note],
                ["Kaynak", open.source === "panel" ? "Panelden eklendi" : "Siteden geldi"],
                ["Dil / kanal", [open.lang, open.channel].filter(Boolean).join(" · ")],
                ["Kayıt", fmtDate(open.created_at)],
              ] as [string, string | null][])
                .filter(([, v]) => v && String(v).trim())
                .map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5 border-b border-stone-50 pb-2 sm:flex-row sm:gap-4">
                    <dt className="shrink-0 text-xs text-stone-400 sm:w-32 sm:text-sm">{k}</dt>
                    <dd className="break-words font-medium text-stone-700">{v}</dd>
                  </div>
                ))}
            </dl>

            <button type="button" onClick={() => startEdit(open)}
              className="mt-4 w-full rounded-xl bg-stone-100 py-3 text-xs font-extrabold uppercase tracking-wide text-stone-600">
              ✎ Kaydı düzenle
            </button>

            {open.status === "new" && !edit && (
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Talebi değerlendir</p>
                <DecisionButtons b={open} />
              </div>
            )}

            {open.reject_reason && (
              <p className="mt-4 rounded-xl px-4 py-3 text-sm" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                <b>Ret sebebi:</b> {REJECT_LABEL[open.reject_reason] ?? open.reject_reason}
              </p>
            )}

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Durumu değiştir</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    disabled={busy || open.status === key}
                    onClick={() => update(open.id, { status: key })}
                    className="rounded-full px-4 py-2 text-xs font-bold transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-100"
                    style={key === open.status ? STATUS_SOLID[key] : STATUS_STYLE[key]}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

              </>
            )}

            <div className="mt-5 flex justify-end gap-2">
              {open.phone && (
                <a href={`https://wa.me/${open.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                   className="rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: "#25D366" }}>
                  WhatsApp
                </a>
              )}
              <button type="button" onClick={() => setOpen(null)} className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-600">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
