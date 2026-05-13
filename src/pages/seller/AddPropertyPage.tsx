import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1: Temel Bilgiler
  netArea: number;
  totalArea: number;
  rooms: string;
  bathrooms: string;
  buildYear: number;
  heatingType: string;

  // Step 2: Detaylar & Özellikler
  description: string;
  features: string[];

  // Step 3: Fotoðraflar
  images: string[];

  // Step 4: Fiyat & Yayýnla
  price: number;
  priceType: 'once' | 'ay';
}

const features = [
  'Otopark',
  'Asansör',
  'Havuz',
  'Doðalgaz',
  'Güvenlik',
  'Güney çevre',
  'Bahçe',
  'Engelli eriþimi',
];

const heatingTypes = [
  'Kombi',
  'Merkezi sistem',
  'Isý pompa',
  'Elektrik',
  'Doðalgaz',
];

export default function AddPropertyPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>({
    netArea: 110,
    totalArea: 130,
    rooms: '3+1',
    bathrooms: '4 / 8',
    buildYear: 2020,
    heatingType: 'Kombi',
    description: '',
    features: ['Otopark', 'Güney çevre'],
    images: [],
    price: 0,
    priceType: 'once',
  });

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as FormStep);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as FormStep);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const steps = [
    { number: 1, label: 'Temel bilgiler' },
    { number: 2, label: 'Detaylar & özellikler' },
    { number: 3, label: 'Fotoðraflar' },
    { number: 4, label: 'Fiyat & yayýnla' },
  ];

  return (
    <div className="min-h-screen bg-light-bg p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
              disabled={currentStep === 1}
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yeni ilan ekle</h1>
              <p className="text-light-text text-sm mt-1">Taslak kaydedildi</p>
            </div>
          </div>
          <div className="text-right text-sm text-light-text">
            4 adýmlý yayýnlama akýþý
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex gap-8 mb-12 border-b border-gray-300 pb-6">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentStep(step.number as FormStep)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition ${
                  currentStep === step.number
                    ? 'bg-primary-500 text-white'
                    : currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {currentStep > step.number ? <Check size={18} /> : step.number}
              </div>
              <span
                className={`text-sm font-medium ${
                  currentStep === step.number ? 'text-primary-500' : 'text-light-text'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Temel Bilgiler */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mülk bilgileri</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Net m²
                  </label>
                  <input
                    type="number"
                    value={formData.netArea}
                    onChange={(e) =>
                      handleInputChange('netArea', parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Brüt m²
                  </label>
                  <input
                    type="number"
                    value={formData.totalArea}
                    onChange={(e) =>
                      handleInputChange('totalArea', parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Oda sayýsý
                  </label>
                  <select
                    value={formData.rooms}
                    onChange={(e) => handleInputChange('rooms', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  >
                    <option>1</option>
                    <option>1+1</option>
                    <option>2+1</option>
                    <option>3+1</option>
                    <option>4+1</option>
                    <option>5+1</option>
                    <option>5+2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Kat / Toplam kat
                  </label>
                  <input
                    type="text"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    placeholder="4 / 8"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Yapým yýlý
                  </label>
                  <input
                    type="number"
                    value={formData.buildYear}
                    onChange={(e) =>
                      handleInputChange('buildYear', parseInt(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Isýtma türü
                  </label>
                  <select
                    value={formData.heatingType}
                    onChange={(e) => handleInputChange('heatingType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  >
                    {heatingTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Özellikler</h3>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => handleFeatureToggle(feature)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition ${
                        formData.features.includes(feature)
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Detaylar & Özellikler */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Detaylar & özellikler</h2>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Açýklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Ýlanýnýzý detaylý bir þekilde açýklayýn..."
                rows={8}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
              />
              <p className="text-xs text-light-text mt-2">Minimum 50 karakter olmalýdýr.</p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Seçili özellikler</h3>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Fotoðraflar */}
        {currentStep === 3 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fotoðraflar</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <div className="text-4xl mb-3">??</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fotoðraf yükleyin
              </h3>
              <p className="text-light-text mb-4">
                Ýlanýnýz için en az 1, en fazla 20 fotoðraf yükleyebilirsiniz.
              </p>
              <button className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition">
                Fotoðraf seç
              </button>
            </div>

            <p className="text-xs text-light-text mt-4">
              Resimler JPEG, PNG veya WebP formatýnda olmalýdýr.
            </p>
          </div>
        )}

        {/* Step 4: Fiyat & Yayýnla */}
        {currentStep === 4 && (
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Fiyat & yayýnla</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Fiyat
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange('price', parseInt(e.target.value))
                    }
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Fiyat türü
                  </label>
                  <select
                    value={formData.priceType}
                    onChange={(e) =>
                      handleInputChange('priceType', e.target.value as 'once' | 'ay')
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium outline-none focus:border-primary-500"
                  >
                    <option value="once">Satýþ (bir kez)</option>
                    <option value="ay">Kiralýk (aylýk)</option>
                  </select>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-sm">
                <p className="text-gray-900 font-semibold">
                  Tahmini fiyat/m²: ?
                  {formData.price && formData.netArea
                    ? (formData.price / formData.netArea).toLocaleString('tr-TR')
                    : '0'}
                </p>
              </div>

              <button className="w-full bg-primary-500 text-white font-semibold py-4 rounded-lg hover:bg-primary-600 transition text-lg">
                Yayýnla
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            disabled={currentStep === 1}
          >
            ? Geri
          </button>
          <button
            onClick={handleNext}
            className={`flex-1 px-6 py-3 font-semibold rounded-lg transition ${
              currentStep === 4
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {currentStep === 4 ? 'Devam et ?' : 'Devam et ?'}
          </button>
        </div>
      </div>
    </div>
  );
}
