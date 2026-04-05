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
        public async Task<IActionResult> GetProperties([FromQuery] int? cityId, [FromQuery] int? categoryId, [FromQuery] string? status)
        {
            var properties = await _propertyService.GetAllPropertiesAsync(cityId, categoryId, status);
            return Ok(properties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var property = await _propertyService.GetPropertyByIdAsync(id);
            if (property == null) return NotFound();

            return Ok(property);
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

        [HttpPut("toggle-status/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var result = await _propertyService.TogglePropertyStatusAsync(id);
            if (!result) return NotFound(new { message = "İlan bulunamadı." });

            return Ok(new { message = "İlan durumu başarıyla güncellendi." });
        }
    }
}
