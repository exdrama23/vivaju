import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { MapFilters } from '@/components/map/MapFilters';
import { MapPopup } from '@/components/map/MapPopup';
import { LocationDetailModal } from '@/components/map/LocationDetailModal';
import { useData } from '@/context/DataContext';
import { LocateFixed, ShoppingBag, Search, Map, Menu } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Comercio } from '@/types';

export function Mapa() {
  const { comercios, estacionamentos } = useData();
  
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState({
    comercios: true,
    eventos: true,
    estacionamentos: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  
  // Modal states
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationModalConfig, setLocationModalConfig] = useState({
    title: '',
    message: '',
    showButton: false
  });

  const defaultCenter = useMemo(() => [-10.910501, -37.050332] as [number, number], []);

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredComercios = useMemo(() => 
    comercios.filter(c => 
      c.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    ), [comercios, searchQuery]);

  const filteredParkings = useMemo(() => 
    estacionamentos.filter(e => 
      e.nome.toLowerCase().includes(searchQuery.toLowerCase())
    ), [estacionamentos, searchQuery]);

  const [selectedComercio, setSelectedComercio] = useState<Comercio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (id: string) => {
    const item = comercios.find(c => c.id === id);
    if (item) {
      setSelectedComercio(item);
      setIsModalOpen(true);
    }
  };

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationModalConfig({
        title: 'Geolocalização não suportada',
        message: 'Seu navegador não suporta geolocalização.',
        showButton: false
      });
      setIsLocationModalOpen(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        let message = 'Não foi possível obter sua localização.';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Você negou a permissão de localização. Ative-a nas configurações do seu navegador para usar esta função.';
        }
        setLocationModalConfig({
          title: 'Erro de Localização',
          message,
          showButton: false
        });
        setIsLocationModalOpen(true);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Monitorar localização em tempo real se o usuário já permitiu
  useEffect(() => {
    let watchId: number;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Erro no watchPosition:", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const traceRoute = useCallback(async (start: [number, number], end: [number, number], signal?: AbortSignal) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
      const res = await fetch(url, { signal });
      const data = await res.json() as { routes?: Array<{ geometry: { coordinates: [number, number][] } }> };
      if (data.routes?.[0] && isMountedRef.current) {
        setRouteCoords(data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]));
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Erro ao traçar rota:", e);
      }
    }
  }, []);

  const handleTraceRoute = useCallback((destLat: number, destLng: number) => {
    if (!userLocation) {
      setLocationModalConfig({
        title: 'Ative seu GPS',
        message: 'Precisamos da sua localização para traçar a rota até o destino.',
        showButton: true
      });
      setIsLocationModalOpen(true);
      return;
    }
    const controller = new AbortController();
    void traceRoute(userLocation, [destLat, destLng], controller.signal);
  }, [userLocation, traceRoute]);

  const userIcon = L.divIcon({
    className: 'user-location-icon',
    html: `<div style="background-color: #1a73e8; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(26, 115, 232, 0.5); animation: pulse 2s infinite;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full h-full relative overflow-hidden bg-white">
      {/* Modais de Localização */}
      <Modal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)}
        title={locationModalConfig.title}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{locationModalConfig.message}</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsLocationModalOpen(false)}>Fechar</Button>
            {locationModalConfig.showButton && (
              <Button onClick={() => { setIsLocationModalOpen(false); handleGetLocation(); }}>
                Ativar GPS
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Toggle Button - Mobile Only */}
      <div className={`md:hidden absolute top-4 z-20 flex gap-2 transition-all ${showMap ? 'left-1/2 -translate-x-1/2' : 'right-4'}`}>
        <button
          onClick={() => setShowMap(false)}
          className={`p-2.5 rounded-xl transition-all ${!showMap ? 'bg-[#1a73e8] text-white shadow-lg' : 'bg-white text-[#5f6368] border border-[#dadce0] shadow-sm'}`}
          title="Ver menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowMap(true)}
          className={`p-2.5 rounded-xl transition-all ${showMap ? 'bg-[#1a73e8] text-white shadow-lg' : 'bg-white text-[#5f6368] border border-[#dadce0] shadow-sm'}`}
          title="Ver mapa"
        >
          <Map className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar - Local Data Only */}
      <div className={`w-full md:w-80 lg:w-90 bg-white z-10 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 md:h-full shrink-0 overflow-y-auto border-r border-[#dadce0] transition-all md:pb-0 pb-24 ${showMap ? 'hidden md:flex' : 'flex md:flex'}`}>
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-medium flex items-center gap-2 text-[#202124]">
            <ShoppingBag className="text-[#1a73e8] w-5 h-5" /> VivaJu Centro
          </h1>
          <p className="text-[10px] sm:text-xs text-[#5f6368]">Locais exatos e atualizados</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6368]" />
          <Input
            placeholder="Buscar lojas..."
            className="pl-10 h-10 sm:h-12 bg-white border-[#dadce0] rounded-full text-xs sm:text-sm placeholder:text-[#5f6368] focus-visible:ring-1 focus-visible:ring-[#1a73e8] focus-visible:border-transparent shadow-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button onClick={handleGetLocation} variant="outline" className="w-full rounded-full text-[10px] sm:text-xs h-9 sm:h-10 border-[#dadce0]">
          <LocateFixed className="w-4 h-4 mr-2" /> Onde Estou
        </Button>

        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
          <p className="text-[10px] font-medium text-[#5f6368] uppercase tracking-wider pl-1">Lista de Estabelecimentos</p>
          {filteredComercios.length === 0 && (
            <p className="text-sm text-[#5f6368] text-center py-10 italic">Nenhuma loja encontrada.</p>
          )}
          {filteredComercios.map(c => (
            <div 
              key={c.id} 
              onClick={() => handleOpenDetails(c.id)}
              className="p-3 sm:p-4 bg-white border border-[#dadce0] rounded-xl sm:rounded-2xl hover:bg-[#f8f9fa] cursor-pointer transition-all group"
            >
              <h3 className="font-medium text-xs sm:text-sm text-[#202124] group-hover:text-[#1a73e8] transition-colors line-clamp-1">{c.nome}</h3>
              <div className="flex items-center gap-2 mt-1 sm:mt-2">
                <p className="text-[10px] sm:text-[11px] text-[#5f6368] capitalize truncate">{c.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex-1 relative bg-[#f1f3f4] transition-all ${showMap ? 'flex md:flex' : 'hidden md:flex'}`}>
        <MapFilters activeFilters={filters} onFilterChange={handleFilterChange} />
        <MapContainer center={defaultCenter} zoom={18} className="w-full h-full">
          {routeCoords.length > 0 && (
            <Polyline positions={routeCoords} pathOptions={{ color: '#1a73e8', weight: 4, dashArray: '1, 10' }} />
          )}

          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Você está aqui</Popup>
            </Marker>
          )}

          {/* Renderização dos Marcadores Locais */}
          {filters.comercios && filteredComercios.map(c => (
            <MapMarker 
              key={c.id} 
              position={[c.latitude, c.longitude]} 
              type="comercio"
              onClick={() => handleOpenDetails(c.id)}
            >
              <MapPopup
                title={c.nome}
                description={c.categoria}
                imageUrl={c.imagem}
                type="comercio"
                lat={c.latitude}
                lng={c.longitude}
                onTraceRoute={handleTraceRoute}
                onOpenDetails={() => handleOpenDetails(c.id)}
              />
            </MapMarker>
          ))}

          {/* Renderização dos Estacionamentos Locais */}
          {filters.estacionamentos && filteredParkings.map(e => (
            <MapMarker 
              key={e.id} 
              position={[e.latitude, e.longitude]} 
              type="estacionamento"
              onClick={() => {}}
            >
              <MapPopup
                title={e.nome}
                description="Estacionamento"
                type="estacionamento"
                lat={e.latitude}
                lng={e.longitude}
                onTraceRoute={handleTraceRoute}
                onOpenDetails={() => {}}
              />
            </MapMarker>
          ))}
        </MapContainer>

        <LocationDetailModal
          loja={selectedComercio}
          endereco={selectedComercio?.email || ''} // Using email placeholder for address in mock
          fotoUrl={selectedComercio?.imagem || null}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          rating={4.5}
          userRatingCount={100}
        />
      </div>
    </div>
  );
}

