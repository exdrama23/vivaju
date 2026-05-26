import { useState, useEffect, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart,
} from "recharts";
import {
  Users, Store, AlertTriangle, Car, Search, ShieldCheck,
  LayoutDashboard, LogOut, MapPinned, Menu, X, ChevronLeft,
  Activity, Zap, CheckCircle2, Database, Bell, TrendingUp,
  TrendingDown, ChevronDown, Filter, Download, RefreshCw,
  BarChart2, Map, FileText, MoreHorizontal, ArrowUpRight,
  ArrowDownRight, Clock, MapPin, ShoppingBag, Coffee, Scissors,
  Briefcase, Star, Eye, AlertCircle, CheckSquare, Package,
} from "lucide-react";

import { MapContainer, TileLayer, Circle, Popup as LeafletPopup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const C = {
  primary:    "#2E7D52",
  primaryL:   "#3a9e68",
  secondary:  "#1B3A2D",
  secondaryL: "#254d3c",
  cream:      "#F6F4EE",
  grayBorder: "#E2E0D8",
  grayText:   "#7A7870",
  black:      "#1A1916",
  white:      "#FFFFFF",
  danger:     "#EF4444",
  warning:    "#F59E0B",
  info:       "#3B82F6",
  success:    "#10B981",
};

const mockDenuncias = [
  { id: 1, protocolo: "DEN-2024-001", loja: "Pastelaria Central",   motivo: "Obstrução de calçada",       data: "26/01/2025 08:12", user: "admin",     status: "pendente"   },
  { id: 2, protocolo: "DEN-2024-002", loja: "Loja do João",         motivo: "Som alto após as 22h",       data: "26/01/2025 07:55", user: "system",    status: "resolvido"  },
  { id: 3, protocolo: "DEN-2024-003", loja: "Ambulante s/ Registro",motivo: "Venda em local proibido",    data: "26/01/2025 06:40", user: "admin",     status: "em análise" },
  { id: 4, protocolo: "DEN-2024-004", loja: "Bar da Orla",          motivo: "Falta de licença sanitária", data: "25/01/2025 22:17", user: "fiscal_01", status: "pendente"   },
  { id: 5, protocolo: "DEN-2024-005", loja: "Mercadinho Bom Preço", motivo: "Validade vencida",           data: "25/01/2025 19:03", user: "fiscal_02", status: "resolvido"  },
];

const activityData = [
  { hora: "08h", ocorrencias: 4, resolvidos: 3 },
  { hora: "09h", ocorrencias: 7, resolvidos: 5 },
  { hora: "10h", ocorrencias: 12, resolvidos: 9 },
  { hora: "11h", ocorrencias: 9, resolvidos: 8 },
  { hora: "12h", ocorrencias: 6, resolvidos: 4 },
  { hora: "13h", ocorrencias: 8, resolvidos: 7 },
  { hora: "14h", ocorrencias: 15, resolvidos: 11 },
  { hora: "15h", ocorrencias: 18, resolvidos: 14 },
  { hora: "16h", ocorrencias: 13, resolvidos: 10 },
  { hora: "17h", ocorrencias: 10, resolvidos: 8 },
];

const categorias = [
  { nome: "Alimentação",     qtd: 342, cor: C.primary  },
  { nome: "Vestuário",       qtd: 218, cor: C.info     },
  { nome: "Serviços",        qtd: 187, cor: C.warning  },
  { nome: "Ambulantes",      qtd: 156, cor: C.danger   },
  { nome: "Eletrônicos",     qtd: 98,  cor: "#8B5CF6"  },
  { nome: "Saúde/Farmácia",  qtd: 87,  cor: C.success  },
  { nome: "Entretenimento",  qtd: 64,  cor: "#EC4899"  },
  { nome: "Outros",          qtd: 52,  cor: C.grayText },
];

const fluxoHorario = [
  { hora: "06h", fluxo: 120  },
  { hora: "07h", fluxo: 380  },
  { hora: "08h", fluxo: 720  },
  { hora: "09h", fluxo: 940  },
  { hora: "10h", fluxo: 1250 },
  { hora: "11h", fluxo: 1480 },
  { hora: "12h", fluxo: 1620 },
  { hora: "13h", fluxo: 1380 },
  { hora: "14h", fluxo: 1510 },
  { hora: "15h", fluxo: 1690 },
  { hora: "16h", fluxo: 1740 },
  { hora: "17h", fluxo: 1850 },
  { hora: "18h", fluxo: 1620 },
  { hora: "19h", fluxo: 1200 },
  { hora: "20h", fluxo: 780  },
  { hora: "21h", fluxo: 420  },
  { hora: "22h", fluxo: 180  },
];

const crescimentoMensal = [
  { mes: "Jan", novos: 18, fechados: 4  },
  { mes: "Fev", novos: 24, fechados: 6  },
  { mes: "Mar", novos: 31, fechados: 5  },
  { mes: "Abr", novos: 22, fechados: 8  },
  { mes: "Mai", novos: 28, fechados: 4  },
  { mes: "Jun", novos: 35, fechados: 7  },
  { mes: "Jul", novos: 41, fechados: 9  },
  { mes: "Ago", novos: 38, fechados: 5  },
  { mes: "Set", novos: 29, fechados: 6  },
  { mes: "Out", novos: 44, fechados: 8  },
  { mes: "Nov", novos: 52, fechados: 10 },
  { mes: "Dez", novos: 33, fechados: 7  },
];

const topRuas = [
  { rua: "R. João Pessoa",    lojas: 187 },
  { rua: "Av. Ivo do Prado",  lojas: 164 },
  { rua: "R. Itabaiana",      lojas: 143 },
  { rua: "R. Laranjeiras",    lojas: 128 },
  { rua: "Av. Rio Branco",    lojas: 112 },
  { rua: "R. Estância",       lojas: 98  },
  { rua: "R. Divina Pastora", lojas: 87  },
  { rua: "R. Pacatuba",       lojas: 74  },
];

const porteEmpresa = [
  { name: "Microempresa",       value: 58, cor: C.primary  },
  { name: "Pequeno Porte",      value: 27, cor: C.info     },
  { name: "Médio Porte",        value: 11, cor: C.warning  },
  { name: "Grande Porte",       value: 4,  cor: C.danger   },
];

const setoresRadar = [
  { setor: "Diversidade",  centro: 82, media: 65 },
  { setor: "Densidade",    centro: 91, media: 70 },
  { setor: "Formalização", centro: 74, media: 60 },
  { setor: "Crescimento",  centro: 88, media: 72 },
  { setor: "Regularidade", centro: 69, media: 68 },
  { setor: "Acessib.",     centro: 77, media: 65 },
];

const densidadeQuadras = [
  { quadra: "Q-01", densidade: 94, lojas: 48, alvara: 92 },
  { quadra: "Q-02", densidade: 87, lojas: 41, alvara: 88 },
  { quadra: "Q-03", densidade: 76, lojas: 35, alvara: 79 },
  { quadra: "Q-04", densidade: 68, lojas: 29, alvara: 71 },
  { quadra: "Q-05", densidade: 55, lojas: 22, alvara: 63 },
  { quadra: "Q-06", densidade: 43, lojas: 18, alvara: 58 },
];

const Pill = ({ children, color = C.grayBorder, text = C.grayText }: { children: React.ReactNode, color?: string, text?: string }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
    background: color + "22", color: text, border: `1px solid ${color}44`,
    letterSpacing: "0.05em", textTransform: "uppercase",
  }}>{children}</span>
);

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { bg: string, text: string, label: string }> = {
    pendente:    { bg: "#FEF3C7", text: "#92400E", label: "Pendente"   },
    resolvido:   { bg: "#D1FAE5", text: "#065F46", label: "Resolvido"  },
    "em análise":{ bg: "#DBEAFE", text: "#1E40AF", label: "Em análise" },
  };
  const s = map[status] || map.pendente;
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text,
    }}>{s.label}</span>
  );
};

const KpiCard = ({ icon: Icon, label, value, delta, deltaLabel, color }: { icon: any, label: string, value: string, delta: number, deltaLabel: string, color: string }) => {
  const isUp = delta >= 0;
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.grayBorder}`,
      borderRadius: 16, padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.grayText, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        <div style={{ background: color + "18", borderRadius: 10, padding: 7 }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <div>
        <p style={{ fontSize: 28, fontWeight: 900, color: C.black, lineHeight: 1, margin: 0 }}>{value}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {isUp
          ? <ArrowUpRight size={13} style={{ color: C.success }} />
          : <ArrowDownRight size={13} style={{ color: C.danger }} />}
        <span style={{ fontSize: 11, fontWeight: 700, color: isUp ? C.success : C.danger }}>{Math.abs(delta)}%</span>
        <span style={{ fontSize: 11, color: C.grayText }}>{deltaLabel}</span>
      </div>
    </div>
  );
};

const SectionTitle = ({ children, action }: { children: React.ReactNode, action?: string }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
    <h3 style={{ fontSize: 13, fontWeight: 700, color: C.black, margin: 0 }}>{children}</h3>
    {action && <button style={{ fontSize: 11, fontWeight: 700, color: C.primary, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>{action}</button>}
  </div>
);

const Card = ({ children, style = {} }: { children: React.ReactNode, style?: React.CSSProperties }) => (
  <div style={{ background: C.white, border: `1px solid ${C.grayBorder}`, borderRadius: 16, overflow: "hidden", ...style }}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.secondary, borderRadius: 10, padding: "8px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
      <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ margin: 0, fontSize: 13, fontWeight: 700, color: p.color || C.white }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const NAV_ITEMS = [
  { id: "geral",        label: "Dashboard",      Icon: LayoutDashboard, badge: null        },
  { id: "mapa",         label: "Mapa de Calor",  Icon: MapPinned,       badge: null        },
  { id: "geomarketing", label: "Geomarketing",   Icon: BarChart2,       badge: "NOVO"      },
  { id: "denuncias",    label: "Denúncias",      Icon: AlertTriangle,   badge: "24"        },
  { id: "relatorios",   label: "Relatórios",     Icon: FileText,        badge: null        },
];

export function PrefeituraDashboard() {
  const [activeTab, setActiveTab]             = useState("geral");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [notifOpen, setNotifOpen]             = useState(false);
  const [isMobile, setIsMobile]               = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Sidebar = ({ isMobileView = false }) => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{
          display: "flex", alignItems: "center",
          gap: sidebarCollapsed && !isMobileView ? 0 : 12,
          justifyContent: (sidebarCollapsed && !isMobileView) ? "center" : "flex-start",
          padding: "0 0 32px",
          marginBottom: 8,
          position: "relative"
        }}>
          {(!sidebarCollapsed || isMobileView) && (
            <div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 15, color: C.white, lineHeight: 1.2, fontFamily: "Georgia, serif" }}>
                Gestão <span style={{ color: C.primary }}>Urbana</span>
              </p>
              <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Portal Municipal</p>
            </div>
          )}
          {isMobileView && (
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: "absolute", right: 0, top: 0, background: "none", border: "none", color: C.white, cursor: "pointer" }}
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(!sidebarCollapsed || isMobileView) && (
            <p style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 8px 8px", padding: "0 8px" }}>Navegação</p>
          )}
          {NAV_ITEMS.map(({ id, label, Icon, badge }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  gap: 12, padding: (sidebarCollapsed && !isMobileView) ? "12px 0" : "11px 14px",
                  justifyContent: (sidebarCollapsed && !isMobileView) ? "center" : "flex-start",
                  borderRadius: 12, border: "none", cursor: "pointer",
                  background: active ? C.white : "transparent",
                  color: active ? C.secondary : "rgba(255,255,255,0.55)",
                  fontWeight: 700, fontSize: 13, transition: "all 0.18s",
                  position: "relative",
                }}
              >
                <Icon size={17} style={{ flexShrink: 0, color: active ? C.primary : "inherit" }} />
                {(!sidebarCollapsed || isMobileView) && (
                  <>
                    <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
                    {badge && (
                      <span style={{
                        fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 999,
                        background: badge === "NOVO" ? C.primary : C.danger,
                        color: C.white, letterSpacing: "0.06em",
                      }}>{badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {(!sidebarCollapsed || isMobileView) && (
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 16, marginBottom: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: C.primary + "33",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={16} color={C.primary} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: C.white }}>Alec</p>
                <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Administrador</p>
              </div>
            </div>
          </div>
        )}
        <button style={{
          width: "100%", display: "flex", alignItems: "center",
          gap: 10, padding: (sidebarCollapsed && !isMobileView) ? "12px 0" : "10px 12px",
          justifyContent: (sidebarCollapsed && !isMobileView) ? "center" : "flex-start",
          borderRadius: 12, border: "none", cursor: "pointer",
          background: "transparent", color: "rgba(255,255,255,0.35)",
          fontWeight: 700, fontSize: 12,
        }}>
          <LogOut size={16} />
          {(!sidebarCollapsed || isMobileView) && "Sair do Portal"}
        </button>
      </div>
    </div>
  );

  const Header = () => (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: isMobile ? "0 16px" : "0 28px", height: 60,
      background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.grayBorder}`,
      position: "sticky", top: 0, zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(true)}
            style={{ background: "none", border: "none", color: C.black, cursor: "pointer", padding: 4 }}
          >
            <Menu size={20} />
          </button>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: C.grayText, fontWeight: 600 }}>Portal</span>
          <ChevronDown size={12} style={{ color: C.grayText }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.black }}>
            {NAV_ITEMS.find(n => n.id === activeTab)?.label}
          </span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {!isMobile && (
          <div style={{ position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: C.grayText }} />
            <input
              placeholder="Buscar..."
              style={{
                padding: "7px 14px 7px 32px",
                border: `1px solid ${C.grayBorder}`,
                borderRadius: 10, fontSize: 12,
                background: C.cream, outline: "none",
                width: 200, color: C.black,
              }}
            />
          </div>
        )}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${C.grayBorder}`,
              background: C.white, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}
          >
            <Bell size={15} color={C.grayText} />
            {notifOpen && (
               <span style={{
                position: "absolute", top: 6, right: 6,
                width: 7, height: 7, borderRadius: 999, background: C.danger,
              }} />
            )}
          </button>
        </div>
        {!isMobile && (
          <>
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1px solid ${C.grayBorder}`,
              background: C.white, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <RefreshCw size={14} color={C.grayText} />
            </button>
            <div style={{ width: 1, height: 24, background: C.grayBorder }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: C.primary + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={15} color={C.primary} />
              </div>
              <div style={{ lineHeight: 1 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: C.black }}>Alec</p>
                <p style={{ margin: 0, fontSize: 10, color: C.primary, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin</p>
              </div>
              <ChevronDown size={13} color={C.grayText} />
            </div>
          </>
        )}
      </div>
    </header>
  );

  const TabGeral = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.secondary} 0%, ${C.secondaryL} 100%)`,
        borderRadius: 18, padding: isMobile ? "20px" : "22px 28px",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between",
        gap: 20, position: "relative",
      }}>
        <div style={{ zIndex: 1 }}>
          <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 800, color: C.primary, textTransform: "uppercase", letterSpacing: "0.2em" }}>Painel Executivo · Janeiro 2025</p>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 900, color: C.white, fontFamily: "Georgia, serif" }}>
            Operação Centro Histórico
          </h2>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", maxWidth: 480 }}>
            Monitoramento de Alta Precisão · Área: 1,35 km² · Aracaju/SE
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", zIndex: 1 }}>
          {[
            { label: "Pendências",   value: "24", color: C.danger  },
            { label: "Atualizações", value: "128", color: C.info   },
            { label: "Rotas ativas", value: "41",  color: C.success},
          ].map(item => (
            <div key={item.label} style={{
              background: "rgba(255,255,255,0.08)", borderRadius: 12,
              padding: "10px 16px", textAlign: "center", minWidth: 80,
            }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 900, color: item.color }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <KpiCard icon={Store}         label="Comércios"      value="1.204"  delta={3.2}   deltaLabel="vs mês ant."  color={C.danger}  />
        <KpiCard icon={Activity}      label="Ativos Hoje"    value="982"    delta={1.8}   deltaLabel="vs ontem"     color={C.success} />
        <KpiCard icon={Car}           label="Vagas Ocup."    value="78%"    delta={-2.1}  deltaLabel="vs semana"    color={C.grayText}/>
        <KpiCard icon={AlertTriangle} label="Alertas Ativos" value="24"     delta={12.5}  deltaLabel="vs ontem"     color={C.warning} />
        <KpiCard icon={Zap}           label="Resp. Média"    value="14 min" delta={-8.3}  deltaLabel="vs semana"    color={C.info}    />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap: 16 }}>
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle action="Ver Relatório">Atividade do Dia</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grayBorder} vertical={false} />
              <XAxis dataKey="hora" tick={{ fontSize: 11, fill: C.grayText }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.grayText }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ocorrencias" fill={C.primary + "22"} stroke={C.primary} strokeWidth={2} name="Ocorrências" dot={false} />
              <Bar dataKey="resolvidos" fill={C.info + "55"} radius={[4,4,0,0]} name="Resolvidos" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Status de Alvarás</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={[{ value: 75 }, { value: 25 }]} innerRadius={50} outerRadius={75} dataKey="value" startAngle={90} endAngle={-270}>
                  <Cell fill={C.primary} />
                  <Cell fill={C.danger} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "Regulares",   pct: "75%", color: C.primary },
                { label: "Irregulares", pct: "25%", color: C.danger  },
              ].map(i => (
                <div key={i.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: i.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.grayText }}>{i.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: C.black }}>{i.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Ocorrências por Região</SectionTitle>
          {[
            { label: "Centro",        val: 85, color: C.primary },
            { label: "Orla (Atalaia)",val: 60, color: C.info    },
            { label: "Jardins",       val: 45, color: C.warning },
            { label: "Outros",        val: 20, color: C.grayBorder },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.grayText }}>{item.label}</span>
                <span style={{ fontSize: 12, fontWeight: 900, color: C.black }}>{item.val}%</span>
              </div>
              <div style={{ background: C.cream, borderRadius: 8, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${item.val}%`, height: "100%", background: item.color, borderRadius: 8 }} />
              </div>
            </div>
          ))}
        </Card>

        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Integrações de Sistema</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "Vigilância Sanitária",    status: "online",  latency: "12ms"  },
              { name: "Polícia Militar",          status: "online",  latency: "28ms"  },
              { name: "SMTT",                     status: "offline", latency: "—"     },
              { name: "Receita Municipal",        status: "online",  latency: "45ms"  },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", borderRadius: 10,
                border: `1px solid ${C.grayBorder}`, background: C.cream + "66",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: 999,
                    background: s.status === "online" ? C.success : C.danger,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.black }}>{s.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Pill color={s.status === "online" ? C.success : C.danger} text={s.status === "online" ? C.success : C.danger}>{s.status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ background: C.cream }}>
                {["Protocolo", "Estabelecimento", "Motivo", "Data/Hora", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 18px", textAlign: "left", fontSize: 10, fontWeight: 800, color: C.grayText, textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockDenuncias.map((d, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.grayBorder}` }}>
                  <td style={{ padding: "12px 18px", fontSize: 12, fontWeight: 700, color: C.primary }}>{d.protocolo}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, fontWeight: 600, color: C.black }}>{d.loja}</td>
                  <td style={{ padding: "12px 18px", fontSize: 12, color: C.grayText }}>{d.motivo}</td>
                  <td style={{ padding: "12px 18px", fontSize: 11, color: C.grayText }}>{d.data}</td>
                  <td style={{ padding: "12px 18px" }}><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const TabMapa = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card style={{ padding: "20px 24px" }}>
        <SectionTitle>Mapa de Calor Operacional — Centro Histórico</SectionTitle>
        <div style={{
          height: 500, borderRadius: 12, overflow: "hidden", border: `1px solid ${C.grayBorder}`
        }}>
          <MapContainer 
            center={[-10.909436, -37.050389]} 
            zoom={15} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            
            {/* Heatmap Regions - Focused strictly on the 1.35km² Historic Center */}
            {[
              { name: "Av. Ivo do Prado (Corredor Comercial)", coords: [-10.914, -37.048], color: C.danger, radius: 280, status: "Alta Densidade" },
              { name: "Mercado Central / Albano Franco", coords: [-10.911, -37.050], color: C.danger, radius: 300, status: "Crítico" },
              { name: "Praça Fausto Cardoso (Governo)", coords: [-10.909, -37.051], color: C.warning, radius: 200, status: "Monitorado" },
              { name: "Calçadão João Pessoa (Varejo)", coords: [-10.907, -37.050], color: C.danger, radius: 250, status: "Alta Atividade" },
              { name: "Terminal Rodoviário Centro", coords: [-10.913, -37.049], color: C.danger, radius: 220, status: "Crítico" },
              { name: "Rua de Itabaiana (Serviços)", coords: [-10.910, -37.054], color: C.info, radius: 200, status: "Normal" },
              { name: "Av. Rio Branco", coords: [-10.911, -37.048], color: C.warning, radius: 180, status: "Monitorado" },
            ].map((region, idx) => (
              <Circle 
                key={idx}
                center={region.coords as [number, number]}
                pathOptions={{ fillColor: region.color, color: region.color, fillOpacity: 0.45, weight: 1 }}
                radius={region.radius}
              >
                <LeafletPopup>
                  <div style={{ padding: 4 }}>
                    <p style={{ margin: 0, fontWeight: 800, color: C.black }}>{region.name}</p>
                    <p style={{ margin: '4px 0 0', fontSize: 11, color: region.color }}>Status: {region.status}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 10, color: C.grayText }}>Área de monitoramento intensivo.</p>
                  </div>
                </LeafletPopup>
              </Circle>
            ))}
          </MapContainer>
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 16, justifyContent: "center" }}>
          {[{l: "Crítico / Alta Densidade", c: C.danger}, {l: "Monitorado", c: C.warning}, {l: "Fluxo Normal", c: C.info}].map(item => (
            <div key={item.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: item.c, opacity: 0.7 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.grayText }}>{item.l}</span>
            </div>
          ))}
        </div>
      </Card>
      <div style={{
        padding: "12px 20px", background: C.cream, borderRadius: 12,
        border: `1px solid ${C.grayBorder}`, display: "flex", alignItems: "center", gap: 10,
      }}>
        <AlertCircle size={14} style={{ color: C.grayText, flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: 11, color: C.grayText, lineHeight: 1.5 }}>
          Análise focada no perímetro de 1,35 km² do Centro Histórico. Coordenadas de referência: -10.9094, -37.0503.
        </p>
      </div>
    </div>
  );

  const TabDenuncias = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {[
          { label: "Total",       value: mockDenuncias.length,                                           color: C.primary },
          { label: "Pendentes",   value: mockDenuncias.filter(d => d.status === "pendente").length,      color: C.danger  },
          { label: "Em Análise",  value: mockDenuncias.filter(d => d.status === "em análise").length,    color: C.warning },
          { label: "Resolvidas",  value: mockDenuncias.filter(d => d.status === "resolvido").length,     color: C.success },
        ].map(s => (
          <div key={s.label} style={{
            background: C.white, border: `1px solid ${C.grayBorder}`,
            borderRadius: 14, padding: "16px 20px",
            borderTop: `3px solid ${s.color}`,
          }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: C.grayText, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</p>
            <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: C.cream }}>
                {["#", "Protocolo", "Estabelecimento", "Motivo", "Data/Hora", "Operador", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 18px", textAlign: "left", fontSize: 10, fontWeight: 800, color: C.grayText, textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockDenuncias.map((d, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${C.grayBorder}`, cursor: "pointer" }}>
                  <td style={{ padding: "13px 18px", fontSize: 12, color: C.grayText }}>{d.id}</td>
                  <td style={{ padding: "13px 18px", fontSize: 11, fontWeight: 700, color: C.primary }}>{d.protocolo}</td>
                  <td style={{ padding: "13px 18px", fontSize: 12, fontWeight: 600, color: C.black }}>{d.loja}</td>
                  <td style={{ padding: "13px 18px", fontSize: 12, color: C.grayText }}>{d.motivo}</td>
                  <td style={{ padding: "13px 18px", fontSize: 11, color: C.grayText }}>{d.data}</td>
                  <td style={{ padding: "13px 18px" }}><Pill>{d.user}</Pill></td>
                  <td style={{ padding: "13px 18px" }}><StatusBadge status={d.status} /></td>
                  <td style={{ padding: "13px 18px" }}>
                    <MoreHorizontal size={15} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const TabGeomarketing = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.secondary} 0%, #264d38 100%)`,
        borderRadius: 18, padding: isMobile ? "20px" : "20px 26px",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between",
        gap: 16
      }}>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 10, fontWeight: 800, color: C.primary, textTransform: "uppercase", letterSpacing: "0.2em" }}>Análise Espacial Comercial</p>
          <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 900, color: C.white, fontFamily: "Georgia, serif" }}>
            Geomarketing · Centro de Aracaju
          </h2>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "9px 16px", borderRadius: 10, border: "none", background: C.primary, fontSize: 12, fontWeight: 700, color: C.white, cursor: "pointer" }}>
            Exportar
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        {[
          { icon: Store,     label: "Total de Comércios",  value: "1.204",  sub: "+52 este mês",   color: C.primary },
          { icon: MapPin,    label: "Quadras Mapeadas",    value: "48",     sub: "100% cobertura", color: C.info    },
          { icon: TrendingUp,label: "Crescimento Anual",   value: "+18,4%", sub: "vs ano anterior",color: C.success },
        ].map(k => (
          <div key={k.label} style={{
            background: C.white, border: `1px solid ${C.grayBorder}`,
            borderRadius: 14, padding: "18px 20px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.grayText, textTransform: "uppercase" }}>{k.label}</span>
              <k.icon size={14} style={{ color: k.color }} />
            </div>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 900, color: C.black }}>{k.value}</p>
            <span style={{ fontSize: 11, color: C.grayText }}>{k.sub}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Distribuição por Categoria</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categorias} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="nome" type="category" tick={{ fontSize: 11, fill: C.grayText }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="qtd" radius={[0, 6, 6, 0]}>
                {categorias.map((e, i) => <Cell key={i} fill={e.cor} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Fluxo de Pessoas por Horário</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={fluxoHorario}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grayBorder} vertical={false} />
              <XAxis dataKey="hora" tick={{ fontSize: 10, fill: C.grayText }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fontSize: 10, fill: C.grayText }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="fluxo" stroke={C.primary} strokeWidth={2} fill={C.primary + "22"} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Reintegrating Missing Row 2: Porte + Crescimento Mensal */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "340px 1fr", gap: 16 }}>
        {/* Porte das Empresas */}
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Porte dos Estabelecimentos</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={porteEmpresa} innerRadius={55} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {porteEmpresa.map((e, i) => <Cell key={i} fill={e.cor} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
              {porteEmpresa.map(p => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", background: C.cream, borderRadius: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: p.cor, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.grayText }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 900, color: C.black }}>{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Crescimento Mensal */}
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle action="Projeção">Abertura × Fechamento</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={crescimentoMensal}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grayBorder} vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: C.grayText }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.grayText }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="novos"    fill={C.primary}          radius={[5,5,0,0]} name="Abertos" />
              <Bar dataKey="fechados" fill={C.danger + "99"}    radius={[5,5,0,0]} name="Fechados" />
              <Line type="monotone" dataKey="novos" stroke={C.primaryL} strokeWidth={2} dot={false} name="Tendência" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Reintegrating Missing Row 3: Top Ruas + Radar + Densidade */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16 }}>
        {/* Top Ruas */}
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Top Ruas Comerciais</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topRuas.map((r, i) => (
              <div key={r.rua} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 900, color: i < 3 ? C.primary : C.grayText, width: 16, textAlign: "right" }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.black }}>{r.rua}</span>
                    <span style={{ fontSize: 11, fontWeight: 900, color: C.primary }}>{r.lojas}</span>
                  </div>
                  <div style={{ background: C.cream, borderRadius: 4, height: 5, overflow: "hidden" }}>
                    <div style={{ width: `${(r.lojas / topRuas[0].lojas) * 100}%`, height: "100%", background: i < 3 ? C.primary : C.grayBorder, borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Radar */}
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Índices Comparativos</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={setoresRadar}>
              <PolarGrid stroke={C.grayBorder} />
              <PolarAngleAxis dataKey="setor" tick={{ fontSize: 10, fill: C.grayText }} />
              <Radar name="Centro" dataKey="centro" stroke={C.primary} fill={C.primary} fillOpacity={0.25} />
              <Radar name="Média SE" dataKey="media" stroke={C.info} fill={C.info} fillOpacity={0.1} strokeDasharray="4 2" />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Densidade por Quadra */}
        <Card style={{ padding: "20px 24px" }}>
          <SectionTitle>Densidade por Quadra</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 50px 50px", gap: 8, marginBottom: 4 }}>
              {["Quadra", "Ocupação", "Lojas", "Alv.%"].map(h => (
                <span key={h} style={{ fontSize: 9, fontWeight: 800, color: C.grayText, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
              ))}
            </div>
            {densidadeQuadras.map(q => (
              <div key={q.quadra} style={{ display: "grid", gridTemplateColumns: "60px 1fr 50px 50px", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.black, fontFamily: "monospace" }}>{q.quadra}</span>
                <div style={{ background: C.cream, borderRadius: 4, height: 7, overflow: "hidden" }}>
                  <div style={{
                    width: `${q.densidade}%`, height: "100%", borderRadius: 4,
                    background: q.densidade > 80 ? C.danger : q.densidade > 60 ? C.warning : C.primary,
                  }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.black, textAlign: "right" }}>{q.lojas}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: q.alvara > 85 ? C.success : q.alvara > 70 ? C.warning : C.danger, textAlign: "right" }}>{q.alvara}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const TabRelatorios = () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      {[
        { title: "Relatório Mensal de Alvarás",    desc: "Janeiro 2025 · 48 pág.",     icon: FileText,  date: "26/01/2025" },
        { title: "Ocorrências por Região",          desc: "Q4 2024 · Consolidado",      icon: AlertTriangle, date: "15/01/2025" },
        { title: "Cadastro de Estabelecimentos",    desc: "Base completa · CSV + PDF",  icon: Database,  date: "01/01/2025" },
      ].map((r, i) => (
        <Card key={i} style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <r.icon size={18} style={{ color: C.primary }} />
            <Pill>{r.date}</Pill>
          </div>
          <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: C.black }}>{r.title}</p>
          <p style={{ margin: "0 0 16px", fontSize: 11, color: C.grayText }}>{r.desc}</p>
          <button style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.grayBorder}`, background: "transparent", fontSize: 11, fontWeight: 700, color: C.grayText, cursor: "pointer" }}>
            Baixar
          </button>
        </Card>
      ))}
    </div>
  );

  return (
    <div style={{
      display: "flex", width: "100%", height: "100vh",
      background: C.cream, fontFamily: "'Inter', system-ui, sans-serif",
      overflow: "hidden",
    }}>
      {!isMobile && (
        <aside style={{
          display: "flex", flexDirection: "column",
          background: C.secondary,
          width: sidebarCollapsed ? 72 : 240,
          padding: sidebarCollapsed ? "28px 10px" : "28px 16px",
          transition: "width 0.3s ease, padding 0.3s ease",
          height: "100vh", position: "sticky", top: 0,
          flexShrink: 0, zIndex: 110,
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              position: "absolute", right: -14, top: 38,
              width: 28, height: 28,
              background: C.primary, border: "none",
              borderRadius: "50%", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 2px 8px ${C.primary}66`,
              zIndex: 120, transition: "transform 0.2s",
            }}
          >
            <ChevronLeft size={14} color={C.white} style={{ transform: sidebarCollapsed ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
          </button>
          <Sidebar />
        </aside>
      )}

      {mobileMenuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: C.secondary,
          zIndex: 200, padding: "20px",
        }}>
          <Sidebar isMobileView />
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <Header />
        <main style={{
          flex: 1, overflowY: "auto", padding: isMobile ? "16px" : "24px 28px",
          scrollbarWidth: "thin",
        }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            {activeTab === "geral"        && <TabGeral />}
            {activeTab === "mapa"         && <TabMapa />}
            {activeTab === "geomarketing" && <TabGeomarketing />}
            {activeTab === "denuncias"    && <TabDenuncias />}
            {activeTab === "relatorios"   && <TabRelatorios />}
          </div>
        </main>
      </div>
    </div>
  );
}
