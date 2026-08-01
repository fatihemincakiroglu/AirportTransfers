import { NextRequest, NextResponse } from "next/server";
import { SEGMENTS, findInternalKey } from "./app/paths";

const LOCALES = ["en", "de"] as const;
const DEFAULT_LOCALE = "en";
type L = (typeof LOCALES)[number];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split("/").filter(Boolean);

  // ── Dil önekli yollar ────────────────────────────────────
  if (parts.length && (LOCALES as readonly string[]).includes(parts[0])) {
    const lang = parts[0] as L;
    const seg = parts[1];
    if (!seg) return NextResponse.next();

    const key = findInternalKey(seg);
    if (key) {
      const publicSeg = SEGMENTS[key][lang];
      if (seg === publicSeg && seg !== key) {
        // Doğru görünen ad (örn. /en/contact) → içerideki klasöre rewrite
        const url = req.nextUrl.clone();
        url.pathname = `/${lang}/${key}${parts.slice(2).length ? "/" + parts.slice(2).join("/") : ""}`;
        return NextResponse.rewrite(url);
      }
      if (seg !== publicSeg) {
        // Yanlış dilde/iç ad (örn. /en/kontakt) → doğru görünen ada yönlendir
        const url = req.nextUrl.clone();
        url.pathname = `/${lang}/${publicSeg}${parts.slice(2).length ? "/" + parts.slice(2).join("/") : ""}`;
        return NextResponse.redirect(url, 308);
      }
    }
    return NextResponse.next();
  }

  // ── Dilsiz yollar → varsayılan dile (EN) yönlendir ──────
  const url = req.nextUrl.clone();
  if (parts.length) {
    const key = findInternalKey(parts[0]);
    if (key) parts[0] = SEGMENTS[key][DEFAULT_LOCALE]; // /strecken → routes
  }
  url.pathname = `/${DEFAULT_LOCALE}${parts.length ? "/" + parts.join("/") : ""}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
