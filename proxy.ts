import { NextRequest, NextResponse } from "next/server";
import { SEGMENTS, findInternalKey, findInternalSub, localizeSub, LANGS, DEFAULT_LANG } from "./app/paths";

const LOCALES = LANGS;
const DEFAULT_LOCALE = DEFAULT_LANG;
const LANG_COOKIE = "site-lang";
type L = (typeof LOCALES)[number];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/").filter(Boolean);

  // ── Dil önekli yollar ────────────────────────────────────
  if (parts.length && (LOCALES as readonly string[]).includes(parts[0])) {
    const lang = parts[0] as L;
    const seg = parts[1];

    let res: NextResponse;
    if (!seg) {
      res = NextResponse.next();
    } else {
      const key = findInternalKey(seg);
      if (key) {
        const publicSeg = SEGMENTS[key][lang];
        // İkinci seviye (örn. /de/buchung/bestaetigung ↔ iç klasör confirmation)
        const rest = parts.slice(2);
        const sub = rest[0];
        const subKey = sub ? findInternalSub(key, sub) : null;
        const publicSub = subKey ? localizeSub(key, subKey, lang) : sub;
        const restPublic = rest.length ? "/" + [publicSub, ...rest.slice(1)].join("/") : "";
        const restInternal = rest.length ? "/" + [subKey ?? sub, ...rest.slice(1)].join("/") : "";
        if (seg !== publicSeg || (subKey && sub !== publicSub)) {
          // Yanlış dilde segment (örn. /en/kontakt, /de/buchung/confirmation) → doğrusuna yönlendir
          const url = req.nextUrl.clone();
          url.pathname = `/${lang}/${publicSeg}${restPublic}`;
          res = NextResponse.redirect(url, 308);
        } else if (seg !== key || restInternal !== rest.map((x) => "/" + x).join("")) {
          // Doğru görünen ad (örn. /en/contact) → içerideki klasöre rewrite
          const url = req.nextUrl.clone();
          url.pathname = `/${lang}/${key}${restInternal}`;
          res = NextResponse.rewrite(url);
        } else {
          res = NextResponse.next();
        }
      } else {
        res = NextResponse.next();
      }
    }

    // Kullanıcının dilini hatırla — dilsiz linkler için sigorta
    res.cookies.set(LANG_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // ── Dilsiz yollar → KULLANICININ DİLİNE yönlendir ───────
  // Öncelik: 1) dil çerezi  2) geldiği sayfanın dili  3) varsayılan (EN)
  let target: L = DEFAULT_LOCALE;
  const cookieLang = req.cookies.get(LANG_COOKIE)?.value;
  if (cookieLang && (LOCALES as readonly string[]).includes(cookieLang)) {
    target = cookieLang as L;
  } else {
    const ref = req.headers.get("referer") ?? "";
    const m = ref.match(new RegExp(`/(${LOCALES.join("|")})(/|$)`));
    if (m) target = m[1] as L;
  }

  const url = req.nextUrl.clone();
  if (parts.length) {
    const key = findInternalKey(parts[0]);
    if (key) parts[0] = SEGMENTS[key][target]; // /strecken → dilin görünen adı
  }
  url.pathname = `/${target}${parts.length ? "/" + parts.join("/") : ""}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
