import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, Coffee, Utensils, Music, MapPin, Package, Palette, MoreHorizontal, X, Beer, Pizza } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { cn, formatarCategoria } from '@/utils/utils';

interface RecommendedFiltersProps {
  filtrosRecomendados: string[];
  filtroAtual: { name: string; [key: string]: any };
  setFiltroAtual: (categoria: string) => void;
  buscandoPorCategoria?: boolean;
  onViewMore?: () => void;
  navigateOnSelect?: boolean;
  center?: boolean;
  showMoreOnMobile?: boolean;
  useAnimatedIcons?: boolean;
}

// Lottie Animation Icon Component
const RestaurantIcon = ({ className = "w-14 h-14" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/animations/restaurant-open.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-lg">🍽️</span>;
  }

  return <div ref={containerRef} className={cn("pointer-events-none", className)} />;
};

// Lottie Animation Icon Component for "Tudo"
const SearchHotelIcon = ({ className = "w-14 h-14" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/animations/location.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-lg">🔍</span>;
  }

  return <div ref={containerRef} className={cn("pointer-events-none", className)} style={{ filter: 'brightness(0) invert(1)' }} />;
};

const defaultCategoryIcons: { [key: string]: React.ReactNode } = {
  'tudo': <Sparkles className="w-6 h-6" />,
  'perfumaria': <Palette className="w-6 h-6" />,
  'moda': <ShoppingBag className="w-6 h-6" />,
  'café': <Coffee className="w-6 h-6" />,
  'bares': <Beer className="w-6 h-6" />,
  'bar': <Beer className="w-6 h-6" />,
  'pizzarias': <Pizza className="w-6 h-6" />,
  'pizza': <Pizza className="w-6 h-6" />,
  'lanchonetes': <Utensils className="w-6 h-6" />,
  'regionais': <Utensils className="w-6 h-6" />,
  'sobremesas': <Sparkles className="w-6 h-6" />,
  'restaurante': <Utensils className="w-6 h-6" />,
  'eventos': <Music className="w-6 h-6" />,
  'ponto turístico': <MapPin className="w-6 h-6" />,
  'produtos': <Package className="w-6 h-6" />,
};

const getCategoryIcon = (category: string, useAnimated: boolean = false) => {
  const lowerCategory = category.toLowerCase();
  
  if (useAnimated) {
    if (lowerCategory === 'tudo') {
      return <SearchHotelIcon key={`icon-${category}`} className="w-10 h-10" />;
    }
    return <RestaurantIcon key={`icon-${category}`} className="w-14 h-14" />;
  }
  
  return defaultCategoryIcons[lowerCategory] || <ShoppingBag className="w-6 h-6" />;
};

export function RecommendedFilters({
  filtrosRecomendados,
  filtroAtual,
  setFiltroAtual,
  buscandoPorCategoria = false,
  onViewMore,
  navigateOnSelect = false,
  center = false,
  showMoreOnMobile = false,
  useAnimatedIcons = false,
}: RecommendedFiltersProps) {
  const [showMoreModal, setShowMoreModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowMoreModal(true);
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setShowMoreModal(false);
    document.body.classList.remove('modal-open');
  };

  const handleSelectCategory = (categoria: string) => {
    if (!buscandoPorCategoria) {
      setFiltroAtual(categoria);
      if (navigateOnSelect && categoria !== 'Tudo') {
        navigate(`/comercios?categoria=${encodeURIComponent(categoria)}`);
      }
    }
  };

  const scrollFiltros = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    gsap.to(scrollRef.current, {
      scrollLeft: scrollRef.current.scrollLeft + scrollAmount,
      duration: 0.3,
      ease: 'sine.inOut',
    });
  };

  const allChips = ['Tudo', ...filtrosRecomendados];
  const mobileHasMore = showMoreOnMobile && allChips.length > 8;
  const displayChipsDesktop = allChips; // desktop shows all categories (no 'Ver mais')
  const displayChipsMobile = mobileHasMore ? allChips.slice(0, 7) : allChips;

  return (
    <div className="relative group w-full flex items-center">
      {/* Botão Scroll Esquerdo */}
      <button
        onClick={() => scrollFiltros('left')}
        className="absolute left-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-[var(--primary-pale)] border border-[var(--gray-border)] hidden md:block"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-[var(--gray-text)]" />
      </button>

      {/* Wrapper de Filtros */}
      <div
        ref={scrollRef}
        className={`recommended-filters-wrapper hidden md:flex overflow-x-auto scrollbar-hide gap-8 px-4 md:px-1 py-2 scroll-smooth ${center ? 'justify-center' : ''}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayChipsDesktop.map((chip) => {
          const isActive = filtroAtual.name === chip;
          const label = chip === 'Tudo' ? chip : formatarCategoria(chip);
          const icon = getCategoryIcon(chip, useAnimatedIcons);

          return (
            <button
              key={chip}
              onClick={() => handleSelectCategory(chip)}
              disabled={buscandoPorCategoria}
              className={cn(
                "flex flex-col items-center gap-2 shrink-0 transition-all duration-200 w-24",
                buscandoPorCategoria && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Ícone dentro do círculo */}
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 border-2",
                  isActive
                    ? "bg-[#2d255e] border-[#2d255e] text-white"
                    : "bg-[#2d255e] border-[#2d255e] text-white hover:bg-[#3d3570]"
                )}
              >
                {icon}
              </div>
              {/* Nome da categoria */}
              <span
                className={cn(
                  "text-xs font-bold text-center whitespace-normal line-clamp-3",
                  isActive ? "text-[var(--primary)]" : "text-[var(--black)]"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}

        {/* Desktop shows all categories, no Ver mais */}

      </div>

      {/* Grid para Mobile */}
      <div className="grid grid-cols-4 gap-4 md:hidden w-full">
        {displayChipsMobile.map((chip) => {
          const isActive = filtroAtual.name === chip;
          const label = chip === 'Tudo' ? chip : formatarCategoria(chip);
          const icon = getCategoryIcon(chip, useAnimatedIcons);

          return (
            <button
              key={chip}
              onClick={() => handleSelectCategory(chip)}
              disabled={buscandoPorCategoria}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-200",
                buscandoPorCategoria && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Ícone dentro do círculo */}
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2",
                  isActive
                    ? "bg-[#2d255e] border-[#2d255e] text-white"
                    : "bg-[#2d255e] border-[#2d255e] text-white active:bg-[#3d3570]"
                )}
              >
                {icon}
              </div>
              {/* Nome da categoria */}
              <span
                className={cn(
                  "text-[10px] font-bold text-center whitespace-normal line-clamp-2",
                  isActive ? "text-[var(--primary)]" : "text-[var(--black)]"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}

        {/* Botão Ver Mais Mobile */}
        {mobileHasMore && (
          <button
            onClick={handleOpenModal}
            className="flex flex-col items-center gap-2 transition-all duration-200"
          >
            {/* Ícone dentro do círculo */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2 bg-[#2d255e] border-[#2d255e] text-white active:bg-[#3d3570]">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            {/* Nome */}
            <span className="text-[10px] font-bold text-center whitespace-normal line-clamp-2 text-[var(--black)]">
              Ver mais
            </span>
          </button>
        )}
      </div>

      {/* Modal "Ver Mais" */}
      {showMoreModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-[var(--cream)] rounded-t-3xl md:rounded-2xl w-full md:w-full md:max-w-2xl max-h-[80vh] md:max-h-[70vh] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between  p-4 md:p-6 sticky top-0 bg-[var(--cream)] rounded-t-3xl md:rounded-t-2xl">
              <h3 className="text-lg md:text-xl font-extrabold text-[var(--black)]">Todas as categorias</h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-[var(--primary-pale)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--gray-text)] cursor-pointer" />
              </button>
            </div>

            {/* Grid de filtros com scroll */}
            <div className="p-4 md:p-6 grid grid-cols-4 md:grid-cols-5 gap-4 overflow-y-auto flex-1">
              {allChips.map((chip) => {
                const isActive = filtroAtual.name === chip;
                const label = chip === 'Tudo' ? chip : formatarCategoria(chip);
                const icon = getCategoryIcon(chip, useAnimatedIcons);

                return (
                  <button
                    key={chip}
                    onClick={() => {
                      handleSelectCategory(chip);
                      handleCloseModal();
                    }}
                    disabled={buscandoPorCategoria}
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-200",
                      buscandoPorCategoria && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Ícone dentro do círculo */}
                    <div
                      className={cn(
                        "w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-200 border-2 cursor-pointer",
                        isActive
                          ? "bg-[#2d255e] border-[#2d255e] text-white"
                          : "bg-[#2d255e] border-[#2d255e] text-white active:bg-[#3d3570]"
                      )}
                    >
                      {icon}
                    </div>
                    {/* Nome da categoria */}
                    <span
                      className={cn(
                        "text-[10px] md:text-xs font-bold text-center whitespace-normal line-clamp-2",
                        isActive ? "text-[var(--primary)]" : "text-[var(--black)]"
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Botão Scroll Direito */}
      <button
        onClick={() => scrollFiltros('right')}
        className="absolute right-2 z-10 p-2 bg-white rounded-full shadow-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-[var(--primary-pale)] border border-[var(--gray-border)] hidden md:block"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-[var(--gray-text)]" />
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        header,
        nav {
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        }

        body.modal-open header,
        body.modal-open nav {
          transform: translateY(100%);
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
