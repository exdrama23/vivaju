import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { 
  BarChart3, 
  Users, 
  Store, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Car,
  Search,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Bell,
  LogOut,
  MapPinned,
  Info,
  Clock,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Global/Card';
import { MapContainer } from '@/components/Global/MapContainer';
import { Circle, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/Global/Button';
import { Link } from 'react-router-dom';

const mockDenuncias = [
  { id: 1, loja: 'Pastelaria Central', motivo: 'Obstrução de calçada', data: '22 Mar, 2026', status: 'pendente' },
  { id: 2, loja: 'Loja do João', motivo: 'Som alto após as 22h', data: '21 Mar, 2026', status: 'resolvido' },
  { id: 3, loja: 'Ambulante Sem Registro', motivo: 'Venda em local proibido', data: '20 Mar, 2026', status: 'em análise' },
  { id: 4, loja: 'Bar da Orla', motivo: 'Falta de licença sanitária', data: '19 Mar, 2026', status: 'pendente' },
];

const heatmapPoints = [
  { pos: [-10.9125, -37.0520] as [number, number], intensity: 500, label: 'Fluxo Crítico' },
  { pos: [-10.9105, -37.0503] as [number, number], intensity: 300, label: 'Fluxo Alto' },
  { pos: [-10.9150, -37.0550] as [number, number], intensity: 100, label: 'Fluxo Normal' },
];

export function PrefeituraDashboard() {
  const { comercios } = useData();
  const [activeTab, setActiveTab] = useState<'geral' | 'mapa' | 'denuncias'>('geral');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const totalLojas = comercios.length;

  const NavButtons = ({ isMobile = false }) => (
    <>
      <button 
        onClick={() => { setActiveTab('geral'); if(isMobile) setMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
          activeTab === 'geral' 
          ? 'bg-white shadow-xl text-[var(--secondary)]' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        } ${sidebarCollapsed && !isMobile ? 'justify-center px-0' : ''}`}
        title="Dashboard"
      >
        <LayoutDashboard className="w-5 h-5 shrink-0" />
        {(!sidebarCollapsed || isMobile) && <span className="truncate">Dashboard</span>}
      </button>
      <button 
        onClick={() => { setActiveTab('mapa'); if(isMobile) setMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
          activeTab === 'mapa' 
          ? 'bg-white shadow-xl text-[var(--secondary)]' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        } ${sidebarCollapsed && !isMobile ? 'justify-center px-0' : ''}`}
        title="Mapa de Calor"
      >
        <MapPinned className="w-5 h-5 shrink-0" />
        {(!sidebarCollapsed || isMobile) && <span className="truncate">Mapa de Calor</span>}
      </button>
      <button 
        onClick={() => { setActiveTab('denuncias'); if(isMobile) setMobileMenuOpen(false); }}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
          activeTab === 'denuncias' 
          ? 'bg-white shadow-xl text-[var(--secondary)]' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
        } ${sidebarCollapsed && !isMobile ? 'justify-center px-0' : ''}`}
        title="Denúncias"
      >
        <AlertTriangle className="w-5 h-5 shrink-0" />
        {(!sidebarCollapsed || isMobile) && <span className="truncate">Denúncias</span>}
      </button>
    </>
  );

  return (
    <div className="flex w-full h-screen bg-[var(--cream)] font-sans selection:bg-white selection:text-[var(--primary)] overflow-hidden">
      
      {/* ================= BARRA LATERAL (SIDEBAR - DESKTOP) ================= */}
      <aside 
        className={`hidden lg:flex flex-col bg-[var(--secondary)] py-8 sticky top-0 h-screen justify-between shrink-0 border-r border-white/5 shadow-2xl transition-all duration-500 ease-in-out relative z-[110] ${
          sidebarCollapsed ? 'w-20 px-3' : 'w-72 px-6'
        }`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-4 top-10 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-[120]"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-500 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>

        <div className="space-y-12">
          {/* Logo / Título */}
          <div className={`space-y-2 ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
            <div className={`flex items-center gap-4 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="p-3 bg-[var(--primary)] rounded-[20px] text-white shadow-lg shadow-[var(--primary)]/30 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              {!sidebarCollapsed && (
                <h1 className="text-xl font-black text-white leading-tight animate-in fade-in duration-500" style={{ fontFamily: "'Georgia', serif" }}>
                  Gestão <br /> <span className="text-[var(--primary)]">Urbana</span>
                </h1>
              )}
            </div>
            {!sidebarCollapsed && <p className="text-white/40 text-[9px] font-black uppercase tracking-widest ml-1 animate-in fade-in">Portal do Gestor</p>}
          </div>

          {/* Menu */}
          <nav className="space-y-2">
            <NavButtons />
            <div className={`pt-8 border-t border-white/10 mt-6 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
              {!sidebarCollapsed && <p className="text-[9px] font-black uppercase tracking-widest text-white/30 px-6 mb-4">Relatórios</p>}
              <button 
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold text-sm ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                title="Exportar Dados"
              >
                <FileText className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">Exportar Dados</span>}
              </button>
            </div>
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 text-white/60 hover:text-white transition-all font-bold text-sm ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
            title="Sair do Portal"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span className="truncate">Sair do Portal</span>}
          </Link>
        </div>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-[var(--secondary)] z-[100] flex items-center justify-between px-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />
          <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>Gestão Urbana</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg outline-none active:scale-95 transition-transform"
          >
            <div className="font-black text-[10px]">GP</div>
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 bg-white/5 rounded-xl text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {showProfileMenu && (
          <>
            <div className="fixed inset-0 z-[110]" onClick={() => setShowProfileMenu(false)} />
            <div className="absolute right-6 top-20 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[var(--gray-border)] p-2 z-[120] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-[var(--gray-border)] mb-2">
                <p className="text-xs font-black text-[var(--black)]">Gestão Prefeitura</p>
                <p className="text-[10px] font-bold text-[var(--gray-text)] uppercase tracking-widest">Administrador</p>
              </div>
              <Link 
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-[var(--cream)] text-[var(--gray-text)] hover:text-[var(--primary)] transition-all font-bold text-sm"
              >
                <LayoutDashboard className="w-5 h-5" />
                Voltar ao Dashboard?
              </Link>
              <Link 
                to="/"
                className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-rose-50 text-rose-500 transition-all font-bold text-sm"
              >
                <LogOut className="w-5 h-5" />
                Sair do Portal
              </Link>
            </div>
          </>
        )}
      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-[var(--secondary)] z-[90] pt-24 p-6 animate-in fade-in duration-300">
          <nav className="space-y-4">
            <NavButtons isMobile />
            <div className="pt-10 border-t border-white/10 mt-6">
              <Link 
                to="/dashboard"
                className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 text-white/60 font-bold text-base mb-2"
              >
                <LayoutDashboard className="w-6 h-6" />
                Voltar ao Dashboard
              </Link>
              <Link to="/" className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 text-white/60 font-bold text-base">
                <LogOut className="w-6 h-6" />
                Sair do Portal
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar scroll-smooth">
        <main className="p-6 lg:p-12 gap-8 lg:gap-12 max-w-full lg:max-w-7xl mx-auto w-full pt-28 lg:pt-12 flex flex-col">
          
          {/* Header Content */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-[var(--black)] mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                {activeTab === 'geral' ? 'Visão Geral' : activeTab === 'mapa' ? 'Análise Geo-Espacial' : 'Controle de Denúncias'}
              </h2>
              <p className="text-[var(--gray-text)] font-medium text-sm lg:text-base">Bem-vindo ao centro de controle urbano de Aracaju.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative w-12 h-12 flex items-center justify-center bg-white rounded-2xl border border-[var(--gray-border)] text-[var(--gray-text)] hover:text-[var(--primary)] transition-colors shadow-sm">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-[var(--primary)] rounded-full border-2 border-white" />
              </button>
              
              {/* Profile Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl border border-[var(--gray-border)] shadow-sm hover:border-[var(--primary)] transition-all outline-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--secondary-pale)] flex items-center justify-center text-[var(--secondary)] font-black text-xs shrink-0">
                    GP
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[11px] font-black text-[var(--black)] leading-tight">Gestão Prefeitura</p>
                    <p className="text-[9px] font-bold text-[var(--gray-text)] uppercase tracking-widest">Admin</p>
                  </div>
                </button>

                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-[var(--gray-border)] p-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                      <Link 
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-[var(--cream)] text-[var(--gray-text)] hover:text-[var(--primary)] transition-all font-bold text-xs"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Voltar ao Dashboard?
                      </Link>
                      <div className="h-px bg-[var(--gray-border)] my-1" />
                      <Link 
                        to="/"
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-all font-bold text-xs"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair do Portal
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {activeTab === 'geral' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-none shadow-xl shadow-black/5 rounded-[32px] overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-[var(--primary-pale)] text-[var(--primary)] rounded-[20px] group-hover:scale-110 transition-transform">
                        <Store className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full">+12%</span>
                    </div>
                    <h3 className="text-4xl font-black text-[var(--black)] mb-1">{totalLojas}</h3>
                    <p className="text-[11px] font-black text-[var(--gray-text)] uppercase tracking-widest">Comércios Ativos</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-xl shadow-black/5 rounded-[32px] overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-[var(--secondary-pale)] text-[var(--secondary)] rounded-[20px] group-hover:scale-110 transition-transform">
                        <Users className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">-2.4%</span>
                    </div>
                    <h3 className="text-4xl font-black text-[var(--black)] mb-1">12.4k</h3>
                    <p className="text-[11px] font-black text-[var(--gray-text)] uppercase tracking-widest">Fluxo / Dia</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-xl shadow-black/5 rounded-[32px] overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-orange-50 text-orange-600 rounded-[20px] group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">2 Urgentes</span>
                    </div>
                    <h3 className="text-4xl font-black text-[var(--black)] mb-1">{mockDenuncias.filter(d => d.status === 'pendente').length}</h3>
                    <p className="text-[11px] font-black text-[var(--gray-text)] uppercase tracking-widest">Pendências</p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-xl shadow-black/5 rounded-[32px] overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-blue-50 text-blue-600 rounded-[20px] group-hover:scale-110 transition-transform">
                        <Car className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">78% Ocup.</span>
                    </div>
                    <h3 className="text-4xl font-black text-[var(--black)] mb-1">842</h3>
                    <p className="text-[11px] font-black text-[var(--gray-text)] uppercase tracking-widest">Vagas Livres</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white border-none shadow-xl shadow-black/5 rounded-[40px] p-8">
                  <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-black text-[var(--black)]" style={{ fontFamily: "'Georgia', serif" }}>Volume por Região</CardTitle>
                      <p className="text-[11px] text-[var(--gray-text)] font-bold uppercase tracking-widest mt-1">Dados consolidados do último mês</p>
                    </div>
                    <div className="flex gap-2">
                      {['S', 'M', 'T'].map(p => (
                        <button key={p} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${p === 'M' ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20' : 'bg-[var(--cream)] text-[var(--gray-text)] hover:bg-[var(--gray-border)]'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="h-72 flex items-end justify-between gap-6 pt-12 relative border-b border-[var(--gray-border)] pb-4 overflow-x-auto no-scrollbar">
                      {[
                        { label: 'Centro', val: 80, color: 'var(--primary)' },
                        { label: 'Orla', val: 65, color: 'var(--secondary)' },
                        { label: 'Jardins', val: 95, color: 'var(--primary-dark)' },
                        { label: 'Mercado', val: 45, color: 'var(--secondary-mid)' },
                        { label: 'Sul', val: 30, color: 'var(--gray-text)' },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 min-w-[60px] flex flex-col items-center gap-4 group relative">
                          <div 
                            className="w-full max-w-[50px] rounded-2xl transition-all duration-700 hover:brightness-110 cursor-help relative"
                            style={{ height: `${bar.val}%`, backgroundColor: bar.color }}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--black)] text-white text-[10px] px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-black shadow-xl">
                                R$ {bar.val * 5}k
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-[var(--gray-text)] uppercase tracking-tighter text-center">{bar.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-xl shadow-black/5 rounded-[40px] p-8">
                  <CardHeader className="px-0 pt-0 pb-8">
                    <CardTitle className="text-2xl font-black text-[var(--black)]" style={{ fontFamily: "'Georgia', serif" }}>Categorias</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-6">
                    {[
                      { label: 'Alimentação', count: 45, color: 'var(--primary)' },
                      { label: 'Vestuário', count: 32, color: 'var(--secondary)' },
                      { label: 'Serviços', count: 18, color: 'var(--primary-light)' },
                      { label: 'Artesanato', count: 12, color: 'var(--secondary-mid)' },
                    ].map((cat, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-[var(--gray-text)]">{cat.label}</span>
                          <span className="text-[var(--black)]">{cat.count}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-[var(--cream)] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${cat.count}%`, backgroundColor: cat.color }} 
                          />
                        </div>
                      </div>
                    ))}
                    <div className="pt-8">
                      <Button className="w-full h-14 bg-[var(--secondary)] hover:bg-[var(--secondary-mid)] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--secondary)]/10">
                        Ver Relatório Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'mapa' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2">
                  {[
                    { label: 'Crítico', color: 'bg-rose-500' },
                    { label: 'Alto', color: 'bg-orange-500' },
                    { label: 'Normal', color: 'bg-green-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--gray-text)] whitespace-nowrap">
                      <div className={`w-2 h-2 ${item.color} rounded-full`} /> {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-[500px] lg:h-[700px] w-full bg-white rounded-[40px] overflow-hidden border border-[var(--gray-border)] shadow-2xl relative">
                <MapContainer center={[-10.9105, -37.0503]} zoom={15} className="w-full h-full z-0">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  
                  {heatmapPoints.map((point, i) => (
                    <Circle 
                      key={i}
                      center={point.pos}
                      radius={point.intensity / 1.5}
                      pathOptions={{ 
                        color: point.intensity > 400 ? 'var(--primary)' : 'var(--secondary)', 
                        fillColor: point.intensity > 400 ? 'var(--primary)' : 'var(--secondary)', 
                        fillOpacity: 0.4 
                      }}
                    >
                      <Popup>
                        <div className="p-3">
                          <p className="font-black text-sm mb-1">{point.label}</p>
                          <p className="text-[10px] text-[var(--gray-text)] font-bold uppercase tracking-widest">Fluxo: {point.intensity} p/min</p>
                        </div>
                      </Popup>
                    </Circle>
                  ))}

                  {comercios.map(c => (
                    <Marker key={c.id} position={[c.latitude, c.longitude]}>
                      <Popup>
                        <div className="p-3">
                          <p className="font-black text-sm mb-1">{c.nome}</p>
                          <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest">Alvará: Ativo</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          )}

          {activeTab === 'denuncias' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gray-text)] w-5 h-5" />
                  <input 
                    placeholder="Filtrar por estabelecimento..." 
                    className="w-full pl-12 pr-4 py-4 h-14 bg-white rounded-2xl border border-[var(--gray-border)] shadow-sm text-sm font-medium outline-none focus:ring-4 focus:ring-[var(--primary)]/10 focus:border-[var(--primary)] transition-all"
                  />
                </div>
              </div>

              <Card className="border-none shadow-xl shadow-black/5 overflow-hidden rounded-[40px] bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-[var(--cream)] text-[10px] font-black text-[var(--gray-text)] uppercase tracking-[0.2em] border-b border-[var(--gray-border)]">
                      <tr>
                        <th className="px-8 py-6">Estabelecimento</th>
                        <th className="px-8 py-6 hidden md:table-cell">Motivo da Ocorrência</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--gray-border)]">
                      {mockDenuncias.map((d) => (
                        <tr key={d.id} className="hover:bg-[var(--cream)]/30 transition-colors group">
                          <td className="px-8 py-6">
                            <p className="text-base font-black text-[var(--black)]">{d.loja}</p>
                            <p className="text-[11px] text-[var(--gray-text)] font-bold md:hidden mt-1">{d.motivo}</p>
                          </td>
                          <td className="px-8 py-6 hidden md:table-cell">
                            <div className="flex items-start gap-3">
                              <Info className="w-4 h-4 text-[var(--gray-text)]/40 mt-0.5" />
                              <div>
                                <p className="text-sm text-[var(--gray-text)] font-bold">{d.motivo}</p>
                                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-[var(--gray-text)]/60 font-black uppercase tracking-widest">
                                  <Clock className="w-3 h-3" />
                                  {d.data}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest ${
                              d.status === 'pendente' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                              d.status === 'resolvido' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                            }`}>
                              {d.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="w-10 h-10 flex items-center justify-center bg-[var(--cream)] text-[var(--gray-text)] hover:bg-[var(--primary)] hover:text-white rounded-xl transition-all shadow-sm">
                              <ChevronRight className="w-5 h-5" />
                            </button>
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

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(1rem); } to { transform: translateY(0); } }
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom-4; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}