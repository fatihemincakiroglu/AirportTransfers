import type { Metadata } from "next";
import { routes } from "../config";
import Strecken from "./strecken-client";

export const metadata: Metadata = {
  title: "Strecken & Festpreise ab Flughafen Zürich | AirportTransfers",
  description:
    "Alle Transferstrecken ab Flughafen Zürich (ZRH) mit garantierten Festpreisen: Zug, Luzern, Basel, Interlaken, St. Moritz und 20 weitere Ziele in der ganzen Schweiz.",
  alternates: { canonical: "/strecken" },
};

const nameOf = (to: string | { de: string; en: string }) =>
  typeof to === "string" ? to : to.de;

export default function Page() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Flughafentransfer-Strecken ab Zürich",
      numberOfItems: routes.length,
      itemListElement: routes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          serviceType: "Airport transfer",
          name: `Flughafen Zürich → ${nameOf(r.to)}`,
          url: `/${r.slug}`,
          offers: { "@type": "Offer", price: r.price.toFixed(2), priceCurrency: "CHF" },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "/" },
        { "@type": "ListItem", position: 2, name: "Strecken", item: "/strecken" },
      ],
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
