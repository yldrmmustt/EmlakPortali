using EmlakPortali.MVC.Models;
using EmlakPortali.MVC.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.MVC.Controllers
{
    public class PropertyController : Controller
    {
        private readonly IApiService _apiService;

        public PropertyController(IApiService apiService)
        {
            _apiService = apiService;
        }

        // =================== İLAN LİSTESİ ===================

        public async Task<IActionResult> Index(
            int? cityId, int? districtId, int? categoryId,
            string? status, decimal? minPrice, decimal? maxPrice,
            string? roomCount, string? searchTerm, int page = 1)
        {
            var result = await _apiService.GetPropertiesAsync(
                cityId, districtId, categoryId, status,
                minPrice, maxPrice, roomCount, searchTerm, page);

            ViewBag.Cities = await _apiService.GetCitiesAsync();
            ViewBag.Categories = await _apiService.GetCategoriesAsync();

            // Filtre değerlerini ViewBag'e at
            ViewBag.CityId = cityId;
            ViewBag.DistrictId = districtId;
            ViewBag.CategoryId = categoryId;
            ViewBag.Status = status;
            ViewBag.MinPrice = minPrice;
            ViewBag.MaxPrice = maxPrice;
            ViewBag.RoomCount = roomCount;
            ViewBag.SearchTerm = searchTerm;

            return View(result);
        }

        // =================== İLAN DETAY ===================

        public async Task<IActionResult> Details(int id)
        {
            var property = await _apiService.GetPropertyByIdAsync(id);
            if (property == null)
                return NotFound();

            // Favori kontrolü (giriş yapılmışsa)
            var token = HttpContext.Session.GetString("JWTToken");
            if (!string.IsNullOrEmpty(token))
                ViewBag.IsFavorite = await _apiService.CheckFavoriteAsync(HttpContext, id);
            else
                ViewBag.IsFavorite = false;

            return View(property);
        }

        // =================== İLAN OLUŞTUR ===================

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account", new { returnUrl = "/Property/Create" });

            ViewBag.Cities = await _apiService.GetCitiesAsync();
            ViewBag.Categories = await _apiService.GetCategoriesAsync();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(IFormCollection form, List<IFormFile> images)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account");

            var formData = new MultipartFormDataContent();

            // Form alanlarını ekle
            foreach (var key in form.Keys)
                formData.Add(new StringContent(form[key].ToString()), key);

            // Görselleri ekle
            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    var stream = image.OpenReadStream();
                    formData.Add(new StreamContent(stream), "Images", image.FileName);
                }
            }

            var success = await _apiService.CreatePropertyAsync(HttpContext, formData);
            if (success)
            {
                TempData["SuccessMessage"] = "İlanınız başarıyla oluşturuldu.";
                return RedirectToAction("MyProperties", "Account");
            }

            ViewBag.Cities = await _apiService.GetCitiesAsync();
            ViewBag.Categories = await _apiService.GetCategoriesAsync();
            ModelState.AddModelError("", "İlan oluşturulurken bir hata oluştu.");
            return View();
        }

        // =================== İLAN DÜZENLE ===================

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account");

            var property = await _apiService.GetPropertyByIdAsync(id);
            if (property == null) return NotFound();

            ViewBag.Cities = await _apiService.GetCitiesAsync();
            ViewBag.Categories = await _apiService.GetCategoriesAsync();
            if (property.CityId > 0)
                ViewBag.Districts = await _apiService.GetDistrictsByCityAsync(property.CityId);

            return View(property);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, IFormCollection form, List<IFormFile> images)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account");

            var formData = new MultipartFormDataContent();

            foreach (var key in form.Keys)
                formData.Add(new StringContent(form[key].ToString()), key);

            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    var stream = image.OpenReadStream();
                    formData.Add(new StreamContent(stream), "Images", image.FileName);
                }
            }

            var success = await _apiService.UpdatePropertyAsync(HttpContext, id, formData);
            if (success)
            {
                TempData["SuccessMessage"] = "İlan başarıyla güncellendi.";
                return RedirectToAction("MyProperties", "Account");
            }

            ModelState.AddModelError("", "İlan güncellenirken bir hata oluştu.");
            return RedirectToAction("Edit", new { id });
        }

        // =================== İLAN SİL ===================

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", "Account");

            var success = await _apiService.DeletePropertyAsync(HttpContext, id);
            if (success)
                TempData["SuccessMessage"] = "İlan başarıyla silindi.";
            else
                TempData["ErrorMessage"] = "İlan silinirken bir hata oluştu.";

            return RedirectToAction("MyProperties", "Account");
        }

        // =================== AJAX: İlçeler ===================

        [HttpGet]
        public async Task<IActionResult> GetDistricts(int cityId)
        {
            var districts = await _apiService.GetDistrictsByCityAsync(cityId);
            return Json(districts);
        }
    }
}
