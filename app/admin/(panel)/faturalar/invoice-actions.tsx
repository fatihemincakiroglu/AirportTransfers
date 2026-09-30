"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C } from "../../ui";

export default function InvoiceActions({ id, hasInvoice, sentAt, email }: { id: number; hasInvoice: boolean; sentAt?: string | null; email?: string | null }) {
  const [busy, setBusy] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  /** PDF üretilir, müşteriye (kendi dilinde) ve işletmeye kopya olarak gönderilir */
  const send = async () => {
    if (sentAt && !confirm("Bu fatura daha önce gönderildi. Tekrar gönderilsin mi?")) return;
    setSending(true); setMsg(null);
    const res = await fetch("/api/admin/invoice/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const d = await res.json().catch(() => ({}));
    setSending(false);
    if (d.ok) { setMsg(d.customer ? `Gönderildi → ${d.email}` : "Müşteri e-postası yok; kopya size gönderildi"); router.refresh(); }
    else setMsg(d.error ?? "Gönderilemedi");
  };

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
      <div className="flex flex-col items-end gap-1.5">
        <div className="flex gap-2">
          <a href={`/admin/faturalar/${id}`} className="rounded-full px-4 py-2 text-xs font-bold" style={{ background: C.pine, color: "#fff" }}>
            Faturayı aç
          </a>
          <button type="button" onClick={send} disabled={sending}
            title={email ? `PDF ekiyle ${email} adresine ve size gönderir` : "Müşteri e-postası yok; yalnızca size gönderir"}
            className="rounded-full px-4 py-2 text-xs font-bold transition-opacity disabled:opacity-40"
            style={{ background: sentAt ? "#F5F5F4" : C.gold, color: C.pine }}>
            {sending ? "Gönderiliyor…" : sentAt ? "Tekrar gönder" : "📨 E-posta ile gönder"}
          </button>
        </div>
        {(msg || sentAt) && (
          <span className="text-[11px] text-stone-500">
            {msg ?? `Gönderildi: ${new Date(sentAt!).toLocaleString("tr-TR", { timeZone: "Europe/Zurich", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}`}
          </span>
        )}
      </div>
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
