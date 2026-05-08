import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/Global/Button';
import { Link } from 'react-router-dom';
import type { Comercio } from '@/types/global';

interface StoreSliderProps {
  stores: any[];
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
    <div className="relative w-full h-[50rem] overflow-hidden bg-gray-900">
      <img
        src={currentStore.imagem}
        alt={currentStore.nome}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          isTransitioning ? 'opacity-50 scale-105' : 'opacity-100 scale-100'
        }`}
      />
      {/* <div className="absolute inset-0 bg-yellow-400/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 backdrop-blur-[2px] left-0 w-1/2 md:w-2/5 pointer-events-none" /> */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-center p-2 md:p-16">
        <div
          className={`space-y-6 max-w-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-white">
            {currentStore.nome}
          </h2>

          <div className="flex flex-col gap-3 text-white/90 font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-300" />
              <span className="text-lg">{currentStore.categoria}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white/70" />
              <span>Aberto: {currentStore.horarioFuncionamento}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link to={`/comercios/${currentStore.id}`}>
              <Button className="rounded-full px-10 shadow-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
                Ver detalhes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm border border-white/20 flex items-center justify-center transition-all hover:shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm border border-white/20 flex items-center justify-center transition-all hover:shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

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
              idx === currentIndex ? 'bg-yellow-400 w-8' : 'bg-white/50 w-1.5 hover:bg-white/80'
            }`}
            aria-label={`Ir para slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}