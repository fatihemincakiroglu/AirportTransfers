# Ölçüm — Data Layer Faz 1 (tarayıcı hattı)

Spec: *ZRH Airport Taxi — Data Layer Technical Specification v1.3.5*. Bu doküman sitede **uygulanan** kısmı özetler; GA4/Ads/Meta etiket eşlemeleri GTM'de reklamcı tarafından yapılır.

## Dosyalar
| Dosya | Görev |
|---|---|
| `app/lib/analytics.ts` | Zarf (`schema_version`, `environment`, `event_source`, `event_id`, `event_time`), reset yardımcıları, URL temizliği, konum normalizasyonu, KDV ayrımı |
| `app/analytics-page.tsx` | Her rota geçişinde `page_context`, URL temizliği, `language_change`, WhatsApp/telefon/e-posta tıklama yakalama |
| `app/consent-script.ts` | GTM'den önce çalışan satır içi betik: saklı onayı `cmp_state` olarak basar |
| `app/consent.tsx` | Çerez bandı (DE/EN); seçim `zrh_consent` çerezine yazılır, `cmp_update` basılır |
| `app/[lang]/buchung/buchung-client.tsx` | Rezervasyon hunisi olayları |
| `app/[lang]/kontakt/kontakt-client.tsx` | İletişim formu olayları |

## Basılan olaylar
| Olay | Ne zaman | Önemli alanlar |
|---|---|---|
| `page_context` | her sayfa/rota geçişi (event_id/event_time yok) | `page.page_type`, `page_language`, `page_path`, `page_location` (sorgu temizlenmiş), `page_referrer`, `page_id` (rota/hedef/etkinlik/blog) |
| `booking_search` | rezervasyon adım 1 → 2 (ana sayfadan gelişte de) | `booking.search_id`, `booking_type` transfer/hourly, `pickup`/`destination` (airport/city/**address – adsız**), tarih, saat, `passengers`, `children`, `stops_count`, `duration_hours` (saatlik) |
| `booking_results_view` | araç listesi gösterildiğinde (arama başına 1) | `results.available_vehicle_count`, `ecommerce.items[]` (3 araç, `index` 0–2) |
| `vehicle_select` | araç kartına tıklama (her tıklama yeni id) | `vehicle.*`, `ecommerce.items[0]` |
| `booking_begin` | araç seçiminin hemen ardından (adım 3) | `booking`, `ecommerce` |
| `booking_payment_info` | ödeme yöntemi seçimi | `payment.selected_payment_type` twint/cash/card |
| `booking_submit` | "Ödemeye geç" tıklandığında, `/api/checkout` isteğinden hemen önce | satış DEĞİL |
| `booking_error` | müsaitlik/gece kuralı slotu reddettiğinde | `error.error_code=SLOT_UNAVAILABLE`, `booking.step` |
| `contact_form_start` | formda ilk yazma | `contact.form_id=contact_main`, `form_interaction_id` |
| `contact_form_success` | `/api/contact` `{ok,id}` döndüğünde | `contact.lead_id` (contacts.id), `form_attempt_id` |
| `contact_form_error` | API hata/bilinmeyen | `error.error_code`, `contact.failure_stage` |
| `whatsapp_click` / `phone_click` / `email_click` | ilgili bağlantı tıklaması | `contact.method`, `contact.location` (header/footer/floating_button/mobile_sticky/contact_page/booking/…) |
| `language_change` | dil değişimi tamamlandığında | `language.from_language`, `to_language` |

**Para:** sabit rotalarda `price_status=final`, `gross_value` (KDV dahil), `net_value`, `tax_value` (8.1 %), `ecommerce.value` = net. Özel güzergâh/saatlik: `price_status=estimated`, `estimated_value`; `ecommerce.value` ve `items[].price` gönderilmez.

**Araç kimlikleri:** `business_class_e`, `business_family_v`, `premium_s` → `item_id = transfer_<id>` / `hourly_<id>`, `item_category2 = business_class | business_family | premium`.

**Her iş olayından önce** reset push'u (`booking:null, vehicle:null …`) basılır; GTM'de "Data Layer Version 2" değişkenleri eski değeri taşımaz.

## Onay (Consent Mode v2) sözleşmesi
- Sayfa yüklenirken, GTM'den önce: `{ event:"cmp_state", consent_source:"stored"|"default", consent:{ analytics_storage, ad_storage, ad_user_data, ad_personalization, meta_marketing } }` (değerler `"granted"|"denied"`; seçim yoksa hepsi `denied`).
- Kullanıcı seçim yapınca: `{ event:"cmp_update", consent_source:"banner", consent:{…} }`.
- "Statistics" → `analytics_storage`; "Marketing" → `ad_storage`, `ad_user_data`, `ad_personalization`, `meta_marketing`.
- Çerez: `zrh_consent` (JSON, 180 gün). Footer'daki "Cookie settings" bandı yeniden açar.

**GTM'de yapılacak (reklamcı):** Consent Initialization tetikleyicisinde consent şablonu ile `{{DLV consent.*}}` değerlerinden default set; `cmp_update` özel olayında update. Google etiketleri Advanced modda (onay beklemeden yüklenir), Meta Pixel yalnızca `meta_marketing=granted`. GA4 config'de `send_page_view=false`; `page_context` özel olayıyla manuel `page_view` (`page_location={{DLV page.page_location}}`, `page_referrer={{DLV page.page_referrer}}`).

## Bilinçli olarak yapılmayanlar (Faz 2 / karar bekleyen)
- `booking_complete` (Purchase) = **panelden kabul** anı; backend outbox + GA4 MP / Meta CAPI ile gönderilecek. Tarayıcıda Purchase yok.
- `payment_success` (Stripe webhook), `booking_cancelled` / `booking_refunded` (ret + otomatik iade), `lead_created` → backend.
- `cta_click` (P2), `service_view` (ayrı araç detay sayfası yok).
- Çerez politikası metni "yalnızca zorunlu çerez" diyor; GA4/Ads/Meta aktif edilmeden güncellenmeli.

---

# Faz 2 — Backend hattı (outbox → GA4 MP / Meta CAPI)

## Karar: Purchase = panelden **kabul**
`booking_complete` yalnızca rezervasyon **kabul edildiğinde** (panel veya e-posta düğmesi) oluşur; Stripe ödemesi `payment_success` olarak ayrı, ikinci bir satış değil. Ret/iptalde otomatik iade `booking_refunded`.

## Dosyalar
| Dosya | Görev |
|---|---|
| `app/lib/measurement.ts` | Onay/kimlik yakalama, outbox yazımı, GA4 MP ve Meta CAPI adaptörleri, teslimat durumları |
| `app/api/cron/analytics/route.ts` | Günlük süpürme (Vercel Cron, `CRON_SECRET`) |
| `app/api/admin/analytics/route.ts` | Panel: "bekleyenleri gönder" / "yeniden" |
| `app/admin/(panel)/loglar/measurement-queue.tsx` | Sistem Logları sayfasında kuyruk görünümü |
| `vercel.json` | Cron tanımı (03:00) |
| `lib/db.ts` | `analytics_outbox`, `analytics_delivery`; bookings/contacts'a kimlik+onay kolonları; `no_show` durumu |

## Backend olayları
| Olay | Tetik | GA4 | Meta CAPI |
|---|---|---|---|
| `booking_complete` | kabul (`/api/decision`, panel PATCH) | `purchase` (net değer, tax ayrı, `transaction_id`=ref) | `Purchase` (brüt) |
| `booking_declined` | henüz onaylanmamış talebin reddi | custom | `BookingDeclined` |
| `booking_cancelled` | onaylı rezervasyonun iptali/reddi | `refund` (tam) | `BookingCancelled` |
| `booking_refunded` | Stripe iadesi başarılı | `refund` (orijinal Purchase gönderilmişse; değilse elle kontrol) | `BookingRefunded` |
| `payment_success` | Stripe webhook | custom | `PaymentSuccess` |
| `booking_completed` | panelde "Tamamlandı" | custom | `BookingCompleted` |
| `booking_no_show` | panelde "Gelmedi" (yeni durum) | `refund` | `BookingNoShow` |
| `lead_created` | `/api/contact` kaydı | `generate_lead` | `Lead` |
| `lead_status_changed` | iletişim talebinde Nitelikli / Dönüştü / Geçersiz (yeni durumlar) | custom | `LeadStatusChanged` |

Kimlikler: `event_id` = `purchase_{ref}`, `cancel_{ref}_{v}`, `refund_{stripe_intent}`, `lead_LEAD{id}`, `lead_status_LEAD{id}_{v}`… Aynı olay iki kez yazılamaz (`UNIQUE(environment, event_id)`).

## Teslimat kuralları
- Kayıt anında (rezervasyon/iletişim) onay çerezi okunur; GA client id, `_fbp/_fbc`, IP/UA **yalnızca ilgili onay varsa** saklanır. Sonradan verilen onay eski olayı serbest bırakmaz.
- Olay yanıt gönderildikten sonra (`after()`) hemen denenir; kalanlar 03:00 cron'u ve panel düğmesiyle.
- Durumlar: `transport_accepted`/`accepted` (gönderildi), `suppressed_unconfigured` (env eksik), `suppressed_consent`, `skipped_missing_identifier` (GA client id yok), `suppressed_no_match_data`, `suppressed_unapproved_revenue_model` (satış onayı kapalı), `suppressed_channel` (panelden/telefondan açılan kayıt), `permanent_failed`, `retryable_failed`, `dead_lettered`, `expired`, `delivery_unknown`, `manual_reconciliation`.
- GA4: non-2xx ve belirsiz gönderimde **kör tekrar yok** (spec §19.9). Meta: 429/5xx/ağ hatasında en fazla 5 deneme, 48 saatlik dedup penceresi.
- Panelden açılan manuel rezervasyonlar (telefon/WhatsApp) web hedeflerine gönderilmez.

## Vercel ortam değişkenleri
```
GA4_MEASUREMENT_ID=G-XXXXXXX
GA4_MP_API_SECRET=…                       # GA4 → Admin → Data Streams → Measurement Protocol API secrets
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXX  # tarayıcıda client_id okumak için (gtag get)
META_DATASET_ID=…
META_CAPI_ACCESS_TOKEN=…
META_API_VERSION=v21.0                    # isteğe bağlı
META_TEST_EVENT_CODE=TESTxxxx             # yalnızca preview/test; production'da yok sayılır
PURCHASE_REVENUE_MODEL_APPROVED=true      # "kabul edilen rezervasyon satıştır" onayı
CRON_SECRET=<rastgele uzun dize>
```
Değişken eksikse ilgili hedef `suppressed_unconfigured` olarak birikir; site çalışmaya devam eder. Değişkenler eklendikten sonra panelden "yeniden" ile gönderilebilir (72 saat / 7 gün yaş sınırı içinde).

## GTM tarafı (reklamcı) — değişmedi
GA4 Purchase yalnızca sunucudan gelir; GTM'de `booking_complete` için GA4 etiketi **kurulmaz**. Meta Pixel Purchase aynası bu sürümde yok (CAPI tek kaynak). GA4'te `purchase`/`refund`/`generate_lead` standart, diğerleri özel olay olarak görünür.
