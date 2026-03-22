import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { ComercioCard } from '@/components/cards/ComercioCard';
import { EventoCard } from '@/components/cards/EventoCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { StoreSlider } from '@/components/ui/StoreSlider';
import { RecommendedFilters } from '@/components/ui/RecommendedFilters';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export function Home() {
  const { comercios, eventos, randomCategories } = useData();
  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ name: 'Todos' });

  const lojasExibidas =
    filtroAtual.name === 'Todos' || filtroAtual.name === 'Tudo'
      ? comercios
      : comercios.filter(c => c.categoria === filtroAtual.name);

  const proximosEventos = eventos.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Seção Hero - Clean Google Style */}
      <section className="w-full bg-white py-4 md:py-12 px-2 sm:px-4">
        <div className="container mx-auto">
          <StoreSlider stores={comercios.slice(0, 6)} />
        </div>
      </section>

      {/* Navegação rápida por categorias */}
      <div className="bg-white border-b border-[#dadce0] sticky top-16 z-30 py-2 sm:py-3">
        <div className="container mx-auto px-4 sm:px-6">
          <RecommendedFilters 
            filtrosRecomendados={randomCategories}
            filtroAtual={filtroAtual}
            setFiltroAtual={(name) => setFiltroAtual({ name: name === 'Tudo' ? 'Todos' : name })}
          />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-20 md:pb-0 pb-24">
        {/* Lojas Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">
                  {filtroAtual.name === 'Todos' ? 'Sugestões para você' : filtroAtual.name}
                </h2>
                <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md bg-[#f1f3f4] text-[#5f6368] border border-[#dadce0]">
                  {lojasExibidas.length} lojas
                </span>
              </div>
              <p className="text-[#5f6368] text-xs sm:text-sm">
                {filtroAtual.name === 'Todos' 
                  ? 'Os melhores estabelecimentos do coração de Aracaju.'
                  : `Destaques em ${filtroAtual.name.toLowerCase()}.`}
              </p>
            </div>
            <Link
              to="/comercios"
              className="flex items-center gap-1 text-[#1a73e8] hover:underline font-medium text-xs sm:text-sm transition-all w-fit"
            >
              Ver tudo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
            {lojasExibidas.map((c) => (
              <ComercioCard key={c.id} comercio={c} />
            ))}
          </div>
        </section>

        {/* Promoções - seção com verificação de segurança (Estilo Original Vibrante) */}
        <section className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-12 text-white shadow-xl overflow-hidden relative border-none">
          <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4 hidden sm:block">
            <Tag className="w-64 h-64" />
          </div>
          <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-8 sm:gap-12">
            <div className="space-y-4 text-center xl:text-left max-w-md">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Ofertas da Semana</h2>
              <p className="text-amber-100 text-base sm:text-lg">
                Preparamos descontos exclusivos nos melhores produtos do centro
                para você aproveitar hoje!
              </p>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold rounded-xl sm:rounded-2xl h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto">
                Ver Todas as Promoções
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full xl:w-auto">
              {comercios.slice(0, 2).map((c) => {
                const primeiroProduto = c.produtos?.[0];
                if (!primeiroProduto) return null;
                return (
                  <div
                    key={c.id}
                    className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20"
                  >
                    <p className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                      {c.nome}
                    </p>
                    <h3 className="font-bold text-base sm:text-lg mb-3 line-clamp-1">{primeiroProduto.nome}</h3>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xl sm:text-2xl font-black">
                        R$ {primeiroProduto.preco?.toFixed(2) ?? '0,00'}
                      </span>
                      <Link to={`/comercios/${c.id}`}>
                        <Button size="sm" className="bg-white text-orange-600 h-9 px-4 font-bold rounded-xl whitespace-nowrap">
                          Pegar
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Próximos Eventos */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#f3e5f5]">
              <Calendar className="text-[#9c27b0] w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">Agenda Cultural</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {proximosEventos.map((e) => (
              <EventoCard key={e.id} evento={e} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}