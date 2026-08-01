import type { Metadata } from "next";
import { routes } from "../../config";
import Strecken from "./strecken-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Strecken & Festpreise ab Flughafen Zürich | AirportTransfers", description: "Alle Transferstrecken ab Flughafen Zürich (ZRH) mit garantierten Festpreisen: Zug, Luzern, Basel, Interlaken, St. Moritz und 20 weitere Ziele." },
  en: { title: "Routes & Fixed Prices from Zurich Airport | AirportTransfers", description: "All transfer routes from Zurich Airport (ZRH) at guaranteed fixed prices: Zug, Lucerne, Basel, Interlaken, St. Moritz and 20 more destinations." },
};

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: lang === "de" ? "/de/strecken" : "/en/routes", languages: { en: "/en/routes", de: "/de/strecken", "x-default": "/en/routes" } },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: lang === "de" ? "Flughafentransfer-Strecken ab Zürich" : "Airport transfer routes from Zurich",
      numberOfItems: routes.length,
      itemListElement: routes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          serviceType: "Airport transfer",
          name: `Zurich Airport (ZRH) → ${nameOf(r.to, lang)}`,
          url: `/${lang}/${r.slug}`,
          offers: { "@type": "Offer", price: r.price.toFixed(2), priceCurrency: "CHF" },
        },
      })),
    },
  ];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Strecken />
    </>
  );
}
