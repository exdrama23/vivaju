import React from 'react';
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
    <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 bg-white/90 p-2 rounded-lg shadow-md backdrop-blur-sm">
      <button
        onClick={() => onFilterChange('comercios')}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilters.comercios ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-600"
        )}
      >
        <Store className="w-4 h-4" /> Comércios
      </button>
      <button
        onClick={() => onFilterChange('eventos')}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilters.eventos ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100 text-gray-600"
        )}
      >
        <Calendar className="w-4 h-4" /> Eventos
      </button>
      <button
        onClick={() => onFilterChange('estacionamentos')}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          activeFilters.estacionamentos ? "bg-green-100 text-green-700" : "hover:bg-gray-100 text-gray-600"
        )}
      >
        <Car className="w-4 h-4" /> Estacionamentos
      </button>
    </div>
  );
}