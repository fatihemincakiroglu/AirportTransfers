import type { Metadata } from "next";
import Touren from "./touren-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Private Touren & Tagesausflüge ab Zürich | AirportTransfers", description: "Private Tagesausflüge mit Chauffeur ab Zürich: Rheinfall, Luzern, Titlis, Interlaken & Grindelwald, Bern." },
  en: { title: "Private Tours & Day Trips from Zurich | AirportTransfers", description: "Private chauffeured day trips from Zurich: Rhine Falls, Lucerne, Titlis, Interlaken & Grindelwald, Bern." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}/touren`,
      languages: { en: "/en/touren", de: "/de/touren", "x-default": "/en/touren" },
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
      <Touren />
    </>
  );
}
