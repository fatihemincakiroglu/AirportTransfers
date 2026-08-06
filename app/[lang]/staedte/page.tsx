import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import StaedteClient from "./staedte-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "staedte");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/staedte", lang as never) === "/" ? "" : localizePath("/staedte", lang as never)}`,
      languages: langAlternates("/staedte"),
    },
  };
}

export default function Page() {
  return <StaedteClient />;
}
