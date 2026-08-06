// ─────────────────────────────────────────────────────────────
//  SITEMAP YARDIMCILARI — iki dilin URL listesi + XML üretici
// ─────────────────────────────────────────────────────────────
import { SITE_URL, routes } from "./config";
import { allDestinationSlugs } from "./destinations";
import { blogPosts } from "./blogContent";
import { localizePath, LANGS, DEFAULT_LANG, type LangCode } from "./paths";

export type L = LangCode;

type Row = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  /** dil → mutlak URL (tüm diller) */
  alts: Record<LangCode, string>;
};

const NOW = new Date().toISOString();

// İç yol + sıklık + öncelik (+ opsiyonel tarih)
const PAGES: [string, "weekly" | "monthly" | "yearly", number, string?][] = [
  ["/", "weekly", 1],
  ["/strecken", "weekly", 0.9],
  ["/buchung", "monthly", 0.9],
  ["/fahrzeuge", "monthly", 0.7],
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
    alts: Object.fromEntries(LANGS.map((l) => [l, pub(path, l)])) as Record<LangCode, string>,
  }));
}

/** hreflang satırları: x-default = Almanca; de için ayrı satır yazılmaz (tercih) */
function hreflangLinks(alts: Record<LangCode, string>): string {
  const lines: string[] = [];
  for (const l of LANGS) {
    if (l === DEFAULT_LANG) lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${alts[l]}"/>`);
    else lines.push(`    <xhtml:link rel="alternate" hreflang="${l}" href="${alts[l]}"/>`);
  }
  return lines.join("\n");
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
${hreflangLinks(r.alts)}
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rows}
</urlset>`;
}

/** Ana index: tüm dillerin sitemap'lerine link verir */
export function indexXml(): string {
  const items = LANGS.map(
    (l) => `  <sitemap>
    <loc>${SITE_URL}/sitemap-${l}.xml</loc>
    <lastmod>${NOW}</lastmod>
  </sitemap>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}
