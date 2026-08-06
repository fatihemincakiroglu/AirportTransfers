import type { Metadata } from "next";
import { pickL } from "../../../i18n";
import { langAlternates } from "../../../paths";
import { blogPosts } from "../../../blogContent";
import { notFound } from "next/navigation";
import PostClient from "./post-client";

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog | AirportTransfers Zürich" };
  const c = pickL(post, lang as never);
  return {
    title: `${c.title} | AirportTransfers Zürich Blog`,
    description: c.excerpt,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: langAlternates(`/blog/${slug}`),
    },
    openGraph: { type: "article", title: c.title, description: c.excerpt, publishedTime: post.date, images: [post.img] },
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound(); // Gerçek 404 — soft-404 önlenir

  const jsonLd: object[] = [];
  {
    const c = pickL(post, lang as never);
    const words = [c.title, c.excerpt, ...c.body.flatMap((b) => [b.h ?? "", ...b.p])].join(" ").split(/\s+/).length;
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: c.title,
      description: c.excerpt,
      image: post.img,
      datePublished: post.date,
      dateModified: post.date,
      wordCount: words,
      timeRequired: `PT${Math.max(2, Math.ceil(words / 180))}M`,
      inLanguage: lang === "de" ? "de" : "en",
      author: { "@type": "Organization", name: "AirportTransfers Zürich" },
      publisher: { "@type": "Organization", name: "AirportTransfers Zürich", logo: { "@type": "ImageObject", url: "/icon.png" } },
      mainEntityOfPage: `/${lang}/blog/${slug}`,
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `/${lang}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `/${lang}/blog` },
        { "@type": "ListItem", position: 3, name: c.title, item: `/${lang}/blog/${slug}` },
      ],
    });
  }

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <PostClient slug={slug} />
    </>
  );
}
