"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Manrope } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

// ─────────────────────────────────────────────────────────────
//  AYARLAR — kendi bilgilerinle değiştir
// ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "41790000000"; // + ve boşluk olmadan
const PHONE_DISPLAY = "+41 79 000 00 00";
const CONTACT_EMAIL = "info@airporttransfers.ch";

// Hero slider görselleri: bu dosyaları projendeki public/hero/ klasörüne koy.
// (Görsel yoksa koyu yeşil zemin görünür, site yine çalışır.)
const HERO_IMAGES = ["/hero/hero-1.jpg", "/hero/hero-2.jpg", "/hero/hero-3.jpg"];
const SLIDE_MS = 6000;

// Güzergâhlar: görselleri public/routes/ klasörüne koy (opsiyonel)
const routes = [
  { to: "Zürich City", km: 12, price: 69, img: "/routes/zuerich.jpg" },
  { to: "Winterthur", km: 22, price: 89, img: "/routes/winterthur.jpg" },
  { to: "Zug", km: 46, price: 139, img: "/routes/zug.jpg" },
  { to: { de: "Luzern", en: "Lucerne" }, km: 63, price: 189, img: "/routes/luzern.jpg" },
  { to: "Basel", km: 86, price: 249, img: "/routes/basel.jpg" },
  { to: "Interlaken", km: 125, price: 379, img: "/routes/interlaken.jpg" },
];

// Filo: görselleri public/fleet/ klasörüne koy (opsiyonel)
const fleet = [
  { name: "Business Class", car: "Mercedes-Benz E-Class", pax: 3, bags: 3, img: "/fleet/e-class.jpg" },
  { name: "Premium Class", car: "Mercedes-Benz S-Class", pax: 3, bags: 3, img: "/fleet/s-class.jpg" },
  { name: { de: "Business & Familie", en: "Business & Family" }, car: "Mercedes-Benz V-Class", pax: 7, bags: 7, img: "/fleet/v-class.jpg" },
  { name: "VIP Sprinter", car: "Mercedes-Benz Sprinter", pax: 14, bags: 14, img: "/fleet/sprinter.jpg" },
];

// Galeri: public/gallery/1.jpg ... 7.jpg
const gallery = [1, 2, 3, 4, 5, 6, 7].map((n) => `/gallery/${n}.jpg`);

const t = {
  de: {
    topbar: { label: "Zürich · Private Transfer" },
    nav: { routes: "Strecken", tours: "Ausflüge", fleet: "Fahrzeuge", gallery: "Galerie", contact: "Kontakt", book: "Jetzt buchen" },
    hero: {
      eyebrow: "Zürich · VIP Mercedes",
      title1: "Zürich Transfers",
      title2: "im VIP Mercedes",
      sub: "Festpreis · Geschulte Fahrer · Flugverfolgung · 24/7 Support",
      pills: ["Festpreis", "24/7 Support", "Sofortige Bestätigung"],
      cta1: "Jetzt buchen",
      cta2: "Beliebte Strecken",
    },
    form: {
      title: "Transfer anfragen",
      from: "Abholort",
      fromPh: "Flughafen, Hotel, …",
      to: "Zielort",
      toPh: "Flughafen, Hotel, …",
      date: "Datum",
      time: "Zeit",
      pax: "Passagiere",
      kids: "Kinder",
      wa: "Per WhatsApp anfragen",
      mail: "Per E-Mail anfragen",
      note: "Gratis Kindersitze · Keine Extragebühren",
    },
    msg: {
      title: "Buchungsanfrage – Flughafentransfer Zürich",
      from: "Abholort", to: "Zielort", date: "Datum", time: "Zeit", pax: "Passagiere", kids: "Kinder",
      subject: "Buchungsanfrage Flughafentransfer Zürich",
    },
    routesSec: {
      eyebrow: "Strecken",
      title: "Beliebte Strecken",
      sub: "Unsere meistgebuchten Flughafentransfer-Strecken – zum garantierten Festpreis.",
      from: "ab",
      origin: "Flughafen Zürich (ZRH)",
      all: "Alle Strecken auf Anfrage",
    },
    toursSec: {
      eyebrow: "Ausflüge",
      title: "Ausflüge",
      sub: "Private Tagesausflüge in und um Zürich – mit eigenem Chauffeur.",
      list: [
        { name: "Rheinfall Schaffhausen", dur: "Halbtags", img: "/tours/rheinfall.jpg" },
        { name: "Luzern & Vierwaldstättersee", dur: "Ganztägig", img: "/tours/luzern.jpg" },
        { name: "Titlis & Engelberg", dur: "Ganztägig", img: "/tours/titlis.jpg" },
        { name: "Zürich Stadtrundfahrt", dur: "3 Stunden", img: "/tours/stadt.jpg" },
      ],
    },
    fleetSec: {
      eyebrow: "Fahrzeuge",
      title: "Unsere Flotte",
      sub: "Gepflegte, komfortable VIP-Fahrzeuge für jede Gruppengrösse.",
      pax: "Passagiere",
      bags: "Gepäck",
      cta: "Jetzt anfragen",
    },
    gallerySec: { eyebrow: "Galerie", title: "Galerie" },
    reviewsSec: {
      eyebrow: "Kundenbewertungen",
      title: "Was unsere Gäste sagen",
      sub: "Echte Erfahrungen von echten Reisenden.",
      count: "Bewertungen",
      list: [
        { text: "Pünktliche Abholung, Festpreis wie versprochen. Jederzeit wieder!", name: "Sophie W.", route: "ZRH → Zürich City", flag: "🇩🇪" },
        { text: "Driver was waiting with a name sign, car was spotless. Easy booking via WhatsApp.", name: "James H.", route: "ZRH → Luzern", flag: "🇬🇧" },
        { text: "Flug hatte 40 Minuten Verspätung – der Fahrer hat ohne Aufpreis gewartet.", name: "Markus B.", route: "ZRH → Zug", flag: "🇨🇭" },
        { text: "Comfortable ride to Interlaken, child seat was ready as requested.", name: "Elena R.", route: "ZRH → Interlaken", flag: "🇮🇹" },
        { text: "Sehr professionell, WLAN und Wasser im Auto. Klare Kommunikation per WhatsApp.", name: "Anna K.", route: "ZRH → Basel", flag: "🇦🇹" },
        { text: "Best transfer experience in Switzerland so far. Fair fixed price, premium car.", name: "David L.", route: "ZRH → Winterthur", flag: "🇺🇸" },
      ],
    },
    footer: {
      about: "VIP Mercedes Transfers in Zürich. Festpreise, geschulte Chauffeure und Flugverfolgung – rund um die Uhr.",
      follow: "Folgen Sie uns",
      explore: "Entdecken",
      company: "Unternehmen",
      support: "Support",
      callUs: "Rufen Sie uns an",
      writeUs: "Schreiben Sie uns",
      about2: "Über uns",
      faq: "Häufige Fragen",
      rights: "Alle Rechte vorbehalten.",
      watermark: "Zürich",
    },
  },
  en: {
    topbar: { label: "Zurich · Private Transfer" },
    nav: { routes: "Routes", tours: "Day trips", fleet: "Vehicles", gallery: "Gallery", contact: "Contact", book: "Book now" },
    hero: {
      eyebrow: "Zurich · VIP Mercedes",
      title1: "Zurich Transfers",
      title2: "in a VIP Mercedes",
      sub: "Fixed price · Trained drivers · Flight tracking · 24/7 support",
      pills: ["Fixed price", "24/7 support", "Instant confirmation"],
      cta1: "Book now",
      cta2: "Popular routes",
    },
    form: {
      title: "Request a transfer",
      from: "Pickup location",
      fromPh: "Airport, hotel, …",
      to: "Destination",
      toPh: "Airport, hotel, …",
      date: "Date",
      time: "Time",
      pax: "Passengers",
      kids: "Children",
      wa: "Request via WhatsApp",
      mail: "Request by email",
      note: "Free child seats · No extra fees",
    },
    msg: {
      title: "Booking request – Zurich Airport Transfer",
      from: "Pickup", to: "Destination", date: "Date", time: "Time", pax: "Passengers", kids: "Children",
      subject: "Zurich airport transfer booking request",
    },
    routesSec: {
      eyebrow: "Routes",
      title: "Popular routes",
      sub: "Our most-booked airport transfer routes – at a guaranteed fixed price.",
      from: "from",
      origin: "Zurich Airport (ZRH)",
      all: "All routes on request",
    },
    toursSec: {
      eyebrow: "Day trips",
      title: "Day trips",
      sub: "Private day trips in and around Zurich – with your own chauffeur.",
      list: [
        { name: "Rhine Falls Schaffhausen", dur: "Half day", img: "/tours/rheinfall.jpg" },
        { name: "Lucerne & Lake Lucerne", dur: "Full day", img: "/tours/luzern.jpg" },
        { name: "Titlis & Engelberg", dur: "Full day", img: "/tours/titlis.jpg" },
        { name: "Zurich City Tour", dur: "3 hours", img: "/tours/stadt.jpg" },
      ],
    },
    fleetSec: {
      eyebrow: "Vehicles",
      title: "Our fleet",
      sub: "Well-maintained, comfortable VIP vehicles for every group size.",
      pax: "Passengers",
      bags: "Luggage",
      cta: "Enquire now",
    },
    gallerySec: { eyebrow: "Gallery", title: "Gallery" },
    reviewsSec: {
      eyebrow: "Reviews",
      title: "What our guests say",
      sub: "Real experiences from real travellers.",
      count: "reviews",
      list: [
        { text: "Pünktliche Abholung, Festpreis wie versprochen. Jederzeit wieder!", name: "Sophie W.", route: "ZRH → Zurich City", flag: "🇩🇪" },
        { text: "Driver was waiting with a name sign, car was spotless. Easy booking via WhatsApp.", name: "James H.", route: "ZRH → Lucerne", flag: "🇬🇧" },
        { text: "Flug hatte 40 Minuten Verspätung – der Fahrer hat ohne Aufpreis gewartet.", name: "Markus B.", route: "ZRH → Zug", flag: "🇨🇭" },
        { text: "Comfortable ride to Interlaken, child seat was ready as requested.", name: "Elena R.", route: "ZRH → Interlaken", flag: "🇮🇹" },
        { text: "Sehr professionell, WLAN und Wasser im Auto. Klare Kommunikation per WhatsApp.", name: "Anna K.", route: "ZRH → Basel", flag: "🇦🇹" },
        { text: "Best transfer experience in Switzerland so far. Fair fixed price, premium car.", name: "David L.", route: "ZRH → Winterthur", flag: "🇺🇸" },
      ],
    },
    footer: {
      about: "VIP Mercedes transfers in Zurich. Fixed prices, trained chauffeurs and flight tracking – around the clock.",
      follow: "Follow us",
      explore: "Explore",
      company: "Company",
      support: "Support",
      callUs: "Call us",
      writeUs: "Write to us",
      about2: "About us",
      faq: "FAQ",
      rights: "All rights reserved.",
      watermark: "Zurich",
    },
  },
};

type Lang = "de" | "en";

// Renk paleti (örnekten farklı: çam yeşili + şampanya altını)
const C = {
  pine: "#0C2E25", // koyu çam yeşili (ana koyu renk)
  pineDeep: "#08211B", // footer
  gold: "#C9A24B", // şampanya altını (vurgu)
  goldDark: "#B08A38",
  ivory: "#FAFAF7", // açık zemin
  ink: "#1C2B27", // metin
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("de");
  const [slide, setSlide] = useState(0);
  const L = t[lang];

  // Hero slider: otomatik döngü
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const [form, setForm] = useState({
    from: "Flughafen Zürich (ZRH)",
    to: "",
    date: "",
    time: "",
    pax: "2",
    kids: "0",
  });
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const buildMessage = () =>
    `${L.msg.title}\n\n${L.msg.from}: ${form.from}\n${L.msg.to}: ${form.to}\n${L.msg.date}: ${form.date}\n${L.msg.time}: ${form.time}\n${L.msg.pax}: ${form.pax}\n${L.msg.kids}: ${form.kids}`;

  const waHref = (text?: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}${text === "" ? "" : `?text=${encodeURIComponent(text ?? buildMessage())}`}`;
  const mailHref = () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(L.msg.subject)}&body=${encodeURIComponent(buildMessage())}`;

  const name = (v: string | { de: string; en: string }) => (typeof v === "string" ? v : v[lang]);

  const inputCls =
    "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/30";
  const labelCls = "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500";
  const eyebrow = (text: string) => (
    <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
      <span className="h-px w-8" style={{ background: C.gold }} />
      {text}
    </p>
  );

  return (
    <div className={`${sans.className} min-h-screen antialiased`} style={{ background: C.ivory, color: C.ink }}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{ background: C.pine }} className="text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span style={{ color: C.gold }}>✈ {L.topbar.label}</span>
          <div className="flex items-center gap-4 normal-case tracking-normal">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-xs hover:text-white">📞 {PHONE_DISPLAY}</a>
            <span className="hidden text-white/30 sm:inline">|</span>
            <div className="flex items-center gap-1 text-xs font-bold">
              {(["de", "en"] as Lang[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setLang(c)}
                  className="rounded-md px-2 py-1 uppercase transition-colors"
                  style={lang === c ? { background: C.gold, color: C.pine } : { color: "rgba(255,255,255,0.55)" }}
                >
                  {c}
                </button>
              ))}
            </div>
            <span className="hidden rounded-md border border-white/20 px-2 py-1 text-xs sm:inline">CHF</span>
          </div>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <span
              className={`${serif.className} flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-semibold`}
              style={{ borderColor: C.gold, color: C.pine }}
            >
              A
            </span>
            <span className={`${serif.className} text-xl font-semibold tracking-tight`} style={{ color: C.pine }}>
              AirportTransfers
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-[12px] font-bold uppercase tracking-[0.18em] text-stone-600 lg:flex">
            <a href="#strecken" className="transition-colors hover:text-[#C9A24B]">{L.nav.routes}</a>
            <a href="#ausfluege" className="transition-colors hover:text-[#C9A24B]">{L.nav.tours}</a>
            <a href="#fahrzeuge" className="transition-colors hover:text-[#C9A24B]">{L.nav.fleet}</a>
            <a href="#galerie" className="transition-colors hover:text-[#C9A24B]">{L.nav.gallery}</a>
            <a href="#kontakt" className="transition-colors hover:text-[#C9A24B]">{L.nav.contact}</a>
          </nav>
          <a
            href="#buchen"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {L.nav.book}
          </a>
        </div>
      </header>

      {/* ── Hero: image slider + booking card ───────────────── */}
      <section className="relative overflow-hidden" style={{ background: C.pine }}>
        {/* Slider backgrounds */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            aria-hidden
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `linear-gradient(100deg, rgba(8,33,27,0.92) 0%, rgba(8,33,27,0.55) 55%, rgba(8,33,27,0.75) 100%), url(${src})`,
              opacity: slide === i ? 1 : 0,
            }}
          />
        ))}

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 text-white md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-24">
          {/* Left: headline */}
          <div className="flex flex-col justify-center">
            <p className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: C.gold }}>
              <span className="h-px w-10" style={{ background: C.gold }} />
              {L.hero.eyebrow}
            </p>
            <h1 className={`${serif.className} text-5xl font-semibold leading-[1.08] md:text-7xl`}>
              {L.hero.title1}
              <br />
              {L.hero.title2}
            </h1>
            <p className="mt-5 text-base text-white/80 md:text-lg">{L.hero.sub}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {L.hero.pills.map((p, i) => (
                <span key={i} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                  ✓ {p}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#buchen"
                className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
                style={{ background: C.gold, color: C.pine }}
              >
                {L.hero.cta1} →
              </a>
              <a
                href="#strecken"
                className="rounded-full border border-white/40 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white hover:text-[#0C2E25]"
              >
                {L.hero.cta2} ↗
              </a>
            </div>

            {/* Slider dots */}
            <div className="mt-12 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: slide === i ? 28 : 8,
                    background: slide === i ? C.gold : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: booking card */}
          <div id="buchen" className="rounded-3xl bg-white p-6 text-stone-900 shadow-2xl ring-1 ring-black/5">
            <h2 className={`${serif.className} mb-5 text-xl font-semibold`} style={{ color: C.pine }}>
              {L.form.title}
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>🚗 {L.form.from}</label>
                <input className={inputCls} placeholder={L.form.fromPh} value={form.from} onChange={(e) => set("from", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>📍 {L.form.to}</label>
                <input className={inputCls} placeholder={L.form.toPh} value={form.to} onChange={(e) => set("to", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>📅 {L.form.date}</label>
                  <input type="date" className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>🕐 {L.form.time}</label>
                  <input type="time" className={inputCls} value={form.time} onChange={(e) => set("time", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>👥 {L.form.pax}</label>
                  <select className={inputCls} value={form.pax} onChange={(e) => set("pax", e.target.value)}>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>🧒 {L.form.kids}</label>
                  <select className={inputCls} value={form.kids} onChange={(e) => set("kids", e.target.value)}>
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <a
                href={waHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-3.5 text-center text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                style={{ background: C.gold, color: C.pine }}
              >
                💬 {L.form.wa}
              </a>
              <a
                href={mailHref()}
                className="block rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors hover:text-white"
                style={{ borderColor: C.pine, color: C.pine }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.pine)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                ✉️ {L.form.mail}
              </a>
              <p className="text-center text-xs font-semibold text-stone-500">{L.form.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular routes (photo cards) ────────────────────── */}
      <section id="strecken" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        {eyebrow(L.routesSec.eyebrow)}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className={`${serif.className} text-4xl font-semibold md:text-5xl`} style={{ color: C.pine }}>
              {L.routesSec.title}
            </h2>
            <p className="mt-3 max-w-xl text-stone-600">{L.routesSec.sub}</p>
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r, i) => {
            const n = name(r.to);
            return (
              <a
                key={i}
                href={waHref(`${L.msg.title}\n\n${L.msg.from}: ${L.routesSec.origin}\n${L.msg.to}: ${n}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundColor: C.pine,
                  backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.15) 0%, rgba(8,33,27,0.85) 85%), url(${r.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span
                  className="absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide"
                  style={{ background: C.gold, color: C.pine }}
                >
                  {L.routesSec.from} CHF {r.price}
                </span>
                <span className="mb-2 h-0.5 w-8" style={{ background: C.gold }} />
                <h3 className={`${serif.className} text-xl font-semibold leading-snug`}>
                  Flughafen Zürich (ZRH) → {n}
                </h3>
                <div className="mt-3 flex items-center justify-between text-sm text-white/85">
                  <span>🛣 {r.km} km</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#0C2E25]">
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <p className="mt-6 text-sm font-semibold text-stone-500">{L.routesSec.all}</p>
      </section>

      {/* ── Day trips ───────────────────────────────────────── */}
      <section id="ausfluege" className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        {eyebrow(L.toursSec.eyebrow)}
        <h2 className={`${serif.className} text-4xl font-semibold md:text-5xl`} style={{ color: C.pine }}>
          {L.toursSec.title}
        </h2>
        <p className="mt-3 max-w-xl text-stone-600">{L.toursSec.sub}</p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {L.toursSec.list.map((tour, i) => (
            <a
              key={i}
              href={waHref(`${L.msg.title}\n\n${tour.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: C.pine,
                backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.1) 0%, rgba(8,33,27,0.85) 85%), url(${tour.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: C.pine }}>
                🕐 {tour.dur}
              </span>
              <span className="mb-2 h-0.5 w-8" style={{ background: C.gold }} />
              <h3 className={`${serif.className} text-xl font-semibold leading-snug`}>{tour.name}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* ── Fleet ───────────────────────────────────────────── */}
      <section id="fahrzeuge" className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        {eyebrow(L.fleetSec.eyebrow)}
        <h2 className={`${serif.className} text-4xl font-semibold md:text-5xl`} style={{ color: C.pine }}>
          {L.fleetSec.title}
        </h2>
        <p className="mt-3 max-w-xl text-stone-600">{L.fleetSec.sub}</p>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div
                className="relative flex h-40 items-end p-4 text-white"
                style={{
                  backgroundColor: C.pine,
                  backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.1) 0%, rgba(8,33,27,0.8) 90%), url(${v.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h3 className={`${serif.className} text-xl font-semibold`}>{name(v.name)}</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-stone-500">{v.car}</p>
                <div className="mt-3 flex gap-4 text-sm">
                  <span>👥 <b>{v.pax}</b> <span className="text-stone-500">{L.fleetSec.pax}</span></span>
                  <span>🧳 <b>{v.bags}</b> <span className="text-stone-500">{L.fleetSec.bags}</span></span>
                </div>
                <a
                  href={waHref(`${L.msg.title}\n\n${name(v.name)} – ${v.car}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-full px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: C.pine }}
                >
                  {L.fleetSec.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gallery (bento) ─────────────────────────────────── */}
      <section id="galerie" className="mx-auto max-w-7xl px-5 pb-16 md:pb-24">
        {eyebrow(L.gallerySec.eyebrow)}
        <h2 className={`${serif.className} text-4xl font-semibold md:text-5xl`} style={{ color: C.pine }}>
          {L.gallerySec.title}
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {gallery.slice(0, 7).map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl shadow-sm ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              style={{
                minHeight: i === 0 ? 260 : 120,
                backgroundColor: C.pine,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Reviews (dark) ──────────────────────────────────── */}
      <section id="bewertungen" style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
                <span className="h-px w-8" style={{ background: C.gold }} />
                {L.reviewsSec.eyebrow}
              </p>
              <h2 className={`${serif.className} text-4xl font-semibold md:text-5xl`}>{L.reviewsSec.title}</h2>
              <p className="mt-3 text-white/70">{L.reviewsSec.sub}</p>
            </div>
            <div className="text-right">
              <span style={{ color: C.gold }}>★★★★★</span>
              <p className="text-2xl font-extrabold">4.9 <span className="text-sm font-normal text-white/60">· 6 {L.reviewsSec.count}</span></p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {L.reviewsSec.list.map((r, i) => (
              <div key={i} className="relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <span className={`${serif.className} absolute right-4 top-2 text-5xl text-white/10`}>”</span>
                <span className="text-sm" style={{ color: C.gold }}>★★★★★</span>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/85">{r.text}</p>
                <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold"
                    style={{ background: C.gold, color: C.pine }}
                  >
                    {r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="text-sm">
                    <b>{r.name} {r.flag}</b>
                    <p className="text-xs text-white/55">{r.route}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer with watermark ───────────────────────────── */}
      <footer id="kontakt" className="relative overflow-hidden text-white/70" style={{ background: C.pineDeep }}>
        <span
          aria-hidden
          className={`${serif.className} pointer-events-none absolute -bottom-14 left-0 select-none text-[26vw] font-semibold leading-none text-white/[0.04]`}
        >
          {L.footer.watermark}
        </span>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
          <div>
            <span className={`${serif.className} text-2xl font-semibold text-white`}>AirportTransfers</span>
            <p className="mt-4 text-sm leading-relaxed">{L.footer.about}</p>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">{L.footer.follow}</p>
            <div className="mt-2 flex gap-2">
              <a
                href={waHref("")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white"
              >
                💬
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white">
                ✉️
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.explore}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#strecken" className="hover:text-white">{L.nav.routes}</a></li>
              <li><a href="#ausfluege" className="hover:text-white">{L.nav.tours}</a></li>
              <li><a href="#fahrzeuge" className="hover:text-white">{L.nav.fleet}</a></li>
              <li><a href="#galerie" className="hover:text-white">{L.nav.gallery}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.company}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white">{L.footer.about2}</a></li>
              <li><a href="#kontakt" className="hover:text-white">{L.nav.contact}</a></li>
              <li><a href="#" className="hover:text-white">{L.footer.faq}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.support}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(201,162,75,0.15)", color: C.gold }}>📞</span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-white/45">{L.footer.callUs}</span>
                  <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-bold text-white hover:underline">{PHONE_DISPLAY}</a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(201,162,75,0.15)", color: C.gold }}>✉️</span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.15em] text-white/45">{L.footer.writeUs}</span>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-white hover:underline">{CONTACT_EMAIL}</a>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs md:flex-row">
            <span>© {new Date().getFullYear()} <b className="text-white">AirportTransfers Zürich</b> · {L.footer.rights}</span>
            <span className="font-mono text-white/40">ZRH ⇄ CH</span>
          </div>
        </div>
      </footer>

      {/* ── Floating side buttons ───────────────────────────── */}
      <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
        <a
          href={waHref("")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-lg text-white shadow-lg transition-transform hover:scale-110"
        >
          💬
        </a>
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          aria-label="Call"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-lg shadow-lg transition-transform hover:scale-110"
          style={{ background: C.gold, color: C.pine }}
        >
          📞
        </a>
        <a
          href="#buchen"
          aria-label="Book"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-lg ring-1 ring-black/10 transition-transform hover:scale-110"
        >
          📅
        </a>
      </div>
    </div>
  );
}
