"use client";

import Image from "next/image";
import { C, routes, fleet } from "../../config";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
import { destRegions } from "../../destinations";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, localName } from "../../components";

export default function PreiseClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const PR = X.prices;

  // En ucuz rota (Business referans fiyatı) — sınıf kartlarındaki "ab CHF"
  const minBase = Math.min(...routes.map((r) => r.price));

  const dur = (min: number) =>
    lang === "de"
      ? min < 60 ? `${min} Min.` : `${Math.floor(min / 60)} Std.${min % 60 ? ` ${min % 60}` : ""}`
      : min < 60 ? `${min} mins` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60}m` : ""}`;

  const routePrice = (routeSlug?: string) => {
    if (!routeSlug) return null;
    const r = routes.find((r) => r.slug === routeSlug);
    return r ? r.price : null;
  };

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="preise" />

      <PageHero title={PR.title} crumb={PR.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p className="max-w-2xl leading-relaxed text-stone-600">{PR.sub}</p>

        {/* 3 bilgi kartı */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[PR.f1, PR.f2, PR.f3].map(([tt, dd], i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <h2 className="text-base font-bold" style={{ color: C.pine }}>{tt}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{dd}</p>
            </div>
          ))}
        </div>

        {/* Araç sınıfları */}
        <h2 className="font-display mt-14 text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
          {PR.classesTitle}
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v) => (
            <div key={v.car} className="flex flex-col rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
              <div className="flex h-28 items-center justify-center">
                <Image src={v.img} alt={v.car} width={220} height={110} className="max-h-28 w-auto object-contain" />
              </div>
              <h3 className="mt-3 text-base font-bold" style={{ color: C.pine }}>{localName(v.name, lang)}</h3>
              <p className="text-xs text-stone-500">{v.car}</p>
              <p className="mt-3">
                <span className="text-xs font-bold uppercase text-stone-400">{PR.from} </span>
                <span className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
                  CHF {Math.round(minBase * v.mult)}
                </span>
              </p>
              <p className="text-xs text-stone-500">
                👥 {v.pax} · 🧳 {v.bags} · {PR.perVehicle}
              </p>
              <a
                href={P("/buchung")}
                className="mt-4 rounded-full py-2.5 text-center text-xs font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ background: C.gold, color: C.pine }}
              >
                {PR.book}
              </a>
            </div>
          ))}
        </div>

        {/* Rota tablosu — sabit fiyatlar */}
        <h2 className="font-display mt-14 text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
          {PR.tableTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">{PR.tableSub}</p>
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-md ring-1 ring-black/5">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">
                <th className="px-5 py-4">{PR.colDest}</th>
                <th className="px-5 py-4">{PR.colKm}</th>
                <th className="px-5 py-4">{PR.colDur}</th>
                {fleet.map((v) => (
                  <th key={v.car} className="px-5 py-4 text-right">{localName(v.name, lang)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {routes.map((r) => (
                <tr key={r.slug} className="transition-colors hover:bg-stone-50">
                  <td className="px-5 py-3.5">
                    <a href={P(`/${r.slug}`)} className="font-bold underline-offset-4 hover:underline" style={{ color: C.pine }}>
                      ZRH → {localName(r.to, lang)}
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{r.km} km</td>
                  <td className="px-5 py-3.5 text-stone-600">{dur(r.min)}</td>
                  {fleet.map((v) => (
                    <td key={v.car} className="px-5 py-3.5 text-right font-semibold text-stone-800">
                      CHF {Math.round(r.price * v.mult)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Destinasyonlara göre fiyatlar */}
        <h2 className="font-display mt-14 text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>
          {PR.destTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">{PR.destSub}</p>
        {destRegions.map((region) => (
          <div key={region.key} className="mt-8">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">{region.label[lang]}</h3>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {region.cities.map((c) => {
                const price = routePrice(c.routeSlug);
                return (
                  <a
                    key={region.key + c.slug}
                    href={P(`/${c.slug}`)}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ color: C.pine }}
                  >
                    {c.name}
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-extrabold"
                      style={price != null ? { background: `${C.gold}22`, color: C.pine } : { background: "#f5f5f4", color: "#a8a29e" }}
                    >
                      {price != null ? `${X.dest.fixed} ${Math.round(price)}` : PR.request}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center text-white md:p-12" style={{ background: C.pine }}>
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
