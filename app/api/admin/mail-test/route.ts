// SMTP ayarlarını doğrular ve test maili gönderir (yalnızca panelden)
import { NextResponse } from "next/server";
import { isLoggedIn } from "../../../lib/auth";
import { sendTestMail, mailReady } from "../../../lib/mail";

export const runtime = "nodejs";

export async function POST() {
  if (!(await isLoggedIn())) return NextResponse.json({ ok: false }, { status: 401 });

  if (!mailReady()) {
    return NextResponse.json({
      ok: false,
      reason: "Ortam değişkenleri eksik",
      detail: {
        GMAIL_USER: process.env.GMAIL_USER ? "tanımlı" : "EKSİK",
        GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD ? "tanımlı" : "EKSİK",
        MAIL_TO: process.env.MAIL_TO ?? "(boş — GMAIL_USER kullanılır)",
      },
    });
  }

  const result = await sendTestMail();
  return NextResponse.json(result);
}
