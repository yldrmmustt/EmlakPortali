namespace EmlakPortali.API.Models.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Konut, İş Yeri, Arsa, vb.
        
        // Navigation
        public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
    }
}
