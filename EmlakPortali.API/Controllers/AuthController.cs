using EmlakPortali.API.Models.DTOs;
using EmlakPortali.API.Models.Entities;
using EmlakPortali.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;

        public AuthController(IAuthService authService, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _authService = authService;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _authService.RegisterAsync(dto);
            if (!result.IsSuccess)
                return StatusCode(500, new { Status = "Error", Message = result.Message });
            return Ok(new { Status = "Success", Message = result.Message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var result = await _authService.LoginAsync(dto);
            if (result.IsSuccess)
                return Ok(new { token = result.Token, expiration = result.Expiration, user = result.User });
            return Unauthorized();
        }

        // Profil bilgisi getir
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                registerDate = user.RegisterDate,
                profilePictureUrl = user.ProfilePictureUrl,
                role = roles.Contains("Admin") ? "Admin" : "User"
            });
        }

        // Profil güncelle
        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromForm] string firstName, [FromForm] string lastName, IFormFile? profilePicture)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            user.FirstName = firstName;
            user.LastName = lastName;

            if (profilePicture != null && profilePicture.Length > 0)
            {
                var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "profiles");
                Directory.CreateDirectory(uploadsDir);
                var fileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(profilePicture.FileName)}";
                var filePath = Path.Combine(uploadsDir, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await profilePicture.CopyToAsync(stream);
                user.ProfilePictureUrl = $"/uploads/profiles/{fileName}";
            }

            await _userManager.UpdateAsync(user);
            return Ok(new { message = "Profil güncellendi." });
        }

        // Şifre değiştir
        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            if (!result.Succeeded)
                return BadRequest(new { message = string.Join(", ", result.Errors.Select(e => e.Description)) });

            return Ok(new { message = "Şifre başarıyla güncellendi." });
        }

        // Kullanıcı listesi — Admin only
        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers()
        {
            var users = _userManager.Users.ToList();
            var result = new List<object>();
            foreach (var u in users)
            {
                var roles = await _userManager.GetRolesAsync(u);
                result.Add(new
                {
                    id = u.Id,
                    firstName = u.FirstName,
                    lastName = u.LastName,
                    email = u.Email,
                    registerDate = u.RegisterDate,
                    role = roles.Contains("Admin") ? "Admin" : "User"
                });
            }
            return Ok(result);
        }

        // Admin rolü toggle
        [HttpPost("toggle-admin/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleAdmin(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound();

            if (await _userManager.IsInRoleAsync(user, "Admin"))
            {
                await _userManager.RemoveFromRoleAsync(user, "Admin");
                if (!await _userManager.IsInRoleAsync(user, "User"))
                    await _userManager.AddToRoleAsync(user, "User");
                return Ok(new { message = "Admin rolü kaldırıldı." });
            }
            else
            {
                if (!await _roleManager.RoleExistsAsync("Admin"))
                    await _roleManager.CreateAsync(new AppRole { Name = "Admin" });
                await _userManager.AddToRoleAsync(user, "Admin");
                return Ok(new { message = "Admin rolü verildi." });
            }
        }
    }
}
