"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { C, HERO_IMAGES, SLIDE_MS, routes, fleet, gallery, altFor } from "../config";
import { t } from "../i18n";
import { tx } from "../i18nX";
import { useLang } from "../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  BookingCard, RouteCard, FleetCard, Eyebrow,
} from "../components";

// ── Yorum marquee'si — modül seviyesinde tanımlı (her render'da yeniden oluşmaz) ──
type Review = { text: string; name: string; route: string; flag: string };

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="relative flex w-[320px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur sm:w-[360px]">
      <span className="font-display absolute right-4 top-2 text-5xl text-white/10">”</span>
      <span className="text-sm" style={{ color: C.gold }}>★★★★★</span>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">{r.text}</p>
      <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold" style={{ background: C.gold, color: C.pine }}>
          {r.name.split(" ").map((w) => w[0]).join("")}
        </span>
        <div className="text-sm">
          <b>{r.name} {r.flag}</b>
          <p className="text-xs text-white/55">{r.route}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ items, dir }: { items: Review[]; dir: "left" | "right" }) {
  return (
    <div className="marquee-row relative overflow-hidden">
      {/* Kenar solmaları */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28" style={{ background: `linear-gradient(90deg, ${C.pine}, transparent)` }} />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28" style={{ background: `linear-gradient(270deg, ${C.pine}, transparent)` }} />
      <div className={`marquee-track ${dir === "left" ? "marquee-left" : "marquee-right"}`}>
        {[...items, ...items].map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </div>
  );
}

export default function Home() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const L = t[lang];
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const sectionHead = (eyebrow: string, title: string, sub: string, href: string) => (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-4xl font-semibold md:text-5xl" style={{ color: C.pine }}>{title}</h2>
        <p className="mt-3 max-w-xl text-stone-600">{sub}</p>
      </div>
      <a
        href={P(href)}
        className="text-[12px] font-extrabold uppercase tracking-[0.18em] underline-offset-4 transition-colors hover:underline"
        style={{ color: C.gold }}
      >
        {L.routesSec.all} →
      </a>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      {/* ── Hero: image slider + booking card ───────────────── */}
      <section className="relative overflow-hidden" style={{ background: C.pine }}>
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: slide === i ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(100deg, rgba(8,33,27,0.92) 0%, rgba(8,33,27,0.55) 55%, rgba(8,33,27,0.75) 100%)" }}
            />
          </div>
        ))}

        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-6 text-white md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:pb-24 md:pt-24">
          <div className="order-2 flex flex-col justify-center md:order-1">
            <h1 className="font-display text-4xl font-semibold leading-[1.08] md:text-7xl">
              Airport Zurich
              <br />
              <span style={{ color: C.gold }}>Transfer</span>
            </h1>
            {/* Güven rozetleri — 2x2 + puan kartı */}
            <div className="mt-6 grid grid-cols-2 gap-2 md:gap-3">
              {X.heroBadges.map((b, i) => (
                <span key={i} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-bold backdrop-blur md:gap-3 md:rounded-2xl md:px-4 md:py-3 md:text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold md:h-6 md:w-6 md:text-[11px]" style={{ background: C.gold, color: C.pine }}>✓</span>
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur md:mt-3 md:gap-4 md:rounded-2xl md:px-5 md:py-3.5">
              <span className="text-base tracking-[0.15em]" style={{ color: C.gold }}>★★★★★</span>
              <span className="text-sm">
                <b>{X.heroRating.score}</b>
                <span className="block text-xs text-white/60">{X.heroRating.sub}</span>
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#buchen" className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
                {L.hero.cta1} →
              </a>
              <a href={P("/strecken")} className="rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-[#0C2E25]">
                {L.hero.cta2} ↗
              </a>
            </div>
            {/* Slider noktaları — CTA butonlarının altında (tüm ekranlar) */}
            <div className="mt-8 flex gap-2 md:mt-12">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{ width: slide === i ? 28 : 8, background: slide === i ? C.gold : "rgba(255,255,255,0.35)" }}
                />
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <BookingCard />
          </div>
        </div>
      </section>

      {/* ── Routes preview ──────────────────────────────────── */}
      <section id="strecken" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        {sectionHead(L.routesSec.eyebrow, L.routesSec.title, L.routesSec.sub, "/strecken")}
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.slice(0, 6).map((r, i) => (
            <RouteCard key={i} {...r} />
          ))}
        </div>
      </section>

      {/* ── Ablauf: 3 adımda rezervasyon ────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        <Eyebrow>{X.howSec.eyebrow}</Eyebrow>
        <h2 className="font-display mt-2 text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{X.howSec.title}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {X.howSec.steps.map(([tt, dd], i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: C.gold, color: C.pine }}>{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold" style={{ color: C.pine }}>{tt}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{dd}</p>
            </div>
          ))}
        </div>
        <a href="#buchen" className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
          {X.howSec.cta} →
        </a>
      </section>

      {/* ── Fleet preview ───────────────────────────────────── */}
      <section id="fahrzeuge" className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        {sectionHead(L.fleetSec.eyebrow, L.fleetSec.title, L.fleetSec.sub, "/fahrzeuge")}
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {fleet.map((v, i) => (
            <FleetCard key={i} {...v} />
          ))}
        </div>
      </section>

      {/* ── Gallery preview ─────────────────────────────────── */}
      <section id="galerie" className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        {sectionHead(L.gallerySec.eyebrow, L.gallerySec.title, L.gallerySec.pageSub, "/galerie")}
        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {gallery.slice(0, 9).map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl shadow-sm ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              style={{ minHeight: i === 0 ? 260 : 120, backgroundColor: C.pine }}
            >
              <Image
                src={src}
                alt={altFor(src)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── SSS ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 pb-16 md:pb-24">
        <div className="text-center">
          <Eyebrow>{X.faqSec.eyebrow}</Eyebrow>
          <h2 className="font-display mt-2 text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{X.faqSec.title}</h2>
          <p className="mt-3 text-stone-600">{X.faqSec.sub}</p>
        </div>
        <div className="mt-8 divide-y divide-stone-200 rounded-2xl bg-white px-5 shadow-md ring-1 ring-black/5 md:px-7">
          {L.faqPage.list.map(([q, a], i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
                {q}
                <span className="shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href={P("/faq")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: C.pine }}>
            {X.faqSec.all} →
          </a>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────── */}
      <section style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
                <span className="h-px w-8" style={{ background: C.gold }} />
                {L.reviewsSec.eyebrow}
              </p>
              <h2 className="font-display text-4xl font-semibold md:text-5xl">{L.reviewsSec.title}</h2>
              <p className="mt-3 text-white/70">{L.reviewsSec.sub}</p>
            </div>
            <div className="text-right">
              <span style={{ color: C.gold }}>★★★★★</span>
              <p className="text-2xl font-extrabold">
                4.9 <span className="text-sm font-normal text-white/60">· 6 {L.reviewsSec.count}</span>
              </p>
            </div>
          </div>

          {/* İki satırlık akan yorum şeridi */}
          {(() => {
            const list: Review[] = [...L.reviewsSec.list];
            const rowTop = list;                       // üst satır → sağa kayar
            const rowBottom = [...list].reverse();     // alt satır → sola kayar
            return (
              <div className="mt-10 space-y-4">
                <ReviewRow items={rowTop} dir="right" />
                <ReviewRow items={rowBottom} dir="left" />
              </div>
            );
          })()}
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
