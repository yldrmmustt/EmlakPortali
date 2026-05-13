import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, AlertCircle, BarChart3, Settings, LogOut, Bell } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const mainMenuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/listings', icon: FileText, label: 'Ýlanlar', badge: '12' },
    { path: '/admin/users', icon: Users, label: 'Kullanýcýlar' },
    { path: '/admin/moderation', icon: AlertCircle, label: 'Þikayetler', badge: '5' },
  ];

  const systemMenuItems = [
    { path: '/admin/reports', icon: BarChart3, label: 'Raporlar' },
    { path: '/admin/settings', icon: Settings, label: 'Bildirimler' },
    { path: '/admin/site-settings', icon: Settings, label: 'Site ayarlarý' },
    { path: '/admin/security', icon: Settings, label: 'Ýçerik denetimi' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-admin-bg text-white p-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-admin-accent rounded-lg"></div>
          <div>
            <span className="text-lg font-bold block">Emlaq</span>
            <span className="text-xs text-gray-400">ADMIN</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-900 rounded-lg p-3 mb-6 flex items-center gap-2">
          <Bell size={18} className="text-admin-accent" />
          <span className="text-sm font-medium">2 yeni bildirim</span>
        </div>

        {/* Main Menu */}
        <nav className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">ANA MENU</p>
          <div className="space-y-2">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-admin-accent text-white'
                      : 'text-gray-400 hover:bg-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* System Menu */}
        <nav className="mb-8 pb-8 border-b border-gray-800">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">SÝSTEM</p>
          <div className="space-y-2">
            {systemMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition ${
                    isActive
                      ? 'bg-admin-accent text-white'
                      : 'text-gray-400 hover:bg-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Security Section */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">GÜVENLÝK</p>
          <Link
            to="/admin/security"
            className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm text-gray-400 hover:bg-gray-900 transition"
          >
            <LogOut size={18} />
            <span>Ýçerik denetimi</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="bg-gray-900 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-admin-accent rounded-full flex items-center justify-center font-bold text-sm">
            YD
          </div>
          <div>
            <p className="font-semibold text-sm">Yusuf Demir</p>
            <p className="text-xs text-gray-400">Süper admin</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
