"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

export default function LoginClient() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setBusy(true); setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (res.ok) { router.push("/admin"); router.refresh(); }
    else if (res.status === 500) setErr("Panel henüz yapılandırılmamış (ADMIN_PASSWORD / AUTH_SECRET eksik).");
    else setErr("Parola hatalı.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-5" style={{ background: C.ivory }}>
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>Airport Zurich Transfer</p>
        <h1 className="mt-1 text-2xl font-semibold" style={{ color: C.pine }}>Panel girişi</h1>

        <input
          type="password"
          value={pw}
          autoFocus
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && pw) submit(); }}
          placeholder="Parola"
          className="mt-6 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-[#C9A24B]"
        />
        {err && <p className="mt-3 text-sm font-semibold text-red-600">{err}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={!pw || busy}
          className="mt-5 w-full rounded-xl py-3 text-sm font-extrabold uppercase tracking-wide transition-opacity disabled:opacity-40"
          style={{ background: C.gold, color: C.pine }}
        >
          {busy ? "Kontrol ediliyor…" : "Giriş yap"}
        </button>
      </div>
    </div>
  );
}
