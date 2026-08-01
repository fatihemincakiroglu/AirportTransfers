"use client";

import { C } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons, PageHero } from "../../components";
import { blogPosts, BlogPost } from "../../blogContent";
import type { Lang } from "../../i18n";

// Okuma süresi: kelime sayısı / 180
export function readingTime(post: BlogPost, lang: Lang) {
  const c = post[lang];
  const words = [c.title, c.excerpt, ...c.body.flatMap((b) => [b.h ?? "", ...b.p])]
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

export default function BlogList() {
  const { lang, P } = useLang();
  const L = t[lang];
  const B = L.blogSec;

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      <PageHero title={B.title} crumb={B.title}>
        <p className="mt-4 max-w-2xl text-white/70">{B.pageSub}</p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const c = post[lang];
            return (
              <a
                key={post.slug}
                href={P(`/blog/${post.slug}`)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="h-44 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundColor: C.pine, backgroundImage: `url(${post.img})` }}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.gold }}>
                    {formatDate(post.date, lang)}
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500">🕐 {readingTime(post, lang)} {B.minRead}</span>
                  </p>
                  <h2 className="font-display mt-2 text-xl font-semibold leading-snug transition-colors group-hover:underline" style={{ color: C.pine }}>
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
