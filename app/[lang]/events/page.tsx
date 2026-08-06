import type { Metadata } from "next";
import { pageMeta } from "../../pageMeta";
import { langAlternates, localizePath } from "../../paths";
import EventsClient from "./events-client";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const m = pageMeta(lang as never, "events");
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${lang}${localizePath("/events", lang as never) === "/" ? "" : localizePath("/events", lang as never)}`,
      languages: langAlternates("/events"),
    },
  };
}

export default function Page() {
  return <EventsClient />;
}
