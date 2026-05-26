import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { RecommendedFilters } from '@/components/Global/RecommendedFilters';
import { Search, Star, MapPin, Clock, UtensilsCrossed } from 'lucide-react';
import type { Comercio } from '@/types/global';

const normalizeText = (value: string) =>
  (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

type RestauranteItem = {
  id: string;
  nome: string;
  imagem?: string;
  categoria: string;
  localizacao: string;
  especialidade: string;
  distancia: string;
  horarioFuncionamento: string;
  statusAberto: boolean;
  rating: number;
  descricao: string;
};

const getSegmento = (item: Pick<RestauranteItem, 'categoria' | 'especialidade' | 'nome' | 'descricao'>) => {
  const content = `${item.categoria} ${item.especialidade} ${item.nome} ${item.descricao}`.toLowerCase();
  if (content.includes('café') || content.includes('cafe')) return 'café';
  if (content.includes('bar')) return 'bares';
  if (content.includes('pizza')) return 'pizzarias';
  if (content.includes('lanche')) return 'lanchonetes';
  if (content.includes('regional') || content.includes('caseira') || content.includes('serg')) return 'regionais';
  return 'restaurante';
};

const normalizeRestaurants = (comercios: Comercio[]) => {
  const foodKeywords = [
    'restaurante', 'comida', 'bar', 'café', 'cafe', 'lanch', 
    'pizzaria', 'sushi', 'hamburgueria', 'steakhouse', 
    'frutos do mar', 'vegano', 'churrascaria', 'sorveteria',
    'doceria', 'chocolataria', 'culinária', 'gastronomia'
  ];

  const restaurantes = comercios.filter((comercio) => {
    const searchSpace = `${comercio.categoria} ${comercio.nome} ${comercio.descricao} ${(comercio.tags ?? []).join(' ')}`.toLowerCase();
    return foodKeywords.some(keyword => searchSpace.includes(keyword));
  });

  return restaurantes.map<RestauranteItem>((comercio, index) => ({
    id: comercio.id,
    nome: comercio.nome,
    imagem: comercio.imagem,
    categoria: getSegmento({
      categoria: comercio.categoria,
      especialidade: comercio.tags.join(' '),
      nome: comercio.nome,
      descricao: comercio.descricao,
    }),
    localizacao: (comercio as Comercio & { localizacao?: string }).localizacao ?? 'Centro de Aracaju',
    especialidade: comercio.tags?.[0] ?? comercio.categoria,
    distancia: `Aprox. ${150 + index * 40}m`,
    horarioFuncionamento: (comercio as Comercio & { horarioFuncionamento?: string }).horarioFuncionamento ?? '08h às 18h',
    statusAberto: comercio.statusAberto,
    rating: comercio.avaliacoes.length
      ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
      : 4.6,
    descricao: comercio.descricao,
  }));
};

export function Culinaria() {
  const { comercios } = useData();
  const restaurantes = useMemo(() => {
    return normalizeRestaurants(comercios);
  }, [comercios]);

  const segmentos = useMemo(() => {
    return ['Tudo', ...Array.from(new Set(restaurantes.map((restaurante) => restaurante.categoria)))].slice(0, 8);
  }, [restaurantes]);

  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ name: 'Tudo' });
  const [searchTerm, setSearchTerm] = useState('');

  const restaurantesExibidos = restaurantes.filter((restaurante) => {
    const matchesSegmento =
      filtroAtual.name === 'Tudo' ||
      normalizeText(restaurante.categoria).includes(normalizeText(filtroAtual.name));
    const search = normalizeText(searchTerm);
    const matchesSearch =
      normalizeText(restaurante.nome).includes(search) ||
      normalizeText(restaurante.descricao).includes(search) ||
      normalizeText(restaurante.localizacao).includes(search) ||
      normalizeText(restaurante.especialidade).includes(search);

    return matchesSegmento && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl md:pb-0 pb-24">
      {/* <div className="flex flex-col space-y-4 mb-8 md:mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-orange-100 rounded-xl sm:rounded-2xl text-orange-600">
            <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Culinária no Centro</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">Restaurantes, bares e sabores tradicionais no mesmo estilo da aba de comércio.</p>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col space-y-6 mb-8 md:mb-12">
        <div className="w-full max-w-2xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5f6368] transition-colors z-10" />
          <input
            type="text"
            placeholder="O que você quer comer?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 h-12 sm:h-14 text-sm sm:text-base rounded-full border border-[#dadce0] bg-white shadow-sm focus:outline-none focus:border-[#1a73e8] transition-all"
          />
        </div>

        <RecommendedFilters
          filtrosRecomendados={segmentos.slice(1)}
          filtroAtual={filtroAtual}
          setFiltroAtual={(name) => setFiltroAtual({ name })}
          center={true}
          showMoreOnMobile={segmentos.length > 8}
          useAnimatedIcons={true}
        />
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-medium text-[#202124]">{filtroAtual.name === 'Tudo' ? 'Restaurantes próximos a você' : filtroAtual.name}</h2>
          <p className="text-[#5f6368] text-xs sm:text-sm">{restaurantesExibidos.length} opções encontradas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {restaurantesExibidos.map((restaurante) => (
          <Link
            key={restaurante.id}
            to={`/comercios/${restaurante.id}`}
            className="flex items-start gap-4 p-4 rounded-2xl border border-[#dadce0] bg-white hover:border-[#1a73e8] hover:shadow-sm transition-all"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#f8f9fa] border border-[#dadce0]">
              {restaurante.imagem ? (
                <img src={restaurante.imagem} alt={restaurante.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg">
                  {restaurante.nome.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-medium text-[#202124]">{restaurante.nome}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {restaurante.categoria}
                </span>
              </div>

              <p className="text-sm text-[#5f6368] mt-1 truncate">{restaurante.especialidade}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#5f6368]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {restaurante.localizacao}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {restaurante.horarioFuncionamento}
                </span>
                <span className="inline-flex items-center gap-1 text-[#e8a317] font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {restaurante.rating.toFixed(1)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-[#3c4043]">{restaurante.distancia}</span>
                <span className={`font-medium ${restaurante.statusAberto ? 'text-[#50a773]' : 'text-rose-500'}`}>
                  {restaurante.statusAberto ? 'Aberto agora' : 'Fechado'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
