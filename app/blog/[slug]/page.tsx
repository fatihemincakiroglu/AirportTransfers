import type { Metadata } from "next";
import { blogPosts } from "../../blogContent";
import PostClient from "./post-client";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog | AirportTransfers Zürich" };
  return {
    title: `${post.de.title} | AirportTransfers Zürich Blog`,
    description: post.de.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.de.title,
      description: post.de.excerpt,
      publishedTime: post.date,
      images: [post.img],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  const jsonLd: object[] = [];
  if (post) {
    // Kelime sayısından okuma süresi (Almanca içerik üzerinden)
    const words = [post.de.title, post.de.excerpt, ...post.de.body.flatMap((b) => [b.h ?? "", ...b.p])]
      .join(" ").split(/\s+/).length;

    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.de.title,
      description: post.de.excerpt,
      image: post.img,
      datePublished: post.date,
      dateModified: post.date,
      wordCount: words,
      timeRequired: `PT${Math.max(2, Math.ceil(words / 180))}M`,
      inLanguage: "de",
      author: { "@type": "Organization", name: "AirportTransfers Zürich" },
      publisher: {
        "@type": "Organization",
        name: "AirportTransfers Zürich",
        logo: { "@type": "ImageObject", url: "/icon.png" },
      },
      mainEntityOfPage: `/blog/${slug}`,
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "/blog" },
        { "@type": "ListItem", position: 3, name: post.de.title, item: `/blog/${slug}` },
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
