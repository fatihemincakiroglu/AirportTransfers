"use client";

import { C, gallery } from "../config";
import { t } from "../i18n";
import { useLang } from "../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../components";

export default function Galerie() {
  const { lang } = useLang();
  const L = t[lang];

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="galerie" />

      <PageHero title={L.gallerySec.pageTitle} crumb={L.nav.gallery}>
        <p className="mt-4 max-w-2xl text-white/70">{L.gallerySec.pageSub}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl shadow-sm ${i % 7 === 0 ? "col-span-2 row-span-2" : ""}`}
              style={{
                minHeight: i % 7 === 0 ? 260 : 130,
                backgroundColor: C.pine,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-500">
          {lang === "de"
            ? "Eigene Fotos? Ersetzen Sie einfach die Dateien 1.jpg bis 20.jpg im Ordner public/gallery."
            : "Your own photos? Simply replace the files 1.jpg to 20.jpg inside the public/gallery folder."}
        </p>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
