import type { Metadata } from "next";
import Kontakt from "./kontakt-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Kontakt – 24/7 erreichbar | AirportTransfers Zürich", description: "Kontaktieren Sie uns per WhatsApp, Telefon +41 76 302 03 26 oder E-Mail. Rund um die Uhr erreichbar." },
  en: { title: "Contact – Available 24/7 | AirportTransfers Zurich", description: "Contact us via WhatsApp, phone +41 76 302 03 26 or email. Available around the clock." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}/kontakt`,
      languages: { en: "/en/kontakt", de: "/de/kontakt", "x-default": "/en/kontakt" },
    },
  };
}

export default function Page() {
  const jsonLd: object[] = [{ "@context": "https://schema.org", "@type": "ContactPage", name: "Kontakt – AirportTransfers Zürich", about: {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "AirportTransfers Zürich",
    telephone: "+41763020326",
    priceRange: "CHF 88 - CHF 1000",
    address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
    areaServed: { "@type": "Country", name: "Switzerland" },
    openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
  } }];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Kontakt />
    </>
  );
}
