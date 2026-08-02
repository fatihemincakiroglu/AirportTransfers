"use client";

import { C } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";

export default function FaqClient() {
  const { lang, P } = useLang();
  const L = t[lang];
  const F = L.faqPage;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      <PageHero title={F.title} crumb="FAQ">
        <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">{F.sub}</p>
      </PageHero>

      <section className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="divide-y divide-stone-200 rounded-2xl bg-white px-5 shadow-md ring-1 ring-black/5 md:px-7">
          {F.list.map(([q, a], i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold" style={{ color: C.pine }}>
                {q}
                <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.gold }}>＋</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl p-8 text-center text-white" style={{ background: C.pine }}>
          <p className="font-display text-2xl font-semibold">
            {lang === "de" ? "Ihre Frage ist nicht dabei?" : "Question not answered?"}
          </p>
          <a
            href={P("/kontakt")}
            className="rounded-full px-8 py-3 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ background: C.gold, color: C.pine }}
          >
            {L.nav.contact} →
          </a>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
