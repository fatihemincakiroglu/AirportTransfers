"use client";

import { useEffect, useState } from "react";
import { C } from "./config";
import { useLang } from "./providers";
import { CONSENT_COOKIE } from "./consent-script";

/**
 * Çerez onayı (Consent Mode v2 için veri kaynağı)
 *
 * Sahiplik: onay VARSAYILANLARINI ve güncellemesini Google etiketlerine GTM'deki
 * consent şablonu uygular (spec §23.1). Bu dosya yalnızca:
 *  - kullanıcının seçimini 1. taraf çerezde saklar,
 *  - GTM'den ÖNCE dataLayer'a mevcut durumu (`cmp_state`) yazar,
 *  - seçim değişince `cmp_update` olayı basar.
 *
 * dataLayer `consent` nesnesi anahtarları: analytics_storage, ad_storage,
 * ad_user_data, ad_personalization, meta_marketing → "granted" | "denied".
 */

const COOKIE_DAYS = 180;

type Choice = { analytics: boolean; marketing: boolean };

const toSignals = (c: Choice) => {
  const g = (b: boolean) => (b ? "granted" : "denied");
  return {
    analytics_storage: g(c.analytics),
    ad_storage: g(c.marketing),
    ad_user_data: g(c.marketing),
    ad_personalization: g(c.marketing),
    meta_marketing: g(c.marketing),
  };
};

function readChoice(): Choice | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  if (!m) return null;
  try {
    const c = JSON.parse(decodeURIComponent(m[1]));
    return { analytics: !!c.analytics, marketing: !!c.marketing };
  } catch {
    return null;
  }
}

function saveChoice(c: Choice) {
  const value = encodeURIComponent(JSON.stringify({ v: 1, ...c, at: new Date().toISOString() }));
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${COOKIE_DAYS * 86400}; Path=/; SameSite=Lax; Secure`;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "cmp_update", consent_source: "banner", consent: toSignals(c) });
}

/** Footer'daki "Çerez ayarları" bağlantısı bu olayı yayınlar. */
export const OPEN_CONSENT_EVENT = "zrh:consent-open";
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));

const TEXT = {
  de: {
    title: "Cookies & Datenschutz",
    body: "Wir verwenden technisch notwendige Cookies. Mit Ihrer Zustimmung nutzen wir zusätzlich Statistik- (Google Analytics) und Marketing-Cookies (Google Ads, Meta), um unser Angebot zu verbessern.",
    all: "Alle akzeptieren",
    necessary: "Nur notwendige",
    customize: "Anpassen",
    save: "Auswahl speichern",
    necessaryLabel: "Notwendig (immer aktiv)",
    analytics: "Statistik",
    marketing: "Marketing",
    more: "Cookie-Richtlinie",
  },
  en: {
    title: "Cookies & privacy",
    body: "We use technically necessary cookies. With your consent we also use statistics (Google Analytics) and marketing cookies (Google Ads, Meta) to improve our service.",
    all: "Accept all",
    necessary: "Necessary only",
    customize: "Customize",
    save: "Save selection",
    necessaryLabel: "Necessary (always on)",
    analytics: "Statistics",
    marketing: "Marketing",
    more: "Cookie policy",
  },
} as const;

export function ConsentBanner() {
  const { lang, P } = useLang();
  const T = TEXT[lang];
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [choice, setChoice] = useState<Choice>({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = readChoice();
    /* eslint-disable react-hooks/set-state-in-effect -- çerez + pencere olayıyla senkron (harici sistem) */
    if (stored) setChoice(stored);
    else setOpen(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    const reopen = () => { setDetail(true); setOpen(true); };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (c: Choice) => {
    saveChoice(c);
    setChoice(c);
    setOpen(false);
    setDetail(false);
  };

  const primary = "rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={T.title}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-white p-5 text-stone-800 shadow-2xl ring-1 ring-black/10 md:inset-x-auto md:bottom-5 md:right-5"
    >
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ background: C.gold }} />
      <p className="font-display text-lg font-semibold" style={{ color: C.pine }}>{T.title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600">
        {T.body}{" "}
        <a href={P("/cookies")} className="font-semibold underline underline-offset-2" style={{ color: C.pine }}>{T.more}</a>
      </p>

      {detail && (
        <div className="mt-4 space-y-2 rounded-xl px-4 py-3 text-sm" style={{ background: "#FBF7EE" }}>
          <label className="flex items-center gap-3 text-stone-500">
            <input type="checkbox" checked disabled className="h-4 w-4" />
            {T.necessaryLabel}
          </label>
          <label className="flex items-center gap-3 font-semibold">
            <input type="checkbox" checked={choice.analytics} onChange={(e) => setChoice((c) => ({ ...c, analytics: e.target.checked }))} className="h-4 w-4 accent-[#0C2E25]" />
            {T.analytics}
          </label>
          <label className="flex items-center gap-3 font-semibold">
            <input type="checkbox" checked={choice.marketing} onChange={(e) => setChoice((c) => ({ ...c, marketing: e.target.checked }))} className="h-4 w-4 accent-[#0C2E25]" />
            {T.marketing}
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => decide({ analytics: true, marketing: true })} className={primary} style={{ background: C.gold, color: C.pine }}>
          {T.all}
        </button>
        <button type="button" onClick={() => decide({ analytics: false, marketing: false })} className={`${primary} border`} style={{ borderColor: C.pine, color: C.pine }}>
          {T.necessary}
        </button>
        {detail ? (
          <button type="button" onClick={() => decide(choice)} className="ml-auto text-xs font-bold underline-offset-2 hover:underline" style={{ color: C.pine }}>
            {T.save}
          </button>
        ) : (
          <button type="button" onClick={() => setDetail(true)} className="ml-auto text-xs font-bold text-stone-500 underline-offset-2 hover:underline">
            {T.customize}
          </button>
        )}
      </div>
    </div>
  );
}
