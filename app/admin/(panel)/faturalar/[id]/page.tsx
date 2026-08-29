import { notFound } from "next/navigation";
import { sql, ensureSchemaSafe as ensureSchema, dbReady, VAT_RATE } from "../../../../lib/db";
import {
  COMPANY_NAME, COMPANY_REG, COMPANY_ADDRESS_LINES, CONTACT_EMAIL, PHONE_DISPLAY, BANK,
} from "../../../../config";
import PrintButton from "./print-button";

export const dynamic = "force-dynamic";

const INK = "#111827";
const BLUE = "#2563EB";
const MUTED = "#6B7280";

type Row = {
  id: number; ref: string; invoice_no: string | null; invoiced_at: string | null;
  price: string | null; payment: string | null; vehicle: string | null; status: string;
  pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!dbReady) notFound();
  await ensureSchema();

  const [b] = (await sql`
    SELECT id, ref, invoice_no, invoiced_at, price, payment, vehicle, status,
           pickup, dropoff, stops, ride_date, ride_time, pax,
           first_name, last_name, email, phone
    FROM bookings WHERE id = ${Number(id)}`) as unknown as Row[];

  if (!b || !b.invoice_no) notFound();

  const gross = Number(b.price ?? 0);
  const net = gross / (1 + VAT_RATE);
  const vat = gross - net;
  const chf = (n: number) => n.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const day = (d?: string | null) => (d ? new Date(d).toLocaleDateString("sv-SE") : "—"); // YYYY-MM-DD
  const who = [b.first_name, b.last_name].filter(Boolean).join(" ") || "—";

  const paid = b.status === "done";
  const payLabel = b.payment ?? "—";

  return (
    <div className="min-h-screen bg-stone-100 py-8 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl px-5 print:max-w-none print:px-0">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-3 print:hidden">
          <PrintButton />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/admin/faturalar" className="rounded-full bg-white px-5 py-3 text-center text-xs font-extrabold uppercase tracking-wide text-stone-600 shadow-sm">
            Listeye dön
          </a>
        </div>

        <div className="bg-white p-8 shadow-sm sm:p-12 print:p-10 print:shadow-none" style={{ color: INK }}>
          {/* Logo */}
          <div className="flex justify-center pb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={COMPANY_NAME} style={{ height: 56 }} className="w-auto" />
          </div>
          <div className="border-t border-dashed border-stone-300" />

          {/* Şirket + fatura künyesi */}
          <div className="grid gap-8 py-9 sm:grid-cols-2">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">{COMPANY_NAME.toUpperCase()}</h1>
              <div className="mt-3 space-y-1 text-sm" style={{ color: MUTED }}>
                {COMPANY_ADDRESS_LINES.map((l) => <p key={l}>{l}</p>)}
                <p>{COMPANY_REG}</p>
                <p>{CONTACT_EMAIL}</p>
                <p>{PHONE_DISPLAY}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-extrabold" style={{ color: BLUE }}>Rechnungsinformationen</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Rechnungsnummer:</dt>
                  <dd className="font-bold" style={{ color: BLUE }}>#{b.invoice_no}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Buchungsnummer:</dt>
                  <dd className="font-bold" style={{ color: BLUE }}>{b.ref}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Rechnungsdatum:</dt>
                  <dd style={{ color: MUTED }}>{day(b.invoiced_at)}</dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="font-bold">Servicedatum:</dt>
                  <dd style={{ color: MUTED }}>{b.ride_date ?? "—"}{b.ride_time ? ` · ${b.ride_time}` : ""}</dd>
                </div>
                {b.vehicle && (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-bold">Fahrzeug:</dt>
                    <dd style={{ color: MUTED }}>{b.vehicle}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
          <div className="border-t border-dashed border-stone-300" />

          {/* Alıcı + ödeme */}
          <div className="grid gap-8 py-9 sm:grid-cols-2">
            <div className="sm:border-r sm:border-dashed sm:border-stone-300 sm:pr-8 sm:text-right">
              <h3 className="text-lg font-extrabold">Empfänger:</h3>
              <div className="mt-3 space-y-1 text-sm" style={{ color: MUTED }}>
                <p className="font-semibold" style={{ color: INK }}>{who}</p>
                {b.phone && <p>{b.phone}</p>}
                {b.email && <p>{b.email}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-extrabold">Zahlungsdetails:</h3>
              <div className="mt-3 space-y-1.5 text-sm" style={{ color: MUTED }}>
                <p>Gesamtbetrag fällig: <b style={{ color: INK }}>{chf(gross)} CHF</b></p>
                <p>
                  Zahlungsstatus:{" "}
                  <b style={{ color: paid ? "#059669" : "#D97706" }}>{paid ? "Bezahlt" : "Offen"}</b>
                </p>
                <p>Zahlungsmethode: <b style={{ color: INK }}>{payLabel}</b></p>
              </div>
            </div>
          </div>

          {/* Hizmet tablosu */}
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-stone-200 text-[10px] font-extrabold uppercase tracking-wide" style={{ color: MUTED }}>
                <th className="py-3 pr-4">Service</th>
                <th className="py-3 pr-4">Beschreibung</th>
                <th className="py-3 pr-4 text-center">Anzahl</th>
                <th className="py-3 text-right">Gesamtbetrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="py-5 pr-4 align-top">Taxidienst</td>
                <td className="py-5 pr-4 align-top">
                  <p>Taxi Transfer from {b.pickup ?? "—"} to</p>
                  <p>{b.dropoff ?? "—"}</p>
                  {b.stops && <p className="mt-1 text-xs" style={{ color: MUTED }}>Zwischenstopps: {b.stops}</p>}
                  {b.pax && <p className="mt-1 text-xs" style={{ color: MUTED }}>{b.pax} Passagiere</p>}
                </td>
                <td className="py-5 pr-4 text-center align-top">1</td>
                <td className="py-5 text-right align-top font-bold" style={{ color: BLUE }}>{chf(gross)} CHF</td>
              </tr>
            </tbody>
          </table>

          {/* KDV kırılımı */}
          <div className="mt-5 flex justify-end">
            <div className="w-full max-w-xs space-y-1.5 text-sm" style={{ color: MUTED }}>
              <div className="flex justify-between"><span>Nettobetrag</span><span>{chf(net)} CHF</span></div>
              <div className="flex justify-between"><span>MwSt. {(VAT_RATE * 100).toFixed(1)}%</span><span>{chf(vat)} CHF</span></div>
              <div className="flex justify-between border-t border-stone-200 pt-1.5 text-base font-extrabold" style={{ color: INK }}>
                <span>Gesamt</span><span>{chf(gross)} CHF</span>
              </div>
            </div>
          </div>

          {/* Politika + banka */}
          <div className="mt-10 grid gap-8 border-t border-dashed border-stone-300 pt-8 sm:grid-cols-[1.6fr_1fr]">
            <div>
              <h3 className="text-sm font-extrabold" style={{ color: BLUE }}>Rückerstattungsrichtlinie:</h3>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed" style={{ color: MUTED }}>
                <li># Alle Rückerstattungsanfragen müssen innerhalb von 24 Stunden nach der Buchung eingereicht werden.</li>
                <li># Rückerstattungen erfolgen über die ursprüngliche Zahlungsmethode, die bei der Buchung verwendet wurde.</li>
                <li># Anfragen können über WhatsApp oder per E-Mail an {CONTACT_EMAIL} gesendet werden.</li>
                <li># Wenn wir eine Buchung stornieren, wird der Kunde umgehend benachrichtigt und erhält eine Rückerstattung.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-extrabold" style={{ color: BLUE }}>Bankverbindung</h3>
              <div className="mt-3 space-y-1 text-xs" style={{ color: MUTED }}>
                <p>{BANK.name}</p>
                <p>{BANK.city}</p>
                <p>IBAN {BANK.iban}</p>
                <p>Konto ID: {BANK.account}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
