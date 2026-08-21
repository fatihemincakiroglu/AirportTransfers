"use client";

import Link from "next/link";
import { C, Card, StatusPill, STATUS_DOT } from "../ui";

export type Trip = {
  id: number; ref: string; status: string; ride_time: string | null; ride_date: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null; vehicle: string | null;
  price: string | null; pax: number | null; flight: string | null;
  first_name: string | null; last_name: string | null; phone: string | null;
  driver_name: string | null;
};

/** Tek yolculuk satırı — tıklanınca rezervasyon detayına gider */
export default function TripRow({ t }: { t: Trip }) {
  return (
    <Link href={`/admin/rezervasyonlar?ref=${encodeURIComponent(t.ref)}`}
          className="block transition-transform hover:-translate-y-0.5">
      <Card className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
        <span className="w-14 shrink-0 text-base font-semibold tabular-nums sm:w-16 sm:text-lg"
              style={{ color: STATUS_DOT[t.status] ?? C.pine }}>
          {t.ride_time || "--:--"}
        </span>
        <span className="min-w-0 flex-1 basis-[60%]">
          <span className="block break-words text-sm font-medium text-stone-700">{t.pickup} → {t.dropoff}</span>
          <span className="block text-xs text-stone-400">
            {[t.first_name, t.last_name].filter(Boolean).join(" ")}
            {t.pax ? ` · ${t.pax} kişi` : ""}
            {t.flight ? ` · ✈ ${t.flight}` : ""}
            {t.stops ? ` · durak: ${t.stops}` : ""}
          </span>
        </span>
        <span className="text-xs" style={{ color: t.driver_name ? C.pine : "#DC2626" }}>
          {t.driver_name ? `👤 ${t.driver_name}` : "şoför atanmadı"}
        </span>
        {t.price && <span className="text-sm font-bold tabular-nums" style={{ color: C.pine }}>CHF {Number(t.price).toFixed(2)}</span>}
        <StatusPill status={t.status} />
        {t.phone && (
          <a
            href={`https://wa.me/${t.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full px-3 py-1.5 text-[11px] font-bold text-white"
            style={{ background: "#25D366" }}
          >
            WhatsApp
          </a>
        )}
      </Card>
    </Link>
  );
}
