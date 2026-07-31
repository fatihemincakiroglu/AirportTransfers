"use client";

import { C } from "../../config";
import { t } from "../../i18n";
import { useLang } from "../../providers";
import { TopBar, SiteHeader, SiteFooter, FloatingButtons } from "../../components";
import { blogPosts } from "../../blogContent";
import { readingTime, formatDate } from "../blog-client";

export default function PostClient({ slug }: { slug: string }) {
  const { lang } = useLang();
  const L = t[lang];
  const B = L.blogSec;

  const idx = blogPosts.findIndex((p) => p.slug === slug);
  const post = idx >= 0 ? blogPosts[idx] : null;

  if (!post) {
    return (
      <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
        <TopBar />
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <a href="/blog" className="font-bold underline" style={{ color: C.gold }}>{B.back} →</a>
        </div>
        <SiteFooter compact />
      </div>
    );
  }

  const c = post[lang];
  // İlgili yazılar: sıradaki 3 yazı (döngüsel)
  const related = [1, 2, 3].map((o) => blogPosts[(idx + o) % blogPosts.length]);

  return (
    <div className="min-h-screen" style={{ background: C.ivory, color: C.ink }}>
      <TopBar />
      <SiteHeader />

      {/* Başlık bölümü */}
      <section style={{ background: C.pine }} className="text-white">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-white">{L.nav.home}</a><span>/</span>
            <a href="/blog" className="hover:text-white">{B.title}</a>
          </nav>
          <span className="mt-3 block h-0.5 w-10" style={{ background: C.gold }} />
          <h1 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">{c.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <span style={{ color: C.gold }}>📅</span> {B.published} {formatDate(post.date, lang)}
            <span className="text-white/30">·</span>
            🕐 {readingTime(post, lang)} {B.minRead}
          </p>
        </div>
      </section>

      {/* Kapak görseli */}
      <div className="mx-auto -mt-0 max-w-3xl px-5">
        <div
          className="mt-8 h-56 rounded-2xl bg-cover bg-center shadow-lg md:h-80"
          style={{ backgroundColor: C.pine, backgroundImage: `url(${post.img})` }}
        />
      </div>

      {/* Makale gövdesi */}
      <article className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="text-lg font-medium leading-relaxed text-stone-700">{c.excerpt}</p>
        {c.body.map((block, i) => (
          <div key={i} className="mt-8">
            {block.h && (
              <h2 className="font-display text-2xl font-semibold" style={{ color: C.pine }}>
                {block.h}
              </h2>
            )}
            {block.p.map((para, j) => (
              <p key={j} className="mt-4 leading-relaxed text-stone-700">{para}</p>
            ))}
          </div>
        ))}

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl p-8 text-center text-white" style={{ background: C.pine }}>
          <p className="font-display text-2xl font-semibold">
            {lang === "de" ? "Bereit für Ihren Transfer?" : "Ready for your transfer?"}
          </p>
          <a
            href="/buchung"
            className="rounded-full px-8 py-3 text-sm font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ background: C.gold, color: C.pine }}
          >
            {L.nav.book} →
          </a>
        </div>
      </article>

      {/* İlgili yazılar */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold md:text-3xl" style={{ color: C.pine }}>{B.more}</h2>
            <a href="/blog" className="text-[12px] font-extrabold uppercase tracking-[0.15em] hover:underline" style={{ color: C.gold }}>
              {B.back} →
            </a>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((r) => {
              const rc = r[lang];
              return (
                <a
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-stone-50 ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-32 bg-cover bg-center" style={{ backgroundColor: C.pine, backgroundImage: `url(${r.img})` }} />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500">
                      {formatDate(r.date, lang)} · 🕐 {readingTime(r, lang)} {B.minRead}
                    </p>
                    <h3 className="font-display mt-1.5 flex-1 text-lg font-semibold leading-snug group-hover:underline" style={{ color: C.pine }}>
                      {rc.title}
                    </h3>
                    <span className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: C.gold }}>
                      {B.read} →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter compact />
      <FloatingButtons />
    </div>
  );
}
