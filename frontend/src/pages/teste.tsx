import React, { useState, useMemo } from 'react';
import { ChevronLeft, Heart, Search, Star, ChevronRight, Phone, MapPin, Navigation, AtSign, Info, X, ChevronDown } from 'lucide-react';

interface MenuItem {
  id: number;
  title: string;
  image: string;
  badge?: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  badge?: string;
}

const highlights: MenuItem[] = [
  {
    id: 1,
    title: 'Estrogonofe de Frango N1',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80',
    badge: 'Mais pedido',
  },
  {
    id: 2,
    title: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Promocional P - indicamos para...',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Combo Família N1',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
  },
];

const generateProducts = (): Product[] => {
  const prodList: Product[] = [];
  const names = [
    'Frango Assado Inteiro', 'Porção de Batata Frita', 'Anéis de Cebola', 'Salada Caesar',
    'Wrap de Frango', 'Sanduíche de Carne', 'Sopa de Legumes', 'Torta de Maçã',
    'Suco de Laranja', 'Milk Shake', 'Cerveja Artesanal', 'Água Mineral',
    'Café Expresso', 'Pão de Alho', 'Espetinho de Carne', 'Porção de Mandioca',
    'Pizza Margherita', 'Calabresa Acebolada', 'Pastel de Feira', 'Coxinha',
    'Porção de Polenta', 'Feijão Tropeiro', 'Arroz Carreteiro', 'Moqueca de Peixe',
    'Lasanha Bolonhesa', 'Macarrão ao Pesto', 'Risoto de Camarão', 'Filé Mignon',
    'Picanha na Brasa', 'Costela de Porco', 'Batata Recheada', 'Frango à Passarinho',
    'Bolinho de Bacalhau', 'Camarão Frito', 'Ceviche', 'Sushi Variado',
    'Temaki', 'Yakisoba', 'Frango Xadrez', 'Rolinho Primavera',
  ];
  for (let i = 0; i < names.length; i++) {
    const oldPrice = i % 3 === 0 ? `R$ ${(Math.random() * 50 + 20).toFixed(2).replace('.', ',')}` : undefined;
    const priceNum = Math.random() * 30 + 10;
    prodList.push({
      id: i + 1,
      title: names[i],
      price: `R$ ${priceNum.toFixed(2).replace('.', ',')}`,
      oldPrice,
      discount: oldPrice ? `-${Math.floor(Math.random() * 30 + 10)}%` : undefined,
      image: `https://images.unsplash.com/photo-${i % 2 === 0 ? '1604908176997-125f25cc6f3d' : '1568901346375-23c9450c58cd'}?auto=format&fit=crop&w=400&q=80`,
      badge: i % 7 === 0 ? 'Novidade' : i % 5 === 0 ? 'Mais vendido' : undefined,
    });
  }
  return prodList;
};

const products = generateProducts();
const ITEMS_PER_PAGE = 20;

const restaurantInfo = {
  instagram: '@n1chicken_oficial',
  phone: '(11) 99999-1234',
  address: 'Rua das Frangos, 123, Centro',
  distance: '1.9 km',
};

const productCategories = ['Frango Frito', 'Combos', 'Acompanhamentos', 'Sobremesas', 'Bebidas'];

const InfoContent = () => (
  <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
    <section aria-labelledby="info-heading">
      <h2 id="info-heading" className="text-lg font-bold text-gray-900 mb-4">Informações</h2>
      <div className="space-y-3">
        <a
          href="https://instagram.com/n1chicken"
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Instagram @n1chicken_oficial"
        >
          <AtSign className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{restaurantInfo.instagram}</span>
        </a>
        <a
          href="tel:+5511999991234"
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Telefone (11) 99999-1234"
        >
          <Phone className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{restaurantInfo.phone}</span>
        </a>
        <button
          type="button"
          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Endereço ${restaurantInfo.address} distância aproximada ${restaurantInfo.distance}`}
        >
          <MapPin className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{restaurantInfo.address}</span>
            <span className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3" aria-hidden="true" />
              Aproximadamente {restaurantInfo.distance} de você
            </span>
          </div>
        </button>
      </div>
    </section>

    <section aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-lg font-bold text-gray-900 mb-4">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        {productCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            aria-label={`Categoria ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>

    <section aria-labelledby="promotions-heading">
      <h2 id="promotions-heading" className="text-lg font-bold text-gray-900 mb-4">Promoções em destaque</h2>
      <div className="space-y-3">
        {highlights.slice(0, 3).map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full text-left flex gap-3 items-center group p-2 -mx-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={`${item.title}`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs bg-orange-500 text-white px-1 rounded-sm">Novo</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  </div>
);

const SidebarContent = () => (
  <div className="space-y-6">
    <section aria-labelledby="sidebar-info-heading">
      <h2 id="sidebar-info-heading" className="text-lg font-bold text-gray-900 mb-4">Informações</h2>
      <div className="space-y-3">
        <a
          href="https://instagram.com/n1chicken"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Instagram @n1chicken_oficial"
        >
          <AtSign className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{restaurantInfo.instagram}</span>
        </a>
        <a
          href="tel:+5511999991234"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Telefone (11) 99999-1234"
        >
          <Phone className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <span className="text-sm text-gray-700">{restaurantInfo.phone}</span>
        </a>
        <button
          type="button"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition w-full text-left focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={`Endereço ${restaurantInfo.address} distância aproximada ${restaurantInfo.distance}`}
        >
          <MapPin className="w-5 h-5 text-gray-500" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700">{restaurantInfo.address}</span>
            <span className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
              <Navigation className="w-3 h-3" aria-hidden="true" />
              Aproximadamente {restaurantInfo.distance} de você
            </span>
          </div>
        </button>
      </div>
    </section>

    <section aria-labelledby="sidebar-categories-heading">
      <h2 id="sidebar-categories-heading" className="text-lg font-bold text-gray-900 mb-4">Categorias</h2>
      <div className="flex flex-wrap gap-2">
        {productCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-100 hover:text-yellow-800 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label={`Categoria ${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>

    <section aria-labelledby="sidebar-promotions-heading">
      <h2 id="sidebar-promotions-heading" className="text-lg font-bold text-gray-900 mb-4">Promoções em destaque</h2>
      <div className="space-y-3">
        {highlights.slice(0, 3).map((item) => (
          <button
            key={item.id}
            type="button"
            className="w-full text-left flex gap-3 items-center group p-2 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label={`${item.title}`}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-800 truncate">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange, isMobile = false }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; isMobile?: boolean }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between z-40">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'} transition disabled:opacity-50`}
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'} transition disabled:opacity-50`}
          aria-label="Próxima página"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }
  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginação dos produtos">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
            page === currentPage ? 'bg-yellow-400 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={`Ir para página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Próxima página"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </nav>
  );
};

export default function RestaurantProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHoveringInfoBtn, setIsHoveringInfoBtn] = useState(false);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          {/* BANNER */}
          <div className="relative h-64 lg:h-[60vh] w-full bg-yellow-400">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
              alt="Banner promocional do restaurante"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <button type="button" aria-label="Voltar" className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white">
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <div className="flex gap-3">
                <button type="button" aria-label="Favoritar" className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white">
                  <Heart className="w-5 h-5" aria-hidden="true" />
                </button>
                <button type="button" aria-label="Buscar" className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-white">
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
              <div className="w-28 h-28 lg:w-36 lg:h-36 bg-white rounded-full p-1.5 shadow-xl border-4 border-white">
                <img
                  src="https://img.freepik.com/vetores-gratis/logotipo-do-restaurante-de-frango-frito-desenhado-a-mao_23-2148425170.jpg"
                  alt="Logotipo N1 Chicken"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* CARD DE INFORMACOES */}
          <div className="relative bg-white -mt-14 mx-4 lg:mx-8 rounded-2xl shadow-md p-6 lg:p-8 z-10 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  N1 Chicken - Frango Frito Crocante
                </h1>
                <p className="text-[13px] md:text-sm text-gray-500 mt-1">
                  Entrega rastreável • 1.9 km • Min R$ 32,90
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 self-start lg:self-center shrink-0 px-3 py-1.5 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition"
                aria-label="Avaliações do restaurante"
              >
                <Star className="w-4 h-4 text-gray-800 fill-gray-800" aria-hidden="true" />
                <span className="font-bold">4,8</span>
                <span className="text-gray-500">(537)</span>
                <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">Padrão</span> • 24-39 min • <span className="font-semibold text-gray-800">R$ 8,99</span>
              </p>
              <span className="hidden sm:block text-gray-300">|</span>
              <p className="text-[13px] text-gray-500">Mais opções disponíveis na sacola</p>
            </div>
          </div>

          {/* DESTAQUES (SEM PREÇOS) */}
          <div className="px-4 lg:px-8 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Destaques</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {highlights.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex flex-col text-left group focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  aria-label={item.title}
                >
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <span className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="text-[14px] text-gray-800 font-medium leading-tight mt-1 line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* INFORMACOES (APENAS QUANDO SIDEBAR FECHADA) */}
          <div className="px-4 lg:px-8 mt-10 hidden lg:block">
            {!sidebarOpen && <InfoContent />}
          </div>

          {/* PRODUTOS COM VALORES */}
          <div className="px-4 lg:px-8 mt-10 pb-20 lg:pb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded-md">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-2 flex flex-col flex-1">
                    <div className="flex items-center gap-1 flex-wrap mt-1">
                      <span className="text-[12px] text-orange-500 font-bold">{product.price}</span>
                      {product.oldPrice && (
                        <span className="text-[12px] text-gray-400 line-through">{product.oldPrice}</span>
                      )}
                      {product.discount && (
                        <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    <h3 className="text-[14px] text-gray-800 font-medium leading-tight mt-1 line-clamp-2">
                      {product.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINACAO DESKTOP */}
            <div className="hidden lg:block">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
            {/* PAGINACAO MOBILE (fixa no rodapé) */}
            <div className="lg:hidden">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isMobile
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR (APENAS DESKTOP, VISIVEL QUANDO ABERTA) */}
        {sidebarOpen && (
          <aside className="hidden lg:block w-80 xl:w-96 bg-white border-l border-gray-200 lg:sticky lg:top-0 lg:h-screen overflow-y-auto p-6 z-30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Informações</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
                aria-label="Fechar informações"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        )}
      </div>

      {/* BOTÃO FLUTUANTE PARA ABRIR SIDEBAR (SOMENTE DESKTOP) */}
      {!sidebarOpen && (
        <div className="hidden lg:block fixed right-6 bottom-6 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={() => setIsHoveringInfoBtn(true)}
            onMouseLeave={() => setIsHoveringInfoBtn(false)}
            className="flex items-center gap-2 bg-yellow-400 text-gray-900 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
            style={{ padding: isHoveringInfoBtn ? '10px 20px 10px 16px' : '10px' }}
            aria-label="Abrir informações"
          >
            <Info className="w-6 h-6" aria-hidden="true" />
            <span
              className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHoveringInfoBtn ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'
              }`}
            >
              Informações
            </span>
          </button>
        </div>
      )}

      {/* MOBILE EXTRA INFO (abaixo dos destaques, sempre visivel) */}
      <div className="lg:hidden px-4 mt-10 pb-20">
        <InfoContent />
      </div>
    </main>
  );
}