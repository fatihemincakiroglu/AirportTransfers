import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import UeberUns from "./ueber-uns-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: {
    title: "Über uns – Ihr Flughafentransfer-Partner in Zürich | AirportTransfers",
    description: "Schweizer Unternehmen mit Sitz in Kloten: professionelle Chauffeure, gepflegte Mercedes-Flotte, Festpreise und 24/7-Service für Transfers ab Flughafen Zürich.",
  },
  en: {
    title: "About Us – Your Airport Transfer Partner in Zurich | AirportTransfers",
    description: "Swiss company based in Kloten: professional chauffeurs, a well-kept Mercedes fleet, fixed prices and 24/7 service for transfers from Zurich Airport.",
  },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/ueber-uns", lang as never) === "/" ? "" : localizePath("/ueber-uns", lang as never)}`,
      languages: langAlternates("/ueber-uns"),
    },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: lang === "de" ? "Über uns – AirportTransfers Zürich" : "About Us – AirportTransfers Zurich",
    mainEntity: {
      "@type": "TaxiService",
      name: "AirportTransfers Zürich",
      legalName: "Kula-ZATK",
      telephone: "+41763020326",
      areaServed: { "@type": "Country", name: "Switzerland" },
      address: { "@type": "PostalAddress", streetAddress: "Industristrasse 14", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
      knowsLanguage: ["de", "en"],
      slogan: lang === "de" ? "Privater Flughafentransfer zum Festpreis" : "Private airport transfers at fixed prices",
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UeberUns />
    </>
  );
}
