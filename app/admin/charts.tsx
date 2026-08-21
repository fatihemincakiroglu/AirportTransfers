"use client";

import { useState } from "react";
import { C } from "./ui";

// ── Ortak: fare ile gezinince beliren bilgi balonu ────────────
type Tip = { x: number; y: number; title: string; value: string } | null;

function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{ left: `${tip.x}%`, top: `${tip.y}%`, background: C.pine, color: "#fff", marginTop: -8 }}
    >
      <span className="block text-[10px] font-semibold uppercase tracking-wide" style={{ color: C.gold }}>{tip.title}</span>
      <span className="block text-sm font-bold">{tip.value}</span>
    </div>
  );
}

const GRAD = "atGrad";

function Defs() {
  return (
    <defs>
      <linearGradient id={GRAD} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.gold} stopOpacity="0.95" />
        <stop offset="100%" stopColor={C.pine} stopOpacity="0.85" />
      </linearGradient>
      <linearGradient id={`${GRAD}-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.gold} stopOpacity="0.32" />
        <stop offset="100%" stopColor={C.gold} stopOpacity="0.02" />
      </linearGradient>
    </defs>
  );
}

/** Eksen etiketleri için kısa sayı: 10684 → 10.7k */
export const compact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(".", ",")}k` : String(Math.round(n));

/**
 * Sunucu bileşeninden fonksiyon geçirilemediği için biçim,
 * serileştirilebilir bir anahtarla belirtilir.
 */
export type Fmt = "number" | "chf";
const full = (n: number, kind: Fmt = "number", suffix?: string) =>
  kind === "chf"
    ? `CHF ${n.toLocaleString("de-CH", { maximumFractionDigits: 0 })}`
    : `${Math.round(n).toLocaleString("de-CH")}${suffix ? " " + suffix : ""}`;

// ── Sütun grafiği: her sütunun değeri üstünde, hover'da balon ──
export function BarChart({
  data, kind = "number", suffix, unit,
}: {
  data: { label: string; value: number }[];
  kind?: Fmt;
  suffix?: string;
  unit?: string;
}) {
  const [tip, setTip] = useState<Tip>(null);
  if (!data.length) return <p className="py-10 text-center text-sm text-stone-400">Veri yok.</p>;

  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 760, H = 250, padL = 40, padB = 32, padT = 26;
  const innerW = W - padL - 12, innerH = H - padB - padT;
  const bw = innerW / data.length;
  const fmt = (n: number) => full(n, kind, suffix);

  return (
    <div className="relative">
      <Tooltip tip={tip} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseLeave={() => setTip(null)}>
        <Defs />
        {[0, 0.5, 1].map((r) => {
          const y = padT + innerH - innerH * r;
          return (
            <g key={r}>
              <line x1={padL} x2={W - 12} y1={y} y2={y} stroke="#EFEDE9" strokeWidth="1" strokeDasharray={r ? "3 6" : undefined} />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#B8B2A8">{compact(max * r)}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = Math.max((d.value / max) * innerH, d.value > 0 ? 3 : 0);
          const x = padL + i * bw + bw * 0.18;
          const w = bw * 0.64;
          const top = padT + innerH - h;
          const isLast = i === data.length - 1;
          return (
            <g key={d.label + i}
               onMouseEnter={() => setTip({ x: ((x + w / 2) / W) * 100, y: (top / H) * 100, title: d.label, value: fmt(d.value) })}>
              {/* geniş yakalama alanı */}
              <rect x={padL + i * bw} y={padT} width={bw} height={innerH} fill="transparent" />
              <rect x={x} y={top} width={w} height={h} rx="4" fill={`url(#${GRAD})`} opacity={isLast ? 1 : 0.8} />
              {/* her sütunun değeri */}
              <text x={x + w / 2} y={top - 7} textAnchor="middle" fontSize="11" fontWeight="700" fill={isLast ? C.pine : "#78716C"}>
                {compact(d.value)}
              </text>
              <text x={x + w / 2} y={H - 10} textAnchor="middle" fontSize="11" fontWeight={isLast ? "700" : "500"} fill={isLast ? C.pine : "#A8A29E"}>
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {unit && <p className="mt-1 text-right text-[11px] text-stone-400">{unit}</p>}
    </div>
  );
}

// ── Alan grafiği: noktaların üstünde değer, hover'da balon ──
export function AreaChart({ data, kind = "number", suffix }: { data: { label: string; value: number }[]; kind?: Fmt; suffix?: string }) {
  const [tip, setTip] = useState<Tip>(null);
  if (data.length < 2) return <p className="py-10 text-center text-sm text-stone-400">Yeterli veri yok.</p>;

  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 760, H = 230, padL = 44, padB = 30, padT = 30;
  const innerW = W - padL - 14, innerH = H - padB - padT;
  const fmt = (n: number) => full(n, kind, suffix);
  const px = (i: number) => padL + (i / (data.length - 1)) * innerW;
  const py = (v: number) => padT + innerH - (v / max) * innerH;
  const line = data.map((d, i) => `${px(i)},${py(d.value)}`).join(" ");
  const area = `${padL},${padT + innerH} ${line} ${padL + innerW},${padT + innerH}`;

  return (
    <div className="relative">
      <Tooltip tip={tip} />
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" onMouseLeave={() => setTip(null)}>
        <Defs />
        {[0, 0.5, 1].map((r) => {
          const y = padT + innerH - innerH * r;
          return (
            <g key={r}>
              <line x1={padL} x2={W - 14} y1={y} y2={y} stroke="#EFEDE9" strokeWidth="1" strokeDasharray={r ? "3 6" : undefined} />
              <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#B8B2A8">{compact(max * r)}</text>
            </g>
          );
        })}
        <polygon points={area} fill={`url(#${GRAD}-area)`} />
        <polyline points={line} fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => {
          const x = px(i), y = py(d.value);
          const isLast = i === data.length - 1;
          return (
            <g key={d.label + i}
               onMouseEnter={() => setTip({ x: (x / W) * 100, y: (y / H) * 100, title: d.label, value: fmt(d.value) })}>
              <rect x={x - innerW / (data.length * 2)} y={padT} width={innerW / data.length} height={innerH} fill="transparent" />
              <circle cx={x} cy={y} r={isLast ? 5 : 3.5} fill="#fff" stroke={isLast ? C.pine : C.gold} strokeWidth="2.5" />
              <text x={x} y={y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill={isLast ? C.pine : "#A8A29E"}>
                {compact(d.value)}
              </text>
              <text x={x} y={H - 10} textAnchor="middle" fontSize="11" fontWeight={isLast ? "700" : "500"} fill={isLast ? C.pine : "#A8A29E"}>
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Halka grafik ──
export function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return <p className="py-10 text-center text-sm text-stone-400">Veri yok.</p>;

  const R = 62, r = 40, cx = 80, cy = 80;
  const starts: number[] = [];
  data.reduce((acc, d) => { starts.push(acc); return acc + d.value / total; }, 0);

  const arc = (startFrac: number, frac: number, grow = 0) => {
    const a0 = -Math.PI / 2 + startFrac * Math.PI * 2;
    const a1 = a0 + frac * Math.PI * 2;
    const big = frac > 0.5 ? 1 : 0;
    const R2 = R + grow;
    const p = (rad: number, a: number) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
    const [x0, y0] = p(R2, a0), [x1, y1] = p(R2, a1), [x2, y2] = p(r, a1), [x3, y3] = p(r, a0);
    return `M${x0},${y0} A${R2},${R2} 0 ${big} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${big} 0 ${x3},${y3} Z`;
  };

  const shown = hover !== null ? data[hover] : null;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 shrink-0" onMouseLeave={() => setHover(null)}>
        {data.map((d, i) => (
          <path key={d.label} d={arc(starts[i], d.value / total, hover === i ? 4 : 0)} fill={d.color}
                opacity={hover === null || hover === i ? 1 : 0.35}
                onMouseEnter={() => setHover(i)} style={{ transition: "opacity .2s" }} />
        ))}
        <text x="80" y="76" textAnchor="middle" fontSize="24" fontWeight="700" fill={C.pine}>
          {shown ? shown.value : total}
        </text>
        <text x="80" y="94" textAnchor="middle" fontSize="8" fontWeight="700" fill="#A8A29E" letterSpacing="1.2">
          {shown ? shown.label.toUpperCase().slice(0, 14) : "TOPLAM"}
        </text>
      </svg>
      <ul className="min-w-[150px] flex-1 space-y-2">
        {data.map((d, i) => (
          <li key={d.label}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              className="flex cursor-default items-center gap-2.5 rounded-lg px-2 py-1 text-sm transition-colors"
              style={{ background: hover === i ? "#FBF9F3" : "transparent" }}>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 truncate text-stone-600">{d.label}</span>
            <span className="font-bold tabular-nums" style={{ color: C.pine }}>{d.value}</span>
            <span className="w-10 text-right text-xs text-stone-400">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Yatay sıralama çubukları ──
export function RankBars({ rows, kind = "number", suffix, accent }: { rows: { label: string; value: number }[]; kind?: Fmt; suffix?: string; accent?: string }) {
  if (!rows.length) return <p className="py-6 text-sm text-stone-400">Veri yok.</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const fmt = (n: number) => full(n, kind, suffix);
  return (
    <div className="space-y-3.5">
      {rows.map((r, i) => (
        <div key={r.label} className="group">
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className="w-4 shrink-0 text-[11px] font-bold text-stone-300">{i + 1}</span>
              <span className="truncate font-medium text-stone-700">{r.label}</span>
            </span>
            <span className="shrink-0 font-bold tabular-nums" style={{ color: C.pine }}>{fmt(r.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full transition-all group-hover:opacity-80"
                 style={{ width: `${(r.value / max) * 100}%`, background: accent ?? `linear-gradient(90deg, ${C.pine}, ${C.gold})` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
