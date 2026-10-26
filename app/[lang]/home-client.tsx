"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { C, HERO_IMAGES, SLIDE_MS, routes, fleet, gallery, altFor, CITY_CENTER, transferPrice, chfText } from "../config";
import { t } from "../i18n";
import { tx } from "../i18nX";
import { useLang } from "../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  BookingCard, RouteCard, FleetCard, Eyebrow, GoogleRatingBadge, PayBadges, localName, waHref,
} from "../components";

// ── Yorum marquee'si — modül seviyesinde tanımlı (her render'da yeniden oluşmaz) ──
import { reviews, reviewStats, type Review } from "../reviews";

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
  // Performans (LCP): 2. ve 3. slayt ilk görüntüden sonra yüklenir; ilk slaytla bant genişliği için yarışmaz
  const [extraSlides, setExtraSlides] = useState(false);

  useEffect(() => {
    const warm = setTimeout(() => setExtraSlides(true), Math.max(1500, SLIDE_MS - 2000));
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), SLIDE_MS);
    return () => { clearTimeout(warm); clearInterval(id); };
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
        style={{ color: C.goldText }}
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
        {HERO_IMAGES.map((src, i) => (i === 0 || extraSlides) && (
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
              fetchPriority={i === 0 ? "high" : "low"}
              sizes="100vw"
              quality={i === 0 ? 70 : 60}
              className="object-cover"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(100deg, rgba(8,33,27,0.92) 0%, rgba(8,33,27,0.55) 55%, rgba(8,33,27,0.75) 100%)" }}
            />
          </div>
        ))}

        {/* Mobilde sıra: başlık + şehir fiyatı → form → güven rozetleri. Masaüstünde sol sütun üst/alt, form sağda (T7) */}
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 pb-16 pt-5 text-white md:grid-cols-[1.15fr_0.85fr] md:grid-rows-[auto_1fr] md:gap-x-12 md:gap-y-8 md:pb-24 md:pt-24">
          <div className="md:col-start-1 md:row-start-1 md:self-end">
            <h1 className="font-display text-[2rem] font-semibold leading-[1.08] md:text-6xl">
              {lang === "de" ? "Flughafentaxi Zürich" : "Zurich Airport Taxi"}
              <span className="mt-1 block text-[1.35rem] md:text-4xl" style={{ color: C.gold }}>
                {lang === "de" ? "Privattransfer zum Festpreis" : "Fixed-Price Private Transfer"}
              </span>
            </h1>
            {/* Fiyat kartı: en çok aranan rota (şehir merkezi) + 2 popüler rota */}
            <div className="mt-4 rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/15 backdrop-blur md:max-w-xl">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold leading-tight">
                  {lang === "de" ? "Flughafen → Zürich Stadt" : "Airport → Zurich City"}
                  <span className="block text-xs font-normal text-white/70">~{CITY_CENTER.min} {lang === "de" ? "Min." : "min"} · {lang === "de" ? "Festpreis pro Fahrzeug" : "fixed price per vehicle"}</span>
                </p>
                <p className="font-display text-3xl font-semibold" style={{ color: C.gold }}>CHF {chfText(transferPrice(CITY_CENTER.km, "business_class_e"))}</p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {routes.filter((r) => ["zurich-airport-to-zug", "zurich-airport-to-luzern", "zurich-airport-to-zermatt"].includes(r.slug)).map((r) => (
                  <a key={r.slug} href={P(`/${r.slug}`)} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold ring-1 ring-white/20 hover:bg-white/20">
                    {localName(r.to, lang)} · CHF {chfText(r.price)}
                  </a>
                ))}
              </div>
              <a
                href={waHref(lang === "de" ? "Hallo, ich möchte einen Transfer ab Flughafen Zürich." : "Hello, I'd like a transfer from Zurich Airport.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="home_hero"
                className="mt-3 flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#128C4A] px-4 text-sm font-extrabold text-white active:scale-95"
              >
                💬 {lang === "de" ? "Preis per WhatsApp anfragen" : "Ask via WhatsApp"}
              </a>
            </div>
          </div>

          <div className="md:col-start-2 md:row-span-2 md:row-start-1">
            <BookingCard />
          </div>

          <div className="flex flex-col md:col-start-1 md:row-start-2">
            <div className="mb-4 flex flex-wrap items-center gap-2"><GoogleRatingBadge dark /><PayBadges dark /></div>
            {/* Güven rozetleri — 2x2 + puan kartı */}
            <div className="mt-6 grid grid-cols-2 gap-2 md:gap-3">
              {X.heroBadges.map((b, i) => (
                <span key={i} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-bold backdrop-blur md:gap-3 md:rounded-2xl md:px-4 md:py-3 md:text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold md:h-6 md:w-6 md:text-[11px]" style={{ background: C.gold, color: C.pine }}>✓</span>
                  {b}
                </span>
              ))}
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
            <div className="mt-6 flex md:mt-10">
              {/* Dokunma hedefi 44×44 (erişilebilirlik); görünen nokta küçük kalır */}
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="flex h-11 min-w-[44px] items-center justify-center"
                >
                  <span
                    className="block h-2 rounded-full transition-all"
                    style={{ width: slide === i ? 28 : 8, background: slide === i ? C.gold : "rgba(255,255,255,0.35)" }}
                  />
                </button>
              ))}
            </div>
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
        {/* Adımlar — aralarında akış oku; masaüstünde yatay, mobilde dikey zincir */}
        <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Arka plandaki kesikli bağlantı çizgisi (yalnızca masaüstü) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-7 hidden md:block"
            style={{
              height: 2,
              backgroundImage: `repeating-linear-gradient(90deg, ${C.gold}66 0 7px, transparent 7px 15px)`,
            }}
          />
          {X.howSec.steps.map(([tt, dd], i) => (
            <li key={i} className="group relative flex flex-col items-center text-center">
              {/* Numara madalyonu */}
              <span
                className="font-display relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold transition-transform duration-300 group-hover:-translate-y-1"
                style={{ background: C.pine, color: C.gold, boxShadow: `0 0 0 6px ${C.ivory}, 0 0 0 8px ${C.gold}44` }}
              >
                {i + 1}
              </span>

              <h3 className="mt-5 text-lg font-bold" style={{ color: C.pine }}>{tt}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-600">{dd}</p>

              {/* Akış oku: masaüstünde sağa, mobilde aşağı */}
              {i < X.howSec.steps.length - 1 && (
                <>
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-7 hidden -translate-y-1/2 text-xl md:block"
                    style={{ color: C.gold }}
                  >
                    ➔
                  </span>
                  <span aria-hidden className="mt-6 text-xl md:hidden" style={{ color: C.gold }}>↓</span>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <a href="#buchen" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: C.gold, color: C.pine }}>
            {X.howSec.cta}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
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

      {/* ── Reviews — yalnızca gerçek yorum varsa (app/reviews.ts) ── */}
      {reviewStats() && (
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
                <span style={{ color: C.gold }}>{"★".repeat(Math.round(reviewStats()!.avg))}</span>
                <p className="text-2xl font-extrabold">
                  {reviewStats()!.avg.toFixed(1)} <span className="text-sm font-normal text-white/60">· {reviewStats()!.count} {L.reviewsSec.count}</span>
                </p>
              </div>
            </div>
            {(() => {
              const list: Review[] = [...reviews];
              return (
                <div className="mt-10 space-y-4">
                  <ReviewRow items={list} dir="right" />
                  {list.length > 3 && <ReviewRow items={[...list].reverse()} dir="left" />}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
