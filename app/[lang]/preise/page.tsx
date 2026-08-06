import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import PreiseClient from "./preise-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "preise");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/preise", lang as never) === "/" ? "" : localizePath("/preise", lang as never)}`,
      languages: langAlternates("/preise"),
    },
  };
}

export default function Page() {
  return <PreiseClient />;
}
