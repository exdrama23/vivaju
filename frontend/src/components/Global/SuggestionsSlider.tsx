import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import type { Comercio } from '@/types/global';

interface SuggestionsSliderProps {
  comercios: Comercio[];
}

export function SuggestionsSlider({ comercios }: SuggestionsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollFiltros = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    gsap.to(scrollRef.current, {
      scrollLeft: scrollRef.current.scrollLeft + scrollAmount,
      duration: 0.3,
      ease: 'sine.inOut',
    });
  };

  const handleNavigate = (comercioId: string) => {
    navigate(`/comercios/${comercioId}`);
  };

  if (!comercios || comercios.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Slider Horizontal - Desktop e Mobile */}
      <div className="relative group w-full">
        {/* Botão Scroll Esquerdo */}
        <button
          onClick={() => scrollFiltros('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--primary-pale)] border border-[var(--gray-border)] hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--gray-text)]" />
        </button>

        {/* Wrapper do Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-8 px-4 md:px-16 py-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {comercios.map((comercio) => (
            <button
              key={comercio.id}
              onClick={() => handleNavigate(comercio.id)}
              className="flex flex-col items-center gap-2 md:gap-3 flex-shrink-0 transition-all duration-200 group/item"
            >
              {/* Logo em círculo */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[var(--cream)] border-2 border-[var(--gray-border)] overflow-hidden flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover/item:border-[var(--primary)] group-hover/item:shadow-md active:border-[var(--primary)]">
                {comercio.imagem ? (
                  <img
                    src={comercio.imagem}
                    alt={comercio.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-bold text-sm md:text-xl">
                    {comercio.nome.charAt(0)}
                  </div>
                )}
              </div>
              {/* Nome da empresa */}
              <span className="text-[10px] md:text-xs font-bold text-center text-[var(--black)] line-clamp-2 w-14 md:w-24">
                {comercio.nome}
              </span>
            </button>
          ))}
        </div>

        {/* Botão Scroll Direito */}
        <button
          onClick={() => scrollFiltros('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--primary-pale)] border border-[var(--gray-border)] hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-[var(--gray-text)]" />
        </button>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
