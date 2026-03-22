import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { cn, formatarCategoria } from '@/utils/utils';

interface RecommendedFiltersProps {
  filtrosRecomendados: string[];
  filtroAtual: { name: string; [key: string]: any };
  setFiltroAtual: (categoria: string) => void;
  buscandoPorCategoria?: boolean;
}

export function RecommendedFilters({
  filtrosRecomendados,
  filtroAtual,
  setFiltroAtual,
  buscandoPorCategoria = false,
}: RecommendedFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollFiltros = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    gsap.to(scrollRef.current, {
      scrollLeft: scrollRef.current.scrollLeft + scrollAmount,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const chips = ['Tudo', ...filtrosRecomendados];

  return (
    <div className="relative group w-full flex items-center">
      {/* Botão Scroll Esquerdo */}
      <button
        onClick={() => scrollFiltros('left')}
        className="absolute left-[-12px] z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f8f9fa] border border-[#dadce0]"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5 text-[#5f6368]" />
      </button>

      {/* Wrapper de Filtros */}
      <div
        ref={scrollRef}
        className="recommended-filters-wrapper flex overflow-x-auto scrollbar-hide gap-2 px-1 py-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {chips.map((chip) => {
          const isActive = filtroAtual.name === chip;
          const label = chip === 'Tudo' ? chip : formatarCategoria(chip);

          return (
            <button
              key={chip}
              onClick={() => !buscandoPorCategoria && setFiltroAtual(chip)}
              disabled={buscandoPorCategoria}
              className={cn(
                "whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "bg-[#e8f0fe] border-transparent text-[#1a73e8]"
                  : "bg-white border-[#dadce0] text-[#3c4043] hover:bg-[#f8f9fa] hover:border-[#dadce0]",
                buscandoPorCategoria && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </button>
          );
        })}

      </div>

      {/* Botão Scroll Direito */}
      <button
        onClick={() => scrollFiltros('right')}
        className="absolute right-[-12px] z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f8f9fa] border border-[#dadce0]"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5 text-[#5f6368]" />
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
