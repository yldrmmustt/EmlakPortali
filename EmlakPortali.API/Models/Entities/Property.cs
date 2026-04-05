namespace EmlakPortali.API.Models.Entities
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        
        // Emlak Detayları
        public int GrossSquareMeters { get; set; } // Brüt m2
        public int NetSquareMeters { get; set; } // Net m2
        public string RoomCount { get; set; } = string.Empty; // 3+1, 2+1 vb.
        public int BuildingAge { get; set; } // Bina Yaşı
        public string FloorLocation { get; set; } = string.Empty; // Bulunduğu Kat
        public int TotalFloors { get; set; } // Kat Sayısı
        public string HeatingType { get; set; } = string.Empty; // Isıtma (Kombi vb.)
        public int BathCount { get; set; } // Banyo Sayısı
        public bool HasBalcony { get; set; } // Balkon
        public bool HasElevator { get; set; } // Asansör
        public bool IsFurnished { get; set; } // Eşyalı mı
        public string Status { get; set; } = "Satılık"; // Satılık, Kiralık, vb.
        
        // Yönetim
        public bool IsActive { get; set; } = true; // Aktif/Pasif
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // FKs
        public int CategoryId { get; set; }
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        public string AppUserId { get; set; } = string.Empty;

        // Navigation
        public virtual Category Category { get; set; } = null!;
        public virtual City City { get; set; } = null!;
        public virtual District District { get; set; } = null!;
        public virtual AppUser AppUser { get; set; } = null!;
        public virtual ICollection<Image> Images { get; set; } = new List<Image>();
    }
}
