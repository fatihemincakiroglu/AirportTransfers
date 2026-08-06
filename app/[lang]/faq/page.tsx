import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import { t } from "../../i18n";
import FaqClient from "./faq-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "faq");
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: `/${lang}${localizePath("/faq", lang as never) === "/" ? "" : localizePath("/faq", lang as never)}`, languages: langAlternates("/faq") },
  };
}

export default async function Page({ params }: Params) {
  const { lang } = await params;
  const list = (lang === "de" ? t.de : t.en).faqPage.list;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqClient />
    </>
  );
}
