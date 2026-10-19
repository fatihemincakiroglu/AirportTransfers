"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { C, WHATSAPP_NUMBER, PHONE_DISPLAY } from "../../config";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter } from "../../components";
import { mirrorPurchase, type Receipt } from "../../lib/purchase-mirror";

type Status = { ok: boolean; ref?: string; status?: "pending" | "confirmed" | "declined" | "cancelled" | "not_found"; payment_status?: string; receipt?: Receipt };

const T = {
  de: {
    pendingTitle: "Zahlung erhalten – wir prüfen Ihre Buchung",
    pendingText: "Vielen Dank! Ihre Zahlung ist eingegangen. Wir bestätigen die Fahrt in Kürze; diese Seite aktualisiert sich automatisch. Sie erhalten die Bestätigung auch per E-Mail.",
    waiting: "Warten auf Bestätigung …",
    confirmedTitle: "Ihre Fahrt ist bestätigt",
    confirmedText: "Ihr Chauffeur erwartet Sie mit Namensschild in der Ankunftshalle. Alle Details finden Sie in der Bestätigungs-E-Mail.",
    declinedTitle: "Wir konnten diese Fahrt leider nicht übernehmen",
    declinedText: "Eine bereits geleistete Zahlung wird vollständig zurückerstattet. Gerne finden wir einen anderen Termin – schreiben Sie uns.",
    notFound: "Buchung nicht gefunden.",
    ref: "Buchungsreferenz", home: "Zur Startseite", wa: "WhatsApp",
  },
  en: {
    pendingTitle: "Payment received – we are checking your booking",
    pendingText: "Thank you! Your payment has arrived. We will confirm the ride shortly; this page updates automatically. You will also receive the confirmation by email.",
    waiting: "Waiting for confirmation …",
    confirmedTitle: "Your ride is confirmed",
    confirmedText: "Your chauffeur will await you with a name sign in the arrivals hall. All details are in your confirmation email.",
    declinedTitle: "Unfortunately we could not take this ride",
    declinedText: "Any payment already made will be refunded in full. We would be glad to find another date – just write to us.",
    notFound: "Booking not found.",
    ref: "Booking reference", home: "Back to home", wa: "WhatsApp",
  },
};

/**
 * Onay sayfası — iki mod:
 *  mode="pending": Stripe sonrası bekleme; 4 sn'de bir /api/booking-status; confirmed → mirror → /confirmation
 *  mode="confirmed": onay sayfası (e-postadaki bağlantı da buraya gelir); makbuz varsa ve daha önce basılmadıysa mirror
 *
 * booking_complete tarayıcıda YALNIZCA backend makbuzuyla, referans başına bir kez basılır (lib/purchase-mirror).
 */
export default function ConfirmationClient({ mode }: { mode: "pending" | "confirmed" }) {
  const { lang, P } = useLang();
  const t = T[lang];
  const params = useSearchParams();
  const ref = (params.get("ref") ?? "").trim();
  const [st, setSt] = useState<Status | null>(null);
  useEffect(() => {
    if (!ref) return;
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = async () => {
      try {
        const r = await fetch(`/api/booking-status?ref=${encodeURIComponent(ref)}`, { cache: "no-store" });
        const d = (await r.json()) as Status;
        if (!alive) return;
        setSt(d);
        // Makbuz: Stripe ödemesi alındığında veya rezervasyon onaylandığında gelir → Satın Alma (bir kez)
        if (d.receipt) mirrorPurchase(d.receipt);
        if (d.status === "confirmed") {
          if (mode === "pending") { window.location.replace(`${P("/buchung/confirmation")}?ref=${encodeURIComponent(ref)}`); return; }
        }
        if (mode === "pending" && (d.status === "pending" || !d.ok)) timer = setTimeout(tick, 4000);
      } catch {
        if (alive && mode === "pending") timer = setTimeout(tick, 6000);
      }
    };
    tick();
    return () => { alive = false; if (timer) clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yalnızca ref/mod değişince
  }, [ref, mode]);

  const state = st?.status;
  const title = !ref || state === "not_found" ? t.notFound
    : state === "confirmed" ? t.confirmedTitle
    : state === "declined" || state === "cancelled" ? t.declinedTitle
    : t.pendingTitle;
  const text = state === "confirmed" ? t.confirmedText : state === "declined" || state === "cancelled" ? t.declinedText : ref && state !== "not_found" ? t.pendingText : "";
  const icon = state === "confirmed" ? "✓" : state === "declined" || state === "cancelled" ? "✕" : "⏳";
  const color = state === "confirmed" ? "#059669" : state === "declined" || state === "cancelled" ? "#DC2626" : C.gold;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="buchung" />
      <section className="mx-auto max-w-2xl px-5 py-16 md:py-24">
        <div className="rounded-3xl bg-white p-8 text-center shadow-md ring-1 ring-black/5 md:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white" style={{ background: color }}>{icon}</span>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight md:text-3xl" style={{ color: C.pine }}>{title}</h1>
          {text && <p className="mt-4 leading-relaxed text-stone-600">{text}</p>}
          {ref && state !== "not_found" && (
            <p className="mt-6 text-sm text-stone-500">{t.ref}: <b className="font-mono" style={{ color: C.pine }}>{ref.startsWith("#") ? ref : `#${ref}`}</b></p>
          )}
          {mode === "pending" && (state === "pending" || !st) && (
            <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full" style={{ background: C.gold }} /> {t.waiting}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" data-track-location="booking"
               className="rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white" style={{ background: "#128C4A" }}>
              {t.wa} · {PHONE_DISPLAY}
            </a>
            <a href={P("/")} className="rounded-full border px-6 py-3 text-sm font-extrabold uppercase tracking-wider" style={{ borderColor: C.pine, color: C.pine }}>
              {t.home}
            </a>
          </div>
        </div>
      </section>
      <SiteFooter compact />
    </div>
  );
}
