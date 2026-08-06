"use client";

import { useState } from "react";
import Image from "next/image";
import { C, routes } from "../../config";
import { tx } from "../../i18nX";
import { pickL } from "../../i18n";
import { useLang } from "../../providers";
import { destRegions } from "../../destinations";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, norm } from "../../components";

// Popüler şehirler için görseller: rotası olanlar rota görselini kullanır,
// Zürih'in rotası olmadığı için galeriden eşleştirilir.
const POPULAR_IMG: Record<string, string> = { "Zürich": "/gallery/2.jpg" };

export default function StaedteClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const D = X.dest;
  const [q, setQ] = useState("");

  const routeOf = (routeSlug?: string) => (routeSlug ? routes.find((r) => r.slug === routeSlug) : undefined);
  const match = (name: string) => !q.trim() || norm(name).includes(norm(q));

  const popular = destRegions[0];
  const rest = destRegions.slice(1);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="staedte" />

      <PageHero title={D.pageTitle} crumb={D.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-xl leading-relaxed text-stone-600">{D.pageSub}</p>
          {/* Sade arama — alt çizgili, odakta altın */}
          <div className="w-full max-w-xs">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={D.searchPh}
              className="w-full border-b border-stone-300 bg-transparent px-1 pb-2.5 text-sm font-semibold outline-none transition-colors placeholder:font-normal placeholder:text-stone-400 focus:border-[#C9A24B]"
            />
          </div>
        </div>

        {/* ── Beliebte Orte: fotoğraflı kartlar ── */}
        {popular.cities.some((c) => match(c.name)) && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
              {pickL(popular.label, lang)}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popular.cities.filter((c) => match(c.name)).map((c) => {
                const r = routeOf(c.routeSlug);
                const img = r?.img ?? POPULAR_IMG[c.name] ?? "/gallery/1.jpg";
                return (
                  <a
                    key={c.slug}
                    href={P(`/${c.slug}`)}
                    className="group relative flex min-h-[190px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: C.pine }}
                  >
                    <Image
                      src={img}
                      alt={D.hero(c.name)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,33,27,0.05) 30%, rgba(8,33,27,0.85) 100%)" }} />
                    <span className="relative font-display text-2xl font-semibold">{c.name}</span>
                    <span className="relative mt-1 text-xs font-bold uppercase tracking-wide text-white/80">
                      {r ? `${D.fixed} ${Math.round(r.price)}` : D.onRequest}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Bölge dizini: sakin, editoryal sütunlar ── */}
        {rest.map((region) => {
          const cities = region.cities.filter((c) => match(c.name));
          if (!cities.length) return null;
          return (
            <div key={region.key} className="mt-14">
              <div className="flex items-baseline gap-4">
                <h2 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.pine }}>
                  {pickL(region.label, lang)}
                </h2>
                <span aria-hidden className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}66, transparent 70%)` }} />
              </div>
              <ul className="mt-5 columns-2 gap-x-10 md:columns-3 lg:columns-4">
                {cities.map((c) => {
                  const r = routeOf(c.routeSlug);
                  return (
                    <li key={region.key + c.slug} className="break-inside-avoid">
                      <a
                        href={P(`/${c.slug}`)}
                        className="group flex items-baseline justify-between gap-3 py-[7px] text-[15px] font-semibold text-stone-700 transition-colors hover:text-[#0C2E25]"
                      >
                        <span className="underline-offset-4 group-hover:underline" style={{ textDecorationColor: C.gold }}>
                          {c.name}
                        </span>
                        {r && (
                          <span className="shrink-0 text-xs font-bold tabular-nums text-stone-400 transition-colors group-hover:text-[#0C2E25]">
                            {Math.round(r.price)}.–
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* CTA */}
        <div className="mt-20 rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{D.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/70">{D.ctaSub}</p>
          <a
            href={P("/buchung")}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ background: C.gold, color: C.pine }}
          >
            {D.ctaBtn} →
          </a>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
