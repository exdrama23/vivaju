import { useState, useMemo } from 'react';
import { Landmark, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockPontosTuristicos } from '@/services/mockData';

export function PontosTuristicos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<typeof mockPontosTuristicos[0] | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const openDetail = (pt: typeof mockPontosTuristicos[0]) => {
    setSelectedPoint(pt);
    // allow mount then animate
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => setPanelOpen(true));
  };

  const closeDetail = () => {
    setPanelOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedPoint(null), 350);
  };

  const categories = useMemo(() => {
    return ['Tudo', ...Array.from(new Set(mockPontosTuristicos.map(pt => pt.categoria)))];
  }, []);

  const filteredPoints = useMemo(() => {
    return mockPontosTuristicos.filter(pt => {
      const matchesSearch = pt.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pt.descricao.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Tudo' || pt.categoria === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl md:pb-0 pb-24">
      <div className="flex flex-col space-y-4 mb-8 md:mb-12">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">Pontos Turísticos</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">Descubra a história e a cultura no coração de Aracaju.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Buscar museus, praças, monumentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-500 hover:text-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredPoints.map((pt) => (
          <div key={pt.id} onClick={() => openDetail(pt)} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
            <div className="relative h-64 overflow-hidden">
              <img
                src={pt.imagem}
                alt={pt.nome}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-blue-600">
                {pt.categoria}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {pt.nome}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                {pt.descricao}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-medium">Centro Histórico</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('/mapa', { state: { lat: pt.latitude, lng: pt.longitude, id: pt.id } }); }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Ver no mapa
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Detail panel */}
        {selectedPoint && (
          <div className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-8`}>
            <div className={`absolute inset-0 bg-black/40 transition-opacity ${panelOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeDetail} />
            <div className={`relative w-full max-w-3xl h-full sm:h-auto bg-white rounded-2xl shadow-2xl overflow-auto transform transition-all duration-300 ${panelOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <button onClick={closeDetail} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold">{selectedPoint.nome}</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-64 sm:h-full overflow-hidden rounded-xl">
                  <img src={selectedPoint.imagem} alt={selectedPoint.nome} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{selectedPoint.categoria}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedPoint.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Localização</div>
                      <div className="text-xs">{selectedPoint.latitude.toFixed(6)}, {selectedPoint.longitude.toFixed(6)}</div>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button onClick={() => navigate('/mapa', { state: { lat: selectedPoint.latitude, lng: selectedPoint.longitude, id: selectedPoint.id } })} className="flex-1 bg-amber-700 hover:bg-amber-600 text-white py-3 rounded-lg cursor-pointer">Ver no mapa</button>
                    <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPoint.latitude},${selectedPoint.longitude}`} className="flex-1">
                      <button className="w-full border border-gray-200 py-3 rounded-lg cursor-pointer">Abrir no Maps</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {filteredPoints.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Nenhum ponto encontrado</h3>
          <p className="text-gray-500 mt-2">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  );
}
