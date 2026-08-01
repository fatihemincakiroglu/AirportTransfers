import type { Metadata } from "next";
import { routes } from "../../config";
import { routeContent } from "../../routeContent";
import RouteClient from "./route-client";

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) return { title: "AirportTransfers Zürich" };
  const n = nameOf(route.to, lang);
  const de = lang === "de";
  return {
    title: de
      ? `Flughafentransfer Zürich → ${n} | Festpreis ab CHF ${route.price.toFixed(2)}`
      : `Zurich Airport to ${n} Transfer | Fixed Price from CHF ${route.price.toFixed(2)}`,
    description: de
      ? `Privater Transfer vom Flughafen Zürich (ZRH) nach ${n}: ${route.km} km, Festpreis ab CHF ${route.price.toFixed(2)}, Meet & Greet, Flugverfolgung, 24/7.`
      : `Private transfer from Zurich Airport (ZRH) to ${n}: ${route.km} km, fixed price from CHF ${route.price.toFixed(2)}, meet & greet, flight tracking, 24/7.`,
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: { en: `/en/${slug}`, de: `/de/${slug}`, "x-default": `/en/${slug}` },
    },
    openGraph: {
      title: de ? `Flughafentransfer Zürich → ${n}` : `Zurich Airport → ${n} transfer`,
      description: de ? "Festpreis, Meet & Greet, 24/7." : "Fixed price, meet & greet, 24/7.",
    },
  };
}

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  const n = route ? nameOf(route.to, lang) : "";
  const content = routeContent[slug]?.[lang === "de" ? "de" : "en"];

  const jsonLd: object[] = [];
  if (route) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Airport transfer",
      name: `Zurich Airport (ZRH) → ${n}`,
      areaServed: "Switzerland",
      provider: {
        "@type": "LocalBusiness",
        name: "AirportTransfers Zürich",
        telephone: "+41763020326",
        address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
      },
      offers: { "@type": "Offer", price: route.price.toFixed(2), priceCurrency: "CHF" },
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `/${lang}` },
        { "@type": "ListItem", position: 2, name: lang === "de" ? "Strecken" : "Routes", item: `/${lang}/strecken` },
        { "@type": "ListItem", position: 3, name: `ZRH → ${n}`, item: `/${lang}/${slug}` },
      ],
    });
    if (content) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      });
    }
  }

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <RouteClient slug={slug} />
    </>
  );
}
