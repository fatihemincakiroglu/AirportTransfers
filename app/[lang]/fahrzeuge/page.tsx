import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import Fahrzeuge from "./fahrzeuge-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "fahrzeuge");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/fahrzeuge", lang as never) === "/" ? "" : localizePath("/fahrzeuge", lang as never)}`,
      languages: langAlternates("/fahrzeuge"),
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
      <Fahrzeuge />
    </>
  );
}
