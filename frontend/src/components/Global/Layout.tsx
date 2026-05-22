import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Store, Calendar, User, Utensils } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/utils';
import { NotificationManager } from './NotificationManager';
const logoUrl = 'https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778259234/Logo_jwzmd2.png';

export function Layout() {
  const location = useLocation();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setIsScrolled(mainRef.current.scrollTop > 50);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const navItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Mapa', path: '/mapa', icon: MapIcon },
    { name: 'Comércios', path: '/comercios', icon: Store },
    { name: 'Eventos', path: '/eventos', icon: Calendar },
    // { name: 'Vagas', path: '/estacionamentos', icon: Car },
    { name: 'Culinária', path: '/culinaria', icon: Utensils },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <header className={cn(
        "hidden md:block fixed top-0 z-60 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white border-b border-[#dadce0] shadow-sm py-0" 
          : isHome 
            ? "bg-transparent border-transparent py-2" 
            : "bg-white border-b border-[#dadce0] py-0"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 ">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src={logoUrl} alt="VIVAJU" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[var(--primary-pale)]',
                    location.pathname === item.path 
                      ? 'text-[var(--primary)] bg-[var(--primary-pale)]' 
                      : isScrolled || !isHome ? 'text-[var(--gray-text)]' : 'text-white hover:text-white/80'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && user.tipo === 'prefeitura' && (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg outline-none active:scale-95 transition-transform cursor-pointer"
                >
                  <div className="font-black text-[10px]">GP</div>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[var(--gray-border)] z-50">
                    <Link 
                      to="/prefeitura" 
                      className="block px-4 py-3 text-sm text-[var(--gray-text)] hover:bg-[var(--primary-pale)] transition-colors border-b border-[var(--gray-border)]"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}
            {user ? (
              <Link 
                to="/dashboard" 
                className={cn(
                  "p-2 rounded-full transition-colors flex items-center gap-2",
                  isScrolled || !isHome ? "hover:bg-[var(--primary-pale)] text-[var(--gray-text)]" : "hover:bg-white/10 text-white"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-[var(--primary-pale)] flex items-center justify-center text-[var(--primary)]">
                  <User className="w-5 h-5" />
                </div>
                <span className="hidden md:inline font-medium text-sm">{user.nome}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm",
                  isScrolled || !isHome 
                    ? "text-white bg-[var(--primary)] hover:bg-[var(--primary-dark)]" 
                    : "text-[var(--primary)] bg-white hover:bg-gray-100"
                )}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main 
        ref={mainRef}
        className={cn(
          "flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-[var(--cream)] pb-0 md:pb-0",
          !isHome && "md:pt-16"
        )}
      >
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - M3 Style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-60 border-t border-[var(--gray-border)] bg-white pb-safe mobile-bottom-nav">
        <div className="flex h-16 items-center justify-around px-2">
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
                  'flex items-center justify-center w-12 h-8 rounded-full transition-all duration-200',
                  isActive ? 'bg-[var(--primary-pale)] text-[var(--primary)]' : 'text-[var(--gray-text)] group-hover:bg-[var(--primary-pale)]'
                )}>
                  <Icon className={cn('h-5 w-5', isActive ? 'fill-[var(--primary)]' : '')} />
                </div>
                <span className={cn(
                  'text-[10px] font-bold transition-colors',
                  isActive ? 'text-[var(--primary)]' : 'text-[var(--gray-text)]'
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
          {/* Item de Perfil/Login Adicionado para Mobile */}
          <Link
            to={user ? "/dashboard" : "/login"}
            className="flex flex-col items-center justify-center w-full h-full gap-1 group"
          >
            <div className={cn(
              'flex items-center justify-center w-12 h-8 rounded-full transition-all duration-200',
              location.pathname === (user ? "/dashboard" : "/login") ? 'bg-[var(--primary-pale)] text-[var(--primary)]' : 'text-[var(--gray-text)] group-hover:bg-[var(--primary-pale)]'
            )}>
              <User className={cn('h-5 w-5', location.pathname === (user ? "/dashboard" : "/login") ? 'fill-[var(--primary)]' : '')} />
            </div>
            <span className={cn(
              'text-[10px] font-bold transition-colors',
              location.pathname === (user ? "/dashboard" : "/login") ? 'text-[var(--primary)]' : 'text-[var(--gray-text)]'
            )}>
              {user ? 'Perfil' : 'Entrar'}
            </span>
          </Link>
        </div>
      </nav>
      <NotificationManager />
    </div>
  );
}
