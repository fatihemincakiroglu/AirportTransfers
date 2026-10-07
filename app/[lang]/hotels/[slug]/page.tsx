import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hotels, findHotel, hotelRegions } from "../../../hotels";
import { routes, transferPrice, WHATSAPP_NUMBER } from "../../../config";
import { blogPosts } from "../../../blogContent";
import { teaserOf } from "../../../blogTaxonomy";
import { langAlternates, localizePath } from "../../../paths";
import HotelClient, { type HotelView } from "./hotel-client";

type Params = { params: Promise<{ lang: string; slug: string }> };

const L = (lang: string): "de" | "en" => (lang === "de" ? "de" : "en");

/** Görünen yol: /de/hoteltransfer/<slug> · /en/hotel-transfers/<slug> */
const pathOf = (lang: "de" | "en", slug: string) => `/${lang}${localizePath(`/hotels/${slug}`, lang)}`;

export function generateStaticParams() {
  return hotels.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const h = findHotel(slug);
  if (!h) return { title: "Hotel Transfer | Zürich Airport Taxi" };
  const l = L(lang);
  // Aranan kalıp: "<Otel> Transfer" + "Flughafen Zürich / Zurich Airport"
  const title = l === "de"
    ? `${h.name} Transfer ab Flughafen Zürich | Zürich Airport Taxi`
    : `${h.name} Transfer from Zurich Airport | Zürich Airport Taxi`;
  const description = l === "de"
    ? `Privater Transfer vom Flughafen Zürich zum ${h.name} in ${h.place}: Festpreis pro Fahrzeug, Chauffeur in der Ankunftshalle, Flugverfolgung. Preis sofort berechnen.`
    : `Private transfer from Zurich Airport to ${h.name} in ${h.place}: fixed price per vehicle, chauffeur in the arrivals hall, flight tracking. See your price instantly.`;
  return {
    title,
    description,
    alternates: { canonical: pathOf(l, slug), languages: langAlternates(`/hotels/${slug}`) },
    openGraph: { title, description, images: [h.img] },
  };
}

export default async function Page({ params }: Params) {
  const { lang, slug } = await params;
  const h = findHotel(slug);
  if (!h) notFound();
  const l = L(lang);
  const c = h[l];
  const route = h.routeKey ? routes.find((r) => r.slug === h.routeKey) : undefined;

  // İstemciye yalnızca bu otelin bu dildeki içeriği gider (16 otelin tamamı pakete girmez)
  const view: HotelView = {
    slug: h.slug,
    name: h.name,
    place: h.place,
    address: h.address,
    lat: h.lat,
    lon: h.lon,
    img: h.img,
    regionLabel: hotelRegions.find((r) => r.key === h.region)!.label[l],
    km: route?.km ?? h.km ?? null,
    min: route?.min ?? h.min ?? null,
    approx: !route,
    route: route ? { key: route.slug, name: typeof route.to === "string" ? route.to : route.to[l] } : null,
    fromPrice: route ? transferPrice(route.km, "business_class_e") : null,
    content: c,
    guides: h.guides
      .map((s) => blogPosts.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => teaserOf(p, l)),
    siblings: [
      ...hotels.filter((x) => x.slug !== h.slug && x.region === h.region),
      ...hotels.filter((x) => x.slug !== h.slug && x.region !== h.region),
    ].slice(0, 3).map((x) => ({ slug: x.slug, name: x.name, place: x.place, img: x.img, teaser: x[l].teaser })),
  };

  const faq = [...c.faq, ...templateFaq(view, l)];
  const url = pathOf(l, slug);
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Airport transfer",
      name: `Zurich Airport (ZRH) → ${h.name}, ${h.place}`,
      areaServed: "Switzerland",
      provider: {
        "@type": "LocalBusiness",
        name: "ZRH Airport Taxi",
        telephone: `+${WHATSAPP_NUMBER}`,
        address: { "@type": "PostalAddress", streetAddress: "Ifangstrasse 12, Stock 2", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
      },
      ...(view.fromPrice ? { offers: { "@type": "Offer", priceCurrency: "CHF", price: view.fromPrice.toFixed(2) } } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `/${l}` },
        { "@type": "ListItem", position: 2, name: l === "de" ? "Hoteltransfer" : "Hotel transfers", item: `/${l}${localizePath("/hotels", l)}` },
        { "@type": "ListItem", position: 3, name: h.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <HotelClient h={view} faq={faq} />
    </>
  );
}

/** Her otel sayfasında ortak iki soru (fiyat + buluşma) — otele özgü sorulara eklenir */
function templateFaq(h: HotelView, l: "de" | "en"): [string, string][] {
  const price = h.fromPrice ? `CHF ${h.fromPrice.toFixed(2)}` : null;
  return l === "de"
    ? [
        [
          `Was kostet ein Transfer vom Flughafen Zürich zum ${h.name}?`,
          price
            ? `Die Fahrt kostet ab ${price} in der Business Class (Mercedes E-Klasse), als Festpreis pro Fahrzeug inklusive Gepäck und Wartezeit bei Ankunft. Zwischen 00:00 und 06:00 Uhr gilt ein Nachtzuschlag von 20 %. Die Preise aller Klassen zeigt der Rechner auf dieser Seite.`
            : `Der Preis wird nach der Fahrstrecke berechnet und gilt als Festpreis pro Fahrzeug, inklusive Gepäck und Wartezeit bei Ankunft. Zwischen 00:00 und 06:00 Uhr gilt ein Nachtzuschlag von 20 %. Den genauen Betrag aller Klassen zeigt der Rechner auf dieser Seite.`,
        ],
        [
          "Wo treffe ich meinen Fahrer am Flughafen Zürich?",
          "Ihr Chauffeur erwartet Sie in der Ankunftshalle mit einem Namensschild. Er verfolgt Ihren Flug; 60 Minuten Wartezeit nach der Landung sind im Festpreis enthalten.",
        ],
      ]
    : [
        [
          `How much is a transfer from Zurich Airport to ${h.name}?`,
          price
            ? `The ride costs from ${price} in Business Class (Mercedes E-Class), as a fixed price per vehicle including luggage and arrival waiting time. Between midnight and 6 am a 20 % night surcharge applies. The calculator on this page shows the prices for all classes.`
            : `The price is calculated on the driving distance and applies as a fixed price per vehicle, including luggage and arrival waiting time. Between midnight and 6 am a 20 % night surcharge applies. The calculator on this page shows the exact amount for all classes.`,
        ],
        [
          "Where do I meet my driver at Zurich Airport?",
          "Your chauffeur waits for you in the arrivals hall with a name sign. He tracks your flight; 60 minutes of waiting after landing are included in the fixed price.",
        ],
      ];
}
