"use client";

import { useState } from "react";
import { C, routes } from "../../config";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
import { destRegions } from "../../destinations";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, norm } from "../../components";

export default function StaedteClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const D = X.dest;
  const [q, setQ] = useState("");

  const priceFor = (routeSlug?: string) => {
    if (!routeSlug) return null;
    const r = routes.find((r) => r.slug === routeSlug);
    return r ? r.price : null;
  };

  const match = (name: string) => !q.trim() || norm(name).includes(norm(q));

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="staedte" />

      <PageHero title={D.pageTitle} crumb={D.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p className="max-w-2xl leading-relaxed text-stone-600">{D.pageSub}</p>

        {/* Arama */}
        <div className="mt-6 max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={D.searchPh}
            className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-3.5 text-sm font-semibold shadow-sm outline-none ring-0 transition-shadow focus:shadow-md"
          />
        </div>

        {destRegions.map((region) => {
          const cities = region.cities.filter((c) => match(c.name));
          if (!cities.length) return null;
          const isPopular = region.key === "popular";
          return (
            <div key={region.key} className="mt-10">
              <h2
                className={
                  isPopular
                    ? "font-display text-2xl font-semibold md:text-3xl"
                    : "text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400"
                }
                style={isPopular ? { color: C.pine } : undefined}
              >
                {region.label[lang]}
              </h2>
              <div className={`mt-4 flex flex-wrap gap-2.5 ${isPopular ? "gap-3" : ""}`}>
                {cities.map((c) => {
                  const price = priceFor(c.routeSlug);
                  return (
                    <a
                      key={region.key + c.slug}
                      href={P(`/${c.slug}`)}
                      className={`group inline-flex items-center gap-2 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        isPopular ? "px-5 py-2.5 text-sm font-bold" : "px-4 py-2 text-sm font-semibold"
                      }`}
                      style={{ color: C.pine }}
                    >
                      {c.name}
                      {price != null && (
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: `${C.gold}22`, color: C.pine }}>
                          {D.fixed} {Math.round(price)}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
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
