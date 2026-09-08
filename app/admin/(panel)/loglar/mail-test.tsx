"use client";

import { useState } from "react";
import { C } from "../../ui";

/** E-posta ayarlarını sınar ve sonucu ekranda gösterir */
export default function MailTest() {
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ ok: boolean; reason?: string; to?: string; detail?: Record<string, string> } | null>(null);

  const run = async () => {
    setBusy(true); setRes(null);
    const r = await fetch("/api/admin/mail-test", { method: "POST" });
    setRes(await r.json().catch(() => ({ ok: false, reason: "Sunucu yanıt vermedi" })));
    setBusy(false);
  };

  return (
    <div className="max-w-md text-right">
      <button type="button" onClick={run} disabled={busy}
        className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm disabled:opacity-40"
        style={{ background: C.gold, color: C.pine }}>
        {busy ? "Gönderiliyor…" : "✉ E-posta testi"}
      </button>

      {res && (
        <div className="mt-3 rounded-xl border p-3 text-left text-xs leading-relaxed"
             style={res.ok
               ? { borderColor: "#A7F3D0", background: "#ECFDF5", color: "#065F46" }
               : { borderColor: "#FECACA", background: "#FEF2F2", color: "#B91C1C" }}>
          {res.ok ? (
            <p><b>✓ Gönderildi.</b> {res.to} adresini kontrol edin (spam klasörü dahil).</p>
          ) : (
            <>
              <p><b>✕ Gönderilemedi.</b></p>
              <p className="mt-1 break-words">{res.reason}</p>
              {res.detail && (
                <ul className="mt-2 space-y-0.5">
                  {Object.entries(res.detail).map(([k, v]) => <li key={k}>{k}: <b>{v}</b></li>)}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
