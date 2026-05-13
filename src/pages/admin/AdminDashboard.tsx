import { BarChart3, Users, Eye, AlertCircle, ArrowUp, Download } from 'lucide-react';

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface RecentActivity {
  id: string;
  title: string;
  date: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  const stats: DashboardStat[] = [
    {
      label: 'Toplam ilan',
      value: '48.240',
      change: '+8%',
      icon: <BarChart3 size={24} />,
      color: 'blue',
    },
    {
      label: 'Kayýtlý kullanýcý',
      value: '124.800',
      change: '+12%',
      icon: <Users size={24} />,
      color: 'green',
    },
    {
      label: 'Aylýk görüntüleme',
      value: '2.4M',
      change: '+22%',
      icon: <Eye size={24} />,
      color: 'purple',
    },
    {
      label: 'Bekleyen þikayet',
      value: '17',
      change: '+3',
      icon: <AlertCircle size={24} />,
      color: 'orange',
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      title: 'Kadýköy 3+1 ilaný onaylandý',
      date: '2 dk önce',
      type: 'success',
      message: 'Admin: YD',
      icon: '?',
    },
    {
      id: '2',
      title: 'Sahte ilan bildirildi: #48291',
      date: '15 dk önce',
      type: 'error',
      message: 'Kullanýcý þikayeti',
      icon: '??',
    },
    {
      id: '3',
      title: 'Yeni kurumsal üye: Koç Gayrimenkul',
      date: '1 saat önce',
      type: 'info',
      message: 'Sistem',
      icon: '??',
    },
    {
      id: '4',
      title: 'Fiyat anomalisi tespit edildi: #47880',
      date: '3 saat önce',
      type: 'warning',
      message: 'Otomatik tarama',
      icon: '??',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-500 bg-blue-50';
      case 'green':
        return 'text-green-500 bg-green-50';
      case 'purple':
        return 'text-purple-500 bg-purple-50';
      case 'orange':
        return 'text-orange-500 bg-orange-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-8 bg-light-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-light-text mt-1">Çarþamba, 13 Mayýs 2026</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition">
            <Download size={18} />
            Rapor al
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                  <ArrowUp size={16} />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-sm text-light-text">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Chart Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Yeni ilan / gün (bu ay)</h2>
              <a href="#" className="text-primary-500 text-sm font-semibold hover:underline">
                Detay
              </a>
            </div>

            {/* Mock Bar Chart */}
            <div className="flex items-end gap-2 h-48">
              {[
                { day: '6', value: 35 },
                { day: '7', value: 42 },
                { day: '8', value: 38 },
                { day: '9', value: 55 },
                { day: '10', value: 48 },
                { day: '11', value: 72 },
                { day: '12', value: 45 },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-lg transition ${
                      item.day === '11' ? 'bg-blue-600' : 'bg-blue-200'
                    }`}
                    style={{ height: `${(item.value / 80) * 100}%` }}
                  />
                  <span className="text-xs text-light-text">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Son aktiviteler</h2>
              <a href="#" className="text-primary-500 text-sm font-semibold hover:underline">
                Tümü
              </a>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const getActivityIcon = () => {
                  switch (activity.type) {
                    case 'success':
                      return (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg">
                          ?
                        </div>
                      );
                    case 'error':
                      return (
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-lg">
                          ??
                        </div>
                      );
                    case 'warning':
                      return (
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-lg">
                          ??
                        </div>
                      );
                    case 'info':
                    default:
                      return (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
                          ??
                        </div>
                      );
                  }
                };

                return (
                  <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                    {getActivityIcon()}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-light-text">{activity.message}</p>
                      <p className="text-xs text-light-text mt-1">{activity.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
