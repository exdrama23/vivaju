import { Popup } from 'react-leaflet';
import { Button } from '@/components/ui/Button';
import { Eye, Navigation, MapPin } from 'lucide-react';

interface MapPopupProps {
  title: string;
  description?: string;
  imageUrl?: string;
  type: 'comercio' | 'evento' | 'estacionamento';
  lat: number;
  lng: number;
  onTraceRoute?: (lat: number, lng: number) => void;
  onOpenDetails?: () => void;
}

export function MapPopup({ title, description, imageUrl, lat, lng, onTraceRoute, onOpenDetails }: MapPopupProps) {
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;

  return (
    <Popup className="google-clean-popup">
      <div className="w-64 bg-white rounded-2xl overflow-hidden shadow-sm">
        {imageUrl && (
          <div className="relative h-28 w-full overflow-hidden">
             <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/5" />
          </div>
        )}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-medium text-[#202124] text-[15px] leading-tight mb-1">{title}</h3>
            {description && (
              <p className="text-[11px] text-[#5f6368] font-normal flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={onOpenDetails}
                className="flex-1 h-9 text-xs rounded-full shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 mr-1" /> Detalhes
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onTraceRoute?.(lat, lng)}
                className="flex-1 h-9 text-xs rounded-full border-[#dadce0] text-[#1a73e8] hover:bg-[#e8f0fe] hover:border-transparent"
              >
                <Navigation className="w-3.5 h-3.5 mr-1" /> Rota
              </Button>
            </div>

            <a href={streetViewUrl} target="_blank" rel="noreferrer" className="w-full">
              <Button variant="ghost" size="sm" className="w-full h-8 text-[10px] text-[#5f6368] hover:bg-[#f1f3f4] rounded-full">
                Street View
              </Button>
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 1rem;
        }
        .leaflet-popup-content {
          margin: 0;
          width: 256px !important;
        }
        .leaflet-popup-tip-container {
          display: none;
        }
      `}</style>
    </Popup>
  );
}
