import React, { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Search, Star, ChevronRight, Phone, MapPin, 
  Navigation, AtSign, Info, X, AlertTriangle 
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { ComercioExtendido } from '@/services/mockData';

const ITEMS_PER_PAGE = 20;

const InfoContent = ({ comercio }: { comercio: ComercioExtendido }) => (
  <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
    <section aria-labelledby="info-heading">
      <h2 id="info-heading" className="text-lg font-bold text-gray-900 mb-4">Informações</h2>
      <div className="space-y-3">
        <a
          href="#"
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Instagram"
        >
          <AtSign className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{comercio.redes_sociais || '@viva_ju'}</span>
        </a>
        <a
          href={`tel:${comercio.telefoneContato}`}
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Telefone ${comercio.telefoneContato}`}
        >
          <Phone className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{comercio.telefoneContato}</span>
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${comercio.latitude},${comercio.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Endereço ${comercio.localizacao}`}
        >
          <MapPin className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{comercio.localizacao}</span>
            <span className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3" aria-hidden="true" />
              Ver rotas no mapa
            </span>
          </div>
        </a>
      </div>
    </section>

    <section aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-lg font-bold text-gray-900 mb-4">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        {comercio.tags?.length ? comercio.tags.map((cat) => (
          <button
            key={cat}
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            aria-label={`Categoria ${cat}`}
          >
            {cat}
          </button>
        )) : (
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
          >
            {comercio.categoria}
          </button>
        )}
      </div>
    </section>

    <section aria-labelledby="promotions-heading">
      <h2 id="promotions-heading" className="text-lg font-bold text-gray-900 mb-4">Destaques</h2>
      <div className="space-y-3">
        {(comercio.produtos || []).slice(0, 3).map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full text-left flex gap-3 items-center group p-2 -mx-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={`${item.nome}`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.imagem || comercio.imagem} alt={item.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-800 truncate">{item.nome}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs bg-orange-500 text-white px-1 rounded-sm">Popular</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  </div>
);

const SidebarContent = ({ comercio }: { comercio: ComercioExtendido }) => (
  <div className="space-y-6">
    <section aria-labelledby="sidebar-info-heading">
      <h2 id="sidebar-info-heading" className="text-lg font-bold text-gray-900 mb-4">Informações</h2>
      <div className="space-y-3">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Instagram"
        >
          <AtSign className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{comercio.redes_sociais || '@viva_ju'}</span>
        </a>
        <a
          href={`tel:${comercio.telefoneContato}`}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Telefone ${comercio.telefoneContato}`}
        >
          <Phone className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{comercio.telefoneContato}</span>
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${comercio.latitude},${comercio.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Endereço ${comercio.localizacao}`}
        >
          <MapPin className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{comercio.localizacao}</span>
            <span className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3" aria-hidden="true" />
              Ver rotas no mapa
            </span>
          </div>
        </a>
      </div>
    </section>

    <section aria-labelledby="sidebar-categories-heading">
      <h2 id="sidebar-categories-heading" className="text-lg font-bold text-gray-900 mb-4">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        {comercio.tags?.length ? comercio.tags.map((cat) => (
          <button
            key={cat}
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label={`Categoria ${cat}`}
          >
            {cat}
          </button>
        )) : (
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
          >
            {comercio.categoria}
          </button>
        )}
      </div>
    </section>

    <section aria-labelledby="sidebar-promotions-heading">
      <h2 id="sidebar-promotions-heading" className="text-lg font-bold text-gray-900 mb-4">Destaques</h2>
      <div className="space-y-3">
        {(comercio.produtos || []).slice(0, 3).map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full text-left flex gap-3 items-center group p-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={`${item.nome}`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.imagem || comercio.imagem} alt={item.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-800 truncate">{item.nome}</h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange, isMobile = false }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; isMobile?: boolean }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-40">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'} transition disabled:opacity-50`}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'} transition disabled:opacity-50`}
          aria-label="Próxima página"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginação dos produtos">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
            page === currentPage ? 'bg-yellow-400 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={`Ir para página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </nav>
  );
};

export function ComercioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { comercios, addAvaliacao, toggleFavorito } = useData();
  const comercio = comercios.find(c => c.id === id) as ComercioExtendido | undefined;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHoveringInfoBtn, setIsHoveringInfoBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  const handleReviewSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!comercio) return;
    
    addAvaliacao({
      id: Date.now().toString(),
      usuarioId: 'u-anon',
      comercioId: comercio.id,
      nota,
      comentario,
      data: new Date().toISOString()
    });
    setIsReviewModalOpen(false);
    setComentario('');
  }, [addAvaliacao, comercio, nota, comentario]);

  const filteredProducts = useMemo(() => {
    if (!comercio || !comercio.produtos) return [];
    return comercio.produtos.filter(p => 
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [comercio, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  if (!comercio) {
    return <div className="p-12 text-center text-[#5f6368]">Comércio não encontrado.</div>;
  }

  const avaliacoes = comercio.avaliacoes || [];
  const mediaAvaliacoes = avaliacoes.length
    ? avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoes.length
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          <div className="relative h-64 lg:h-[60vh] w-full bg-yellow-400">
            <img
              src={comercio.imagem}
              alt={comercio.nome}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                aria-label="Voltar" 
                className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => toggleFavorito(comercio.id)}
                  aria-label={comercio.favoritada ? 'Remover favorito' : 'Favoritar'}
                  className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <Heart className={`w-5 h-5 ${comercio.favoritada ? 'fill-red-500 text-red-500' : ''}`} aria-hidden="true" />
                </button>
                <div className="relative flex items-center">
                  {!searchExpanded ? (
                    <button
                      type="button"
                      onClick={() => setSearchExpanded(true)}
                      className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Buscar"
                    >
                      <Search className="w-5 h-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full pl-3 pr-2 h-10">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar..."
                        className="bg-transparent text-white outline-none text-sm w-32 md:w-48 placeholder-white/70"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => { setSearchExpanded(false); setSearchTerm(''); }}
                        className="p-1 rounded-full hover:bg-white/20 transition"
                        aria-label="Fechar busca"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-7 z-20">
              <div className="w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-full p-1.5 shadow-xl border-4 border-white">
                <img
                  src={comercio.imagem}
                  alt={comercio.nome}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative bg-white -mt-14 mx-4 lg:mx-8 rounded-2xl shadow-md p-6 lg:p-8 z-10 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {comercio.nome}
                </h1>
                <p className="text-[13px] md:text-sm text-gray-500 mt-1">
                  {comercio.categoria} • {comercio.vendedorAmbulante ? 'Ambulante' : 'Estabelecimento'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-1 self-start lg:self-center shrink-0 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                aria-label="Avaliações do restaurante"
              >
                <Star className="w-4 h-4 text-gray-800 fill-gray-800" aria-hidden="true" />
                <span className="font-bold">{mediaAvaliacoes.toFixed(1)}</span>
                <span className="text-gray-500">({avaliacoes.length})</span>
                <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
              <p>
                <span className={`font-semibold ${comercio.statusAberto ? 'text-green-600' : 'text-red-600'}`}>
                  {comercio.statusAberto ? 'Aberto' : 'Fechado'}
                </span> • {comercio.horarioFuncionamento}
              </p>
              <span className="hidden sm:block text-gray-300">|</span>
              <p className="text-[13px] text-gray-500">{comercio.localizacao}</p>
            </div>
          </div>

          <div className="px-4 lg:px-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Destaques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {(comercio.produtos || []).slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex flex-col text-left group focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  aria-label={item.nome}
                >
                  <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={item.imagem || comercio.imagem}
                      alt={item.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-[14px] text-gray-800 font-medium leading-tight mt-1 line-clamp-2">
                      {item.nome}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 lg:px-8 mt-10 hidden lg:block">
            {!sidebarOpen && <InfoContent comercio={comercio} />}
          </div>

          <div className="px-4 lg:px-8 mt-10 pb-20 lg:pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos</h2>
            {displayedProducts.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                Nenhum produto encontrado.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.imagem || comercio.imagem}
                        alt={product.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 flex flex-col flex-1">
                      <div className="flex items-center gap-1 flex-wrap mt-1">
                        <span className="text-[12px] text-orange-500 font-bold">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco)}
                        </span>
                      </div>
                      <h3 className="text-[14px] text-gray-800 font-medium leading-tight mt-1 line-clamp-2">
                        {product.nome}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{product.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="hidden lg:block">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
            {totalPages > 1 && (
              <div className="lg:hidden">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  isMobile
                />
              </div>
            )}
          </div>

          <div className="px-4 lg:px-8 mt-10 pb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações</h2>
            <div className="space-y-4">
              {avaliacoes.length === 0 ? (
                <p className="text-gray-500 text-sm italic">Este local ainda não recebeu avaliações.</p>
              ) : (
                avaliacoes.map(a => (
                  <div key={a.id} className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-[10px] font-bold">
                          {a.usuarioId.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800 text-sm">Usuário</span>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={`${i < a.nota ? 'fill-current' : 'text-gray-200'}`} strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{a.comentario}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block">
                      {new Date(a.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Button 
              onClick={() => setIsReviewModalOpen(true)}
              className="mt-6 w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl"
            >
              Escrever Avaliação
            </Button>
          </div>
        </div>

        {sidebarOpen && (
          <aside className="hidden lg:block w-80 xl:w-96 bg-white border-l border-gray-200 lg:sticky lg:top-0 lg:h-screen overflow-y-auto p-6 z-30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Informações</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
                aria-label="Fechar informações"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent comercio={comercio} />
            <Button 
              variant="ghost" 
              onClick={() => setIsReportModalOpen(true)}
              className="w-full text-gray-400 hover:text-red-500 text-xs gap-2 pt-8"
            >
              <AlertTriangle size={14} /> Denunciar erro neste local
            </Button>
          </aside>
        )}
      </div>

      {!sidebarOpen && (
        <div className="hidden lg:block fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={() => setIsHoveringInfoBtn(true)}
            onMouseLeave={() => setIsHoveringInfoBtn(false)}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
            style={{ padding: isHoveringInfoBtn ? '10px 20px 10px 16px' : '10px' }}
            aria-label="Abrir informações"
          >
            <Info className="w-6 h-6" aria-hidden="true" />
            <span
              className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHoveringInfoBtn ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              Informações
            </span>
          </button>
        </div>
      )}

      <div className="lg:hidden px-4 mt-10 pb-20">
        <InfoContent comercio={comercio} />
        <Button 
          variant="ghost" 
          onClick={() => setIsReportModalOpen(true)}
          className="w-full text-gray-400 hover:text-red-500 text-xs gap-2 py-8"
        >
          <AlertTriangle size={14} /> Denunciar erro neste local
        </Button>
      </div>

      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Denunciar local">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="report-reason" className="block text-sm font-medium text-gray-500">Por que você está denunciando este local?</label>
            <select id="report-reason" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
              <option>Informações incorretas</option>
              <option>Local fechado permanentemente</option>
              <option>Local inexistente</option>
              <option>Conteúdo impróprio</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="report-details" className="block text-sm font-medium text-gray-500">Conte-nos mais detalhes...</label>
            <textarea 
              id="report-details"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" 
              rows={4} 
              placeholder="..."
            />
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => setIsReportModalOpen(false)}>Cancelar</Button>
             <Button className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsReportModalOpen(false)}>Enviar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Sua avaliação">
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-500 mb-3">Qual sua nota para o local?</legend>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setNota(v)}
                  className={`p-2 rounded-full transition-colors ${
                    nota >= v ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200`}
                  aria-label={`Nota ${v}`}
                >
                  <Star 
                    size={32} 
                    className={nota >= v ? 'fill-current' : ''} 
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              {nota === 1 ? 'Péssimo' : nota === 2 ? 'Ruim' : nota === 3 ? 'Regular' : nota === 4 ? 'Bom' : 'Excelente'}
            </p>
          </fieldset>
          <div className="space-y-2">
            <label htmlFor="review-comment" className="block text-sm font-medium text-gray-500">Escreva seu comentário</label>
            <textarea 
              id="review-comment"
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-yellow-200" 
              rows={4} 
              value={comentario} 
              onChange={e => setComentario(e.target.value)} 
              placeholder="Como foi sua experiência?"
              required
            />
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => setIsReviewModalOpen(false)}>Cancelar</Button>
             <Button type="submit" className="flex-1 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">Publicar</Button>
          </div>
        </form>
      </Modal>
    </main>
  );
}