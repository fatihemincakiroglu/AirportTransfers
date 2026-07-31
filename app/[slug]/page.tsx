import type { Metadata } from "next";
import { routes } from "../config";
import { routeContent } from "../routeContent";
import RouteClient from "./route-client";

// Varış adını sunucu tarafında (Almanca öncelikli) çöz
const nameOf = (to: string | { de: string; en: string }) =>
  typeof to === "string" ? to : to.de;

type Params = { params: Promise<{ slug: string }> };

// ── Sayfa başına SEO meta (title, description, canonical) ─────
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return { title: "AirportTransfers Zürich" };
  const n = nameOf(route.to);
  return {
    title: `Flughafentransfer Zürich → ${n} | Festpreis ab CHF ${route.price.toFixed(2)}`,
    description: `Privater Transfer vom Flughafen Zürich (ZRH) nach ${n}: ${route.km} km, Festpreis ab CHF ${route.price.toFixed(2)}, Meet & Greet, Flugverfolgung, 24/7. Jetzt buchen – Zurich Airport to ${n} transfer at a fixed price.`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `Flughafentransfer Zürich → ${n} ab CHF ${route.price.toFixed(2)}`,
      description: `Privater Chauffeurservice ZRH → ${n}. Festpreis, Meet & Greet, 24/7.`,
    },
  };
}

// Mevcut 25 rotayı derleme sırasında statik oluştur (hız + SEO)
export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  const n = route ? nameOf(route.to) : "";
  const content = routeContent[slug]?.de;

  // ── JSON-LD yapılandırılmış veri ─────────────────────────
  const jsonLd: object[] = [];
  if (route) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Airport transfer",
      name: `Flughafentransfer Zürich → ${n}`,
      areaServed: "Switzerland",
      provider: {
        "@type": "LocalBusiness",
        name: "AirportTransfers Zürich",
        telephone: "+41763020326",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Industristrasse 14",
          postalCode: "8302",
          addressLocality: "Kloten",
          addressCountry: "CH",
        },
      },
      offers: {
        "@type": "Offer",
        price: route.price.toFixed(2),
        priceCurrency: "CHF",
      },
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "/" },
        { "@type": "ListItem", position: 2, name: "Strecken", item: "/strecken" },
        { "@type": "ListItem", position: 3, name: `ZRH → ${n}`, item: `/${slug}` },
      ],
    });
    if (content) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      });
    }
  }

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
      <RouteClient slug={slug} />
    </>
  );
}
