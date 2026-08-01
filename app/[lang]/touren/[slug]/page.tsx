import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tours } from "../../../tourContent";
import TourClient from "./tour-client";

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  if (!tour) return { title: "AirportTransfers Zürich" };
  const c = lang === "de" ? tour.de : tour.en;
  return {
    title: `${c.title} | AirportTransfers Zürich`,
    description: c.tagline,
    alternates: {
      canonical: lang === "de" ? `/de/touren/${slug}` : `/en/tours/${slug}`,
      languages: {
        en: `/en/tours/${slug}`,
        de: `/de/touren/${slug}`,
        "x-default": `/en/tours/${slug}`,
      },
    },
    openGraph: { title: c.title, description: c.tagline },
  };
}

export function generateStaticParams() {
  return tours.map((x) => ({ slug: x.slug }));
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const tour = tours.find((x) => x.slug === slug);
  if (!tour) notFound(); // Gerçek 404
  const c = lang === "de" ? tour.de : tour.en;
  const base = lang === "de" ? `/de/touren/${slug}` : `/en/tours/${slug}`;

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: c.title,
      description: c.tagline,
      touristType: ["Couples", "Families", "Business travellers"],
      itinerary: {
        "@type": "ItemList",
        numberOfItems: c.itinerary.length,
        itemListElement: c.itinerary.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": "TouristAttraction", name: s.title, description: s.desc },
        })),
      },
      provider: {
        "@type": "TaxiService",
        name: "AirportTransfers Zürich",
        telephone: "+41763020326",
        address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
      },
      inLanguage: lang === "de" ? "de" : "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: lang === "de" ? "Startseite" : "Home", item: `/${lang}` },
        { "@type": "ListItem", position: 2, name: lang === "de" ? "Touren" : "Tours", item: lang === "de" ? "/de/touren" : "/en/tours" },
        { "@type": "ListItem", position: 3, name: c.title, item: base },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <TourClient slug={slug} />
    </>
  );
}
