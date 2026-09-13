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
