import type { Metadata } from "next";
import { pageMeta } from "../pageMeta";
import { langAlternates, localizePath } from "../paths";
import Home from "./home-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "home");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/", lang as never) === "/" ? "" : localizePath("/", lang as never)}`,
      languages: langAlternates("/"),
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
