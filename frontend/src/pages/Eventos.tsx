import { EventoCard } from '@/components/Global/EventoCard';
import { Button } from '@/components/Global/Button';
import { Input } from '@/components/Global/Input';
import { Select } from '@/components/Global/Select';
import { useState, useEffect, useCallback } from 'react';
import { apiRequest } from '@/services/api';
import type { Evento } from '@/types/global';
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
      const { mockEventos } = await import('@/services/mockData');
      
      // Busca no banco
      const params = new URLSearchParams({
        pagina: page.toString(),
        situacao: 'todos' // Buscamos todos para filtrar localmente com precisão
      });

      const response = await apiRequest(`/evento?${params.toString()}`);
      let apiData = response.data || [];
      
      // Mescla banco com mocks (evitando duplicatas pelo nome)
      let combinedData = apiData.map((ev: any) => {
        const mockMatch = mockEventos.find(m => m.nome.toLowerCase() === ev.nome.toLowerCase());
        return {
          ...ev,
          imagem: ev.imagem || mockMatch?.imagem || null,
          descricao: ev.descricao || mockMatch?.descricao || ev.descricao,
          categoria: ev.categoria || mockMatch?.categoria || 'Geral'
        };
      });

      // Se o banco estiver vazio e não houver busca ativa, usamos os mocks
      if (apiData.length === 0) {
        combinedData = mockEventos;
      } else {
        // Adiciona mocks que não estão no banco para ter uma lista completa
        const onlyInMock = mockEventos.filter(
          m => !apiData.some((a: any) => a.nome.toLowerCase() === m.nome.toLowerCase())
        );
        combinedData = [...combinedData, ...onlyInMock];
      }

      // FILTRAGEM LOCAL (Garante que os filtros funcionem 100% mesmo com dados parciais)
      const filtered = combinedData.filter(ev => {
        const matchesNome = !nome || ev.nome.toLowerCase().includes(nome.toLowerCase());
        const matchesCategoria = !categoria || ev.categoria.toLowerCase().includes(categoria.toLowerCase());
        
        // Lógica de Situação (MockData usa datas, Backend usa campo situacao)
        let matchesSituacao = true;
        const agora = new Date();
        const inicio = new Date(ev.inicio);
        const fim = new Date(ev.fim);

        if (situacao === 'disponivel') {
          matchesSituacao = inicio > agora;
        } else if (situacao === 'acontecendo') {
          matchesSituacao = agora >= inicio && agora <= fim;
        } else if (situacao === 'encerrado') {
          matchesSituacao = agora > fim;
        }

        return matchesNome && matchesCategoria && matchesSituacao;
      });

      setListaEventos(filtered);
      setHasMore(false); // Como estamos filtrando localmente o set completo, desativamos a paginação do banco
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      const { mockEventos } = await import('@/services/mockData');
      setListaEventos(mockEventos);
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
    <div className="container mx-auto px-4 sm:px-6 py-8 md:pb-0 pb-24 max-w-7xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Eventos Culturais</h1>
        
        {/* Barra de Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Buscar evento..." 
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
          
          <Select value={situacao} onChange={(e: any) => setSituacao(e.target.value)} className="h-11 cursor-pointer">
            <option value="todos">Todas situações</option>
            <option value="disponivel">Disponíveis</option>
            <option value="acontecendo">Acontecendo Agora</option>
            <option value="encerrado">Encerrados</option>
          </Select>

          <Input 
            placeholder="Categoria..." 
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            className="h-11"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-64 sm:h-80 rounded-2xl" />
          ))}
        </div>
      ) : listaEventos.length === 0 ? (
        <div className="text-center py-12 sm:py-20 bg-gray-50 rounded-3xl border-2 border-dashed px-4">
          <p className="text-gray-500 text-base sm:text-lg">Nenhum evento encontrado com esses filtros.</p>
          <Button 
            variant="ghost" 
            className="mt-4 text-blue-600 cursor-pointer"
            onClick={() => { setNome(''); setSituacao('disponivel'); setCategoria(''); }}
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {listaEventos.map(e => (
              <EventoCard key={e.id} evento={e} />
            ))}
          </div>
          
          {/* Paginação - Só aparece se houver mais de 10 eventos ou não estiver na primeira página */}
          {(listaEventos.length > 10 || pagina > 1) && (
            <div className="flex items-center justify-center gap-4 mt-12 mb-8">
              <Button
                onClick={() => handlePageChange(pagina - 1)}
                disabled={pagina === 1 || loading}
                variant="outline"
                size="icon"
                className="rounded-full cursor-pointer"
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
                className="rounded-full cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}