import { create } from 'zustand';

interface FilterState {
  location: string;
  priceMin: number;
  priceMax: number;
  propertyType: string[];
  setLocation: (location: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setPropertyType: (types: string[]) => void;
  reset: () => void;
}

const initialState = {
  location: 'Ýstanbul, Türkiye',
  priceMin: 500000,
  priceMax: 2000000,
  propertyType: ['Daire'],
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  setLocation: (location: string) => set({ location }),
  setPriceRange: (priceMin: number, priceMax: number) => set({ priceMin, priceMax }),
  setPropertyType: (propertyType: string[]) => set({ propertyType }),
  reset: () => set(initialState),
}));
