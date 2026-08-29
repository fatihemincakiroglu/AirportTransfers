"use client";

import Image from "next/image";

import { useState } from "react";
import {
  C, WHATSAPP_NUMBER, PHONE_DISPLAY, CONTACT_EMAIL, MAX_PAX,
  COMPANY_ADDRESS, LocalName, FOOTER_IMAGE, routes, SWISS_PLACES,
} from "./config";
import { t, Lang, pickL } from "./i18n";
import { tx } from "./i18nX";
import { legalPages, LegalKey } from "./legalContent";
import { LANGS, LANG_NAMES } from "./paths";
import { useLang } from "./providers";

// ── Yardımcılar ────────────────────────────────────────────────
export const waHref = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${!text ? "" : `?text=${encodeURIComponent(text)}`}`;

export const mailHref = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const localName = (v: LocalName, lang: Lang) => (typeof v === "string" ? v : pickL(v, lang));

export const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:ring-2 focus:ring-[#C9A24B]/30";
export const labelCls =
  "mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-500";

// ── Ekstra sayaç satırı (bebek koltuğu / çocuk koltuğu / kayak çantası) ──
// Rezervasyon sayfalarında ortak; modül seviyesinde tanımlı olduğu için
// her render'da yeniden oluşmaz (react-hooks/static-components).
export function ExtrasCounter({ title, desc, freeLabel, value, onBump }: {
  title: string; desc: string; freeLabel: string; value: number; onBump: (d: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-stone-100 py-4">
      <div>
        <p className="font-bold">
          {title}{" "}
          <span className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase text-white" style={{ background: "#E2574C" }}>
            {freeLabel}
          </span>
        </p>
        <p className="text-xs text-stone-500">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onBump(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 font-bold hover:border-stone-900">−</button>
        <b className="w-4 text-center">{value}</b>
        <button onClick={() => onBump(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 font-bold hover:border-stone-900">+</button>
      </div>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
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
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.pine }} className="text-white/80">
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5">
        <span
          className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.2em]"
          style={{ color: C.gold }}
        >
          ✈ Airport Zurich Transfer
        </span>

        {/* Dil seçici — 11 dil, açılır menü */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            aria-label="Language"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors sm:text-xs"
            style={{ background: "rgba(201,162,75,0.15)", boxShadow: `inset 0 0 0 1px ${C.gold}55`, color: C.gold }}
          >
            🌐 {lang}
            <span className={`text-[9px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
          </button>
          {open && (
            <ul className="absolute right-0 z-[60] mt-2 max-h-[70vh] w-44 overflow-auto rounded-xl bg-white py-1.5 text-stone-800 shadow-xl ring-1 ring-black/5" dir="ltr">
              {LANGS.map((c) => {
                const active = lang === c;
                return (
                  <li key={c}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { setOpen(false); setLang(c); }}
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-semibold transition-colors hover:bg-stone-50"
                      style={active ? { color: C.pine } : undefined}
                    >
                      {LANG_NAMES[c]}
                      <span className="text-[10px] font-bold uppercase" style={{ color: active ? C.gold : "#d6d3d1" }}>
                        {active ? "✓" : c}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const [open, setOpen] = useState(false);

  const X = tx[lang];
  const links = [
    { href: "/strecken", key: "strecken", label: L.nav.routes },
    { href: "/staedte", key: "staedte", label: X.nav.destinations },
    { href: "/preise", key: "preise", label: X.nav.prices },
    { href: "/events", key: "events", label: X.nav.events },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
        <a href={P("/")} className="flex min-w-0 flex-1 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Zurich Taxi · Airport Transfer" className="h-8 w-auto sm:h-10" />
        </a>

        <nav className="hidden items-center gap-8 text-[12px] font-bold uppercase tracking-[0.18em] text-stone-600 lg:flex">
          {links.map((l) => (
            <a key={l.key} href={P(l.href)} className="transition-colors hover:text-[#C9A24B]" style={linkStyle(l.key)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={P("/buchung")}
            className="whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm"
            style={{ background: C.pine }}
          >
            {L.nav.book}
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-stone-300 text-lg sm:h-10 sm:w-10 lg:hidden"
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
              href={P(l.href)}
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

// ── Alt sayfa üst bloğu — sadece breadcrumb ───────────────────
// Başlık ekranda gösterilmez; SEO ve erişilebilirlik için sr-only h1 olarak kalır.
export function PageHero({ title, crumb, children }: { title: string; crumb: string; children?: React.ReactNode }) {
  const { lang, P } = useLang();
  const L = t[lang];
  return (
    <section style={{ background: C.ivory }}>
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-10">
        <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
          <a href={P("/")} className="transition-colors hover:text-[#0C2E25]">{L.nav.home}</a>
          <span className="text-stone-300">/</span>
          <span style={{ color: C.pine }}>{crumb}</span>
        </nav>
        <h1 className="sr-only">{title}</h1>
        {children}
      </div>
      {/* İmza: soldan eriyen altın ayraç */}
      <div aria-hidden className="mx-auto h-px max-w-7xl px-5">
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${C.gold} 0%, ${C.gold}66 30%, transparent 75%)` }} />
      </div>
    </section>
  );
}

// ── Yatay rezervasyon çubuğu ──────────────────────────────────
export function BookingBar() {
  const { lang, P } = useLang();
  const L = t[lang];
  const [f, setF] = useState({ from: "Flughafen Zürich (ZRH), Schweiz", to: "", date: "", time: "", pax: "2", kids: "0" });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const swap = () => setF((s) => ({ ...s, from: s.to, to: s.from }));

  return (
    <div className="relative mt-8 overflow-visible rounded-2xl bg-white p-4 text-stone-900 shadow-2xl ring-1 ring-black/5 md:p-5">
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ background: C.gold }} />
      {/* Nereden / Nereye + değiştir */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <PlaceField label={L.form.from} icon="🚗" value={f.from} placeholder={L.form.fromPh} onChange={(v) => set("from", v)} />
        <button
          type="button"
          onClick={swap}
          aria-label="swap"
          className="hidden h-9 w-9 items-center justify-center self-center rounded-full border bg-white text-sm shadow-md transition-all hover:rotate-180 hover:shadow-lg md:mt-5 md:flex"
          style={{ borderColor: C.gold, color: C.pine }}
        >⇆</button>
        <PlaceField label={L.form.to} icon="📍" value={f.to} placeholder={L.form.toPh} onChange={(v) => set("to", v)} />
      </div>
      {/* Tarih / Saat / Kişi / Çocuk / Ara */}
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-5">
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
        <SelectField
          label={L.form.pax}
          icon="👥"
          value={f.pax}
          options={Array.from({ length: MAX_PAX }, (_, i) => i + 1)}
          onChange={(v) => set("pax", v)}
        />
        <SelectField
          label={L.form.kids}
          icon="🧒"
          value={f.kids}
          options={[0, 1, 2, 3, 4]}
          onChange={(v) => set("kids", v)}
        />
        <a
          href={`${P("/buchung")}?${new URLSearchParams({
            from: f.from, to: f.to, date: f.date, time: f.time, pax: f.pax, kids: f.kids,
          }).toString()}`}
          className="col-span-2 mt-auto flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-extrabold uppercase tracking-[0.16em] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg md:col-span-1"
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
export const norm = (s: string) =>
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

/** Özel açılır menü — tarayıcı select'i yerine markalı liste */
function SelectField({ label, icon, value, options, onChange, suffix }: {
  label: string; icon: string; value: string; options: (string | number)[]; onChange: (v: string) => void; suffix?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className={labelCls}>{icon} {label}</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className={`${fieldWrap} w-full cursor-pointer select-none`}
      >
        <span className="w-full text-left text-sm font-semibold text-stone-800">{value}{suffix ? ` ${suffix}` : ""}</span>
        <span
          className={`pointer-events-none shrink-0 text-xs text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >▾</span>
      </button>
      {open && (
        <ul className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-xl bg-white py-1.5 shadow-xl ring-1 ring-black/5">
          {options.map((o) => {
            const v = String(o);
            const active = v === value;
            return (
              <li key={v}>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); onChange(v); setOpen(false); }}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-[#FBF7EE] ${
                    active ? "font-extrabold" : "font-medium text-stone-700"
                  }`}
                  style={active ? { color: C.pine, background: "#FBF7EE" } : undefined}
                >
                  {v}
                  {active && <span style={{ color: C.gold }}>✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function BookingCard() {
  const { lang, P } = useLang();
  const L = t[lang];
  const X = tx[lang];
  const [mode, setMode] = useState<"transfer" | "hourly">("transfer");
  const [hours, setHours] = useState("2");
  const [f, setF] = useState({ from: "Flughafen Zürich (ZRH), Schweiz", to: "", date: "", time: "", pax: "2", kids: "0" });
  const [stops, setStops] = useState<string[]>([]);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const swap = () => setF((s) => ({ ...s, from: s.to, to: s.from }));
  const setStop = (i: number, v: string) => setStops((a) => a.map((x, j) => (j === i ? v : x)));
  const removeStop = (i: number) => setStops((a) => a.filter((_, j) => j !== i));

  return (
    <div id="buchen" className="relative overflow-visible rounded-3xl bg-white p-6 text-stone-900 shadow-2xl ring-1 ring-black/5">
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-3xl" style={{ background: C.gold }} />

      {/* Transfer | Stündlich sekmeleri */}
      <div className="mb-5 flex rounded-full bg-stone-100 p-1 text-sm font-bold">
        {(["transfer", "hourly"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className="flex-1 rounded-full px-4 py-2 transition-colors"
            style={mode === m ? { background: C.gold, color: C.pine } : { color: "#78716c" }}
          >
            {m === "transfer" ? X.hourly.tabTransfer : X.hourly.tabHourly}
          </button>
        ))}
      </div>

      {mode === "hourly" ? (
        <div className="space-y-4">
          <SelectField
            label={X.hourly.duration}
            icon="⏱"
            value={hours}
            options={Array.from({ length: 11 }, (_, i) => i + 2)}
            suffix={X.hourly.hoursShort}
            onChange={setHours}
          />
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
          <SelectField
            label={L.form.pax}
            icon="👥"
            value={f.pax}
            options={Array.from({ length: MAX_PAX }, (_, i) => i + 1)}
            onChange={(v) => set("pax", v)}
          />
          <a
            href={`${P("/buchung")}?${new URLSearchParams({ mode: "hourly", hours, date: f.date, time: f.time, pax: f.pax }).toString()}`}
            className="mt-1 flex h-14 items-center justify-center gap-2.5 rounded-2xl text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: C.pine }}
          >
            {X.hourly.cta} →
          </a>
          <p className="text-center text-xs font-semibold text-stone-500">{X.hourly.note}</p>
        </div>
      ) : (
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

        {/* Ara duraklar */}
        {stops.map((sv, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="min-w-0 flex-1">
              <PlaceField label={`${i + 1}. ${X.stops.ph}`} icon="🚏" value={sv} placeholder={X.stops.ph} onChange={(v) => setStop(i, v)} />
            </div>
            <button
              type="button"
              onClick={() => removeStop(i)}
              aria-label={X.stops.remove}
              className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
            >✕</button>
          </div>
        ))}
        {stops.length < 3 && (
          <button
            type="button"
            onClick={() => setStops((a) => [...a, ""])}
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: C.pine }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-[11px]" style={{ background: `${C.gold}22`, color: C.gold }}>+</span>
            {X.stops.add}
          </button>
        )}

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
          <SelectField
            label={L.form.pax}
            icon="👥"
            value={f.pax}
            options={Array.from({ length: MAX_PAX }, (_, i) => i + 1)}
            onChange={(v) => set("pax", v)}
          />
          <SelectField
            label={L.form.kids}
            icon="🧒"
            value={f.kids}
            options={[0, 1, 2, 3, 4]}
            onChange={(v) => set("kids", v)}
          />
        </div>

        {/* Ara → rezervasyon sayfasına form verisiyle */}
        <a
          href={`${P("/buchung")}?${new URLSearchParams({
            from: f.from, to: f.to, date: f.date, time: f.time, pax: f.pax, kids: f.kids,
            ...(stops.filter((x) => x.trim()).length ? { stops: stops.filter((x) => x.trim()).join(" | ") } : {}),
          }).toString()}`}
          className="mt-1 flex h-14 items-center justify-center gap-2.5 rounded-2xl text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          style={{ background: C.pine }}
        >
          🔍 {L.form.search}
        </a>
        <p className="text-center text-xs font-semibold text-stone-500">{L.form.note}</p>
      </div>
      )}
    </div>
  );
}

// ── Kartlar ───────────────────────────────────────────────────
export function RouteCard({ slug, to, km, min, price, img, priority }: { slug: string; to: LocalName; km: number; min: number; price: number; img: string; priority?: boolean }) {
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
        priority={priority}
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


export function FleetCard({ name, car, pax, bags, img, showFeatures }: { name: LocalName; car: string; pax: number; bags: number; img: string; showFeatures?: boolean }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const n = localName(name, lang);
  return (
    <a
      href={P("/buchung")}
      className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Sınıf etiketi + araç adı — editoryal hiyerarşi */}
      <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>{n}</p>
      <h3 className="font-display mt-1.5 text-2xl font-semibold leading-snug" style={{ color: C.pine }}>{car}</h3>

      {/* Araç görseli — geniş sahne */}
      <div className="my-6 flex h-44 items-center justify-center md:h-48">
        <Image
          src={img}
          alt={`${car} – ${n}`}
          width={420}
          height={200}
          className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Kapasite — sakin tek satır */}
      <p className="flex items-center gap-4 border-t border-stone-100 pt-4 text-sm font-semibold text-stone-600">
        <span>👥 {pax} <span className="font-medium text-stone-400">{L.fleetSec.pax}</span></span>
        <span aria-hidden className="h-3 w-px bg-stone-200" />
        <span>🧳 {bags} <span className="font-medium text-stone-400">{L.fleetSec.bags}</span></span>
      </p>

      {showFeatures && (
        <ul className="mt-4 space-y-2.5">
          {L.fleetSec.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 text-[13px] font-medium text-stone-600">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
                style={{ background: "rgba(201,162,75,0.15)", color: C.gold }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Metin CTA — buton yerine */}
      <p className="mt-5 flex items-center gap-2 text-sm font-bold underline-offset-4 group-hover:underline" style={{ color: C.pine, textDecorationColor: C.gold }}>
        {L.fleetSec.cta}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </p>
    </a>
  );
}

export function LegalPage({ pageKey }: { pageKey: LegalKey }) {
  // İçerikler tek merkezden: app/legalContent.ts
  const { lang, P } = useLang();
  const L = t[lang];
  const c = pickL(legalPages[pageKey], lang);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />
      <PageHero title={c.title} crumb={c.title} />
      <section className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5 md:p-10">
          <span className="block h-0.5 w-10" style={{ background: C.gold }} />
          <div className="mt-6 space-y-5 leading-relaxed text-stone-700">
            {c.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <p className="mt-8 border-t border-stone-100 pt-5 text-sm text-stone-500">
            {lang === "de" ? "Fragen? Wir sind rund um die Uhr erreichbar:" : "Questions? We're available around the clock:"}{" "}
            <a href={P("/kontakt")} className="font-bold underline-offset-2 hover:underline" style={{ color: C.pine }}>
              {L.nav.contact}
            </a>
          </p>
        </div>
      </section>
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────


export function SiteFooter({ compact }: { compact?: boolean }) {
  const { lang, P } = useLang();
  const L = t[lang];
  // Not: "compact" modu bilinçli olarak devre dışı — tam footer her sayfada
  // gösterilir (linkler, popüler rotalar, iletişim). Prop, eski çağrılarla
  // uyumluluk için imzada duruyor.
  void compact;

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
      <div className="relative mx-auto grid grid-cols-2 gap-x-6 gap-y-10 max-w-7xl px-5 py-12 md:grid-cols-5 md:gap-8 md:py-16">
        <div className="col-span-2 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="Zurich Taxi · Airport Transfer" className="h-10 w-auto" />
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
            <li><a href={P("/fahrzeuge")} className="hover:text-white">{L.nav.fleet}</a></li>
            <li><a href={P("/galerie")} className="hover:text-white">{L.nav.gallery}</a></li>
            <li><a href={P("/blog")} className="hover:text-white">{L.blogSec.title}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.company}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href={P("/ueber-uns")} className="hover:text-white">{L.footer.aboutLink}</a></li>
            <li><a href={P("/kontakt")} className="hover:text-white">{L.nav.contact}</a></li>
            <li><a href={P("/faq")} className="hover:text-white">{L.footer.faq}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white">{L.footer.information}</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href={P("/datenschutz")} className="hover:text-white">{lang === "de" ? "Datenschutz" : "Privacy Policy"}</a></li>
            <li><a href={P("/cookies")} className="hover:text-white">{lang === "de" ? "Cookie-Richtlinie" : "Cookie Policy"}</a></li>
            <li><a href={P("/agb")} className="hover:text-white">{lang === "de" ? "AGB" : "Terms & Conditions"}</a></li>
            <li><a href={P("/rueckerstattung")} className="hover:text-white">{lang === "de" ? "Rückerstattung" : "Refund Policy"}</a></li>
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
      {/* Beliebte Strecken — iç linkleme şeridi */}
        {/* Üyelikler, kalite ve ödeme rozetleri */}
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-5 px-5">
          {[
            ["/badges/taca.png", "The Transportation Alliance", 36],
            ["/badges/iata.png", "IATA", 36],
            ["/badges/gbta.png", "GBTA", 36],
            ["/badges/swiss-made.png", "Swiss Made", 40],
            ["/badges/quality.png", "100% Qualität", 52],
          ].map(([src, alt, h]) => (
            <span key={src as string} className="flex items-center justify-center rounded-xl bg-white/95 px-3.5 py-2 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src as string} alt={alt as string} style={{ height: h as number }} className="w-auto" loading="lazy" />
            </span>
          ))}
          <span className="flex items-center justify-center rounded-xl bg-white/95 px-3.5 py-2 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/badges/payments.png" alt="Maestro · MasterCard · PostFinance · Visa · American Express" style={{ height: 24 }} className="w-auto" loading="lazy" />
          </span>
        </div>

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
