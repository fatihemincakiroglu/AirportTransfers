// Fatura numarası: INV-YYYYAA-00000001 (ay içinde sıralı). Rezervasyon faturası ve
// sistem dışı (manuel) fatura aynı sayacı kullanır.
import { sql, logEvent } from "./db";

export async function assignInvoiceNo(bookingId: number): Promise<string | null> {
  const now = new Date();
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [row] = (await sql`
    SELECT COUNT(*)::int AS n FROM bookings
    WHERE invoice_no LIKE ${"INV-" + ym + "-%"}`) as unknown as { n: number }[];
  const no = `INV-${ym}-${String(row.n + 1).padStart(8, "0")}`;
  const [b] = (await sql`SELECT ref, price FROM bookings WHERE id = ${bookingId}`) as unknown as { ref: string; price: string | null }[];
  if (!b) return null;
  await sql`
    UPDATE bookings SET invoice_no = ${no}, invoiced_at = now(), updated_at = now()
    WHERE id = ${bookingId} AND invoice_no IS NULL`;
  await logEvent("invoice", `${b.ref} için ${no} numaralı fatura oluşturuldu (CHF ${Number(b.price ?? 0).toFixed(2)})`, { actor: "panel", ref: b.ref });
  return no;
}
