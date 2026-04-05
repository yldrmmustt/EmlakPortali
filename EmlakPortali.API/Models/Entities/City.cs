namespace EmlakPortali.API.Models.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Navigation
        public virtual ICollection<District> Districts { get; set; } = new List<District>();
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
