namespace EmlakPortali.API.Models.DTOs
{
    public class PropertyDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        
        public int GrossSquareMeters { get; set; }
        public int NetSquareMeters { get; set; }
        public string RoomCount { get; set; } = string.Empty;
        public int BuildingAge { get; set; }
        public string FloorLocation { get; set; } = string.Empty;
        public int TotalFloors { get; set; }
        public string HeatingType { get; set; } = string.Empty;
        public int BathCount { get; set; }
        public bool HasBalcony { get; set; }
        public bool HasElevator { get; set; }
        public bool IsFurnished { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public string AppUserId { get; set; } = string.Empty;
        public string OwnerName { get; set; } = string.Empty;
        public string OwnerEmail { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public int CategoryId { get; set; }
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string CityName { get; set; } = string.Empty;
        public string DistrictName { get; set; } = string.Empty;
        public List<string> ImageUrls { get; set; } = new List<string>();
    }

    public class CreatePropertyDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        
        public int GrossSquareMeters { get; set; }
        public int NetSquareMeters { get; set; }
        public string RoomCount { get; set; } = string.Empty;
        public int BuildingAge { get; set; }
        public string FloorLocation { get; set; } = string.Empty;
        public int TotalFloors { get; set; }
        public string HeatingType { get; set; } = string.Empty;
        public int BathCount { get; set; }
        public bool HasBalcony { get; set; }
        public bool HasElevator { get; set; }
        public bool IsFurnished { get; set; }
        public string Status { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        
        public IFormFileCollection? Images { get; set; }
    }
}
