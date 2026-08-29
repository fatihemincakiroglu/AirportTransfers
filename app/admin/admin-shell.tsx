"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

const NAV: [string, string, string][] = [
  ["/admin", "Kontrol Paneli", "▦"],
  ["/admin/raporlar", "Raporlar", "▤"],
  ["/admin/ziyaretciler", "Ziyaretçiler", "🌍"],
  ["/admin/rezervasyonlar", "Rezervasyonlar", "🗓"],
  ["/admin/takvim", "Takvim", "📅"],
  ["/admin/faturalar", "Faturalar", "🧾"],
  ["/admin/talepler", "İletişim Talepleri", "✉"],
  ["/admin/loglar", "Sistem Logları", "☰"],
];

// Mobil alt çubuk: en sık kullanılan 4 bölüm + "Daha fazla"
const BOTTOM: [string, string, string][] = [
  ["/admin", "Özet", "▦"],
  ["/admin/rezervasyonlar", "Rezervasyon", "🗓"],
  ["/admin/takvim", "Takvim", "📅"],
  ["/admin/talepler", "Mesajlar", "✉"],
];

export default function AdminShell({
  children, version, nextVersion, unread = 0,
}: { children: React.ReactNode; version?: string; nextVersion?: string; unread?: number }) {
  const path = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const loadingHref = pending && pending.from === path ? pending.href : null;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const current = NAV.find(([href]) => (href === "/admin" ? path === "/admin" : path.startsWith(href)));

  const bottomHrefs = BOTTOM.map(([h]) => h);

  const navList = (onNavigate?: () => void, only?: "rest") => (
    <nav className="flex flex-1 flex-col gap-1">
      {(only === "rest" ? NAV.filter(([h]) => !bottomHrefs.includes(h)) : NAV).map(([href, label, icon]) => {
        const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
        const loading = loadingHref === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => { setPending({ href, from: path }); onNavigate?.(); }}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors md:py-2.5"
            style={active || loading ? { background: "rgba(255,255,255,0.12)", color: "#fff" } : { color: "rgba(255,255,255,0.65)" }}
          >
            <span className="w-4 text-center opacity-80">{icon}</span>
            <span className="flex-1">{label}</span>
            {href === "/admin/talepler" && unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold text-white"
                    style={{ background: "#DC2626" }}>
                {unread}
              </span>
            )}
            {loading && <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/25 border-t-white/80" />}
          </Link>
        );
      })}
    </nav>
  );

  const sysInfo = (
    <div className="mt-3 border-t border-white/10 px-3 pt-3 text-[10px] leading-relaxed text-white/35">
      <p className="font-bold text-white/50">Panel v{version ?? "1.0"}</p>
      <p>Next.js {nextVersion ?? ""}</p>
      <p>{new Date().getFullYear()} · Airport Zurich Transfer</p>
    </div>
  );

  const logoutBtn = (
    <button
      type="button"
      onClick={logout}
      className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/65 transition-colors hover:bg-white/10 hover:text-white md:py-2.5"
    >
      <span className="w-4 text-center">⏻</span> Çıkış
    </button>
  );

  return (
    <div className="flex min-h-screen" style={{ background: C.ivory }}>
      {/* ── Masaüstü yan menü ── */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col overflow-y-auto border-r border-black/5 px-3 py-5 md:flex print:!hidden"
        style={{ background: C.pine }}
      >
        <Link href="/" className="mb-6 block px-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt="Zurich Taxi · Airport Transfer" className="h-7 w-auto" />
        </Link>
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Menü</p>
        {navList()}
        {logoutBtn}
        {sysInfo}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:ml-60 print:ml-0">
        {/* ── Mobil üst çubuk: başlık + hamburger ── */}
        <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 md:hidden print:!hidden" style={{ background: C.pine }}>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-white">{current?.[1] ?? "Panel"}</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Zurich Taxi · Airport Transfer</span>
          </span>
        </header>

        {/* ── Mobil çekmece menü ── */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button type="button" aria-label="Kapat" onClick={() => setMenuOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            <aside className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col overflow-auto rounded-t-3xl px-3 pb-6 pt-4 shadow-2xl"
                   style={{ background: C.pine, paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}>
              <span aria-hidden className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
              <div className="mb-4 flex items-center justify-between px-3">
                <span className="text-sm font-bold" style={{ color: C.gold }}>Diğer bölümler</span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/70"
                        style={{ background: "rgba(255,255,255,0.1)" }}>✕</button>
              </div>
              {navList(() => setMenuOpen(false), "rest")}
              <button type="button" onClick={() => { setMenuOpen(false); logout(); }}
                className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/65">
                <span className="w-4 text-center">⏻</span> Çıkış
              </button>
              {sysInfo}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 pb-28 sm:p-5 sm:pb-28 md:p-8 md:pb-8 print:p-0">{children}</main>

        {/* ── Mobil alt gezinme çubuğu ── */}
        <nav
          className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-white/10 md:hidden print:!hidden"
          style={{ background: C.pine, paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          {BOTTOM.map(([href, label, icon]) => {
            const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
            const loading = loadingHref === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setPending({ href, from: path })}
                className="flex flex-1 flex-col items-center gap-1 py-2.5"
                style={{ color: active ? C.gold : "rgba(255,255,255,0.55)" }}
              >
                <span className="relative text-lg leading-none">
                  {icon}
                  {href === "/admin/talepler" && unread > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-extrabold text-white"
                          style={{ background: "#DC2626" }}>
                      {unread > 9 ? "9+" : unread}
                    </span>
                  )}
                  {loading && (
                    <span className="absolute -right-2 -top-1 h-2 w-2 animate-ping rounded-full" style={{ background: C.gold }} />
                  )}
                </span>
                <span className="text-[10px] font-bold">{label}</span>
                {active && <span className="h-0.5 w-6 rounded-full" style={{ background: C.gold }} />}
              </Link>
            );
          })}

          {/* Daha fazla → çekmece */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-1 flex-col items-center gap-1 py-2.5"
            style={{ color: menuOpen ? C.gold : "rgba(255,255,255,0.55)" }}
          >
            <span className="text-lg leading-none">⋯</span>
            <span className="text-[10px] font-bold">Daha fazla</span>
            {menuOpen && <span className="h-0.5 w-6 rounded-full" style={{ background: C.gold }} />}
          </button>
        </nav>
      </div>
    </div>
  );
}
