"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card, fmtDate } from "../../ui";

export type Contact = {
  id: number; status: string; lang: string | null; name: string | null;
  email: string | null; phone: string | null; message: string | null; created_at: string;
};

const ST: Record<string, { label: string; bg: string; fg: string }> = {
  new:     { label: "Yeni",       bg: "#FEF3C7", fg: "#92400E" },
  read:    { label: "Okundu",     bg: "#E0F2FE", fg: "#075985" },
  replied: { label: "Yanıtlandı", bg: "#D1FAE5", fg: "#065F46" },
};

const FILTERS: [string, string][] = [["all", "Tümü"], ["new", "Yeni"], ["read", "Okundu"], ["replied", "Yanıtlandı"]];

export default function ContactsClient({ rows }: { rows: Contact[] }) {
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState<number | null>(null);
  const router = useRouter();

  const list = rows.filter((r) => filter === "all" || r.status === filter);

  const setStatus = async (id: number, status: string) => {
    setBusy(id);
    await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBusy(null);
    router.refresh();
  };

  return (
    <>
      <div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
        {FILTERS.map(([key, label]) => {
          const n = key === "all" ? rows.length : rows.filter((r) => r.status === key).length;
          const st = ST[key];
          return (
            <button key={key} type="button" onClick={() => setFilter(key)}
              className="shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-all hover:-translate-y-0.5"
              style={
                filter === key
                  ? key === "all" ? { background: C.pine, color: "#fff" } : { background: st.fg, color: "#fff" }
                  : key === "all" ? { background: "#fff", color: C.pine } : { background: st.bg, color: st.fg }
              }>
              {label} ({n})
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <Card><p className="text-sm text-stone-500">Bu filtrede mesaj yok.</p></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((r) => {
            const st = ST[r.status] ?? ST.new;
            return (
              <Card key={r.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-bold" style={{ color: C.pine }}>
                      {r.name || "—"}
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: st.bg, color: st.fg }}>
                        {st.label}
                      </span>
                    </p>
                    <p className="truncate text-xs text-stone-500">
                      {r.email}{r.phone ? ` · ${r.phone}` : ""}{r.lang ? ` · ${r.lang.toUpperCase()}` : ""}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-[11px] text-stone-400">{fmtDate(r.created_at)}</span>
                </div>

                <p className="mt-3 flex-1 whitespace-pre-wrap text-sm leading-relaxed text-stone-600">{r.message}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-center">
                  {r.email && (
                    <a href={`mailto:${r.email}`} onClick={() => setStatus(r.id, "replied")}
                       className="rounded-full bg-stone-100 px-4 py-2 text-xs font-bold text-stone-600">E-posta yaz</a>
                  )}
                  {r.phone && (
                    <a href={`https://wa.me/${String(r.phone).replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer"
                       onClick={() => setStatus(r.id, "replied")}
                       className="rounded-full px-4 py-2 text-xs font-bold text-white" style={{ background: "#25D366" }}>WhatsApp</a>
                  )}
                  <span className="flex gap-1.5 sm:ml-auto">
                    {["new", "read", "replied"].filter((s) => s !== r.status).map((s) => (
                      <button key={s} type="button" disabled={busy === r.id} onClick={() => setStatus(r.id, s)}
                        className="rounded-full px-3 py-1.5 text-[11px] font-bold transition-opacity disabled:opacity-40"
                        style={{ background: ST[s].bg, color: ST[s].fg }}>
                        {ST[s].label}
                      </button>
                    ))}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
