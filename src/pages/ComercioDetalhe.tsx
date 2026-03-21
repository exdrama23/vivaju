import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Phone, Star, MessageCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export function ComercioDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { comercios, addAvaliacao } = useData();
  const comercio = comercios.find(c => c.id === id);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');

  if (!comercio) {
    return <div className="p-8 text-center">Comércio não encontrado.</div>;
  }

  const mediaAvaliacoes = comercio.avaliacoes.length
    ? comercio.avaliacoes.reduce((acc, curr) => acc + curr.nota, 0) / comercio.avaliacoes.length
    : 0;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAvaliacao({
      id: Math.random().toString(36).substr(2, 9),
      usuarioId: 'u-anon', // Mocked user
      comercioId: comercio.id,
      nota,
      comentario,
      data: new Date().toISOString()
    });
    setIsReviewModalOpen(false);
    setComentario('');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <img src={comercio.imagem} alt={comercio.nome} className="w-full h-64 md:h-96 object-cover rounded-2xl" />
          
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{comercio.nome}</h1>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full font-bold">
                <Star className="w-4 h-4 fill-current" />
                {mediaAvaliacoes > 0 ? mediaAvaliacoes.toFixed(1) : 'Novo'}
              </div>
            </div>
            <p className="text-gray-500 mt-1">{comercio.categoria}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {comercio.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          </div>

          <div className="flex gap-4">
            <a href={`https://wa.me/55${comercio.telefone}`} target="_blank" rel="noreferrer" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </Button>
            </a>
            <Button variant="outline" onClick={() => setIsReportModalOpen(true)} className="px-3 text-gray-500 hover:text-red-600 hover:bg-red-50">
              <AlertTriangle className="w-5 h-5" />
            </Button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Produtos</h2>
            {comercio.produtos.length === 0 ? (
              <p className="text-gray-500">Nenhum produto cadastrado.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {comercio.produtos.map(p => (
                  <div key={p.id} className="border p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{p.nome}</h3>
                      <p className="text-xs text-gray-500">{p.descricao}</p>
                    </div>
                    <div className="font-bold text-blue-600">R$ {p.preco.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Avaliações ({comercio.avaliacoes.length})</h2>
              <Button size="sm" variant="outline" onClick={() => setIsReviewModalOpen(true)}>Avaliar</Button>
            </div>
            <div className="space-y-4">
              {comercio.avaliacoes.map(a => (
                <div key={a.id} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Usuário</span>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < a.nota ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{a.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Informações</h3>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Horário</p>
                <p>{comercio.horarioFuncionamento}</p>
                <p className={`mt-1 font-medium ${comercio.statusAberto ? 'text-green-600' : 'text-red-600'}`}>
                  {comercio.statusAberto ? 'Aberto agora' : 'Fechado'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Phone className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Contato</p>
                <p>{comercio.telefone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Localização</p>
                <p>Centro Urbano</p>
              </div>
            </div>
            <div className="h-48 rounded-xl overflow-hidden mt-4">
              <MapContainer center={[comercio.latitude, comercio.longitude]} zoom={16}>
                <MapMarker position={[comercio.latitude, comercio.longitude]} type="comercio" />
              </MapContainer>
            </div>
          </div>
        </div>

      </div>

      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Denunciar Comércio">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Por que você está denunciando este local?</p>
          <select className="w-full p-2 border rounded-md">
            <option>Informações incorretas</option>
            <option>Local inexistente</option>
            <option>Conteúdo ofensivo</option>
          </select>
          <textarea className="w-full p-2 border rounded-md" rows={3} placeholder="Detalhes (opcional)..."></textarea>
          <Button className="w-full" onClick={() => setIsReportModalOpen(false)}>Enviar Denúncia</Button>
        </div>
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} title="Avaliar Comércio">
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nota (1 a 5)</label>
            <Input type="number" min={1} max={5} value={nota} onChange={e => setNota(Number(e.target.value))} required />
          </div>
          <div>
            <label className="block text-sm mb-1">Comentário</label>
            <textarea 
              className="w-full p-2 border rounded-md text-sm" 
              rows={3} 
              value={comentario} 
              onChange={e => setComentario(e.target.value)} 
              required
            />
          </div>
          <Button type="submit" className="w-full">Salvar Avaliação</Button>
        </form>
      </Modal>
    </div>
  );
}