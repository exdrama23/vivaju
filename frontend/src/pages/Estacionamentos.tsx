import { useData } from '@/context/DataContext';
import { EstacionamentoCard } from '@/components/cards/EstacionamentoCard';
import { Car } from 'lucide-react';

export function Estacionamentos() {
  const { estacionamentos } = useData();

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl font-medium text-[#202124] tracking-tight">Estacionamentos Próximos</h1>
        <p className="text-[#5f6368] text-lg font-normal">
          Encontre vagas disponíveis em tempo real no centro.
        </p>
      </div>
      
      {estacionamentos.length === 0 ? (
        <div className="text-center py-20 bg-[#f8f9fa] rounded-[32px] border border-[#dadce0] border-dashed">
          <Car className="w-12 h-12 text-[#bdc1c6] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[#202124]">Nenhum estacionamento encontrado</h3>
          <p className="text-[#5f6368] text-sm mt-1">Tente novamente mais tarde.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {estacionamentos.map(est => (
            <EstacionamentoCard key={est.id} estacionamento={est} />
          ))}
        </div>
      )}
    </div>
  );
}