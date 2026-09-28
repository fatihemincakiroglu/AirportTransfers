"use client";

import Script from "next/script";

/**
 * Google Tag Manager
 * Kimlik boşsa veya yerel geliştirmedeysek hiçbir şey yüklenmez.
 * Panel (/admin) kendi kök düzenine sahip olduğu için sayılmaz.
 */
export function GtmScript({ id }: { id: string }) {
  if (!id || process.env.NODE_ENV !== "production") return null;
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){
  // Performans: GTM ilk görüntü (LCP) tamamlanınca ya da ilk etkileşimde yüklenir;
  // dataLayer ve onay durumu daha önce hazır olduğu için hiçbir olay kaybolmaz.
  var loaded=false;
  function load(){ if(loaded) return; loaded=true;
    w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); }
  var evs=['scroll','keydown','pointerdown','touchstart'];
  evs.forEach(function(e){ w.addEventListener(e, load, {once:true, passive:true}); });
  if('requestIdleCallback' in w){ w.requestIdleCallback(load,{timeout:3500}); } else { setTimeout(load,3000); }
})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}

/** JavaScript kapalı tarayıcılar için yedek — <body> açılışına konur */
export function GtmNoScript({ id }: { id: string }) {
  if (!id || process.env.NODE_ENV !== "production") return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
