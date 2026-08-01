import type { Metadata } from "next";
import Home from "./home-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "AirportTransfers Zürich | Flughafentransfer ZRH · VIP Mercedes zum Festpreis", description: "Privater Flughafentransfer Zürich zum Festpreis: Mercedes-Flotte, Meet & Greet, Flugverfolgung, 24/7." },
  en: { title: "AirportTransfers Zurich | ZRH Airport Transfer · VIP Mercedes at Fixed Prices", description: "Private Zurich Airport transfers at fixed prices: Mercedes fleet, meet & greet, flight tracking, 24/7." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", de: "/de", "x-default": "/en" },
    },
  };
}

export default function Page() {
  const jsonLd: object[] = [{
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "AirportTransfers Zürich",
    telephone: "+41763020326",
    priceRange: "CHF 88 - CHF 1000",
    address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
    areaServed: { "@type": "Country", name: "Switzerland" },
    openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
  }];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Home />
    </>
  );
}
