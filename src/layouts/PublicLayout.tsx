import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-400">© 2024 Emlaq. Tüm haklarý saklýdýr.</p>
        </div>
      </footer>
    </div>
  );
}
