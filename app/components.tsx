"use client";

import Image from "next/image";

import { useState } from "react";
import {
  C, WHATSAPP_NUMBER, PHONE_DISPLAY, CONTACT_EMAIL, MAX_PAX,
  COMPANY_NAME, COMPANY_REG, COMPANY_ADDRESS, LocalName, FOOTER_IMAGE, routes, SWISS_PLACES,
} from "./config";
import { t, Lang } from "./i18n";
import { useLang } from "./providers";

// ── Yardımcılar ────────────────────────────────────────────────
export const waHref = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${!text ? "" : `?text=${encodeURIComponent(text)}`}`;

export const mailHref = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const localName = (v: LocalName, lang: Lang) => (typeof v === "string" ? v : v[lang]);

export const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/30";
export const labelCls =
  "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500";

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
      <span className="h-px w-8" style={{ background: C.gold }} />
      {children}
    </p>
  );
}

// ── Üst şerit ──────────────────────────────────────────────────
export function TopBar() {
  const { lang, setLang, P } = useLang();
  const L = t[lang];
  const short = L.topbar.split("·")[0].trim(); // mobilde kısa etiket
  return (
    <div style={{ background: C.pine }} className="text-white/80">
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 overflow-hidden px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
        <span
          className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.2em]"
          style={{ color: C.gold }}
        >
          <span className="sm:hidden">✈ {short}</span>
          <span className="hidden sm:inline">✈ {L.topbar}</span>
        </span>
        <div className="flex flex-nowrap items-center gap-2 sm:gap-4">
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="whitespace-nowrap text-[11px] hover:text-white sm:text-xs">
            📞 {PHONE_DISPLAY}
          </a>
          <span className="hidden text-white/30 sm:inline">|</span>
          <div className="flex flex-nowrap items-center gap-0.5 text-[11px] font-bold sm:gap-1 sm:text-xs">
            {(["de", "en"] as Lang[]).map((c) => (
              <button
                key={c}
                onClick={() => setLang(c)}
                className="rounded-md px-1.5 py-0.5 uppercase transition-colors sm:px-2 sm:py-1"
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
  );
}

// ── Header (aktif sayfa vurgusu + mobil menü) ─────────────────
export function SiteHeader({ active }: { active?: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/strecken", key: "strecken", label: L.nav.routes },
    { href: "/touren", key: "touren", label: L.nav.tours },
    { href: "/fahrzeuge", key: "fahrzeuge", label: L.nav.fleet },
    { href: "/galerie", key: "galerie", label: L.nav.gallery },
    { href: "/kontakt", key: "kontakt", label: L.nav.contact },
  ];

  const linkStyle = (key: string) =>
    active === key
      ? { color: C.gold, borderBottom: `2px solid ${C.gold}`, paddingBottom: 2 }
      : undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href={P("/")} className="flex items-center gap-3">
          <span
            className="font-display flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg font-semibold"
            style={{ borderColor: C.gold, color: C.pine }}
          >
            A
          </span>
          <span className="font-display text-xl font-semibold tracking-tight" style={{ color: C.pine }}>
            AirportTransfers
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[12px] font-bold uppercase tracking-[0.18em] text-stone-600 lg:flex">
          {links.map((l) => (
            <a key={l.key} href={l.href} className="transition-colors hover:text-[#C9A24B]" style={linkStyle(l.key)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={P("/buchung")}
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {L.nav.book}
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-lg lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-stone-200 bg-white px-5 py-3 lg:hidden">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="block border-b border-stone-100 py-3 text-sm font-bold uppercase tracking-[0.15em] text-stone-700 last:border-0"
              style={active === l.key ? { color: C.gold } : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

// ── Alt sayfa hero'su (breadcrumb + başlık) ───────────────────
export function PageHero({ title, crumb, children }: { title: string; crumb: string; children?: React.ReactNode }) {
  const { lang, P } = useLang();
  const L = t[lang];
  return (
    <section style={{ background: C.pine }} className="text-white">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:pb-14">
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <a href={P("/")} className="hover:text-white">{L.nav.home}</a>
          <span>/</span>
          <span className="text-white">{crumb}</span>
        </nav>
        <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
        <h1 className="font-display mt-3 text-5xl font-semibold md:text-6xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}

// ── Yatay rezervasyon çubuğu ──────────────────────────────────
export function BookingBar() {
  const { lang, P } = useLang();
  const L = t[lang];
  const [f, setF] = useState({ from: "", to: "", date: "", time: "", pax: "2", kids: "0" });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const swap = () => setF((s) => ({ ...s, from: s.to, to: s.from }));

  const msg = () =>
    `${L.msg.title}\n\n${L.msg.from}: ${f.from}\n${L.msg.to}: ${f.to}\n${L.msg.date}: ${f.date}\n${L.msg.time}: ${f.time}\n${L.msg.pax}: ${f.pax}\n${L.msg.kids}: ${f.kids}`;

  const lbl = "mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em]";
  const inp =
    "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/30";

  return (
    <div className="mt-8 rounded-2xl border-2 bg-white p-4 text-stone-900 shadow-2xl md:p-5" style={{ borderColor: C.gold }}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className={lbl} style={{ color: C.gold }}>🚗 {L.form.from}</label>
          <input className={inp} placeholder={L.form.fromPh} value={f.from} onChange={(e) => set("from", e.target.value)} />
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
          <label className={lbl} style={{ color: C.gold }}>📍 {L.form.to}</label>
          <input className={inp} placeholder={L.form.toPh} value={f.to} onChange={(e) => set("to", e.target.value)} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
        <div>
          <label className={lbl} style={{ color: C.gold }}>📅 {L.form.date}</label>
          <input type="date" className={inp} value={f.date} onChange={(e) => set("date", e.target.value)} />
        </div>
        <div>
          <label className={lbl} style={{ color: C.gold }}>🕐 {L.form.time}</label>
          <input type="time" className={inp} value={f.time} onChange={(e) => set("time", e.target.value)} />
        </div>
        <div>
          <label className={lbl} style={{ color: C.gold }}>👥 {L.form.pax}</label>
          <select className={inp} value={f.pax} onChange={(e) => set("pax", e.target.value)}>
            {Array.from({ length: MAX_PAX }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl} style={{ color: C.gold }}>🧒 {L.form.kids}</label>
          <select className={inp} value={f.kids} onChange={(e) => set("kids", e.target.value)}>
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <a
          href={waHref(msg())}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 mt-auto flex h-[50px] items-center justify-center gap-2 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5 md:col-span-1"
          style={{ background: C.gold, color: C.pine }}
        >
          🔍 {L.form.search}
        </a>
      </div>
    </div>
  );
}

// ── Dikey rezervasyon kartı (ana sayfa hero) ──────────────────
/* ── Premium form alanları ─────────────────────────────── */
const fieldWrap =
  "group relative flex h-12 items-center gap-2.5 rounded-xl border border-stone-200 bg-[#FAF9F4] px-3.5 transition-all focus-within:border-[#C9A24B] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#C9A24B]/15";
const fieldInput =
  "w-full bg-transparent text-sm font-semibold text-stone-800 outline-none placeholder:font-normal placeholder:text-stone-400";

/** Aksan/harf duyarsız arama: "zurich" → "Zürich" bulur */
const norm = (s: string) =>
  s.toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u")
   .replace(/é|è|ê/g, "e").replace(/â|à/g, "a").replace(/î/g, "i");

/** İsviçre yerleri için otomatik tamamlamalı alan */
function PlaceField({ label, icon, value, placeholder, onChange }: {
  label: string; icon: string; value: string; placeholder: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const q = norm(value.trim());
  const matches = q.length >= 1
    ? SWISS_PLACES.filter((p) => norm(p).includes(q) && norm(p) !== q).slice(0, 7)
    : [];
  const show = open && matches.length > 0;

  return (
    <div className="relative">
      <label className={labelCls}>{icon} {label}</label>
      <div className={fieldWrap}>
        <input
          className={fieldInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            aria-label="clear"
            onMouseDown={(e) => { e.preventDefault(); onChange(""); }}
            className="shrink-0 text-stone-300 transition-colors hover:text-stone-500"
          >✕</button>
        )}
      </div>
      {show && (
        <ul className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-xl bg-white py-1.5 shadow-xl ring-1 ring-black/5">
          {matches.map((p) => (
            <li key={p}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); onChange(p); setOpen(false); }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-stone-700 transition-colors hover:bg-[#FBF7EE]"
              >
                <span className="text-xs" style={{ color: C.gold }}>📍</span>
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function BookingCard() {
  const { lang } = useLang();
  const L = t[lang];
  const [f, setF] = useState({ from: "", to: "", date: "", time: "", pax: "2", kids: "0" });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const swap = () => setF((s) => ({ ...s, from: s.to, to: s.from }));

  return (
    <div id="buchen" className="relative overflow-visible rounded-3xl bg-white p-6 text-stone-900 shadow-2xl ring-1 ring-black/5">
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-3xl" style={{ background: C.gold }} />
      <h2 className="font-display mb-5 text-xl font-semibold" style={{ color: C.pine }}>
        {L.form.title}
      </h2>
      <div className="space-y-4">
        {/* Nereden / Nereye + değiştir düğmesi */}
        <div className="relative space-y-4">
          <PlaceField label={L.form.from} icon="🚗" value={f.from} placeholder={L.form.fromPh} onChange={(v) => set("from", v)} />
          <PlaceField label={L.form.to} icon="📍" value={f.to} placeholder={L.form.toPh} onChange={(v) => set("to", v)} />
          <button
            type="button"
            onClick={swap}
            aria-label="swap"
            title="⇅"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-sm shadow-md transition-all hover:rotate-180 hover:shadow-lg"
            style={{ borderColor: C.gold, color: C.pine }}
          >⇅</button>
        </div>

        {/* Tarih / Saat */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>📅 {L.form.date}</label>
            <div className={fieldWrap}>
              <input type="date" className={fieldInput} value={f.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>🕐 {L.form.time}</label>
            <div className={fieldWrap}>
              <input type="time" className={fieldInput} value={f.time} onChange={(e) => set("time", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Yolcu / Çocuk */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>👥 {L.form.pax}</label>
            <div className={fieldWrap}>
              <select className={`${fieldInput} appearance-none pr-6`} value={f.pax} onChange={(e) => set("pax", e.target.value)}>
                {Array.from({ length: MAX_PAX }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 text-xs text-stone-400">▾</span>
            </div>
          </div>
          <div>
            <label className={labelCls}>🧒 {L.form.kids}</label>
            <div className={fieldWrap}>
              <select className={`${fieldInput} appearance-none pr-6`} value={f.kids} onChange={(e) => set("kids", e.target.value)}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3.5 text-xs text-stone-400">▾</span>
            </div>
          </div>
        </div>

        {/* Hemen ara */}
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="mt-1 flex h-14 flex-col items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: C.pine }}
        >
          <span className="text-sm font-extrabold uppercase tracking-[0.15em]">📞 {L.form.callNow}</span>
          <span className="text-xs font-semibold text-white/70">{PHONE_DISPLAY} · {L.form.callSub}</span>
        </a>
        <p className="text-center text-xs font-semibold text-stone-500">{L.form.note}</p>
      </div>
    </div>
  );
}

// ── Kartlar ───────────────────────────────────────────────────
export function RouteCard({ slug, to, km, min, price, img }: { slug: string; to: LocalName; km: number; min: number; price: number; img: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const n = localName(to, lang);
  const dur =
    lang === "de"
      ? min < 60 ? `${min} Min.` : `${Math.floor(min / 60)} Std.${min % 60 ? ` ${min % 60} Min.` : ""}`
      : min < 60 ? `${min} mins` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} mins` : ""}`;
  return (
    <a
      href={P(`/${slug}`)}
      className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{ backgroundColor: C.pine }}
    >
      <Image
        src={img}
        alt={lang === "de" ? `Flughafentransfer Zürich nach ${n}` : `Zurich Airport transfer to ${n}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,33,27,0.15) 0%, rgba(8,33,27,0.85) 85%)" }}
      />
      <span className="absolute right-4 top-4 z-10 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ background: C.gold, color: C.pine }}>
        {L.routesSec.from} CHF {price.toFixed(2)}
      </span>
      <span className="relative z-10 mb-2 h-0.5 w-8" style={{ background: C.gold }} />
      <h3 className="font-display relative z-10 text-xl font-semibold leading-snug">Flughafen Zürich (ZRH) → {n}</h3>
      <div className="relative z-10 mt-3 flex items-center justify-between text-sm text-white/85">
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          <span>🛣 {km} km</span>
          <span>🕐 {dur}</span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#0C2E25]">↗</span>
      </div>
    </a>
  );
}

export function TourCard({ slug, name, dur, img }: { slug: string; name: string; dur: string; img: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  return (
    <a
      href={P(`/touren/${slug}`)}
      className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{ backgroundColor: C.pine }}
    >
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,33,27,0.1) 0%, rgba(8,33,27,0.85) 85%)" }}
      />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: C.pine }}>
        🕐 {dur}
      </span>
      <span className="relative z-10 mb-2 h-0.5 w-8" style={{ background: C.gold }} />
      <h3 className="font-display relative z-10 text-xl font-semibold leading-snug">{name}</h3>
    </a>
  );
}

export function FleetCard({ name, car, pax, bags, img, showFeatures }: { name: LocalName; car: string; pax: number; bags: number; img: string; showFeatures?: boolean }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const n = localName(name, lang);
  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
      {/* Başlık bloğu sabit yükseklikte → 4 kart aynı hizada */}
      <div className="min-h-[76px]">
        <h3 className="font-display text-xl font-semibold leading-snug" style={{ color: C.pine }}>{car}</h3>
        <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>{n}</p>
      </div>
      <div className="my-4 flex h-36 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image src={img} alt={`${car} – ${n}`} width={360} height={160} className="max-h-full w-auto max-w-full object-contain" />
      </div>
      <div className="flex gap-4 border-t border-stone-100 pt-3 text-sm">
        <span>👥 <b>{pax}</b> <span className="text-stone-500">{L.fleetSec.pax}</span></span>
        <span>🧳 <b>{bags}</b> <span className="text-stone-500">{L.fleetSec.bags}</span></span>
      </div>
      {showFeatures && (
        <ul className="mt-3 space-y-1 border-t border-stone-100 pt-3 text-sm text-stone-600">
          {L.fleetSec.features.map((f, i) => (
            <li key={i}>✓ {f}</li>
          ))}
        </ul>
      )}
      <a
        href={waHref(`${L.msg.title}\n\n${n} – ${car}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-4 block rounded-full px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
        style={{ background: C.pine }}
      >
        {L.fleetSec.cta} →
      </a>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
export function SiteFooter({ compact }: { compact?: boolean }) {
  const { lang, P } = useLang();
  const L = t[lang];

  if (compact) {
    return (
      <footer style={{ background: C.pineDeep }} className="text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} <b className="text-white">AirportTransfers Zürich</b> · {L.footer.rights}</span>
          <span className="text-center text-white/50">{COMPANY_NAME} · {COMPANY_REG} · {COMPANY_ADDRESS}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="kontakt-footer"
      className="relative overflow-hidden text-white/70"
      style={{
        backgroundColor: C.pineDeep,
        backgroundImage: `linear-gradient(rgba(8,33,27,0.94), rgba(8,33,27,0.94)), url(${FOOTER_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto grid grid-cols-2 gap-x-6 gap-y-10 max-w-7xl px-5 py-12 md:grid-cols-4 md:gap-10 md:py-16">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display text-2xl font-semibold text-white">AirportTransfers</span>
          <p className="mt-4 text-sm leading-relaxed">{L.footer.about}</p>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">{L.footer.follow}</p>
          <div className="mt-2 flex gap-2">
            <a href={waHref()} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white">💬</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:text-white">✉️</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.explore}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href={P("/strecken")} className="hover:text-white">{L.nav.routes}</a></li>
            <li><a href={P("/touren")} className="hover:text-white">{L.nav.tours}</a></li>
            <li><a href={P("/fahrzeuge")} className="hover:text-white">{L.nav.fleet}</a></li>
            <li><a href={P("/galerie")} className="hover:text-white">{L.nav.gallery}</a></li>
            <li><a href={P("/blog")} className="hover:text-white">{L.blogSec.title}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.company}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href={P("/kontakt")} className="hover:text-white">{L.nav.contact}</a></li>
            <li><a href={P("/faq")} className="hover:text-white">{L.footer.faq}</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
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
            <li className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(201,162,75,0.15)", color: C.gold }}>📍</span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.15em] text-white/45">{L.footer.address}</span>
                <span className="text-sm font-bold text-white">{COMPANY_ADDRESS}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* Beliebte Strecken — iç linkleme şeridi */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            {L.footer.popular}
          </h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-5">
            {routes.slice(0, 10).map((r) => (
              <li key={r.slug}>
                <a href={P(`/${r.slug}`)} className="text-white/60 transition-colors hover:text-white">
                  ZRH → {localName(r.to, lang)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} <b className="text-white">AirportTransfers Zürich</b> · {L.footer.rights}</span>
          <span className="text-center text-white/50">{COMPANY_NAME} · {COMPANY_REG} · {COMPANY_ADDRESS}</span>
        </div>
      </div>
    </footer>
  );
}

// ── Yüzen butonlar: masaüstünde yan dock, mobilde alt çubuk ───
export function FloatingButtons() {
  const { lang, P } = useLang();
  const btn =
    "group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:bg-stone-100";
  const icon = "h-7 w-7 object-contain drop-shadow-sm";
  const tip =
    "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100";

  const labels = lang === "de"
    ? { wa: "WhatsApp", call: "Anrufen", book: "Buchen" }
    : { wa: "WhatsApp", call: "Call", book: "Book" };

  return (
    <>
      {/* Masaüstü: sağda buzlu cam dock */}
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl bg-white/90 p-1.5 shadow-xl ring-1 ring-black/10 backdrop-blur md:flex">
        <a href={waHref()} target="_blank" rel="noopener noreferrer" aria-label={labels.wa} className={btn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/whatsapp.png" alt="" className={icon} />
          <span className={tip} style={{ background: C.pine }}>{labels.wa}</span>
        </a>
        <a href={`tel:+${WHATSAPP_NUMBER}`} aria-label={labels.call} className={btn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/phone.png" alt="" className={icon} />
          <span className={tip} style={{ background: C.pine }}>{labels.call}</span>
        </a>
        <a href={P("/buchung")} aria-label={labels.book} className={btn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/booking.png" alt="" className={icon} />
          <span className={tip} style={{ background: C.pine }}>{labels.book}</span>
        </a>
      </div>

      {/* Mobil: içerik alt çubuğun arkasında kalmasın diye boşluk */}
      <div aria-hidden className="h-[76px] md:hidden" />

      {/* Mobil: altta sabit eylem çubuğu */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-3 gap-2 p-2.5">
          <a
            href={waHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-2 py-3 text-sm font-bold text-white shadow-sm active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/whatsapp.png" alt="" className="h-5 w-5 rounded-full bg-white object-contain" />
            {labels.wa}
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-bold shadow-sm active:scale-95"
            style={{ background: C.gold, color: C.pine }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/phone.png" alt="" className="h-5 w-5 object-contain" />
            {labels.call}
          </a>
          <a
            href={P("/buchung")}
            className="flex items-center justify-center gap-2 rounded-xl border bg-white px-2 py-3 text-sm font-bold active:scale-95"
            style={{ borderColor: C.pine, color: C.pine }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/booking.png" alt="" className="h-5 w-5 object-contain" />
            {labels.book}
          </a>
        </div>
      </div>
    </>
  );
}
