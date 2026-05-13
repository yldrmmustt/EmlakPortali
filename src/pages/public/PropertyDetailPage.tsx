import { useState } from 'react';
import { ArrowLeft, Heart, Share2, MapPin, Ruler, Users, DollarSign, Calendar, Phone, MessageSquare, Download } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProperties } from '../../data/mockProperties';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'Geri' | 'Ara' | 'Projeler'>('Geri');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock property (use id to find from mockProperties or create new one)
  const property = mockProperties.find((p) => p.id === id) || mockProperties[0];

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `?${(price / 1000000).toFixed(1)}M`;
    if (price >= 1000) return `?${(price / 1000).toFixed(0)}k`;
    return `?${price}`;
  };

  const tabs = ['Geri', 'Ara', 'Projeler'];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
          >
            <ArrowLeft size={20} />
            Geri
          </button>

          <div className="flex gap-8">
            {tabs.slice(1).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`font-medium transition ${
                  activeTab === tab
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Heart
                size={24}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Share2 size={24} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center text-6xl">
                ??
              </div>

              <div className="grid grid-cols-4 gap-2">
                {property.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square bg-gray-200 rounded-lg hover:opacity-75 transition ${
                      selectedImageIndex === idx ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-4xl">??</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Title */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">{formatPrice(property.price)}</h1>
                {property.priceUnit === 'ay' && (
                  <span className="text-lg text-light-text">/ay</span>
                )}
              </div>
              <p className="text-light-text">?{(property.price / property.area).toLocaleString('tr-TR')}/m²</p>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
              <div className="flex items-center gap-2 text-light-text">
                <MapPin size={18} />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
              <div>
                <p className="text-xs text-light-text mb-1">Brüt Alan</p>
                <p className="text-2xl font-bold text-gray-900">{property.area}m²</p>
              </div>
              <div>
                <p className="text-xs text-light-text mb-1">Oda</p>
                <p className="text-2xl font-bold text-gray-900">{property.rooms}</p>
              </div>
              <div>
                <p className="text-xs text-light-text mb-1">Banyo</p>
                <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
              </div>
              <div>
                <p className="text-xs text-light-text mb-1">Yapým Yýlý</p>
                <p className="text-2xl font-bold text-gray-900">{property.year}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Açýklama</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellikler</h3>
              <div className="grid grid-cols-3 gap-3">
                {property.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="text-primary-500">?</span>
                    <span className="text-sm font-medium text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Konum</h3>
              <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center text-4xl">
                ???
              </div>
              <p className="text-sm text-light-text mt-2">{property.location}</p>
            </div>
          </div>

          {/* Right Column - Seller Info & CTA */}
          <div className="space-y-6">
            {/* Seller Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
              {/* Seller Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {property.seller.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{property.seller.name}</h3>
                    <p className="text-xs text-light-text">Gayrimenkul Danýþmaný</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(property.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ?
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{property.seller.rating}</span>
                </div>
                <p className="text-xs text-light-text">{property.seller.reviews} deðerlendirme</p>
              </div>

              {/* Price Summary */}
              <div className="bg-light-bg rounded-lg p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-light-text">Fiyat</span>
                  <span className="font-semibold text-gray-900">{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-text">KDV (%18)</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(property.price * 0.18)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-light-text">Tapu harçý (~%4)</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(property.price * 0.04)}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Toplam maliy??</span>
                  <span className="font-bold text-primary-600">
                    {formatPrice(property.price * 1.22)}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition flex items-center justify-center gap-2">
                  <Phone size={20} />
                  Ara
                </button>
                <button className="w-full px-6 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition flex items-center justify-center gap-2">
                  <MessageSquare size={20} />
                  Mesaj gönder
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-light-text">
                  <Phone size={16} />
                  <span>{property.seller.phone}</span>
                </div>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2">
                  <Download size={16} />
                  Ýlan bilgisini indir
                </button>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-light-bg rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Benzer Ýlanlar</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0">??</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          Similar Property {item}
                        </p>
                        <p className="text-xs text-light-text">?4.2M</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">?? Ýpucu</h4>
              <p className="text-xs text-blue-700">
                Satýcýyla iletiþim kurmadan önce, ilaný iyice gözden geçirip sorularýnýzý hazýrlayýn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties Section */}
      <section className="bg-light-bg mt-16 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Bu Bölgedeki Diðer Ýlanlar</h2>
          <div className="grid grid-cols-3 gap-6">
            {mockProperties.slice(0, 3).map((prop) => (
              <div
                key={prop.id}
                onClick={() => navigate(`/property/${prop.id}`)}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center text-4xl">
                  ??
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900 mb-1">{formatPrice(prop.price)}</p>
                  <p className="text-sm text-light-text truncate">{prop.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
