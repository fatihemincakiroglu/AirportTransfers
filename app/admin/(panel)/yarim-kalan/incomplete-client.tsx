"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card } from "../../ui";

export type Incomplete = {
  id: number; ref: string; lang: string | null; channel: string | null;
  pickup: string | null; dropoff: string | null; ride_date: string | null; ride_time: string | null;
  pax: number | null; vehicle: string | null; price: string | null; payment: string | null; payment_status: string | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null; created_at: string;
};

const fmt = (iso: string) => new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function IncompleteClient({ rows }: { rows: Incomplete[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);

  const remove = async (r: Incomplete) => {
    if (!confirm(`${r.ref} silinsin mi?`)) return;
    setBusy(r.id);
    await fetch("/api/admin/bookings", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: r.id }) });
    setBusy(null);
    router.refresh();
  };

  if (!rows.length) return <Card><p className="text-sm text-stone-500">Yarım kalan kayıt yok.</p></Card>;

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-wide text-stone-400">
            {["Ref", "Geliş", "Bilgi", "Güzergâh", "Yolculuk", "Araç", "Tutar", "Eksik", ""].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const missing = [!r.first_name?.trim() && "ad", !r.last_name?.trim() && "soyad", !r.email?.trim() && "e-posta", !r.phone?.trim() && "telefon"].filter(Boolean).join(", ");
            const contact = [r.first_name, r.last_name].filter(Boolean).join(" ") || null;
            return (
              <tr key={r.id} className="border-t border-stone-100 align-top">
                <td className="px-4 py-3 font-bold" style={{ color: C.pine }}>{r.ref}</td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-500">{fmt(r.created_at)}</td>
                <td className="px-4 py-3">
                  {contact && <span className="block">{contact}</span>}
                  {r.phone && <a href={`https://wa.me/${r.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-xs underline" style={{ color: C.pine }}>{r.phone}</a>}
                  {r.email && <a href={`mailto:${r.email}`} className="block text-xs underline" style={{ color: C.pine }}>{r.email}</a>}
                  {!contact && !r.phone && !r.email && <span className="text-stone-300">—</span>}
                </td>
                <td className="px-4 py-3 text-stone-700">{r.pickup ?? "—"} → {r.dropoff ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-stone-700">{r.ride_date ?? "—"} {r.ride_time ?? ""}</td>
                <td className="px-4 py-3 text-stone-500">{r.vehicle ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{r.price ? `CHF ${Number(r.price).toFixed(2)}` : "—"}</td>
                <td className="px-4 py-3 text-xs text-stone-500">{missing}</td>
                <td className="px-4 py-3">
                  <button type="button" disabled={busy === r.id} onClick={() => remove(r)}
                    className="rounded-full px-3 py-1.5 text-[11px] font-bold disabled:opacity-40" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                    Sil
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
