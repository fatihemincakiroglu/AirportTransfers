import type { Metadata } from "next";
import { hotels, hotelRegions } from "../../hotels";
import { routes, transferPrice } from "../../config";
import { langAlternates, localizePath } from "../../paths";
import HotelsClient, { type HotelCard } from "./hotels-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "de" ? "de" : "en";
  const title = l === "de"
    ? "Hoteltransfer ab Flughafen Zürich – Luxushotels der Schweiz | Zürich Airport Taxi"
    : "Hotel Transfers from Zurich Airport – Swiss Luxury Hotels | Zürich Airport Taxi";
  const description = l === "de"
    ? "Privater Transfer vom Flughafen Zürich zu den besten Hotels der Schweiz: Baur au Lac, Dolder Grand, Bürgenstock, Badrutt's Palace, Gstaad Palace und mehr. Festpreis pro Fahrzeug."
    : "Private transfers from Zurich Airport to Switzerland's finest hotels: Baur au Lac, Dolder Grand, Bürgenstock, Badrutt's Palace, Gstaad Palace and more. Fixed price per vehicle.";
  return {
    title,
    description,
    alternates: { canonical: `/${l}${localizePath("/hotels", l)}`, languages: langAlternates("/hotels") },
    openGraph: { title, description },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const l = lang === "de" ? "de" : "en";
  // İstemciye yalnızca kart verisi gider (otel metinleri pakete girmez)
  const groups = hotelRegions.map((r) => ({
    key: r.key,
    label: r.label[l],
    items: hotels.filter((h) => h.region === r.key).map((h): HotelCard => {
      const route = h.routeKey ? routes.find((x) => x.slug === h.routeKey) : undefined;
      return {
        slug: h.slug, name: h.name, place: h.place, img: h.img, teaser: h[l].teaser,
        fromPrice: route ? transferPrice(route.km, "business_class_e") : null,
      };
    }),
  })).filter((g) => g.items.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: hotels.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${h.name} Transfer`,
      url: `/${l}${localizePath(`/hotels/${h.slug}`, l)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HotelsClient groups={groups} />
    </>
  );
}
