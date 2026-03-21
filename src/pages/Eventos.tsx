import React from 'react';
import { useData } from '@/context/DataContext';
import { EventoCard } from '@/components/cards/EventoCard';

export function Eventos() {
  const { eventos } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Eventos Culturais</h1>
      
      {eventos.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eventos.map(e => (
            <EventoCard key={e.id} evento={e} />
          ))}
        </div>
      )}
    </div>
  );
}