import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Phone, Star, MessageCircle, AlertTriangle, Instagram, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { Modal } from '@/components/ui/Modal';
import type { ComercioExtendido } from '@/services/mockData';

export function ComercioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { comercios, addAvaliacao } = useData();
  const comercio = comercios.find(c => c.id === id) as ComercioExtendido | undefined;
  
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

  if (!comercio) {
    return <div className="p-12 text-center text-[#5f6368]">Comércio não encontrado.</div>;
  }

  const mediaAvaliacoes = comercio.rating || (comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0);

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${comercio.latitude},${comercio.longitude}`, '_blank');
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div className="relative h-80 md:h-[450px] w-full overflow-hidden rounded-[32px] border border-[#dadce0] shadow-sm">
             <img src={comercio.imagem} alt={comercio.nome} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/5" />
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-medium text-[#202124] tracking-tight">{comercio.nome}</h1>
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide shadow-sm border ${
                    comercio.statusAberto 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : 'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                    {comercio.statusAberto ? 'ABERTO' : 'FECHADO'}
                  </div>
                </div>
                <p className="text-[#5f6368] text-lg font-normal">{comercio.categoria}</p>
              </div>
              
              <div className="flex items-center gap-2 bg-[#fef7e0] text-[#202124] px-4 py-2 rounded-2xl border border-[#feefc3] shadow-sm">
                <Star className="w-5 h-5 text-[#fbbc04] fill-current" />
                <span className="text-xl font-medium">{mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {comercio.tags.map(tag => (
                <Badge key={tag} variant="outline" className="rounded-full px-4 py-1 text-[#5f6368] border-[#dadce0] bg-white">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {comercio.telefone !== 'N/A' && (
                <a href={`https://wa.me/55${comercio.telefone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex-1">
                  <Button className="w-full rounded-full h-12 bg-[#25d366] hover:bg-[#20bd5c] text-white border-none shadow-sm flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </Button>
                </a>
              )}
              <Button 
                onClick={handleOpenGoogleMaps}
                className="flex-1 rounded-full h-12 flex items-center justify-center gap-2 shadow-sm"
              >
                <Navigation className="w-5 h-5" /> Traçar Rota
              </Button>
              <Button variant="ghost" onClick={() => setIsReportModalOpen(true)} className="w-12 h-12 rounded-full p-0 text-[#5f6368] hover:text-[#d93025] hover:bg-[#fce8e6]">
                <AlertTriangle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-[#dadce0]">
            <h2 className="text-2xl font-medium text-[#202124]">Produtos em destaque</h2>
            {comercio.produtos.length === 0 ? (
              <div className="p-8 bg-[#f8f9fa] rounded-3xl text-center border border-[#dadce0] border-dashed">
                <p className="text-[#5f6368] text-sm italic">O catálogo de produtos ainda está sendo atualizado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {comercio.produtos.map(p => (
                  <div key={p.id} className="bg-white border border-[#dadce0] p-6 rounded-2xl hover:shadow-md transition-shadow flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="font-medium text-[#202124]">{p.nome}</h3>
                      <p className="text-xs text-[#5f6368]">{p.descricao}</p>
                    </div>
                    <div className="font-medium text-[#1a73e8] text-lg">R$ {p.preco.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8 pt-6 border-t border-[#dadce0]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-medium text-[#202124]">O que as pessoas dizem</h2>
              <Button variant="outline" className="rounded-full border-[#dadce0] text-[#1a73e8]" onClick={() => setIsReviewModalOpen(true)}>Avaliar</Button>
            </div>
            
            {comercio.resumo_avaliacoes && (
               <div className="bg-[#e8f0fe] p-6 rounded-2xl border border-[#d2e3fc]">
                  <p className="text-[#1a73e8] text-sm font-medium flex items-center gap-2 mb-2">
                     <Star className="w-4 h-4 fill-current" /> Resumo das opiniões
                  </p>
                  <p className="text-[#202124] italic">"{comercio.resumo_avaliacoes}"</p>
               </div>
            )}

            <div className="space-y-4">
              {comercio.avaliacoes.length === 0 ? (
                <p className="text-[#5f6368] text-sm italic py-4">Ainda não há avaliações de usuários.</p>
              ) : (
                comercio.avaliacoes.map(a => (
                  <div key={a.id} className="bg-white border border-[#dadce0] p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[#5f6368] text-xs font-medium">U</div>
                        <span className="font-medium text-[#202124] text-sm">Visitante</span>
                      </div>
                      <div className="flex text-[#fbbc04]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < a.nota ? 'fill-current' : 'text-[#dadce0]'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#3c4043] leading-relaxed">{a.comentario}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white border border-[#dadce0] rounded-[32px] p-8 space-y-8 shadow-sm sticky top-28">
            <h3 className="font-medium text-xl text-[#202124]">Sobre o local</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#fef7e0] rounded-full">
                  <Clock className="w-5 h-5 text-[#fbbc04]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-1">Horário</p>
                  <p className="text-sm text-[#202124] font-medium">{comercio.horarioFuncionamento}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#e8f0fe] rounded-full">
                  <MapPin className="w-5 h-5 text-[#1a73e8]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-1">Localização</p>
                  <p className="text-sm text-[#202124] font-normal leading-relaxed">{comercio.localizacao}</p>
                </div>
              </div>

              {comercio.telefone !== 'N/A' && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#e6f4ea] rounded-full">
                    <Phone className="w-5 h-5 text-[#1e8e3e]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-1">Contato</p>
                    <p className="text-sm text-[#202124] font-medium">{comercio.telefone}</p>
                  </div>
                </div>
              )}

              {comercio.redes_sociais && comercio.redes_sociais !== 'N/A' && (
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#fce4ec] rounded-full">
                    <Instagram className="w-5 h-5 text-[#e91e63]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-1">Instagram</p>
                    <p className="text-sm text-[#202124] font-medium">{comercio.redes_sociais}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-60 rounded-2xl overflow-hidden mt-8 border border-[#dadce0]">
              <MapContainer center={[comercio.latitude, comercio.longitude]} zoom={17} className="w-full h-full">
                <MapMarker position={[comercio.latitude, comercio.longitude]} type="comercio" />
              </MapContainer>
            </div>
          </div>
        </div>

      </div>

      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Denunciar local">
        <div className="space-y-6">
          <p className="text-sm text-[#5f6368]">Por que você está denunciando este local?</p>
          <select className="w-full p-3 bg-white border border-[#dadce0] rounded-xl text-sm text-[#202124] focus:ring-1 focus:ring-[#1a73e8] outline-none">
            <option>Informações incorretas</option>
            <option>Local fechado permanentemente</option>
            <option>Local inexistente</option>
            <option>Conteúdo impróprio</option>
          </select>
          <textarea 
            className="w-full p-3 bg-white border border-[#dadce0] rounded-xl text-sm text-[#202124] focus:ring-1 focus:ring-[#1a73e8] outline-none" 
            rows={4} 
            placeholder="Conte-nos mais detalhes..."
          />
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-full" onClick={() => setIsReportModalOpen(false)}>Cancelar</Button>
             <Button className="flex-1 rounded-full" onClick={() => setIsReportModalOpen(false)}>Enviar</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Sua avaliação">
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5f6368]">Qual sua nota para o local?</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map(v => (
                <button 
                  key={v}
                  type="button"
                  onClick={() => setNota(v)}
                  className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                    nota === v 
                      ? 'bg-[#e8f0fe] border-[#1a73e8] text-[#1a73e8]' 
                      : 'bg-white border-[#dadce0] text-[#5f6368] hover:bg-[#f8f9fa]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5f6368]">Escreva seu comentário</label>
            <textarea 
              className="w-full p-4 bg-white border border-[#dadce0] rounded-xl text-sm text-[#202124] focus:ring-1 focus:ring-[#1a73e8] outline-none" 
              rows={4} 
              value={comentario} 
              onChange={e => setComentario(e.target.value)} 
              placeholder="Como foi sua experiência?"
              required
            />
          </div>
          <div className="flex gap-3">
             <Button variant="ghost" className="flex-1 rounded-full" onClick={() => setIsReviewModalOpen(false)}>Cancelar</Button>
             <Button type="submit" className="flex-1 rounded-full">Publicar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
