import type { Metadata } from "next";
import { langAlternates } from "../../paths";
import { routes } from "../../config";
import { routeContent } from "../../routeContent";
import { notFound } from "next/navigation";
import RouteClient from "./route-client";
import DestinationClient from "./destination-client";
import { findDestination, allDestinationSlugs } from "../../destinations";
import { tx } from "../../i18nX";
import type { Lang } from "../../i18n";
import { LANGS, DEFAULT_LANG } from "../../paths";

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) {
    const dest = findDestination(slug);
    if (dest) {
      const safe: Lang = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : DEFAULT_LANG;
      const X = tx[safe];
      const n = dest.d.name;
      return {
        title: `${X.dest.hero(n)} | AirportTransfers Zürich`,
        description: X.dest.heroSub(n),
        alternates: {
          canonical: `/${lang}/${slug}`,
          languages: langAlternates(`/${slug}`),
        },
      };
    }
    return { title: "AirportTransfers Zürich" };
  }
  const n = nameOf(route.to, lang);
  const safe: Lang = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : DEFAULT_LANG;
  const X = tx[safe];
  return {
    title: `${X.dest.hero(n)} | ${X.dest.fixed} ${route.price.toFixed(2)} – ${route.km} km`,
    description: `${X.dest.routeKnown(n, route.price.toFixed(2))} ${X.dest.heroSub(n)}`,
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: langAlternates(`/${slug}`),
    },
    openGraph: {
      title: X.dest.hero(n),
      description: X.dest.chips.join(" · "),
    },
  };
}

export function generateStaticParams() {
  return [
    ...routes.map((r) => ({ slug: r.slug })),
    ...allDestinationSlugs().map((slug) => ({ slug })),
  ];
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const route = routes.find((r) => r.slug === slug);
  if (!route) {
    const dest = findDestination(slug);
    if (dest) {
      const dJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Airport transfer",
        name: `Zurich Airport (ZRH) → ${dest.d.name}`,
        areaServed: "Switzerland",
        provider: {
          "@type": "LocalBusiness",
          name: "AirportTransfers Zürich",
          telephone: "+41763020326",
          address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
        },
      };
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dJsonLd) }} />
          <DestinationClient slug={slug} />
        </>
      );
    }
    notFound(); // Gerçek 404 — soft-404 önlenir
  }
  const n = nameOf(route.to, lang);
  const content = routeContent[slug]?.[lang === "de" ? "de" : "en"];

  const jsonLd: object[] = [];
  {
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
        { "@type": "ListItem", position: 2, name: lang === "de" ? "Strecken" : "Routes", item: lang === "de" ? "/de/strecken" : "/en/routes" },
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
