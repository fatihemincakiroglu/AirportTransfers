"use client";

import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js)
 * Yalnızca üretim ortamında yüklenir; yerel geliştirmede veri gönderilmez.
 * Panel (/admin) kendi kök düzenine sahip olduğu için sayılmaz.
 */
export default function Analytics({ id }: { id: string }) {
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
