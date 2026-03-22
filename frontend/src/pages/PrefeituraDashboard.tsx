import { useState, useMemo } from 'react';
import { useData } from '@/context/DataContext';
import { 
  BarChart3, 
  Users, 
  Store, 
  AlertTriangle, 
  Map as MapIcon, 
  TrendingUp, 
  TrendingDown, 
  Car,
  Search,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MapContainer } from '@/components/map/MapContainer';
import { Circle, Polyline, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

// Mock data for Prefeitura
const mockDenuncias = [
  { id: 1, loja: 'Pastelaria Central', motivo: 'Obstrução de calçada', data: '2026-03-22', status: 'pendente' },
  { id: 2, loja: 'Loja do João', motivo: 'Som alto após as 22h', data: '2026-03-21', status: 'resolvido' },
  { id: 3, loja: 'Ambulante Sem Registro', motivo: 'Venda em local proibido', data: '2026-03-20', status: 'em análise' },
  { id: 4, loja: 'Bar da Orla', motivo: 'Falta de licença sanitária', data: '2026-03-19', status: 'pendente' },
];

const topVendas = [
  { nome: 'Supermercado G.Barbosa', vendas: 'R$ 450k', crescimento: '+12%' },
  { nome: 'Farmácia Pague Menos', vendas: 'R$ 280k', crescimento: '+5%' },
  { nome: 'Riachuelo Centro', vendas: 'R$ 210k', crescimento: '-2%' },
];

const zonasFaltaEstacionamento = [
  { zona: 'Calçadão da João Pessoa', nivel: 'Crítico', cor: 'bg-red-500' },
  { zona: 'Praça Fausto Cardoso', nivel: 'Alto', cor: 'bg-orange-500' },
  { zona: 'Mercado Municipal', nivel: 'Médio', cor: 'bg-yellow-500' },
];

// Mock heatmap data (points with intensity)
const heatmapPoints = [
  { pos: [-10.9125, -37.0520] as [number, number], intensity: 500, label: 'Fluxo Crítico' },
  { pos: [-10.9105, -37.0503] as [number, number], intensity: 300, label: 'Fluxo Alto' },
  { pos: [-10.9150, -37.0550] as [number, number], intensity: 100, label: 'Fluxo Normal' },
];

export function PrefeituraDashboard() {
  const { comercios, estacionamentos } = useData();
  const [activeTab, setActiveTab] = useState<'geral' | 'mapa' | 'denuncias'>('geral');

  const totalLojas = comercios.length;
  const lojasAbertas = comercios.filter(c => c.statusAberto).length;

  return (
    <div className="flex-1 bg-gray-50 min-h-screen pb-32 md:pb-8">
      {/* Header Gestão */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4 md:h-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 shrink-0">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-base sm:text-xl font-black text-gray-900 tracking-tight line-clamp-1">Portal de Gestão Urbana</h1>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar whitespace-nowrap scrollbar-hide">
            <button 
              onClick={() => setActiveTab('geral')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold transition-all ${activeTab === 'geral' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('mapa')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold transition-all ${activeTab === 'mapa' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Mapa de Calor
            </button>
            <button 
              onClick={() => setActiveTab('denuncias')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold transition-all ${activeTab === 'denuncias' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Denúncias
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'geral' && (
          <div className="space-y-6 sm:space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Total de Comércios</p>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1">{totalLojas}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                      <Store className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-green-600 mt-4 flex items-center font-bold bg-green-50 w-fit px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3 mr-1" /> +4 novos este mês
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Fluxo de Pessoas</p>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1">12.4k</h3>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-red-600 mt-4 flex items-center font-bold bg-red-50 w-fit px-2 py-1 rounded-lg">
                    <TrendingDown className="w-3 h-3 mr-1" /> -2% vs ontem
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Denúncias Ativas</p>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1">{mockDenuncias.length}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-orange-600 mt-4 font-bold bg-orange-50 w-fit px-2 py-1 rounded-lg">
                    2 urgentes pendentes
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider">Vagas Monitoradas</p>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1">842</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                      <Car className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-emerald-600 mt-4 font-bold bg-emerald-50 w-fit px-2 py-1 rounded-lg">
                    Ocupação: 78%
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Gráfico de Vendas */}
              <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-black tracking-tight">Volume de Vendas por Região</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 pt-8 border-b border-l pb-2 pl-2 relative">
                    {/* Grid lines */}
                    {[25, 50, 75, 100].map(line => (
                      <div key={line} className="absolute left-0 right-0 border-t border-gray-100 w-full" style={{ bottom: `${line}%` }} />
                    ))}
                    
                    {[
                      { label: 'Centro', val: 80, color: '#3b82f6' },
                      { label: 'Orla', val: 65, color: '#60a5fa' },
                      { label: 'Jardins', val: 95, color: '#2563eb' },
                      { label: 'Mercado', val: 45, color: '#93c5fd' },
                      { label: 'Sul', val: 30, color: '#bfdbfe' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                        <div 
                          className="w-full max-w-[40px] rounded-t-lg transition-all hover:brightness-90 cursor-help relative"
                          style={{ height: `${bar.val}%`, backgroundColor: bar.color }}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                              R$ {bar.val * 5}k
                           </div>
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-center">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Distribuição por Categoria */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-black tracking-tight">Categorias Dominantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5">
                  {[
                    { label: 'Alimentação', count: 45, color: 'bg-orange-500' },
                    { label: 'Vestuário', count: 32, color: 'bg-blue-500' },
                    { label: 'Serviços', count: 18, color: 'bg-green-500' },
                    { label: 'Artesanato', count: 12, color: 'bg-purple-500' },
                    { label: 'Outros', count: 8, color: 'bg-gray-400' },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] sm:text-xs font-bold">
                        <span className="text-gray-700">{cat.label}</span>
                        <span className="text-gray-500 bg-gray-50 px-1.5 rounded-md">{cat.count}%</span>
                      </div>
                      <div className="w-full h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`${cat.color} h-full rounded-full transition-all duration-1000`} 
                          style={{ width: `${cat.count}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Horários de Pico */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-black tracking-tight">Fluxo de Pedestres por Horário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 sm:h-48 flex items-end gap-1 pt-4 border-b border-l pb-1 pl-1">
                    {[15, 20, 35, 55, 85, 100, 90, 75, 65, 80, 95, 50, 30, 20].map((val, i) => (
                      <div key={i} className="flex-1 group relative">
                        <div 
                          className="w-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-all rounded-t-sm border-t-2 border-purple-600" 
                          style={{ height: `${val}%` }} 
                        />
                        {i % 3 === 0 && (
                          <span className="absolute -bottom-6 left-0 text-[8px] sm:text-[9px] font-bold text-gray-400 whitespace-nowrap">
                            {8 + i}h
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 text-[9px] sm:text-[10px] text-gray-400 font-bold italic text-center uppercase tracking-widest">Sensores de Presença Ativos (IOT/WIFI)</p>
                </CardContent>
              </Card>

              {/* Estacionamentos e Vagas */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-black tracking-tight">Ocupação em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-3xl border border-gray-100/50">
                       <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200" />
                            <circle 
                              cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" 
                              strokeDasharray={251.2} 
                              strokeDashoffset={251.2 * (1 - 0.78)} 
                              className="text-blue-600 transition-all duration-1000" 
                            />
                          </svg>
                          <span className="absolute text-lg sm:text-xl font-black">78%</span>
                       </div>
                       <span className="text-[9px] sm:text-[10px] font-black text-gray-500 mt-3 uppercase tracking-widest">Centro</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-3xl border border-gray-100/50">
                       <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200" />
                            <circle 
                              cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="10" fill="transparent" 
                              strokeDasharray={251.2} 
                              strokeDashoffset={251.2 * (1 - 0.42)} 
                              className="text-emerald-500 transition-all duration-1000" 
                            />
                          </svg>
                          <span className="absolute text-lg sm:text-xl font-black">42%</span>
                       </div>
                       <span className="text-[9px] sm:text-[10px] font-black text-gray-500 mt-3 uppercase tracking-widest">Sul/Orla</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-3 bg-white border rounded-2xl">
                      <p className="text-[9px] text-gray-400 font-black uppercase">Giro Médio</p>
                      <p className="text-xs sm:text-sm font-black text-gray-900">2.4h/vaga</p>
                    </div>
                    <div className="p-3 bg-white border rounded-2xl">
                      <p className="text-[9px] text-gray-400 font-black uppercase">Monitorado</p>
                      <p className="text-xs sm:text-sm font-black text-gray-900">1,240 vgs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Estacionamentos Críticos */}
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg font-black flex items-center gap-2">
                    <Car className="w-5 h-5 text-red-500" /> Déficit de Estacionamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {zonasFaltaEstacionamento.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className={`w-3 h-3 rounded-full ${item.cor} shadow-sm`} />
                      <span className="text-xs sm:text-sm font-bold text-gray-700 flex-1">{item.zona}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase bg-white px-2 py-0.5 rounded-md border">{item.nivel}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 text-[10px] font-black uppercase tracking-widest h-10">Solicitar Estudo de Viabilidade</Button>
                </CardContent>
              </Card>

              {/* Mini Logs de Denúncia */}
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base sm:text-lg font-black">Últimas Denúncias</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('denuncias')} className="text-blue-600 text-xs font-bold">Ver todas</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-50 px-2">
                    {mockDenuncias.slice(0, 3).map((d) => (
                      <div key={d.id} className="p-4 flex items-start justify-between hover:bg-gray-50 transition-colors rounded-xl">
                        <div className="space-y-1">
                          <p className="text-sm font-black text-gray-900">{d.loja}</p>
                          <p className="text-xs text-gray-500 font-medium line-clamp-1">{d.motivo}</p>
                        </div>
                        <span className={`text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-tighter ${
                          d.status === 'pendente' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'mapa' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Mapa de Calor e Movimentação</h2>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">Fluxo de pedestres e veículos em tempo real.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Crítico', color: 'bg-red-500', pulse: true },
                  { label: 'Alto', color: 'bg-orange-500', pulse: false },
                  { label: 'Normal', color: 'bg-green-500', pulse: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm text-[10px] font-black uppercase">
                    <div className={`w-2 h-2 ${item.color} rounded-full ${item.pulse ? 'animate-pulse' : ''}`} /> {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[400px] sm:h-[600px] w-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg relative">
              <MapContainer center={[-10.9105, -37.0503]} zoom={15} className="w-full h-full z-0">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {heatmapPoints.map((point, i) => (
                  <Circle 
                    key={i}
                    center={point.pos}
                    radius={point.intensity / 1.5}
                    pathOptions={{ 
                      color: point.intensity > 400 ? '#ef4444' : '#f97316', 
                      fillColor: point.intensity > 400 ? '#ef4444' : '#f97316', 
                      fillOpacity: 0.4 
                    }}
                  >
                    <Popup>
                      <div className="p-2 font-bold">
                        <p className="text-sm">{point.label}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Fluxo: {point.intensity} p/min</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}

                {comercios.map(c => (
                  <Marker key={c.id} position={[c.latitude, c.longitude]}>
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold text-sm">{c.nome}</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Alvará: Ativo</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}

        {activeTab === 'denuncias' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Gerenciamento de Denúncias</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar por estabelecimento..." className="pl-10 h-10 sm:h-11 rounded-xl bg-white border-none shadow-sm text-sm" />
              </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b">
                    <tr>
                      <th className="px-6 py-4">Estabelecimento</th>
                      <th className="px-6 py-4 hidden sm:table-cell">Motivo</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {mockDenuncias.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-black text-gray-900">{d.loja}</p>
                          <p className="text-[10px] text-gray-400 sm:hidden mt-1">{d.motivo}</p>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <p className="text-sm text-gray-600 font-medium">{d.motivo}</p>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{d.data}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-tighter ${
                            d.status === 'pendente' ? 'bg-orange-50 text-orange-600' : 
                            d.status === 'resolvido' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
