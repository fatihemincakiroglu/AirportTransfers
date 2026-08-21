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
  const [menuOpen, setMenuOpen] = useState(false);
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const loadingHref = pending && pending.from === path ? pending.href : null;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const current = NAV.find(([href]) => (href === "/admin" ? path === "/admin" : path.startsWith(href)));

  const navList = (onNavigate?: () => void) => (
    <nav className="flex flex-1 flex-col gap-1">
      {NAV.map(([href, label, icon]) => {
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
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-black/5 px-3 py-5 md:flex" style={{ background: C.pine }}>
        <Link href="/" className="mb-6 px-3 text-sm font-bold" style={{ color: C.gold }}>✈ Airport Zurich Transfer</Link>
        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Menü</p>
        {navList()}
        {logoutBtn}
        {sysInfo}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* ── Mobil üst çubuk: başlık + hamburger ── */}
        <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 md:hidden" style={{ background: C.pine }}>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-white">{current?.[1] ?? "Panel"}</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Airport Zurich Transfer</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-xl"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <span className="block h-[2px] w-5 rounded-full" style={{ background: C.gold }} />
            <span className="block h-[2px] w-5 rounded-full" style={{ background: C.gold }} />
            <span className="block h-[2px] w-5 rounded-full" style={{ background: C.gold }} />
          </button>
        </header>

        {/* ── Mobil çekmece menü ── */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button type="button" aria-label="Kapat" onClick={() => setMenuOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            <aside className="absolute right-0 top-0 flex h-full w-[80%] max-w-xs flex-col px-3 py-5 shadow-2xl" style={{ background: C.pine }}>
              <div className="mb-5 flex items-center justify-between px-3">
                <span className="text-sm font-bold" style={{ color: C.gold }}>Menü</span>
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Menüyü kapat"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/70"
                        style={{ background: "rgba(255,255,255,0.1)" }}>✕</button>
              </div>
              {navList(() => setMenuOpen(false))}
              <button type="button" onClick={() => { setMenuOpen(false); logout(); }}
                className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-white/65">
                <span className="w-4 text-center">⏻</span> Çıkış
              </button>
              {sysInfo}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
