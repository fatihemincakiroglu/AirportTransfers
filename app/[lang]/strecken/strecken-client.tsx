"use client";

import { C, routes } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, BookingBar, RouteCard } from "../../components";

export default function Strecken() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="strecken" />

      <PageHero title={L.routesSec.pageTitle} crumb={L.nav.routes}>
        <p className="mt-4 max-w-2xl text-white/70">{L.routesSec.pageSub}</p>
        <BookingBar />
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r, i) => (
            <RouteCard key={i} {...r} />
          ))}
        </div>
        <p className="mt-8 text-sm font-semibold text-stone-500">{L.routesSec.allNote}</p>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
