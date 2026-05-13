# 🏡 Emlak Portalı - Profesyonel İlan Platformu

Bu proje, modern web geliştirme standartlarına ve **SOLID prensiplerine** uygun olarak geliştirilmiş tam kapsamlı bir emlak yönetim ve ilan platformudur. **.NET 9.0 Core Web API** ve **ASP.NET Core MVC** kullanılarak N-Tier (Çok Katmanlı) mimari ile tasarlanmıştır.

![Platform](https://img.shields.io/badge/Platform-.NET%209.0-blue.svg)
![Architecture](https://img.shields.io/badge/Mimari-N--Tier%20%7C%20RESTful%20API-orange.svg)
![Frontend](https://img.shields.io/badge/Frontend-ASP.NET%20MVC%20%7C%20Bootstrap%205-purple.svg)

## 🌟 Öne Çıkan Özellikler

- **Gelişmiş İlan Filtreleme:** Kullanıcılar; şehir, ilçe, kategori, oda sayısı ve fiyat aralığına göre anlık sorgulamalar yapabilir.
- **Kapsamlı Yönetim Paneli:** "Admin" rolüne sahip kullanıcılar, sisteme düşen tüm ilanları onaylayabilir, pasife çekebilir veya silebilir.
- **Dinamik İl-İlçe Sistemi:** Türkiye'nin 81 ili ve tüm ilçeleri dış bir açık kaynak API üzerinden anlık çekilerek veritabanına otomatik olarak (Data Seeding ile) eklenir.
- **Vitrin Algoritması:** Anasayfada yer alan ilanlar, kullanıcı her girdiğinde özel bir algoritma ile rastgele karıştırılarak (Shuffle) zengin bir vitrin deneyimi sunar.
- **Güvenli Kimlik Doğrulama (JWT):** Token tabanlı güvenlik altyapısı sayesinde kullanıcı oturumları güvence altındadır. Şifre değiştirme ve yetki bazlı erişim mevcuttur.
- **Modern ve Premium Arayüz:** Sektör standartlarında Glassmorphism efektleri, modern tipografi (Inter Font) ve CSS animasyonları ile desteklenmiş duyarlı (Responsive) tasarım.

## 🏗️ Kullanılan Teknolojiler ve Mimari

**Backend (EmlakPortali.API):**
- **C# 13 & .NET 9.0:** En güncel dil özellikleri.
- **Entity Framework Core (Code-First):** Veritabanı modellemesi ve ilişkileri.
- **Repository Pattern:** Veri erişim katmanının soyutlanması.
- **AutoMapper:** Entity ve DTO'lar arasındaki veri transferi.
- **JWT (JSON Web Token):** Güvenli ve Stateless (Durumsuz) yetkilendirme.

**Frontend (EmlakPortali.MVC):**
- **ASP.NET Core MVC:** Dinamik sayfa oluşturma.
- **Bootstrap 5 & Özel CSS Overrides:** Özelleştirilmiş renk paletleri ve modern tasarım.
- **Gelişmiş HttpClient Servisleri:** API ile güvenli ve senkron haberleşme.

## 🚀 Kurulum ve Çalıştırma

Projenin kendi içinde "Çoklu Başlangıç" (Multiple Startup) profili ayarlanmıştır. Her iki projenin (API ve MVC) aynı anda çalışması gereklidir.

1. Çözümü (`EmlakPortali.sln`) Visual Studio 2022 ile açın.
2. Üst menüden **"New Profile"** veya **"Multiple Startup Projects"** ayarının seçili olduğundan emin olun.
3. Çalıştır (`F5`) butonuna basın.
4. Sistem, veritabanını (`EmlakPortaliDb2`) oluşturacak, il/ilçe API'sinden verileri çekecek ve varsayılan yönetici hesabını oluşturacaktır.

### 🔑 Varsayılan Yönetici Bilgileri
- **E-posta:** `admin@emlakportali.com`
- **Şifre:** `Admin123!`

---
*Bu proje "İnternet Programcılığı II" dersi için modern yazılım mühendisliği pratikleri gözetilerek geliştirilmiştir.*
