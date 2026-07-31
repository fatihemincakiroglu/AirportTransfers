"use client";

import { useState } from "react";
import { Playfair_Display, Manrope } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

// ─────────────────────────────────────────────────────────────
//  AYARLAR — ana sayfadakiyle aynı tut
// ─────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "41763020326";
const PHONE_DISPLAY = "+41 76 302 03 26";
const CONTACT_EMAIL = "info@airporttransfers.ch";
const COMPANY_NAME = "Kula-ZATK";
const COMPANY_REG = "Handelsregister-Nr.: CH-020.1.089.436-5";
const COMPANY_ADDRESS = "Industristrasse 14, 8302 Kloten, Switzerland";

const t = {
  de: {
    nav: { routes: "Strecken", tours: "Ausflüge", fleet: "Fahrzeuge", gallery: "Galerie", contact: "Kontakt", book: "Jetzt buchen" },
    crumb: { home: "Startseite", here: "Kontakt" },
    title: "Kontakt",
    search: {
      from: "Abholort",
      fromPh: "Flughafen, Hotel, …",
      to: "Zielort",
      toPh: "Flughafen, Hotel, …",
      date: "Datum",
      time: "Zeit",
      pax: "Passagiere",
      kids: "Kinder",
      cta: "Jetzt suchen",
    },
    form: {
      title: "Senden",
      name: "Ihr Name",
      email: "E-Mail",
      phone: "Telefon",
      message: "Nachricht",
      send: "Senden",
      orMail: "…oder direkt per E-Mail senden",
    },
    info: {
      title: "Kontaktieren Sie uns",
      phone: "Telefon",
      email: "E-Mail",
      whatsapp: "WhatsApp",
      address: "Adresse",
      hours: "Bürozeiten",
      always: "Rund um die Uhr verfügbar",
    },
    msg: {
      searchTitle: "Buchungsanfrage – Flughafentransfer Zürich",
      contactTitle: "Kontaktanfrage – Website",
      from: "Abholort", to: "Zielort", date: "Datum", time: "Zeit", pax: "Passagiere", kids: "Kinder",
      name: "Name", email: "E-Mail", phone: "Telefon", message: "Nachricht",
      subject: "Kontaktanfrage – AirportTransfers Zürich",
    },
    footer: { rights: "Alle Rechte vorbehalten." },
  },
  en: {
    nav: { routes: "Routes", tours: "Day trips", fleet: "Vehicles", gallery: "Gallery", contact: "Contact", book: "Book now" },
    crumb: { home: "Home", here: "Contact" },
    title: "Contact",
    search: {
      from: "Pickup location",
      fromPh: "Airport, hotel, …",
      to: "Destination",
      toPh: "Airport, hotel, …",
      date: "Date",
      time: "Time",
      pax: "Passengers",
      kids: "Children",
      cta: "Search now",
    },
    form: {
      title: "Send a message",
      name: "Your name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      send: "Send",
      orMail: "…or send directly by email",
    },
    info: {
      title: "Get in touch",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Address",
      hours: "Office hours",
      always: "Available around the clock",
    },
    msg: {
      searchTitle: "Booking request – Zurich Airport Transfer",
      contactTitle: "Contact request – Website",
      from: "Pickup", to: "Destination", date: "Date", time: "Time", pax: "Passengers", kids: "Children",
      name: "Name", email: "Email", phone: "Phone", message: "Message",
      subject: "Contact request – AirportTransfers Zurich",
    },
    footer: { rights: "All rights reserved." },
  },
};

type Lang = "de" | "en";

const C = {
  pine: "#0C2E25",
  pineDeep: "#08211B",
  gold: "#C9A24B",
  ivory: "#FAFAF7",
  ink: "#1C2B27",
};

export default function Kontakt() {
  const [lang, setLang] = useState<Lang>("de");
  const L = t[lang];

  // Yatay arama çubuğu
  const [search, setSearch] = useState({ from: "", to: "", date: "", time: "", pax: "2", kids: "0" });
  const setS = (k: string, v: string) => setSearch((f) => ({ ...f, [k]: v }));
  const swap = () => setSearch((f) => ({ ...f, from: f.to, to: f.from }));

  // Mesaj formu
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const setF = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const searchMessage = () =>
    `${L.msg.searchTitle}\n\n${L.msg.from}: ${search.from}\n${L.msg.to}: ${search.to}\n${L.msg.date}: ${search.date}\n${L.msg.time}: ${search.time}\n${L.msg.pax}: ${search.pax}\n${L.msg.kids}: ${search.kids}`;

  const contactMessage = () =>
    `${L.msg.contactTitle}\n\n${L.msg.name}: ${form.name}\n${L.msg.email}: ${form.email}\n${L.msg.phone}: ${form.phone}\n${L.msg.message}: ${form.message}`;

  const waHref = (text?: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}${text === "" ? "" : `?text=${encodeURIComponent(text ?? "")}`}`;
  const mailHref = (body: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(L.msg.subject)}&body=${encodeURIComponent(body)}`;

  const inputCls =
    "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/30";
  const searchLabel = "mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]";

  return (
    <div className={`${sans.className} min-h-screen antialiased`} style={{ background: C.ivory, color: C.ink }}>
      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{ background: C.pine }} className="text-white/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span style={{ color: C.gold }}>✈ Zürich · Private Transfer</span>
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
          </div>
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-3">
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
            <a href="/#strecken" className="transition-colors hover:text-[#C9A24B]">{L.nav.routes}</a>
            <a href="/#ausfluege" className="transition-colors hover:text-[#C9A24B]">{L.nav.tours}</a>
            <a href="/#fahrzeuge" className="transition-colors hover:text-[#C9A24B]">{L.nav.fleet}</a>
            <a href="/#galerie" className="transition-colors hover:text-[#C9A24B]">{L.nav.gallery}</a>
            <a href="/kontakt" style={{ color: C.gold }}>{L.nav.contact}</a>
          </nav>
          <a
            href="/#buchen"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {L.nav.book}
          </a>
        </div>
      </header>

      {/* ── Dark hero: breadcrumb + title + horizontal search ── */}
      <section style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-10 md:pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-white">{L.crumb.home}</a>
            <span>/</span>
            <span className="text-white">{L.crumb.here}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className={`${serif.className} mt-3 text-5xl font-semibold md:text-6xl`}>{L.title}</h1>

          {/* Horizontal booking bar */}
          <div className="mt-8 rounded-2xl border-2 bg-white p-4 text-stone-900 shadow-2xl md:p-5" style={{ borderColor: C.gold }}>
            <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>🚗 {L.search.from}</label>
                <input className={inputCls} placeholder={L.search.fromPh} value={search.from} onChange={(e) => setS("from", e.target.value)} />
              </div>
              <button
                type="button"
                onClick={swap}
                aria-label="Swap"
                className="mt-6 hidden h-11 w-11 items-center justify-center self-start rounded-xl border border-stone-300 text-lg transition-colors hover:border-[#C9A24B] hover:text-[#C9A24B] md:flex"
              >
                ⇆
              </button>
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>📍 {L.search.to}</label>
                <input className={inputCls} placeholder={L.search.toPh} value={search.to} onChange={(e) => setS("to", e.target.value)} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>📅 {L.search.date}</label>
                <input type="date" className={inputCls} value={search.date} onChange={(e) => setS("date", e.target.value)} />
              </div>
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>🕐 {L.search.time}</label>
                <input type="time" className={inputCls} value={search.time} onChange={(e) => setS("time", e.target.value)} />
              </div>
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>👥 {L.search.pax}</label>
                <select className={inputCls} value={search.pax} onChange={(e) => setS("pax", e.target.value)}>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={searchLabel} style={{ color: C.gold }}>🧒 {L.search.kids}</label>
                <select className={inputCls} value={search.kids} onChange={(e) => setS("kids", e.target.value)}>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <a
                href={waHref(searchMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 mt-auto flex h-[50px] items-center justify-center gap-2 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5 md:col-span-1"
                style={{ background: C.gold, color: C.pine }}
              >
                🔍 {L.search.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form + Info cards ───────────────────────────────── */}
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-[1.6fr_1fr] md:py-20">
        {/* Message form */}
        <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-8">
          <h2 className={`${serif.className} text-2xl font-semibold`} style={{ color: C.pine }}>
            {L.form.title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">{L.form.name}</label>
              <input className={inputCls} value={form.name} onChange={(e) => setF("name", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">{L.form.email}</label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => setF("email", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">{L.form.phone}</label>
            <input type="tel" className={inputCls} value={form.phone} onChange={(e) => setF("phone", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">{L.form.message}</label>
            <textarea rows={6} className={inputCls} value={form.message} onChange={(e) => setF("message", e.target.value)} />
          </div>
          <a
            href={waHref(contactMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full px-6 py-3.5 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {L.form.send}
          </a>
          <a href={mailHref(contactMessage())} className="mt-3 block text-center text-sm font-semibold text-stone-500 underline-offset-2 hover:underline">
            {L.form.orMail}
          </a>
        </div>

        {/* Info card */}
        <div className="h-fit rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-8">
          <h2 className={`${serif.className} text-2xl font-semibold`} style={{ color: C.pine }}>
            {L.info.title}
          </h2>
          <ul className="mt-6 divide-y divide-stone-100">
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>📞</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{L.info.phone}</span>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-bold hover:underline" style={{ color: C.pine }}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>✉️</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{L.info.email}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold hover:underline" style={{ color: C.pine }}>{CONTACT_EMAIL}</a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg bg-emerald-50 text-emerald-600">💬</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{L.info.whatsapp}</span>
                <a href={waHref("")} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: C.pine }}>
                  {PHONE_DISPLAY}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>📍</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{L.info.address}</span>
                <span className="text-sm font-bold" style={{ color: C.pine }}>{COMPANY_ADDRESS}</span>
              </span>
            </li>
            <li className="py-4">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{L.info.hours}</span>
              <span className="font-bold" style={{ color: C.pine }}>{L.info.always}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Footer (compact) ────────────────────────────────── */}
      <footer style={{ background: C.pineDeep }} className="text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} <b className="text-white">AirportTransfers Zürich</b> · {L.footer.rights}</span>
          <span className="text-center text-white/50">{COMPANY_NAME} · {COMPANY_REG} · {COMPANY_ADDRESS}</span>
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
      </div>
    </div>
  );
}
