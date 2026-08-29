"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card } from "../../../ui";

const VEHICLES = [
  "Business Class · Mercedes-Benz E-Class",
  "Business & Family Class · Mercedes-Benz V-Class",
  "Premium Class · Mercedes-Benz S-Class",
];
const AIRPORT = "Flughafen Zürich (ZRH)";

const EMPTY = {
  pickup: AIRPORT, dropoff: "", stops: "",
  ride_date: "", ride_time: "", pax: "2", luggage: "2",
  vehicle: VEHICLES[0], price: "", payment: "Bar / Cash",
  first_name: "", last_name: "", phone: "", email: "", flight: "",
  extras: "", notes: "", admin_note: "",
  status: "confirmed", channel: "telefon", driver_id: "",
};

const input = "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm outline-none focus:border-[#C9A24B]";
const lbl = "mb-1 block text-[11px] font-bold uppercase tracking-wide text-stone-400";

/** Metin alanı — modül seviyesinde (render içinde bileşen tanımlanmaz) */
function Field({ label, value, onChange, type = "text", ph }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; ph?: string;
}) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      <input type={type} value={value} placeholder={ph} onChange={(e) => onChange(e.target.value)} className={input} />
    </label>
  );
}

export default function NewBookingForm({ drivers }: { drivers: { id: number; name: string }[] }) {
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [slot, setSlot] = useState<{ busy: boolean; nextFree: string | null }>({ busy: false, nextFree: null });
  const router = useRouter();
  const set = (k: keyof typeof EMPTY, v: string) => setF((s) => ({ ...s, [k]: v }));

  // 3 saat kuralı: seçilen saatte başka iş var mı?
  useEffect(() => {
    let alive = true;
    /* eslint-disable react-hooks/set-state-in-effect */
    if (!f.ride_date || !f.ride_time) { setSlot({ busy: false, nextFree: null }); return; }
    (async () => {
      try {
        const res = await fetch(`/api/availability?date=${f.ride_date}&time=${f.ride_time}`);
        const d = await res.json();
        if (alive) setSlot({ busy: !!d.busy, nextFree: d.nextFree ?? null });
      } catch { /* sessizce geç */ }
    })();
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => { alive = false; };
  }, [f.ride_date, f.ride_time]);

  const swap = () => setF((s) => ({ ...s, pickup: s.dropoff, dropoff: s.pickup }));

  const save = async () => {
    if (!f.dropoff.trim() || !f.ride_date) { setErr("Varış noktası ve tarih zorunlu."); return; }
    setBusy(true); setErr("");
    const res = await fetch("/api/admin/bookings", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f),
    });
    setBusy(false);
    if (res.ok) { router.push("/admin/rezervasyonlar"); router.refresh(); }
    else setErr("Kaydedilemedi, tekrar deneyin.");
  };

  return (
    <div className="max-w-3xl space-y-5">
      <Card>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Güzergâh</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Alınış noktası</span>
            <input value={f.pickup} onChange={(e) => set("pickup", e.target.value)} className={input} />
          </label>
          <label className="block">
            <span className={lbl}>Varış noktası *</span>
            <input value={f.dropoff} onChange={(e) => set("dropoff", e.target.value)} className={input} placeholder="örn. Luzern" />
          </label>
        </div>
        <button type="button" onClick={swap} className="mt-2 text-xs font-bold" style={{ color: C.pine }}>⇅ Yönü değiştir</button>
        <label className="mt-4 block">
          <span className={lbl}>Ara duraklar (virgülle)</span>
          <input value={f.stops} onChange={(e) => set("stops", e.target.value)} className={input} placeholder="Zug, Baar" />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Yolculuk tarihi *" value={f.ride_date} onChange={(v) => set("ride_date", v)} type="date" />
          <Field label="Saat" value={f.ride_time} onChange={(v) => set("ride_time", v)} type="time" />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Araç ve fiyat</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Araç</span>
            <select value={f.vehicle} onChange={(e) => set("vehicle", e.target.value)} className={input}>
              {VEHICLES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <Field label="Tutar (CHF)" value={f.price} onChange={(v) => set("price", v)} type="number" ph="189" />
          <Field label="Yolcu" value={f.pax} onChange={(v) => set("pax", v)} type="number" />
          <Field label="Bagaj" value={f.luggage} onChange={(v) => set("luggage", v)} type="number" />
          <label className="block">
            <span className={lbl}>Ödeme</span>
            <select value={f.payment} onChange={(e) => set("payment", e.target.value)} className={input}>
              {["Bar / Cash", "TWINT", "Kreditkarte", "Rechnung"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={lbl}>Şoför</span>
            <select value={f.driver_id} onChange={(e) => set("driver_id", e.target.value)} className={input}>
              <option value="">— atanmadı —</option>
              {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-stone-400">Müşteri</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ad" value={f.first_name} onChange={(v) => set("first_name", v)} />
          <Field label="Soyad" value={f.last_name} onChange={(v) => set("last_name", v)} />
          <Field label="Telefon" value={f.phone} onChange={(v) => set("phone", v)} ph="+41 79 123 45 67" />
          <Field label="E-posta" value={f.email} onChange={(v) => set("email", v)} type="email" />
          <Field label="Uçuş no" value={f.flight} onChange={(v) => set("flight", v)} ph="LX317" />
          <Field label="Ekstralar" value={f.extras} onChange={(v) => set("extras", v)} ph="Kindersitz: 1" />
        </div>
        <label className="mt-4 block">
          <span className={lbl}>Müşteri notu</span>
          <textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className={input} />
        </label>
        <label className="mt-4 block">
          <span className={lbl}>Panel notu (müşteriye gitmez)</span>
          <textarea value={f.admin_note} onChange={(e) => set("admin_note", e.target.value)} rows={2} className={input} />
        </label>
      </Card>

      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Durum</span>
            <select value={f.status} onChange={(e) => set("status", e.target.value)} className={input}>
              <option value="new">Yeni</option>
              <option value="confirmed">Onaylandı</option>
              <option value="done">Tamamlandı</option>
            </select>
          </label>
          <label className="block">
            <span className={lbl}>Geliş kanalı</span>
            <select value={f.channel} onChange={(e) => set("channel", e.target.value)} className={input}>
              {["telefon", "whatsapp", "email", "yüz yüze", "otel", "diğer"].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </label>
        </div>
      </Card>

      {slot.busy && (
        <div className="rounded-2xl border p-4" style={{ borderColor: "#FDE68A", background: "#FFFBEB" }}>
          <p className="text-sm font-bold" style={{ color: "#92400E" }}>⚠ Bu saatte başka bir yolculuk var</p>
          <p className="mt-1 text-sm" style={{ color: "#92400E" }}>
            İki rezervasyon arasında en az 3 saat olmalı.
            {slot.nextFree ? ` En yakın uygun saat: ${slot.nextFree}.` : ""}
            {" "}Yine de kaydetmek isterseniz devam edebilirsiniz.
          </p>
        </div>
      )}

      {err && <p className="text-sm font-semibold text-red-600">{err}</p>}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={save} disabled={busy}
          className="rounded-full px-7 py-3.5 text-xs font-extrabold uppercase tracking-wide shadow-sm disabled:opacity-40"
          style={{ background: C.gold, color: C.pine }}>
          {busy ? "Kaydediliyor…" : "Rezervasyonu kaydet"}
        </button>
        <button type="button" onClick={() => router.push("/admin/rezervasyonlar")}
          className="rounded-full bg-white px-7 py-3.5 text-xs font-extrabold uppercase tracking-wide text-stone-600 shadow-sm ring-1 ring-black/5">
          Vazgeç
        </button>
      </div>
    </div>
  );
}
