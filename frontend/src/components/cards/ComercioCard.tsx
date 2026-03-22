import { useState } from 'react';
import type { ComercioExtendido } from '@/services/mockData';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ComercioCard({ comercio }: { comercio: ComercioExtendido }) {
  const [isFavorite, setIsFavorite] = useState(comercio.favoritada);

  const mediaAvaliacoes = comercio.rating || (comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0);

  return (
    <div className="group flex flex-col w-full cursor-pointer bg-transparent transition-all duration-300">
      <Link to={`/comercios/${comercio.id}`} className="relative w-full aspect-video rounded-xl overflow-hidden mb-2">
        <img 
          src={comercio.imagem} 
          alt={comercio.nome} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Status Badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide shadow-sm border ${
          comercio.statusAberto 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
            : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
          {comercio.statusAberto ? 'ABERTO' : 'FECHADO'}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300 ${
            isFavorite 
              ? 'bg-white text-rose-500 shadow-md' 
              : 'bg-white/90 text-[#5f6368] hover:text-rose-500 shadow-sm opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </Link>

      <div className="flex flex-col px-1">
        <h3 className="text-[15px] font-medium text-[#202124] line-clamp-1 leading-snug group-hover:text-[#1a73e8] transition-colors">
          {comercio.nome}
        </h3>
        
        <div className="flex flex-col text-xs text-[#5f6368] mt-0.5">
          <p className="font-normal">{comercio.categoria}</p>
          
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex items-center gap-0.5 text-[#e37400] font-medium">
              <span>{mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}</span>
              <Star className="w-3 h-3 fill-current" />
            </div>
            {comercio.resumo_avaliacoes && (
              <>
                <span className="text-[#bdc1c6]">•</span>
                <span className="truncate max-w-[120px]">{comercio.resumo_avaliacoes}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
