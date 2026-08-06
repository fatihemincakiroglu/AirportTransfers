import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import { routes } from "../../config";
import Strecken from "./strecken-client";

type Params = { params: Promise<{ lang: string }> };

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "strecken");
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}${localizePath("/strecken", lang as never) === "/" ? "" : localizePath("/strecken", lang as never)}`, languages: langAlternates("/strecken") },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: lang === "de" ? "Flughafentransfer-Strecken ab Zürich" : "Airport transfer routes from Zurich",
      numberOfItems: routes.length,
      itemListElement: routes.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          serviceType: "Airport transfer",
          name: `Zurich Airport (ZRH) → ${nameOf(r.to, lang)}`,
          url: `/${lang}/${r.slug}`,
          offers: { "@type": "Offer", price: r.price.toFixed(2), priceCurrency: "CHF" },
        },
      })),
    },
  ];
  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <Strecken />
    </>
  );
}
