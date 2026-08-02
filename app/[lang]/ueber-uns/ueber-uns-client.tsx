"use client";

import Image from "next/image";
import { C } from "../../config";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, Eyebrow } from "../../components";

// ── Sayfa metinleri (DE/EN) ─────────────────────────────────
const A = {
  de: {
    crumb: "Über uns",
    title: "Über uns",
    lead: "Ihr verlässlicher Partner für Flughafentransfers in Zürich",
    intro: [
      "AirportTransfers Zürich steht für zuverlässige, effiziente Transferservices von und zum Flughafen Zürich. Unser Team professioneller Chauffeure sorgt dafür, dass jede Fahrt komfortabel und stressfrei verläuft – vom Moment der Landung bis zur Ankunft an Ihrer Zieladresse.",
      "Ob Geschäftsreise mit engem Terminplan, Familienurlaub mit Skigepäck oder VIP-Service mit höchster Diskretion: Mit unserer gepflegten Mercedes-Flotte und Festpreisen ohne Überraschungen bringen wir Sie sicher und pünktlich ans Ziel – in die ganze Schweiz, rund um die Uhr.",
    ],
    promiseTitle: "Unser Versprechen",
    promises: [
      ["⏱", "Pünktlich & zuverlässig", "Flugverfolgung in Echtzeit – Ihr Fahrer wartet, auch bei Verspätung. Kostenlose Wartezeit inklusive."],
      ["🚘", "Gepflegte Fahrzeuge", "Mercedes-Benz Flotte, regelmässig gewartet und makellos gepflegt – mit WLAN und Mineralwasser an Bord."],
      ["🤝", "Professionelle Chauffeure", "Lizenzierte, mehrsprachige Fahrer mit Ortskenntnis und Diskretion – Meet & Greet in der Ankunftshalle."],
      ["💬", "Einfache Buchung", "Online, per WhatsApp oder Telefon – Festpreisbestätigung innert 15 Minuten, keine Vorauszahlung nötig."],
      ["🕐", "24/7 verfügbar", "Frühflug um 5 Uhr oder Landung nach Mitternacht: Wir fahren, wann immer Sie uns brauchen."],
      ["👶", "Familien willkommen", "Baby- und Kindersitze sowie Skitaschen kostenlos – sagen Sie uns einfach, was Sie brauchen."],
    ],
    pillarsEyebrow: "Warum AirportTransfers Zürich",
    pillarsTitle: "Unser Anspruch an Exzellenz",
    pillars: [
      {
        icon: "🏅",
        title: "Engagement für Qualität",
        text: "Wir geben uns nicht mit «gut genug» zufrieden. Jede Rückmeldung fliesst in die Verbesserung unseres Services ein – damit jede Fahrt mit uns komfortabel, sicher und verlässlich ist. Vom ersten Kontakt bis zum Kofferausladen soll alles stimmen.",
      },
      {
        icon: "🗺",
        title: "Jahrelange Erfahrung",
        text: "Unser Team kennt die Region Zürich und die Strecken durch die ganze Schweiz im Detail: Verkehrsmuster, Baustellen, Passstrassen und die schnellsten Alternativen. Diese Ortskenntnis bedeutet für Sie: pünktliche Ankunft – auch zu Stosszeiten oder bei winterlichen Bedingungen.",
      },
      {
        icon: "🛡",
        title: "Sicherheit zuerst",
        text: "Ihre Sicherheit hat oberste Priorität. Alle Fahrzeuge durchlaufen regelmässige Wartungen und Sicherheitsprüfungen nach Schweizer Standard. Unsere Fahrer sind professionell ausgebildet, lizenziert und mit den lokalen Verkehrsregeln bestens vertraut – im Winter selbstverständlich mit kompletter Winterausrüstung.",
      },
    ],
    localTitle: "Verwurzelt in Kloten – zu Hause in der ganzen Schweiz",
    localText: [
      "Als Schweizer Unternehmen mit Sitz in Kloten, nur wenige Minuten vom Flughafen entfernt, sind wir dort zu Hause, wo Ihre Reise beginnt. Kurze Wege bedeuten kurze Reaktionszeiten – auch bei kurzfristigen Buchungen.",
      "Von hier aus fahren wir die ganze Schweiz: 25 feste Strecken mit garantierten Festpreisen, dazu individuelle Ziele auf Anfrage – von Zermatt bis St. Moritz, von Basel bis Lugano.",
    ],
    stats: [
      ["25+", "Festpreis-Strecken"],
      ["24/7", "Erreichbar"],
      ["4", "Fahrzeugklassen"],
      ["15 Min.", "Angebotszeit"],
    ],
    ctaTitle: "Überzeugen Sie sich selbst",
    ctaSub: "Buchen Sie Ihren Transfer in drei Schritten – oder schreiben Sie uns direkt.",
    ctaBook: "Jetzt buchen",
    ctaRoutes: "Strecken & Preise",
  },
  en: {
    crumb: "About us",
    title: "About us",
    lead: "Your trusted partner for airport transfers in Zurich",
    intro: [
      "AirportTransfers Zurich stands for reliable, efficient transfer services to and from Zurich Airport. Our team of professional chauffeurs makes sure every journey is comfortable and stress-free – from the moment you land until you arrive at your destination address.",
      "Whether it's a business trip on a tight schedule, a family holiday with ski luggage or a VIP service requiring full discretion: with our well-kept Mercedes fleet and fixed prices without surprises, we get you there safely and on time – across all of Switzerland, around the clock.",
    ],
    promiseTitle: "Our promise",
    promises: [
      ["⏱", "Punctual & reliable", "Real-time flight tracking – your driver waits, even when you're delayed. Free waiting time included."],
      ["🚘", "Well-maintained vehicles", "A Mercedes-Benz fleet, regularly serviced and immaculately kept – with WiFi and mineral water on board."],
      ["🤝", "Professional chauffeurs", "Licensed, multilingual drivers with local knowledge and discretion – meet & greet in the arrivals hall."],
      ["💬", "Easy booking", "Online, via WhatsApp or by phone – fixed-price confirmation within 15 minutes, no prepayment required."],
      ["🕐", "Available 24/7", "A 5 a.m. departure or a landing after midnight: we drive whenever you need us."],
      ["👶", "Families welcome", "Baby seats, child seats and ski bags free of charge – just tell us what you need."],
    ],
    pillarsEyebrow: "Why AirportTransfers Zurich",
    pillarsTitle: "Our commitment to excellence",
    pillars: [
      {
        icon: "🏅",
        title: "Dedicated to quality",
        text: "We don't settle for 'good enough'. Every piece of feedback flows into improving our service – so that every journey with us is comfortable, safe and dependable. From first contact to unloading your luggage, everything should be right.",
      },
      {
        icon: "🗺",
        title: "Years of experience",
        text: "Our team knows the Zurich region and the routes across Switzerland in detail: traffic patterns, roadworks, mountain passes and the fastest alternatives. For you, that local knowledge means arriving on time – even at rush hour or in winter conditions.",
      },
      {
        icon: "🛡",
        title: "Safety first",
        text: "Your safety is our top priority. Every vehicle undergoes regular maintenance and safety inspections to Swiss standards. Our drivers are professionally trained, licensed and thoroughly familiar with local traffic regulations – with full winter equipment as a matter of course.",
      },
    ],
    localTitle: "Rooted in Kloten – at home across Switzerland",
    localText: [
      "As a Swiss company based in Kloten, just minutes from the airport, we're at home right where your journey begins. Short distances mean short response times – even for last-minute bookings.",
      "From here we serve the whole country: 25 fixed routes with guaranteed prices, plus individual destinations on request – from Zermatt to St. Moritz, from Basel to Lugano.",
    ],
    stats: [
      ["25+", "Fixed-price routes"],
      ["24/7", "Availability"],
      ["4", "Vehicle classes"],
      ["15 min", "Offer time"],
    ],
    ctaTitle: "See for yourself",
    ctaSub: "Book your transfer in three steps – or message us directly.",
    ctaBook: "Book now",
    ctaRoutes: "Routes & prices",
  },
};

export default function UeberUns() {
  const { lang, P } = useLang();
  const c = A[lang];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />
      <PageHero title={c.title} crumb={c.crumb} />

      {/* ── Giriş + istatistik bandı ─────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>AirportTransfers Zürich</Eyebrow>
            <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl" style={{ color: C.pine }}>
              {lang === "de" ? "Mehr als eine Fahrt – ein Empfang." : "More than a ride – a welcome."}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
              {c.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-3xl shadow-xl md:h-80" style={{ background: C.pine }}>
            <Image src="/gallery/2.jpg" alt="Zürich Limmatquai" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <span aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,33,27,0.55) 100%)" }} />
          </div>
        </div>

        {/* İstatistikler */}
        <div className="mt-12 grid grid-cols-2 overflow-hidden rounded-3xl text-white shadow-lg md:grid-cols-4" style={{ background: C.pine }}>
          {c.stats.map(([num, label], i) => (
            <div key={i} className={`flex flex-col items-center gap-1 px-4 py-7 ${i > 0 ? "border-l border-white/10" : ""} ${i === 2 ? "border-l-0 md:border-l" : ""}`}>
              <span className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.gold }}>{num}</span>
              <span className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sözümüz — 6'lı kart ızgarası ─────────────────── */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-20">
          <Eyebrow>{c.crumb}</Eyebrow>
          <h2 className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{c.promiseTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.promises.map(([icon, title, text], i) => (
              <div key={i} className="group rounded-2xl p-6 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: "#FAF9F4" }}>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full text-lg transition-transform group-hover:scale-110"
                  style={{ background: "rgba(201,162,75,0.15)" }}
                >
                  {icon}
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold" style={{ color: C.pine }}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Üç sütun: Exzellenz / Erfahrung / Sicherheit ── */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <Eyebrow>{c.pillarsEyebrow}</Eyebrow>
        <h2 className="font-display max-w-2xl text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{c.pillarsTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {c.pillars.map((p, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
              <span className="absolute inset-x-0 top-0 h-1" style={{ background: C.gold }} />
              <span className="text-3xl">{p.icon}</span>
              <h3 className="font-display mt-4 text-xl font-semibold" style={{ color: C.pine }}>{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Yerel köken — görsel + metin ─────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ background: C.pineDeep }}>
        <Image src="/gallery/1.jpg" alt="" fill sizes="100vw" className="object-cover opacity-15" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <span className="block h-0.5 w-10" style={{ background: C.gold }} />
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">{c.localTitle}</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-white/75">
              {c.localText.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Kula-ZATK</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex gap-3"><span style={{ color: C.gold }}>📍</span> Industristrasse 14, 8302 Kloten</li>
              <li className="flex gap-3"><span style={{ color: C.gold }}>🏛</span> CH-020.1.089.436-5</li>
              <li className="flex gap-3"><span style={{ color: C.gold }}>✈️</span> {lang === "de" ? "5 Minuten vom Flughafen Zürich" : "5 minutes from Zurich Airport"}</li>
              <li className="flex gap-3"><span style={{ color: C.gold }}>🇨🇭</span> {lang === "de" ? "Schweizer Unternehmen" : "Swiss company"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-14 text-center md:py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>{c.ctaTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-stone-600">{c.ctaSub}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={P("/buchung")} className="rounded-full px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5" style={{ background: C.pine }}>
            {c.ctaBook} →
          </a>
          <a href={P("/strecken")} className="rounded-full px-8 py-3.5 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5" style={{ background: C.gold, color: C.pine }}>
            {c.ctaRoutes}
          </a>
        </div>
      </section>

      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
