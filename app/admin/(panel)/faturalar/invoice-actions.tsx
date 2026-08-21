"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "../../ui";

export default function InvoiceActions({ id, hasInvoice }: { id: number; hasInvoice: boolean }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const create = async () => {
    setBusy(true);
    const res = await fetch("/api/admin/invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
  };

  if (hasInvoice) {
    return (
      <a href={`/admin/faturalar/${id}`} className="rounded-full px-4 py-2 text-xs font-bold" style={{ background: C.pine, color: "#fff" }}>
        Faturayı aç
      </a>
    );
  }
  return (
    <button type="button" onClick={create} disabled={busy}
      className="rounded-full px-4 py-2 text-xs font-bold transition-opacity disabled:opacity-40"
      style={{ background: C.gold, color: C.pine }}>
      {busy ? "Oluşturuluyor…" : "Fatura oluştur"}
    </button>
  );
}
