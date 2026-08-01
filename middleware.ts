import { NextRequest, NextResponse } from "next/server";
import { SEGMENTS, findInternalKey } from "./app/paths";

const LOCALES = ["en", "de"] as const;
const DEFAULT_LOCALE = "en";
const LANG_COOKIE = "site-lang";
type L = (typeof LOCALES)[number];

export function middleware(req: NextRequest) {
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
        if (seg === publicSeg && seg !== key) {
          // Doğru görünen ad (örn. /en/contact) → içerideki klasöre rewrite
          const url = req.nextUrl.clone();
          url.pathname = `/${lang}/${key}${parts.slice(2).length ? "/" + parts.slice(2).join("/") : ""}`;
          res = NextResponse.rewrite(url);
        } else if (seg !== publicSeg) {
          // Yanlış dilde segment (örn. /en/kontakt) → doğrusuna yönlendir
          const url = req.nextUrl.clone();
          url.pathname = `/${lang}/${publicSeg}${parts.slice(2).length ? "/" + parts.slice(2).join("/") : ""}`;
          res = NextResponse.redirect(url, 308);
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
  if (cookieLang === "de" || cookieLang === "en") {
    target = cookieLang;
  } else {
    const ref = req.headers.get("referer") ?? "";
    const m = ref.match(/\/(de|en)(\/|$)/);
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
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
