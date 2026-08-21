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

## Sayfalar
- **Kontrol Paneli** — özet sayılar + son rezervasyonlar
- **Rezervasyonlar** — filtre, arama, detay, durum değiştirme (Yeni/Onaylı/Tamamlandı/İptal)
- **Takvim** — yolculuk tarihine göre gruplanmış yaklaşan işler
- **İletişim Talepleri** — siteden gelen mesajlar
- **Sistem Logları** — giriş denemeleri, durum değişiklikleri

## Notlar
- Rezervasyon talebi WhatsApp/e-posta ile gitmeye devam ediyor; panel **ek olarak** kayıt tutar.
- `DATABASE_URL` tanımlı değilse site normal çalışır, panel "veritabanı bağlı değil" uyarısı gösterir.
- `/admin` arama motorlarına kapalı (`noindex`).
