"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card } from "../../ui";

export type Driver = {
  id: number; name: string; phone: string | null; email: string | null;
  vehicle: string | null; note: string | null; active: boolean;
  trips: number; upcoming: number;
};

const EMPTY = { name: "", phone: "", email: "", vehicle: "", note: "" };

export default function DriversClient({ rows }: { rows: Driver[] }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const save = async () => {
    if (!form.name.trim()) return;
    setBusy(true);
    await fetch("/api/admin/drivers", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { id: editing, ...form } : form),
    });
    setBusy(false); setForm(EMPTY); setEditing(null); setOpen(false);
    router.refresh();
  };

  const toggle = async (id: number, active: boolean) => {
    await fetch("/api/admin/drivers", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    router.refresh();
  };

  const inputCls = "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none focus:border-[#C9A24B]";

  return (
    <>
      <button type="button" onClick={() => { setForm(EMPTY); setEditing(null); setOpen(true); }}
        className="mb-5 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm"
        style={{ background: C.gold, color: C.pine }}>
        + Şoför ekle
      </button>

      {rows.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Henüz şoför eklenmedi.</p></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((d) => (
            <Card key={d.id} className={d.active ? "" : "opacity-60"}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-bold" style={{ color: C.pine }}>
                    {d.name}
                    {!d.active && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-extrabold text-stone-500">PASİF</span>}
                  </p>
                  <p className="truncate text-xs text-stone-500">
                    {d.phone}{d.email ? ` · ${d.email}` : ""}
                  </p>
                  {d.vehicle && <p className="mt-0.5 text-xs text-stone-400">🚘 {d.vehicle}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xl font-semibold" style={{ color: C.pine }}>{d.trips}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">yolculuk</p>
                  {d.upcoming > 0 && (
                    <p className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: `${C.gold}22`, color: C.pine }}>
                      {d.upcoming} yaklaşan
                    </p>
                  )}
                </div>
              </div>
              {d.note && <p className="mt-2 text-sm text-stone-600">{d.note}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button"
                  onClick={() => { setForm({ name: d.name, phone: d.phone ?? "", email: d.email ?? "", vehicle: d.vehicle ?? "", note: d.note ?? "" }); setEditing(d.id); setOpen(true); }}
                  className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-600">Düzenle</button>
                {d.phone && (
                  <a href={`https://wa.me/${d.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                     className="rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: "#25D366" }}>WhatsApp</a>
                )}
                <button type="button" onClick={() => toggle(d.id, !d.active)}
                  className="ml-auto rounded-full px-4 py-2 text-xs font-bold"
                  style={d.active ? { background: "#FEE2E2", color: "#B91C1C" } : { background: "#D1FAE5", color: "#065F46" }}>
                  {d.active ? "Pasife al" : "Aktif et"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Ekle / düzenle formu */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-md overflow-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold" style={{ color: C.pine }}>{editing ? "Şoförü düzenle" : "Yeni şoför"}</h3>
            <div className="mt-4 space-y-3">
              {([["name", "Ad soyad *"], ["phone", "Telefon"], ["email", "E-posta"], ["vehicle", "Araç / plaka"], ["note", "Not"]] as [keyof typeof EMPTY, string][]).map(([k, label]) => (
                <label key={k} className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-400">{label}</span>
                  <input value={form[k]} onChange={(e) => set(k, e.target.value)} className={inputCls} />
                </label>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button type="button" onClick={save} disabled={busy || !form.name.trim()}
                className="flex-1 rounded-xl py-3 text-xs font-extrabold uppercase tracking-wide disabled:opacity-40"
                style={{ background: C.gold, color: C.pine }}>
                {busy ? "Kaydediliyor…" : "Kaydet"}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-xl bg-stone-100 px-5 py-3 text-xs font-extrabold uppercase text-stone-600">
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
