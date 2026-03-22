import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import type { Comercio } from '@/types';

interface StoreSliderProps {
  stores: Comercio[];
}

export function StoreSlider({ stores }: StoreSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === stores.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 400);
  }, [stores.length]);

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? stores.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, nextSlide]);

  if (!stores.length) return null;

  const currentStore = stores[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] md:rounded-[32px] bg-[#f8f9fa] border border-[#dadce0] mx-auto max-w-7xl h-[400px] md:h-[450px] shadow-sm hover:shadow-md transition-shadow">
      {/* Content Wrapper */}
      <div className="flex h-full flex-col md:flex-row items-stretch">
        {/* Info Section */}
        <div className={`flex-1 flex flex-col justify-center p-8 md:p-16 text-[#202124] transition-all duration-500 z-10 ${isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 bg-[#e8f0fe] text-[#1a73e8] text-xs font-medium px-4 py-1.5 rounded-full border border-[#d2e3fc]">
              Destaque local
            </div>

            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-[#202124]">
              {currentStore.nome}
            </h2>
            
            <div className="flex flex-col gap-3 text-[#5f6368] font-normal">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#1a73e8]" />
                <span className="text-lg">{currentStore.categoria}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#5f6368]" />
                <span>Aberto: {currentStore.horarioFuncionamento}</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to={`/comercios/${currentStore.id}`}>
                <Button size="lg" className="rounded-full px-10 shadow-sm">
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className={`hidden md:flex relative flex-1 md:w-1/2 overflow-hidden bg-[#f1f3f4] transition-all duration-700 ${isTransitioning ? 'opacity-50 scale-105' : 'opacity-100 scale-100'}`}>
          <img 
            src={currentStore.imagem} 
            alt={currentStore.nome} 
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend with info section on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent md:bg-gradient-to-r md:from-[#f8f9fa] md:to-transparent" />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button 
          onClick={prevSlide}
          disabled={isTransitioning}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#5f6368] shadow-sm border border-[#dadce0] flex items-center justify-center transition-all hover:shadow-md disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={isTransitioning}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#5f6368] shadow-sm border border-[#dadce0] flex items-center justify-center transition-all hover:shadow-md disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-8 md:left-16 flex gap-2 z-20">
        {stores.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx === currentIndex) return;
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsTransitioning(false);
              }, 400);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-[#1a73e8] w-8' : 'bg-[#dadce0] w-1.5 hover:bg-[#bdc1c6]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
