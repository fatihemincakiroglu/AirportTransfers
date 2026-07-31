"use client";

import { useState } from "react";
import {
  C, WHATSAPP_NUMBER, PHONE_DISPLAY, CONTACT_EMAIL, MAX_PAX,
  COMPANY_NAME, COMPANY_REG, COMPANY_ADDRESS, LocalName,
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
  const { lang, setLang } = useLang();
  const L = t[lang];
  return (
    <div style={{ background: C.pine }} className="text-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
        <span style={{ color: C.gold }}>✈ {L.topbar}</span>
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
  );
}

// ── Header (aktif sayfa vurgusu + mobil menü) ─────────────────
export function SiteHeader({ active }: { active?: string }) {
  const { lang } = useLang();
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
        <a href="/" className="flex items-center gap-3">
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
            href="/#buchen"
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
  const { lang } = useLang();
  const L = t[lang];
  return (
    <section style={{ background: C.pine }} className="text-white">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:pb-14">
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <a href="/" className="hover:text-white">{L.nav.home}</a>
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
  const { lang } = useLang();
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
export function BookingCard() {
  const { lang } = useLang();
  const L = t[lang];
  const [f, setF] = useState({ from: "Flughafen Zürich (ZRH)", to: "", date: "", time: "", pax: "2", kids: "0" });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const msg = () =>
    `${L.msg.title}\n\n${L.msg.from}: ${f.from}\n${L.msg.to}: ${f.to}\n${L.msg.date}: ${f.date}\n${L.msg.time}: ${f.time}\n${L.msg.pax}: ${f.pax}\n${L.msg.kids}: ${f.kids}`;

  return (
    <div id="buchen" className="rounded-3xl bg-white p-6 text-stone-900 shadow-2xl ring-1 ring-black/5">
      <h2 className="font-display mb-5 text-xl font-semibold" style={{ color: C.pine }}>
        {L.form.title}
      </h2>
      <div className="space-y-4">
        <div>
          <label className={labelCls}>🚗 {L.form.from}</label>
          <input className={inputCls} placeholder={L.form.fromPh} value={f.from} onChange={(e) => set("from", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>📍 {L.form.to}</label>
          <input className={inputCls} placeholder={L.form.toPh} value={f.to} onChange={(e) => set("to", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>📅 {L.form.date}</label>
            <input type="date" className={inputCls} value={f.date} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>🕐 {L.form.time}</label>
            <input type="time" className={inputCls} value={f.time} onChange={(e) => set("time", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>👥 {L.form.pax}</label>
            <select className={inputCls} value={f.pax} onChange={(e) => set("pax", e.target.value)}>
              {Array.from({ length: MAX_PAX }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>🧒 {L.form.kids}</label>
            <select className={inputCls} value={f.kids} onChange={(e) => set("kids", e.target.value)}>
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
        <a
          href={waHref(msg())}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl px-4 py-3.5 text-center text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
          style={{ background: C.gold, color: C.pine }}
        >
          💬 {L.form.wa}
        </a>
        <a
          href={mailHref(L.msg.subject, msg())}
          className="block rounded-xl border px-4 py-3 text-center text-sm font-bold transition-colors"
          style={{ borderColor: C.pine, color: C.pine }}
        >
          ✉️ {L.form.mail}
        </a>
        <p className="text-center text-xs font-semibold text-stone-500">{L.form.note}</p>
      </div>
    </div>
  );
}

// ── Kartlar ───────────────────────────────────────────────────
export function RouteCard({ to, km, price, img }: { to: LocalName; km: number; price: number; img: string }) {
  const { lang } = useLang();
  const L = t[lang];
  const n = localName(to, lang);
  return (
    <a
      href={waHref(`${L.msg.title}\n\n${L.msg.from}: ${L.routesSec.origin}\n${L.msg.to}: ${n}`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: C.pine,
        backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.15) 0%, rgba(8,33,27,0.85) 85%), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute right-4 top-4 rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ background: C.gold, color: C.pine }}>
        {L.routesSec.from} CHF {price}
      </span>
      <span className="mb-2 h-0.5 w-8" style={{ background: C.gold }} />
      <h3 className="font-display text-xl font-semibold leading-snug">Flughafen Zürich (ZRH) → {n}</h3>
      <div className="mt-3 flex items-center justify-between text-sm text-white/85">
        <span>🛣 {km} km</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-[#0C2E25]">↗</span>
      </div>
    </a>
  );
}

export function TourCard({ name, dur, img }: { name: string; dur: string; img: string }) {
  const { lang } = useLang();
  const L = t[lang];
  return (
    <a
      href={waHref(`${L.msg.title}\n\n${name}`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: C.pine,
        backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.1) 0%, rgba(8,33,27,0.85) 85%), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: C.pine }}>
        🕐 {dur}
      </span>
      <span className="mb-2 h-0.5 w-8" style={{ background: C.gold }} />
      <h3 className="font-display text-xl font-semibold leading-snug">{name}</h3>
    </a>
  );
}

export function FleetCard({ name, car, pax, bags, img, showFeatures }: { name: LocalName; car: string; pax: number; bags: number; img: string; showFeatures?: boolean }) {
  const { lang } = useLang();
  const L = t[lang];
  const n = localName(name, lang);
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative flex h-40 items-end p-4 text-white"
        style={{
          backgroundColor: C.pine,
          backgroundImage: `linear-gradient(180deg, rgba(8,33,27,0.1) 0%, rgba(8,33,27,0.8) 90%), url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="font-display text-xl font-semibold">{n}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-stone-500">{car}</p>
        <div className="mt-3 flex gap-4 text-sm">
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
          className="mt-4 block rounded-full px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          style={{ background: C.pine }}
        >
          {L.fleetSec.cta} →
        </a>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
export function SiteFooter({ compact }: { compact?: boolean }) {
  const { lang } = useLang();
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
    <footer id="kontakt-footer" className="relative overflow-hidden text-white/70" style={{ background: C.pineDeep }}>
      <span aria-hidden className="font-display pointer-events-none absolute -bottom-14 left-0 select-none text-[26vw] font-semibold leading-none text-white/[0.04]">
        {L.footer.watermark}
      </span>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
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
            <li><a href="/strecken" className="hover:text-white">{L.nav.routes}</a></li>
            <li><a href="/touren" className="hover:text-white">{L.nav.tours}</a></li>
            <li><a href="/fahrzeuge" className="hover:text-white">{L.nav.fleet}</a></li>
            <li><a href="/galerie" className="hover:text-white">{L.nav.gallery}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.company}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/kontakt" className="hover:text-white">{L.nav.contact}</a></li>
            <li><a href="/kontakt" className="hover:text-white">{L.footer.faq}</a></li>
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
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} <b className="text-white">AirportTransfers Zürich</b> · {L.footer.rights}</span>
          <span className="text-center text-white/50">{COMPANY_NAME} · {COMPANY_REG} · {COMPANY_ADDRESS}</span>
        </div>
      </div>
    </footer>
  );
}

// ── Yüzen yan butonlar ────────────────────────────────────────
export function FloatingButtons() {
  return (
    <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
      <a href={waHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-lg text-white shadow-lg transition-transform hover:scale-110">💬</a>
      <a href={`tel:+${WHATSAPP_NUMBER}`} aria-label="Call" className="flex h-11 w-11 items-center justify-center rounded-xl text-lg shadow-lg transition-transform hover:scale-110" style={{ background: C.gold, color: C.pine }}>📞</a>
      <a href="/#buchen" aria-label="Book" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg shadow-lg ring-1 ring-black/10 transition-transform hover:scale-110">📅</a>
    </div>
  );
}
