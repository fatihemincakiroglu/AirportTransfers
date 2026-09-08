"use client";

import { useState } from "react";
import { C } from "../../ui";

/** Google Takvim toplu aktarım düğmesi */
export default function GcalSync({ ready }: { ready: boolean }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  if (!ready) {
    return (
      <span className="rounded-full bg-stone-100 px-4 py-2 text-[11px] font-bold text-stone-400">
        Google Takvim bağlı değil
      </span>
    );
  }

  const run = async () => {
    setBusy(true); setMsg("");
    const res = await fetch("/api/admin/gcal-sync", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    setMsg(data.ok ? `${data.synced} yolculuk aktarıldı` : "Aktarılamadı");
  };

  return (
    <span className="flex items-center gap-3">
      {msg && <span className="text-xs font-semibold text-stone-500">{msg}</span>}
      <button type="button" onClick={run} disabled={busy}
        className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm disabled:opacity-40"
        style={{ background: C.gold, color: C.pine }}>
        {busy ? "Aktarılıyor…" : "📅 Takvime aktar"}
      </button>
    </span>
  );
}
