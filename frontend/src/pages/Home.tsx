import { useState, useEffect, useMemo, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { Link } from 'react-router-dom';
import { UnifiedStoreSlider } from '@/components/Global/UnifiedStoreSlider';
import { RecommendedFilters } from '@/components/Global/RecommendedFilters';
import { SuggestionsSlider } from '@/components/Global/SuggestionsSlider';
import { EventoCarrossel } from '@/components/Global/EventoCarrossel';
// import BannerSlider from '@/components/Global/BannerSlider';
import { mockHybridSliderData, getRestaurantesProximos } from '@/services/mockData';
import { ArrowRight, Search, Star, MapPin, Bell, User, Store, Package } from 'lucide-react';
import type { Produto } from '@/types/global';

const T = {
  orange: "var(--primary)",
  orangeLight: "var(--primary-light)",
  orangeDark: "var(--primary-dark)",
  orangePale: "var(--primary-pale)",
  orangeMid: "var(--primary-mid)",
  green: "var(--secondary)",
  greenMid: "var(--secondary-mid)",
  greenLight: "var(--secondary-light)",
  greenPale: "var(--secondary-pale)",
  cream: "var(--cream)",
  creamDark: "var(--cream-dark)",
  black: "var(--black)",
  darkBg: "var(--dark-bg)",
  grayText: "var(--gray-text)",
  grayBorder: "var(--gray-border)",
  white: "var(--white)",
};


function SectionHeader({ title, subtitle, linkText, to }: { title: string, subtitle?: string, linkText?: string, to?: string }) {
  return (
    <div className="flex items-end justify-between px-4">
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: T.black, margin: 0, fontFamily: "'Georgia', serif" }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 12, color: T.grayText, margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
      {linkText && to && (
        <Link to={to} style={{ fontSize: 13, fontWeight: 700, color: T.orange, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
          {linkText}
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </Link>
      )}
    </div>
  );
}
//animações Tenho que levar para outro arquivo depois
function LunchIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/enjoy-food.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🍔</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function PizzaIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/pizza.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🍕</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function CrabIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/crab.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🦀</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function JaponeseIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/steaming-bowl.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🍣</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function ConstrucaoIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/shovel.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🌿</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function TecnologiaIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/robot-arm.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🌿</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function InstrumentoIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/violin.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🌿</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}

function FarmaciaIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let animation: any;

    import('lottie-web')
      .then(({ default: lottie }) => {
        if (cancelled || !containerRef.current) return;

        animation = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/first-aid-kit.json',
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
        }
      });

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, []);

  if (failed) {
    return <span className="text-3xl">🌿</span>;
  }

  return <div ref={containerRef} className="w-14 h-14 -m-1 pointer-events-none" />;
}
//animações acima
function CategoryGrid() {
  const cats = [
    { icon: "🍔", label: "Lanches", path: "/culinaria" },
    { icon: "🍕", label: "Pizzas", path: "/culinaria" },
    { icon: "🦀", label: "Frutos do Mar", path: "/culinaria" },
    { icon: "🍣", label: "Japonesa", path: "/culinaria" },
    { icon: "🔨", label: "Construção", path: "/culinaria" },
    { icon: "🦾", label: "Tecnologia", path: "/comercios" },
    { icon: "🎻", label: "Instrumentos", path: "/comercios" },
    { icon: "💊", label: "Farmácia", path: "/comercios" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2.5 px-4">
      {cats.map(c => (
        <Link 
          key={c.label} 
          to={c.path}
          className="bg-[var(--cream)] rounded-2xl p-3.5 border border-[var(--cream-dark)] flex flex-col items-center gap-1.5 transition-all duration-200 hover:bg-[var(--primary-pale)] hover:border-[var(--primary-mid)] active:scale-95 cursor-pointer"
        >
          <span className="flex items-center justify-center w-14 h-14">
            {c.label === 'Lanches' ? (
              <LunchIcon />
            ) : c.label === 'Pizzas' ? (
              <PizzaIcon />
            ) : c.label === 'Frutos do Mar' ? (
              <CrabIcon />
            ) : c.label === 'Japonesa' ? (
              <JaponeseIcon />
            ) : c.label === 'Construção' ? (
              <ConstrucaoIcon />
            ) : c.label === 'Tecnologia' ? (
              <TecnologiaIcon />
            ) : c.label === 'Instrumentos' ? (
              <InstrumentoIcon />
            ) : c.label === 'Farmácia' ? (
              <FarmaciaIcon />
            ):(
              <span className="text-3xl">{c.icon}</span>
            )}
          </span>
          <span className="text-[11px] font-semibold text-[var(--black)]">{c.label}</span>
        </Link>
      ))}
    </div>
  );
}

function PromoStrip({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <div className={`mx-4 rounded-[32px] overflow-hidden bg-[var(--secondary)] relative p-8 sm:p-12 min-h-[620px] ${className}`}>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-8xl opacity-10 select-none rotate-12 pointer-events-none">🦀</div>
      <div className="relative z-10 h-full">
        {children || (
          <>
            <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest mb-1">Oferta relâmpago</p>
            <h3 className="text-xl font-extrabold text-white mb-1.5" style={{ fontFamily: "'Georgia', serif" }}>Tudo por R$ 0,90</h3>
            <p className="text-xs text-white/70 mb-3.5">Peça já nos restaurantes selecionados</p>
            <button className="bg-[var(--primary)] text-white border-none rounded-full px-5 py-2 text-[13px] font-bold transition-transform active:scale-95">
              Aproveitar →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function RandomProductShowcase() {
  const { comercios } = useData();
  const [selectedProducts, setSelectedProducts] = useState<{comercioId: string, comercioNome: string, produto: Produto}[]>([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const pickProducts = () => {
      const allProducts: {comercioId: string, comercioNome: string, produto: Produto}[] = [];
      comercios.forEach(c => {
        if (c.produtos && c.produtos.length > 0) {
          c.produtos.forEach(p => {
            allProducts.push({ comercioId: c.id, comercioNome: c.nome, produto: p });
          });
        }
      });

      if (allProducts.length === 0) return;

      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      setSelectedProducts(shuffled.slice(0, 4));
      setKey(prev => prev + 1);
    };

    pickProducts();
    const interval = setInterval(pickProducts, 30000);
    return () => clearInterval(interval);
  }, [comercios]);

  if (selectedProducts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-widest">Ofertas Relâmpago</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          <span className="text-[9px] text-white/40 uppercase font-medium">Novas ofertas em 30s</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" key={key}>
        {selectedProducts.map((item, idx) => (
          <div 
            key={`${item.produto.id}-${idx}`}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col gap-2 transition-all hover:bg-white/10 animate-toss shadow-lg"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="w-full aspect-square bg-[var(--cream)] rounded-xl flex items-center justify-center text-3xl overflow-hidden shadow-inner">
              {item.produto.imagem ? (
                <img src={item.produto.imagem} alt={item.produto.nome} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              ) : (
                <Package className="w-5 h-5 text-[var(--gray-text)]" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[9px] font-bold text-[var(--primary-light)] truncate uppercase tracking-tight">{item.comercioNome}</p>
              <p className="text-xs font-bold text-white truncate leading-tight">{item.produto.nome}</p>
              <p className="text-sm font-black text-white mt-0.5">
                R$ {item.produto.preco?.toFixed(2) || '0,00'}
              </p>
            </div>
            <Link 
              to={`/comercios/${item.comercioId}`}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 hover:scale-105 transition-transform font-bold cursor-pointer"
            >
              +
            </Link>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toss {
          0% { transform: scale(0.5) translateY(100px) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.1) translateY(-10px) rotate(5deg); }
          100% { transform: scale(1) translateY(0) rotate(0); opacity: 1; }
        }
        .animate-toss { animation: toss 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
      `}</style>
    </div>
  );
}

export function Home() {
  const { comercios, randomCategories, eventos } = useData();
  const [filtroAtual, setFiltroAtual] = useState<{ name: string }>({ name: 'Todos' });
  const [searchTerm, setSearchTerm] = useState('');

  const restaurantesProximos = getRestaurantesProximos();
  
  // Aleatoriza a lista de comércios ao carregar a página
  const shuffledComercios = useMemo(() => {
    return [...comercios].sort(() => Math.random() - 0.5);
  }, [comercios]);

  // Filtra comércios por termo de busca
  const comerciosFiltrados = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const termo = searchTerm.toLowerCase();
    return comercios.filter(c => 
      (c.nome || '').toLowerCase().includes(termo) || 
      (c.categoria && c.categoria.toLowerCase().includes(termo))
    );
  }, [searchTerm, comercios]);

  const lojasExibidas =
    filtroAtual.name === 'Todos' || filtroAtual.name === 'Tudo'
      ? shuffledComercios
      : shuffledComercios.filter(c => c.categoria === filtroAtual.name);

  // Seleção robusta para "Lojas & Serviços": tente pegar 2 lojas + 2 restaurantes de forma aleatória.
  const restaurantesList = lojasExibidas.filter(c => {
    const cat = (c.categoria || '').toString().toLowerCase();
    return cat.includes('culin') || cat.includes('rest') || cat.includes('restaurante');
  });
  const lojasList = lojasExibidas.filter(c => {
    const cat = (c.categoria || '').toString().toLowerCase();
    return !(cat.includes('culin') || cat.includes('rest') || cat.includes('restaurante'));
  });

  const take = (arr: any[], n: number) => arr.slice(0, n);
  const lojasTake = take(lojasList, 2);
  const restosNeeded = Math.max(0, 4 - lojasTake.length);
  const restaurantesTake = take(restaurantesList, Math.min(2, restosNeeded === 0 ? 2 : restosNeeded));

  let exibidosLojasServicos = [...lojasTake, ...restaurantesTake];
  if (exibidosLojasServicos.length < 4) {
    const remaining = 4 - exibidosLojasServicos.length;
    const pool = [...lojasList.filter(x => !exibidosLojasServicos.includes(x)), ...restaurantesList.filter(x => !exibidosLojasServicos.includes(x))];
    exibidosLojasServicos = [...exibidosLojasServicos, ...take(pool, remaining)];
  }

  // Mapeia eventos para o formato esperado pelo EventoCarrossel
  const mappedEventos = eventos.map(ev => ({
    id: ev.id,
    nome: ev.nome,
    descricao: ev.descricao,
    imagem: ev.imagem,
    inicio: ev.inicio,
    fim: ev.fim,
    local: ev.localizacao
  }));

  return (
    <div className="flex flex-col min-h-screen bg-[var(--cream)] pb-8 md:pb-8">
      {/* Custom Header for Home */}
      

      {/* Hero Section */}
      <section className="w-full">
        <UnifiedStoreSlider stores={mockHybridSliderData} />
      </section>

      {/* Search Bar - Overlaid style from Homeadapt */}
      <div className="px-4 -mt-5 relative z-50">
        <div className="bg-white rounded-2xl shadow-lg flex items-center gap-2.5 px-4 py-3 border border-black/5">
          <Search className="w-[18px] h-[18px] text-[var(--gray-text)]" />
          <input
            type="text"
            placeholder="Buscar em Aracaju..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-none outline-none text-sm text-[var(--black)] bg-transparent placeholder:text-[var(--gray-text)]"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-[var(--gray-text)]">
              <span className="text-xl leading-none cursor-pointer">×</span>
            </button>
          )}
        </div>
      </div>

      <div className="h-8" />

      {searchTerm.trim() ? (
        // Resultados de Busca
        <section className="flex flex-col gap-4 py-6 sm:py-8 ">
          <SectionHeader title={`Resultados para "${searchTerm}"`} subtitle={`${comerciosFiltrados.length} lojas encontradas`} />
          <div className="px-4 flex flex-col gap-3">
            {comerciosFiltrados.length > 0 ? (
              comerciosFiltrados.map((c) => (
                <Link 
                  key={c.id} 
                  to={`/comercios/${c.id}`}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[var(--gray-border)] transition-all hover:translate-x-1 active:scale-[0.98]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--cream)] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {c.imagem ? (
                      <img src={c.imagem} alt={c.nome} className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-5 h-5 text-[var(--gray-text)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 ">
                    <p className="text-sm font-extrabold text-[var(--black)] mb-0.5 truncate">{c.nome}</p>
                    <p className="text-[11px] text-[var(--gray-text)] mb-1">{c.categoria} • 10-15 min</p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[var(--primary)] text-[var(--primary)]" />
                        <span className="text-[11px] font-bold text-[var(--black)]">4.9</span>
                      </div>
                      <span className="w-0.5 h-0.5 rounded-full bg-[var(--gray-border)]" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--gray-border)]" />
                </Link>
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-[var(--gray-text)]">Nenhuma loja encontrada para "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* Categorias Rápidas */}
          <div className="flex flex-col gap-3.5 py-6 sm:py-8 ">
            <SectionHeader title="O que você quer?" />
            <CategoryGrid />
          </div>

          <div className="h-10" />

          {/* Sugestões para você */}
          <section className="flex flex-col gap-4 py-6 sm:py-8 ">
            <SectionHeader 
              title="Sugestões para você" 
              subtitle="Com base na sua localização" 
              linkText="Ver mais" 
              to="/sugestoes"
            />
            <SuggestionsSlider comercios={comercios} />          </section>

          <div className="h-10" />

          {/* Promo Strip #1 - Random Product Showcase */}
          <PromoStrip>
            <RandomProductShowcase />
          </PromoStrip>

          <div className="h-24" />

          {/* Restaurantes Próximos */}
          <section className="flex flex-col gap-4 py-6 sm:py-8">
            <SectionHeader 
              title="Próximos a você" 
              subtitle="Restaurantes a menos de 3 km" 
              linkText="Ver tudo" 
              to="/culinaria"
            />
            <SuggestionsSlider comercios={restaurantesProximos} />
          </section>

          <div className="h-12" />

          

          <div className="h-12" />

          <EventoCarrossel eventos={mappedEventos} />

          <div className="h-12" />

          {/* Filtros Horizontais */}
          <div className="py-6">
            <RecommendedFilters 
              filtrosRecomendados={randomCategories}
              filtroAtual={filtroAtual}
              setFiltroAtual={(name) => setFiltroAtual({ name: name === 'Tudo' ? 'Todos' : name })}
              navigateOnSelect={false}
              center={false}
              showMoreOnMobile={true}
              useAnimatedIcons={true}
            />
          </div>

          <div className="h-10" />

          {/* Lojas & Serviços */}
          <section className="flex flex-col gap-4 py-6 sm:py-8">
            <SectionHeader 
              title="Lojas & Serviços" 
              subtitle="Delivery de tudo" 
              linkText="Ver tudo" 
              to="/comercios"
            />
            <div className="px-4 flex flex-col gap-3">
              {exibidosLojasServicos.map((c) => (
                <Link 
                  key={c.id} 
                  to={`/comercios/${c.id}`}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[var(--gray-border)] transition-all hover:translate-x-1 active:scale-[0.98]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--cream)] flex items-center justify-center overflow-hidden flex-shrink-0">
                    {c.imagem ? (
                      <img src={c.imagem} alt={c.nome} className="w-full h-full object-cover" />
                    ) : (
                      <Store className="w-5 h-5 text-[var(--gray-text)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-[var(--black)] mb-0.5 truncate">{c.nome}</p>
                    <p className="text-[11px] text-[var(--gray-text)] mb-1">{c.categoria} • 10-15 min</p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[var(--primary)] text-[var(--primary)]" />
                        <span className="text-[11px] font-bold text-[var(--black)]">4.9</span>
                      </div>
                      <span className="w-0.5 h-0.5 rounded-full bg-[var(--gray-border)]" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--gray-border)]" />
                </Link>
              ))}
            </div>
          </section>

          <div className="h-12" />

          {/* Footer Branding */}
          <div className="mx-4 p-8 bg-[var(--secondary)] rounded-[20px] text-center">
            {/* <p className="text-3xl mb-1">🦀</p>
            <p className="text-lg font-extrabold text-white mb-1" style={{ fontFamily: "'Georgia', serif" }}>Mercado Central</p>
            <p className="text-[11px] text-white/60">O melhor de Aracaju na sua tela</p> */}
          </div>
        </>
      )}

    </div>
  );
}
