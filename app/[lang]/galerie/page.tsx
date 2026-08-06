import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import Galerie from "./galerie-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Galerie | AirportTransfers Zürich", description: "Eindrücke aus der Schweiz und von unseren Fahrten." },
  en: { title: "Gallery | AirportTransfers Zurich", description: "Impressions from Switzerland and our journeys." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/galerie", lang as never) === "/" ? "" : localizePath("/galerie", lang as never)}`,
      languages: langAlternates("/galerie"),
    },
  };
}

export default function Page() {
  const jsonLd: object[] = [];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Galerie />
    </>
  );
}
