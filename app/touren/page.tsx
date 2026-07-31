"use client";

import { C } from "../config";
import { t } from "../i18n";
import { useLang } from "../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, TourCard } from "../components";

export default function Touren() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="touren" />

      <PageHero title={L.toursSec.pageTitle} crumb={L.nav.tours}>
        <p className="mt-4 max-w-2xl text-white/70">{L.toursSec.pageSub}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {L.toursSec.list.map((tour, i) => (
            <TourCard key={i} {...tour} />
          ))}
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
