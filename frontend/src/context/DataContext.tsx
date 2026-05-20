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
  isLoadingEventos: boolean;
  isLoadingEstacionamentos: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [comercios, setComercios] = useState<ComercioExtendido[]>([]);

  const randomCategories = useMemo(() => {
    const cats = Array.from(new Set(comercios.map(c => c.categoria))).filter(Boolean);
    return cats.sort(() => Math.random() - 0.5).slice(0, 8);
  }, [comercios]);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoadingEventos, setIsLoadingEventos] = useState(true);

  const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
  const [isLoadingEstacionamentos, setIsLoadingEstacionamentos] = useState(true);

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        console.log('Buscando comércios...');
        const response = await apiRequest(`/loja?t=${Date.now()}`);
        console.log('Resposta lojas:', response);
        const rawData = response.data || [];
        
        if (rawData.length === 0) {
          console.warn('Nenhuma loja retornada pelo backend, usando mock.');
          setComercios(mockComercios);
          return;
        }

        const mappedData = rawData.map((c: any) => ({
          ...c,
          categoria: c.categoriaLoja?.[0]?.categoria?.nome || 'Geral',
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

        console.log('Lojas mapeadas:', mappedData.length);
        setComercios(mappedData);
      } catch (error) {
        console.error('Erro ao buscar comércios:', error);
        setComercios(mockComercios);
      }
    };

    const fetchEventos = async () => {
      try {
        console.log('Buscando eventos...');
        const response = await apiRequest(`/evento?t=${Date.now()}`);
        console.log('Resposta eventos:', response);
        const data = response.data || [];
        
        if (data.length === 0) {
          setEventos(mockEventos);
        } else {
          setEventos(data.map((ev: any) => ({
            ...ev,
            inicio: ev.inicio,
            fim: ev.fim,
            local: ev.localizacao
          })));
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        setEventos(mockEventos as any);
      } finally {
        setIsLoadingEventos(false);
      }
    };

    const fetchEstacionamentos = async () => {
      try {
        const response = await apiRequest(`/loja/estacionamento?t=${Date.now()}`);
        const rawData = response.data || [];
        
        if (rawData.length === 0) {
          setEstacionamentos(mockEstacionamentos);
        } else {
          const mapped = rawData.map((item: any) => ({
            id: item.id,
            nome: item.nome,
            latitude: item.latitude,
            longitude: item.longitude,
            numeroVagas: 50,
            vagasOcupadas: Math.floor(Math.random() * 50),
            status: 'livre',
            precoHora: item.lojaEstacionamento?.[0]?.preco ? parseFloat(item.lojaEstacionamento[0].preco) : 5.00,
            tempoPreco: item.lojaEstacionamento?.[0]?.tempoPreco || 'hora'
          } as Estacionamento));
          setEstacionamentos(mapped);
        }
      } catch (error) {
        console.error('Erro ao buscar estacionamentos:', error);
        setEstacionamentos(mockEstacionamentos);
      } finally {
        setIsLoadingEstacionamentos(false);
      }
    };

    fetchComercios();
    fetchEventos();
    fetchEstacionamentos();

    const interval = setInterval(() => {
      fetchComercios();
      fetchEventos();
      fetchEstacionamentos();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addComercio = (comercio: Comercio) => {
    setComercios(prev => [...prev, comercio as ComercioExtendido]);
  };

  const updateComercio = (updatedComercio: Comercio) => {
    setComercios(prev => prev.map((c) => (c.id === updatedComercio.id ? { ...c, ...updatedComercio } : c)));
  };

  const addAvaliacao = (avaliacao: Avaliacao) => {
    setComercios(prev => prev.map(c => 
      c.id === avaliacao.comercioId 
        ? { ...c, avaliacoes: [...(c.avaliacoes || []), avaliacao] }
        : c
    ));
  };

  const toggleFavorito = (comercioId: string) => {
    setComercios(prev => prev.map(c => c.id === comercioId ? { ...c, favoritada: !c.favoritada } : c));
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
