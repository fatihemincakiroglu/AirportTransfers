"use client";

import { useState } from "react";
import Image from "next/image";
import { C } from "../../config";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
import { swissEvents, eventCats, type EventCat } from "../../eventsContent";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";

export default function EventsClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const E = X.events;
  const [cat, setCat] = useState<EventCat | "all">("all");

  const list = swissEvents.filter((e) => cat === "all" || e.cat === cat);
  const catLabel = (k: EventCat) => eventCats.find((c) => c.key === k)?.label[lang] ?? k;
  const bookHref = (city: string) =>
    `${P("/buchung")}?${new URLSearchParams({ from: "Flughafen Zürich (ZRH)", to: city }).toString()}`;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="events" />

      <PageHero title={E.title} crumb={E.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p className="max-w-2xl leading-relaxed text-stone-600">{E.sub}</p>

        {/* Kategori filtreleri */}
        <div className="mt-7 flex flex-wrap gap-2">
          {eventCats.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setCat(c.key)}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5"
              style={cat === c.key ? { background: C.pine, color: "#fff" } : { background: "#fff", color: C.pine }}
            >
              {c.label[lang]}
            </button>
          ))}
        </div>

        {/* Etkinlik kartları */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <div key={e.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-44 overflow-hidden" style={{ background: C.pine }}>
                <Image
                  src={e.img}
                  alt={e.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide" style={{ background: C.gold, color: C.pine }}>
                  {catLabel(e.cat)} · {e.when[lang]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl font-semibold" style={{ color: C.pine }}>{e.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{e.desc[lang]}</p>
                <a
                  href={bookHref(e.city)}
                  className="mt-4 rounded-full py-2.5 text-center text-xs font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                  style={{ background: C.gold, color: C.pine }}
                >
                  {E.book} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{X.dest.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/70">{X.dest.ctaSub}</p>
          <a href={P("/buchung")} className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
            {X.dest.ctaBtn} →
          </a>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
