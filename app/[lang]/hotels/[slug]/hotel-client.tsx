"use client";

import Image from "next/image";

import { C } from "../../../config";
import { t } from "../../../i18n";
import { useLang } from "../../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons } from "../../../components";
import PriceCalc from "../../../price-calc";
import type { HotelLang } from "../../../hotels";
import type { PostTeaser } from "../../../blogTaxonomy";

/** Sunucunun hazırladığı tek otel görünümü (yalnızca istenen dil) */
export type HotelView = {
  slug: string;
  name: string;
  place: string;
  address: string;
  lat: number;
  lon: number;
  img: string;
  regionLabel: string;
  km: number | null;
  min: number | null;
  /** km/min yaklaşık mı (sabit rota yok) */
  approx: boolean;
  route: { key: string; name: string } | null;
  fromPrice: number | null;
  content: HotelLang;
  guides: PostTeaser[];
  siblings: { slug: string; name: string; place: string; img: string; teaser: string }[];
};

const fmtDur = (min: number, de: boolean) => {
  if (min < 60) return de ? `${min} Min.` : `${min} mins`;
  const h = Math.floor(min / 60), m = min % 60;
  return de ? `${h} Std.${m ? ` ${m} Min.` : ""}` : `${h} h${m ? ` ${m} mins` : ""}`;
};

export default function HotelClient({ h, faq }: { h: HotelView; faq: [string, string][] }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const de = lang === "de";
  const c = h.content;
  const ca = h.approx ? (de ? "ca. " : "approx. ") : "";

  const steps: [string, string][] = de
    ? [
        ["Festpreis sehen und buchen", "Der Rechner oben zeigt den Preis pro Fahrzeug. Die Buchung dauert rund eine Minute; Sie erhalten eine Bestätigung per E-Mail."],
        ["Empfang am Flughafen", "Ihr Chauffeur verfolgt den Flug und wartet mit Namensschild in der Ankunftshalle. 60 Minuten Wartezeit nach der Landung sind inklusive."],
        [`Direkt zum ${h.name}`, "Der Fahrer übernimmt das Gepäck und bringt Sie ohne Umwege bis vor den Hoteleingang. Für die Rückfahrt holen wir Sie dort wieder ab."],
      ]
    : [
        ["See the fixed price and book", "The calculator above shows the price per vehicle. Booking takes about a minute; you receive a confirmation by email."],
        ["Welcome at the airport", "Your chauffeur tracks the flight and waits with a name sign in the arrivals hall. 60 minutes of waiting after landing are included."],
        [`Straight to ${h.name}`, "The driver takes care of your luggage and drives you directly to the hotel entrance. For the return trip we pick you up there again."],
      ];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      {/* Başlık */}
      <section style={{ background: C.ivory }}>
        <div className="mx-auto max-w-4xl px-5 pb-8 pt-8">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <a href={P("/")} className="transition-colors hover:text-[#0C2E25]">{L.nav.home}</a>
            <span className="text-stone-300">/</span>
            <a href={P("/hotels")} className="transition-colors hover:text-[#0C2E25]">{de ? "Hoteltransfer" : "Hotel transfers"}</a>
            <span className="text-stone-300">/</span>
            <span style={{ color: C.pine }}>{h.name}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl" style={{ color: C.pine }}>
            {de ? `${h.name}: Transfer ab Flughafen Zürich` : `${h.name}: transfer from Zurich Airport`}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">{c.teaser}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
            <span>📍 {h.address}</span>
            {h.km !== null && <span>🛣 {ca}{h.km} km</span>}
            {h.min !== null && <span>🕐 {ca}{fmtDur(h.min, de)}</span>}
            <span className="rounded-full px-3 py-0.5 text-xs font-extrabold uppercase" style={{ background: C.gold, color: C.pine }}>
              {h.fromPrice
                ? (de ? `ab CHF ${h.fromPrice.toFixed(2)} pro Fahrzeug` : `from CHF ${h.fromPrice.toFixed(2)} per vehicle`)
                : (de ? "Festpreis pro Fahrzeug" : "Fixed price per vehicle")}
            </span>
          </p>
        </div>
        <div aria-hidden className="mx-auto h-px max-w-4xl px-5">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}66 30%, transparent 75%)` }} />
        </div>
      </section>

      {/* Fiyat hesaplayıcı — otel adresi ve koordinatıyla önceden dolu */}
      <section className="mx-auto max-w-4xl px-5">
        <PriceCalc
          defaultTo={h.address}
          toCoords={{ lat: h.lat, lon: h.lon }}
          title={de ? `Festpreis zum ${h.name}` : `Fixed price to ${h.name}`}
          source={`hotel:${h.slug}`}
        />
      </section>

      <article className="mx-auto max-w-3xl px-5 pb-14">
        <div className="space-y-4 leading-relaxed text-stone-700">
          {c.intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <div className="relative mt-10 h-56 overflow-hidden rounded-2xl shadow-md md:h-72" style={{ backgroundColor: C.pine }}>
          <Image src={h.img} alt={de ? `Landschaft bei ${h.place}` : `Scenery near ${h.place}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
          {de ? "Anfahrt und Ankunft am Hotel" : "The drive and arriving at the hotel"}
        </h2>
        <div className="mt-4 space-y-4 leading-relaxed text-stone-700">
          {c.arrival.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
          {de ? "Tipps für Ihren Aufenthalt" : "Tips for your stay"}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {c.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-stone-700">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.gold }} />
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        {/* Akış — gerçek bir sıra olduğu için numaralı */}
        <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
          {de ? "So läuft Ihr Transfer" : "How your transfer works"}
        </h2>
        <ol className="mt-5 space-y-4">
          {steps.map(([title, text], i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: C.pine, color: C.gold }}>{i + 1}</span>
              <span>
                <b className="block" style={{ color: C.pine }}>{title}</b>
                <span className="mt-1 block text-sm leading-relaxed text-stone-600">{text}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* SSS */}
        <h2 className="font-display mt-12 text-2xl font-semibold" style={{ color: C.pine }}>
          {de ? "Häufige Fragen" : "Frequently asked questions"}
        </h2>
        <div className="mt-5 divide-y divide-stone-200 rounded-2xl bg-white px-5 ring-1 ring-black/5">
          {faq.map(([q, a], i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold" style={{ color: C.pine }}>
                {q}
                <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.gold }}>＋</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
            </details>
          ))}
        </div>

        {/* Rota sayfası + rehberler */}
        {(h.route || h.guides.length > 0) && (
          <div className="mt-12 rounded-2xl p-6 md:p-8" style={{ background: "#FBF7EE", boxShadow: `inset 3px 0 0 ${C.gold}` }}>
            <h2 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {de ? "Gut vorbereitet anreisen" : "Arrive well prepared"}
            </h2>
            {h.route && (
              <p className="mt-2 text-sm text-stone-600">
                {de ? "Alles zur Strecke: " : "All about the route: "}
                <a href={P(`/${h.route.key}`)} className="font-bold underline decoration-[#C9A24B] underline-offset-2" style={{ color: C.pine }}>
                  {de ? `Flughafen Zürich → ${h.route.name}` : `Zurich Airport → ${h.route.name}`}
                </a>
              </p>
            )}
            {h.guides.length > 0 && (
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {h.guides.map((p) => (
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
                ))}
              </ul>
            )}
          </div>
        )}

        <p className="mt-10 text-xs leading-relaxed text-stone-500">
          {de
            ? `ZRH Airport Taxi ist ein unabhängiger Transferdienst und steht in keiner geschäftlichen Verbindung zum ${h.name}. Zimmer und Hotelleistungen buchen Sie direkt beim Hotel.`
            : `ZRH Airport Taxi is an independent transfer service and has no business affiliation with ${h.name}. Please book rooms and hotel services directly with the hotel.`}
        </p>
      </article>

      {/* Diğer oteller */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
              {de ? "Weitere Hoteltransfers" : "More hotel transfers"}
            </h2>
            <a href={P("/hotels")} className="text-[12px] font-extrabold uppercase tracking-[0.15em] hover:underline" style={{ color: C.goldText }}>
              {de ? "Alle Hotels" : "All hotels"}
            </a>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {h.siblings.map((s) => (
              <a key={s.slug} href={P(`/hotels/${s.slug}`)} className="group flex flex-col overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-black/5 transition-shadow hover:shadow-lg">
                <span className="relative block h-32 overflow-hidden" style={{ backgroundColor: C.pine }}>
                  <Image src={s.img} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="text-[11px] font-bold text-stone-500">{s.place}</span>
                  <span className="mt-1 text-[16px] font-extrabold leading-snug group-hover:underline" style={{ color: C.pine }}>{s.name}</span>
                  <span className="mt-1.5 text-sm leading-relaxed text-stone-600">{s.teaser}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
