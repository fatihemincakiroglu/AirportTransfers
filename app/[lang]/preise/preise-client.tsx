"use client";

import Image from "next/image";
import { C, fleet, transferPrice, hourlyPrice, HOURLY, NIGHT_SURCHARGE_TRANSFER, NIGHT_SURCHARGE_HOURLY, KM_RATE, KM_TIERS, TRANSFER_MIN_PRICE } from "../../config";
import { tx } from "../../i18nX";
import { useLang } from "../../providers";
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
                  <span className="font-display text-3xl font-semibold" style={{ color: C.pine }}>
                    CHF {KM_RATE[v.id].toFixed(2)}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>{lang === "de" ? "pro km" : "per km"}</span>
                </p>
                <p className="text-xs text-stone-400">{lang === "de" ? `+ Grundpreis nach Distanz · mind. CHF ${TRANSFER_MIN_PRICE}` : `+ base fare by distance · min. CHF ${TRANSFER_MIN_PRICE}`}</p>
              </a>
            ))}
          </div>
        </div>

        {/* ── Rota tablosu ── */}
        {/* Kilometertarif: dilim tabanı + km ücreti; örnek mesafeler */}
        <div className="mt-16">
          <SectionLabel>{lang === "de" ? "So berechnet sich Ihr Festpreis" : "How your fixed price is calculated"}</SectionLabel>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            {lang === "de"
              ? "Grundpreis nach Distanz + gefahrene Kilometer × Kilometerpreis der Fahrzeugklasse. Die Distanz wird bei der Buchung aus der tatsächlichen Fahrstrecke ermittelt – für jede Adresse in der Schweiz und den Nachbarländern."
              : "Base fare by distance + kilometres driven × the class kilometre rate. The distance is determined at booking from the actual driving route – for any address in Switzerland and neighbouring countries."}
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-md ring-1 ring-black/5">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: C.pine }}>
                  <th className="px-5 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-white">{lang === "de" ? "Distanz" : "Distance"}</th>
                  <th className="px-5 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-white">{lang === "de" ? "Grundpreis" : "Base fare"}</th>
                  {fleet.map((v) => (
                    <th key={v.id} className="px-5 py-3 text-right text-[11px] font-extrabold uppercase tracking-wider text-white">{typeof v.name === "string" ? v.name : v.name[lang]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {KM_TIERS.map((tier, i) => {
                  const lo = i === 0 ? 0 : KM_TIERS[i - 1].upTo!;
                  const label = tier.upTo === null ? `${lo}+ km` : `${lo}–${tier.upTo} km`;
                  const sample = tier.upTo === null ? 100 : Math.round((lo + tier.upTo) / 2);
                  return (
                    <tr key={i} className={i % 2 ? "bg-[#FBF9F3]" : "bg-white"}>
                      <td className="px-5 py-3 font-bold" style={{ color: C.pine }}>{label}</td>
                      <td className="px-5 py-3 text-stone-600">CHF {tier.base}</td>
                      {fleet.map((v) => (
                        <td key={v.id} className="px-5 py-3 text-right tabular-nums text-stone-700">
                          <span className="text-[11px] text-stone-400">{lang === "de" ? "z. B." : "e.g."} {sample} km → </span>
                          <b>CHF {transferPrice(sample, v.id).toFixed(2)}</b>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-stone-500">
            {lang === "de"
              ? `Kilometerpreis: ${fleet.map((v) => `${typeof v.name === "string" ? v.name : v.name.de} CHF ${KM_RATE[v.id].toFixed(2)}`).join(" · ")}. Mindestpreis CHF ${TRANSFER_MIN_PRICE}. Alle Preise pro Fahrzeug, inkl. MwSt., Meet & Greet, Flugverfolgung, 60 Min. Wartezeit und Kindersitzen.`
              : `Kilometre rate: ${fleet.map((v) => `${typeof v.name === "string" ? v.name : v.name.en} CHF ${KM_RATE[v.id].toFixed(2)}`).join(" · ")}. Minimum fare CHF ${TRANSFER_MIN_PRICE}. All prices per vehicle, incl. VAT, meet & greet, flight tracking, 60 min waiting time and child seats.`}
          </p>
          <a href={P("/buchung")} className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
            {lang === "de" ? "Preis für meine Adresse berechnen" : "Calculate the price for my address"} →
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
