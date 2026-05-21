/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, type FC, type ReactNode } from 'react';
import type { Comercio, Evento, Estacionamento, Avaliacao } from '@/types/global';
import type { ComercioExtendido } from '@/services/mockData';
import { mockComercios, mockEventos, mockEstacionamentos } from '@/services/mockData';
import { apiRequest } from '@/services/api';

interface DataContextType {
  comercios: ComercioExtendido[];
  eventos: Evento[];
  estacionamentos: Estacionamento[];
  randomCategories: string[];
  addComercio: (comercio: Comercio) => void;
  updateComercio: (comercio: Comercio) => void;
  addAvaliacao: (avaliacao: Avaliacao) => void;
  toggleFavorito: (comercioId: string) => void;
  isLoadingComercios: boolean;
  isLoadingEventos: boolean;
  isLoadingEstacionamentos: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const CACHE_KEYS = {
  COMERCIOS: 'vivaju_cache_comercios_v6',
  EVENTOS: 'vivaju_cache_eventos_v6',
  ESTACIONAMENTOS: 'vivaju_cache_estacionamentos_v6',
};

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Always initialize with Mocks to ensure data is present before backend response
  const [comercios, setComercios] = useState<ComercioExtendido[]>(mockComercios);
  const [eventos, setEventos] = useState<Evento[]>(mockEventos);
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>(mockEstacionamentos);

  // We keep the loading state as true initially to allow skeletons if desired,
  // but the data above is already available for immediate rendering.
  const [isLoadingComercios, setIsLoadingComercios] = useState(true);
  const [isLoadingEventos, setIsLoadingEventos] = useState(true);
  const [isLoadingEstacionamentos, setIsLoadingEstacionamentos] = useState(true);

  const randomCategories = useMemo(() => {
    const cats = Array.from(new Set(comercios.map(c => c.categoria))).filter(Boolean);
    return cats.sort(() => Math.random() - 0.5).slice(0, 8);
  }, [comercios]);

  const fetchComercios = async () => {
    try {
      const response = await apiRequest(`/loja?t=${Date.now()}`);
      const rawData = response.data || [];
      
      if (rawData.length > 0) {
        const mappedData = rawData.map((c: any) => ({
          ...c,
          categoria: c.categoriaLoja?.[0]?.categoria?.nome || 'Geral',
          latitude: typeof c.latitude === 'number' ? c.latitude : -10.910501,
          longitude: typeof c.longitude === 'number' ? c.longitude : -37.050332,
          produtos: (c.produtoLoja || []).map((pl: any) => ({
            id: pl.produto?.id,
            comercioId: c.id,
            nome: pl.produto?.nome,
            descricao: pl.produto?.descricao || '',
            preco: parseFloat(pl.preco),
            imagem: pl.produto?.imagem || null
          })),
          avaliacoes: [],
          tags: c.categoriaLoja?.map((cl: any) => cl.categoria?.nome).filter(Boolean) || [],
          statusAberto: true,
          favoritada: false,
          localizacao: c.logradouro || 'Aracaju, SE',
          resumo_avaliacoes: 'Sem avaliações',
          redes_sociais: '',
          rating: 0,
          horarioFuncionamento: '08:00 - 18:00',
        } as ComercioExtendido));

        setComercios(mappedData);
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(mappedData));
      }
    } catch (error) {
      console.error('Erro ao buscar comércios:', error);
      // Fallback to mocks is implicit as they are already in state
    } finally {
      setIsLoadingComercios(false);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await apiRequest(`/evento?t=${Date.now()}`);
      const data = response.data || [];
      
      if (data.length > 0) {
        const mapped = data.map((ev: any) => ({
          ...ev,
          inicio: ev.inicio,
          fim: ev.fim,
          local: ev.localizacao
        }));
        setEventos(mapped);
        localStorage.setItem(CACHE_KEYS.EVENTOS, JSON.stringify(mapped));
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setIsLoadingEventos(false);
    }
  };

  const fetchEstacionamentos = async () => {
    try {
      const response = await apiRequest(`/loja/estacionamento?t=${Date.now()}`);
      const rawData = response.data || [];
      
      if (rawData.length > 0) {
        const mapped = rawData.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          latitude: typeof item.latitude === 'number' ? item.latitude : -10.910501,
          longitude: typeof item.longitude === 'number' ? item.longitude : -37.050332,
          numeroVagas: 50,
          vagasOcupadas: Math.floor(Math.random() * 50),
          status: 'livre',
          precoHora: item.lojaEstacionamento?.[0]?.preco ? parseFloat(item.lojaEstacionamento[0].preco) : 5.00,
          tempoPreco: item.lojaEstacionamento?.[0]?.tempoPreco || 'hora'
        } as Estacionamento));
        setEstacionamentos(mapped);
        localStorage.setItem(CACHE_KEYS.ESTACIONAMENTOS, JSON.stringify(mapped));
      }
    } catch (error) {
      console.error('Erro ao buscar estacionamentos:', error);
    } finally {
      setIsLoadingEstacionamentos(false);
    }
  };

  const refreshData = async () => {
    await Promise.all([fetchComercios(), fetchEventos(), fetchEstacionamentos()]);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000);
    return () => clearInterval(interval);
  }, []);

  const addComercio = (comercio: Comercio) => {
    setComercios(prev => {
        const updated = [...prev, comercio as ComercioExtendido];
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(updated));
        return updated;
    });
  };

  const updateComercio = (updatedComercio: Comercio) => {
    setComercios(prev => {
        const updated = prev.map((c) => (c.id === updatedComercio.id ? { ...c, ...updatedComercio } : c));
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(updated));
        return updated;
    });
  };

  const addAvaliacao = (avaliacao: Avaliacao) => {
    setComercios(prev => {
        const updated = prev.map(c => 
          c.id === avaliacao.comercioId 
            ? { ...c, avaliacoes: [...(c.avaliacoes || []), avaliacao] }
            : c
        );
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(updated));
        return updated;
    });
  };

  const toggleFavorito = (comercioId: string) => {
    setComercios(prev => {
        const updated = prev.map(c => c.id === comercioId ? { ...c, favoritada: !c.favoritada } : c);
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(updated));
        return updated;
    });
  };

  return (
    <DataContext.Provider value={{ 
      comercios, 
      eventos, 
      estacionamentos, 
      randomCategories, 
      addComercio, 
      updateComercio, 
      addAvaliacao,
      toggleFavorito,
      isLoadingComercios,
      isLoadingEventos,
      isLoadingEstacionamentos,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
