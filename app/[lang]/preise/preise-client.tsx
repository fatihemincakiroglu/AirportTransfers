"use client";

import Image from "next/image";
import { C, routes, fleet, transferPrice, hourlyPrice, HOURLY, NIGHT_SURCHARGE_TRANSFER, NIGHT_SURCHARGE_HOURLY } from "../../config";
import { tx } from "../../i18nX";
import { pickL } from "../../i18n";
import { useLang } from "../../providers";
import { destRegions } from "../../destinations";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, localName } from "../../components";

// Bölüm başlığı: küçük harf aralıklı etiket + eriyen altın çizgi (site imzası)
// Modül seviyesinde — her render'da yeniden oluşmaz (react-hooks/static-components)
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <h2 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: C.pine }}>
        {children}
      </h2>
      <span aria-hidden className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${C.gold}66, transparent 70%)` }} />
    </div>
  );
}

export default function PreiseClient() {
  const { lang, P } = useLang();
  const X = tx[lang];
  const PR = X.prices;

  // En kısa rota — sınıf kartlarındaki "ab CHF" her araç için kendi tarifesiyle
  const minKm = Math.min(...routes.map((r) => r.km));

  const dur = (min: number) =>
    lang === "de"
      ? min < 60 ? `${min} Min.` : `${Math.floor(min / 60)} Std.${min % 60 ? ` ${min % 60}` : ""}`
      : min < 60 ? `${min} mins` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60}m` : ""}`;

  const routeOf = (routeSlug?: string) => (routeSlug ? routes.find((r) => r.slug === routeSlug) : undefined);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="preise" />

      <PageHero title={PR.title} crumb={PR.crumb} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <p className="max-w-2xl leading-relaxed text-stone-600">{PR.sub}</p>

        {/* 3 ilke — kart yok, sakin üç sütun */}
        <div className="mt-10 grid gap-8 border-y border-stone-200/80 py-8 md:grid-cols-3">
          {[PR.f1, PR.f2, PR.f3].map(([tt, dd], i) => (
            <div key={i}>
              <h2 className="flex items-center gap-2.5 text-sm font-bold" style={{ color: C.pine }}>
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: C.gold }} />
                {tt}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{dd}</p>
            </div>
          ))}
        </div>

        {/* ── Araç sınıfları ── */}
        <div className="mt-14">
          <SectionLabel>{PR.classesTitle}</SectionLabel>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {fleet.map((v) => (
              <a
                key={v.car}
                href={P("/buchung")}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-28 items-center justify-center">
                  <Image
                    src={v.img}
                    alt={v.car}
                    width={230}
                    height={115}
                    className="max-h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 text-base font-bold" style={{ color: C.pine }}>{localName(v.name, lang)}</h3>
                <p className="mt-0.5 text-xs text-stone-500">{v.car} · 👥 {v.pax} · 🧳 {v.bags}</p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>{PR.from}</span>
                  <span className="font-display text-3xl font-semibold" style={{ color: C.pine }}>
                    CHF {Math.round(transferPrice(minKm, v.id))}
                  </span>
                </p>
                <p className="text-xs text-stone-400">{PR.perVehicle}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ── Rota tablosu ── */}
        <div className="mt-16">
          <SectionLabel>{PR.tableTitle}</SectionLabel>
          <p className="mt-3 max-w-2xl text-sm text-stone-600">{PR.tableSub}</p>
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
                  <th className="px-6 pb-3 pt-5 font-bold">{PR.colDest}</th>
                  <th className="px-4 pb-3 pt-5 font-bold">{PR.colKm}</th>
                  <th className="px-4 pb-3 pt-5 font-bold">{PR.colDur}</th>
                  {fleet.map((v) => (
                    <th key={v.car} className="px-4 pb-3 pt-5 text-right font-bold last:px-6">{localName(v.name, lang)}</th>
                  ))}
                </tr>
                <tr aria-hidden>
                  <td colSpan={3 + fleet.length} className="px-6">
                    <span className="block h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}44 40%, #e7e5e4 100%)` }} />
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {routes.map((r) => (
                  <tr key={r.slug} className="transition-colors hover:bg-[#FBF9F3]">
                    <td className="px-6 py-4">
                      <a href={P(`/${r.slug}`)} className="font-bold underline-offset-4 hover:underline" style={{ color: C.pine, textDecorationColor: C.gold }}>
                        ZRH → {localName(r.to, lang)}
                      </a>
                    </td>
                    <td className="px-4 py-4 tabular-nums text-stone-500">{r.km} km</td>
                    <td className="px-4 py-4 text-stone-500">{dur(r.min)}</td>
                    {fleet.map((v, i) => (
                      <td key={v.car} className={`px-4 py-4 text-right tabular-nums last:px-6 ${i === 0 ? "font-bold" : "font-medium text-stone-600"}`} style={i === 0 ? { color: C.pine } : undefined}>
                        {Math.round(transferPrice(r.km, v.id))}.–
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Destinasyonlara göre — editoryal dizin ── */}
        <div className="mt-16">
          <SectionLabel>{PR.destTitle}</SectionLabel>
          <p className="mt-3 max-w-2xl text-sm text-stone-600">{PR.destSub}</p>
          {destRegions.map((region) => {
            return (
              <div key={region.key} className="mt-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{pickL(region.label, lang)}</h3>
                <ul className="mt-4 columns-2 gap-x-10 md:columns-3 lg:columns-4">
                  {region.cities.map((c) => {
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
                          <span className="shrink-0 text-xs font-bold tabular-nums text-stone-400 transition-colors group-hover:text-[#0C2E25]">
                            {r ? `${Math.round(r.price)}.–` : PR.request}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
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

        {/* Saatlik tarife + gece tarifesi */}
        <div className="mt-14 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>
              {lang === "de" ? "Stundenbuchung" : "Hourly booking"}
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight" style={{ color: C.pine }}>
              {lang === "de" ? "Chauffeur zur freien Verfügung" : "Chauffeur at your disposal"}
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              {lang === "de"
                ? `Erste Stunde CHF ${HOURLY.firstHour}, jede weitere Stunde CHF ${HOURLY.extraHour}. Inklusive ${HOURLY.kmPerHour} km pro Stunde; bei längeren Strecken gilt der Kilometerpreis der Fahrzeugklasse. Beispiele für 3 Stunden:`
                : `First hour CHF ${HOURLY.firstHour}, each additional hour CHF ${HOURLY.extraHour}. Includes ${HOURLY.kmPerHour} km per hour; for longer distances the class kilometre rate applies. Examples for 3 hours:`}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {fleet.map((v) => (
                <div key={v.id} className="rounded-xl px-4 py-3" style={{ background: "#FBF7EE" }}>
                  <p className="text-xs font-bold text-stone-500">{typeof v.name === "string" ? v.name : v.name[lang]}</p>
                  <p className="font-mono text-lg font-extrabold" style={{ color: C.pine }}>CHF {hourlyPrice(3, v.id)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-6 text-white" style={{ background: C.pine }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>
              {lang === "de" ? "Nachttarif" : "Night tariff"}
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight">00:00 – 06:00</h2>
            <p className="mt-2 text-sm text-white/80">
              {lang === "de"
                ? `Für Fahrten mit Abholung zwischen Mitternacht und 6 Uhr gilt ein Zuschlag von ${Math.round(NIGHT_SURCHARGE_TRANSFER * 100)} % (Stundenbuchungen ${Math.round(NIGHT_SURCHARGE_HOURLY * 100)} %). Er wird bei der Buchung sofort im Preis angezeigt – keine Überraschung am Ziel.`
                : `For pickups between midnight and 6 am a surcharge of ${Math.round(NIGHT_SURCHARGE_TRANSFER * 100)} % applies (hourly bookings ${Math.round(NIGHT_SURCHARGE_HOURLY * 100)} %). It is shown in the price immediately when booking – no surprise at the destination.`}
            </p>
            <p className="mt-3 text-xs text-white/60">
              {lang === "de" ? "Tagsüber, am Wochenende und an Feiertagen: keine Zuschläge." : "Daytime, weekends and public holidays: no surcharges."}
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
