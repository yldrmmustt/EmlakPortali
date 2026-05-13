import { create } from 'zustand';

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
  seller: {
    name: string;
    phone: string;
    rating: number;
    reviews: number;
  };
  views: number;
  year: number;
  status: 'Aktif' | 'Ýnceleme' | 'Pasif';
}

interface PropertyStore {
  properties: Property[];
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  favorites: [],
  addFavorite: (id: string) => set((state) => ({
    favorites: [...state.favorites, id],
  })),
  removeFavorite: (id: string) => set((state) => ({
    favorites: state.favorites.filter((fav) => fav !== id),
  })),
}));
