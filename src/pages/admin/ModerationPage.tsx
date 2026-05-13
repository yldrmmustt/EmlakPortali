import { useState } from 'react';
import { Download, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ModerationListing {
  id: string;
  title: string;
  type: string;
  price: string;
  seller: string;
  riskScore: 'Düþük' | 'Orta' | 'Yüksek';
  status: 'Bekliyor' | 'Onaylandý' | 'Reddedildi';
  actions?: string[];
}

type FilterTab = 'Tümü' | 'Yüksek risk' | 'Yeni üye' | 'Þikayet var';

export default function ModerationPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Tümü');
  const [listings, setListings] = useState<ModerationListing[]>([
    {
      id: '1',
      title: 'Lüks 4+2 Nisantasý',
      type: 'Satýlýk · ?18.500.000',
      price: '?18.500.000',
      seller: 'Koç Gayrimenkul',
      riskScore: 'Düþük',
      status: 'Bekliyor',
      actions: ['Onay', 'Reddet'],
    },
    {
      id: '2',
      title: 'Stüdyo daire Beyoðlu',
      type: 'Kiralýk · ?8.500/ay',
      price: '?8.500/ay',
      seller: 'Yeni kullanýcý',
      riskScore: 'Yüksek',
      status: 'Bekliyor',
      actions: ['Ýncele', 'Reddet'],
    },
    {
      id: '3',
      title: 'Ofis katý Maslak',
      type: 'Satýlýk · ?6.200.000',
      price: '?6.200.000',
      seller: 'ERA Türkiye',
      riskScore: 'Düþük',
      status: 'Bekliyor',
      actions: ['Onay', 'Reddet'],
    },
    {
      id: '4',
      title: '2+1 Ata?ehir Residence',
      type: 'Kiralýk · ?18.000/ay',
      price: '?18.000/ay',
      seller: 'Bireysel - 2 ilan',
      riskScore: 'Orta',
      status: 'Bekliyor',
      actions: ['Onay', 'Ýncele'],
    },
    {
      id: '5',
      title: 'Bahçeli villa Büyükçekmece',
      type: 'Satýlýk · ?12.900.000',
      price: '?12.900.000',
      seller: 'Sotheby\'s TR',
      riskScore: 'Düþük',
      status: 'Onaylandý',
      actions: [],
    },
  ]);

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Düþük':
        return 'bg-green-100 text-green-700';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-700';
      case 'Yüksek':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Bekliyor':
        return 'bg-orange-100 text-orange-700';
      case 'Onaylandý':
        return 'bg-green-100 text-green-700';
      case 'Reddedildi':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleApprove = (id: string) => {
    setListings(
      listings.map((item) =>
        item.id === id ? { ...item, status: 'Onaylandý' } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setListings(
      listings.map((item) =>
        item.id === id ? { ...item, status: 'Reddedildi' } : item
      )
    );
  };

  const filterTabs: FilterTab[] = ['Tümü', 'Yüksek risk', 'Yeni üye', 'Þikayet var'];

  return (
    <div className="p-8 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ýlan moderasyon & onay</h1>
            <p className="text-light-text mt-1">Risk skoru tabanlý denetim</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
            <Download size={18} />
            Dýþa aktar
          </button>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ýlan yönetimi</h2>
          <p className="text-light-text">
            48.240 ilan · 12 onay bekliyor
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6 pb-4 border-b border-gray-300">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                activeFilter === tab
                  ? 'bg-admin-accent text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'Tümü' && <span>Tümü (12)</span>}
              {tab === 'Yüksek risk' && <span>Yüksek risk (3)</span>}
              {tab === 'Yeni üye' && <span>Yeni üye</span>}
              {tab === 'Þikayet var' && <span>Þikayet var</span>}
            </button>
          ))}
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-6 py-4 font-semibold text-gray-900 text-sm">
                  Ýlan
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900 text-sm">
                  Ýlan veren
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900 text-sm">
                  Risk skoru
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900 text-sm">
                  Durum
                </th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900 text-sm">
                  Ýþlem
                </th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  {/* Ýlan Bilgisi */}
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{listing.title}</h3>
                      <p className="text-xs text-light-text">{listing.type}</p>
                    </div>
                  </td>

                  {/* Ýlan Veren */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{listing.seller}</p>
                  </td>

                  {/* Risk Skoru */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadgeColor(listing.riskScore)}`}>
                      {listing.riskScore}
                    </span>
                  </td>

                  {/* Durum */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {listing.status === 'Bekliyor' && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                      {listing.status === 'Onaylandý' && (
                        <CheckCircle size={16} className="text-green-600" />
                      )}
                      {listing.status === 'Reddedildi' && (
                        <XCircle size={16} className="text-red-600" />
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </div>
                  </td>

                  {/* Ýþlemler */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      {listing.status === 'Bekliyor' && (
                        <>
                          <button
                            onClick={() => handleApprove(listing.id)}
                            className="px-4 py-2 bg-admin-accent text-white rounded font-semibold text-xs hover:bg-blue-700 transition"
                          >
                            Onay
                          </button>
                          <button
                            onClick={() => handleReject(listing.id)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded font-semibold text-xs hover:bg-gray-300 transition"
                          >
                            Reddet
                          </button>
                        </>
                      )}
                      {listing.status === 'Onaylandý' && (
                        <span className="text-green-600 font-semibold text-xs">Görüntüle</span>
                      )}
                      {listing.status === 'Reddedildi' && (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Risk Skoru Açýklamasý</h3>
            <p className="text-blue-700 text-xs mt-1">
              Düþük: Güvenilir satýcý, tam bilgiler | Orta: Yeni satýcý veya eksik bilgiler | Yüksek: Þüpheli
              fiyatlandýrma, eksik detaylar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
