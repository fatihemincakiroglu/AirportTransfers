"use client";

import { C, routes, fleet } from "../../config";
import { t, pickL } from "../../i18n";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
import { findDestination, destRegions } from "../../destinations";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons, FleetCard, RouteCard, Eyebrow,
} from "../../components";

export default function DestinationClient({ slug }: { slug: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const X = tx[lang];
  const D = X.dest;

  const hit = findDestination(slug);
  if (!hit) return null;
  const { d, region } = hit;
  const route = d.routeSlug ? routes.find((r) => r.slug === d.routeSlug) : null;
  const regionLabel = pickL(region.label, lang);

  const bookHref = `${P("/buchung")}?${new URLSearchParams({ from: "Flughafen Zürich (ZRH)", to: d.name }).toString()}`;
  const popular = destRegions[0].cities.filter((c) => c.slug !== d.slug).slice(0, 8);
  const popularRoutes = routes.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="staedte" />

      {/* Başlık — fildişi zeminde, breadcrumb + içerik */}
      <section style={{ background: C.ivory }}>
        <div className="mx-auto max-w-7xl px-5 pb-8 pt-10">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
            <a href={P("/")} className="transition-colors hover:text-[#0C2E25]">{L.nav.home}</a>
            <span className="text-stone-300">/</span>
            <a href={P("/staedte")} className="transition-colors hover:text-[#0C2E25]">{D.crumb}</a>
            <span className="text-stone-300">/</span>
            <span style={{ color: C.pine }}>{d.name}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-3xl font-semibold md:text-5xl" style={{ color: C.pine }}>
            {D.hero(d.name)}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">{D.heroSub(d.name)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {D.chips.map((c, i) => (
              <span key={i} className="rounded-full bg-white px-4 py-1.5 text-xs font-bold shadow-sm ring-1 ring-black/5" style={{ color: C.pine }}>
                ✓ {c}
              </span>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={route ? P(`/${route.slug}`) : bookHref}
              className="rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ background: C.gold, color: C.pine }}
            >
              {D.calc} →
            </a>
            {route && (
              <span className="text-sm font-bold" style={{ color: C.pine }}>
                {D.routeKnown(d.name, route.price.toFixed(2))}
              </span>
            )}
          </div>
        </div>
        <div aria-hidden className="mx-auto h-px max-w-7xl px-5">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}66 30%, transparent 75%)` }} />
        </div>
      </section>

      {/* 3 özellik kartı */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[D.f1, D.f2, D.f3].map(([tt, dd], i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <h2 className="text-base font-bold" style={{ color: C.pine }}>{tt}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{dd}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Araçlar */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        <Eyebrow>{L.fleetSec.eyebrow}</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
          {D.vehiclesFor(d.name)}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v) => (
            <FleetCard key={v.car} {...v} />
          ))}
        </div>
      </section>

      {/* SEO metni */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        {D.seo(d.name, regionLabel).map(([h, p], i) => (
          <div key={i} className={i ? "mt-8" : ""}>
            <h2 className="font-display text-xl font-semibold md:text-2xl" style={{ color: C.pine }}>{h}</h2>
            <p className="mt-2.5 leading-relaxed text-stone-700">{p}</p>
          </div>
        ))}
        {route && (
          <a href={P(`/${route.slug}`)} className="mt-6 inline-block text-sm font-bold underline-offset-4 hover:underline" style={{ color: C.pine }}>
            {D.routeDetail} →
          </a>
        )}
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        <h2 className="font-display text-xl font-semibold md:text-2xl" style={{ color: C.pine }}>{D.faqTitle(d.name)}</h2>
        <div className="mt-5 divide-y divide-stone-200 rounded-2xl bg-white px-5 shadow-md ring-1 ring-black/5 md:px-7">
          {D.faq(d.name).map(([q, a], i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
                {q}
                <span className="shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Popüler rotalar */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        <Eyebrow>{L.routesSec.eyebrow}</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>{L.routesSec.title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((r) => (
            <RouteCard key={r.slug} {...r} />
          ))}
        </div>
      </section>

      {/* Diğer destinasyonlar */}
      <section className="mx-auto max-w-7xl px-5 pb-12">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">{D.more}</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {popular.map((c) => (
            <a key={c.slug} href={P(`/${c.slug}`)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ color: C.pine }}>
              {c.name}
            </a>
          ))}
          <a href={P("/staedte")} className="rounded-full px-4 py-2 text-sm font-bold" style={{ background: `${C.gold}22`, color: C.pine }}>
            {D.all} →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{D.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/70">{D.ctaSub}</p>
          <a href={bookHref} className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
            {D.ctaBtn} →
          </a>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
