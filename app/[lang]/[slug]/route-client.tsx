"use client";

import Image from "next/image";

import { useMemo, useState } from "react";

import { C, routes, fleet, KM_RATE, transferPrice, isNightTime, airportName } from "../../config";
import { t } from "../../i18n";
import type { PostTeaser } from "../../blogTaxonomy";
import { useLang } from "../../providers";
import { getRouteContent } from "../../routeContent";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  localName, inputCls, labelCls, todayISO, minTimeFor,
  RouteCard, TrustLine, GoogleRatingBadge, PayBadges, waHref,
} from "../../components";

export type RouteGuides = { posts: PostTeaser[]; isFallback: boolean };

type HotelLink = { slug: string; name: string };

/** Araçla girilemeyen yerler: transferin nerede bittiği ilk ekranda açıkça yazılır (T5 notu) */
const ARRIVAL_NOTE: Record<string, { de: string; en: string }> = {
  "zurich-airport-to-zermatt": {
    en: "Zermatt is car-free: we drive you to the Matterhorn Terminal in Täsch. The shuttle train to Zermatt leaves every 20 min (12 min ride); luggage trolleys are right at the platform.",
    de: "Zermatt ist autofrei: Wir fahren Sie bis zum Matterhorn Terminal Täsch. Der Shuttle-Zug nach Zermatt fährt alle 20 Min. (12 Min. Fahrt); Gepäckwagen stehen direkt am Perron.",
  },
  "zurich-airport-to-wengen": {
    en: "Wengen is car-free: we drive you to Lauterbrunnen station. The Wengernalpbahn runs every 30 min and takes 14 min up to Wengen.",
    de: "Wengen ist autofrei: Wir fahren Sie bis zum Bahnhof Lauterbrunnen. Die Wengernalpbahn fährt alle 30 Min. in 14 Min. nach Wengen.",
  },
};

export default function RouteClient({ slug, guides, hotels }: { slug: string; guides?: RouteGuides; hotels?: HotelLink[] }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const D = L.detail;

  const route = useMemo(() => routes.find((r) => r.slug === slug), [slug]);

  // Sabit rota: güzergâh ve mesafe belli, fiyat burada araç başına gösterilir.
  // Hesap rezervasyon sayfası ve sunucuyla aynıdır (transferPrice: km tarifesi + gece zammı).
  const [reversed, setReversed] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!route) {
    return (
      <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
        <TopBar />
        <SiteHeader active="strecken" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <p className="text-lg font-semibold">{D.notFound}</p>
          <a href={P("/strecken")} className="mt-4 inline-block font-bold underline" style={{ color: C.gold }}>
            {D.allRoutes} →
          </a>
        </div>
        <SiteFooter compact />
      </div>
    );
  }

  const n = localName(route.to, lang);
  const origin = L.routesSec.origin;
  const pickupLabel = reversed ? n : origin;
  const dropoffLabel = reversed ? (origin as string) : n;
  const dur =
    lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`;

  const sorted = [...fleet].sort((a, b) => KM_RATE[a.id] - KM_RATE[b.id]);
  const AIRPORT = airportName(lang, true);
  const night = isNightTime(time); // 00:00–06:00 gece tarifesi
  const priceOf = (id: (typeof fleet)[number]["id"]) => transferPrice(route.km, id, time || null);
  const chf = (n: number) => `CHF ${n.toFixed(2)}`;

  /** Rezervasyon sayfasına ön-doldurulmuş geçiş; tarih+saat varsa doğrudan araç adımı açılır */
  const bookingHref = () => {
    const q = new URLSearchParams({
      from: reversed ? n : AIRPORT,
      to: reversed ? AIRPORT : n,
      ...(date ? { date } : {}), ...(time ? { time } : {}),
    });
    return `${P("/buchung")}?${q.toString()}`;
  };

  const renderSummary = () => (
    <aside className="h-fit space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
        <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{D.summary}</h3>
        <ul className="relative mt-4 space-y-3 text-sm">
          <li className="flex gap-3 pr-10">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: "#E2574C" }}>A</span>
            <span><b>{pickupLabel}</b><span className="block text-xs text-stone-500">{D.pickupLoc}</span></span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: C.pine }}>B</span>
            <span><b>{dropoffLabel}</b><span className="block text-xs text-stone-500">{D.dropoffLoc}</span></span>
          </li>
          <button
            type="button"
            onClick={() => setReversed((r) => !r)}
            title={lang === "de" ? "Richtung tauschen" : "Swap direction"}
            aria-label="swap direction"
            className="absolute right-0 top-7 flex h-8 w-8 items-center justify-center rounded-full border bg-white text-sm shadow-sm transition-all hover:rotate-180 hover:shadow-md"
            style={{ borderColor: C.gold, color: C.pine }}
          >⇅</button>
          {date && (
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100">📅</span>
              <span><b>{date}</b> {time && <b>· {time}</b>}</span>
            </li>
          )}
        </ul>
        <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
          <iframe
            title="Route map"
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent(reversed ? n + ", Switzerland" : "Zurich Airport")}&daddr=${encodeURIComponent(reversed ? "Zurich Airport" : n + ", Switzerland")}&hl=${lang}&output=embed`}
            className="h-52 w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4 text-sm">
          <span><span className="block text-xs text-stone-500">{D.distance}</span><b>{route.km} km</b></span>
          <span><span className="block text-xs text-stone-500">{D.time}</span><b>{dur}</b></span>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="strecken" />

      <section style={{ background: C.ivory }}>
        <div className="mx-auto max-w-7xl px-5 pb-6 pt-4 md:pb-8 md:pt-8">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <a href={P("/")} className="transition-colors hover:text-[#0C2E25]">{L.nav.home}</a>
            <span className="text-stone-300">/</span>
            <a href={P("/strecken")} className="transition-colors hover:text-[#0C2E25]">{L.nav.routes}</a>
            <span className="text-stone-300">/</span>
            <span style={{ color: C.pine }}>{n}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-3xl font-semibold md:text-5xl" style={{ color: C.pine }}>
            {lang === "de" ? "Flughafen Zürich (ZRH)" : "Zurich Airport (ZRH)"} → {n}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-600">
            <span>🛣 {route.km} km</span>
            <span>🕐 {dur}</span>
            <span className="rounded-full px-3 py-0.5 text-xs font-extrabold uppercase" style={{ background: C.gold, color: C.pine }}>
              {lang === "de" ? "Festpreis pro Fahrzeug" : "Fixed price per vehicle"}
            </span>
          </p>

          {/* İlk ekran (T2): fiyat + süre + WhatsApp + Rezervasyon, kaydırmadan görünür */}
          <div className="mt-5 rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 md:max-w-2xl md:p-5">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500">
                  {lang === "de" ? "Festpreis ab" : "Fixed price from"}
                </p>
                <p className="font-display text-4xl font-semibold leading-none" style={{ color: C.pine }}>
                  {chf(transferPrice(route.km, "business_class_e"))}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {fleet[0].car} · {lang === "de" ? `bis ${fleet[0].pax} Personen` : `up to ${fleet[0].pax} passengers`}
                </p>
              </div>
              <p className="text-xs leading-snug text-stone-600">
                <b style={{ color: C.pine }}>{fleet[1].car}</b> {lang === "de" ? `(bis ${fleet[1].pax} Personen):` : `(up to ${fleet[1].pax} passengers):`}{" "}
                {chf(transferPrice(route.km, "business_family_v"))}
                <br />
                {lang === "de"
                  ? `≈ CHF ${Math.round(transferPrice(route.km, "business_family_v") / fleet[1].pax)} pro Person bei ${fleet[1].pax} Personen`
                  : `≈ CHF ${Math.round(transferPrice(route.km, "business_family_v") / fleet[1].pax)} per person for ${fleet[1].pax}`}
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={waHref(lang === "de" ? `Hallo, ich möchte einen Transfer ${pickupLabel} → ${dropoffLabel}.` : `Hello, I'd like a transfer ${pickupLabel} → ${dropoffLabel}.`)}
                target="_blank"
                rel="noopener noreferrer"
                data-track-location="route_hero"
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#128C4A] px-4 text-sm font-extrabold text-white shadow-sm active:scale-95"
              >
                💬 WhatsApp
              </a>
              <a
                href={bookingHref()}
                className="flex min-h-[48px] items-center justify-center rounded-full px-4 text-sm font-extrabold uppercase tracking-wide active:scale-95"
                style={{ background: C.gold, color: C.pine }}
              >
                {lang === "de" ? "Jetzt buchen" : "Book now"}
              </a>
            </div>
            <TrustLine className="mt-3" />
            {ARRIVAL_NOTE[slug] && <p className="mt-3 rounded-xl bg-[#FBF7EE] px-3 py-2 text-xs leading-relaxed text-stone-700">ℹ️ {ARRIVAL_NOTE[slug][lang]}</p>}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <GoogleRatingBadge />
            <PayBadges />
          </div>
        </div>
        <div aria-hidden className="mx-auto h-px max-w-7xl px-5">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}66 30%, transparent 75%)` }} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[1.7fr_1fr] md:py-14">
        <div>
          <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
            <label className="block">
              <span className={labelCls}>📅 {L.form.date}</span>
              <input type="date" min={todayISO()} className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label className="block">
              <span className={labelCls}>🕐 {L.form.time}</span>
              <input type="time" min={minTimeFor(date)} className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
            </label>
          </div>

          <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>
            {D.selectCar}
          </h2>
          <div className="space-y-4">
            {sorted.map((v, i) => (
              // Kartın tamamı rezervasyona götürür (T18 ölü tıklama)
              <a key={i} href={bookingHref()} className="grid gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-lg hover:ring-[#C9A24B]/60 sm:grid-cols-[200px_1fr_auto] sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.img} alt={v.car} className="mx-auto h-24 object-contain" />
                <div>
                  <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>
                    {localName(v.name, lang)}
                  </h3>
                  <p className="text-sm text-stone-500">{v.car}</p>
                  <p className="mt-1 text-sm">👥 {v.pax} · 🧳 {v.bags}</p>
                  <ul className="mt-2 grid gap-x-4 gap-y-0.5 text-xs text-stone-500 sm:grid-cols-2">
                    {D.feats.map((ft, j) => <li key={j}>✓ {ft}</li>)}
                  </ul>
                </div>
                <div className="text-center sm:text-right">
                  <p className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>{chf(priceOf(v.id))}</p>
                  <p className="mb-3 text-[11px] text-stone-500">
                    {D.priceNote}
                    {night ? (lang === "de" ? " Inkl. Nachtzuschlag." : " Incl. night surcharge.") : ""}
                  </p>
                  <span
                    className="inline-block w-full rounded-full px-6 py-2.5 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                    style={{ background: C.pine }}
                  >
                    {D.select}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {renderSummary()}
      </section>

      {/* ── SEO içerik bölümleri ─────────────────────────────── */}
      <RouteSeoContent slug={slug} guides={guides ?? { posts: [], isFallback: true }} hotels={hotels ?? []} />

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}

// ── Rota içerik bölümü: giriş, hızlı bilgiler, varış noktası, SSS, diğer rotalar ──
function RouteSeoContent({ slug, guides, hotels }: { slug: string; guides: RouteGuides; hotels: HotelLink[] }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const D = L.detail;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return null;
  const n = localName(route.to, lang);
  const content = getRouteContent(slug, lang);
  const dur =
    lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`;

  const others = routes.filter((r) => r.slug !== slug).slice(0, 3);
  const facts: [string, string][] = [
    [D.distance, `${route.km} km`],
    [D.time, dur],
    [L.nav.fleet, lang === "de" ? "3 Fahrzeugklassen" : "3 vehicle classes"],
  ];

  return (
    <section className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        {/* Giriş metni */}
        {content && (
          <>
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
              <span className="h-px w-8" style={{ background: C.gold }} />
              {lang === "de" ? "Flughafentransfer" : "Airport transfer"}
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>
              {airportName(lang)} → {n}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
              {content.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </>
        )}

        {/* Hızlı bilgiler */}
        <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${content ? "mt-10" : ""}`}>
          {facts.map(([k, v], i) => (
            <div key={i} className="rounded-2xl bg-stone-50 p-4 text-center ring-1 ring-black/5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">{k}</span>
              <b className="mt-1 block text-lg" style={{ color: C.pine }}>{v}</b>
            </div>
          ))}
        </div>

        {/* Varış noktası */}
        {content && (
          <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="relative min-h-[200px] overflow-hidden rounded-2xl shadow-md" style={{ backgroundColor: C.pine }}>
              <Image src={route.img} alt={content.aboutTitle} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>{content.aboutTitle}</h3>
              <p className="mt-3 leading-relaxed text-stone-700">{content.about}</p>
            </div>
          </div>
        )}

        {/* Mehr zur Strecke — ilgili blog rehberleri */}
        {guides.posts.length > 0 && (
          <div className="mt-12 rounded-2xl p-6 md:p-8" style={{ background: "#FBF7EE", boxShadow: `inset 3px 0 0 ${C.gold}` }}>
            <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {guides.isFallback
                ? (lang === "de" ? "Gut zu wissen vor der Fahrt" : "Good to know before your ride")
                : (lang === "de" ? "Mehr zur Strecke" : "More about this route")}
            </h3>
            <p className="mt-1.5 text-sm text-stone-600">
              {guides.isFallback
                ? (lang === "de" ? "Treffpunkt, Verspätungen und Gepäck – kurz erklärt." : "Meeting point, delays and luggage – briefly explained.")
                : (lang === "de" ? `Unsere Guides für Ihre Reise nach ${n}.` : `Our guides for your trip to ${n}.`)}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {guides.posts.map((p) => {
                return (
                  <li key={p.slug}>
                    <a href={P(`/blog/${p.slug}`)} className="group flex h-full gap-3.5 rounded-xl bg-white p-3 ring-1 ring-black/5 transition-shadow hover:shadow-md">
                      <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg" style={{ backgroundColor: C.pine }}>
                        <Image src={p.img} alt="" fill sizes="80px" className="object-cover" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-bold leading-snug group-hover:underline" style={{ color: C.pine }}>{p.title}</span>
                        <span className="mt-1 block text-[11px] text-stone-500">🕐 {p.minutes} {L.blogSec.minRead}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Bu şehirdeki lüks oteller → otel transfer sayfaları */}
        {hotels.length > 0 && (
          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {lang === "de" ? `Hoteltransfer in ${n}: ` : `Hotel transfers in ${n}: `}
            {hotels.map((h, i) => (
              <span key={h.slug}>
                {i > 0 && ", "}
                <a href={P(`/hotels/${h.slug}`)} className="font-bold underline decoration-[#C9A24B] underline-offset-2" style={{ color: C.pine }}>{h.name}</a>
              </span>
            ))}
          </p>
        )}

        {/* SSS akordeon */}
        {content && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {lang === "de" ? "Häufige Fragen" : "Frequently asked questions"}
            </h3>
            <div className="mt-5 divide-y divide-stone-200 rounded-2xl bg-stone-50 px-5 ring-1 ring-black/5">
              {content.faq.map(([q, a], i) => (
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
        )}

        {/* Diğer rotalar */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {lang === "de" ? "Weitere beliebte Strecken" : "Other popular routes"}
            </h3>
            <a href={P("/strecken")} className="text-[12px] font-extrabold uppercase tracking-[0.15em] hover:underline" style={{ color: C.gold }}>
              {L.routesSec.all} →
            </a>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((r) => <RouteCard key={r.slug} {...r} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
