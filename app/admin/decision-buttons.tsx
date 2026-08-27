"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { REJECT_REASONS, acceptMessage, rejectMessage } from "./decisionMessages";

export type DecisionBooking = {
  id: number; ref: string; lang: string | null;
  pickup: string | null; dropoff: string | null;
  ride_date: string | null; ride_time: string | null;
  price: string | null; vehicle: string | null;
  first_name: string | null; last_name: string | null;
  phone: string | null; email: string | null;
};

/**
 * Yeni talepler için karar düğmeleri.
 * Karar verildikten sonra müşteriye gönderilecek hazır mesaj gösterilir.
 */
export default function DecisionButtons({ b, compact = false }: { b: DecisionBooking; compact?: boolean }) {
  const [mode, setMode] = useState<"idle" | "reject" | "sent">("idle");
  const [reason, setReason] = useState(REJECT_REASONS[0].key);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const who = [b.first_name, b.last_name].filter(Boolean).join(" ") || "—";
  const route = `${b.pickup ?? "—"} → ${b.dropoff ?? "—"}`;
  const when = `${b.ride_date ?? ""} ${b.ride_time ?? ""}`.trim();

  const decide = async (status: "confirmed" | "rejected", reasonKey?: string) => {
    setBusy(true);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: b.id, status, rejectReason: reasonKey ?? null }),
    });
    setBusy(false);

    setMessage(
      status === "confirmed"
        ? acceptMessage(b.lang, {
            name: who, route, when,
            price: b.price ? `CHF ${Number(b.price).toFixed(2)}` : "—",
            vehicle: b.vehicle ?? "—",
          })
        : rejectMessage(b.lang, reasonKey ?? "other", { name: who, route, when }),
    );
    setMode("sent");
    router.refresh();
  };

  const waHref = b.phone
    ? `https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
    : null;
  const mailHref = b.email
    ? `mailto:${b.email}?subject=${encodeURIComponent(`Transfer ${b.ref}`)}&body=${encodeURIComponent(message)}`
    : null;

  // ── Karar sonrası: hazır mesaj ──
  if (mode === "sent") {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">
          Müşteriye gönderilecek mesaj ({(b.lang ?? "de").toUpperCase()})
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={9}
          className="mt-2 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm outline-none focus:border-[#C9A24B]"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {waHref && (
            <a href={waHref} target="_blank" rel="noopener noreferrer"
               className="rounded-full px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white"
               style={{ background: "#25D366" }}>
              WhatsApp ile gönder
            </a>
          )}
          {mailHref && (
            <a href={mailHref}
               className="rounded-full bg-stone-100 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-stone-600">
              E-posta ile gönder
            </a>
          )}
          <button type="button" onClick={() => navigator.clipboard?.writeText(message)}
            className="rounded-full bg-stone-100 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-stone-600">
            Kopyala
          </button>
          <button type="button" onClick={() => setMode("idle")}
            className="ml-auto rounded-full px-4 py-2.5 text-xs font-bold text-stone-400">
            Kapat
          </button>
        </div>
      </div>
    );
  }

  // ── Ret sebebi seçimi ──
  if (mode === "reject") {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "#B91C1C" }}>
          Ret sebebi
        </p>
        <div className="mt-2.5 space-y-1.5">
          {REJECT_REASONS.map((r) => (
            <label key={r.key} className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-700">
              <input type="radio" name={`reason-${b.id}`} checked={reason === r.key}
                     onChange={() => setReason(r.key)} className="accent-[#DC2626]" />
              {r.label}
            </label>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => decide("rejected", reason)}
            className="rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white disabled:opacity-40"
            style={{ background: "#DC2626" }}>
            {busy ? "Kaydediliyor…" : "Reddet ve mesaj hazırla"}
          </button>
          <button type="button" onClick={() => setMode("idle")}
            className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-stone-500 ring-1 ring-black/5">
            Vazgeç
          </button>
        </div>
      </div>
    );
  }

  // ── Varsayılan: kabul / reddet ──
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "" : "mt-1"}`}>
      <button type="button" disabled={busy} onClick={() => decide("confirmed")}
        className="rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 disabled:opacity-40"
        style={{ background: "#059669" }}>
        ✓ Kabul et
      </button>
      <button type="button" onClick={() => setMode("reject")}
        className="rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
        style={{ background: "#FEE2E2", color: "#B91C1C" }}>
        ✕ Reddet
      </button>
      <span className="hidden text-[11px] text-stone-400 sm:inline" style={{ alignSelf: "center" }}>
        karar sonrası müşteri mesajı hazırlanır
      </span>
    </div>
  );
}
