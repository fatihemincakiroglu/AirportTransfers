"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card, StatusPill, STATUS_LABEL, fmtDate } from "../../ui";

export type Booking = {
  id: number; ref: string; status: string; lang: string | null; channel: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null; luggage: number | null;
  vehicle: string | null; price: string | null; payment: string | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null;
  flight: string | null; nameboard: string | null; extras: string | null;
  notes: string | null; admin_note: string | null; created_at: string;
};

const FILTERS: [string, string][] = [
  ["all", "Tümü"], ["new", "Yeni"], ["confirmed", "Onaylı"], ["done", "Tamamlandı"], ["cancelled", "İptal"],
];

export default function BookingsClient({ rows }: { rows: Booking[] }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Booking | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const list = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (!q.trim()) return true;
    const hay = [r.ref, r.first_name, r.last_name, r.email, r.phone, r.pickup, r.dropoff, r.flight]
      .filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const update = async (id: number, patch: { status?: string; adminNote?: string }) => {
    setBusy(true);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    setBusy(false);
    setOpen(null);
    router.refresh();
  };

  return (
    <>
      {/* Filtre + arama */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className="rounded-full px-4 py-2 text-xs font-bold transition-colors"
              style={filter === key ? { background: C.pine, color: "#fff" } : { background: "#fff", color: C.pine }}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ref, isim, e-posta, telefon, uçuş…"
          className="ml-auto w-full max-w-xs rounded-full border border-stone-200 bg-white px-4 py-2 text-sm outline-none focus:border-[#C9A24B]"
        />
      </div>

      <Card className="overflow-x-auto p-0">
        {list.length === 0 ? (
          <p className="p-6 text-sm text-stone-500">Kayıt bulunamadı.</p>
        ) : (
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
              {list.map((r) => (
                <tr key={r.id} onClick={() => setOpen(r)} className="cursor-pointer hover:bg-stone-50">
                  <td className="px-5 py-3 font-bold" style={{ color: C.pine }}>{r.ref}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-stone-500">{fmtDate(r.created_at)}</td>
                  <td className="px-4 py-3">{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3 text-stone-600">{r.pickup} → {r.dropoff}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">{r.ride_date} {r.ride_time}</td>
                  <td className="px-4 py-3 text-stone-600">{r.vehicle ?? "—"}</td>
                  <td className="px-4 py-3 tabular-nums">{r.price ? `CHF ${Number(r.price).toFixed(2)}` : "—"}</td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Detay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setOpen(null)}>
          <div className="max-h-[88vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">Rezervasyon</p>
                <h3 className="text-xl font-semibold" style={{ color: C.pine }}>{open.ref}</h3>
              </div>
              <StatusPill status={open.status} />
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              {([
                ["Müşteri", [open.first_name, open.last_name].filter(Boolean).join(" ")],
                ["E-posta", open.email], ["Telefon", open.phone],
                ["Güzergâh", `${open.pickup ?? "—"} → ${open.dropoff ?? "—"}`],
                ["Ara duraklar", open.stops], ["Tarih / saat", `${open.ride_date ?? ""} ${open.ride_time ?? ""}`],
                ["Yolcu / bagaj", `${open.pax ?? "—"} / ${open.luggage ?? "—"}`],
                ["Araç", open.vehicle], ["Tutar", open.price ? `CHF ${Number(open.price).toFixed(2)}` : null],
                ["Ödeme", open.payment], ["Uçuş", open.flight], ["İsim tabelası", open.nameboard],
                ["Ekstralar", open.extras], ["Müşteri notu", open.notes],
                ["Dil / kanal", [open.lang, open.channel].filter(Boolean).join(" · ")],
                ["Kayıt", fmtDate(open.created_at)],
              ] as [string, string | null][])
                .filter(([, v]) => v && String(v).trim())
                .map(([k, v]) => (
                  <div key={k} className="flex gap-4 border-b border-stone-50 pb-2">
                    <dt className="w-32 shrink-0 text-stone-400">{k}</dt>
                    <dd className="font-medium text-stone-700">{v}</dd>
                  </div>
                ))}
            </dl>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">Durumu değiştir</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    disabled={busy || open.status === key}
                    onClick={() => update(open.id, { status: key })}
                    className="rounded-full px-4 py-2 text-xs font-bold transition-opacity disabled:opacity-40"
                    style={{ background: key === open.status ? C.pine : "#F5F5F4", color: key === open.status ? "#fff" : C.pine }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

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
