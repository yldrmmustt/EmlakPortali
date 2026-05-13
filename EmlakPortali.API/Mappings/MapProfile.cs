using AutoMapper;
using EmlakPortali.API.Models.DTOs;
using EmlakPortali.API.Models.Entities;

namespace EmlakPortali.API.Mappings
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Property, PropertyDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : ""))
                .ForMember(dest => dest.CityName, opt => opt.MapFrom(src => src.City != null ? src.City.Name : ""))
                .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.District != null ? src.District.Name : ""))
                .ForMember(dest => dest.OwnerName, opt => opt.MapFrom(src => src.AppUser != null ? $"{src.AppUser.FirstName} {src.AppUser.LastName}" : ""))
                .ForMember(dest => dest.OwnerEmail, opt => opt.MapFrom(src => src.AppUser != null ? src.AppUser.Email : ""))
                .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(i => i.Url).ToList()));

            CreateMap<CreatePropertyDto, Property>()
                .ForMember(dest => dest.Images, opt => opt.Ignore());
        }
    }
}
