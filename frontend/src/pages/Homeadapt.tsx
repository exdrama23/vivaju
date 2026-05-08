// import { useState, useEffect, useRef } from "react";

// // ─── Design Tokens (paleta extraída da logo) ───────────────────────────────
// const T = {
//   orange: "#E8611A",
//   orangeLight: "#F0793A",
//   orangeDark: "#C04E10",
//   orangePale: "#FDF0E8",
//   orangeMid: "#FDDFC8",
//   green: "#2D5016",
//   greenMid: "#3D6B1F",
//   greenLight: "#4E8A28",
//   greenPale: "#EBF2E3",
//   cream: "#F7F0E4",
//   creamDark: "#EDE3D0",
//   black: "#0A0A0A",
//   darkBg: "#121008",
//   grayText: "#7A6E60",
//   grayBorder: "#E8E0D0",
//   white: "#FFFFFF",
// };

// // ─── Mock Data ────────────────────────────────────────────────────────────
// const mockBanners = [
//   { id: 1, tag: "Novidade", title: "Almoço no centro", sub: "Até 30% off nos restaurantes parceiros", bg: T.green, accent: T.orange },
//   { id: 2, tag: "Destaque", title: "Frete grátis hoje", sub: "Em pedidos acima de R$ 30 na região", bg: T.orangeDark, accent: T.cream },
//   { id: 3, tag: "Culinária local", title: "Sabores de Sergipe", sub: "Descubra o melhor da gastronomia regional", bg: "#1a2e0a", accent: T.orangeLight },
// ];

// const mockFilters = ["Todos", "Restaurantes", "Lanches", "Doces", "Farmácias", "Mercados", "Moda", "Eletrônicos"];

// const mockRestaurants = [
//   { id: 1, name: "Cozinha Sergipana", cat: "Comida Nordestina", time: "25–35 min", fee: "Grátis", rating: 4.8, tag: "Popular", img: "🦀" },
//   { id: 2, name: "Burguer do Centro", cat: "Hamburgueria", time: "20–30 min", fee: "R$ 3,99", rating: 4.6, tag: "Oferta", img: "🍔" },
//   { id: 3, name: "Sushi Aracaju", cat: "Sushi", time: "40–50 min", fee: "R$ 5,00", rating: 4.7, tag: null, img: "🍣" },
//   { id: 4, name: "Pizza da Orla", cat: "Pizzaria", time: "30–40 min", fee: "Grátis", rating: 4.5, tag: "Novo", img: "🍕" },
//   { id: 5, name: "Açaí Premium", cat: "Sobremesas", time: "15–20 min", fee: "R$ 2,00", rating: 4.9, tag: "Popular", img: "🫐" },
//   { id: 6, name: "Tapioca Real", cat: "Comida Nordestina", time: "20–25 min", fee: "Grátis", rating: 4.7, tag: null, img: "🫓" },
// ];

// const mockLojas = [
//   { id: 1, name: "Farmácia Central", cat: "Farmácia", time: "10–15 min", fee: "Grátis", rating: 4.9, img: "💊" },
//   { id: 2, name: "Mercado do Povo", cat: "Mercado", time: "20–30 min", fee: "R$ 4,00", rating: 4.4, img: "🛒" },
//   { id: 3, name: "Moda Sergipe", cat: "Moda", time: "Agendado", fee: "R$ 6,00", rating: 4.3, img: "👗" },
//   { id: 4, name: "Tech Store", cat: "Eletrônicos", time: "Agendado", fee: "R$ 8,00", rating: 4.5, img: "📱" },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────
// function StarIcon() {
//   return (
//     <svg width="12" height="12" viewBox="0 0 12 12" fill={T.orange}>
//       <path d="M6 1l1.4 2.8 3.1.45-2.25 2.2.53 3.1L6 8.15 3.22 9.55l.53-3.1L1.5 4.25l3.1-.45z" />
//     </svg>
//   );
// }

// function Badge({ children, variant = "orange" }) {
//   const styles = {
//     orange: { bg: T.orange, color: T.white },
//     green: { bg: T.greenMid, color: T.white },
//     cream: { bg: T.creamDark, color: T.green },
//   };
//   const s = styles[variant] || styles.orange;
//   return (
//     <span style={{
//       background: s.bg, color: s.color,
//       fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
//       padding: "2px 7px", borderRadius: 99, textTransform: "uppercase",
//     }}>
//       {children}
//     </span>
//   );
// }

// // ─── Components ───────────────────────────────────────────────────────────

// function HeroBanner() {
//   const [active, setActive] = useState(0);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     timerRef.current = setInterval(() => setActive(a => (a + 1) % mockBanners.length), 4000);
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const b = mockBanners[active];

//   return (
//     <div style={{ position: "relative", width: "100%", height: 260, overflow: "hidden", borderRadius: 0 }}>
//       {mockBanners.map((banner, i) => (
//         <div key={banner.id} style={{
//           position: "absolute", inset: 0,
//           background: banner.bg,
//           opacity: i === active ? 1 : 0,
//           transition: "opacity 0.7s ease",
//           display: "flex", flexDirection: "column", justifyContent: "flex-end",
//           padding: "28px 24px",
//         }}>
//           <div style={{
//             position: "absolute", inset: 0, opacity: 0.07,
//             backgroundImage: `repeating-linear-gradient(45deg, ${banner.accent} 0, ${banner.accent} 1px, transparent 0, transparent 50%)`,
//             backgroundSize: "24px 24px",
//           }} />
//           <div style={{ position: "relative", zIndex: 1 }}>
//             <span style={{ fontSize: 10, fontWeight: 700, color: banner.accent, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.9 }}>
//               {banner.tag}
//             </span>
//             <h1 style={{ fontSize: 26, fontWeight: 800, color: T.white, margin: "4px 0 6px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
//               {banner.title}
//             </h1>
//             <p style={{ fontSize: 13, color: T.white, opacity: 0.8, margin: 0 }}>{banner.sub}</p>
//           </div>
//         </div>
//       ))}

//       {/* Dots */}
//       <div style={{ position: "absolute", bottom: 16, right: 20, display: "flex", gap: 6, zIndex: 10 }}>
//         {mockBanners.map((_, i) => (
//           <button key={i} onClick={() => setActive(i)} style={{
//             width: i === active ? 20 : 6, height: 6,
//             borderRadius: 99, border: "none", cursor: "pointer",
//             background: i === active ? T.orange : "rgba(255,255,255,0.4)",
//             transition: "all 0.3s ease", padding: 0,
//           }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SearchBar() {
//   const [val, setVal] = useState("");
//   return (
//     <div style={{ padding: "0 16px", marginTop: -20, position: "relative", zIndex: 20 }}>
//       <div style={{
//         background: T.white, borderRadius: 16,
//         boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
//         display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
//       }}>
//         <svg width="18" height="18" fill="none" stroke={T.grayText} strokeWidth="2" viewBox="0 0 24 24">
//           <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//         </svg>
//         <input
//           value={val} onChange={e => setVal(e.target.value)}
//           placeholder="Buscar em Aracaju..."
//           style={{
//             flex: 1, border: "none", outline: "none", fontSize: 14,
//             color: T.black, background: "transparent", fontFamily: "inherit",
//           }}
//         />
//         {val && (
//           <button onClick={() => setVal("")} style={{ border: "none", background: "none", cursor: "pointer", padding: 2 }}>
//             <svg width="16" height="16" fill="none" stroke={T.grayText} strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M18 6 6 18M6 6l12 12" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function FilterChips({ active, onSelect }) {
//   return (
//     <div style={{ overflowX: "auto", padding: "0 16px", display: "flex", gap: 8, scrollbarWidth: "none" }}>
//       {mockFilters.map(f => {
//         const isActive = f === active;
//         return (
//           <button key={f} onClick={() => onSelect(f)} style={{
//             flexShrink: 0, padding: "8px 16px", borderRadius: 99, fontSize: 13, fontWeight: 600,
//             border: isActive ? "none" : `1.5px solid ${T.grayBorder}`,
//             background: isActive ? T.orange : T.white,
//             color: isActive ? T.white : T.grayText,
//             cursor: "pointer", transition: "all 0.2s ease",
//             fontFamily: "inherit",
//           }}>
//             {f}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function SectionHeader({ title, subtitle, linkText }) {
//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 16px" }}>
//       <div>
//         <h2 style={{ fontSize: 18, fontWeight: 800, color: T.black, margin: 0, fontFamily: "'Georgia', serif" }}>{title}</h2>
//         {subtitle && <p style={{ fontSize: 12, color: T.grayText, margin: "2px 0 0" }}>{subtitle}</p>}
//       </div>
//       {linkText && (
//         <a href="#" style={{ fontSize: 13, fontWeight: 700, color: T.orange, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
//           {linkText}
//           <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//             <path d="M5 12h14M12 5l7 7-7 7" />
//           </svg>
//         </a>
//       )}
//     </div>
//   );
// }

// function RestaurantCard({ item }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: T.white, borderRadius: 16, overflow: "hidden",
//         border: `1.5px solid ${hovered ? T.orangeMid : T.grayBorder}`,
//         transition: "all 0.22s ease",
//         transform: hovered ? "translateY(-2px)" : "translateY(0)",
//         cursor: "pointer", flexShrink: 0, width: 200,
//       }}
//     >
//       {/* Image area */}
//       <div style={{
//         height: 110, background: T.cream,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 48, position: "relative",
//       }}>
//         {item.img}
//         {item.tag && (
//           <div style={{ position: "absolute", top: 8, left: 8 }}>
//             <Badge variant={item.tag === "Oferta" ? "green" : "orange"}>{item.tag}</Badge>
//           </div>
//         )}
//         {item.fee === "Grátis" && (
//           <div style={{ position: "absolute", bottom: 8, right: 8 }}>
//             <Badge variant="green">Frete grátis</Badge>
//           </div>
//         )}
//       </div>
//       {/* Info */}
//       <div style={{ padding: "10px 12px 12px" }}>
//         <p style={{ fontSize: 14, fontWeight: 700, color: T.black, margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
//         <p style={{ fontSize: 11, color: T.grayText, margin: "0 0 8px" }}>{item.cat}</p>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
//             <StarIcon />
//             <span style={{ fontSize: 12, fontWeight: 700, color: T.black }}>{item.rating}</span>
//           </div>
//           <span style={{ fontSize: 11, color: T.grayText }}>{item.time}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function HorizontalScroll({ children }) {
//   return (
//     <div style={{ overflowX: "auto", padding: "4px 16px 4px", display: "flex", gap: 12, scrollbarWidth: "none" }}>
//       {children}
//     </div>
//   );
// }

// function PromoStrip() {
//   return (
//     <div style={{ margin: "0 16px", borderRadius: 20, overflow: "hidden", background: T.green, position: "relative", padding: "20px 24px" }}>
//       <div style={{
//         position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
//         fontSize: 80, opacity: 0.12, userSelect: "none",
//       }}>🦀</div>
//       <div style={{ position: "relative", zIndex: 1 }}>
//         <p style={{ fontSize: 10, fontWeight: 700, color: T.orange, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 4px" }}>Oferta relâmpago</p>
//         <h3 style={{ fontSize: 20, fontWeight: 800, color: T.white, margin: "0 0 6px", fontFamily: "'Georgia', serif" }}>Tudo por R$ 0,90</h3>
//         <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: "0 0 14px" }}>Peça já nos restaurantes selecionados</p>
//         <button style={{
//           background: T.orange, color: T.white, border: "none",
//           borderRadius: 99, padding: "8px 20px", fontSize: 13, fontWeight: 700,
//           cursor: "pointer", fontFamily: "inherit",
//         }}>
//           Aproveitar →
//         </button>
//       </div>
//     </div>
//   );
// }

// function StoreCard({ item }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
//         background: T.white, borderRadius: 14,
//         border: `1.5px solid ${hovered ? T.orangeMid : T.grayBorder}`,
//         transition: "all 0.2s ease",
//         transform: hovered ? "translateX(2px)" : "translateX(0)",
//         cursor: "pointer",
//       }}
//     >
//       <div style={{
//         width: 48, height: 48, borderRadius: 12, background: T.cream,
//         display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
//       }}>{item.img}</div>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontSize: 14, fontWeight: 700, color: T.black, margin: "0 0 1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
//         <p style={{ fontSize: 11, color: T.grayText, margin: "0 0 4px" }}>{item.cat} · {item.time}</p>
//         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
//             <StarIcon />
//             <span style={{ fontSize: 11, fontWeight: 700, color: T.black }}>{item.rating}</span>
//           </div>
//           <span style={{ width: 3, height: 3, borderRadius: 99, background: T.grayBorder, display: "inline-block" }} />
//           <span style={{ fontSize: 11, color: item.fee === "Grátis" ? T.greenLight : T.grayText, fontWeight: item.fee === "Grátis" ? 600 : 400 }}>{item.fee}</span>
//         </div>
//       </div>
//       <svg width="16" height="16" fill="none" stroke={T.grayBorder} strokeWidth="2" viewBox="0 0 24 24">
//         <path d="M9 18l6-6-6-6" />
//       </svg>
//     </div>
//   );
// }

// function CategoryGrid() {
//   const cats = [
//     { icon: "🍔", label: "Lanches" },
//     { icon: "🍕", label: "Pizzas" },
//     { icon: "🦀", label: "Frutos do Mar" },
//     { icon: "🍣", label: "Japonesa" },
//     { icon: "🌿", label: "Vegano" },
//     { icon: "☕", label: "Café" },
//     { icon: "🛒", label: "Mercado" },
//     { icon: "💊", label: "Farmácia" },
//   ];
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, padding: "0 16px" }}>
//       {cats.map(c => (
//         <button key={c.label} style={{
//           background: T.cream, borderRadius: 14, padding: "14px 8px",
//           border: `1.5px solid ${T.creamDark}`, display: "flex", flexDirection: "column",
//           alignItems: "center", gap: 6, cursor: "pointer", transition: "all 0.18s ease",
//           fontFamily: "inherit",
//         }}
//           onMouseEnter={e => { e.currentTarget.style.background = T.orangePale; e.currentTarget.style.borderColor = T.orangeMid; }}
//           onMouseLeave={e => { e.currentTarget.style.background = T.cream; e.currentTarget.style.borderColor = T.creamDark; }}
//         >
//           <span style={{ fontSize: 26 }}>{c.icon}</span>
//           <span style={{ fontSize: 11, fontWeight: 600, color: T.black }}>{c.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// }

// function BottomNav() {
//   const [active, setActive] = useState(0);
//   const items = [
//     { icon: "🏠", label: "Início" },
//     { icon: "🔍", label: "Explorar" },
//     { icon: "🛍️", label: "Pedidos" },
//     { icon: "👤", label: "Perfil" },
//   ];
//   return (
//     <div style={{
//       position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
//       width: "100%", maxWidth: 430, background: T.white,
//       borderTop: `1px solid ${T.grayBorder}`,
//       display: "flex", padding: "8px 0 16px", zIndex: 100,
//     }}>
//       {items.map((it, i) => (
//         <button key={i} onClick={() => setActive(i)} style={{
//           flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
//           border: "none", background: "none", cursor: "pointer", padding: 0,
//         }}>
//           <span style={{ fontSize: 22 }}>{it.icon}</span>
//           <span style={{ fontSize: 10, fontWeight: i === active ? 700 : 400, color: i === active ? T.orange : T.grayText, fontFamily: "inherit" }}>{it.label}</span>
//           {i === active && <div style={{ width: 4, height: 4, borderRadius: 99, background: T.orange, marginTop: 1 }} />}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ─── App ──────────────────────────────────────────────────────────────────
// export default function Home() {
//   const [filter, setFilter] = useState("Todos");

//   return (
//     <div style={{
//       fontFamily: "'Helvetica Neue', Arial, sans-serif",
//       background: T.cream, minHeight: "100vh",
//       maxWidth: 430, margin: "0 auto", position: "relative",
//       paddingBottom: 80,
//     }}>
//       {/* Header */}
//       <div style={{
//         position: "sticky", top: 0, zIndex: 50,
//         background: T.white, borderBottom: `1px solid ${T.grayBorder}`,
//         padding: "12px 16px 10px",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//       }}>
//         <div>
//           <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//             <span style={{ fontSize: 18 }}>📍</span>
//             <div>
//               <p style={{ fontSize: 10, color: T.grayText, margin: 0, lineHeight: 1 }}>Entregar em</p>
//               <p style={{ fontSize: 14, fontWeight: 800, color: T.black, margin: 0 }}>Centro, Aracaju</p>
//             </div>
//             <svg width="14" height="14" fill="none" stroke={T.orange} strokeWidth="2.5" viewBox="0 0 24 24">
//               <path d="m6 9 6 6 6-6" />
//             </svg>
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: 10 }}>
//           <button style={{ background: T.orangePale, border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <svg width="18" height="18" fill="none" stroke={T.orange} strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
//             </svg>
//           </button>
//           <button style={{ background: T.cream, border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <svg width="18" height="18" fill="none" stroke={T.black} strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Hero Banner */}
//       <HeroBanner />

//       {/* Search */}
//       <SearchBar />

//       {/* Espaço */}
//       <div style={{ height: 24 }} />

//       {/* Categorias */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         <SectionHeader title="O que você quer?" />
//         <CategoryGrid />
//       </div>

//       {/* Divider */}
//       <div style={{ height: 24 }} />

//       {/* Filtros */}
//       <FilterChips active={filter} onSelect={setFilter} />

//       <div style={{ height: 24 }} />

//       {/* Promo Strip */}
//       <PromoStrip />

//       <div style={{ height: 28 }} />

//       {/* Restaurantes Próximos */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         <SectionHeader title="Próximos a você" subtitle="Restaurantes a menos de 3 km" linkText="Ver tudo" />
//         <HorizontalScroll>
//           {mockRestaurants.map(r => <RestaurantCard key={r.id} item={r} />)}
//         </HorizontalScroll>
//       </div>

//       <div style={{ height: 28 }} />

//       {/* Segundas Sugestões */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         <SectionHeader title="Sugestões para você" subtitle="Com base na sua localização" linkText="Ver mais" />
//         <HorizontalScroll>
//           {[...mockRestaurants].reverse().map(r => <RestaurantCard key={r.id + "_s"} item={r} />)}
//         </HorizontalScroll>
//       </div>

//       <div style={{ height: 28 }} />

//       {/* Mini Banner verde */}
//       <div style={{ margin: "0 16px", borderRadius: 20, background: T.orangePale, border: `1.5px solid ${T.orangeMid}`, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
//         <span style={{ fontSize: 36 }}>🎉</span>
//         <div>
//           <p style={{ fontSize: 13, fontWeight: 800, color: T.orangeDark, margin: "0 0 2px" }}>Indique e ganhe</p>
//           <p style={{ fontSize: 11, color: T.grayText, margin: 0 }}>Convide amigos e ganhe créditos para seus pedidos</p>
//         </div>
//       </div>

//       <div style={{ height: 28 }} />

//       {/* Lojas & Serviços */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//         <SectionHeader title="Lojas & Serviços" subtitle="Delivery de tudo" linkText="Ver tudo" />
//         <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 8 }}>
//           {mockLojas.map(l => <StoreCard key={l.id} item={l} />)}
//         </div>
//       </div>

//       <div style={{ height: 28 }} />

//       {/* Footer branding */}
//       <div style={{ margin: "0 16px", padding: "20px", background: T.green, borderRadius: 20, textAlign: "center" }}>
//         <p style={{ fontSize: 22, margin: "0 0 4px" }}>🦀</p>
//         <p style={{ fontSize: 16, fontWeight: 800, color: T.white, fontFamily: "'Georgia', serif", margin: "0 0 4px" }}>Mercado Central</p>
//         <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>O melhor de Aracaju na sua tela</p>
//       </div>

//       <div style={{ height: 8 }} />

//       {/* Bottom Nav */}
//       <BottomNav />
//     </div>
//   );
// }