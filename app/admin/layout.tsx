import type { Metadata, Viewport } from "next";
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

// Mobilde doğru ölçekleme için (panel kendi kök düzeni olduğundan burada tanımlanır)
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5 };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
