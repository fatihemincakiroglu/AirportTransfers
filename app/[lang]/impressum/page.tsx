import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import { LegalPage } from "../../components";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "impressum");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/impressum", lang as never) === "/" ? "" : localizePath("/impressum", lang as never)}`,
      languages: langAlternates("/impressum"),
    },
  };
}

export default function Page() {
  return <LegalPage pageKey="impressum" />;
}
