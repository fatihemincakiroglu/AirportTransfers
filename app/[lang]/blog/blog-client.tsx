"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { C } from "../../config";
import { t, pickL } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero, norm } from "../../components";
import { blogCats, metaOf, type BlogCat } from "../../blogTaxonomy";
import { blogPosts, BlogPost } from "../../blogContent";
import type { Lang } from "../../i18n";

// Okuma süresi: kelime sayısı / 180
export function readingTime(post: BlogPost, lang: Lang) {
  const c = pickL(post, lang);
  const words = [c.title, c.excerpt, ...c.body.flatMap((b) => [b.h ?? "", b.h3 ?? "", ...b.p, ...(b.ul ?? []), ...(b.table?.rows.flat() ?? [])])]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 180));
}

export function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang === "de" ? "de-CH" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CAT_PARAM = "kategorie";

export default function BlogList() {
  const { lang, P } = useLang();
  const L = t[lang];
  const B = L.blogSec;
  const de = lang === "de";
  const [cat, setCat] = useState<BlogCat | "all">("all");
  const [q, setQ] = useState("");

  // ?kategorie=winter → filtre açık gelir (yazı sayfasındaki kategori bağlantısı bunu kullanır)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(CAT_PARAM);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL'den tek seferlik başlangıç durumu
    if (v && blogCats.some((c) => c.key === v)) setCat(v as BlogCat);
  }, []);

  const pickCat = (k: BlogCat | "all") => {
    setCat(k);
    const url = new URL(window.location.href);
    if (k === "all") url.searchParams.delete(CAT_PARAM);
    else url.searchParams.set(CAT_PARAM, k);
    window.history.replaceState(null, "", url.toString());
  };

  // Arama metni: başlık + özet + ara başlıklar (aksan duyarsız)
  const haystack = useMemo(
    () => new Map(blogPosts.map((p) => {
      const c = pickL(p, lang);
      return [p.slug, norm([c.title, c.excerpt, ...c.body.map((b) => `${b.h ?? ""} ${b.h3 ?? ""}`)].join(" "))];
    })),
    [lang],
  );
  const terms = norm(q.trim()).split(/\s+/).filter(Boolean);
  const byCat = (k: BlogCat | "all") => blogPosts.filter((p) => k === "all" || metaOf(p.slug).cats.includes(k));
  const list = byCat(cat).filter((p) => terms.every((w) => haystack.get(p.slug)?.includes(w)));
  const catLabel = (k: BlogCat) => pickL(blogCats.find((c) => c.key === k)!.label, lang);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader active="blog" />

      <PageHero title={B.title} crumb={B.title} />

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        {/* Kategori sekmeleri + arama */}
        <div className="flex flex-col gap-5 border-b border-stone-200/80 lg:flex-row lg:items-end lg:justify-between">
          <div className="-mb-px flex gap-x-7 gap-y-2 overflow-x-auto lg:flex-wrap" role="tablist" aria-label={de ? "Kategorien" : "Categories"}>
            {([{ key: "all" as const, label: { de: "Alle", en: "All" } }, ...blogCats]).map((c) => {
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pickCat(c.key)}
                  className="whitespace-nowrap pb-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors"
                  style={{ color: active ? C.pine : "#78716c", borderBottom: active ? `2px solid ${C.gold}` : "2px solid transparent" }}
                >
                  {pickL(c.label, lang)} <span className="font-semibold text-stone-400">{byCat(c.key).length}</span>
                </button>
              );
            })}
          </div>
          <label className="relative mb-3 block w-full lg:w-72">
            <span className="sr-only">{de ? "Artikel durchsuchen" : "Search articles"}</span>
            <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-stone-400">🔍</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={de ? "z. B. Zermatt, Gepäck, Nacht …" : "e.g. Zermatt, luggage, night …"}
              className="h-11 w-full rounded-xl border border-stone-200 bg-white pl-10 pr-3.5 text-sm font-semibold text-stone-800 outline-none transition-all placeholder:font-normal placeholder:text-stone-400 focus:border-[#C9A24B] focus:ring-4 focus:ring-[#C9A24B]/15"
            />
          </label>
        </div>

        {list.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-stone-600">{de ? "Keine Artikel gefunden." : "No articles found."}</p>
            <button type="button" onClick={() => { setQ(""); pickCat("all"); }} className="mt-3 text-sm font-bold underline" style={{ color: C.pine }}>
              {de ? "Filter zurücksetzen" : "Reset filters"}
            </button>
          </div>
        )}

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((post) => {
            const c = pickL(post, lang);
            const pc = metaOf(post.slug).cats[0];
            return (
              <a
                key={post.slug}
                href={P(`/blog/${post.slug}`)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden" style={{ backgroundColor: C.pine }}>
                  <Image
                    src={post.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.15em]">
                    <span className="whitespace-nowrap" style={{ color: C.goldText }}>{catLabel(pc)}</span>
                    <span className="text-stone-300">·</span>
                    <span className="whitespace-nowrap text-stone-500">{formatDate(post.date, lang)}</span>
                    <span className="text-stone-300">·</span>
                    <span className="whitespace-nowrap text-stone-500">🕐 {readingTime(post, lang)} {B.minRead}</span>
                  </p>
                  <h2 className="mt-2 text-[17px] font-extrabold leading-snug tracking-tight transition-colors group-hover:underline" style={{ color: C.pine }}>
                    {c.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{c.excerpt}</p>
                  <span className="mt-4 text-[12px] font-extrabold uppercase tracking-[0.15em]" style={{ color: C.gold }}>
                    {B.read} →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
