// Panelde ortak kullanılan küçük parçalar
export const C = { pine: "#0C2E25", gold: "#C9A24B", ivory: "#FAFAF7" };

export const STATUS_LABEL: Record<string, string> = {
  new: "Yeni", confirmed: "Onaylandı", done: "Tamamlandı", cancelled: "İptal",
};
export const STATUS_STYLE: Record<string, { background: string; color: string }> = {
  new:       { background: "#FEF3C7", color: "#92400E" },
  confirmed: { background: "#DBEAFE", color: "#1E40AF" },
  done:      { background: "#D1FAE5", color: "#065F46" },
  cancelled: { background: "#F3F4F6", color: "#6B7280" },
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
    <div className="mb-6">
      <h1 className="text-2xl font-semibold" style={{ color: C.pine }}>{title}</h1>
      {sub && <p className="mt-1 text-sm text-stone-500">{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 ${className}`}>{children}</div>;
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
