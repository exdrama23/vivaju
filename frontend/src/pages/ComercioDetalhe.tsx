import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, Clock, Phone, Star, MessageCircle, AlertTriangle, 
  Instagram, Navigation, Search, DollarSign, Bike, ChevronDown 
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { Modal } from '@/components/ui/Modal';
import { ProdutoCard } from '@/components/cards/ProdutoCard';
import type { ComercioExtendido } from '@/services/mockData';

export function ComercioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { comercios, addAvaliacao } = useData();
  const comercio = comercios.find(c => c.id === id) as ComercioExtendido | undefined;
  
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!comercio) {
    return <div className="p-12 text-center text-[#5f6368]">Comércio não encontrado.</div>;
  }

  const mediaAvaliacoes = comercio.rating || (comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0);

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${comercio.latitude},${comercio.longitude}`, '_blank');
  };

  const produtosFiltrados = comercio.produtos.filter(p => 
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 md:py-8 max-w-5xl bg-white min-h-screen md:pb-0 pb-24">
      
      {/* NOVO DESIGN DO CABEÇALHO */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden mb-8">
        {/* 1. SEÇÃO DA CAPA (BANNER) */}
        <div className="w-full h-48 sm:h-64 bg-gray-200">
          <img 
            src={comercio.imagem} 
            alt={comercio.nome} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* 2. SEÇÃO DE INFORMAÇÕES */}
        <div className="px-4 py-6">
          
          {/* LINHA SUPERIOR: Logo, Título e Infos da Direita */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            
            {/* Bloco Esquerdo: Logo e Título */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 bg-white flex-shrink-0">
                <img 
                  src={comercio.imagem} 
                  alt={comercio.nome} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {comercio.nome}
                  </h1>
                  <div className="flex items-center text-[#e8a317] text-sm font-medium">
                    <Star size={14} fill="currentColor" className="mr-1" strokeWidth={0} />
                    {mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{comercio.categoria}</p>
              </div>
            </div>

            {/* Bloco Direito: Botões de Ação */}
            <div className="flex items-center text-[13px] gap-4">
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="text-red-600 font-medium hover:underline transition-all"
              >
                Avaliar
              </button>
              
              <div className="w-px h-4 bg-gray-300"></div>
              
              <div className="flex items-center text-gray-500">
                <DollarSign size={14} className="mr-1" />
                Destaque Local
              </div>
            </div>
          </div>

          {/* LINHA INFERIOR: Barra de Pesquisa e Filtros */}
          <div className="flex flex-col md:flex-row gap-3">
            
            <div className="flex-1 flex items-center px-4 py-2.5 border border-gray-200 rounded-xl flex-shrink-0 focus-within:border-red-200 transition-colors">
              <Search size={18} className="text-red-500 mr-3" />
              <input 
                type="text" 
                placeholder="Buscar no catálogo" 
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[14px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button 
              onClick={handleOpenGoogleMaps}
              className="flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors min-w-[130px]"
            >
              <div className="flex items-center text-gray-700 text-[14px]">
                <MapPin size={18} className="text-gray-400 mr-2" />
                Ver no Mapa
              </div>
              <ChevronDown size={16} className="text-red-500" />
            </button>

            <div className="flex flex-col justify-center px-4 py-1.5 border border-gray-200 rounded-xl min-w-[150px]">
              <span className="text-[13px] text-gray-800">{comercio.statusAberto ? 'Aberto Agora' : 'Fechado'}</span>
              <div className="text-[12px] text-gray-500">
                {comercio.horarioFuncionamento} <span className="mx-1">•</span> 
                <span className={`font-medium ${comercio.statusAberto ? 'text-[#50a773]' : 'text-rose-500'}`}>
                  {comercio.statusAberto ? 'Visite' : 'Volte depois'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CONTEÚDO PRINCIPAL (CATÁLOGO) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Catálogo de Produtos</h2>
              <span className="text-xs text-gray-500">{produtosFiltrados.length} itens</span>
            </div>

            {produtosFiltrados.length === 0 ? (
              <div className="p-8 bg-gray-50 rounded-2xl text-center border border-gray-100 border-dashed">
                <p className="text-gray-500 text-sm">Nenhum produto encontrado na busca.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {produtosFiltrados.map(p => (
                  <ProdutoCard key={p.id} produto={p} />
                ))}
              </div>
            )}
          </div>

          {/* AVALIAÇÕES */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">O que os clientes dizem</h2>
            
            {comercio.resumo_avaliacoes && (
               <div className="bg-[#fef7e0]/50 p-6 rounded-2xl border border-[#feefc3]">
                  <p className="text-[#e8a317] text-xs font-semibold flex items-center gap-2 mb-2 uppercase tracking-wider">
                     <Star size={14} fill="currentColor" strokeWidth={0} /> Resumo Inteligente
                  </p>
                  <p className="text-gray-700 italic text-sm leading-relaxed">"{comercio.resumo_avaliacoes}"</p>
               </div>
            )}

            <div className="space-y-4">
              {comercio.avaliacoes.length === 0 ? (
                <p className="text-gray-500 text-sm italic py-4">Este local ainda não recebeu avaliações.</p>
              ) : (
                comercio.avaliacoes.map(a => (
                  <div key={a.id} className="bg-white border border-gray-100 p-5 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-[10px] font-bold">U</div>
                        <span className="font-medium text-gray-800 text-sm">Cliente</span>
                      </div>
                      <div className="flex text-[#e8a317]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={`${i < a.nota ? 'fill-current' : 'text-gray-200'}`} strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{a.comentario}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SIDEBAR (SOBRE) */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 shadow-sm sticky top-28">
            <h3 className="font-semibold text-lg text-gray-800">Informações</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Funcionamento</p>
                  <p className="text-sm text-gray-700 font-medium">{comercio.horarioFuncionamento}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-red-500 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Localização</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{comercio.localizacao}</p>
                </div>
              </div>

              {comercio.telefone !== 'N/A' && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-red-500 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Contato</p>
                    <a href={`https://wa.me/55${comercio.telefone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 font-medium hover:underline">
                      {comercio.telefone}
                    </a>
                  </div>
                </div>
              )}

              {comercio.redes_sociais && comercio.redes_sociais !== 'N/A' && (
                <div className="flex items-start gap-3">
                  <Instagram size={18} className="text-red-500 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Redes Sociais</p>
                    <p className="text-sm text-gray-700 font-medium">{comercio.redes_sociais}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-48 rounded-xl overflow-hidden mt-6 border border-gray-100 shadow-inner">
              <MapContainer center={[comercio.latitude, comercio.longitude]} zoom={17} className="w-full h-full">
                <MapMarker position={[comercio.latitude, comercio.longitude]} type="comercio" />
              </MapContainer>
            </div>

            <Button 
              variant="ghost" 
              onClick={() => setIsReportModalOpen(true)}
              className="w-full text-gray-400 hover:text-red-500 text-xs gap-2 pt-4"
            >
              <AlertTriangle size={14} /> Denunciar erro neste local
            </Button>
          </div>
        </div>

      </div>

      {/* MODALS */}
      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Denunciar local">
        <div className="space-y-6">
          <p className="text-sm text-gray-500">Por que você está denunciando este local?</p>
          <select className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
            <option>Informações incorretas</option>
            <option>Local fechado permanentemente</option>
            <option>Local inexistente</option>
            <option>Conteúdo impróprio</option>
          </select>
          <textarea 
            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" 
            rows={4} 
            placeholder="Conte-nos mais detalhes..."
          />
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => setIsReportModalOpen(false)}>Cancelar</Button>
             <Button className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white" onClick={() => setIsReportModalOpen(false)}>Enviar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Sua avaliação">
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">Qual sua nota para o local?</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button 
                  key={v}
                  type="button"
                  onClick={() => setNota(v)}
                  className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                    nota === v 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-500">Escreva seu comentário</label>
            <textarea 
              className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" 
              rows={4} 
              value={comentario} 
              onChange={e => setComentario(e.target.value)} 
              placeholder="Como foi sua experiência?"
              required
            />
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => setIsReviewModalOpen(false)}>Cancelar</Button>
             <Button type="submit" className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white">Publicar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
