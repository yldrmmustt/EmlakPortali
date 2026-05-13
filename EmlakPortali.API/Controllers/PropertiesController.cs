using EmlakPortali.API.Models.DTOs;
using EmlakPortali.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties(
            [FromQuery] int? cityId, [FromQuery] int? districtId,
            [FromQuery] int? categoryId, [FromQuery] string? status,
            [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice,
            [FromQuery] string? roomCount, [FromQuery] string? searchTerm,
            [FromQuery] int page = 1, [FromQuery] int pageSize = 6)
        {
            var properties = await _propertyService.GetAllPropertiesAsync(cityId, categoryId, status);

            // Ek filtreler
            if (districtId.HasValue)
                properties = properties.Where(p => p.DistrictId == districtId.Value);
            if (minPrice.HasValue)
                properties = properties.Where(p => p.Price >= minPrice.Value);
            if (maxPrice.HasValue)
                properties = properties.Where(p => p.Price <= maxPrice.Value);
            if (!string.IsNullOrEmpty(roomCount))
                properties = properties.Where(p => p.RoomCount == roomCount);
            if (!string.IsNullOrEmpty(searchTerm))
                properties = properties.Where(p =>
                    p.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                    p.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase));

            var totalCount = properties.Count();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            var items = properties.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return Ok(new
            {
                items,
                totalCount,
                page,
                pageSize,
                totalPages,
                hasPreviousPage = page > 1,
                hasNextPage = page < totalPages
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null) return NotFound();
            return Ok(property);
        }

        [HttpGet("my-properties")]
        [Authorize]
        public async Task<IActionResult> GetMyProperties()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var all = await _propertyService.GetAllPropertiesAsync();
            var mine = all.Where(p => p.AppUserId == userId).ToList();
            return Ok(mine);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProperty([FromForm] CreatePropertyDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var createdProperty = await _propertyService.CreatePropertyAsync(dto, userId ?? string.Empty);
            return StatusCode(201, new { message = "İlan başarıyla eklendi.", data = createdProperty });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateProperty(int id, [FromForm] CreatePropertyDto dto)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var result = await _propertyService.UpdatePropertyAsync(id, dto, userId ?? string.Empty);
            if (!result) return NotFound(new { message = "İlan bulunamadı veya yetkiniz yok." });
            return Ok(new { message = "İlan güncellendi." });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var isAdmin = User.IsInRole("Admin");
            var result = await _propertyService.DeletePropertyAsync(id, userId ?? string.Empty, isAdmin);
            if (!result) return NotFound(new { message = "İlan bulunamadı veya yetkiniz yok." });
            return Ok(new { message = "İlan silindi." });
        }

        [HttpPut("toggle-status/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var result = await _propertyService.TogglePropertyStatusAsync(id);
            if (!result) return NotFound(new { message = "İlan bulunamadı." });
            return Ok(new { message = "İlan durumu güncellendi." });
        }
    }
}
