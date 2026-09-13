"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { C, Card } from "../../ui";

type Delivery = { id: number; destination: string; status: string; reason: string | null; attempts: number; http: number | null; error: string | null };
export type OutboxRow = { id: number; event_name: string; event_id: string; ref: string | null; occurred_at: string; deliveries: Delivery[] };

const EVENT_TR: Record<string, string> = {
  booking_complete: "Satış (kabul)", booking_declined: "Talep reddi", booking_cancelled: "İptal", booking_refunded: "İade",
  booking_no_show: "Gelmedi", booking_completed: "Tamamlandı", payment_success: "Ödeme alındı",
  lead_created: "Lead oluştu", lead_status_changed: "Lead durumu",
};
const DEST_TR: Record<string, string> = { ga4: "GA4", meta_capi: "Meta" };

/** Durum → renk ve kısa açıklama */
const STATUS: Record<string, { bg: string; fg: string; label: string }> = {
  pending:            { bg: "#FEF3C7", fg: "#92400E", label: "Bekliyor" },
  retryable_failed:   { bg: "#FEF3C7", fg: "#92400E", label: "Tekrar denenecek" },
  transport_accepted: { bg: "#D1FAE5", fg: "#065F46", label: "Gönderildi" },
  accepted:           { bg: "#D1FAE5", fg: "#065F46", label: "Gönderildi" },
  permanent_failed:   { bg: "#FEE2E2", fg: "#B91C1C", label: "Reddedildi" },
  dead_lettered:      { bg: "#FEE2E2", fg: "#B91C1C", label: "Vazgeçildi" },
  delivery_unknown:   { bg: "#FEE2E2", fg: "#B91C1C", label: "Belirsiz" },
  expired:            { bg: "#F3F4F6", fg: "#6B7280", label: "Süresi doldu" },
  manual_reconciliation: { bg: "#FEE2E2", fg: "#B91C1C", label: "Elle kontrol" },
  suppressed_unconfigured: { bg: "#F3F4F6", fg: "#6B7280", label: "Yapılandırılmadı" },
  suppressed_consent: { bg: "#F3F4F6", fg: "#6B7280", label: "Onay yok" },
  suppressed_no_match_data: { bg: "#F3F4F6", fg: "#6B7280", label: "Eşleşme verisi yok" },
  skipped_missing_identifier: { bg: "#F3F4F6", fg: "#6B7280", label: "GA kimliği yok" },
  suppressed_unapproved_revenue_model: { bg: "#F3F4F6", fg: "#6B7280", label: "Satış onayı kapalı" },
  suppressed_channel: { bg: "#F3F4F6", fg: "#6B7280", label: "Web dışı kanal" },
};
const REQUEUEABLE = ["suppressed_unconfigured", "suppressed_unapproved_revenue_model", "dead_lettered", "retryable_failed", "pending"];

export default function MeasurementQueue({ rows, config }: {
  rows: OutboxRow[];
  config: { ga4: boolean; meta: boolean; purchaseApproved: boolean };
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const call = async (body: Record<string, unknown>) => {
    setBusy(true);
    await fetch("/api/admin/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setBusy(false);
    router.refresh();
  };

  const chip = (ok: boolean, label: string) => (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={ok ? { background: "#D1FAE5", color: "#065F46" } : { background: "#F3F4F6", color: "#6B7280" }}>
      {label}: {ok ? "açık" : "kapalı"}
    </span>
  );

  return (
    <Card className="mb-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => setOpen((o) => !o)} className="text-left">
          <p className="text-sm font-bold" style={{ color: C.pine }}>📡 Ölçüm kuyruğu (GA4 / Meta) <span className="text-stone-400">{open ? "▴" : "▾"}</span></p>
          <p className="mt-1 flex flex-wrap gap-1.5">
            {chip(config.ga4, "GA4")}{chip(config.meta, "Meta")}{chip(config.purchaseApproved, "Satış onayı")}
            <span className="text-[11px] text-stone-400">· son {rows.length} olay</span>
          </p>
        </button>
        <button type="button" disabled={busy} onClick={() => call({ action: "run" })}
          className="rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide shadow-sm disabled:opacity-40"
          style={{ background: C.gold, color: C.pine }}>
          {busy ? "İşleniyor…" : "Bekleyenleri gönder"}
        </button>
      </div>

      {open && (
        <div className="mt-4 overflow-x-auto">
          {rows.length === 0 ? (
            <p className="text-sm text-stone-500">Henüz olay yok. İlk kabul/iptal/iletişim kaydıyla burada görünür.</p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wide text-stone-400">
                  <th className="py-1.5 pr-3">Olay</th><th className="py-1.5 pr-3">Kayıt</th><th className="py-1.5 pr-3">Zaman</th>
                  <th className="py-1.5 pr-3">GA4</th><th className="py-1.5">Meta</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-stone-100 align-top">
                    <td className="py-2 pr-3 font-semibold text-stone-700">{EVENT_TR[r.event_name] ?? r.event_name}</td>
                    <td className="py-2 pr-3 font-bold" style={{ color: C.pine }}>{r.ref ?? "—"}</td>
                    <td className="py-2 pr-3 whitespace-nowrap text-stone-500">{new Date(r.occurred_at).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</td>
                    {["ga4", "meta_capi"].map((dest) => {
                      const d = r.deliveries.find((x) => x.destination === dest);
                      if (!d) return <td key={dest} className="py-2 pr-3 text-stone-300">—</td>;
                      const st = STATUS[d.status] ?? { bg: "#F5F5F4", fg: "#57534E", label: d.status };
                      return (
                        <td key={dest} className="py-2 pr-3">
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: st.bg, color: st.fg }} title={[d.reason, d.http ? `HTTP ${d.http}` : null, d.error].filter(Boolean).join(" · ")}>
                            {st.label}
                          </span>
                          {d.attempts > 0 && <span className="ml-1 text-[10px] text-stone-400">×{d.attempts}</span>}
                          {REQUEUEABLE.includes(d.status) && (
                            <button type="button" disabled={busy} onClick={() => call({ action: "requeue", deliveryId: d.id, outboxId: r.id })}
                              className="ml-1.5 text-[10px] font-bold underline-offset-2 hover:underline disabled:opacity-40" style={{ color: C.pine }}>
                              yeniden
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-stone-400">
            {DEST_TR.ga4}: Google Analytics Measurement Protocol · {DEST_TR.meta}: Conversions API. Olaylar yanıt sonrasında hemen denenir; kalanlar her gece 03:00&apos;te ve bu düğmeyle işlenir.
            &quot;Yapılandırılmadı&quot; = Vercel ortam değişkenleri eksik. &quot;Onay yok&quot; = müşteri çerez bandında izin vermemiş.
          </p>
        </div>
      )}
    </Card>
  );
}
