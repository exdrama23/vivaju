import { Store, Calendar, Car } from 'lucide-react';
import { cn } from '@/utils/utils';

interface MapFiltersProps {
  activeFilters: {
    comercios: boolean;
    eventos: boolean;
    estacionamentos: boolean;
  };
  onFilterChange: (key: keyof MapFiltersProps['activeFilters']) => void;
}

export function MapFilters({ activeFilters, onFilterChange }: MapFiltersProps) {
  return (
    <div className="absolute md:top-4 md:left-4 bottom-4 left-4 right-4 md:bottom-auto z-40 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide md:max-w-[calc(100%-2rem)]">
      <button
        onClick={() => onFilterChange('comercios')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border whitespace-nowrap",
          activeFilters.comercios 
            ? "bg-[#e8f0fe] border-transparent text-[#1a73e8]" 
            : "bg-white border-[#dadce0] text-[#3c4043] hover:bg-[#f8f9fa]"
        )}
      >
        <Store className="w-4 h-4" /> Comércios
      </button>
      <button
        onClick={() => onFilterChange('eventos')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border whitespace-nowrap",
          activeFilters.eventos 
            ? "bg-[#f3e5f5] border-transparent text-[#9c27b0]" 
            : "bg-white border-[#dadce0] text-[#3c4043] hover:bg-[#f8f9fa]"
        )}
      >
        <Calendar className="w-4 h-4" /> Eventos
      </button>
      <button
        onClick={() => onFilterChange('estacionamentos')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm border whitespace-nowrap",
          activeFilters.estacionamentos 
            ? "bg-[#e6f4ea] border-transparent text-[#1e8e3e]" 
            : "bg-white border-[#dadce0] text-[#3c4043] hover:bg-[#f8f9fa]"
        )}
      >
        <Car className="w-4 h-4" /> Estacionamentos
      </button>
    </div>
  );
}