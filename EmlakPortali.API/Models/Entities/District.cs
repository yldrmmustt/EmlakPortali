namespace EmlakPortali.API.Models.Entities
{
    public class District
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // FK
        public int CityId { get; set; }
        // Navigation
        public virtual City City { get; set; } = null!;
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
