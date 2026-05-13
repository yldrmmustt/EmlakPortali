import { ArrowRight, Home, TrendingUp, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const features = [
    {
      icon: <Home size={32} />,
      title: '48.000+ Ýlan',
      description: 'Türkiye genelinde en geniþ emlak ilaný seçimi',
      color: 'bg-emerald-50 text-primary-500',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Akýllý Arama',
      description: 'Fiyat, konum ve özellikler ile hýzlý filtreleme',
      color: 'bg-blue-50 text-blue-500',
    },
    {
      icon: <Users size={32} />,
      title: 'Güvenilir Satýcýlar',
      description: 'Doðrulanmýþ ve deðerlendirilen profesyonel ajanlar',
      color: 'bg-purple-50 text-purple-500',
    },
    {
      icon: <Shield size={32} />,
      title: 'Güvenli Ýþlem',
      description: 'Tüm iþlemler platform tarafýndan korunur',
      color: 'bg-orange-50 text-orange-500',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmet Kaya',
      role: 'Gayrimenkul Danýþmaný',
      text: 'Emlaq ile iþ akýþýný %40 hýzlandýrdýk. Müþteri memnuniyeti çok arttý.',
      avatar: 'AK',
    },
    {
      name: 'Ayþe Yýldýz',
      role: 'Ev Sahibi',
      text: '3 gün içinde ideal kiracýsýný buldum. Harika bir platform!',
      avatar: 'AY',
    },
    {
      name: 'Meral Koçak',
      role: 'Satýcý',
      text: 'Þeffaf fiyatlandýrma ve hýzlý onay süreci beni çok etkiledi.',
      avatar: 'MK',
    },
  ];

  const stats = [
    { number: '48K+', label: 'Aktif Ýlan' },
    { number: '125K+', label: 'Kullanýcý' },
    { number: '2.4M+', label: 'Aylýk Görüntüleme' },
    { number: '98%', label: 'Memnuniyet' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-primary-50 via-white to-primary-50 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full opacity-20 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                  Hayalindeki evi bul
                </h1>
                <p className="text-xl text-light-text leading-relaxed">
                  Türkiye'nin en geniþ emlak platformunda 48.000+ ilaný keþfet. Güvenilir satýcýlar,
                  þeffaf fiyatlandýrma ve akýllý arama.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Þimdi Ara
                  <ArrowRight size={20} />
                </Link>
                <button className="px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition">
                  Daha Fazla Bilgi
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-3xl font-bold text-primary-600">{stat.number}</p>
                    <p className="text-sm text-light-text">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-primary-100 rounded-2xl flex items-center justify-center text-6xl shadow-2xl">
                ??
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    ?
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Güvenli Ýþlem</p>
                    <p className="text-xs text-light-text">Tüm þikayetler korunur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden Emlaq?</h2>
            <p className="text-lg text-light-text max-w-2xl mx-auto">
              Emlaq, emlak piyasasýný dönüþtürmek için en modern teknoloji ile inþa edildi.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition group"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-light-text text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Nasýl Çalýþýr?</h2>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Ara & Filtrele',
                description: 'Konum, fiyat ve özellikler ile ilanlarý filtrele',
                icon: '??',
              },
              {
                step: 2,
                title: 'Detaylarý Ýnce??',
                description: 'Tam fotoðraflar, özellikler ve satýcý bilgileri gör',
                icon: '??',
              },
              {
                step: 3,
                title: 'Ýletiþim & Görüþ',
                description: 'Satýcý ile direkt iletiþim kur ve yerini gez',
                icon: '??',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-light-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Kullanýcýlar Neler Söylüyor?
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-light-text">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ?
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Baþlamaya Hazýr Mýsýn?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Þimdi üye ol ve binlerce ilaný keþfet veya kendi ilanýný yayýnla.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Ýlanlarý Gözat
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-primary-700 transition">
              Ýlan Ver
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">Emlaq Hakkýnda</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Biz Kimiz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Kariyer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Kullanýcýlar</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ýlan Ara
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Harita
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Projeler
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Satýcýlar</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Panel
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Fiyatlandýrma
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Yardým
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Kullaným Þartlarý
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Gizlilik Politikasý
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Ýletiþim
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm">© 2024 Emlaq. Tüm haklarý saklýdýr.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
