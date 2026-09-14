"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card } from "../../ui";
import { fleet } from "../../../config";

/** Sistem dışı fatura: bilgileri elle gir → kayıt + fatura numarası → yazdırılabilir fatura açılır */
const VEHICLES = fleet.map((f) => `${typeof f.name === "string" ? f.name : f.name.de} · ${f.car}`);
const PAYMENTS = ["Nakit", "Kart", "TWINT", "Banka havalesi", "Online (Stripe)"];

const EMPTY = {
  first_name: "", last_name: "", email: "", phone: "", payment: "", price: "",
  vehicle: "", pickup: "", dropoff: "", ride_date: "", ride_time: "",
};

export default function ManualInvoice() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof EMPTY, v: string) => setF((s) => ({ ...s, [k]: v }));

  const ready = Object.entries(f).every(([, v]) => v.trim()) && Number(f.price) > 0;

  const submit = async () => {
    if (!ready || busy) return;
    setBusy(true); setErr(null);
    const res = await fetch("/api/admin/invoice/manual", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok || !d.ok) { setErr(d.error ?? "Fatura oluşturulamadı"); return; }
    setF(EMPTY); setOpen(false);
    router.push(`/admin/faturalar/${d.id}`);
  };

  const label = "block text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500";
  const input = "mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/30";

  return (
    <Card className="mb-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold" style={{ color: C.pine }}>🧾 Sistem dışı fatura</p>
          <p className="mt-0.5 text-xs text-stone-500">Site üzerinden gelmeyen bir yolculuk için bilgileri girin; fatura aynı numaralandırmayla oluşur.</p>
        </div>
        <button type="button" onClick={() => setOpen((o) => !o)}
          className="rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide"
          style={open ? { background: "#F5F5F4", color: C.pine } : { background: C.gold, color: C.pine }}>
          {open ? "Kapat" : "Yeni fatura"}
        </button>
      </div>

      {open && (
        <div className="mt-5 border-t border-stone-100 pt-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>Müşteri bilgileri</p>
              <div className="grid grid-cols-2 gap-3">
                <label><span className={label}>Ad *</span><input className={input} value={f.first_name} onChange={(e) => set("first_name", e.target.value)} /></label>
                <label><span className={label}>Soyad *</span><input className={input} value={f.last_name} onChange={(e) => set("last_name", e.target.value)} /></label>
              </div>
              <label><span className={label}>E-posta *</span><input type="email" className={input} value={f.email} onChange={(e) => set("email", e.target.value)} /></label>
              <label><span className={label}>Telefon *</span><input type="tel" className={input} value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+41 79 …" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label><span className={label}>Ödeme tipi *</span>
                  <select className={input} value={f.payment} onChange={(e) => set("payment", e.target.value)}>
                    <option value="">Seçin</option>
                    {PAYMENTS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
                <label><span className={label}>Toplam tutar (CHF, KDV dahil) *</span>
                  <input type="number" min="0" step="0.05" inputMode="decimal" className={input} value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="189.75" />
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>Transfer bilgileri</p>
              <label><span className={label}>Araç *</span>
                <select className={input} value={f.vehicle} onChange={(e) => set("vehicle", e.target.value)}>
                  <option value="">Araç seçin</option>
                  {VEHICLES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </label>
              <label><span className={label}>Alış konumu *</span><input className={input} value={f.pickup} onChange={(e) => set("pickup", e.target.value)} placeholder="Flughafen Zürich (ZRH)" /></label>
              <label><span className={label}>Bırakış konumu *</span><input className={input} value={f.dropoff} onChange={(e) => set("dropoff", e.target.value)} placeholder="Luzern, Schweizerhofquai 3" /></label>
              <div className="grid grid-cols-2 gap-3">
                <label><span className={label}>Alış tarihi *</span><input type="date" className={input} value={f.ride_date} onChange={(e) => set("ride_date", e.target.value)} /></label>
                <label><span className={label}>Alış saati *</span><input type="time" className={input} value={f.ride_time} onChange={(e) => set("ride_time", e.target.value)} /></label>
              </div>
            </div>
          </div>

          {err && <p className="mt-4 rounded-xl px-4 py-3 text-sm" style={{ background: "#FEF2F2", color: "#B91C1C" }}>{err}</p>}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <p className="text-[11px] text-stone-400">Kayıt «tamamlandı» durumunda, F referansıyla açılır; takvime yazılmaz ve müşteriye e-posta gitmez.</p>
            <button type="button" onClick={submit} disabled={!ready || busy}
              className="rounded-full px-6 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm transition-opacity disabled:opacity-40"
              style={{ background: C.pine, color: "#fff" }}>
              {busy ? "Oluşturuluyor…" : "🧾 Fatura oluştur"}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
