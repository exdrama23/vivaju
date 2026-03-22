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
    <div className="flex-1 bg-gray-50 min-h-screen pb-24">
      {/* Header Gestão */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Portal de Gestão Urbana</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('geral')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'geral' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('mapa')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'mapa' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Mapa de Calor
            </button>
            <button 
              onClick={() => setActiveTab('denuncias')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'denuncias' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Denúncias
            </button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8">
        {activeTab === 'geral' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total de Comércios</p>
                      <h3 className="text-3xl font-bold mt-1">{totalLojas}</h3>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                      <Store className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-4 flex items-center font-medium">
                    <TrendingUp className="w-3 h-3 mr-1" /> +4 novos este mês
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Fluxo de Pessoas</p>
                      <h3 className="text-3xl font-bold mt-1">12.4k</h3>
                    </div>
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-xs text-red-600 mt-4 flex items-center font-medium">
                    <TrendingDown className="w-3 h-3 mr-1" /> -2% em relação a ontem
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Denúncias Ativas</p>
                      <h3 className="text-3xl font-bold mt-1">{mockDenuncias.length}</h3>
                    </div>
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 font-medium italic">
                    2 urgentes requerem atenção
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Vagas de Estacionamento</p>
                      <h3 className="text-3xl font-bold mt-1">842</h3>
                    </div>
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                      <Car className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-4 font-medium">
                    Ocupação média: 78%
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Gráfico de Vendas (Simulado com CSS) */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Volume de Vendas por Região (Milhares R$)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-4 pt-4 border-b border-l pb-2 pl-2 relative">
                    {/* Grid lines */}
                    <div className="absolute left-0 right-0 top-4 border-t border-gray-100 w-full" />
                    <div className="absolute left-0 right-0 top-1/4 border-t border-gray-100 w-full" />
                    <div className="absolute left-0 right-0 top-2/4 border-t border-gray-100 w-full" />
                    <div className="absolute left-0 right-0 top-3/4 border-t border-gray-100 w-full" />
                    
                    {[
                      { label: 'Centro', val: 80, color: '#3b82f6' },
                      { label: 'Orla', val: 65, color: '#60a5fa' },
                      { label: 'Jardins', val: 95, color: '#2563eb' },
                      { label: 'Mercado', val: 45, color: '#93c5fd' },
                      { label: 'Sul', val: 30, color: '#bfdbfe' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                        <div 
                          className="w-full rounded-t-lg transition-all hover:brightness-90 cursor-help relative"
                          style={{ height: `${bar.val}%`, backgroundColor: bar.color }}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              R$ {bar.val * 5}k
                           </div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Distribuição por Categoria */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Categorias Dominantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { label: 'Alimentação', count: 45, color: 'bg-orange-500' },
                    { label: 'Vestuário', count: 32, color: 'bg-blue-500' },
                    { label: 'Serviços', count: 18, color: 'bg-green-500' },
                    { label: 'Artesanato', count: 12, color: 'bg-purple-500' },
                    { label: 'Outros', count: 8, color: 'bg-gray-400' },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{cat.label}</span>
                        <span className="text-gray-500">{cat.count}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Horários de Pico */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Fluxo de Pedestres por Horário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end gap-1 pt-4 border-b border-l pb-1 pl-1">
                    {[15, 20, 35, 55, 85, 100, 90, 75, 65, 80, 95, 50, 30, 20].map((val, i) => (
                      <div key={i} className="flex-1 group relative">
                        <div 
                          className="w-full bg-purple-500/30 group-hover:bg-purple-500/50 transition-all rounded-t-sm border-t-2 border-purple-600" 
                          style={{ height: `${val}%` }} 
                        />
                        {i % 2 === 0 && (
                          <span className="absolute -bottom-6 left-0 text-[9px] font-bold text-gray-400 whitespace-nowrap">
                            {8 + Math.floor(i/1)}h
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 text-[10px] text-gray-400 font-medium italic text-center uppercase tracking-widest">Sensores de Presença Ativos (Wi-Fi/BT)</p>
                </CardContent>
              </Card>

              {/* Estacionamentos e Vagas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Ocupação em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200" />
                            <circle 
                              cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" 
                              strokeDasharray={251.2} 
                              strokeDashoffset={251.2 * (1 - 0.78)} 
                              className="text-blue-600 transition-all duration-1000" 
                            />
                          </svg>
                          <span className="absolute text-xl font-black">78%</span>
                       </div>
                       <span className="text-[10px] font-bold text-gray-500 mt-3 uppercase tracking-widest">Zona Central</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                       <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-200" />
                            <circle 
                              cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="10" fill="transparent" 
                              strokeDasharray={251.2} 
                              strokeDashoffset={251.2 * (1 - 0.42)} 
                              className="text-emerald-500 transition-all duration-1000" 
                            />
                          </svg>
                          <span className="absolute text-xl font-black">42%</span>
                       </div>
                       <span className="text-[10px] font-bold text-gray-500 mt-3 uppercase tracking-widest">Zona Sul/Orla</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white border rounded-xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Giro Médio</p>
                      <p className="text-sm font-black text-gray-900">2.4h/vaga</p>
                    </div>
                    <div className="p-3 bg-white border rounded-xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">Total Monitorado</p>
                      <p className="text-sm font-black text-gray-900">1,240 vagas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Estacionamentos Críticos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Car className="w-5 h-5 text-red-500" /> Déficit de Estacionamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {zonasFaltaEstacionamento.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                      <span className="text-sm font-medium text-gray-700 flex-1">{item.zona}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase">{item.nivel}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 text-xs">Solicitar Estudo de Viabilidade</Button>
                </CardContent>
              </Card>

              {/* Mini Logs de Denúncia */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Últimas Denúncias</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('denuncias')} className="text-blue-600 text-xs">Ver todas</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {mockDenuncias.slice(0, 3).map((d) => (
                      <div key={d.id} className="p-4 flex items-start justify-between hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="text-sm font-bold text-gray-900">{d.loja}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{d.motivo}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          d.status === 'pendente' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Mapa de Calor e Movimentação</h2>
                <p className="text-gray-500 text-sm">Monitoramento de fluxo de pedestres e veículos em tempo real.</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" /> Crítico
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded-full" /> Alto
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border text-xs">
                  <div className="w-3 h-3 bg-green-500 rounded-full" /> Normal
                </div>
              </div>
            </div>

            <div className="h-[600px] w-full bg-white rounded-3xl overflow-hidden border shadow-inner">
              <MapContainer center={[-10.9105, -37.0503]} zoom={16} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {heatmapPoints.map((point, i) => (
                  <Circle 
                    key={i}
                    center={point.pos}
                    radius={point.intensity / 2}
                    pathOptions={{ 
                      color: point.intensity > 400 ? '#ef4444' : '#f97316', 
                      fillColor: point.intensity > 400 ? '#ef4444' : '#f97316', 
                      fillOpacity: 0.4 
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <p className="font-bold">{point.label}</p>
                        <p className="text-xs">Fluxo estimado: {point.intensity} p/min</p>
                      </div>
                    </Popup>
                  </Circle>
                ))}

                {/* Marcadores de Lojas para visão da prefeitura */}
                {comercios.map(c => (
                  <Marker key={c.id} position={[c.latitude, c.longitude]}>
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold text-sm">{c.nome}</p>
                        <p className="text-xs text-gray-500">Alvará: Ativo</p>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gerenciamento de Denúncias</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Filtrar por loja..." className="pl-10 h-10 rounded-full bg-white" />
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">
                    <tr>
                      <th className="px-6 py-4">Estabelecimento</th>
                      <th className="px-6 py-4">Motivo</th>
                      <th className="px-6 py-4">Data</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockDenuncias.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{d.loja}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{d.motivo}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{d.data}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                            d.status === 'pendente' ? 'bg-orange-100 text-orange-600' : 
                            d.status === 'resolvido' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600">
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
