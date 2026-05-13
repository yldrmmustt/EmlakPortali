import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, FileText, MessageSquare, Eye, Settings } from 'lucide-react';

export default function SellerLayout() {
  const location = useLocation();

  const menuItems = [
    { path: '/seller/dashboard', icon: LayoutDashboard, label: 'Genel bakýþ', badge: null },
    { path: '/seller/properties', icon: Home, label: 'Ýlanlarým', badge: '12' },
    { path: '/seller/add-property', icon: FileText, label: 'Yeni ilan', badge: null },
    { path: '/seller/messages', icon: MessageSquare, label: 'Mesajlar', badge: '3' },
  ];

  const systemItems = [
    { path: '/seller/analytics', icon: Eye, label: 'Analitik' },
    { path: '/seller/settings', icon: Settings, label: 'Ayarlar' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-600 text-white p-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary-500 rounded-lg"></div>
          <span className="text-xl font-bold">Emlaq</span>
        </div>

        {/* User Info */}
        <div className="bg-primary-700 rounded-lg p-4 mb-8">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-bold text-sm mb-2">
            MK
          </div>
          <p className="font-semibold text-sm">Meral Koçak</p>
          <p className="text-xs text-primary-200">Ýlan Veren Paneli</p>
        </div>

        {/* Main Menu */}
        <nav className="mb-8">
          <p className="text-xs font-semibold text-primary-300 uppercase mb-3">ANA MENU</p>
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-200 hover:bg-primary-700'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* System Menu */}
        <nav className="mb-8 pb-8 border-b border-primary-700">
          <p className="text-xs font-semibold text-primary-300 uppercase mb-3">ARAÇLAR</p>
          <div className="space-y-2">
            {systemItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-200 hover:bg-primary-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <button className="w-full px-4 py-2 text-primary-200 hover:text-white font-medium text-sm transition">
          Çýkýþ yap
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
