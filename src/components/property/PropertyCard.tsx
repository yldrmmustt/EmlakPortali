import { Heart, MapPin, Ruler, Users, Eye } from 'lucide-react';
import { Property } from '../../store/propertyStore';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `?${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `?${(price / 1000).toFixed(0)}k`;
    }
    return `?${price}`;
  };

  return (
    <Link to={`/property/${property.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
        <img
          src={property.images[imageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              property.type === 'Daire'
                ? 'bg-emerald-100 text-emerald-700'
                : property.type === 'Villa'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {property.type}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>

        {/* Status Badge */}
        {property.status === 'Aktif' && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-lg text-xs font-semibold text-green-600">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Aktif
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-3">
          <div className="text-xl font-bold text-gray-900">
            {formatPrice(property.price)}
            {property.priceUnit === 'ay' && (
              <span className="text-sm text-light-text font-normal"> /ay</span>
            )}
          </div>
          <p className="text-xs text-light-text">?{(property.price / property.area).toFixed(0)}/m�</p>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-1 mb-3">
          <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-light-text">{property.location}</p>
        </div>

        {/* Features */}
        <div className="flex gap-4 mb-3 py-3 border-y border-gray-100 text-xs">
          <div className="flex items-center gap-1">
            <Users size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">{property.rooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900">{property.area}m�</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">{property.year}</span>
          </div>
        </div>

        {/* Views */}
        <div className="flex items-center gap-1 text-xs text-light-text">
          <Eye size={14} />
          <span>{property.views} görüntüleme</span>
        </div>
        </div>
        </div>
        </Link>
  );
}
