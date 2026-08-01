"use client";

import { useState } from "react";
import { C, routes, fleet, BOOKING_WHATSAPP_NUMBER } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons,
  mailHref, localName, inputCls, labelCls,
} from "../../components";

export default function Buchung() {
  const { lang, P } = useLang();
  const L = t[lang];
  const B = L.booking;
  const D = L.detail;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [routeIdx, setRouteIdx] = useState<number | null>(null);
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

  const route = routeIdx !== null ? routes[routeIdx] : null;
  const n = route ? localName(route.to, lang) : "";
  const origin = L.routesSec.origin;
  const dur = route
    ? lang === "de"
      ? route.min < 60 ? `${route.min} Min.` : `${Math.floor(route.min / 60)} Std.${route.min % 60 ? ` ${route.min % 60} Min.` : ""}`
      : route.min < 60 ? `${route.min} mins` : `${Math.floor(route.min / 60)} h${route.min % 60 ? ` ${route.min % 60} mins` : ""}`
    : "";

  const sorted = [...fleet].sort((a, b) => a.mult - b.mult);
  const chosen = car !== null ? sorted[car] : null;
  const total = route && chosen ? route.price * chosen.mult : 0;

  const step1Ready = route !== null && date && time;
  const ready = accepted && f.name && f.surname && f.email && f.phone && f.flight;

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

  const go = (s: 1 | 2 | 3) => { setStep(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

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

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      {/* Başlık + adım göstergesi */}
      <section style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-8">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <a href={P("/")} className="hover:text-white">{L.nav.home}</a><span>/</span>
            <span className="text-white">{B.title}</span>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-4xl font-semibold md:text-5xl">{B.title}</h1>

          {/* Stepper */}
          <ol className="mt-6 flex flex-wrap gap-2">
            {B.steps.map((s, i) => {
              const num = (i + 1) as 1 | 2 | 3;
              const active = step === num;
              const done = step > num;
              return (
                <li key={i}>
                  <button
                    onClick={() => { if (done) go(num); }}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors"
                    style={
                      active
                        ? { background: C.gold, color: C.pine }
                        : done
                          ? { background: "rgba(255,255,255,0.15)", color: "#fff", cursor: "pointer" }
                          : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }
                    }
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border text-[10px]"
                      style={active ? { borderColor: C.pine } : { borderColor: "currentColor" }}>
                      {done ? "✓" : num}
                    </span>
                    {s}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[1.7fr_1fr] md:py-14">
        <div>
          {/* ── ADIM 1: Rota + tarih & saat ────────────────── */}
          {step === 1 && (
            <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 md:p-6">
              <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>{B.steps[0]}</h2>
              <div>
                <label className={labelCls}>📍 {B.route}</label>
                <select
                  className={inputCls}
                  value={routeIdx ?? ""}
                  onChange={(e) => setRouteIdx(e.target.value === "" ? null : Number(e.target.value))}
                >
                  <option value="">{B.choose}</option>
                  {routes.map((r, i) => (
                    <option key={r.slug} value={i}>
                      ZRH → {localName(r.to, lang)} · {L.routesSec.from} CHF {r.price.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>📅 {L.form.date}</label>
                  <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>🕐 {L.form.time}</label>
                  <input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
              </div>
              <button
                onClick={() => step1Ready && go(2)}
                disabled={!step1Ready}
                className={`mt-6 w-full rounded-full px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition-all ${step1Ready ? "hover:-translate-y-0.5" : "cursor-not-allowed opacity-40"}`}
                style={{ background: step1Ready ? C.pine : "#9ca3af" }}
              >
                {B.next} →
              </button>
            </div>
          )}

          {/* ── ADIM 2: Araç seçimi ─────────────────────────── */}
          {step === 2 && route && (
            <>
              <h2 className="font-display mb-4 text-2xl font-semibold" style={{ color: C.pine }}>{D.selectCar}</h2>
              <div className="space-y-4">
                {sorted.map((v, i) => (
                  <div key={i} className="grid gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:grid-cols-[200px_1fr_auto] sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.img} alt={v.car} className="mx-auto h-24 object-contain" />
                    <div>
                      <h3 className="font-display text-lg font-semibold" style={{ color: C.pine }}>{localName(v.name, lang)}</h3>
                      <p className="text-sm text-stone-500">{v.car}</p>
                      <p className="mt-1 text-sm">👥 {v.pax} · 🧳 {v.bags}</p>
                      <ul className="mt-2 grid gap-x-4 gap-y-0.5 text-xs text-stone-500 sm:grid-cols-2">
                        {D.feats.map((ft, j) => <li key={j}>✓ {ft}</li>)}
                      </ul>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="font-mono text-2xl font-extrabold" style={{ color: C.pine }}>
                        CHF {(route.price * v.mult).toFixed(2)}
                      </p>
                      <p className="mb-3 text-[11px] text-stone-500">{D.priceNote}</p>
                      <button
                        onClick={() => { setCar(i); go(3); }}
                        className="w-full rounded-full px-6 py-2.5 text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                        style={{ background: C.pine }}
                      >
                        {D.select}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => go(1)} className="mt-5 rounded-full border px-6 py-2.5 text-sm font-bold" style={{ borderColor: C.pine, color: C.pine }}>
                ← {D.back}
              </button>
            </>
          )}

          {/* ── ADIM 3: Ödeme + iletişim ────────────────────── */}
          {step === 3 && route && chosen && (
            <>
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
                <b>{D.noticeTitle}</b>
                <p className="mt-1 text-stone-600">{D.noticeText}</p>
              </div>

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
                      {Array.from({ length: chosen.pax }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>🧳 {D.luggage}</label>
                    <select className={inputCls} value={f.luggage} onChange={(e) => set("luggage", e.target.value)}>
                      {Array.from({ length: chosen.bags }, (_, i) => i + 1).map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                </div>

                <textarea rows={4} className={`${inputCls} mt-4`} placeholder={D.notes} value={f.notes} onChange={(e) => set("notes", e.target.value)} />

                <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
                  <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="h-4 w-4 accent-[#C9A24B]" />
                  {D.accept} *
                </label>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => go(2)} className="rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: C.pine, color: C.pine }}>
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

        {/* ── Sağ: canlı özet ───────────────────────────────── */}
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
                <span>
                  <b>{route ? n : "—"}</b>
                  <span className="block text-xs text-stone-500">{D.dropoffLoc}</span>
                </span>
              </li>
              {(date || time) && (
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100">📅</span>
                  <span><b>{date}</b> {time && <b>· {time}</b>}</span>
                </li>
              )}
            </ul>

            {route && (
              <>
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
              </>
            )}

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

          {route && chosen && (
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
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
