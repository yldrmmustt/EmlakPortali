using EmlakPortali.API.Models.DTOs;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace EmlakPortali.API.Services
{
    public interface IAuthService
    {
        Task<(bool IsSuccess, string Message)> RegisterAsync(RegisterDto dto);
        Task<(bool IsSuccess, string Token, DateTime Expiration, object User)> LoginAsync(LoginDto dto);
    }
}
