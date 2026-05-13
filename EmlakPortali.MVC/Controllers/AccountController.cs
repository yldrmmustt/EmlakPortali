using EmlakPortali.MVC.Models;
using EmlakPortali.MVC.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.MVC.Controllers
{
    public class AccountController : Controller
    {
        private readonly IApiService _apiService;

        public AccountController(IApiService apiService)
        {
            _apiService = apiService;
        }

        // =================== GİRİŞ ===================

        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            // Zaten giriş yapılmışsa ana sayfaya yönlendir
            if (HttpContext.Session.GetString("JWTToken") != null)
                return RedirectToAction("Index", "Home");

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
        {
            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var result = await _apiService.LoginAsync(model);
                if (result != null)
                {
                    // Token ve kullanıcı bilgilerini session'a kaydet
                    HttpContext.Session.SetString("JWTToken", result.Token);
                    if (result.User != null)
                    {
                        HttpContext.Session.SetString("UserName", $"{result.User.FirstName} {result.User.LastName}");
                        HttpContext.Session.SetString("UserEmail", result.User.Email ?? "");
                        HttpContext.Session.SetString("UserRole", result.User.Role ?? "User");
                    }

                    // Admin ise admin paneline, değilse anasayfaya git
                    if (result.User?.Role == "Admin")
                        return RedirectToAction("Index", "Admin");

                    if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                        return Redirect(returnUrl);

                    return RedirectToAction("Index", "Home");
                }

                ModelState.AddModelError("", "E-posta veya şifre hatalı.");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Giriş sırasında bir hata oluştu: {ex.Message}");
            }

            return View(model);
        }

        // =================== KAYIT ===================

        [HttpGet]
        public IActionResult Register()
        {
            if (HttpContext.Session.GetString("JWTToken") != null)
                return RedirectToAction("Index", "Home");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            try
            {
                var (success, message) = await _apiService.RegisterAsync(model);
                if (success)
                {
                    TempData["SuccessMessage"] = "Hesabınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.";
                    return RedirectToAction("Login");
                }

                ModelState.AddModelError("", message);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Kayıt sırasında bağlantı hatası: {ex.Message}");
            }

            return View(model);
        }

        // =================== ÇIKIŞ ===================

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }

        // =================== PROFİL ===================

        public async Task<IActionResult> Profile()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", new { returnUrl = "/Account/Profile" });

            var profile = await _apiService.GetProfileAsync(HttpContext);
            if (profile == null)
                return RedirectToAction("Login");

            var myProperties = await _apiService.GetMyPropertiesAsync(HttpContext);
            ViewBag.MyProperties = myProperties;
            ViewBag.ApiBaseUrl = "http://localhost:5095";

            return View(profile);
        }

        [HttpGet]
        public async Task<IActionResult> EditProfile()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login");

            var profile = await _apiService.GetProfileAsync(HttpContext);
            if (profile == null)
                return RedirectToAction("Login");

            return View(profile);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditProfile(UserProfileViewModel model, IFormFile? profilePicture)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login");

            var formData = new MultipartFormDataContent();
            formData.Add(new StringContent(model.FirstName ?? ""), "FirstName");
            formData.Add(new StringContent(model.LastName ?? ""), "LastName");
            formData.Add(new StringContent(model.Email ?? ""), "Email");

            if (profilePicture != null && profilePicture.Length > 0)
            {
                var stream = profilePicture.OpenReadStream();
                formData.Add(new StreamContent(stream), "ProfilePicture", profilePicture.FileName);
            }

            var (success, message) = await _apiService.UpdateProfileAsync(HttpContext, formData);
            if (success)
            {
                // Session'daki kullanıcı adını güncelle
                HttpContext.Session.SetString("UserName", $"{model.FirstName} {model.LastName}");
                TempData["SuccessMessage"] = "Profiliniz başarıyla güncellendi.";
                return RedirectToAction("Profile");
            }

            ModelState.AddModelError("", message);
            return View(model);
        }

        [HttpGet]
        public IActionResult ChangePassword()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login");

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login");

            if (!ModelState.IsValid)
                return View(model);

            var (success, message) = await _apiService.ChangePasswordAsync(HttpContext, model);
            if (success)
            {
                TempData["SuccessMessage"] = "Şifreniz başarıyla güncellendi.";
                return RedirectToAction("Profile");
            }

            ModelState.AddModelError("", message);
            return View(model);
        }

        // =================== FAVORİLER ===================

        public async Task<IActionResult> Favorites()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", new { returnUrl = "/Account/Favorites" });

            var favorites = await _apiService.GetMyFavoritesAsync(HttpContext);
            return View(favorites);
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite(int propertyId)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return Json(new { success = false, message = "Giriş yapmanız gerekiyor." });

            var result = await _apiService.AddToFavoritesAsync(HttpContext, propertyId);
            return Json(new { success = result });
        }

        [HttpPost]
        public async Task<IActionResult> RemoveFavorite(int propertyId)
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return Json(new { success = false, message = "Giriş yapmanız gerekiyor." });

            var result = await _apiService.RemoveFromFavoritesAsync(HttpContext, propertyId);
            return Json(new { success = result });
        }

        // =================== İLANLARIM ===================

        public async Task<IActionResult> MyProperties()
        {
            var token = HttpContext.Session.GetString("JWTToken");
            if (string.IsNullOrEmpty(token))
                return RedirectToAction("Login", new { returnUrl = "/Account/MyProperties" });

            var properties = await _apiService.GetMyPropertiesAsync(HttpContext);
            return View(properties);
        }
    }
}
