import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/Global/Button';
import { Link } from 'react-router-dom';
import type { HybridSliderItem } from '@/services/mockData';

interface UnifiedStoreSliderProps {
  stores: readonly HybridSliderItem[];
}

export function UnifiedStoreSlider({ stores }: UnifiedStoreSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const duration = 40000; // 40 segundos

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === stores.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 500);
  }, [stores.length, isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? stores.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 500);
  };

  // Timer principal de 40 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, duration);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Gerenciamento de vídeo (autoplay quando o slide entra)
  useEffect(() => {
    if (stores[currentIndex].tipo === 'video') {
      const currentVideo = videoRefs.current[currentIndex];
      if (currentVideo) {
        currentVideo.currentTime = 0;
        currentVideo.play().catch(e => console.log('Autoplay blocked', e));
      }
    }
  }, [currentIndex, stores]);

  if (!stores.length) return null;

  return (
    <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-gray-900">
      {stores.map((store, idx) => (
        <div
          key={store.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {store.tipo === 'video' ? (
            <video
              ref={(el) => {
                if (el) videoRefs.current[idx] = el;
              }}
              src={store.videoUrl}
              className="w-full h-full object-cover"
              muted
              playsInline
              loop
            />
          ) : (
            <img
              src={store.imagem}
              alt={store.nome}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      <div className="absolute inset-0 bg-black/30 z-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent z-20" />

      <div className="relative z-30 flex h-full flex-col justify-center p-2 md:p-16">
        <div
          className={`space-y-6 max-w-lg transition-all duration-500 ${
            isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-white">
            {stores[currentIndex].nome}
          </h2>

          <div className="flex flex-col gap-3 text-white/90 font-normal">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-yellow-300" />
              <span className="text-lg">{stores[currentIndex].categoria}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link to={`/comercios/${stores[currentIndex].id}`}>
              <Button className="rounded-full px-10 shadow-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
                Ver detalhes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de progresso visual (opcional, ajuda o usuário a ver o tempo de 40s) */}
      <div className="absolute bottom-0 left-0 h-1 bg-yellow-400 z-50 transition-all duration-[40000ms] ease-linear"
           key={currentIndex}
           style={{ width: isTransitioning ? '0%' : '100%' }} />

      <div className="absolute bottom-8 right-8 flex gap-2 z-40">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm flex items-center justify-center transition-all focus:outline-none cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-sm flex items-center justify-center transition-all focus:outline-none cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-8 md:left-16 flex gap-2 z-40">
        {stores.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx === currentIndex) return;
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(idx);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === currentIndex ? 'bg-yellow-400 w-8' : 'bg-white/50 w-1.5 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
