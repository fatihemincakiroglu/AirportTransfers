"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

const NAV: [string, string, string][] = [
  ["/admin", "Kontrol Paneli", "▦"],
  ["/admin/raporlar", "Raporlar", "▤"],
  ["/admin/rezervasyonlar", "Rezervasyonlar", "🗓"],
  ["/admin/takvim", "Takvim", "📅"],
  ["/admin/faturalar", "Faturalar", "🧾"],
  ["/admin/talepler", "İletişim Talepleri", "✉"],
  ["/admin/loglar", "Sistem Logları", "☰"],
];

export default function AdminShell({
  children, version, nextVersion,
}: { children: React.ReactNode; version?: string; nextVersion?: string }) {
  const path = usePathname();
  const router = useRouter();
  // Tıklanan bağlantı, sayfa gelene kadar "yükleniyor" görünür.
  // Yol değişince işaret otomatik düşer (effect'e gerek yok).
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const loadingHref = pending && pending.from === path ? pending.href : null;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen" style={{ background: C.ivory }}>
      {/* Yan menü */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-black/5 px-3 py-5 md:flex" style={{ background: C.pine }}>
        <Link href="/" className="mb-6 px-3 text-sm font-bold" style={{ color: C.gold }}>✈ Airport Zurich Transfer</Link>
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Menü</p>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map(([href, label, icon]) => {
            const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
            const loading = loadingHref === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setPending({ href, from: path })}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
                style={active || loading ? { background: "rgba(255,255,255,0.12)", color: "#fff" } : { color: "rgba(255,255,255,0.65)" }}
              >
                <span className="w-4 text-center opacity-80">{icon}</span>
                <span className="flex-1">{label}</span>
                {loading && (
                  <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/25 border-t-white/80" />
                )}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/65 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="w-4 text-center">⏻</span> Çıkış
        </button>

        {/* Sistem bilgisi */}
        <div className="mt-3 border-t border-white/10 px-3 pt-3 text-[10px] leading-relaxed text-white/35">
          <p className="font-bold text-white/50">Panel v{version ?? "1.0"}</p>
          <p>Next.js {nextVersion ?? ""}</p>
          <p>{new Date().getFullYear()} · Airport Zurich Transfer</p>
        </div>
      </aside>

      {/* Mobil üst şerit */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 overflow-x-auto border-b border-black/5 px-3 py-2 md:hidden" style={{ background: C.pine }}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setPending({ href, from: path })}
               className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold"
               style={path === href ? { background: C.gold, color: C.pine } : { color: "rgba(255,255,255,0.7)" }}>
              {label}
            </Link>
          ))}
          <button type="button" onClick={logout} className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold text-white/70">Çıkış</button>
        </div>
        <main className="min-w-0 flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
