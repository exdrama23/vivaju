import { useState, useMemo } from 'react';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { MapFilters } from '@/components/map/MapFilters';
import { MapPopup } from '@/components/map/MapPopup';
import { LocationDetailModal } from '@/components/map/LocationDetailModal';
import { useData } from '@/context/DataContext';
import { LocateFixed, ShoppingBag, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Comercio } from '@/types';

export function Mapa() {
  const { comercios, estacionamentos } = useData();
  
  const [filters, setFilters] = useState({
    comercios: true,
    eventos: true,
    estacionamentos: true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          alert("Não foi possível obter sua localização.");
        }
      );
    }
  };

  const handleTraceRoute = async (destLat: number, destLng: number) => {
    if (!userLocation) {
      alert("Ative seu GPS para traçar a rota.");
      handleGetLocation();
      return;
    }
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${destLng},${destLat}?overview=full&geometries=geojson`
      );
      const data = await response.json() as { routes?: Array<{ geometry: { coordinates: [number, number][] } }> };
      if (data.routes?.[0]) {
        setRouteCoords(data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userIcon = L.divIcon({
    className: 'user-location-icon',
    html: `<div style="background-color: #1a73e8; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(26, 115, 232, 0.5); animation: pulse 2s infinite;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="flex flex-col md:flex-row flex-1 w-full h-full relative overflow-hidden bg-white">
      {/* Sidebar - Local Data Only */}
      <div className="w-full md:w-[360px] bg-white z-10 flex flex-col p-6 gap-6 md:h-full shrink-0 overflow-y-auto border-r border-[#dadce0]">
        <div className="space-y-1">
          <h1 className="text-xl font-medium flex items-center gap-2 text-[#202124]">
            <ShoppingBag className="text-[#1a73e8] w-5 h-5" /> VivaJu Centro
          </h1>
          <p className="text-xs text-[#5f6368]">Locais exatos e atualizados</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6368]" />
          <Input
            placeholder="Buscar lojas..."
            className="pl-10 h-12 bg-white border-[#dadce0] rounded-full text-sm placeholder:text-[#5f6368] focus-visible:ring-1 focus-visible:ring-[#1a73e8] focus-visible:border-transparent shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button onClick={handleGetLocation} variant="outline" className="w-full rounded-full text-xs h-10 border-[#dadce0]">
          <LocateFixed className="w-4 h-4 mr-2" /> Onde Estou
        </Button>

        <div className="flex-1 overflow-y-auto space-y-4">
          <p className="text-xs font-medium text-[#5f6368] uppercase tracking-wider pl-1">Lista de Estabelecimentos</p>
          {filteredComercios.length === 0 && (
            <p className="text-sm text-[#5f6368] text-center py-10 italic">Nenhuma loja encontrada.</p>
          )}
          {filteredComercios.map(c => (
            <div 
              key={c.id} 
              onClick={() => handleOpenDetails(c.id)}
              className="p-4 bg-white border border-[#dadce0] rounded-2xl hover:bg-[#f8f9fa] cursor-pointer transition-all group"
            >
              <h3 className="font-medium text-sm text-[#202124] group-hover:text-[#1a73e8] transition-colors">{c.nome}</h3>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-[11px] text-[#5f6368] capitalize truncate">{c.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative bg-[#f1f3f4]">
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
