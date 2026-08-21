// Panelde ortak kullanılan küçük parçalar
export const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

export const STATUS_LABEL: Record<string, string> = {
  new: "Yeni", confirmed: "Onaylandı", done: "Tamamlandı", cancelled: "İptal",
};
export const STATUS_STYLE: Record<string, { background: string; color: string }> = {
  new:       { background: "#FEF3C7", color: "#92400E" }, // amber
  confirmed: { background: "#DBEAFE", color: "#1E40AF" }, // mavi
  done:      { background: "#D1FAE5", color: "#065F46" }, // yeşil
  cancelled: { background: "#FEE2E2", color: "#B91C1C" }, // kırmızı
};

/** Seçili durum düğmesinin dolu (koyu) hâli */
export const STATUS_SOLID: Record<string, { background: string; color: string }> = {
  new:       { background: "#D97706", color: "#fff" },
  confirmed: { background: "#1D4ED8", color: "#fff" },
  done:      { background: "#059669", color: "#fff" },
  cancelled: { background: "#DC2626", color: "#fff" },
};

/** Takvimde gün noktası / sol şerit rengi */
export const STATUS_DOT: Record<string, string> = {
  new: "#D97706", confirmed: "#1D4ED8", done: "#059669", cancelled: "#DC2626",
};

export function StatusPill({ status }: { status: string }) {
  const st = STATUS_STYLE[status] ?? STATUS_STYLE.new;
  return (
    <span className="inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold" style={st}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5 md:mb-6">
      <h1 className="text-xl font-semibold sm:text-2xl" style={{ color: C.pine }}>{title}</h1>
      {sub && <p className="mt-1 text-xs text-stone-500 sm:text-sm">{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5 ${className}`}>{children}</div>;
}

export function NoDb() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm">
      <b>Veritabanı bağlı değil.</b>
      <p className="mt-1 text-stone-600">
        <code>DATABASE_URL</code> ortam değişkenini tanımlayın (Neon/Vercel Postgres). Tanımlandığında tablolar otomatik oluşur.
      </p>
    </div>
  );
}

export const fmtDate = (d: Date | string) =>
  new Date(d).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
