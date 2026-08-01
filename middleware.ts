import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "de"];
const DEFAULT_LOCALE = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Zaten dil önekliyse dokunma
  if (LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // Dilsiz URL → varsayılan dile (İngilizce) kalıcı yönlendirme
  // Eski linkler de böylece korunur: /strecken → /en/strecken
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Statik dosyaları, Next iç yollarını, sitemap/robots/ikonları hariç tut
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
