/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import type { Comercio, Evento, Estacionamento, Avaliacao } from '@/types';
import { mockComercios, mockEventos, mockEstacionamentos } from '@/services/mockData';

interface DataContextType {
  comercios: Comercio[];
  eventos: Evento[];
  estacionamentos: Estacionamento[];
  randomCategories: string[];
  addComercio: (comercio: Comercio) => void;
  updateComercio: (comercio: Comercio) => void;
  addAvaliacao: (avaliacao: Avaliacao) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [comercios, setComercios] = useState<Comercio[]>(() => {
    // Incrementado para v4 para forçar recarregamento dos dados locais exatos
    const stored = localStorage.getItem('vivaju_comercios_v4');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('vivaju_comercios_v4', JSON.stringify(mockComercios));
    return mockComercios;
  });

  const randomCategories = Array.from(new Set(comercios.map(c => c.categoria))).sort(() => Math.random() - 0.5).slice(0, 8);

  const [eventos] = useState<Evento[]>(() => {
    const stored = localStorage.getItem('vivaju_eventos_v4');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('vivaju_eventos_v4', JSON.stringify(mockEventos));
    return mockEventos;
  });

  const [estacionamentos] = useState<Estacionamento[]>(() => {
    const stored = localStorage.getItem('vivaju_estacionamentos_v4');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('vivaju_estacionamentos_v4', JSON.stringify(mockEstacionamentos));
    return mockEstacionamentos;
  });

  const addComercio = (comercio: Comercio) => {
    setComercios(prev => {
      const updated = [...prev, comercio];
      localStorage.setItem('vivaju_comercios_v4', JSON.stringify(updated));
      return updated;
    });
  };

  const updateComercio = (updatedComercio: Comercio) => {
    setComercios(prev => {
      const updated = prev.map((c) => (c.id === updatedComercio.id ? updatedComercio : c));
      localStorage.setItem('vivaju_comercios_v4', JSON.stringify(updated));
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
      localStorage.setItem('vivaju_comercios_v4', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <DataContext.Provider value={{ comercios, eventos, estacionamentos, randomCategories, addComercio, updateComercio, addAvaliacao }}>
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