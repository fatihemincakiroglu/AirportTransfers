// ─────────────────────────────────────────────────────────────
//  BLOG İÇERİKLERİ — tür tanımları ve birleştirme (DE/EN)
//  Yazılar seri dosyalarında: blogContentBase (11), blogContentAirport (10), blogContentRoutes (9).
//  Paragraflarda [metin](/ic-yol) iç link ve **kalın** desteklenir (post-client.tsx → renderInline).
// ─────────────────────────────────────────────────────────────

/**
 * İçerik bloğu: h = H2 başlık, h3 = H3 alt başlık, p = paragraflar, ul = madde listesi,
 * table = tablo (head + rows). Paragraf/madde/hücrelerde [metin](/yol) ve **kalın** desteklenir.
 */
export type BlogTable = { head: string[]; rows: string[][] };
export type BlogBlock = { h?: string; h3?: string; p: string[]; ul?: string[]; table?: BlogTable };
export type BlogLang = { title: string; excerpt: string; body: BlogBlock[] };
export type BlogPost = { slug: string; date: string; img: string; de: BlogLang; en: BlogLang };

import { airportPosts } from "./blogContentAirport";
import { routePosts } from "./blogContentRoutes";
import { basePosts } from "./blogContentBase";
import { longformPosts } from "./blogContentLongform";

/** Tüm yazılar — en yeni önce. Yeni seriler ayrı dosyalarda tutulur ve burada birleştirilir. */
export const blogPosts: BlogPost[] = [...longformPosts, ...routePosts, ...airportPosts, ...basePosts].sort((a, b) => (a.date < b.date ? 1 : -1));
