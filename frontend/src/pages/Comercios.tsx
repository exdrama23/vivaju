import { useState, useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { ComercioCard } from '@/components/cards/ComercioCard';
import { Input } from '@/components/ui/Input';
import { RecommendedFilters } from '@/components/ui/RecommendedFilters';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/utils/utils';
import type { Comercio } from '@/types';

export function Comercios() {
  const { comercios, randomCategories } = useData();
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState({ active: false });
  const [filtroAtual, setFiltroAtual] = useState<{ name: string; empresas: Comercio[] }>({ 
    name: 'Tudo', 
    empresas: comercios 
  });
  const [buscandoPorCategoria, setBuscandoPorCategoria] = useState(false);

  const buscarEmpresasCategoria = async (categoria: string) => {
    setBuscandoPorCategoria(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const filtrados = categoria === 'Tudo' 
      ? comercios 
      : comercios.filter(c => c.categoria === categoria);
    
    setFiltroAtual({ name: categoria, empresas: filtrados });
    setBuscandoPorCategoria(false);
  };

  useEffect(() => {
    buscarEmpresasCategoria(filtroAtual.name);
  }, [filtroAtual.name]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSearchData({ active: value.length > 0 });
  };

  const filteredComercios = filtroAtual.empresas.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(search.toLowerCase()) || 
                          c.produtos.some(p => p.nome.toLowerCase().includes(search.toLowerCase())) ||
                          c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-medium text-[#202124] tracking-tight">Comércios Locais</h1>
          <p className="text-[#5f6368] text-lg max-w-2xl font-normal">
            Explore as melhores lojas e serviços do centro de Aracaju.
          </p>
        </div>

        <div className="max-w-2xl relative group">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10",
            searchData.active ? "text-[#1a73e8]" : "text-[#5f6368] group-focus-within:text-[#1a73e8]"
          )} />
          <Input 
            placeholder="O que você está procurando?" 
            className="pl-12 h-14 text-base rounded-full border-[#dadce0] bg-white shadow-sm focus-visible:ring-1 focus-visible:ring-[#1a73e8] focus-visible:border-transparent transition-all"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="pt-2">
          <RecommendedFilters 
            filtrosRecomendados={randomCategories}
            filtroAtual={filtroAtual}
            setFiltroAtual={(name) => setFiltroAtual(prev => ({ ...prev, name }))}
            buscandoPorCategoria={buscandoPorCategoria}
          />
        </div>
      </div>

      {buscandoPorCategoria ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#1a73e8] animate-spin" />
          <p className="text-[#5f6368] font-medium text-sm">Buscando estabelecimentos...</p>
        </div>
      ) : filteredComercios.length === 0 ? (
        <div className="text-center py-20 bg-[#f8f9fa] rounded-[32px] border border-[#dadce0] border-dashed">
          <Search className="w-12 h-12 text-[#bdc1c6] mx-auto mb-4" />
          <h3 className="text-xl font-medium text-[#202124]">Nenhum comércio encontrado</h3>
          <p className="text-[#5f6368] text-sm mt-1">Tente ajustar seus filtros ou termo de busca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {filteredComercios.map(c => (
            <ComercioCard key={c.id} comercio={c} />
          ))}
        </div>
      )}
    </div>
  );
}