// ─────────────────────────────────────────────────────────────
//  BLOG İÇERİKLERİ — tür tanımları ve birleştirme (DE/EN)
//  Yazılar seri dosyalarında: blogContentBase, blogContentAirport, blogContentRoutes, blogContentLongform, blogContentGuides.
//  Paragraflarda [metin](/ic-yol) iç link ve **kalın** desteklenir (post-client.tsx → renderInline).
// ─────────────────────────────────────────────────────────────

/**
 * İçerik bloğu: h = H2 başlık, h3 = H3 alt başlık, p = paragraflar, ul = madde listesi,
 * table = tablo (head + rows). Paragraf/madde/hücrelerde [metin](/yol) ve **kalın** desteklenir.
 */
export type BlogTable = { head: string[]; rows: string[][] };
export type BlogBlock = { h?: string; h3?: string; p: string[]; ul?: string[]; table?: BlogTable };
/**
 * title = sayfadaki H1 (uzun olabilir) · seo = Google'da görünen kısa başlık (≈ 40 karakter;
 * sonuna " | Zürich Airport Taxi" eklenir). seo yoksa title kullanılır.
 */
export type BlogLang = { title: string; seo?: string; excerpt: string; body: BlogBlock[] };
/** updated: içerik esaslı güncellendiğinde (YYYY-MM-DD) — sayfada "Aktualisiert" olarak görünür, sitemap/JSON-LD'ye gider */
export type BlogPost = { slug: string; date: string; updated?: string; img: string; de: BlogLang; en: BlogLang };

import { airportPosts } from "./blogContentAirport";
import { routePosts } from "./blogContentRoutes";
import { basePosts } from "./blogContentBase";
import { longformPosts } from "./blogContentLongform";
import { guidePosts } from "./blogContentGuides";

/** Tüm yazılar — en yeni önce. Yeni seriler ayrı dosyalarda tutulur ve burada birleştirilir. */
export const blogPosts: BlogPost[] = [...guidePosts, ...longformPosts, ...routePosts, ...airportPosts, ...basePosts].sort((a, b) => (a.date < b.date ? 1 : -1));

/**
 * Birleştirilen yazılar: eski adres → yazının devam ettiği adres (301, next.config.ts).
 * Buraya ekleme yaparsan next.config.ts'teki listeyi de güncelle.
 */
export const mergedBlogSlugs: Record<string, string> = {
  "gepaeck-tipps-flughafentransfer": "wie-viele-koffer-passen-e-klasse-v-klasse-s-klasse",
  "mit-baby-und-kleinkind-ab-flughafen-zuerich-kindersitz-kinderwagen": "mit-kindern-reisen-kindersitze-schweiz",
  "ankunft-flughafen-zuerich-fahrer-finden": "ankunft-1-oder-ankunft-2-treffpunkt-fahrer-flughafen-zuerich",
  "taxi-flughafen-zuerich-finden-kosten-alternativen": "uber-taxi-oder-privater-transfer-flughafen-zuerich",
};
