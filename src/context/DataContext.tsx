import React, { createContext, useContext, useState, useEffect } from 'react';
import { Comercio, Evento, Estacionamento, Avaliacao } from '@/types';
import { mockComercios, mockEventos, mockEstacionamentos } from '@/services/mockData';

interface DataContextType {
  comercios: Comercio[];
  eventos: Evento[];
  estacionamentos: Estacionamento[];
  addComercio: (comercio: Comercio) => void;
  updateComercio: (comercio: Comercio) => void;
  addAvaliacao: (avaliacao: Avaliacao) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);

  useEffect(() => {
    // Load from local storage or use mock
    const storedComercios = localStorage.getItem('vivaju_comercios');
    if (storedComercios) {
      setComercios(JSON.parse(storedComercios));
    } else {
      setComercios(mockComercios);
      localStorage.setItem('vivaju_comercios', JSON.stringify(mockComercios));
    }

    const storedEventos = localStorage.getItem('vivaju_eventos');
    if (storedEventos) {
      setEventos(JSON.parse(storedEventos));
    } else {
      setEventos(mockEventos);
      localStorage.setItem('vivaju_eventos', JSON.stringify(mockEventos));
    }

    const storedEstacionamentos = localStorage.getItem('vivaju_estacionamentos');
    if (storedEstacionamentos) {
      setEstacionamentos(JSON.parse(storedEstacionamentos));
    } else {
      setEstacionamentos(mockEstacionamentos);
      localStorage.setItem('vivaju_estacionamentos', JSON.stringify(mockEstacionamentos));
    }
  }, []);

  const addComercio = (comercio: Comercio) => {
    const updated = [...comercios, comercio];
    setComercios(updated);
    localStorage.setItem('vivaju_comercios', JSON.stringify(updated));
  };

  const updateComercio = (updatedComercio: Comercio) => {
    const updated = comercios.map((c) => (c.id === updatedComercio.id ? updatedComercio : c));
    setComercios(updated);
    localStorage.setItem('vivaju_comercios', JSON.stringify(updated));
  };

  const addAvaliacao = (avaliacao: Avaliacao) => {
    const comercio = comercios.find(c => c.id === avaliacao.comercioId);
    if (comercio) {
      const updatedComercio = {
        ...comercio,
        avaliacoes: [...comercio.avaliacoes, avaliacao]
      };
      updateComercio(updatedComercio);
    }
  }

  return (
    <DataContext.Provider value={{ comercios, eventos, estacionamentos, addComercio, updateComercio, addAvaliacao }}>
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