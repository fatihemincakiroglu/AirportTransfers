import type { Metadata } from "next";
import { tours } from "../../tourContent";
import Touren from "./touren-client";

type Params = { params: Promise<{ lang: string }> };

const META = {
  de: { title: "Private Touren & Tagesausflüge ab Zürich | AirportTransfers", description: "Private Tagesausflüge mit Chauffeur ab Zürich: Rheinfall, Luzern, Titlis, Interlaken & Grindelwald, Bern & Emmental. Abholung an Ihrer Adresse." },
  en: { title: "Private Tours & Day Trips from Zurich | AirportTransfers", description: "Private chauffeured day trips from Zurich: Rhine Falls, Lucerne, Titlis, Interlaken & Grindelwald, Bern & Emmental. Pickup at your address." },
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = lang === "de" ? META.de : META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: lang === "de" ? "/de/touren" : "/en/tours", languages: { en: "/en/tours", de: "/de/touren", "x-default": "/en/tours" } },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const de = lang === "de";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: de ? "Private Touren ab Zürich" : "Private tours from Zurich",
    numberOfItems: tours.length,
    itemListElement: tours.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: (de ? x.de : x.en).title,
        description: (de ? x.de : x.en).tagline,
        url: de ? `/de/touren/${x.slug}` : `/en/tours/${x.slug}`,
      },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Touren />
    </>
  );
}
