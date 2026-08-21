// ─────────────────────────────────────────────────────────────
//  E-POSTA BİLDİRİMİ — Resend (harici paket yok, REST ile)
//  Ortam değişkenleri (opsiyonel; yoksa bildirim sessizce atlanır):
//    RESEND_API_KEY  → Resend API anahtarı
//    MAIL_TO         → bildirimin gideceği adres
//    MAIL_FROM       → gönderen (doğrulanmış alan adı), ör: "Panel <bildirim@alanadin.ch>"
// ─────────────────────────────────────────────────────────────

export async function sendBookingMail(b: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM ?? "Airport Zurich Transfer <onboarding@resend.dev>";
  if (!key || !to) return; // yapılandırılmamış — sessizce geç

  const line = (label: string, v: unknown) => (v ? `<tr><td style="padding:4px 12px 4px 0;color:#78716c">${label}</td><td style="padding:4px 0"><b>${String(v)}</b></td></tr>` : "");
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:520px">
      <p style="font-size:11px;letter-spacing:2px;color:#C9A24B;font-weight:700;margin:0">YENİ REZERVASYON TALEBİ</p>
      <h2 style="color:#0C2E25;margin:4px 0 16px">${b.ref ?? ""}</h2>
      <table style="font-size:14px;border-collapse:collapse">
        ${line("Müşteri", [b.firstName, b.lastName].filter(Boolean).join(" "))}
        ${line("Telefon", b.phone)}
        ${line("E-posta", b.email)}
        ${line("Güzergâh", `${b.pickup ?? ""} → ${b.dropoff ?? ""}`)}
        ${line("Ara duraklar", b.stops)}
        ${line("Tarih / saat", `${b.date ?? ""} ${b.time ?? ""}`)}
        ${line("Araç", b.vehicle)}
        ${line("Tutar", b.price ? `CHF ${Number(b.price).toFixed(2)}` : "")}
        ${line("Uçuş", b.flight)}
        ${line("Yolcu", b.pax)}
        ${line("Not", b.notes)}
        ${line("Dil / kanal", [b.lang, b.channel].filter(Boolean).join(" · "))}
      </table>
      <p style="margin-top:20px"><a href="${process.env.SITE_URL ?? ""}/admin/rezervasyonlar" style="background:#C9A24B;color:#0C2E25;padding:10px 18px;border-radius:99px;text-decoration:none;font-weight:700;font-size:13px">Panelde aç</a></p>
    </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from, to: [to],
        subject: `Yeni rezervasyon ${b.ref ?? ""} — ${b.dropoff ?? ""}`,
        html,
      }),
    });
  } catch (e) {
    console.error("[mail] gönderilemedi", e);
  }
}
