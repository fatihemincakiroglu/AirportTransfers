// Bağımlılıksız SVG grafikler — panelin premium görsel diline uygun
import { C } from "./ui";

const GRAD_ID = "atGoldPine";

/** Degrade tanımı (bir kez basılır) */
function Defs() {
  return (
    <defs>
      <linearGradient id={GRAD_ID} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.gold} stopOpacity="0.95" />
        <stop offset="100%" stopColor={C.pine} stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id={`${GRAD_ID}-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={C.gold} stopOpacity="0.35" />
        <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/** Yumuşak degradeli sütun grafiği */
export function BarChart({
  data, valueLabel, format,
}: {
  data: { label: string; value: number }[];
  valueLabel: string;
  format?: (n: number) => string;
}) {
  if (!data.length) return <p className="py-10 text-center text-sm text-stone-400">Veri yok.</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 720, H = 230, padL = 52, padB = 30, padT = 14;
  const innerW = W - padL - 10, innerH = H - padB - padT;
  const bw = innerW / data.length;
  const fmt = format ?? ((n: number) => String(Math.round(n)));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={valueLabel}>
      <Defs />
      {[0, 0.25, 0.5, 0.75, 1].map((r) => {
        const y = padT + innerH - innerH * r;
        return (
          <g key={r}>
            <line x1={padL} x2={W - 10} y1={y} y2={y} stroke="#EFEDE9" strokeWidth="1" strokeDasharray={r ? "3 5" : undefined} />
            <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="10" fontWeight="600" fill="#B8B2A8">{fmt(max * r)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const h = Math.max((d.value / max) * innerH, d.value > 0 ? 3 : 0);
        const x = padL + i * bw + bw * 0.2;
        const w = bw * 0.6;
        const isLast = i === data.length - 1;
        return (
          <g key={d.label + i}>
            <rect x={x} y={padT + innerH - h} width={w} height={h} rx="4"
              fill={`url(#${GRAD_ID})`} opacity={isLast ? 1 : 0.78}>
              <title>{`${d.label}: ${fmt(d.value)}`}</title>
            </rect>
            {isLast && d.value > 0 && (
              <text x={x + w / 2} y={padT + innerH - h - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.pine}>
                {fmt(d.value)}
              </text>
            )}
            <text x={x + w / 2} y={H - 9} textAnchor="middle" fontSize="10" fontWeight={isLast ? "700" : "500"} fill={isLast ? C.pine : "#A8A29E"}>
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Alan grafiği — trend göstermek için */
export function AreaChart({ data, format }: { data: { label: string; value: number }[]; format?: (n: number) => string }) {
  if (data.length < 2) return <p className="py-10 text-center text-sm text-stone-400">Yeterli veri yok.</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  const W = 720, H = 210, padL = 52, padB = 28, padT = 16;
  const innerW = W - padL - 10, innerH = H - padB - padT;
  const fmt = format ?? ((n: number) => String(Math.round(n)));
  const pt = (i: number, v: number) => [padL + (i / (data.length - 1)) * innerW, padT + innerH - (v / max) * innerH] as const;
  const line = data.map((d, i) => pt(i, d.value).join(",")).join(" ");
  const area = `${padL},${padT + innerH} ${line} ${padL + innerW},${padT + innerH}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      <Defs />
      {[0, 0.5, 1].map((r) => {
        const y = padT + innerH - innerH * r;
        return (
          <g key={r}>
            <line x1={padL} x2={W - 10} y1={y} y2={y} stroke="#EFEDE9" strokeWidth="1" />
            <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="10" fontWeight="600" fill="#B8B2A8">{fmt(max * r)}</text>
          </g>
        );
      })}
      <polygon points={area} fill={`url(#${GRAD_ID}-area)`} />
      <polyline points={line} fill="none" stroke={C.gold} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => {
        const [x, y] = pt(i, d.value);
        return (
          <g key={d.label + i}>
            <circle cx={x} cy={y} r={i === data.length - 1 ? 4.5 : 3} fill="#fff" stroke={C.pine} strokeWidth="2">
              <title>{`${d.label}: ${fmt(d.value)}`}</title>
            </circle>
            <text x={x} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="500" fill="#A8A29E">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** Halka grafik — durum/dil dağılımı */
export function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return <p className="py-10 text-center text-sm text-stone-400">Veri yok.</p>;
  const R = 62, r = 40, cx = 80, cy = 80;

  // Her dilim için başlangıç açısı önceden hesaplanır (mutasyon yok)
  const starts: number[] = [];
  data.reduce((acc, d) => { starts.push(acc); return acc + d.value / total; }, 0);

  const arc = (startFrac: number, frac: number) => {
    const a0 = -Math.PI / 2 + startFrac * Math.PI * 2;
    const a1 = a0 + frac * Math.PI * 2;
    const big = frac > 0.5 ? 1 : 0;
    const p = (rad: number, a: number) => [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
    const [x0, y0] = p(R, a0), [x1, y1] = p(R, a1), [x2, y2] = p(r, a1), [x3, y3] = p(r, a0);
    return `M${x0},${y0} A${R},${R} 0 ${big} 1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 ${big} 0 ${x3},${y3} Z`;
  };

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 shrink-0">
        {data.map((d, i) => (
          <path key={d.label} d={arc(starts[i], d.value / total)} fill={d.color}>
            <title>{`${d.label}: ${d.value}`}</title>
          </path>
        ))}
        <text x="80" y="76" textAnchor="middle" fontSize="24" fontWeight="700" fill={C.pine}>{total}</text>
        <text x="80" y="94" textAnchor="middle" fontSize="9" fontWeight="700" fill="#A8A29E" letterSpacing="1.5">TOPLAM</text>
      </svg>
      <ul className="min-w-[140px] flex-1 space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2.5 text-sm">
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

/** Yatay sıralama çubukları */
export function RankBars({ rows, format, accent }: { rows: { label: string; value: number }[]; format?: (n: number) => string; accent?: string }) {
  if (!rows.length) return <p className="py-6 text-sm text-stone-400">Veri yok.</p>;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const fmt = format ?? ((n: number) => String(n));
  return (
    <div className="space-y-3.5">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span className="w-4 shrink-0 text-[11px] font-bold text-stone-300">{i + 1}</span>
              <span className="truncate font-medium text-stone-700">{r.label}</span>
            </span>
            <span className="shrink-0 font-bold tabular-nums" style={{ color: C.pine }}>{fmt(r.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full transition-all"
              style={{ width: `${(r.value / max) * 100}%`, background: accent ?? `linear-gradient(90deg, ${C.pine}, ${C.gold})` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
