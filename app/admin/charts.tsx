// Basit, bağımlılıksız SVG grafikler (harici kütüphane kullanmaz)
import { C } from "./ui";

/** Aylık sütun grafiği — değer + ikincil değer (ciro) birlikte */
export function BarChart({
  data, valueLabel, format,
}: {
  data: { label: string; value: number }[];
  valueLabel: string;
  format?: (n: number) => string;
}) {
  if (!data.length) return <p className="py-8 text-center text-sm text-stone-400">Veri yok.</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 720, H = 220, padL = 44, padB = 28, padT = 10;
  const innerW = W - padL - 8, innerH = H - padB - padT;
  const bw = innerW / data.length;
  const fmt = format ?? ((n: number) => String(n));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={valueLabel}>
      {/* yatay kılavuz çizgileri */}
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = padT + innerH - innerH * r;
        return (
          <g key={r}>
            <line x1={padL} x2={W - 8} y1={y} y2={y} stroke="#E7E5E4" strokeWidth="1" />
            <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#A8A29E">{fmt(max * r)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = padL + i * bw + bw * 0.18;
        const w = bw * 0.64;
        return (
          <g key={d.label}>
            <rect x={x} y={padT + innerH - h} width={w} height={h} rx="3" fill={C.pine} opacity={0.85}>
              <title>{`${d.label}: ${fmt(d.value)}`}</title>
            </rect>
            <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#78716C">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Yatay çubuklu sıralama listesi (en çok gidilen rotalar vb.) */
export function RankBars({ rows, format }: { rows: { label: string; value: number }[]; format?: (n: number) => string }) {
  if (!rows.length) return <p className="py-6 text-sm text-stone-400">Veri yok.</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const fmt = format ?? ((n: number) => String(n));
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-medium text-stone-700">{r.label}</span>
            <span className="shrink-0 tabular-nums font-bold" style={{ color: C.pine }}>{fmt(r.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: C.gold }} />
          </div>
        </div>
      ))}
    </div>
  );
}
