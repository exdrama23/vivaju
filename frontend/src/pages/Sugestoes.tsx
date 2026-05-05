import { useState, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, Coffee, Utensils, Music, MapPin, Package, Palette } from 'lucide-react';
import { formatarCategoria } from '@/utils/utils';
import gsap from 'gsap';

export function Sugestoes() {
  const { comercios, randomCategories } = useData();
  const navigate = useNavigate();
  const [filtroAtual, setFiltroAtual] = useState<string>('Tudo');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollFiltros = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    gsap.to(scrollRef.current, {
      scrollLeft: scrollRef.current.scrollLeft + scrollAmount,
      duration: 0.5,
      ease: 'power2.out',
    });
  };
  const categoryIcons: { [key: string]: React.ReactNode } = {
    'tudo': <Sparkles className="w-6 h-6" />,
    'perfumaria': <Palette className="w-6 h-6" />,
    'moda': <ShoppingBag className="w-6 h-6" />,
    'café': <Coffee className="w-6 h-6" />,
    'restaurante': <Utensils className="w-6 h-6" />,
    'eventos': <Music className="w-6 h-6" />,
    'ponto turístico': <MapPin className="w-6 h-6" />,
    'produtos': <Package className="w-6 h-6" />,
  };

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category.toLowerCase();
    return categoryIcons[lowerCategory] || <ShoppingBag className="w-6 h-6" />;
  };

  const comerciosFiltrados =
    filtroAtual === 'Tudo'
      ? comercios
      : comercios.filter(c => c.categoria === filtroAtual);

  const allCategories = ['Tudo', ...randomCategories];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#dadce0]">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#f8f9fa] rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#5f6368]" />
          </button>
          <h1 className="text-xl sm:text-2xl font-medium text-[#202124]">Sugestões para você</h1>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
        {/* Filtros por Categoria - Desktop */}
        <div className="mb-8 hidden md:flex flex-wrap gap-3">
          {allCategories.map((categoria) => {
            const isActive = filtroAtual === categoria;
            const label = categoria === 'Tudo' ? categoria : formatarCategoria(categoria);
            const icon = getCategoryIcon(categoria);

            return (
              <button
                key={categoria}
                onClick={() => setFiltroAtual(categoria)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 border font-medium text-sm ${
                  isActive
                    ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8]'
                    : 'bg-[#f8f9fa] border-[#dadce0] text-[#3c4043] hover:bg-[#e8f0fe] hover:border-[#1a73e8]'
                }`}
              >
                {icon}
                {label}
              </button>
            );
          })}
        </div>

        {/* Filtros por Categoria - Mobile Slider */}
        <div className="mb-8 md:hidden relative group w-full">
          {/* Botão Scroll Esquerdo */}
          <button
            onClick={() => scrollFiltros('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-10 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f8f9fa] border border-[#dadce0]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-[#5f6368]" />
          </button>

          {/* Wrapper do Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 px-6 py-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allCategories.map((categoria) => {
              const isActive = filtroAtual === categoria;
              const label = categoria === 'Tudo' ? categoria : formatarCategoria(categoria);
              const icon = getCategoryIcon(categoria);

              return (
                <button
                  key={categoria}
                  onClick={() => setFiltroAtual(categoria)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 border font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8]'
                      : 'bg-[#f8f9fa] border-[#dadce0] text-[#3c4043]'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              );
            })}
          </div>

          {/* Botão Scroll Direito */}
          <button
            onClick={() => scrollFiltros('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-10 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f8f9fa] border border-[#dadce0]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-[#5f6368]" />
          </button>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Lista de Comercios */}
        <div className="space-y-3">
          {comerciosFiltrados.length > 0 ? (
            comerciosFiltrados.map((comercio) => {
              const icon = getCategoryIcon(comercio.categoria);

              return (
                <button
                  key={comercio.id}
                  onClick={() => navigate(`/comercios/${comercio.id}`)}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-[#dadce0] bg-[#f8f9fa] hover:bg-white hover:border-[#1a73e8] transition-all duration-200 text-left"
                >
                  {/* Logo */}
                  <div className="w-16 h-16 rounded-lg bg-white border border-[#dadce0] overflow-hidden flex items-center justify-center flex-shrink-0">
                    {comercio.imagem ? (
                      <img
                        src={comercio.imagem}
                        alt={comercio.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a73e8] to-[#4285f4] flex items-center justify-center text-white font-bold">
                        {comercio.nome.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#1a73e8]">{icon}</span>
                      <span className="text-xs font-medium text-[#5f6368] uppercase tracking-wide">
                        {formatarCategoria(comercio.categoria)}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-[#202124] line-clamp-1">
                      {comercio.nome}
                    </h3>
                    <p className="text-xs text-[#5f6368] line-clamp-1 mt-1">
                      {comercio.descricao}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        comercio.statusAberto
                          ? 'bg-[#d4edda] text-[#155724]'
                          : 'bg-[#f8d7da] text-[#721c24]'
                      }`}
                    >
                      {comercio.statusAberto ? 'Aberto' : 'Fechado'}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-[#5f6368] text-sm">Nenhum comercio encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
