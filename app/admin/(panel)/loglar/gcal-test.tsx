"use client";

import { useState } from "react";
import { C } from "../../ui";

type Step = { name: string; ok: boolean; info: string };

/** Google Takvim bağlantısını sınar; hangi adımda takıldığını gösterir */
export default function GcalTest() {
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ ok: boolean; steps: Step[] } | null>(null);

  const run = async () => {
    setBusy(true); setRes(null);
    const r = await fetch("/api/admin/gcal-test", { method: "POST" });
    setRes(await r.json().catch(() => ({ ok: false, steps: [{ name: "Sunucu", ok: false, info: "yanıt vermedi" }] })));
    setBusy(false);
  };

  return (
    <div className="max-w-md text-right">
      <button type="button" onClick={run} disabled={busy}
        className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm disabled:opacity-40"
        style={{ background: "#fff", color: C.pine, border: `1px solid ${C.pine}` }}>
        {busy ? "Sınanıyor…" : "📅 Takvim testi"}
      </button>

      {res && (
        <div className="mt-3 rounded-xl border p-3 text-left text-xs leading-relaxed"
             style={res.ok
               ? { borderColor: "#A7F3D0", background: "#ECFDF5", color: "#065F46" }
               : { borderColor: "#FECACA", background: "#FEF2F2", color: "#B91C1C" }}>
          <p><b>{res.ok ? "✓ Takvim bağlantısı çalışıyor." : "✕ Takvim bağlantısında sorun var."}</b></p>
          <ul className="mt-2 space-y-1">
            {res.steps.map((s) => (
              <li key={s.name} className="break-words">
                {s.ok ? "✓" : "✕"} <b>{s.name}:</b> {s.info}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
