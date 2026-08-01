"use client";

import { C } from "../config";
import { useLang } from "../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons } from "../components";

export default function NotFound() {
  const { lang, P } = useLang();
  const de = lang === "de";

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:py-32">
        <p className="font-display text-8xl font-semibold" style={{ color: C.pine }}>
          404
        </p>
        <span className="mt-4 block h-0.5 w-12" style={{ background: C.gold }} />
        <h1 className="font-display mt-5 text-3xl font-semibold" style={{ color: C.pine }}>
          {de ? "Seite nicht gefunden" : "Page not found"}
        </h1>
        <p className="mt-3 max-w-md text-stone-600">
          {de
            ? "Diese Seite existiert nicht oder wurde verschoben. Vielleicht bringt Sie eine dieser Routen ans Ziel:"
            : "This page doesn't exist or has been moved. Maybe one of these will get you where you're going:"}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={P("/")}
            className="rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.pine }}
          >
            {de ? "Startseite" : "Home"}
          </a>
          <a
            href={P("/strecken")}
            className="rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ background: C.gold, color: C.pine }}
          >
            {de ? "Alle Strecken" : "All routes"}
          </a>
          <a
            href={P("/buchung")}
            className="rounded-full border px-7 py-3 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ borderColor: C.pine, color: C.pine }}
          >
            {de ? "Jetzt buchen" : "Book now"}
          </a>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
