import { EstacionamentoCard } from '@/components/cards/EstacionamentoCard';
import { Button } from '@/components/ui/Button';
import { Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/services/api';
import type { Estacionamento } from '@/types';

export function Estacionamentos() {
  const [listaEstacionamentos, setListaEstacionamentos] = useState<Estacionamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEstacionamentos = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await apiRequest(`/loja/estacionamento?page=${page}`);
      const data = (response.data || []).map((item: Record<string, unknown> & { lojaEstacionamento?: Array<{ preco?: string; tempoPreco?: string }> }) => ({
        id: item.id,
        nome: item.nome,
        latitude: item.latitude || -10.91, 
        longitude: item.longitude || -37.05,
        numeroVagas: 20, 
        vagasOcupadas: Math.floor(Math.random() * 20),
        status: 'livre',
        precoHora: item.lojaEstacionamento?.[0]?.preco ? parseFloat(item.lojaEstacionamento[0].preco) : 5.00,
        tempoPreco: item.lojaEstacionamento?.[0]?.tempoPreco || 'por hora'
      } as Estacionamento));

      setListaEstacionamentos(data);
      setHasMore(data.length === 10);
    } catch (error) {
      console.error('Erro ao buscar estacionamentos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEstacionamentos(pagina);
  }, [pagina, fetchEstacionamentos]);

  const handlePageChange = (novaPagina: number) => {
    setPagina(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-2 mb-10">
        <h1 className="text-3xl font-medium text-[#202124] tracking-tight">Estacionamentos Próximos</h1>
        <p className="text-[#5f6368] text-lg font-normal">
          Encontre vagas disponíveis em tempo real no centro.
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-64 rounded-4xl border border-[#dadce0]" />
          ))}
        </div>
      ) : listaEstacionamentos.length === 0 ? (
        <div className="text-center py-20 bg-[#f8f9fa] rounded-4xl border border-[#dadce0] border-dashed">
          <Car className="w-12 h-12 text-[#bdc1c6] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[#202124]">Nenhum estacionamento encontrado</h3>
          <p className="text-[#5f6368] text-sm mt-1">Tente novamente mais tarde.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {listaEstacionamentos.map(est => (
              <EstacionamentoCard key={est.id} estacionamento={est} />
            ))}
          </div>

          {/* Paginação */}
          <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <Button
              onClick={() => handlePageChange(pagina - 1)}
              disabled={pagina === 1 || loading}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <span className="text-sm font-medium bg-[#f8f9fa] border border-[#dadce0] px-6 py-2.5 rounded-full text-[#202124]">
              Página {pagina}
            </span>

            <Button
              onClick={() => handlePageChange(pagina + 1)}
              disabled={!hasMore || loading}
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}