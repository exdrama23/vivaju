/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type FC, type ReactNode } from 'react';
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
  isLoadingEventos: boolean;
  isLoadingEstacionamentos: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [comercios, setComercios] = useState<ComercioExtendido[]>(() => {
    // Incrementado para v5 para forçar recarregamento dos dados locais exatos
    const stored = localStorage.getItem('vivaju_comercios_v5');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('vivaju_comercios_v5', JSON.stringify(mockComercios));
    return mockComercios;
  });

  const randomCategories = Array.from(new Set(comercios.map(c => c.categoria))).sort(() => Math.random() - 0.5).slice(0, 8);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoadingEventos, setIsLoadingEventos] = useState(true);

  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [isLoadingEstacionamentos, setIsLoadingEstacionamentos] = useState(true);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await apiRequest('/evento');
        let data = response.data || [];
        if (data.length === 0) data = mockEventos;
        setEventos(data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        setEventos(mockEventos as any);
      } finally {
        setIsLoadingEventos(false);
      }
    };

    const fetchEstacionamentos = async () => {
      try {
        const response = await apiRequest('/loja/estacionamento');
        let data = (response.data || []).map((item: any) => ({
          id: item.id,
          nome: item.nome,
          latitude: item.latitude || -10.91, 
          longitude: item.longitude || -37.05,
          numeroVagas: 20, 
          vagasOcupadas: Math.floor(Math.random() * 20),
          status: 'livre',
          precoHora: item.lojaEstacionamento?.[0]?.preco ? parseFloat(item.lojaEstacionamento[0].preco) : 5.00,
          tempoPreco: 'hora'
        } as Estacionamento));
        
        if (data.length === 0) data = mockEstacionamentos;
        setEstacionamentos(data);
      } catch (error) {
        console.error('Erro ao buscar estacionamentos:', error);
        setEstacionamentos(mockEstacionamentos);
      } finally {
        setIsLoadingEstacionamentos(false);
      }
    };

    fetchEventos();
    fetchEstacionamentos();
  }, []);

  const addComercio = (comercio: Comercio) => {
    setComercios(prev => {
      const updated = [...prev, comercio];
      localStorage.setItem('vivaju_comercios_v5', JSON.stringify(updated));
      return updated;
    });
  };

  const updateComercio = (updatedComercio: Comercio) => {
    setComercios(prev => {
      const updated = prev.map((c) => (c.id === updatedComercio.id ? updatedComercio : c));
      localStorage.setItem('vivaju_comercios_v5', JSON.stringify(updated));
      return updated;
    });
  };

  const addAvaliacao = (avaliacao: Avaliacao) => {
    setComercios(prev => {
      const updated = prev.map(c => 
        c.id === avaliacao.comercioId 
          ? { ...c, avaliacoes: [...c.avaliacoes, avaliacao] }
          : c
      );
      localStorage.setItem('vivaju_comercios_v5', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorito = (comercioId: string) => {
    setComercios(prev => {
      const updated = prev.map(c => c.id === comercioId ? { ...c, favoritada: !c.favoritada } : c);
      localStorage.setItem('vivaju_comercios_v5', JSON.stringify(updated));
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
      isLoadingEventos,
      isLoadingEstacionamentos
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