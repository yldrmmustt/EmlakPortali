using EmlakPortali.API.Models.Entities;
using EmlakPortali.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EmlakPortali.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly IRepository<City> _cityRepository;

        public CitiesController(IRepository<City> cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _cityRepository.GetAllAsync();
            return Ok(cities);
        }
    }
}
