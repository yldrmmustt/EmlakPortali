using EmlakPortali.API.Models.DTOs;

namespace EmlakPortali.API.Services
{
    public interface IPropertyService
    {
        Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync(int? cityId = null, int? categoryId = null, string? status = null);
        Task<PropertyDto?> GetPropertyByIdAsync(int id);
        Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto dto, string userId);
        Task<bool> TogglePropertyStatusAsync(int id);
    }
}
