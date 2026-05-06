import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { ComercioCard } from '@/components/cards/ComercioCard';
import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/Button';
import { StoreSlider } from '@/components/ui/StoreSlider';
import { RecommendedFilters } from '@/components/ui/RecommendedFilters';
import { SuggestionsSlider } from '@/components/ui/SuggestionsSlider';
import BannerSlider from '@/components/ui/BannerSlider';
import { ArrowRight, Search } from 'lucide-react';

export function Home() {
  const { comercios, eventos, randomCategories } = useData();
  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ name: 'Todos' });
  const [searchTerm, setSearchTerm] = useState('');

  const lojasExibidas =
    filtroAtual.name === 'Todos' || filtroAtual.name === 'Tudo'
      ? comercios
      : comercios.filter(c => c.categoria === filtroAtual.name);

  const proximosEventos = eventos.slice(0, 2);
  const restaurantesProximos = comercios.filter(c => c.categoria === 'restaurante').slice(0, 12);
  const formatarDataHora = (dataISO: string) => {
    const data = new Date(dataISO);
    if (Number.isNaN(data.getTime())) return '';

    const dataFormatada = data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });

    const horaFormatada = data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `${dataFormatada} • ${horaFormatada}`;
  };

  const renderEventBanner = (evento: (typeof proximosEventos)[number], keySuffix: string) => (
    <div
      key={`${evento.id}-${keySuffix}`}
      className="relative w-full h-40 overflow-hidden rounded-2xl shadow-sm text-white"
    >
      {evento.imagem ? (
        <img
          src={evento.imagem}
          alt={evento.nome}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-indigo-500" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
      <div className="relative z-10 flex h-full flex-col justify-end p-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
          Evento em destaque
        </span>
        <span className="mt-1 text-lg font-bold leading-tight line-clamp-1">{evento.nome}</span>
        <span className="mt-1 text-sm text-white/90 line-clamp-1">{evento.descricao}</span>
        <span className="mt-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          {formatarDataHora(evento.inicio)}
          {evento.fim
            ? ` - ${new Date(evento.fim).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
            : ''}
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Seção Hero - Agora ocupando 100vh no desktop para ficar atrás do conteúdo */}
      <section className="w-full h-[60vh] md:h-screen sticky top-0 z-0 p-0">
        <StoreSlider stores={comercios.slice(0, 6)} />
      </section>

      {/* Container com bordas arredondadas no topo - Sobrepondo o slider */}
      <div className="bg-white rounded-t-4xl relative z-10 md:-mt-2">
        {/* Conteúdo Principal */}
        <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12 md:space-y-20 md:pb-0 pb-24">
          {/* Barra de Pesquisa */}
          <section className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5f6368] w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar estabelecimentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#dadce0] rounded-full bg-[#f8f9fa] text-[#202124] placeholder-[#9aa0a6] focus:outline-none focus:bg-white focus:border-[#1a73e8] transition-colors"
              />
            </div>
          </section>

          {/* Navegação rápida por categorias */}
          <section className="space-y-2">
          <RecommendedFilters 
            filtrosRecomendados={randomCategories}
            filtroAtual={filtroAtual}
            setFiltroAtual={(name) => setFiltroAtual({ name: name === 'Tudo' ? 'Todos' : name })}
            navigateOnSelect={true}
            center={true}
            showMoreOnMobile={true}
          />
        </section>

        {/* Sugestões para você - Slider de Empresas */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">Sugestões para você</h2>
            <Link
              to="/sugestoes"
              className="flex items-center gap-1 text-[#1a73e8] hover:underline font-medium text-xs sm:text-sm transition-all w-max"
            >
              Ver mais
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <SuggestionsSlider comercios={comercios.slice(0, 12)} />
          {/* Mini banners para eventos: slider apenas no mobile, estático no desktop */}
          <div className="mt-4">
            {proximosEventos.length > 0 ? (
              <>
                {/* Mobile slider */}
                <div className="md:hidden">
                  <BannerSlider
                    items={proximosEventos.map((e) => renderEventBanner(e, 'mobile'))}
                  />
                </div>

                {/* Desktop static banners */}
                <div className="hidden md:flex gap-4">
                  {proximosEventos.map((e) => renderEventBanner(e, 'desktop'))}
                </div>
              </>
            ) : (
              <>
                <div className="md:hidden">
                  <BannerSlider
                    items={[
                      <div key="f1" className="w-full h-40 bg-linear-to-r from-red-600 to-red-500 rounded-2xl shadow-sm flex flex-col justify-center items-center text-white p-4">
                        <span className="font-bold text-2xl tracking-tight">Tudo por R$ 0,90</span>
                        <span className="text-sm opacity-90">Pede já!</span>
                      </div>,
                      <div key="f2" className="w-full h-40 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-sm flex flex-col justify-center items-center text-white p-4">
                        <span className="font-bold text-2xl tracking-tight">Frete Grátis</span>
                        <span className="text-sm opacity-90">Em restaurantes selecionados</span>
                      </div>,
                    ]}
                  />
                </div>

                <div className="hidden md:flex gap-4">
                  <div className="flex-1 h-40 bg-linear-to-r from-red-600 to-red-500 rounded-2xl shadow-sm flex flex-col justify-center items-center text-white p-4">
                    <span className="font-bold text-2xl tracking-tight">Tudo por R$ 0,90</span>
                    <span className="text-sm opacity-90">Pede já!</span>
                  </div>
                  <div className="flex-1 h-40 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-sm flex flex-col justify-center items-center text-white p-4">
                    <span className="font-bold text-2xl tracking-tight">Frete Grátis</span>
                    <span className="text-sm opacity-90">Em restaurantes selecionados</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Restaurantes próximos a você */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">Restaurantes próximos a você</h2>
            <Link
              to="/culinaria"
              className="flex items-center gap-1 text-[#1a73e8] hover:underline font-medium text-xs sm:text-sm transition-all w-max"
            >
              Ver tudo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <SuggestionsSlider comercios={restaurantesProximos} />
        </section>

        {/* Lojas Section */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">
                  {filtroAtual.name === 'Todos' ? 'Lojas' : filtroAtual.name}
                </h2>
                {/* <span className="text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-md bg-[#f1f3f4] text-[#5f6368] border border-[#dadce0]">
                  {lojasExibidas.length} lojas
                </span> */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {lojasExibidas.map((c) => (
              <ComercioCard key={c.id} comercio={c} />
            ))}
          </div>
        </section>

        {/* Promoções - seção com verificação de segurança (Estilo Original Vibrante) */}
        {/* <section className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-12 text-white shadow-xl overflow-hidden relative border-none">
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
        </section> */}

        {/* Próximos Eventos */}
        {/* <section className="space-y-6 sm:space-y-8">
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
        </section> */}
      </main>
      </div>
    </div>
  );
}