import { EventoCard } from '@/components/cards/EventoCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/services/api';
import type { Evento } from '@/types';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export function Eventos() {
  const [listaEventos, setListaEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filtros
  const [nome, setNome] = useState('');
  const [situacao, setSituacao] = useState<'disponivel' | 'encerrado' | 'acontecendo' | 'todos'>('disponivel');
  const [categoria, setCategoria] = useState('');

  const fetchEventos = useCallback(async (page: number) => {
    setLoading(true);
    try {
      // Constrói a query string baseada nos filtros
      const params = new URLSearchParams({
        pagina: page.toString(),
        situacao: situacao,
        ...(nome && { nome }),
        ...(categoria && { categoria })
      });

      const response = await apiRequest(`/evento?${params.toString()}`);
      const data = response.data || [];
      
      setListaEventos(data);
      // Se retornou 10 itens (o limite do backend), assumimos que pode haver mais
      setHasMore(data.length === 10);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  }, [nome, situacao, categoria]);

  useEffect(() => {
    // Quando qualquer filtro muda, voltamos para a página 1
    setPagina(1);
    fetchEventos(1);
  }, [nome, situacao, categoria, fetchEventos]);

  // Função para mudar de página sem resetar filtros
  const handlePageChange = (novaPagina: number) => {
    setPagina(novaPagina);
    fetchEventos(novaPagina);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:pb-0 pb-24 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Eventos Culturais</h1>
        
        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Buscar evento..." 
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={situacao} onChange={(e: any) => setSituacao(e.target.value)}>
            <option value="todos">Todas situações</option>
            <option value="disponivel">Disponíveis</option>
            <option value="acontecendo">Acontecendo Agora</option>
            <option value="encerrado">Encerrados</option>
          </Select>

          <Input 
            placeholder="Categoria..." 
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-80 rounded-2xl" />
          ))}
        </div>
      ) : listaEventos.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
          <p className="text-gray-500 text-lg">Nenhum evento encontrado com esses filtros.</p>
          <Button 
            variant="ghost" 
            className="mt-4 text-blue-600"
            onClick={() => { setNome(''); setSituacao('disponivel'); setCategoria(''); }}
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listaEventos.map(e => (
              <EventoCard key={e.id} evento={e} />
            ))}
          </div>
          
          {/* Paginação */}
          <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <Button
              onClick={() => handlePageChange(pagina - 1)}
              disabled={pagina === 1 || loading}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <span className="text-sm font-medium bg-gray-100 px-4 py-2 rounded-full">
              Página {pagina}
            </span>

            <Button
              onClick={() => handlePageChange(pagina + 1)}
              disabled={!hasMore || loading}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}