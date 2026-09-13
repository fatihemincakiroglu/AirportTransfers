// GTM'den ÖNCE çalışan onay ön-yükleme betiği. "use client" DEĞİL: sunucu layout'u
// bu metni satır içi <script> olarak basar (istemci modülünden dize alınamaz).

export const CONSENT_COOKIE = "zrh_consent";

/** Saklı seçimi okur, dataLayer'a `cmp_state` yazar; seçim yoksa tüm sinyaller "denied". */
export const consentBootstrapScript = `(function(){
var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/),c=null;
try{c=m?JSON.parse(decodeURIComponent(m[1])):null}catch(e){c=null}
var a=!!(c&&c.analytics),k=!!(c&&c.marketing),g=function(b){return b?"granted":"denied"};
window.dataLayer=window.dataLayer||[];
window.dataLayer.push({event:"cmp_state",consent_source:c?"stored":"default",
consent:{analytics_storage:g(a),ad_storage:g(k),ad_user_data:g(k),ad_personalization:g(k),meta_marketing:g(k)}});
})();`;
