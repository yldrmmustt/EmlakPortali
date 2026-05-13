import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <Home size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-primary-600">Emlaq</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 font-medium hover:text-primary-500 transition">
            Ara
          </Link>
          <Link to="/" className="text-gray-700 font-medium hover:text-primary-500 transition">
            Harita
          </Link>
          <a href="/landing" className="text-gray-700 font-medium hover:text-primary-500 transition">
            Projeler
          </a>
          <a href="#blog" className="text-gray-700 font-medium hover:text-primary-500 transition">
            Blog
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-primary-600 font-semibold border border-primary-600 rounded-lg hover:bg-primary-50 transition">
            Giriþ yap
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition">
            Ýlan ver
          </button>
        </div>
      </div>
    </header>
  );
}
