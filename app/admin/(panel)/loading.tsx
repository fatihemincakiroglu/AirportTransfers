// Sayfa geçişlerinde görünen yükleme durumu (üstte ilerleme çubuğu + iskelet)
const C = { pine: "#0C2E25", gold: "#C9A24B" };

export default function Loading() {
  return (
    <div>
      {/* Üst ilerleme çubuğu */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden bg-black/5">
        <div
          className="h-full rounded-r-full"
          style={{
            width: "40%",
            background: `linear-gradient(90deg, ${C.pine}, ${C.gold})`,
            animation: "admin-progress 1.1s ease-in-out infinite",
          }}
        />
      </div>

      {/* İskelet */}
      <div className="animate-pulse">
        <div className="mb-6">
          <div className="h-7 w-52 rounded-lg bg-stone-200" />
          <div className="mt-2 h-4 w-72 rounded bg-stone-100" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="h-3 w-24 rounded bg-stone-100" />
              <div className="mt-3 h-8 w-32 rounded-lg bg-stone-200" />
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded-2xl bg-white shadow-sm ring-1 ring-black/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
