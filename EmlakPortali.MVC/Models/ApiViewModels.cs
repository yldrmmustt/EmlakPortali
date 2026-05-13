using System.ComponentModel.DataAnnotations;

namespace EmlakPortali.MVC.Models
{
    // API'den gelen ilan verisi
    public class PropertyViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public int GrossSquareMeters { get; set; }
        public int NetSquareMeters { get; set; }
        public string RoomCount { get; set; } = string.Empty;
        public int BuildingAge { get; set; }
        public string FloorLocation { get; set; } = string.Empty;
        public int TotalFloors { get; set; }
        public string HeatingType { get; set; } = string.Empty;
        public int BathCount { get; set; }
        public bool HasBalcony { get; set; }
        public bool HasElevator { get; set; }
        public bool IsFurnished { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string AppUserId { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }

        public string CategoryName { get; set; } = string.Empty;
        public string CityName { get; set; } = string.Empty;
        public string DistrictName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        public List<string> ImageUrls { get; set; } = new List<string>();
    }

    // Şehir modeli
    public class CityViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    // İlçe modeli
    public class DistrictViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CityId { get; set; }
    }

    // Kategori modeli
    public class CategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    // Login isteği
    public class LoginViewModel
    {
        [Required(ErrorMessage = "E-posta adresi zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre zorunludur.")]
        public string Password { get; set; } = string.Empty;
    }

    // Register isteği
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "E-posta adresi zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre zorunludur.")]
        [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Ad alanı zorunludur.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Soyad alanı zorunludur.")]
        public string LastName { get; set; } = string.Empty;
    }

    // Login API yanıtı
    public class LoginResponseViewModel
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public UserInfoViewModel? User { get; set; }
    }

    // Kullanıcı bilgisi
    public class UserInfoViewModel
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
    }

    // API hata yanıtı
    public class ApiErrorViewModel
    {
        public string Status { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    // Sayfalanmış API yanıtı
    public class PaginatedResultViewModel<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public bool HasPreviousPage { get; set; }
        public bool HasNextPage { get; set; }
    }

    // Kullanıcı profil bilgisi
    public class UserProfileViewModel
    {
        public string Id { get; set; } = string.Empty;

        [Required(ErrorMessage = "Ad alanı zorunludur.")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Soyad alanı zorunludur.")]
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime RegisterDate { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string Role { get; set; } = "User";
    }

    public class FavoriteViewModel
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        public DateTime CreatedDate { get; set; }
        public FavoritePropertyViewModel Property { get; set; } = new();
    }

    public class FavoritePropertyViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string CityName { get; set; } = string.Empty;
        public string DistrictName { get; set; } = string.Empty;
        public string RoomCount { get; set; } = string.Empty;
        public int GrossSquareMeters { get; set; }
        public int NetSquareMeters { get; set; }
        public string? ImageUrl { get; set; }
    }

    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "Mevcut şifre zorunludur.")]
        public string CurrentPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Yeni şifre zorunludur.")]
        [MinLength(6, ErrorMessage = "Yeni şifre en az 6 karakter olmalıdır.")]
        public string NewPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre tekrarı zorunludur.")]
        [Compare("NewPassword", ErrorMessage = "Yeni şifreler eşleşmiyor.")]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
    public class AdminUserViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public DateTime RegisterDate { get; set; }
    }
}
