using EmlakPortali.MVC.Models;
using EmlakPortali.MVC.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.MVC.Controllers
{
    public class AdminController : Controller
    {
        private readonly IApiService _apiService;

        public AdminController(IApiService apiService)
        {
            _apiService = apiService;
        }

        private IActionResult HandleUnauthorized()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account", new { returnUrl = "/Admin/Index" });
            TempData["ErrorMessage"] = "Bu sayfaya erişmek için Admin yetkisi gereklidir.";
            return RedirectToAction("Index", "Home");
        }

        private bool IsAdmin()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            var role = HttpContext.Session.GetString("UserRole");
            return !string.IsNullOrEmpty(token) && role == "Admin";
        }

        // =================== DASHBOARD ===================

        public async Task<IActionResult> Index()
        {
            if (!IsAdmin()) return HandleUnauthorized();

            var propertiesResult = await _apiService.GetPropertiesAsync(pageSize: 200);
            var users = await _apiService.GetUsersAsync(HttpContext);

            ViewBag.Properties = propertiesResult?.Items ?? new List<PropertyViewModel>();
            ViewBag.UserCount = users?.Count ?? 0;

            return View();
        }

        // =================== İLAN YÖNETİMİ ===================

        public async Task<IActionResult> Properties(string? status, int page = 1)
        {
            if (!IsAdmin()) return HandleUnauthorized();

            var result = await _apiService.GetPropertiesAsync(status: status, page: page, pageSize: 50);
            ViewBag.CurrentStatus = status;
            return View(result?.Items ?? new List<PropertyViewModel>());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> TogglePropertyStatus(int id)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            await _apiService.TogglePropertyStatusAsync(HttpContext, id);
            TempData["SuccessMessage"] = "İlan durumu güncellendi.";
            return RedirectToAction("Properties");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            await _apiService.DeletePropertyAsync(HttpContext, id);
            TempData["SuccessMessage"] = "İlan silindi.";
            return RedirectToAction("Properties");
        }

        // =================== KULLANICI YÖNETİMİ ===================

        public async Task<IActionResult> Users()
        {
            if (!IsAdmin()) return HandleUnauthorized();
            var users = await _apiService.GetUsersAsync(HttpContext);
            return View(users ?? new List<AdminUserViewModel>());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ToggleAdmin(string id)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            var success = await _apiService.ToggleAdminRoleAsync(HttpContext, id);
            TempData[success ? "SuccessMessage" : "ErrorMessage"] = success ? "Kullanıcı rolü güncellendi." : "İşlem başarısız.";
            return RedirectToAction("Users");
        }

        // =================== KATEGORİ YÖNETİMİ ===================

        public async Task<IActionResult> Categories()
        {
            if (!IsAdmin()) return HandleUnauthorized();
            var categories = await _apiService.GetCategoriesAsync();
            return View(categories ?? new List<CategoryViewModel>());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateCategory(string name)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            if (!string.IsNullOrWhiteSpace(name))
            {
                await _apiService.CreateCategoryAsync(HttpContext, new CategoryViewModel { Name = name });
                TempData["SuccessMessage"] = "Kategori eklendi.";
            }
            return RedirectToAction("Categories");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateCategory(int id, string name)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            await _apiService.UpdateCategoryAsync(HttpContext, id, new CategoryViewModel { Id = id, Name = name });
            TempData["SuccessMessage"] = "Kategori güncellendi.";
            return RedirectToAction("Categories");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if (!IsAdmin()) return HandleUnauthorized();
            await _apiService.DeleteCategoryAsync(HttpContext, id);
            TempData["SuccessMessage"] = "Kategori silindi.";
            return RedirectToAction("Categories");
        }
    }
}
