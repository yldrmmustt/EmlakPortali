using EmlakPortali.MVC.Models;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace EmlakPortali.MVC.Services
{
    /// <summary>
    /// MVC tarafından API'ye yapılan tüm HTTP isteklerini yöneten servis.
    /// </summary>
    public interface IApiService
    {
        // İlanlar
        Task<PaginatedResultViewModel<PropertyViewModel>> GetPropertiesAsync(int? cityId = null, int? districtId = null, int? categoryId = null, string? status = null, decimal? minPrice = null, decimal? maxPrice = null, string? roomCount = null, string? searchTerm = null, int page = 1, int pageSize = 6);
        Task<PropertyViewModel?> GetPropertyByIdAsync(int id);
        Task<bool> CreatePropertyAsync(HttpContext httpContext, MultipartFormDataContent formData);
        Task<bool> UpdatePropertyAsync(HttpContext httpContext, int id, MultipartFormDataContent formData);
        Task<bool> DeletePropertyAsync(HttpContext httpContext, int id);
        Task<bool> TogglePropertyStatusAsync(HttpContext httpContext, int id);

        // Lookup verileri
        Task<List<CityViewModel>> GetCitiesAsync();
        Task<List<CategoryViewModel>> GetCategoriesAsync();
        Task<List<DistrictViewModel>> GetDistrictsByCityAsync(int cityId);

        // Auth
        Task<LoginResponseViewModel?> LoginAsync(LoginViewModel model);
        Task<(bool Success, string Message)> RegisterAsync(RegisterViewModel model);

        // Profil
        Task<UserProfileViewModel?> GetProfileAsync(HttpContext httpContext);
        Task<List<PropertyViewModel>> GetMyPropertiesAsync(HttpContext httpContext);
        Task<(bool Success, string Message)> UpdateProfileAsync(HttpContext httpContext, MultipartFormDataContent formData);
        Task<(bool Success, string Message)> ChangePasswordAsync(HttpContext httpContext, ChangePasswordViewModel model);
        
        // Favoriler
        Task<List<FavoriteViewModel>> GetMyFavoritesAsync(HttpContext httpContext);
        Task<bool> AddToFavoritesAsync(HttpContext httpContext, int propertyId);
        Task<bool> RemoveFromFavoritesAsync(HttpContext httpContext, int propertyId);
        Task<bool> CheckFavoriteAsync(HttpContext httpContext, int propertyId);

        // Yönetim
        Task<List<AdminUserViewModel>> GetUsersAsync(HttpContext httpContext);
        Task<bool> ToggleAdminRoleAsync(HttpContext httpContext, string userId);
        Task<bool> CreateCategoryAsync(HttpContext httpContext, CategoryViewModel model);
        Task<bool> UpdateCategoryAsync(HttpContext httpContext, int id, CategoryViewModel model);
        Task<bool> DeleteCategoryAsync(HttpContext httpContext, int id);
    }

    public class ApiService : IApiService
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonOptions;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
        }

        // =================== İLANLAR ===================

        public async Task<PaginatedResultViewModel<PropertyViewModel>> GetPropertiesAsync(int? cityId = null, int? districtId = null, int? categoryId = null, string? status = null, decimal? minPrice = null, decimal? maxPrice = null, string? roomCount = null, string? searchTerm = null, int page = 1, int pageSize = 6)
        {
            try
            {
                var queryParams = new List<string>();
                if (cityId.HasValue) queryParams.Add($"cityId={cityId}");
                if (districtId.HasValue) queryParams.Add($"districtId={districtId}");
                if (categoryId.HasValue) queryParams.Add($"categoryId={categoryId}");
                if (!string.IsNullOrEmpty(status)) queryParams.Add($"status={status}");
                if (minPrice.HasValue) queryParams.Add($"minPrice={minPrice}");
                if (maxPrice.HasValue) queryParams.Add($"maxPrice={maxPrice}");
                if (!string.IsNullOrEmpty(roomCount)) queryParams.Add($"roomCount={roomCount}");
                if (!string.IsNullOrEmpty(searchTerm)) queryParams.Add($"searchTerm={Uri.EscapeDataString(searchTerm)}");
                queryParams.Add($"page={page}");
                queryParams.Add($"pageSize={pageSize}");

                var url = "Properties?" + string.Join("&", queryParams);

                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<PaginatedResultViewModel<PropertyViewModel>>(json, _jsonOptions)
                        ?? new PaginatedResultViewModel<PropertyViewModel>();
                }
            }
            catch (Exception)
            {
                // API erişilemez durumda — boş sonuç döndür
            }
            return new PaginatedResultViewModel<PropertyViewModel>();
        }

        public async Task<PropertyViewModel?> GetPropertyByIdAsync(int id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"Properties/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<PropertyViewModel>(json, _jsonOptions);
                }
            }
            catch (Exception)
            {
                // API erişilemez
            }
            return null;
        }

        public async Task<bool> CreatePropertyAsync(HttpContext httpContext, MultipartFormDataContent formData)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Post, "Properties");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Content = formData;

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdatePropertyAsync(HttpContext httpContext, int id, MultipartFormDataContent formData)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Put, $"Properties/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Content = formData;

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeletePropertyAsync(HttpContext httpContext, int id)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Delete, $"Properties/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> TogglePropertyStatusAsync(HttpContext httpContext, int id)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Put, $"Properties/toggle-status/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        // =================== LOOKUP VERİLERİ ===================

        public async Task<List<CityViewModel>> GetCitiesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("Cities");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<CityViewModel>>(json, _jsonOptions) ?? new List<CityViewModel>();
                }
            }
            catch (Exception) { }
            return new List<CityViewModel>();
        }

        public async Task<List<CategoryViewModel>> GetCategoriesAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("Categories");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<CategoryViewModel>>(json, _jsonOptions) ?? new List<CategoryViewModel>();
                }
            }
            catch (Exception) { }
            return new List<CategoryViewModel>();
        }

        public async Task<List<DistrictViewModel>> GetDistrictsByCityAsync(int cityId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"Districts/by-city/{cityId}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<DistrictViewModel>>(json, _jsonOptions) ?? new List<DistrictViewModel>();
                }
            }
            catch (Exception) { }
            return new List<DistrictViewModel>();
        }

        // =================== AUTH ===================

        public async Task<LoginResponseViewModel?> LoginAsync(LoginViewModel model)
        {
            var json = JsonSerializer.Serialize(model, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("Auth/login", content);
            if (response.IsSuccessStatusCode)
            {
                var responseJson = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<LoginResponseViewModel>(responseJson, _jsonOptions);
            }
            return null;
        }

        public async Task<(bool Success, string Message)> RegisterAsync(RegisterViewModel model)
        {
            var json = JsonSerializer.Serialize(model, _jsonOptions);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("Auth/register", content);
            var responseJson = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return (true, "Hesap başarıyla oluşturuldu.");
            }
            else
            {
                try
                {
                    var errorObj = JsonSerializer.Deserialize<ApiErrorViewModel>(responseJson, _jsonOptions);
                    return (false, errorObj?.Message ?? "Bilinmeyen bir hata oluştu.");
                }
                catch
                {
                    return (false, "Kayıt işlemi sırasında bir hata oluştu.");
                }
            }
        }

        // =================== PROFİL ===================

        public async Task<UserProfileViewModel?> GetProfileAsync(HttpContext httpContext)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return null;

            var request = new HttpRequestMessage(HttpMethod.Get, "Auth/profile");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<UserProfileViewModel>(json, _jsonOptions);
            }
            return null;
        }

        public async Task<List<PropertyViewModel>> GetMyPropertiesAsync(HttpContext httpContext)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return new List<PropertyViewModel>();

            var request = new HttpRequestMessage(HttpMethod.Get, "Properties/my-properties");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<PropertyViewModel>>(json, _jsonOptions) ?? new List<PropertyViewModel>();
            }
            return new List<PropertyViewModel>();
        }

        public async Task<(bool Success, string Message)> UpdateProfileAsync(HttpContext httpContext, MultipartFormDataContent formData)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return (false, "Oturum süresi dolmuş.");

            var request = new HttpRequestMessage(HttpMethod.Put, "Auth/profile");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            request.Content = formData;

            var response = await _httpClient.SendAsync(request);
            var responseJson = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return (true, "Profil başarıyla güncellendi.");
            }

            try
            {
                var errorObj = JsonSerializer.Deserialize<ApiErrorViewModel>(responseJson, _jsonOptions);
                return (false, errorObj?.Message ?? "Profil güncellenirken bir hata oluştu.");
            }
            catch
            {
                return (false, "Profil güncellenirken bilinmeyen bir hata oluştu.");
            }
        }

        public async Task<(bool Success, string Message)> ChangePasswordAsync(HttpContext httpContext, ChangePasswordViewModel model)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return (false, "Oturum süresi dolmuş.");

            var request = new HttpRequestMessage(HttpMethod.Put, "Auth/change-password");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            
            var jsonContent = JsonSerializer.Serialize(new { currentPassword = model.CurrentPassword, newPassword = model.NewPassword });
            request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request);
            var responseJson = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return (true, "Şifre başarıyla güncellendi.");
            }

            try
            {
                var errorObj = JsonSerializer.Deserialize<ApiErrorViewModel>(responseJson, _jsonOptions);
                return (false, errorObj?.Message ?? "Şifre güncellenirken bir hata oluştu.");
            }
            catch
            {
                return (false, "Şifre güncellenirken bilinmeyen bir hata oluştu.");
            }
        }

        // =================== FAVORİLER ===================

        public async Task<List<FavoriteViewModel>> GetMyFavoritesAsync(HttpContext httpContext)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return new List<FavoriteViewModel>();

            var request = new HttpRequestMessage(HttpMethod.Get, "Favorites");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<FavoriteViewModel>>(json, _jsonOptions) ?? new List<FavoriteViewModel>();
            }
            return new List<FavoriteViewModel>();
        }

        public async Task<bool> AddToFavoritesAsync(HttpContext httpContext, int propertyId)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Post, $"Favorites/{propertyId}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> RemoveFromFavoritesAsync(HttpContext httpContext, int propertyId)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Delete, $"Favorites/{propertyId}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> CheckFavoriteAsync(HttpContext httpContext, int propertyId)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Get, $"Favorites/check/{propertyId}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                try 
                {
                    using var doc = JsonDocument.Parse(json);
                    return doc.RootElement.GetProperty("isFavorite").GetBoolean();
                }
                catch { return false; }
            }
            return false;
        }



        public async Task<bool> CreateCategoryAsync(HttpContext httpContext, CategoryViewModel model)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Post, "Categories");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var content = new StringContent(JsonSerializer.Serialize(model, _jsonOptions), Encoding.UTF8, "application/json");
            request.Content = content;

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateCategoryAsync(HttpContext httpContext, int id, CategoryViewModel model)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Put, $"Categories/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var content = new StringContent(JsonSerializer.Serialize(model, _jsonOptions), Encoding.UTF8, "application/json");
            request.Content = content;

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> DeleteCategoryAsync(HttpContext httpContext, int id)
        {
            var token = httpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token)) return false;

            var request = new HttpRequestMessage(HttpMethod.Delete, $"Categories/{id}");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.SendAsync(request);
            return response.IsSuccessStatusCode;
        }

        public async Task<List<AdminUserViewModel>> GetUsersAsync(HttpContext httpContext)
        {
            try
            {
                var token = httpContext.Session.GetString("JWTToken");
                if (string.IsNullOrEmpty(token)) return new List<AdminUserViewModel>();

                var request = new HttpRequestMessage(HttpMethod.Get, "Auth/users");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var response = await _httpClient.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<List<AdminUserViewModel>>(json, _jsonOptions)
                        ?? new List<AdminUserViewModel>();
                }
            }
            catch { }
            return new List<AdminUserViewModel>();
        }

        public async Task<bool> ToggleAdminRoleAsync(HttpContext httpContext, string userId)
        {
            try
            {
                var token = httpContext.Session.GetString("JWTToken");
                if (string.IsNullOrEmpty(token)) return false;

                var request = new HttpRequestMessage(HttpMethod.Post, $"Auth/toggle-admin/{userId}");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                request.Content = new StringContent("", Encoding.UTF8, "application/json");

                var response = await _httpClient.SendAsync(request);
                return response.IsSuccessStatusCode;
            }
            catch { return false; }
        }
    }
}
