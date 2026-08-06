"use client";

import { useState } from "react";
import Image from "next/image";
import { C } from "../../config";
import { tx } from "../../i18nX";
import { pickL } from "../../i18n";
import { useLang } from "../../providers";
import { swissEvents, eventCats, type EventCat } from "../../eventsContent";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";

export default function EventsClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const E = X.events;
  const [cat, setCat] = useState<EventCat | "all">("all");

  const list = swissEvents.filter((e) => cat === "all" || e.cat === cat);
  const catLabel = (k: EventCat) => { const c = eventCats.find((c) => c.key === k); return c ? pickL(c.label, lang) : k; };
  const bookHref = (city: string) =>
    `${P("/buchung")}?${new URLSearchParams({ from: "Flughafen Zürich (ZRH)", to: city }).toString()}`;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="events" />

      <PageHero title={E.title} crumb={E.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p className="max-w-2xl leading-relaxed text-stone-600">{E.sub}</p>

        {/* Kategori sekmeleri — editoryal: metin + aktifte altın alt çizgi */}
        <div className="mt-9 border-b border-stone-200/80">
          <div className="-mb-px flex flex-wrap gap-x-7 gap-y-2 overflow-x-auto">
            {eventCats.map((c) => {
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCat(c.key)}
                  className="whitespace-nowrap pb-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors"
                  style={{
                    color: active ? C.pine : "#a8a29e",
                    borderBottom: active ? `2px solid ${C.gold}` : "2px solid transparent",
                  }}
                >
                  {pickL(c.label, lang)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Etkinlik kartları — görsel üstte, sakin gövde, buton yerine metin CTA */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <a
              key={e.slug}
              href={bookHref(e.city)}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 overflow-hidden" style={{ background: C.pine }}>
                <Image
                  src={e.img}
                  alt={e.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-16" style={{ background: "linear-gradient(180deg, transparent, rgba(8,33,27,0.45))" }} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                  {catLabel(e.cat)} · {pickL(e.when, lang)}
                </p>
                <h2 className="font-display mt-2 text-2xl font-semibold leading-snug" style={{ color: C.pine }}>
                  {e.name}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-stone-600">{pickL(e.desc, lang)}</p>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold underline-offset-4 group-hover:underline" style={{ color: C.pine, textDecorationColor: C.gold }}>
                  {E.book}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{X.dest.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/70">{X.dest.ctaSub}</p>
          <a
            href={P("/buchung")}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ background: C.gold, color: C.pine }}
          >
            {X.dest.ctaBtn} →
          </a>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
