namespace EmlakPortali.API.Models.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public bool IsMain { get; set; } // Ana fotoğraf mı?

        // FK
        public int PropertyId { get; set; }
        // Navigation
        public virtual Property Property { get; set; } = null!;
    }
}
