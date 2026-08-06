import type { Metadata } from "next";
import { langAlternates, localizePath } from "../../paths";
import BlogList from "./blog-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Blog | AirportTransfers Zürich – Reisetipps & Transfer-Guides", description: "Reisetipps, Strecken-Guides und Wissenswertes rund um Flughafentransfers ab Zürich." },
  en: { title: "Blog | AirportTransfers Zurich – Travel Tips & Transfer Guides", description: "Travel tips, route guides and useful know-how around transfers from Zurich Airport." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/blog", lang as never) === "/" ? "" : localizePath("/blog", lang as never)}`,
      languages: langAlternates("/blog"),
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
      <BlogList />
    </>
  );
}
