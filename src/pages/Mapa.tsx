import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { MapContainer } from '@/components/map/MapContainer';
import { MapMarker } from '@/components/map/MapMarker';
import { MapFilters } from '@/components/map/MapFilters';
import { MapPopup } from '@/components/map/MapPopup';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export function Mapa() {
  const { comercios, eventos, estacionamentos } = useData();
  const [filters, setFilters] = useState({
    comercios: true,
    eventos: true,
    estacionamentos: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredComercios = comercios.filter(c =>
    filters.comercios && c.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredEventos = eventos.filter(e =>
    filters.eventos && e.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredEstacionamentos = estacionamentos.filter(est =>
    filters.estacionamentos && est.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row flex-1 h-[calc(100vh-3.5rem)] relative">
      {/* Sidebar for Desktop / Top overlay for mobile */}
      <div className="w-full md:w-80 bg-white shadow-lg z-10 flex flex-col p-4 gap-4 md:h-full shrink-0">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="text-blue-600" /> Explorar
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar locais..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto flex-1 hidden md:flex flex-col gap-3 mt-4">
          <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Resultados</h2>
          {filteredComercios.map(c => (
            <div key={c.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium text-sm">{c.nome}</h3>
              <p className="text-xs text-gray-500">{c.categoria}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-[50vh] md:h-full">
        <MapFilters activeFilters={filters} onFilterChange={handleFilterChange} />
        <MapContainer center={[-23.55052, -46.633309]} zoom={15}>
          {filteredComercios.map(c => (
            <MapMarker key={`com-${c.id}`} position={[c.latitude, c.longitude]} type="comercio">
              <MapPopup
                title={c.nome}
                description={c.categoria}
                imageUrl={c.imagem}
                linkTo={`/comercios/${c.id}`}
                type="comercio"
              />
            </MapMarker>
          ))}
          {filteredEventos.map(e => (
            <MapMarker key={`ev-${e.id}`} position={[e.latitude, e.longitude]} type="evento">
              <MapPopup
                title={e.nome}
                description={e.descricao}
                imageUrl={e.imagem}
                type="evento"
              />
            </MapMarker>
          ))}
          {filteredEstacionamentos.map(est => (
            <MapMarker key={`est-${est.id}`} position={[est.latitude, est.longitude]} type="estacionamento">
              <MapPopup
                title={est.nome}
                description={`Vagas: ${est.numeroVagas - est.vagasOcupadas} livres`}
                type="estacionamento"
              />
            </MapMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}