export type ListingStatus = 'aktif' | 'incelemede' | 'pasif' | 'bekliyor' | 'supheli' | 'onaylandi';
export type ListingType = 'Satılık' | 'Kiralık';
export type RiskLevel = 'Düşük' | 'Orta' | 'Yüksek';

export interface Property {
  id: number;
  title: string;
  type: ListingType;
  price: number;
  priceLabel: string;
  area: number;
  rooms: string;
  bathrooms: number;
  floor: string;
  buildYear: number;
  address: string;
  district: string;
  city: string;
  views: number;
  status: ListingStatus;
  features: string[];
  description: string;
  agent: Agent;
  images: string[];
}

export interface Agent {
  id: number;
  name: string;
  initials: string;
  title: string;
  company: string;
  rating: number;
  reviewCount: number;
  listingCount: number;
}

export interface ModerationItem {
  id: number;
  title: string;
  type: ListingType;
  price: string;
  seller: string;
  sellerType: string;
  risk: RiskLevel;
  status: ListingStatus;
}

export interface AdminStats {
  totalListings: number;
  totalListingsChange: number;
  totalUsers: number;
  totalUsersChange: number;
  monthlyViews: string;
  monthlyViewsChange: number;
  pendingComplaints: number;
  pendingComplaintsChange: number;
}

export interface ActivityItem {
  id: number;
  type: 'success' | 'warning' | 'info' | 'danger';
  message: string;
  time: string;
  source: string;
}

export interface ChartDataPoint {
  day: string;
  value: number;
}
