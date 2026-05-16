import React from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Navigation, 
  Instagram, 
  MessageSquare, 
  ExternalLink,
  X
} from 'lucide-react';
import type { ComercioExtendido } from '@/services/mockData';

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

// Componente reutilizável para as linhas de informação
const InfoRow = ({ icon: Icon, children, isLink = false }: { icon: any, children: React.ReactNode, isLink?: boolean }) => (
  <div className="flex items-start gap-4 py-3 min-h-[48px] border-b border-[#e8eaed] last:border-0 hover:bg-[#f8f9fa] transition-colors px-1 cursor-default">
    <div className="mt-0.5">
      <Icon className={`w-5 h-5 ${isLink ? 'text-[#1a73e8]' : 'text-[#5f6368]'}`} />
    </div>
    <div className="flex-1 text-sm text-[#3c4043] leading-relaxed">
      {children}
    </div>
  </div>
);

export function LocationDetailModal({ 
  loja, endereco, fotoUrl, isOpen, onClose, rating, websiteUri 
}: LocationDetailModalProps) {
  if (!loja || !isOpen) return null;

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${loja.latitude},${loja.longitude}`, '_blank');
  };

  const currentRating = loja.rating || rating;

  return (
    // Overlay do Modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-0">
      
      {/* Container Principal do Modal (Estilo Card do Maps) */}
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Botão Fechar flutuante */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#3c4043] hover:bg-white transition-colors shadow-sm cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header: Imagem (Sangrando nas bordas) */}
        <div className="w-full h-56 bg-[#f1f3f4] relative shrink-0">
          <img 
            src={fotoUrl || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'} 
            alt={`Vista de ${loja.nome}`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Corpo rolável */}
        <div className="flex-1 overflow-y-auto pb-6">
          
          {/* Título e Avaliação */}
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-2xl font-medium text-[#202124] mb-1">{loja.nome}</h2>
            
            {currentRating && (
              <div className="flex items-center gap-1.5 text-sm text-[#5f6368]">
                <span className="font-medium text-[#3c4043]">{currentRating}</span>
                <div className="flex text-[#fbbc04]">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                {loja.resumo_avaliacoes && (
                  <>
                    <span className="mx-1 text-[#bdc1c6]">•</span>
                    <span className="truncate">{loja.resumo_avaliacoes}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Ações Rápidas (Pills estilo Google Maps) */}
          <div className="flex items-center gap-2 px-5 py-2 overflow-x-auto no-scrollbar border-b border-[#e8eaed]">
            <button 
              onClick={handleOpenGoogleMaps}
              className="flex items-center gap-2 bg-[#1a73e8] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1557b0] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Navigation className="w-4 h-4 fill-current" />
              Rotas
            </button>
            
            {websiteUri && (
              <a 
                href={websiteUri}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 border border-[#dadce0] text-[#1a73e8] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                Site
              </a>
            )}

            {loja.telefoneContato && loja.telefoneContato !== 'N/A' && (
              <a 
                href={`tel:${loja.telefoneContato}`}
                className="flex items-center gap-2 border border-[#dadce0] text-[#1a73e8] px-5 py-2 rounded-full text-sm font-medium hover:bg-[#f8f9fa] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                Ligar
              </a>
            )}
          </div>

          {/* Lista de Informações */}
          <div className="px-4 py-2 flex flex-col">
            
            <InfoRow icon={MapPin}>
              {loja.localizacao || endereco}
            </InfoRow>

            <InfoRow icon={Clock}>
              <span className="text-[#1e8e3e] font-medium mr-1">Horário:</span> 
              {loja.horarioFuncionamento}
            </InfoRow>

            {loja.telefoneContato && loja.telefoneContato !== 'N/A' && (
              <InfoRow icon={Phone}>
                {loja.telefoneContato}
              </InfoRow>
            )}

            {loja.redes_sociais && loja.redes_sociais !== 'N/A' && (
              <InfoRow icon={Instagram}>
                {loja.redes_sociais}
              </InfoRow>
            )}

            {loja.resumo_avaliacoes && (
              <InfoRow icon={MessageSquare}>
                <span className="italic text-[#5f6368]">"{loja.resumo_avaliacoes}"</span>
              </InfoRow>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
