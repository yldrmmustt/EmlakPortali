using EmlakPortali.API.Data;
using EmlakPortali.API.Models.Entities;

using Microsoft.AspNetCore.Identity;

namespace EmlakPortali.API.Extensions
{
    public static class DataSeeding
    {
        public static async Task SeedAsync(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<EmlakDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

            context.Database.EnsureCreated();

            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new AppRole() { Name = "Admin" });

            if (!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new AppRole() { Name = "User" });

            var adminUser = await userManager.FindByEmailAsync("admin@emlakportali.com");
            if (adminUser == null)
            {
                adminUser = new AppUser
                {
                    UserName = "admin@emlakportali.com",
                    Email = "admin@emlakportali.com",
                    FirstName = "System",
                    LastName = "Admin",
                    SecurityStamp = Guid.NewGuid().ToString()
                };
                await userManager.CreateAsync(adminUser, "Admin123!");
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }

            if (!context.Cities.Any())
            {
                context.Cities.AddRange(
                    new City { Name = "İstanbul" },
                    new City { Name = "Ankara" },
                    new City { Name = "İzmir" },
                    new City { Name = "Antalya" },
                    new City { Name = "Bursa" }
                );
                context.SaveChanges();
            }

            if (!context.Districts.Any())
            {
                // Simple seeding assuming IDs 1-5
                var ist = context.Cities.FirstOrDefault(c => c.Name == "İstanbul");
                if (ist != null)
                {
                    context.Districts.AddRange(
                        new District { Name = "Kadıköy", CityId = ist.Id },
                        new District { Name = "Beşiktaş", CityId = ist.Id },
                        new District { Name = "Üsküdar", CityId = ist.Id }
                    );
                }
                context.SaveChanges();
            }
                
            var ank = context.Cities.FirstOrDefault(c => c.Name == "Ankara");
            if (ank != null && !context.Districts.Any(d => d.CityId == ank.Id))
            {
                context.Districts.AddRange(
                    new District { Name = "Çankaya", CityId = ank.Id },
                    new District { Name = "Keçiören", CityId = ank.Id }
                );
            }
            
            var izm = context.Cities.FirstOrDefault(c => c.Name == "İzmir");
            if (izm != null && !context.Districts.Any(d => d.CityId == izm.Id))
            {
                context.Districts.AddRange(
                    new District { Name = "Karşıyaka", CityId = izm.Id },
                    new District { Name = "Bornova", CityId = izm.Id },
                    new District { Name = "Buca", CityId = izm.Id }
                );
            }

            var ant = context.Cities.FirstOrDefault(c => c.Name == "Antalya");
            if (ant != null && !context.Districts.Any(d => d.CityId == ant.Id))
            {
                context.Districts.AddRange(
                    new District { Name = "Muratpaşa", CityId = ant.Id },
                    new District { Name = "Kepez", CityId = ant.Id },
                    new District { Name = "Konyaaltı", CityId = ant.Id },
                    new District { Name = "Alanya", CityId = ant.Id }
                );
            }

            var bur = context.Cities.FirstOrDefault(c => c.Name == "Bursa");
            if (bur != null && !context.Districts.Any(d => d.CityId == bur.Id))
            {
                context.Districts.AddRange(
                    new District { Name = "Nilüfer", CityId = bur.Id },
                    new District { Name = "Osmangazi", CityId = bur.Id }
                );
            }

            context.SaveChanges();

            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category { Name = "Konut" },
                    new Category { Name = "İş Yeri" },
                    new Category { Name = "Arsa" },
                    new Category { Name = "Bina" }
                );
                context.SaveChanges();
            }
        }
    }
}
