export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  phone?: string;
  rating?: number;
  reviews?: number;
}

export interface Property {
  id: string;
  title: string;
  type: 'Daire' | 'Villa' | 'Yeni proje' | 'Bölge analizi';
  price: number;
  priceUnit: 'once' | 'ay';
  location: string;
  area: number;
  rooms: number;
  bathrooms: number;
  images: string[];
  description: string;
  features: string[];
  seller: User;
  views: number;
  year: number;
  status: 'Aktif' | 'Ýnceleme' | 'Pasif';
}
