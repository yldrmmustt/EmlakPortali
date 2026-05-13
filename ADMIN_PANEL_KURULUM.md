# Emlak Portalı MVC - Admin Paneli Kurulum Rehberi

## ✅ Tamamlanan İşlemler

### 1. **Program.cs Güncellemeleri**
- HttpClient yapılandırması eklendi
- API Base URL konfigürasyonu sağlandı (`appsettings.json`)
- Static files middleware aktifleştirildi

### 2. **Ajax Helper Dosyası Oluşturuldu** (`wwwroot/js/ajax-helper.js`)
Tüm AJAX işlemlerini merkezi hale getiren Helper:
- `AjaxHelper.get()` - GET istekleri
- `AjaxHelper.post()` - POST istekleri
- `AjaxHelper.put()` - PUT istekleri
- `AjaxHelper.delete()` - DELETE istekleri
- `AjaxHelper.showAlert()` - Alert gösterme
- `AjaxHelper.showLoader()` - Loader gösterme
- `AjaxHelper.checkToken()` - Token doğrulama
- `AjaxHelper.decodeToken()` - JWT decode

### 3. **Admin Layout** (`Views/Shared/_AdminLayout.cshtml`)
- Bootstrap 5 CSS & Icons entegre
- Sidebar navigasyon menüsü
- JWT Token doğrulaması (Client-side)
- Responsive tasarım
- Admin logout işlevselliği

### 4. **Admin Dashboard** (`Views/Admin/Index.cshtml`)
- İlan yönetimi tablosu (GET)
- İlan durumunu değiştirme (Aktif/Pasif) - PUT
- Bootstrap 5 table tasarımı
- AJAX ile gerçek zamanlı veri güncelleme

### 5. **Kullanıcı Yönetimi** (`Views/Admin/Users.cshtml`)
- Tüm kullanıcıları listele (GET)
- Kullanıcı rolü değiştir (PUT)
- JWT token'dan user ID çıkarma
- Bootstrap 5 table tasarımı

### 6. **Kategori Yönetimi** (`Views/Admin/Categories.cshtml`)
- Kategorileri listele (GET)
- Yeni kategori ekle (POST) - Modal form
- Kategoriyi düzenle (PUT) - Modal form
- Kategoriyi sil (DELETE)
- Bootstrap 5 Modal & Table tasarımı

### 7. **Admin Controller** (`Controllers/AdminController.cs`)
- Users() action
- Categories() action
- ProxyGet() - API proxy (opsiyonel)
- IHttpClientFactory dependency injection

---

## 📋 API Endpoints Standartları

Aşağıdaki endpoint'lerin **API'de mevcut olması** gerekir:

### Properties (İlanlar)
```
GET  /api/Properties                    → Tüm ilanları getir
PUT  /api/Properties/toggle-status/{id} → İlan durumunu değiştir
```

### Users (Kullanıcılar)
```
GET  /api/auth/users                    → Tüm kullanıcıları getir
PUT  /api/auth/users/{id}/toggle-role   → Kullanıcı rolünü değiştir
```

### Categories (Kategoriler)
```
GET    /api/categories                  → Tüm kategorileri getir
POST   /api/categories                  → Yeni kategori oluştur
PUT    /api/categories/{id}             → Kategoriyi güncelle
DELETE /api/categories/{id}             → Kategoriyi sil
```

> **NOT:** API Base URL `appsettings.json` dosyasında tanımlanmıştır:
```json
"ApiSettings": {
    "BaseUrl": "https://localhost:7001"
}
```

---

## 🚀 Çalıştırma Adımları

### 1. API Projesini Başlat
```bash
dotnet run --project EmlakPortali.API
```
**Port:** `https://localhost:7001`

### 2. MVC Projesini Başlat
```bash
dotnet run --project EmlakPortali.MVC
```
**Port:** Varsayılan olarak `https://localhost:5001` veya `https://localhost:7002`

### 3. Admin Paneline Erişim
1. http://localhost:[MVC_PORT]/Admin/Index
2. Henüz giriş yapmadıysa → `/Account/Login`'e yönlendirilir
3. Başarılı login → Admin Dashboard görüntülenir

---

## 🔒 Güvenlik Notları

### Token Yönetimi
- Token `localStorage`'da tutulur: `localStorage.getItem("token")`
- Her API isteğinde header'da gönderilir: `Authorization: Bearer {token}`
- Admin sayfalarında JWT decode edilerek rol doğrulanır (Admin?)

### JWT Role Kontrolü
Admin Layout'ta:
```javascript
const decoded = JSON.parse(jsonPayload);
const roleKey = Object.keys(decoded).find(k => k.includes('role'));
if(decoded[roleKey] !== 'Admin') {
    alert("Bu sayfaya erişim yetkiniz yok.");
}
```

---

## 📦 Gerekli NuGet Paketleri

MVC projesi oluşturulduğunda otomatik gelen paketler:
- `Microsoft.AspNetCore.App` (Default)
- Ek paket gerekmez! ✅

---

## 🎨 Bootstrap 5 Kullanılan Bileşenler

- **Cards** - İçerik container'ları
- **Tables** - Veri gösterimi
- **Buttons** - İşlem butonları
- **Badges** - Durum göstergeleri
- **Modals** - Form dialog'ları
- **Spinners** - Loading göstergeleri
- **Alerts** - Bilgilendirme mesajları
- **Grid System** - Responsive layout

---

## 📝 AJAX İşlem Örnekleri

### GET İsteği (Veri Çekme)
```javascript
AjaxHelper.get("/Properties", function(data) {
    console.log("İlanlar:", data);
}, function(xhr, status, error) {
    console.error("Hata:", error);
});
```

### POST İsteği (Veri Oluşturma)
```javascript
let newCategory = { name: "Daire", description: "Apartman daireleri" };
AjaxHelper.post("/categories", newCategory, function(res) {
    AjaxHelper.showAlert("success", "Kategori oluşturuldu!");
}, function(err) {
    AjaxHelper.showAlert("danger", "Hata oluştu!");
});
```

### PUT İsteği (Veri Güncelleme)
```javascript
let updateData = { name: "Güncellenmiş Kategori" };
AjaxHelper.put("/categories/1", updateData, function(res) {
    AjaxHelper.showAlert("success", "Güncellendi!");
});
```

### DELETE İsteği (Veri Silme)
```javascript
AjaxHelper.delete("/categories/1", function(res) {
    AjaxHelper.showAlert("success", "Silindi!");
});
```

---

## 🔧 Yapılacaklar (Sonraki Aşamalar)

- [ ] Genel kullanıcı arayüzü oluşturma (_Layout.cshtml)
- [ ] İlan Detay sayfası
- [ ] İlan Arama/Filtreleme
- [ ] Kullanıcı Profil Yönetimi
- [ ] İlan Oluşturma/Düzenleme
- [ ] Admin raporları ve istatistikleri
- [ ] Email doğrulama gönderimi
- [ ] Şifre sıfırlama
- [ ] Resim yükleme işlevselliği

---

## 📌 Dosya Yapısı Özeti

```
EmlakPortali.MVC/
├── Controllers/
│   ├── AdminController.cs ✅ (Güncellendi)
│   ├── AccountController.cs
│   ├── HomeController.cs
│   └── PropertyController.cs
├── Views/
│   ├── Admin/
│   │   ├── Index.cshtml ✅ (Güncellendi - AJAX)
│   │   ├── Users.cshtml ✅ (Oluşturuldu - AJAX)
│   │   ├── Categories.cshtml ✅ (Oluşturuldu - AJAX/Modal)
│   │   └── Login.cshtml
│   ├── Shared/
│   │   ├── _AdminLayout.cshtml ✅ (Güncellendi)
│   │   ├── _Layout.cshtml (Genel arayüz - TODO)
│   │   └── _ValidationScriptsPartial.cshtml
│   ├── Home/
│   ├── Account/
│   ├── Property/
│   └── _ViewImports.cshtml
│   └── _ViewStart.cshtml
├── wwwroot/
│   ├── js/
│   │   └── ajax-helper.js ✅ (Oluşturuldu)
│   ├── css/
│   └── lib/
├── Models/
├── Services/
├── Program.cs ✅ (Güncellendi)
├── appsettings.json ✅ (Güncellendi)
└── EmlakPortali.MVC.csproj
```

---

## ✨ Temel Kurulum Tamamlandı!

Admin paneli iskeletine başarıyla erişebilirsiniz. Şimdi:
1. **API endpoints'lerinin** tam olarak tanımlanmasını kontrol edin
2. **Genel arayüzü** (_Layout.cshtml) oluşturun
3. **İlan sayfalarını** (Index, Details, Create, Edit) yapın

Başka soruların varsa sorduktan sonra devam edelim! 🚀
