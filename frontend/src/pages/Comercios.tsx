import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Global/Layout';
import { ComercioCard } from '@/components/Global/ComercioCard';
import { RecommendedFilters } from '@/components/Global/RecommendedFilters';
import { useData } from '@/context/DataContext';
import { useSearchParams } from 'react-router-dom';
import { StoreCardSkeleton, CategorySkeleton } from '@/components/Global/Skeleton';
import { Search } from 'lucide-react';

const normalizeText = (value: string) =>
  (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export function Comercios() {
  const { comercios, isLoadingComercios } = useData();
  const [searchParams] = useSearchParams();
  const categoriaDaUrl = searchParams.get('categoria');
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Comercios.tsx - comercios:', comercios);
  console.log('Comercios.tsx - isLoading:', isLoadingComercios);

  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ 
    name: categoriaDaUrl || 'Todos' 
  });

  // Categorias únicas baseadas nos comércios carregados (Mocks + Banco)
  const todasCategorias = useMemo(() => {
    const cats = Array.from(new Set(comercios.map(c => c.categoria))).filter(Boolean);
    return ['Todos', ...cats];
  }, [comercios]);

  // Atualiza filtro se a URL mudar
  useEffect(() => {
    if (categoriaDaUrl) {
      setFiltroAtual({ name: categoriaDaUrl });
    }
  }, [categoriaDaUrl]);

  const comerciosExibidos = useMemo(() => {
    const search = normalizeText(searchTerm);
    const filtered = comercios.filter(c => {
      const matchesFiltro =
        filtroAtual.name === 'Todos' ||
        filtroAtual.name === 'Tudo' ||
        normalizeText(c.categoria).includes(normalizeText(filtroAtual.name));
      const matchesBusca =
        normalizeText(c.nome).includes(search) ||
        normalizeText(c.categoria).includes(search) ||
        normalizeText(c.descricao || '').includes(search);
      return matchesFiltro && matchesBusca;
    });
    console.log('Comercios.tsx - filtered result:', filtered);
    return filtered;
  }, [comercios, filtroAtual, searchTerm]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:pb-0 pb-24 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col gap-1 mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Comércios Locais</h1>
          <p className="text-gray-500 text-sm sm:text-base">Explore as melhores lojas e serviços de Aracaju</p>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar comércios ou categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#E8611A] focus:border-transparent outline-none transition-all shadow-sm"
          />
        </div>

        {/* Filtros de Categoria */}
        <div className="bg-[var(--cream)] py-4 -mx-4 px-4">
          {(isLoadingComercios && comercios.length === 0) ? (
             <div className="flex justify-center gap-6 overflow-x-hidden">
                {[...Array(6)].map((_, i) => <CategorySkeleton key={i} />)}
             </div>
          ) : (
            <RecommendedFilters 
              filtrosRecomendados={todasCategorias}
              filtroAtual={filtroAtual}
              setFiltroAtual={(name) => setFiltroAtual({ name: name === 'Tudo' ? 'Todos' : name })}
              buscandoPorCategoria={false}
              showMoreOnMobile={true}
              useAnimatedIcons={true}
            />
          )}
        </div>

        {/* Listagem de Comércios */}
        <div className="flex flex-col gap-4 min-h-[400px]">
          {(isLoadingComercios && comercios.length === 0) ? (
            [...Array(6)].map((_, i) => <StoreCardSkeleton key={i} />)
          ) : (
            <>
              {comerciosExibidos.length > 0 ? (
                comerciosExibidos.map((comercio) => (
                  <ComercioCard key={comercio.id} comercio={comercio} />
                ))
              ) : (
                <div className="py-20 text-center text-gray-500 italic">
                  {searchTerm ? `Nenhum resultado para "${searchTerm}"` : "Nenhum comércio encontrado nesta categoria."}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

