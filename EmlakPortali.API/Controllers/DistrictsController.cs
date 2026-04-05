using EmlakPortali.API.Models.Entities;
using EmlakPortali.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictsController : ControllerBase
    {
        private readonly IRepository<District> _districtRepository;

        public DistrictsController(IRepository<District> districtRepository)
        {
            _districtRepository = districtRepository;
        }

        [HttpGet("by-city/{cityId}")]
        public async Task<IActionResult> GetDistrictsByCity(int cityId)
        {
            var allDistricts = await _districtRepository.GetAllAsync();
            var filtered = allDistricts.Where(d => d.CityId == cityId).ToList();
            return Ok(filtered);
        }
    }
}
