import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { ComercioExtendido } from '@/services/mockData';
import { MapPin, Phone, Clock, Star, Navigation, ExternalLink, Globe, Instagram, MessageSquare } from 'lucide-react';

interface LocationDetailModalProps {
  loja: ComercioExtendido | null;
  endereco: string;
  fotoUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
}

export function LocationDetailModal({ 
  loja, endereco, fotoUrl, isOpen, onClose, rating, websiteUri 
}: LocationDetailModalProps) {
  if (!loja) return null;

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${loja.latitude},${loja.longitude}`, '_blank');
  };

  const currentRating = loja.rating || rating;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={loja.nome}>
      <div className="space-y-6">
        {/* Foto */}
        <div className="w-full h-52 bg-[#f1f3f4] rounded-2xl overflow-hidden relative group border border-[#dadce0]">
          <img 
            src={fotoUrl || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80'} 
            alt="Vista da loja" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Avaliação */}
        {currentRating && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-[#fef7e0] p-3 rounded-xl border border-[#feefc3]">
              <Star className="w-4 h-4 text-[#fbbc04] fill-current" />
              <span className="font-medium text-[#202124]">{currentRating}</span>
              <span className="text-xs text-[#5f6368]">Avaliação média</span>
            </div>
            {loja.resumo_avaliacoes && (
              <div className="flex items-start gap-2 px-1">
                <MessageSquare className="w-4 h-4 text-[#5f6368] mt-0.5" />
                <p className="text-xs text-[#5f6368] italic">"{loja.resumo_avaliacoes}"</p>
              </div>
            )}
          </div>
        )}

        {/* Informações */}
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#e8f0fe] rounded-full">
              <MapPin className="w-5 h-5 text-[#1a73e8]" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-0.5">Endereço</p>
              <p className="text-sm text-[#202124] font-normal leading-relaxed">{loja.localizacao || endereco}</p>
            </div>
          </div>

          {loja.telefone && loja.telefone !== 'N/A' && (
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#e6f4ea] rounded-full">
                <Phone className="w-5 h-5 text-[#1e8e3e]" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-0.5">Telefone</p>
                <p className="text-sm text-[#202124]">{loja.telefone}</p>
              </div>
            </div>
          )}

          {(loja.redes_sociais && loja.redes_sociais !== 'N/A') && (
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#fce4ec] rounded-full">
                <Instagram className="w-5 h-5 text-[#e91e63]" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-0.5">Redes Sociais</p>
                <p className="text-sm text-[#202124]">{loja.redes_sociais}</p>
              </div>
            </div>
          )}

          {websiteUri && (
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#f3e5f5] rounded-full">
                <Globe className="w-5 h-5 text-[#9c27b0]" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-0.5">Site</p>
                <a href={websiteUri} target="_blank" rel="noreferrer" className="text-sm text-[#1a73e8] hover:underline flex items-center gap-1">
                  Visitar site oficial <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#fef7e0] rounded-full">
              <Clock className="w-5 h-5 text-[#fbbc04]" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#5f6368] uppercase tracking-wider mb-0.5">Funcionamento</p>
              <p className="text-sm font-medium text-[#202124]">
                {loja.horarioFuncionamento}
              </p>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handleOpenGoogleMaps}
            className="w-full rounded-full h-12 flex items-center justify-center gap-2 shadow-sm"
          >
            <Navigation className="w-4 h-4" /> Traçar rota
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="w-full h-10 rounded-full"
          >
            Voltar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
