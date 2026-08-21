"use client";

const C = { pine: "#0C2E25", gold: "#C9A24B" };

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-wide shadow-sm"
      style={{ background: C.gold, color: C.pine }}
    >
      Yazdır / PDF kaydet
    </button>
  );
}
