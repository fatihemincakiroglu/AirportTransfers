import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "datenschutz");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/datenschutz", lang as never) === "/" ? "" : localizePath("/datenschutz", lang as never)}`,
      languages: langAlternates("/datenschutz"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="datenschutz" />;
}
