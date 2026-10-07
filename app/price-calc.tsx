"use client";

// ─────────────────────────────────────────────────────────────
//  MİNİ FİYAT HESAPLAYICI — blog yazılarının ve otel sayfalarının içinde
//  Rezervasyon sayfasıyla aynı zincir: resolveTrip (sabit rota eşleşmesi) → transferPrice;
//  sabit rota yoksa tarayıcıda yol mesafesi (clientRouteKm) → transferPrice.
//  Böylece burada görülen fiyat, rezervasyonun araç adımındaki fiyatla aynıdır.
// ─────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

import { C, routes, fleet, KM_RATE, MAX_PAX, transferPrice, isNightTime, airportName } from "./config";
import { t } from "./i18n";
import { useLang } from "./providers";
import { PlaceField, SelectField, labelCls, fieldWrap, fieldInput, todayISO, minTimeFor, isPastDateTime, localName } from "./components";
import { resolveTrip } from "./lib/trip";
import { clientRouteKm } from "./lib/distance-client";
import { rememberPlace } from "./lib/placeCoords";

type Props = {
  /** Önceden doldurulan varış (ör. "Davos" ya da otel adresi) */
  defaultTo?: string;
  /** Varışın kesin koordinatı (otel sayfaları) — mesafe bu noktaya göre hesaplanır */
  toCoords?: { lat: number; lon: number };
  /** Başlık (yoksa varsayılan) */
  title?: string;
  /** Ölçüm/analitik için kaynak etiketi */
  source?: string;
};

const sorted = [...fleet].sort((a, b) => KM_RATE[a.id] - KM_RATE[b.id]);

export default function PriceCalc({ defaultTo = "", toCoords, title, source = "inline" }: Props) {
  const { lang, P } = useLang();
  const L = t[lang];
  const de = lang === "de";
  const [from, setFrom] = useState(airportName(lang, true));
  const [to, setTo] = useState(defaultTo);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pax, setPax] = useState("2");
  const [quote, setQuote] = useState<{ km: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  // Otel adresinin koordinatı: rezervasyon sayfası da aynı noktayı kullanır (sessionStorage)
  useEffect(() => {
    if (defaultTo && toCoords) rememberPlace(defaultTo, toCoords.lat, toCoords.lon);
  }, [defaultTo, toCoords]);

  const trip = resolveTrip(from.trim(), to.trim());
  const route = trip.idx >= 0 ? routes[trip.idx] : null;
  const custom = !route && trip.custom && trip.custom.from && trip.custom.to ? trip.custom : null;

  // Sabit rota dışı: yol mesafesi tarayıcıda (Photon + OSRM, yedek kuş uçuşu)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- harici mesafe servisiyle senkron; uçlar değişince eski teklif temizlenir */
    setQuote(null);
    setFailed(false);
    if (!custom) { setLoading(false); return; }
    setLoading(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    let alive = true;
    const ctrl = new AbortController();
    const tm = setTimeout(async () => {
      const km = await clientRouteKm(custom.from, custom.to, [], ctrl.signal);
      if (!alive) return;
      setLoading(false);
      if (km === null) setFailed(true);
      else setQuote({ km });
    }, 450);
    return () => { alive = false; ctrl.abort(); clearTimeout(tm); };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- yalnızca uç noktalar değişince
  }, [custom?.from, custom?.to]);

  const km = route ? route.km : quote?.km ?? null;
  const night = isNightTime(time);
  const past = isPastDateTime(date, time);
  const chf = (n: number) => `CHF ${n.toFixed(2)}`;
  const paxN = Number(pax);

  const bookHref = past
    ? undefined
    : `${P("/buchung")}?${new URLSearchParams({
        from, to, ...(date ? { date } : {}), ...(time ? { time } : {}), pax, kids: "0",
      }).toString()}`;

  const status = !to.trim()
    ? (de ? "Ziel eingeben – der Festpreis erscheint sofort." : "Enter a destination – the fixed price appears instantly.")
    : loading
      ? (de ? "Festpreis wird berechnet …" : "Calculating your fixed price …")
      : failed
        ? (de ? "Adresse nicht eindeutig – den genauen Preis sehen Sie im nächsten Schritt." : "Address not clear – you'll see the exact price in the next step.")
        : null;

  return (
    <div
      className="relative my-10 overflow-visible rounded-3xl bg-white p-5 text-stone-900 shadow-xl ring-1 ring-black/5 md:p-7"
      data-calc-source={source}
    >
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-3xl" style={{ background: C.gold }} />
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-extrabold tracking-tight md:text-xl" style={{ color: C.pine }}>
          {title ?? (de ? "Festpreis für Ihre Fahrt berechnen" : "Calculate the fixed price for your ride")}
        </h2>
        <span className="text-xs font-semibold text-stone-500">
          {de ? "Pro Fahrzeug, inkl. MwSt." : "Per vehicle, incl. VAT"}
        </span>
      </div>

      {/* Von / Nach */}
      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <PlaceField label={L.form.from} icon="🚗" value={from} placeholder={L.form.fromPh} onChange={setFrom} />
        <button
          type="button"
          onClick={() => { setFrom(to); setTo(from); }}
          aria-label={de ? "Richtung tauschen" : "Swap direction"}
          className="hidden h-9 w-9 items-center justify-center self-center rounded-full border bg-white text-sm shadow-md transition-all hover:rotate-180 md:mt-5 md:flex"
          style={{ borderColor: C.gold, color: C.pine }}
        >⇆</button>
        <PlaceField label={L.form.to} icon="📍" value={to} placeholder={L.form.toPh} onChange={setTo} />
      </div>

      {/* Datum / Zeit / Personen */}
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
        <div>
          <label className={labelCls}>📅 {L.form.date}</label>
          <div className={fieldWrap}>
            <input type="date" aria-label={L.form.date} min={todayISO()} className={fieldInput} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelCls}>🕐 {L.form.time}</label>
          <div className={fieldWrap}>
            <input type="time" aria-label={L.form.time} min={minTimeFor(date)} className={fieldInput} value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <SelectField label={L.form.pax} icon="👥" value={pax} options={Array.from({ length: MAX_PAX }, (_, i) => i + 1)} onChange={setPax} />
        </div>
      </div>

      {/* Fiyatlar */}
      <div className="mt-5 rounded-2xl bg-[#FAF9F4] p-3 ring-1 ring-black/5 md:p-4" aria-live="polite">
        {status ? (
          <p className="px-1 py-2 text-sm text-stone-600">{status}</p>
        ) : km !== null ? (
          <>
            <ul className="divide-y divide-stone-200/70">
              {sorted.map((v) => {
                const fits = v.pax >= paxN;
                return (
                  <li key={v.id} className={`flex items-center justify-between gap-3 py-2.5 ${fits ? "" : "opacity-45"}`}>
                    <span className="min-w-0">
                      <b className="block text-sm" style={{ color: C.pine }}>{localName(v.name, lang)}</b>
                      <span className="block truncate text-xs text-stone-500">
                        {v.car} · {de ? `bis ${v.pax} Pers.` : `up to ${v.pax} pax`}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="font-mono text-lg font-extrabold" style={{ color: C.pine }}>{chf(transferPrice(km, v.id, time || null))}</span>
                      {!fits && <span className="block text-[11px] text-stone-500">{de ? "zu klein" : "too small"}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 px-1 text-[11px] leading-snug text-stone-500">
              {route
                ? (de ? `Festpreis-Strecke ZRH → ${localName(route.to, lang)} (${route.km} km).` : `Fixed-price route ZRH → ${localName(route.to, lang)} (${route.km} km).`)
                : (de ? `Berechnet für ca. ${km} km Fahrstrecke.` : `Calculated for approx. ${km} km by road.`)}
              {" "}
              {night
                ? (de ? "Inkl. Nachtzuschlag (00–06 Uhr)." : "Incl. night surcharge (midnight–6 am).")
                : (de ? "Gepäck, Wartezeit bei Ankunft und Kindersitze inklusive." : "Luggage, arrival waiting time and child seats included.")}
            </p>
          </>
        ) : null}
      </div>

      <a
        href={bookHref}
        aria-disabled={past}
        title={past ? (de ? "Bitte ein Datum in der Zukunft wählen" : "Please choose a date in the future") : undefined}
        className={`mt-4 flex min-h-[52px] items-center justify-center gap-2 rounded-2xl text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-lg transition-all ${past ? "cursor-not-allowed opacity-40" : "hover:-translate-y-0.5 hover:shadow-xl"}`}
        style={{ background: C.pine }}
      >
        {de ? "Weiter zur Buchung" : "Continue to booking"}
      </a>
    </div>
  );
}
