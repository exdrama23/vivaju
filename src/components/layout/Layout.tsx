import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Store, Calendar, Car, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/utils';

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Mapa', path: '/mapa', icon: MapIcon },
    { name: 'Comércios', path: '/comercios', icon: Store },
    { name: 'Eventos', path: '/eventos', icon: Calendar },
    { name: 'Vagas', path: '/estacionamentos', icon: Car },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            VIVAJU
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-blue-600',
                  location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">{user.nome}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white pb-safe">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full gap-1 text-xs',
                  isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}