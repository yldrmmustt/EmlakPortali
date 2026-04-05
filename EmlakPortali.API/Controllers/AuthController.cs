using EmlakPortali.API.Models.DTOs;
using EmlakPortali.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(dto);
            if (!result.IsSuccess)
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = result.Message });

            return Ok(new { Status = "Success", Message = result.Message });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var result = await _authService.LoginAsync(dto);
            if (result.IsSuccess)
            {
                return Ok(new
                {
                    token = result.Token,
                    expiration = result.Expiration,
                    user = result.User
                });
            }
            return Unauthorized();
        }
    }
}
