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
        const mappedData = rawData.map((c: any) => {
          // Busca um comércio correspondente no mockData pelo nome
          const mockMatch = mockComercios.find(m => m.nome.toLowerCase() === c.nome.toLowerCase());
          
          const rawBackendProducts = (c.produtoLoja || []).map((pl: any) => ({
            id: pl.produto?.id,
            comercioId: c.id,
            nome: pl.produto?.nome,
            descricao: pl.produto?.descricao || '',
            preco: parseFloat(pl.preco),
            imagem: pl.produto?.imagem || null
          }));

          // Remove duplicatas que venham do próprio banco de dados (pelo nome)
          const backendProducts = rawBackendProducts.filter((item, index, self) =>
            index === self.findIndex((t) => t.nome.toLowerCase() === item.nome.toLowerCase())
          );

          // Lógica de Mesclagem:
          // Removemos duplicatas pelo nome entre banco e mock, priorizando o banco.
          // Não limitamos mais a 10 produtos para permitir paginação.
          let finalProducts = [...backendProducts];
          
          if (mockMatch?.produtos) {
            const mockProductsToAdd = mockMatch.produtos.filter(
              mp => !finalProducts.some(bp => bp.nome.toLowerCase() === mp.nome.toLowerCase())
            );
            finalProducts = [...finalProducts, ...mockProductsToAdd];
          }

          return {
            ...c,
            // Mantém o ID do backend para operações reais, mas preenche o que falta com mocks
            categoria: c.categoriaLoja?.[0]?.categoria?.nome || mockMatch?.categoria || 'Geral',
            latitude: typeof c.latitude === 'number' ? c.latitude : (mockMatch?.latitude || -10.910501),
            longitude: typeof c.longitude === 'number' ? c.longitude : (mockMatch?.longitude || -37.050332),
            produtos: finalProducts,
            avaliacoes: [],
            tags: c.categoriaLoja?.map((cl: any) => cl.categoria?.nome).filter(Boolean) || mockMatch?.tags || [],
            statusAberto: true,
            favoritada: false,
            localizacao: c.logradouro || mockMatch?.localizacao || 'Aracaju, SE',
            resumo_avaliacoes: mockMatch?.resumo_avaliacoes || 'Sem avaliações',
            redes_sociais: mockMatch?.redes_sociais || '',
            rating: mockMatch?.rating || 0,
            horarioFuncionamento: mockMatch?.horarioFuncionamento || '08:00 - 18:00',
          } as ComercioExtendido;
        });

        setComercios(mappedData);
        localStorage.setItem(CACHE_KEYS.COMERCIOS, JSON.stringify(mappedData));
      }
    } catch (error) {
      console.error('Erro ao buscar comércios:', error);
    } finally {
      setIsLoadingComercios(false);
    }
  };

  const fetchEventos = async () => {
    try {
      const response = await apiRequest(`/evento?t=${Date.now()}`);
      const data = response.data || [];
      
      if (data.length > 0) {
        const mapped = data.map((ev: any) => {
          // Busca correspondência no mock pelo nome para preencher imagem e descrição se faltar no banco
          const mockMatch = mockEventos.find(m => m.nome.toLowerCase() === ev.nome.toLowerCase());

          return {
            ...ev,
            inicio: ev.inicio,
            fim: ev.fim,
            local: ev.localizacao,
            imagem: ev.imagem || mockMatch?.imagem || null,
            descricao: ev.descricao || mockMatch?.descricao || ''
          };
        });
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
        const mappedFromApi = rawData.map((item: any) => {
          const mockMatch = mockEstacionamentos.find(
            (mock) => mock.nome.toLowerCase() === String(item.nome || '').toLowerCase()
          );

          return {
            id: item.id,
            nome: item.nome,
            latitude: typeof item.latitude === 'number' ? item.latitude : (mockMatch?.latitude ?? -10.910501),
            longitude: typeof item.longitude === 'number' ? item.longitude : (mockMatch?.longitude ?? -37.050332),
            numeroVagas: mockMatch?.numeroVagas ?? 50,
            vagasOcupadas: mockMatch?.vagasOcupadas ?? Math.floor(Math.random() * 50),
            status: mockMatch?.status ?? 'livre',
            precoHora: item.lojaEstacionamento?.[0]?.preco ? parseFloat(item.lojaEstacionamento[0].preco) : (mockMatch?.precoHora ?? 5.0),
            tempoPreco: item.lojaEstacionamento?.[0]?.tempoPreco || mockMatch?.tempoPreco || 'hora',
            horarioFuncionamento: mockMatch?.horarioFuncionamento
          } as Estacionamento;
        });

        const apiNames = new Set(mappedFromApi.map((item: Estacionamento) => item.nome.toLowerCase()));
        const missingMockParking = mockEstacionamentos.filter(
          (mock) => !apiNames.has(mock.nome.toLowerCase())
        );

        const mapped = [...mappedFromApi, ...missingMockParking];
        setEstacionamentos(mapped);
        localStorage.setItem(CACHE_KEYS.ESTACIONAMENTOS, JSON.stringify(mapped));
      } else {
        setEstacionamentos(mockEstacionamentos);
        localStorage.setItem(CACHE_KEYS.ESTACIONAMENTOS, JSON.stringify(mockEstacionamentos));
      }
    } catch (error) {
      console.error('Erro ao buscar estacionamentos:', error);
      setEstacionamentos(mockEstacionamentos);
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
