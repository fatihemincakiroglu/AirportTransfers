"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "./providers";

/**
 * Sayfa görüntülemesini sayar (ülke/şehir Vercel başlıklarından okunur).
 * Kişisel veri toplanmaz; oturum başına aynı sayfa bir kez sayılır.
 */
export default function VisitTracker() {
  const path = usePathname();
  const { lang } = useLang();

  useEffect(() => {
    // Panel ve arama motoru botları sayılmaz
    if (path.startsWith("/admin")) return;
    if (typeof navigator !== "undefined" && navigator.webdriver) return;

    const key = `v:${path}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* sessionStorage kapalıysa yine de say */
    }

    const body = JSON.stringify({ path, lang });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    }
  }, [path, lang]);

  return null;
}
