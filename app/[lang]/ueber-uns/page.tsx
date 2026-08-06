import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import UeberUns from "./ueber-uns-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "ueber-uns");
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
