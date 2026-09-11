# Panel Kurulumu (Faz 1)

## 1. Veritabanı (Supabase — ücretsiz)
1. https://supabase.com → hesap aç → **New project**.
   - Name: `airporttransfers`
   - Database Password: güçlü bir parola üret ve **kaydet** (bağlantı dizesinde lazım).
   - Region: **Central EU (Frankfurt)**
2. Proje hazır olunca (~2 dk): **Connect** düğmesi → **Connection string** → **Transaction pooler** sekmesi.
   Dizeyi kopyala; içindeki `[YOUR-PASSWORD]` yerine proje parolanı yaz.

> Neden Transaction pooler (port 6543)? Vercel sunucusuz çalışır; doğrudan bağlantı (5432)
> kısa sürede havuzu tüketir. Pooler bunu önler.

## 2. Ortam değişkenleri
Yerelde proje kökünde `.env.local` oluştur:

```
DATABASE_URL="postgresql://... (Neon'dan kopyaladığın)"
ADMIN_PASSWORD="secdigin-guclu-parola"
AUTH_SECRET="rastgele-uzun-dize"
```

`AUTH_SECRET` üretmek için PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Max 256 }))
```

Vercel'de aynı üçünü **Settings → Environment Variables** altına ekle (Production + Preview).

## 3. Kurulum ve çalıştırma
```powershell
npm install
npm run dev
```
Tablolar ilk istekte otomatik oluşur; ayrı migration adımı yok.

## 4. Panele giriş
`http://localhost:3000/admin` → parola ile giriş.
Canlıda: `https://alanadin.ch/admin`

## E-posta bildirimi (Google Workspace)
Yeni rezervasyon geldiğinde `info@zrhairporttaxi.ch` adresine bildirim gider.
Mailde tek tıkla **Kabul et / Reddet** düğmeleri bulunur.

1. `info@zrhairporttaxi.ch` hesabıyla giriş yapın → https://myaccount.google.com/security
2. **2 adımlı doğrulama**yı açın (uygulama şifresi için zorunlu).
3. https://myaccount.google.com/apppasswords → uygulama adı: `Website` → **Oluştur**.
   16 haneli şifreyi kopyalayın (boşluklar önemsiz).
4. Ortam değişkenlerini tanımlayın:
   - `GMAIL_USER` = `info@zrhairporttaxi.ch`
   - `GMAIL_APP_PASSWORD` = üretilen 16 haneli şifre
   - `MAIL_TO` = bildirimin gideceği adres (boş bırakılırsa `GMAIL_USER` kullanılır)

> Uygulama şifresi seçeneği görünmüyorsa: Google Workspace Admin → Security →
> Authentication → **Less secure apps / App passwords** iznini açın.

Değişkenler tanımlı değilse bildirim sessizce atlanır; panel ve site normal çalışır.

## Stripe online ödeme
Müşteri rezervasyon talebini gönderirken öder. Talebi reddeder veya iptal ederseniz
ödeme **otomatik olarak tam iade** edilir (panelden veya e-postadaki düğmeden).

1. https://dashboard.stripe.com → hesap açın, İsviçre şirket bilgileri ve IBAN ile doğrulayın.
2. **Settings → Payment methods** → **Card**, **TWINT**, Apple/Google Pay'i etkinleştirin.
3. **Developers → API keys** → `Secret key` (`sk_live_...`) kopyalayın → `STRIPE_SECRET_KEY`
4. **Developers → Webhooks → Add endpoint**
   - URL: `https://zrhairporttaxi.ch/api/stripe/webhook`
   - Olay: `checkout.session.completed`
   - Oluşunca verilen `whsec_...` değerini `STRIPE_WEBHOOK_SECRET` olarak ekleyin.
5. Vercel'e iki değişkeni ekleyin ve **Redeploy** yapın.

> Test için `sk_test_...` anahtarı ve Stripe'ın test kartı `4242 4242 4242 4242` kullanılabilir.
> Değişkenler tanımlı değilse ödeme adımı atlanır; talep eskisi gibi kayıt + bildirim olarak işlenir.

## Sayfalar
- **Kontrol Paneli** — özet sayılar + son rezervasyonlar
- **Raporlar** — aylık rezervasyon/ciro grafikleri, en çok gidilen yerler, araç ve dil dağılımı, CSV indirme
- **Faturalar** — onaylı yolculuklara fatura no atama (RE-YYYY-0001), yazdırılabilir fatura (PDF)
- **Rezervasyonlar** — filtre, arama, detay, durum değiştirme (Yeni/Onaylı/Tamamlandı/İptal)
- **Takvim** — yolculuk tarihine göre gruplanmış yaklaşan işler
- **İletişim Talepleri** — siteden gelen mesajlar
- **Sistem Logları** — giriş denemeleri, durum değişiklikleri

## Notlar
- Rezervasyon talebi WhatsApp/e-posta ile gitmeye devam ediyor; panel **ek olarak** kayıt tutar.
- `DATABASE_URL` tanımlı değilse site normal çalışır, panel "veritabanı bağlı değil" uyarısı gösterir.
- `/admin` arama motorlarına kapalı (`noindex`).
