"use client";

import { useState } from "react";
import { C, WHATSAPP_NUMBER, PHONE_DISPLAY, CONTACT_EMAIL, COMPANY_ADDRESS } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import {
  TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, BookingBar,
  waHref, mailHref,
} from "../../components";

export default function Kontakt() {
  const { lang } = useLang();
  const L = t[lang];
  const K = L.kontakt;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Mesajı panele kaydeder (WhatsApp/e-posta akışını etkilemez)
  const saveContact = () => {
    try {
      const body = JSON.stringify({ lang, ...form });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/contact", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
      }
    } catch {
      /* sessizce geç */
    }
  };
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const contactMessage = () =>
    `${L.msg.contactTitle}\n\n${L.msg.name}: ${form.name}\n${L.msg.email}: ${form.email}\n${L.msg.phone}: ${form.phone}\n${L.msg.message}: ${form.message}`;

  const inputCls =
    "w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-3 text-[15px] outline-none transition-colors focus:border-[#C9A24B] focus:bg-white focus:ring-2 focus:ring-[#C9A24B]/30";

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="kontakt" />

      <PageHero title={K.title} crumb={L.nav.contact}>
        <BookingBar />
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-[1.6fr_1fr] md:py-20">
        {/* Message form */}
        <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-8">
          <h2 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>{K.formTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">{K.name}</label>
              <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-stone-700">{K.email}</label>
              <input type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">{K.phone}</label>
            <input type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-semibold text-stone-700">{K.message}</label>
            <textarea rows={6} className={inputCls} value={form.message} onChange={(e) => set("message", e.target.value)} />
          </div>
          <a
            href={waHref(contactMessage())}
            onClick={() => saveContact()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full px-6 py-3.5 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {K.send}
          </a>
          <a href={mailHref(L.msg.subject, contactMessage())} onClick={() => saveContact()} className="mt-3 block text-center text-sm font-semibold text-stone-500 underline-offset-2 hover:underline">
            {K.orMail}
          </a>
        </div>

        {/* Info card */}
        <div className="h-fit rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 md:p-8">
          <h2 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>{K.infoTitle}</h2>
          <ul className="mt-6 divide-y divide-stone-100">
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>📞</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{K.lblPhone}</span>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="font-bold hover:underline" style={{ color: C.pine }}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>✉️</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{K.lblEmail}</span>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold hover:underline" style={{ color: C.pine }}>{CONTACT_EMAIL}</a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">💬</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{K.lblWa}</span>
                <a href={waHref()} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: C.pine }}>{PHONE_DISPLAY}</a>
              </span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: "rgba(201,162,75,0.12)", color: C.gold }}>📍</span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{K.lblAddress}</span>
                <span className="text-sm font-bold" style={{ color: C.pine }}>{COMPANY_ADDRESS}</span>
              </span>
            </li>
            <li className="py-4">
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">{K.lblHours}</span>
              <span className="font-bold" style={{ color: C.pine }}>{K.always}</span>
            </li>
          </ul>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
