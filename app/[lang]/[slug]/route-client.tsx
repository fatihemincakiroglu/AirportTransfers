"use client";

import Image from "next/image";

import { useMemo, useState } from "react";

import { C, routes, fleet, BOOKING_WHATSAPP_NUMBER } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { routeContent } from "../../routeContent";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  mailHref, localName, inputCls, labelCls,
  RouteCard,
} from "../../components";

export default function RouteClient({ slug }: { slug: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const D = L.detail;
  

  const route = useMemo(() => routes.find((r) => r.slug === slug), [slug]);

  // Adım 1: tarih/saat + araç seçimi · Adım 2: yolcu bilgileri
  const [step, setStep] = useState<1 | 2>(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [car, setCar] = useState<number | null>(null);
  const [pay, setPay] = useState(0);
  const [extras, setExtras] = useState({ baby: 0, child: 0, ski: 0 });
  const [f, setF] = useState({
    name: "", surname: "", email: "", phone: "",
    flight: "", nameboard: "", pax: "2", luggage: "2", notes: "",
  });
  const [accepted, setAccepted] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const bump = (k: "baby" | "child" | "ski", d: number) =>
    setExtras((s) => ({ ...s, [k]: Math.max(0, Math.min(4, s[k] + d)) }));

  if (!route) {
    return (
      <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
        <TopBar />
        <SiteHeader active="strecken" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <p className="text-lg font-semibold">{D.notFound}</p>
          <a href={P("/strecken")} className="mt-4 inline-block font-bold underline" style={{ color: C.gold }}>
            {D.allRoutes} →
          </a>
        </div>
        <SiteFooter compact />
      </div>
    );
  }

  const n = localName(route.to, lang);
  const origin = L.routesSec.origin;
  const dur =
    lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`;

  const sorted = [...fleet].sort((a, b) => a.mult - b.mult);
  const priceOf = (mult: number) => route.price * mult;
  const chosen = car !== null ? sorted[car] : null;
  const total = chosen ? priceOf(chosen.mult) : 0;

  const message = () => {
    const c = chosen!;
    const extrasTxt = [
      extras.baby ? `${D.baby[0]}: ${extras.baby}` : "",
      extras.child ? `${D.child[0]}: ${extras.child}` : "",
      extras.ski ? `${D.ski[0]}: ${extras.ski}` : "",
    ].filter(Boolean).join("\n");
    return (
      `${L.msg.title}\n\n` +
      `${D.pickupLoc}: ${origin}\n${D.dropoffLoc}: ${n}\n` +
      `${L.form.date}: ${date}\n${L.form.time}: ${time}\n\n` +
      `${D.vehicle}: ${localName(c.name, lang)} – ${c.car}\n` +
      `${D.total}: CHF ${total.toFixed(2)}\n` +
      `${D.payTitle}: ${D.payOptions[pay][0]}\n\n` +
      `${D.name}: ${f.name} ${f.surname}\n${D.email}: ${f.email}\n${D.phone}: ${f.phone}\n` +
      `${D.flight}: ${f.flight}\n` +
      (f.nameboard ? `${D.nameboard}: ${f.nameboard}\n` : "") +
      `${L.form.pax}: ${f.pax} · ${D.luggage}: ${f.luggage}\n` +
      (extrasTxt ? `\n${extrasTxt}\n` : "") +
      (f.notes ? `\n${D.notes}: ${f.notes}` : "")
    );
  };

  const ready =
    accepted && f.name && f.surname && f.email && f.phone && f.flight && date && time;

  const Counter = ({ k, title, desc }: { k: "baby" | "child" | "ski"; title: string; desc: string }) => (
    <div className="flex items-center justify-between gap-4 border-b border-stone-100 py-4">
      <div>
        <p className="font-bold">
          {title}{" "}
          <span className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase text-white" style={{ background: "#E2574C" }}>
            {D.free}
          </span>
        </p>
        <p className="text-xs text-stone-500">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => bump(k, -1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 font-bold hover:border-stone-900">−</button>
        <b className="w-4 text-center">{extras[k]}</b>
        <button onClick={() => bump(k, 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 font-bold hover:border-stone-900">+</button>
      </div>
    </div>
  );

  // ── Sağ taraftaki özet kartı ─────────────────────────────
  const Summary = () => (
    <aside className="h-fit space-y-4 lg:sticky lg:top-24">
      <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
        <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{D.summary}</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: "#E2574C" }}>A</span>
            <span><b>{origin}</b><span className="block text-xs text-stone-500">{D.pickupLoc}</span></span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: C.pine }}>B</span>
            <span><b>{n}</b><span className="block text-xs text-stone-500">{D.dropoffLoc}</span></span>
          </li>
          {date && (
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100">📅</span>
              <span><b>{date}</b> {time && <b>· {time}</b>}</span>
            </li>
          )}
        </ul>
        {/* Rota haritası */}
        <div className="mt-4 overflow-hidden rounded-xl border border-stone-200">
          <iframe
            title="Route map"
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent("Zurich Airport")}&daddr=${encodeURIComponent(n + ", Switzerland")}&hl=${lang}&output=embed`}
            className="h-52 w-full"
            loading="lazy"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-stone-100 pt-4 text-sm">
          <span><span className="block text-xs text-stone-500">{D.distance}</span><b>{route.km} km</b></span>
          <span><span className="block text-xs text-stone-500">{D.time}</span><b>{dur}</b></span>
        </div>
        {chosen && (
          <div className="mt-4 border-t border-stone-100 pt-4 text-sm">
            <span className="block text-xs text-stone-500">{D.vehicle}</span>
            <b>{localName(chosen.name, lang)}</b>
            <p className="text-xs text-stone-500">{chosen.car} · {chosen.pax} 👥 · {chosen.bags} 🧳</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chosen.img} alt={chosen.car} className="mx-auto mt-2 h-20 object-contain" />
          </div>
        )}
      </div>
      {chosen && (
        <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <b style={{ color: C.gold }}>{D.total}</b>
            <span className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>
              CHF {total.toFixed(2)}
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-500">{D.priceNote}</p>
        </div>
      )}
    </aside>
  );

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="strecken" />

      {/* Başlık şeridi */}
      <section style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <a href={P("/")} className="hover:text-white">{L.nav.home}</a><span>/</span>
            <a href={P("/strecken")} className="hover:text-white">{L.nav.routes}</a><span>/</span>
            <span className="text-white">{n}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-3xl font-semibold md:text-5xl">
            Flughafen Zürich (ZRH) → {n}
          </h1>
          <p className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
            <span>🛣 {route.km} km</span>
            <span>🕐 {dur}</span>
            <span className="rounded-full px-3 py-0.5 text-xs font-extrabold uppercase" style={{ background: C.gold, color: C.pine }}>
              {L.routesSec.from} CHF {route.price.toFixed(2)}
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[1.7fr_1fr] md:py-14">
        <div>
          {step === 1 ? (
            <>
              {/* Tarih & saat */}
              <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
                <div>
                  <label className={labelCls}>📅 {L.form.date}</label>
                  <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>🕐 {L.form.time}</label>
                  <input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>

              <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>
                {D.selectCar}
              </h2>
              <div className="space-y-4">
                {sorted.map((v, i) => (
                  <div key={i} className="grid gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:grid-cols-[200px_1fr_auto] sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt={v.car} className="mx-auto h-24 object-contain" />
                    <div>
                      <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>
                        {localName(v.name, lang)}
                      </h3>
                      <p className="text-sm text-stone-500">{v.car}</p>
                      <p className="mt-1 text-sm">👥 {v.pax} · 🧳 {v.bags}</p>
                      <ul className="mt-2 grid gap-x-4 gap-y-0.5 text-xs text-stone-500 sm:grid-cols-2">
                        {D.feats.map((ft, j) => <li key={j}>✓ {ft}</li>)}
                      </ul>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>
                        CHF {priceOf(v.mult).toFixed(2)}
                      </p>
                      <p className="mb-3 text-[11px] text-stone-500">{D.priceNote}</p>
                      <button
                        onClick={() => { setCar(i); setStep(2); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="w-full rounded-full px-6 py-2.5 text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                        style={{ background: C.pine }}
                      >
                        {D.select}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Uyarı */}
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
                <b>{D.noticeTitle}</b>
                <p className="mt-1 text-stone-600">{D.noticeText}</p>
              </div>

              {/* Ödeme yöntemi */}
              <h2 className="font-display mb-3 text-2xl font-semibold" style={{ color: C.pine }}>{D.payTitle}</h2>
              <div className="mb-8 grid grid-cols-3 gap-3">
                {D.payOptions.map(([title, desc], i) => (
                  <button
                    key={i}
                    onClick={() => setPay(i)}
                    className="rounded-2xl border-2 bg-white p-4 text-center text-xs font-bold uppercase tracking-wide transition-all"
                    style={pay === i ? { borderColor: C.gold, boxShadow: "0 4px 14px rgba(201,162,75,0.25)" } : { borderColor: "#e7e5e4" }}
                  >
                    <span className="mb-1 block text-xl">{["📱", "💵", "💳"][i]}</span>
                    {title}
                    <span className="mt-1 block text-[10px] font-medium normal-case text-stone-500">{desc}</span>
                  </button>
                ))}
              </div>

              {/* Yolcu bilgileri */}
              <h2 className="font-display mb-3 text-2xl font-semibold" style={{ color: C.pine }}>{D.paxTitle}</h2>
              <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder={`${D.name} *`} value={f.name} onChange={(e) => set("name", e.target.value)} />
                  <input className={inputCls} placeholder={`${D.surname} *`} value={f.surname} onChange={(e) => set("surname", e.target.value)} />
                  <input type="email" className={inputCls} placeholder={`${D.email} *`} value={f.email} onChange={(e) => set("email", e.target.value)} />
                  <input type="tel" className={inputCls} placeholder={`${D.phone} * (+41 …)`} value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>

                <div className="mt-4">
                  <Counter k="baby" title={D.baby[0]} desc={D.baby[1]} />
                  <Counter k="child" title={D.child[0]} desc={D.child[1]} />
                  <Counter k="ski" title={D.ski[0]} desc={D.ski[1]} />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input className={inputCls} placeholder={`${D.flight} *`} value={f.flight} onChange={(e) => set("flight", e.target.value)} />
                  <input className={inputCls} placeholder={D.nameboard} value={f.nameboard} onChange={(e) => set("nameboard", e.target.value)} />
                  <div>
                    <label className={labelCls}>👥 {L.form.pax}</label>
                    <select className={inputCls} value={f.pax} onChange={(e) => set("pax", e.target.value)}>
                      {Array.from({ length: chosen?.pax ?? 7 }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>🧳 {D.luggage}</label>
                    <select className={inputCls} value={f.luggage} onChange={(e) => set("luggage", e.target.value)}>
                      {Array.from({ length: chosen?.bags ?? 7 }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                </div>

                <textarea rows={4} className={`${inputCls} mt-4`} placeholder={D.notes} value={f.notes} onChange={(e) => set("notes", e.target.value)} />

                <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="h-4 w-4 accent-[#C9A24B]" />
                  {D.accept} *
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-full border px-6 py-3 text-sm font-bold"
                    style={{ borderColor: C.pine, color: C.pine }}
                  >
                    ← {D.back}
                  </button>
                  <a
                    href={ready ? `https://wa.me/${BOOKING_WHATSAPP_NUMBER}?text=${encodeURIComponent(message())}` : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!ready}
                    className={`flex-1 rounded-full px-6 py-3 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-all ${ready ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-40"}`}
                    style={{ background: ready ? "#25D366" : "#9ca3af" }}
                    onClick={(e) => { if (!ready) e.preventDefault(); }}
                  >
                    💬 {D.continueWa} — CHF {total.toFixed(2)}
                  </a>
                </div>
                {ready && (
                  <a href={mailHref(L.msg.subject, message())} className="mt-3 block text-center text-sm font-semibold text-stone-500 underline-offset-2 hover:underline">
                    {D.continueMail}
                  </a>
                )}
                <p className="mt-3 text-center text-xs text-stone-500">{D.confirmNote}</p>
              </div>
            </>
          )}
        </div>

        <Summary />
      </section>

      {/* ── SEO içerik bölümleri ─────────────────────────────── */}
      <RouteSeoContent slug={slug} />

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}

// ── Rota içerik bölümü: giriş, hızlı bilgiler, varış noktası, SSS, diğer rotalar ──
function RouteSeoContent({ slug }: { slug: string }) {
  const { lang, P } = useLang();
  const L = t[lang];
  const D = L.detail;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return null;
  const n = localName(route.to, lang);
  const content = routeContent[slug]?.[lang];
  const dur =
    lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`;

  const others = routes.filter((r) => r.slug !== slug).slice(0, 3);
  const facts: [string, string][] = [
    [D.distance, `${route.km} km`],
    [D.time, dur],
    [L.routesSec.from, `CHF ${route.price.toFixed(2)}`],
    [L.nav.fleet, lang === "de" ? "4 Fahrzeugklassen" : "4 vehicle classes"],
  ];

  return (
    <section className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        {/* Giriş metni */}
        {content && (
          <>
            <p className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.gold }}>
              <span className="h-px w-8" style={{ background: C.gold }} />
              {lang === "de" ? "Flughafentransfer" : "Airport transfer"}
            </p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl" style={{ color: C.pine }}>
              Flughafen Zürich (ZRH) → {n}
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-stone-700">
              {content.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </>
        )}

        {/* Hızlı bilgiler */}
        <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${content ? "mt-10" : ""}`}>
          {facts.map(([k, v], i) => (
            <div key={i} className="rounded-2xl bg-stone-50 p-4 text-center ring-1 ring-black/5">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">{k}</span>
              <b className="mt-1 block text-lg" style={{ color: C.pine }}>{v}</b>
            </div>
          ))}
        </div>

        {/* Varış noktası */}
        {content && (
          <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div className="relative min-h-[200px] overflow-hidden rounded-2xl shadow-md" style={{ backgroundColor: C.pine }}>
              <Image src={route.img} alt={content.aboutTitle} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>{content.aboutTitle}</h3>
              <p className="mt-3 leading-relaxed text-stone-700">{content.about}</p>
            </div>
          </div>
        )}

        {/* SSS akordeon */}
        {content && (
          <div className="mt-12">
            <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {lang === "de" ? "Häufige Fragen" : "Frequently asked questions"}
            </h3>
            <div className="mt-5 divide-y divide-stone-200 rounded-2xl bg-stone-50 px-5 ring-1 ring-black/5">
              {content.faq.map(([q, a], i) => (
                <details key={i} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold" style={{ color: C.pine }}>
                    {q}
                    <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.gold }}>＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Diğer rotalar */}
        <div className="mt-12">
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
              {lang === "de" ? "Weitere beliebte Strecken" : "Other popular routes"}
            </h3>
            <a href={P("/strecken")} className="text-[12px] font-extrabold uppercase tracking-[0.15em] hover:underline" style={{ color: C.gold }}>
              {L.routesSec.all} →
            </a>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {others.map((r) => <RouteCard key={r.slug} {...r} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
