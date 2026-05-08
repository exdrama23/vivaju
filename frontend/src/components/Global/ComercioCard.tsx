import { useState } from 'react';
import type { ComercioExtendido } from '@/services/mockData';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ComercioCard({ comercio }: { comercio: ComercioExtendido }) {
  const [isFavorite, setIsFavorite] = useState(comercio.favoritada);
  const [hasImageError, setHasImageError] = useState(false);

  const mediaAvaliacoes = comercio.rating || (comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0);

  const logoFallback = comercio.nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <Link 
      to={`/comercios/${comercio.id}`}
      className="flex items-center gap-6 p-4 bg-white hover:bg-gray-50 transition-all duration-300 rounded-xl cursor-pointer w-full font-sans group border border-transparent hover:border-gray-100 hover:shadow-md"
    >
      {/* LADO ESQUERDO: Imagem/Logo - Aumentada de 18 para 24 */}
      <div className="shrink-0 relative">
        <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
          {comercio.imagem && !hasImageError ? (
            <img 
              src={comercio.imagem} 
              alt={`Logo do ${comercio.nome}`} 
              className="w-full h-full object-cover "
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1a73e8] to-[#34a853] flex items-center justify-center text-white font-bold text-2xl tracking-tight">
              {logoFallback || 'CJ'}
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-0 right-0 p-1.5 rounded-full transition-all duration-300 shadow-md ${
            isFavorite 
              ? 'bg-white text-rose-500' 
              : 'bg-white/90 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* LADO DIREITO: Informações - Textos aumentados */}
      <div className="flex flex-col justify-center overflow-hidden flex-1">
        {/* Linha 1: Título */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 truncate mb-1 group-hover:text-[#1a73e8] transition-colors">
          {comercio.nome}
        </h3>

        {/* Linha 2: Avaliação, Categoria e Localização */}
        <div className="flex items-center text-sm md:text-base text-gray-500 mb-1 gap-2">
          {/* Avaliação com Estrela */}
          <div className="flex items-center gap-1 text-[#e8a317] font-semibold">
            <Star size={14} fill="currentColor" strokeWidth={0} />
            <span>{mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}</span>
          </div>

          <span className="text-gray-300">•</span>
          <span className="truncate">{comercio.categoria}</span>

          <span className="text-gray-300">•</span>
          <span className="whitespace-nowrap">Centro</span>
        </div>

        {/* Linha 3: Horário e Status */}
        <div className="flex items-center text-sm md:text-base text-gray-400 gap-2">
          <span className="truncate">{comercio.horarioFuncionamento || '08h - 18h'}</span>

          <span className="text-gray-300">•</span>

          <span className={`font-medium ${comercio.statusAberto ? 'text-[#50a773]' : 'text-rose-500'}`}>
            {comercio.statusAberto ? 'Aberto agora' : 'Fechado'}
          </span>
        </div>
      </div>
    </Link>
  );
}
