"use client";

import Image from "next/image";
import { useState } from "react";
import { C, BOOKING_WHATSAPP_NUMBER, altFor } from "../../../config";
import { t } from "../../../i18n";
import { useLang } from "../../../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  mailHref, inputCls, labelCls, TourCard,
} from "../../../components";
import { tours } from "../../../tourContent";

export default function TourClient({ slug }: { slug: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const T = L.tourDetail;

  const idx = tours.findIndex((x) => x.slug === slug);
  const tour = idx >= 0 ? tours[idx] : null;

  const [date, setDate] = useState("");
  const [pax, setPax] = useState("2");

  if (!tour) {
    return (
      <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
        <TopBar />
        <SiteHeader active="touren" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <a href={P("/touren")} className="font-bold underline" style={{ color: C.gold }}>
            {T.allTours} →
          </a>
        </div>
        <SiteFooter compact />
      </div>
    );
  }

  const c = tour[lang];
  const durBadge =
    tour.durationKey === "half" ? L.toursSec.half
    : tour.durationKey === "full" ? L.toursSec.full
    : L.toursSec.h3;

  const message =
    `${L.msg.title}\n\n` +
    `${lang === "de" ? "Tour" : "Tour"}: ${c.title}\n` +
    (date ? `${L.form.date}: ${date}\n` : "") +
    `${L.form.pax}: ${pax}\n\n` +
    (lang === "de"
      ? "Bitte senden Sie mir ein Festpreisangebot."
      : "Please send me a fixed-price offer.");

  const others = [1, 2, 3].map((o) => tours[(idx + o) % tours.length]);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="touren" />

      {/* ── Başlık bandı ─────────────────────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ background: C.pine }}>
        <Image src={tour.img} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-8 md:pb-16">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <a href={P("/")} className="hover:text-white">{L.nav.home}</a><span>/</span>
            <a href={P("/touren")} className="hover:text-white">{L.nav.tours}</a><span>/</span>
            <span className="text-white">{c.title.split("–")[0].trim()}</span>
          </nav>
          <span className="mt-4 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80 md:text-lg">{c.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
            <span className="rounded-full px-3.5 py-1.5" style={{ background: C.gold, color: C.pine }}>
              🕐 {durBadge} · ≈ {tour.hours} {T.hoursShort}
            </span>
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur">👥 {T.groupVal}</span>
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur">📍 {T.pickupVal}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.7fr_1fr] md:py-14">
        {/* ── Sol: içerik ─────────────────────────────────── */}
        <div>
          {/* Giriş */}
          <div className="space-y-4 leading-relaxed text-stone-700">
            {c.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {/* Öne çıkanlar */}
          <h2 className="font-display mt-10 text-2xl font-semibold" style={{ color: C.pine }}>
            {T.highlights}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: C.gold, color: C.pine }}>✓</span>
                <span className="text-sm font-medium">{h}</span>
              </li>
            ))}
          </ul>

          {/* Tagesprogramm — zaman çizelgesi */}
          <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
            {T.itinerary}
          </h2>
          <ol className="relative mt-6 space-y-6 border-l-2 pl-6" style={{ borderColor: "rgba(201,162,75,0.4)" }}>
            {c.itinerary.map((s, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: C.gold }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.gold }} />
                </span>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                  {tour.slug === "zurich-city-tour" ? `+${s.time.slice(1)}` : s.time}
                </p>
                <h3 className="font-display mt-0.5 text-lg font-semibold" style={{ color: C.pine }}>{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{s.desc}</p>
              </li>
            ))}
          </ol>

          {/* Dahil / dahil değil */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>✓ {T.included}</h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                {c.included.map((x, i) => <li key={i} className="flex gap-2"><span style={{ color: C.gold }}>✓</span>{x}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-stone-50 p-5 ring-1 ring-black/5">
              <h3 className="font-display text-lg font-semibold text-stone-500">✕ {T.notIncluded}</h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-500">
                {c.notIncluded.map((x, i) => <li key={i} className="flex gap-2"><span>✕</span>{x}</li>)}
              </ul>
            </div>
          </div>

          {/* Foto şerit */}
          <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
            {T.photos}
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {tour.photos.map((src, i) => (
              <div key={i} className="relative h-28 overflow-hidden rounded-2xl shadow-sm md:h-40" style={{ background: C.pine }}>
                <Image src={src} alt={altFor(src)} fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            ))}
          </div>

          {/* SSS */}
          <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
            {T.faq}
          </h2>
          <div className="mt-4 divide-y divide-stone-200 rounded-2xl bg-white px-5 shadow-sm ring-1 ring-black/5">
            {c.faq.map(([q, a], i) => (
              <details key={i} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold" style={{ color: C.pine }}>
                  {q}
                  <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.gold }}>＋</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ── Sağ: yapışkan talep paneli ──────────────────── */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
            <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{T.request}</h3>
            <p className="mt-1 flex items-baseline gap-2">
              <b className="font-mono text-xl" style={{ color: C.pine }}>{T.priceOnRequest}</b>
            </p>
            <p className="text-xs text-stone-500">{T.priceNote}</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className={labelCls}>📅 {L.form.date}</label>
                <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>👥 {L.form.pax}</label>
                <select className={inputCls} value={pax} onChange={(e) => setPax(e.target.value)}>
                  {Array.from({ length: 7 }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
            </div>

            <a
              href={`https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "#25D366" }}
            >
              💬 {T.requestWa}
            </a>
            <a href={mailHref(L.msg.subject, message)} className="mt-2 block text-center text-sm font-semibold text-stone-500 underline-offset-2 hover:underline">
              {T.requestMail}
            </a>

            <ul className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-sm">
              <li className="flex justify-between"><span className="text-stone-500">{T.duration}</span><b>≈ {tour.hours} {T.hoursShort}</b></li>
              <li className="flex justify-between"><span className="text-stone-500">{T.group}</span><b>{T.groupVal}</b></li>
              <li className="flex justify-between"><span className="text-stone-500">{T.langs}</span><b>{T.langsVal}</b></li>
            </ul>
          </div>

          <div className="rounded-2xl p-5 text-sm text-white" style={{ background: C.pine }}>
            <p className="font-display text-lg font-semibold">{lang === "de" ? "Warum privat?" : "Why private?"}</p>
            <ul className="mt-3 space-y-2 text-white/80">
              <li>✓ {lang === "de" ? "Kein Gruppenbus, kein Zeitdruck" : "No group bus, no time pressure"}</li>
              <li>✓ {lang === "de" ? "Programm jederzeit anpassbar" : "Programme adjustable anytime"}</li>
              <li>✓ {lang === "de" ? "Abholung an Ihrer Adresse" : "Pickup at your address"}</li>
              <li>✓ {lang === "de" ? "Kostenlose Kindersitze" : "Free child seats"}</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* ── Diğer turlar ─────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>{T.otherTours}</h2>
            <a href={P("/touren")} className="text-[12px] font-extrabold uppercase tracking-[0.15em] hover:underline" style={{ color: C.gold }}>
              {T.backTours} →
            </a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <TourCard
                key={o.slug}
                slug={o.slug}
                name={o[lang].title.split("–")[0].trim()}
                dur={o.durationKey === "half" ? L.toursSec.half : o.durationKey === "full" ? L.toursSec.full : L.toursSec.h3}
                img={o.img}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
