// ─────────────────────────────────────────────────────────────
//  SAYFA META'LARI — 11 dil
//  Başlık/açıklamalar t ve tx sözlüklerindeki çevirilerden üretilir,
//  böylece tek kaynaktan beslenir ve dil eklenince otomatik genişler.
// ─────────────────────────────────────────────────────────────
import { t, pickL, type Lang } from "./i18n";
import { LANGS, DEFAULT_LANG } from "./paths";
import { tx } from "./i18nX";
import { legalPages, type LegalKey } from "./legalContent";

const BRAND = "AirportTransfers Zürich";

export type PageKey =
  | "home" | "strecken" | "fahrzeuge" | "galerie" | "kontakt" | "ueber-uns"
  | "faq" | "buchung" | "blog" | "staedte" | "preise" | "events"
  | LegalKey;

export function pageMeta(rawLang: Lang, key: PageKey): { title: string; description: string } {
  // Beklenmeyen bir segment gelirse (ör. /favicon.ico) varsayılan dile düş
  const lang: Lang = (LANGS as readonly string[]).includes(rawLang) ? rawLang : DEFAULT_LANG;
  const L = t[lang];
  const X = tx[lang];
  switch (key) {
    case "home":      return { title: L.meta.title, description: L.meta.desc };
    case "strecken":  return { title: `${L.routesSec.pageTitle} | ${BRAND}`, description: L.routesSec.pageSub };
    case "fahrzeuge": return { title: `${L.fleetSec.pageTitle} | ${BRAND}`, description: L.fleetSec.pageSub };
    case "galerie":   return { title: `${L.gallerySec.pageTitle} | ${BRAND}`, description: L.gallerySec.pageSub };
    case "kontakt":   return { title: `${L.kontakt.title} | ${BRAND}`, description: L.meta.desc };
    case "ueber-uns": return { title: `${L.footer.about2} | ${BRAND}`, description: L.footer.about };
    case "faq":       return { title: `${L.faqPage.title} | ${BRAND}`, description: L.faqPage.sub };
    case "buchung":   return { title: `${L.booking.title} | ${BRAND}`, description: L.hero.sub };
    case "blog":      return { title: `${L.blogSec.title} | ${BRAND}`, description: L.blogSec.pageSub };
    case "staedte":   return { title: `${X.dest.pageTitle} | ${BRAND}`, description: X.dest.pageSub };
    case "preise":    return { title: `${X.prices.title} | ${BRAND}`, description: X.prices.sub };
    case "events":    return { title: `${X.events.title} | ${BRAND}`, description: X.events.sub };
    default:          return { title: `${pickL(legalPages[key], lang).title} | ${BRAND}`, description: L.meta.desc };
  }
}
