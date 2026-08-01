"use client";

import { C, fleet } from "../config";
import { t } from "../i18n";
import { useLang } from "../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, FleetCard } from "../components";

export default function Fahrzeuge() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="fahrzeuge" />

      <PageHero title={L.fleetSec.pageTitle} crumb={L.nav.fleet}>
        <p className="mt-4 max-w-2xl text-white/70">{L.fleetSec.pageSub}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((v, i) => (
            <FleetCard key={i} {...v} showFeatures />
          ))}
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
