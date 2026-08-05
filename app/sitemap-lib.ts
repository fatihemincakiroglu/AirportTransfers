// ─────────────────────────────────────────────────────────────
//  SITEMAP YARDIMCILARI — iki dilin URL listesi + XML üretici
// ─────────────────────────────────────────────────────────────
import { SITE_URL, routes } from "./config";
import { allDestinationSlugs } from "./destinations";
import { blogPosts } from "./blogContent";
import { tours } from "./tourContent";
import { localizePath } from "./paths";

export type L = "en" | "de";

type Row = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  altEn: string;
  altDe: string;
};

const NOW = new Date().toISOString();

// İç yol + sıklık + öncelik (+ opsiyonel tarih)
const PAGES: [string, "weekly" | "monthly" | "yearly", number, string?][] = [
  ["/", "weekly", 1],
  ["/strecken", "weekly", 0.9],
  ["/buchung", "monthly", 0.9],
  ["/fahrzeuge", "monthly", 0.7],
  ["/touren", "monthly", 0.7],
  ["/galerie", "monthly", 0.5],
  ["/kontakt", "yearly", 0.6],
  ["/ueber-uns", "yearly", 0.6],
  ["/datenschutz", "yearly", 0.3],
  ["/cookies", "yearly", 0.3],
  ["/agb", "yearly", 0.3],
  ["/rueckerstattung", "yearly", 0.3],
  ["/faq", "monthly", 0.6],
  ["/staedte", "weekly", 0.8],
  ["/preise", "monthly", 0.8],
  ["/events", "monthly", 0.7],
  ["/blog", "weekly", 0.7],
  ...routes.map((r): [string, "monthly", number] => [`/${r.slug}`, "monthly", 0.8]),
  ...allDestinationSlugs().map((sl): [string, "monthly", number] => [`/${sl}`, "monthly", 0.6]),
  ...tours.map((x): [string, "monthly", number] => [`/touren/${x.slug}`, "monthly", 0.7]),
  ...blogPosts.map((p): [string, "yearly", number, string] => [
    `/blog/${p.slug}`, "yearly", 0.6, new Date(p.date).toISOString(),
  ]),
];

const pub = (internal: string, lang: L) => {
  const p = localizePath(internal, lang);
  return `${SITE_URL}/${lang}${p === "/" ? "" : p}`;
};

/** Bir dilin tüm sitemap satırları */
export function rowsFor(lang: L): Row[] {
  return PAGES.map(([path, changefreq, priority, date]) => ({
    loc: pub(path, lang),
    lastmod: date ?? NOW,
    changefreq,
    priority,
    altEn: pub(path, "en"),
    altDe: pub(path, "de"),
  }));
}

/** Dil sitemap'inin XML çıktısı (hreflang alternatifleriyle) */
export function urlsetXml(lang: L): string {
  const rows = rowsFor(lang)
    .map(
      (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${r.altEn}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${r.altDe}"/>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rows}
</urlset>`;
}

/** Ana index: dillere link verir */
export function indexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-en.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-de.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>
</sitemapindex>`;
}
