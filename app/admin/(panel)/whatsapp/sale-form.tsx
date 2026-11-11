"use client";
// WhatsApp Ref satırındaki satış girişi: "Satış oldu" (tutar + tarih/saat) · "Satış olmadı" · geri al · test
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  ref_: string; status: string | null; value: string | null; saleAt: string | null; isTest: boolean;
};

const today = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Zurich" });

export default function SaleForm({ ref_, status, value, saleAt, isTest }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(value ?? "");
  const [d, setD] = useState(saleAt ? saleAt.slice(0, 10) : today());
  const [t, setT] = useState(saleAt ? saleAt.slice(11, 16) : "12:00");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const send = async (body: Record<string, unknown>) => {
    setBusy(true); setErr(null);
    const res = await fetch("/api/admin/wa-refs", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref: ref_, ...body }) });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (!res.ok || !data?.ok) { setErr(data?.error ?? "Kaydedilemedi"); return; }
    setOpen(false); router.refresh();
  };

  const badge = status === "sale"
    ? <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">Satış · CHF {Number(value).toFixed(2)}</span>
    : status === "no_sale"
      ? <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[11px] font-bold text-stone-700">Satış olmadı</span>
      : <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">Açık</span>;

  return (
    <div className="min-w-[300px]">
      <div className="flex flex-wrap items-center gap-1.5">
        {badge}
        {isTest && <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-800">TEST</span>}
        <button type="button" onClick={() => setOpen((o) => !o)} className="text-[11px] font-bold underline">{open ? "Kapat" : "Düzenle"}</button>
      </div>
      {open && (
        <div className="mt-2 space-y-2 rounded-lg bg-stone-50 p-2.5 ring-1 ring-stone-200">
          <div className="grid grid-cols-[90px_minmax(130px,1fr)_100px] gap-1.5">
            <input type="number" step="0.05" min="0" placeholder="CHF" value={v} onChange={(e) => setV(e.target.value)} className="h-8 rounded border border-stone-300 px-2 text-xs" />
            <input type="date" value={d} onChange={(e) => setD(e.target.value)} className="h-8 rounded border border-stone-300 px-1 text-xs" />
            <input type="time" value={t} onChange={(e) => setT(e.target.value)} className="h-8 rounded border border-stone-300 px-1 text-xs" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" disabled={busy} onClick={() => send({ sale_status: "sale", value: v, date: d, time: t })} className="rounded bg-emerald-700 px-2.5 py-1 text-[11px] font-bold text-white disabled:opacity-50">Satış oldu</button>
            <button type="button" disabled={busy} onClick={() => send({ sale_status: "no_sale" })} className="rounded bg-stone-700 px-2.5 py-1 text-[11px] font-bold text-white disabled:opacity-50">Satış olmadı</button>
            {status && <button type="button" disabled={busy} onClick={() => send({ sale_status: null })} className="rounded border border-stone-400 px-2.5 py-1 text-[11px] font-bold disabled:opacity-50">Geri al</button>}
            <button type="button" disabled={busy} onClick={() => send({ is_test: !isTest })} className="rounded border border-sky-400 px-2.5 py-1 text-[11px] font-bold text-sky-800 disabled:opacity-50">{isTest ? "Test değil" : "Test kaydı"}</button>
          </div>
          <p className="text-[10.5px] text-stone-500">Tarih/saat İsviçre saatiyle. Tutar: tahsil edilen gerçek tutar (KDV dahil).</p>
          {err && <p className="text-[11px] font-bold text-red-700">{err}</p>}
        </div>
      )}
    </div>
  );
}
