"use client";

import { C } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";
import { faqGroups } from "../../faqContent";

export default function FaqClient() {
  const { lang, P } = useLang();
  const L = t[lang];
  const F = L.faqPage;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      <PageHero title={F.title} crumb="FAQ" />

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        {/* Mevcut 8 soru (değişmez) + konu grupları — masaüstünde 2 sütun, mobilde 1 */}
        {(() => {
          const groups = [
            { title: lang === "de" ? "Die wichtigsten Fragen" : "The essentials", list: F.list },
            ...faqGroups[lang],
          ];
          return (
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {groups.map((g, gi) => (
                <div key={gi} className="rounded-2xl bg-white shadow-md ring-1 ring-black/5">
                  <h2 className="border-b border-stone-100 px-5 py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] md:px-7" style={{ color: C.gold }}>
                    {g.title}
                  </h2>
                  <div className="divide-y divide-stone-100 px-5 md:px-7">
                    {g.list.map(([q, a], i) => (
                      <details key={i} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold md:text-[15px]" style={{ color: C.pine }}>
                          {q}
                          <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.gold }}>＋</span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-stone-600">{a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

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
