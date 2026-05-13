import { useState } from 'react';
import { Search, MapPin, DollarSign, Home, Users } from 'lucide-react';
import PropertyCard from '../../components/property/PropertyCard';
import { mockProperties } from '../../data/mockProperties';
import { useFilterStore } from '../../store/filterStore';

export default function HomePage() {
  const { location, priceMin, priceMax, propertyType, setLocation, setPriceRange, setPropertyType } = useFilterStore();
  const [activeFilter, setActiveFilter] = useState<string>('Sat�l�k');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(['Daire']);

  const propertyTypes = ['Daire', 'Villa', 'Yeni proje', 'B�lge analizi'];
  const listingTypes = ['Sat�l�k', 'Kiral�k', 'Yeni proje', 'B�lge analizi'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Hayalindeki evi bul</h1>
          <p className="text-xl text-light-text mb-12">T�rkiye genelinde 48.000+ ilan</p>

          {/* Search Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {/* Konum */}
              <div className="relative">
                <label className="block text-xs font-semibold text-light-text uppercase mb-2">Konum</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                  <MapPin size={18} className="text-primary-500 mr-2" />
                  <input
                    type="text"
                    placeholder="�stanbul, T�rkiye"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              {/* T�r */}
              <div>
                <label className="block text-xs font-semibold text-light-text uppercase mb-2">T�r</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none">
                  <option>Konut</option>
                  <option>Ticari</option>
                  <option>Arazi</option>
                </select>
              </div>

              {/* Fiyat Aral��� */}
              <div>
                <label className="block text-xs font-semibold text-light-text uppercase mb-2">Fiyat Aral���</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
                  <DollarSign size={18} className="text-primary-500 mr-2" />
                  <span className="text-sm font-medium">
                    ?500k � ?2M
                  </span>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button className="w-full bg-primary-500 text-white rounded-lg py-3 font-semibold hover:bg-primary-600 transition flex items-center justify-center gap-2">
                  <Search size={18} />
                  Ara
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-6">
            {listingTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`pb-4 font-medium transition border-b-2 ${
                  activeFilter === type
                    ? 'text-primary-500 border-primary-500'
                    : 'text-light-text border-transparent hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type Filters */}
        <div className="flex gap-3 mb-8 pb-6 border-b border-gray-200">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                if (selectedPropertyTypes.includes(type)) {
                  setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type));
                } else {
                  setSelectedPropertyTypes([...selectedPropertyTypes, type]);
                }
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                selectedPropertyTypes.includes(type)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type === 'Daire' && <Home size={16} className="inline mr-2" />}
              {type}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-light-text font-medium">
            {mockProperties.length} ilan
          </p>
          <button className="text-primary-500 font-semibold hover:text-primary-600 transition">
            T�m filtreleri g�ster ?
          </button>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
