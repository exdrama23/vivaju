import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Store, Calendar, Car, User, Utensils } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/utils';
import logoCaju from '@/assets/logocaju.png';

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Mapa', path: '/mapa', icon: MapIcon },
    { name: 'Comércios', path: '/comercios', icon: Store },
    { name: 'Eventos', path: '/eventos', icon: Calendar },
    { name: 'Vagas', path: '/estacionamentos', icon: Car },
    { name: 'Culinária', path: '/culinaria', icon: Utensils },
  ];

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <header className="sticky top-0 z-50 w-full border-b border-[#dadce0] bg-white shrink-0">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logoCaju} alt="VIVAJU" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#f1f3f4]',
                    location.pathname === item.path 
                      ? 'text-[#1a73e8] bg-[#e8f0fe]' 
                      : 'text-[#5f6368]'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link 
                to="/dashboard" 
                className="p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8]">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:inline font-medium text-sm">{user.nome}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 rounded-full text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1765cc] transition-colors shadow-sm"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-auto bg-[#ffffff]">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - M3 Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#dadce0] bg-white pb-safe">
        <div className="flex h-24 items-center justify-around px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full gap-1 group"
              >
                <div className={cn(
                  'flex items-center justify-center w-16 h-8 rounded-full transition-all duration-200',
                  isActive ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'text-[#5f6368] group-hover:bg-[#f1f3f4]'
                )}>
                  <Icon className={cn('h-6 w-6', isActive ? 'fill-[#1a73e8]' : '')} />
                </div>
                <span className={cn(
                  'text-[11px] font-medium transition-colors',
                  isActive ? 'text-[#1a73e8]' : 'text-[#5f6368]'
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}