import { EstacionamentoCard } from './EstacionamentoCard';
import { Button } from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Estacionamento } from '@/types/global';

interface EstacionamentoCarrosselProps {
  estacionamentos: Estacionamento[];
}

export function EstacionamentoCarrossel({ estacionamentos }: EstacionamentoCarrosselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">     
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Estacionamentos</h2>
            <p className="text-sm text-gray-500">Vagas disponíveis próximas a você</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-2 mr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full w-10 h-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full w-10 h-10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          <Link to="/estacionamentos" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
            Ver todos
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar snap-x snap-mandatory"
      >
        {estacionamentos.map((est) => (
          <div key={est.id} className="min-w-70 snap-start sm:min-w-[320px]">
            <EstacionamentoCard estacionamento={est} />
          </div>
        ))}
      </div>
    </div>
  );
}
