import type { Metadata } from "next";
import { blogPosts } from "../blogContent";
import BlogList from "./blog-client";

export const metadata: Metadata = {
  title: "Blog | AirportTransfers Zürich – Reisetipps & Transfer-Guides",
  description:
    "Reisetipps, Strecken-Guides und Wissenswertes rund um Flughafentransfers ab Zürich: Ski-Transfers, Tagesausflüge, Business Travel und mehr.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AirportTransfers Zürich Blog",
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.de.title,
      datePublished: p.date,
      url: `/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogList />
    </>
  );
}
