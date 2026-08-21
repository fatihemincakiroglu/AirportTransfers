import { sql, ensureSchema, dbReady } from "../../../lib/db";
import { C, Card, PageTitle, NoDb, StatusPill, fmtDate } from "../../ui";
import InvoiceActions from "./invoice-actions";

export const dynamic = "force-dynamic";

type Row = {
  id: number; ref: string; status: string; price: string | null; invoice_no: string | null;
  invoiced_at: string | null; first_name: string | null; last_name: string | null;
  ride_date: string | null; pickup: string | null; dropoff: string | null; created_at: string;
};

export default async function Page() {
  if (!dbReady) return (<><PageTitle title="Faturalar" /><NoDb /></>);
  await ensureSchema();

  const rows = (await sql`
    SELECT id, ref, status, price, invoice_no, invoiced_at, first_name, last_name,
           ride_date, pickup, dropoff, created_at
    FROM bookings
    WHERE status IN ('confirmed','done')
    ORDER BY (invoice_no IS NOT NULL), created_at DESC
    LIMIT 300`) as unknown as Row[];

  const invoiced = rows.filter((r) => r.invoice_no);
  const total = invoiced.reduce((s, r) => s + Number(r.price ?? 0), 0);

  return (
    <>
      <PageTitle title="Faturalar" sub="Onaylı ve tamamlanmış yolculuklar için fatura oluşturun" />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        {([
          ["Faturalanabilir", String(rows.length)],
          ["Kesilen fatura", String(invoiced.length)],
          ["Faturalanan tutar", `CHF ${total.toFixed(2)}`],
        ] as [string, string][]).map(([l, v]) => (
          <Card key={l}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400">{l}</p>
            <p className="mt-2 text-2xl font-semibold" style={{ color: C.pine }}>{v}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-x-auto p-0">
        {rows.length === 0 ? (
          <p className="p-6 text-sm text-stone-500">
            Faturalanacak kayıt yok. Bir rezervasyonu &quot;Onaylandı&quot; ya da &quot;Tamamlandı&quot; yaptığınızda burada görünür.
          </p>
        ) : (
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                <th className="px-5 py-3">Fatura no</th><th className="px-4 py-3">Ref</th>
                <th className="px-4 py-3">Müşteri</th><th className="px-4 py-3">Güzergâh</th>
                <th className="px-4 py-3">Yolculuk</th><th className="px-4 py-3">Tutar</th>
                <th className="px-4 py-3">Durum</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3 font-bold" style={{ color: r.invoice_no ? C.pine : "#D6D3D1" }}>
                    {r.invoice_no ?? "—"}
                    {r.invoiced_at && <span className="block text-[10px] font-medium text-stone-400">{fmtDate(r.invoiced_at)}</span>}
                  </td>
                  <td className="px-4 py-3 text-stone-500">{r.ref}</td>
                  <td className="px-4 py-3">{[r.first_name, r.last_name].filter(Boolean).join(" ") || "—"}</td>
                  <td className="px-4 py-3 text-stone-600">{r.pickup} → {r.dropoff}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-stone-600">{r.ride_date}</td>
                  <td className="px-4 py-3 tabular-nums">{r.price ? `CHF ${Number(r.price).toFixed(2)}` : "—"}</td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                  <td className="px-4 py-3 text-right"><InvoiceActions id={r.id} hasInvoice={!!r.invoice_no} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <p className="mt-4 text-xs leading-relaxed text-stone-400">
        Faturalar CHF cinsinden, KDV dahil tutar üzerinden hesaplanır (İsviçre yolcu taşımacılığı oranı %8.1).
        Fatura ekranından tarayıcının yazdır menüsüyle PDF olarak kaydedebilirsiniz.
      </p>
    </>
  );
}
