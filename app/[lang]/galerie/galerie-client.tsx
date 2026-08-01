"use client";

import { useCallback, useEffect, useState } from "react";
import { C, gallery } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";

export default function Galerie() {
  const { lang } = useLang();
  const L = t[lang];

  // Lightbox durumu: null = kapalı, sayı = açık görselin sırası
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    []
  );
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % gallery.length)),
    []
  );

  // Klavye: Esc kapat, ok tuşları gezin + açıkken sayfa kaymasını kilitle
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

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
            <button
              key={i}
              onClick={() => setOpen(i)}
              aria-label={`Bild ${i + 1}`}
              className={`group relative overflow-hidden rounded-2xl shadow-sm outline-none transition-all duration-300 hover:z-10 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#C9A24B] ${
                i % 7 === 0 ? "col-span-2 row-span-2" : ""
              }`}
              style={{ minHeight: i % 7 === 0 ? 260 : 130 }}
            >
              {/* Görsel katmanı — hover'da yavaşça yakınlaşır */}
              <span
                aria-hidden
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundColor: C.pine, backgroundImage: `url(${src})` }}
              />
              {/* Karartma + altın çerçeve */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-xl border opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{ borderColor: "rgba(201,162,75,0.7)" }}
              />
              {/* Büyüteç rozeti */}
              <span
                aria-hidden
                className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full text-lg opacity-0 shadow-lg backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ background: "rgba(201,162,75,0.95)", color: C.pine }}
              >
                🔍
              </span>
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-500">
          {lang === "de"
            ? "Eigene Fotos? Ersetzen Sie einfach die Dateien 1.jpg bis 20.jpg im Ordner public/gallery."
            : "Your own photos? Simply replace the files 1.jpg to 20.jpg inside the public/gallery folder."}
        </p>
      </section>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* Kapat (sağ üst) */}
          <button
            onClick={close}
            aria-label="Schliessen"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
          >
            ✕
          </button>

          {/* Önceki */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Vorheriges Bild"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-colors hover:bg-white hover:text-black md:left-8"
          >
            ‹
          </button>

          {/* Görsel */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gallery[open]}
            alt={`Galerie ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />

          {/* Sonraki */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Nächstes Bild"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-colors hover:bg-white hover:text-black md:right-8"
          >
            ›
          </button>

          {/* Sayaç */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            {open + 1} / {gallery.length}
          </span>
        </div>
      )}

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
