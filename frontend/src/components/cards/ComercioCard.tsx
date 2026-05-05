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
      className="flex items-center gap-4 p-3 bg-white hover:bg-gray-50 transition-colors rounded-lg cursor-pointer w-full font-sans group"
    >
      {/* LADO ESQUERDO: Imagem/Logo */}
      <div className="shrink-0 relative">
        <div className="w-18 h-18 bg-gray-100 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center">
          {comercio.imagem && !hasImageError ? (
            <img 
              src={comercio.imagem} 
              alt={`Logo do ${comercio.nome}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1a73e8] to-[#34a853] flex items-center justify-center text-white font-bold text-lg tracking-tight">
              {logoFallback || 'CJ'}
            </div>
          )}
        </div>
        
        {/* Favorite Button (Sobreposto à imagem no novo design) */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute -top-1 -right-1 p-1 rounded-full transition-all duration-300 shadow-sm ${
            isFavorite 
              ? 'bg-white text-rose-500' 
              : 'bg-white/90 text-gray-400 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* LADO DIREITO: Informações */}
      <div className="flex flex-col justify-center overflow-hidden">
        {/* Linha 1: Título */}
        <h3 className="text-[15px] font-medium text-gray-800 truncate mb-0.5 group-hover:text-[#1a73e8] transition-colors">
          {comercio.nome}
        </h3>

        {/* Linha 2: Avaliação, Categoria e Localização */}
        <div className="flex items-center text-[13px] text-gray-500 mb-0.5 gap-1.5">
          {/* Avaliação com Estrela */}
          <div className="flex items-center gap-0.5 text-[#e8a317]">
            <Star size={12} fill="currentColor" strokeWidth={0} />
            <span className="font-medium">{mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}</span>
          </div>

          <span className="text-gray-300">•</span>
          <span className="truncate">{comercio.categoria}</span>

          <span className="text-gray-300">•</span>
          <span className="whitespace-nowrap">Centro</span>
        </div>

        {/* Linha 3: Horário e Status */}
        <div className="flex items-center text-[13px] text-gray-500 gap-1.5">
          <span className="truncate">{comercio.horarioFuncionamento || '08h - 18h'}</span>

          <span className="text-gray-300">•</span>

          <span className={`font-medium ${comercio.statusAberto ? 'text-[#50a773]' : 'text-rose-500'}`}>
            {comercio.statusAberto ? 'Aberto' : 'Fechado'}
          </span>
        </div>
      </div>
    </Link>
  );
}
