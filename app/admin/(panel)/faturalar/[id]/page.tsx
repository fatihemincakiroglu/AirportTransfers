import { notFound } from "next/navigation";
import { sql, ensureSchema, dbReady, VAT_RATE } from "../../../../lib/db";
import { COMPANY_NAME, COMPANY_REG, COMPANY_ADDRESS, CONTACT_EMAIL, PHONE_DISPLAY } from "../../../../config";
import PrintButton from "./print-button";

export const dynamic = "force-dynamic";

const C = { pine: "#0C2E25", gold: "#C9A24B" };

type Row = {
  id: number; ref: string; invoice_no: string | null; invoiced_at: string | null;
  price: string | null; payment: string | null; vehicle: string | null;
  pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!dbReady) notFound();
  await ensureSchema();

  const [b] = (await sql`
    SELECT id, ref, invoice_no, invoiced_at, price, payment, vehicle, pickup, dropoff, stops,
           ride_date, ride_time, pax, first_name, last_name, email, phone
    FROM bookings WHERE id = ${Number(id)}`) as unknown as Row[];

  if (!b || !b.invoice_no) notFound();

  const gross = Number(b.price ?? 0);
  const net = gross / (1 + VAT_RATE);
  const vat = gross - net;
  const chf = (n: number) => n.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const dateStr = b.invoiced_at ? new Date(b.invoiced_at).toLocaleDateString("de-CH") : "";

  return (
    <div className="min-h-screen bg-stone-100 py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl px-5 print:px-0">
        <div className="mb-4 flex gap-3 print:hidden">
          <PrintButton />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/admin/faturalar" className="rounded-full bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-stone-600 shadow-sm">
            Listeye dön
          </a>
        </div>

        <div className="bg-white p-10 shadow-sm print:p-0 print:shadow-none">
          {/* Başlık */}
          <div className="flex items-start justify-between gap-6 border-b-2 pb-6" style={{ borderColor: C.gold }}>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.gold }}>
                Airport Zurich Transfer
              </p>
              <h1 className="mt-1 text-3xl font-semibold" style={{ color: C.pine }}>Rechnung</h1>
            </div>
            <div className="text-right text-xs leading-relaxed text-stone-600">
              <p className="font-bold" style={{ color: C.pine }}>{COMPANY_NAME}</p>
              <p>{COMPANY_ADDRESS}</p>
              <p>{COMPANY_REG}</p>
              <p>{PHONE_DISPLAY}</p>
              <p>{CONTACT_EMAIL}</p>
            </div>
          </div>

          {/* Fatura künyesi */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Rechnung an</p>
              <p className="mt-1.5 font-bold" style={{ color: C.pine }}>
                {[b.first_name, b.last_name].filter(Boolean).join(" ") || "—"}
              </p>
              {b.email && <p className="text-sm text-stone-600">{b.email}</p>}
              {b.phone && <p className="text-sm text-stone-600">{b.phone}</p>}
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Rechnungsdetails</p>
              <p className="mt-1.5 text-sm"><span className="text-stone-400">Nr.: </span><b style={{ color: C.pine }}>{b.invoice_no}</b></p>
              <p className="text-sm"><span className="text-stone-400">Datum: </span>{dateStr}</p>
              <p className="text-sm"><span className="text-stone-400">Referenz: </span>{b.ref}</p>
            </div>
          </div>

          {/* Hizmet tablosu */}
          <table className="mt-8 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                <th className="pb-2">Leistung</th>
                <th className="pb-2 text-right">Betrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="py-4">
                  <p className="font-bold" style={{ color: C.pine }}>Privattransfer</p>
                  <p className="mt-1 text-stone-600">{b.pickup} → {b.dropoff}</p>
                  {b.stops && <p className="text-xs text-stone-500">Zwischenstopps: {b.stops}</p>}
                  <p className="mt-1 text-xs text-stone-500">
                    {b.ride_date} {b.ride_time}
                    {b.vehicle ? ` · ${b.vehicle}` : ""}
                    {b.pax ? ` · ${b.pax} Pass.` : ""}
                  </p>
                </td>
                <td className="py-4 text-right align-top tabular-nums">CHF {chf(net)}</td>
              </tr>
            </tbody>
          </table>

          {/* Toplamlar */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Zwischensumme</span><span className="tabular-nums">CHF {chf(net)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>MwSt. {(VAT_RATE * 100).toFixed(1)}%</span><span className="tabular-nums">CHF {chf(vat)}</span>
              </div>
              <div className="flex justify-between border-t-2 pt-2 text-base font-bold" style={{ borderColor: C.gold, color: C.pine }}>
                <span>Gesamtbetrag</span><span className="tabular-nums">CHF {chf(gross)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-stone-100 pt-5 text-xs leading-relaxed text-stone-500">
            <p>Zahlungsart: {b.payment ?? "—"}</p>
            <p className="mt-1">Alle Preise in Schweizer Franken, inkl. MwSt. Vielen Dank für Ihr Vertrauen.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
