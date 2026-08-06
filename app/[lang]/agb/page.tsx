import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "agb");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/agb", lang as never) === "/" ? "" : localizePath("/agb", lang as never)}`,
      languages: langAlternates("/agb"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="agb" />;
}
