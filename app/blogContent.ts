// ─────────────────────────────────────────────────────────────
//  BLOG İÇERİKLERİ — tür tanımları ve birleştirme (DE/EN)
//  Yazılar seri dosyalarında: blogContentBase (11), blogContentAirport (10), blogContentRoutes (9).
//  Paragraflarda [metin](/ic-yol) iç link ve **kalın** desteklenir (post-client.tsx → renderInline).
// ─────────────────────────────────────────────────────────────

export type BlogBlock = { h?: string; p: string[] };
export type BlogLang = { title: string; excerpt: string; body: BlogBlock[] };
export type BlogPost = { slug: string; date: string; img: string; de: BlogLang; en: BlogLang };

import { airportPosts } from "./blogContentAirport";
import { routePosts } from "./blogContentRoutes";
import { basePosts } from "./blogContentBase";

/** Tüm yazılar — en yeni önce. Yeni seriler ayrı dosyalarda tutulur ve burada birleştirilir. */
export const blogPosts: BlogPost[] = [...routePosts, ...airportPosts, ...basePosts].sort((a, b) => (a.date < b.date ? 1 : -1));
