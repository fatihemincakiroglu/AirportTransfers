import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "./config";
import { blogPosts } from "./blogContent";
import { localizePath } from "./paths";

// Dinamik sitemap: her sayfa iki dilde, dile göre çevrilmiş yollarla.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const langs = ["en", "de"] as const;

  const entry = (
    internalPath: string,
    lastModified: Date,
    changeFrequency: "weekly" | "monthly" | "yearly",
    priority: number
  ): MetadataRoute.Sitemap =>
    langs.map((l) => {
      const pub = (lg: "en" | "de") => {
        const p = localizePath(internalPath, lg);
        return `${SITE_URL}/${lg}${p === "/" ? "" : p}`;
      };
      return {
        url: pub(l),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: { en: pub("en"), de: pub("de") } },
      };
    });

  return [
    ...entry("/", now, "weekly", 1),
    ...entry("/strecken", now, "weekly", 0.9),
    ...entry("/buchung", now, "monthly", 0.9),
    ...entry("/fahrzeuge", now, "monthly", 0.7),
    ...entry("/touren", now, "monthly", 0.7),
    ...entry("/galerie", now, "monthly", 0.5),
    ...entry("/kontakt", now, "yearly", 0.6),
    ...entry("/faq", now, "monthly", 0.6),
    ...entry("/blog", now, "weekly", 0.7),
    ...routes.flatMap((r) => entry(`/${r.slug}`, now, "monthly", 0.8)),
    ...blogPosts.flatMap((p) => entry(`/blog/${p.slug}`, new Date(p.date), "yearly", 0.6)),
  ];
}
