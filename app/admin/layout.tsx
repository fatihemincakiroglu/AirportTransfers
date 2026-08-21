import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

// Panel, sitenin dil düzeninden bağımsız kendi kök düzenidir:
// bu yüzden <html>/<body> etiketlerini kendisi taşır.
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = { title: "Panel", robots: { index: false, follow: false } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
