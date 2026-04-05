using EmlakPortali.API.Data;
using EmlakPortali.API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmlakPortali.API.Repositories
{
    public interface IPropertyRepository : IRepository<Property>
    {
        Task<IEnumerable<Property>> GetPropertiesWithDetailsAsync();
        Task<Property?> GetPropertyWithDetailsByIdAsync(int id);
    }

    public class PropertyRepository : Repository<Property>, IPropertyRepository
    {
        public PropertyRepository(EmlakDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Property>> GetPropertiesWithDetailsAsync()
        {
            return await _dbSet
                .Include(p => p.Category)
                .Include(p => p.City)
                .Include(p => p.District)
                .Include(p => p.Images)
                .ToListAsync();
        }

        public async Task<Property?> GetPropertyWithDetailsByIdAsync(int id)
        {
            return await _dbSet
                .Include(p => p.Category)
                .Include(p => p.City)
                .Include(p => p.District)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}
