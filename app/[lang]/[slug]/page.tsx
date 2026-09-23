import type { Metadata } from "next";
import { routes, WHATSAPP_NUMBER } from "../../config";
import { getRouteContent } from "../../routeContent";
import { notFound, permanentRedirect } from "next/navigation";
import RouteClient from "./route-client";
import DestinationClient from "./destination-client";
import { findDestination } from "../../destinations";
import { resolveSlug, slugAlternates, canonicalSlugParams } from "../../slugs";
import { tx } from "../../i18nX";
import { routeMeta } from "../../routeMeta";
import type { Lang } from "../../i18n";
import { LANGS, DEFAULT_LANG } from "../../paths";

const nameOf = (to: string | { de: string; en: string }, lang: string) =>
  typeof to === "string" ? to : lang === "de" ? to.de : to.en;

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug: rawSlug } = await params;
  const res = resolveSlug(rawSlug, lang as Lang);
  if (!res) return { title: "ZRH Airport Taxi" };
  const slug = res.key; // iç anahtar; URL'ler dile göre üretilir
  const route = routes.find((r) => r.slug === slug);
  if (!route) {
    const dest = findDestination(slug);
    if (dest) {
      const safe: Lang = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : DEFAULT_LANG;
      const X = tx[safe];
      const n = dest.d.name;
      return {
        title: `${X.dest.hero(n)} | Zürich Airport Taxi`,
        description: X.dest.heroSub(n),
        alternates: {
          canonical: `/${lang}/${res.canonical}`,
          languages: slugAlternates(slug),
        },
      };
    }
    return { title: "ZRH Airport Taxi" };
  }
  const n = nameOf(route.to, lang);
  const safe: Lang = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : DEFAULT_LANG;
  const X = tx[safe];
  // SEO meta: rota başına elle yazılmış başlık/açıklama (routeMeta.ts); yoksa şablon
  const rm = routeMeta[slug]?.[safe];
  return {
    title: rm?.title ?? `${X.dest.hero(n)} | Zürich Airport Taxi`,
    description: rm?.description ?? `${X.dest.routeKnown(n)} ${X.dest.heroSub(n)}`,
    alternates: {
      canonical: `/${lang}/${res.canonical}`,
      languages: slugAlternates(slug),
    },
    openGraph: {
      title: X.dest.hero(n),
      description: X.dest.chips.join(" · "),
    },
  };
}

/** Her dil için yalnızca kanonik slug'lar derlenir; eski/yanlış dildeki biçimler istek anında yönlendirilir */
export function generateStaticParams() {
  return canonicalSlugParams();
}

export default async function Page({ params }: Params) {
  const { lang, slug: rawSlug } = await params;
  const res = resolveSlug(rawSlug, lang as Lang);
  if (!res) notFound();
  // Eski slug ya da diğer dilin slug'ı → kalıcı yönlendirme (SEO: sıralama kanonik URL'ye taşınır)
  if (res.canonical !== rawSlug) permanentRedirect(`/${lang}/${res.canonical}`);
  const slug = res.key;
  const route = routes.find((r) => r.slug === slug);
  if (!route) {
    const dest = findDestination(slug);
    if (dest) {
      const dJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Airport transfer",
        name: `Zurich Airport (ZRH) → ${dest.d.name}`,
        areaServed: "Switzerland",
        provider: {
          "@type": "LocalBusiness",
          name: "ZRH Airport Taxi",
          telephone: `+${WHATSAPP_NUMBER}`,
          address: { "@type": "PostalAddress", streetAddress: "Ifangstrasse 12, Stock 2", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
        },
      };
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dJsonLd) }} />
          <DestinationClient slug={slug} />
        </>
      );
    }
    notFound(); // Gerçek 404 — soft-404 önlenir
  }
  const n = nameOf(route.to, lang);
  const content = getRouteContent(slug, lang === "de" ? "de" : "en");

  const jsonLd: object[] = [];
  {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Airport transfer",
      name: `Zurich Airport (ZRH) → ${n}`,
      areaServed: "Switzerland",
      provider: {
        "@type": "LocalBusiness",
        name: "ZRH Airport Taxi",
        telephone: `+${WHATSAPP_NUMBER}`,
        address: { "@type": "PostalAddress", streetAddress: "Ifangstrasse 12, Stock 2", postalCode: "8302", addressLocality: "Kloten", addressCountry: "CH" },
      },
    });
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `/${lang}` },
        { "@type": "ListItem", position: 2, name: lang === "de" ? "Strecken" : "Routes", item: lang === "de" ? "/de/strecken" : "/en/routes" },
        { "@type": "ListItem", position: 3, name: `ZRH → ${n}`, item: `/${lang}/${res.canonical}` },
      ],
    });
    if (content) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      });
    }
  }

  return (
    <>
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />
      ))}
      <RouteClient slug={slug} />
    </>
  );
}
