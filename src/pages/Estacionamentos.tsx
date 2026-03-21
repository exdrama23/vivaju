import React from 'react';
import { useData } from '@/context/DataContext';
import { EstacionamentoCard } from '@/components/cards/EstacionamentoCard';

export function Estacionamentos() {
  const { estacionamentos } = useData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Estacionamentos Próximos</h1>
      
      {estacionamentos.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Nenhum estacionamento encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {estacionamentos.map(est => (
            <EstacionamentoCard key={est.id} estacionamento={est} />
          ))}
        </div>
      )}
    </div>
  );
}