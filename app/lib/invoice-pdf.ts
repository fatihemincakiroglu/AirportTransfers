// Fatura PDF'i — panel fatura sayfasıyla aynı düzen; pdf-lib ile sunucuda üretilir (harici dosya yok).
// E-posta eki olarak gönderilir; MwSt. ayrımı gösterilmez.
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { COMPANY_NAME, COMPANY_ADDRESS_LINES, CONTACT_EMAIL, BANK, SITE_URL } from "../config";

export type InvoiceRow = {
  ref: string; invoice_no: string | null; invoiced_at: string | null; price: string | number | null; payment: string | null;
  vehicle: string | null; status: string; pickup: string | null; dropoff: string | null; stops: string | null;
  ride_date: string | null; ride_time: string | null; pax: number | null;
  first_name: string | null; last_name: string | null; email: string | null; phone: string | null;
};

const INK = rgb(0.12, 0.16, 0.22), MUTED = rgb(0.42, 0.45, 0.5), BLUE = rgb(0.12, 0.31, 0.85), LINE = rgb(0.9, 0.91, 0.92);
const GREEN = rgb(0.02, 0.59, 0.41), AMBER = rgb(0.85, 0.47, 0.02);
const chf = (n: number) => n.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const day = (d?: string | null) => (d ? new Date(d).toLocaleDateString("sv-SE") : "—");
/** WinAnsi dışı karakterleri (→, ẞ vb.) güvenli karşılıklarına çevirir */
const safe = (s: string) => s.replace(/→/g, "-").replace(/ẞ/g, "SS").replace(/[^\x00-\xFF–—€“”‘’•…]/g, "");

export async function renderInvoicePdf(b: InvoiceRow): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Rechnung ${b.invoice_no ?? ""}`); pdf.setAuthor(COMPANY_NAME);
  const page = pdf.addPage([595.28, 841.89]); // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const M = 48, W = 595.28 - 2 * M;
  let y = 841.89 - 44;

  // Logo
  try {
    const logoBytes = await readFile(path.join(process.cwd(), "public", "logo.png"));
    const logo = await pdf.embedPng(logoBytes);
    const lw = 150, lh = (logo.height / logo.width) * lw;
    page.drawImage(logo, { x: (595.28 - lw) / 2, y: y - lh, width: lw, height: lh });
    y -= lh + 16;
  } catch { y -= 8; }

  const text = (p: PDFPage, t: string, x: number, yy: number, size = 9.5, f: PDFFont = font, color = INK) =>
    p.drawText(safe(t), { x, y: yy, size, font: f, color });
  const dashed = (yy: number) => page.drawLine({ start: { x: M, y: yy }, end: { x: M + W, y: yy }, thickness: 0.8, color: LINE, dashArray: [3, 3] });
  const wrap = (t: string, f: PDFFont, size: number, maxW: number): string[] => {
    const words = safe(t).split(/\s+/); const lines: string[] = []; let cur = "";
    for (const w of words) { const nxt = cur ? `${cur} ${w}` : w; if (f.widthOfTextAtSize(nxt, size) > maxW && cur) { lines.push(cur); cur = w; } else cur = nxt; }
    if (cur) lines.push(cur); return lines;
  };

  dashed(y); y -= 22;

  // Şirket bloğu (sol) + fatura künyesi (sağ)
  const leftTop = y;
  text(page, COMPANY_NAME.toUpperCase(), M, y, 13, bold); y -= 16;
  for (const l of COMPANY_ADDRESS_LINES) { text(page, l, M, y, 9.5, font, MUTED); y -= 13; }
  let ry = leftTop;
  const rx = M + 280;
  text(page, "Rechnungsinformationen", rx, ry, 11, bold, BLUE); ry -= 16;
  const kv = (k: string, v: string, color = MUTED, f: PDFFont = font) => { text(page, k, rx, ry, 9, font, MUTED); text(page, v, rx + 100, ry, 9, f, color); ry -= 13; };
  kv("Rechnungsnummer:", `#${b.invoice_no ?? ""}`, BLUE, bold);
  kv("Buchungsnummer:", b.ref, BLUE, bold);
  kv("Rechnungsdatum:", day(b.invoiced_at));
  kv("Servicedatum:", `${b.ride_date ?? "—"}${b.ride_time ? ` · ${b.ride_time}` : ""}`);
  if (b.vehicle) { const ls = wrap(b.vehicle, font, 9, M + W - (rx + 100)); text(page, "Fahrzeug:", rx, ry, 9, font, MUTED); for (const l of ls) { text(page, l, rx + 100, ry, 9, font, MUTED); ry -= 13; } }
  y = Math.min(y, ry) - 10;
  dashed(y); y -= 22;

  // Alıcı + ödeme
  const who = [b.first_name, b.last_name].filter(Boolean).join(" ") || "—";
  const gross = Number(b.price ?? 0);
  const paid = b.status === "done";
  const topRow = y;
  text(page, "Empfänger:", M, y, 11, bold); y -= 16;
  text(page, who, M, y, 9.5, bold); y -= 13;
  if (b.phone) { text(page, b.phone, M, y, 9.5, font, MUTED); y -= 13; }
  if (b.email) { text(page, b.email, M, y, 9.5, font, MUTED); y -= 13; }
  ry = topRow;
  text(page, "Zahlungsdetails:", rx, ry, 11, bold); ry -= 16;
  text(page, "Gesamtbetrag fällig:", rx, ry, 9.5, font, MUTED); text(page, `${chf(gross)} CHF`, rx + 105, ry, 9.5, bold); ry -= 13;
  text(page, "Zahlungsstatus:", rx, ry, 9.5, font, MUTED); text(page, paid ? "Bezahlt" : "Offen", rx + 105, ry, 9.5, bold, paid ? GREEN : AMBER); ry -= 13;
  text(page, "Zahlungsmethode:", rx, ry, 9.5, font, MUTED); text(page, b.payment ?? "—", rx + 105, ry, 9.5, bold); ry -= 13;
  y = Math.min(y, ry) - 22;

  // Hizmet tablosu
  const cols = [M, M + 100, M + 380, M + 430];
  const th = (t: string, x: number, right = false) => { const s = 8; const w = font.widthOfTextAtSize(t, s); text(page, t, right ? x + (M + W - x) - w : x, y, s, bold, MUTED); };
  th("SERVICE", cols[0]); th("BESCHREIBUNG", cols[1]); th("ANZAHL", cols[2]); th("GESAMTBETRAG", cols[3], true);
  y -= 8; page.drawLine({ start: { x: M, y }, end: { x: M + W, y }, thickness: 0.8, color: LINE }); y -= 16;
  const rowTop = y;
  text(page, "Taxidienst", cols[0], y, 9.5);
  const descLines = [...wrap(`Taxi Transfer from ${b.pickup ?? "—"} to`, font, 9.5, 270), ...wrap(b.dropoff ?? "—", font, 9.5, 270)];
  let dy = y;
  for (const l of descLines) { text(page, l, cols[1], dy, 9.5); dy -= 13; }
  if (b.stops) for (const l of wrap(`Zwischenstopps: ${b.stops}`, font, 8.5, 270)) { text(page, l, cols[1], dy, 8.5, font, MUTED); dy -= 12; }
  if (b.pax) { text(page, `${b.pax} Passagiere`, cols[1], dy, 8.5, font, MUTED); dy -= 12; }
  text(page, "1", cols[2] + 12, rowTop, 9.5);
  const amt = `${chf(gross)} CHF`; text(page, amt, M + W - bold.widthOfTextAtSize(amt, 9.5), rowTop, 9.5, bold, BLUE);
  y = dy - 6; page.drawLine({ start: { x: M, y }, end: { x: M + W, y }, thickness: 0.8, color: LINE }); y -= 18;

  // Toplam
  page.drawLine({ start: { x: M + W - 200, y: y + 8 }, end: { x: M + W, y: y + 8 }, thickness: 0.8, color: LINE });
  text(page, "Gesamt", M + W - 200, y - 6, 12, bold);
  const tot = `${chf(gross)} CHF`; text(page, tot, M + W - bold.widthOfTextAtSize(tot, 12), y - 6, 12, bold);
  y -= 40;

  // Notlar + banka
  const notes = [
    `# Rückerstattungen erfolgen über die ursprüngliche Zahlungsmethode, die bei der Buchung verwendet wurde.`,
    `# Anfragen können über WhatsApp oder per E-Mail an ${CONTACT_EMAIL} gesendet werden.`,
    `# Wenn wir eine Buchung stornieren, wird der Kunde umgehend benachrichtigt und erhält eine Rückerstattung.`,
  ];
  for (const n of notes) for (const l of wrap(n, font, 8.5, W)) { text(page, l, M, y, 8.5, font, MUTED); y -= 12; }
  y -= 8;
  text(page, "Bankverbindung", M, y, 9.5, bold); y -= 13;
  for (const l of [BANK.name, BANK.city, `IBAN ${BANK.iban}`]) { text(page, l, M, y, 9, font, MUTED); y -= 12; }

  // Alt bilgi
  const foot = `${COMPANY_NAME} · ${SITE_URL.replace(/^https?:\/\//, "")} · ${CONTACT_EMAIL}`;
  text(page, foot, (595.28 - font.widthOfTextAtSize(safe(foot), 8)) / 2, 30, 8, font, MUTED);

  return Buffer.from(await pdf.save());
}
