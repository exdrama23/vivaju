import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Global/Layout';
import { ComercioCard } from '@/components/Global/ComercioCard';
import { RecommendedFilters } from '@/components/Global/RecommendedFilters';
import { useData } from '@/context/DataContext';
import { useSearchParams } from 'react-router-dom';
import { StoreCardSkeleton, CategorySkeleton } from '@/components/Global/Skeleton';

export function Comercios() {
  const { comercios, randomCategories, isLoadingComercios } = useData();
  const [searchParams] = useSearchParams();
  const categoriaDaUrl = searchParams.get('categoria');

  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ 
    name: categoriaDaUrl || 'Todos' 
  });

  // Atualiza filtro se a URL mudar
  useEffect(() => {
    if (categoriaDaUrl) {
      setFiltroAtual({ name: categoriaDaUrl });
    }
  }, [categoriaDaUrl]);

  const comerciosExibidos = useMemo(() => {
    if (filtroAtual.name === 'Todos' || filtroAtual.name === 'Tudo') return comercios;
    return comercios.filter(c => c.categoria === filtroAtual.name);
  }, [comercios, filtroAtual]);

  const buscandoPorCategoria = false;

  return (
    <Layout title="Comércios" showBackButton>
      <div className="flex flex-col gap-6">
        <div className="bg-white py-4 -mx-4 px-4 sticky top-0 z-10 border-b border-gray-100">
          {isLoadingComercios ? (
             <div className="flex justify-center gap-6 overflow-x-hidden">
                {[...Array(6)].map((_, i) => <CategorySkeleton key={i} />)}
             </div>
          ) : (
            <RecommendedFilters 
              filtrosRecomendados={randomCategories}
              filtroAtual={filtroAtual}
              setFiltroAtual={(name) => setFiltroAtual({ name: name === 'Tudo' ? 'Todos' : name })}
              buscandoPorCategoria={buscandoPorCategoria}
              showMoreOnMobile={true}
              useAnimatedIcons={true}
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoadingComercios ? (
            [...Array(6)].map((_, i) => <StoreCardSkeleton key={i} />)
          ) : (
            <>
              {comerciosExibidos.length > 0 ? (
                comerciosExibidos.map((comercio) => (
                  <ComercioCard key={comercio.id} comercio={comercio} />
                ))
              ) : (
                <div className="py-20 text-center text-gray-500 italic">
                  Nenhum comércio encontrado nesta categoria.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
