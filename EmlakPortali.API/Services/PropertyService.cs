using AutoMapper;
using EmlakPortali.API.Models.DTOs;
using EmlakPortali.API.Models.Entities;
using EmlakPortali.API.Repositories;
using System.Linq;

namespace EmlakPortali.API.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public PropertyService(IPropertyRepository propertyRepository, IMapper mapper, IWebHostEnvironment env)
        {
            _propertyRepository = propertyRepository;
            _mapper = mapper;
            _env = env;
        }

        public async Task<PropertyDto> CreatePropertyAsync(CreatePropertyDto dto, string userId)
        {
            var property = _mapper.Map<Property>(dto);
            property.AppUserId = userId;

            // Görsel Yükleme Mantığı
            if (dto.Images != null && dto.Images.Count > 0)
            {
                var uploadPath = Path.Combine(_env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"), "uploads");
                if (!Directory.Exists(uploadPath)) Directory.CreateDirectory(uploadPath);

                foreach (var file in dto.Images)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    property.Images.Add(new Image
                    {
                        Url = "/uploads/" + fileName,
                        IsMain = property.Images.Count == 0 // İlk resmi ana resim yap
                    });
                }
            }

            await _propertyRepository.AddAsync(property);
            await _propertyRepository.SaveChangesAsync();

            return _mapper.Map<PropertyDto>(property);
        }

        public async Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync(int? cityId = null, int? categoryId = null, string? status = null)
        {
            var properties = await _propertyRepository.GetPropertiesWithDetailsAsync();
            
            // Filtreleme
            if (cityId.HasValue) properties = properties.Where(p => p.CityId == cityId.Value);
            if (categoryId.HasValue) properties = properties.Where(p => p.CategoryId == categoryId.Value);
            if (!string.IsNullOrEmpty(status)) properties = properties.Where(p => p.Status == status);

            return _mapper.Map<IEnumerable<PropertyDto>>(properties);
        }

        public async Task<PropertyDto?> GetPropertyByIdAsync(int id)
        {
            var property = await _propertyRepository.GetPropertyWithDetailsByIdAsync(id);
            if (property == null) return null;

            return _mapper.Map<PropertyDto>(property);
        }

        public async Task<bool> TogglePropertyStatusAsync(int id)
        {
            var property = await _propertyRepository.GetByIdAsync(id);
            if (property == null) return false;

            property.IsActive = !property.IsActive;
            
            _propertyRepository.Update(property);
            await _propertyRepository.SaveChangesAsync();
            
            return true;
        }
    }
}
