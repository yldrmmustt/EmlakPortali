using Microsoft.AspNetCore.Identity;

namespace EmlakPortali.API.Models.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public string? ProfilePictureUrl { get; set; }

        // Kullanıcının verdiği ilanlar
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
