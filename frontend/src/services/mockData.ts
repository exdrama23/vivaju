import type { Comercio, Evento, Estacionamento } from '@/types';

export interface ComercioExtendido extends Comercio {
  localizacao: string;
  resumo_avaliacoes: string;
  redes_sociais: string;
  rating: number;
  horarioFuncionamento: string;
}

export const mockComercios: ComercioExtendido[] = [
  {
    id: "c1",
    usuarioId: "u1",
    nome: "Riachuelo",
    email: "contato@riachuelo.com.br",
    telefoneContato: "(79) 2106-1500",
    localizacao: "Calcadao da Joao Pessoa, Centro, Aracaju - SE",
    categoria: "Moda e Casa",
    descricao: "Loja ampla com grande variedade de vestuario e departamentos para toda a familia.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop&q=80",
    latitude: -10.9130,
    longitude: -37.0508,
    statusAberto: true,
    favoritada: false,
    tags: ["Roupas", "Casa", "Moda"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p1-${i + 1}`,
        comercioId: "c1",
        nome: `Produto Riachuelo ${i + 1}`,
        descricao: `Descricao detalhada do produto Riachuelo numero ${i + 1} para clientes do centro.`,
        preco: 29.90 + (i * 10),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.5,
    resumo_avaliacoes: "Loja ampla com grande variedade de vestuario.",
    redes_sociais: "@riachuelo"
  },
  {
    id: "c2",
    usuarioId: "u2",
    nome: "Lojas Americanas",
    email: "atendimento@americanas.com",
    telefoneContato: "(79) 3211-2233",
    localizacao: "Calcadao da Joao Pessoa, Centro, Aracaju - SE",
    categoria: "Departamento",
    descricao: "Loja de departamentos com grande variedade de produtos, doces e utilidades.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 19h",
    imagem: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&h=500&fit=crop&q=80",
    latitude: -10.9132,
    longitude: -37.0510,
    statusAberto: true,
    favoritada: false,
    tags: ["Doces", "Eletronicos", "Utilidades"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1553413247492-4824637f3f14?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581091223247-4148783287e0?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1526170375885-45139d76467a?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1530620419223-f155c55c8c0d?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p2-${i + 1}`,
        comercioId: "c2",
        nome: `Item Americanas ${i + 1}`,
        descricao: `Item indispensavel das Lojas Americanas do Centro, numero ${i + 1}.`,
        preco: 9.90 + (i * 5),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.2,
    resumo_avaliacoes: "Otimo para compras rapidas e doces.",
    redes_sociais: "@americanas"
  },
  {
    id: "c3",
    usuarioId: "u3",
    nome: "Casas Bahia",
    email: "contato@casasbahia.com.br",
    telefoneContato: "(79) 3214-4455",
    localizacao: "Rua Sao Cristovao, Centro, Aracaju - SE",
    categoria: "Moveis e Eletrodomesticos",
    descricao: "Especialista em moveis e eletrodomesticos com as melhores condicoes do mercado.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=500&fit=crop&q=80",
    latitude: -10.9108,
    longitude: -37.0515,
    statusAberto: true,
    favoritada: false,
    tags: ["Geladeiras", "Televisores", "Moveis"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1525598912061-d19b30c3ad35?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1498049794634-b15b576f3634?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p3-${i + 1}`,
        comercioId: "c3",
        nome: `Eletro Casas Bahia ${i + 1}`,
        descricao: `Eletrodomestico de alta qualidade das Casas Bahia, modelo ${i + 1}.`,
        preco: 199.90 + (i * 100),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.3,
    resumo_avaliacoes: "Bons precos e condicoes de parcelamento.",
    redes_sociais: "@casasbahia"
  },
  {
    id: "c4",
    usuarioId: "u4",
    nome: "Magazine Luiza",
    email: "loja_aracaju@magazineluiza.com.br",
    telefoneContato: "(79) 3211-6677",
    localizacao: "Calcadao da Joao Pessoa, Centro, Aracaju - SE",
    categoria: "Eletrodomesticos e Eletronicos",
    descricao: "Referencia em eletrodomesticos, eletronicos e tecnologia com atendimento especializado.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80",
    latitude: -10.9128,
    longitude: -37.0515,
    statusAberto: true,
    favoritada: false,
    tags: ["Celulares", "Informatica", "Promocoes"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p4-${i + 1}`,
        comercioId: "c4",
        nome: `Eletronico Magalu ${i + 1}`,
        descricao: `Produto tecnologico do Magazine Luiza, versao ${i + 1}.`,
        preco: 89.90 + (i * 80),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.6,
    resumo_avaliacoes: "Excelente atendimento ao cliente.",
    redes_sociais: "@magazineluiza"
  },
  {
    id: "c5",
    usuarioId: "u5",
    nome: "G.Barbosa Hiper Centro",
    email: "atendimento@gbarbosa.com.br",
    telefoneContato: "(79) 3212-8899",
    localizacao: "Av. Coelho e Campos, Centro, Aracaju - SE",
    categoria: "Supermercado",
    descricao: "Hipermercado tradicional oferecendo alimentos, higiene e utilidades com qualidade.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "07h as 20h",
    imagem: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop&q=80",
    latitude: -10.9080,
    longitude: -37.0500,
    statusAberto: true,
    favoritada: false,
    tags: ["Alimentos", "Higiene", "Bebidas"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p5-${i + 1}`,
        comercioId: "c5",
        nome: `Item G.Barbosa ${i + 1}`,
        descricao: `Produto alimenticio or de higiene do Hiper G.Barbosa, lote ${i + 1}.`,
        preco: 5.50 + (i * 3),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.1,
    resumo_avaliacoes: "Tradicao e variedade no centro de Aracaju.",
    redes_sociais: "@gbarbosa"
  },
  {
    id: "c6",
    usuarioId: "u6",
    nome: "C&A",
    email: "contato@cea.com.br",
    telefoneContato: "(79) 3211-1122",
    localizacao: "Rua Joao Pessoa, Centro, Aracaju - SE",
    categoria: "Moda",
    descricao: "Moda jovem e atual with colecoes exclusivas and acessorios for todos os estilos.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "09h as 18h",
    imagem: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=500&fit=crop&q=80",
    latitude: -10.9131,
    longitude: -37.0511,
    statusAberto: true,
    favoritada: false,
    tags: ["Vestuario", "Acessorios", "Tendencias"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p6-${i + 1}`,
        comercioId: "c6",
        nome: `Moda C&A ${i + 1}`,
        descricao: `Peca de roupa moderna da colecao C&A, numero ${i + 1}.`,
        preco: 39.90 + (i * 15),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.4,
    resumo_avaliacoes: "Sempre com as ultimas tendencias de moda.",
    redes_sociais: "@cea_brasil"
  },
  {
    id: "c7",
    usuarioId: "u7",
    nome: "Le Biscuit",
    email: "sac@lebiscuit.com.br",
    telefoneContato: "(79) 3214-3344",
    localizacao: "Rua Itabaianinha, Centro, Aracaju - SE",
    categoria: "Utilidades e Decoracao",
    descricao: "Loja completa de utilidades domesticas, decoracao, brinquedos e papelaria.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=500&fit=crop&q=80",
    latitude: -10.9115,
    longitude: -37.0502,
    statusAberto: true,
    favoritada: false,
    tags: ["Cozinha", "Brinquedos", "Papelaria"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p7-${i + 1}`,
        comercioId: "c7",
        nome: `Utilidade Le Biscuit ${i + 1}`,
        descricao: `Item pratico para sua casa da Le Biscuit, modelo ${i + 1}.`,
        preco: 12.90 + (i * 8),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.3,
    resumo_avaliacoes: "Variedade impressionante de itens para o lar.",
    redes_sociais: "@lojaslebiscuit"
  },
  {
    id: "c8",
    usuarioId: "u8",
    nome: "Shopping Box",
    email: "administracao@shoppingbox.com",
    telefoneContato: "(79) 99105-0127",
    localizacao: "Av. Mamede Paes Mendonca, Centro, Aracaju - SE",
    categoria: "Centro Comercial",
    descricao: "Centro comercial diversificado com produtos importados e variedades com otimo custo-beneficio.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 17h",
    imagem: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800&h=500&fit=crop&q=80",
    latitude: -10.9085,
    longitude: -37.0532,
    statusAberto: true,
    favoritada: false,
    tags: ["Importados", "Variedades", "Preco Baixo"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1541140532154-b024d715b909?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1534341141707-16d8048995a5?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582966298601-83c442ce06ad?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p8-${i + 1}`,
        comercioId: "c8",
        nome: `Produto Shopping Box ${i + 1}`,
        descricao: `Variedade do Shopping Box, box ${i + 1}.`,
        preco: 15.00 + (i * 12),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.0,
    resumo_avaliacoes: "Ideal para encontrar de tudo com preco de atacado.",
    redes_sociais: "@shoppingboxaju"
  },
  {
    id: "c9",
    usuarioId: "u9",
    nome: "Mercado Thales Ferraz",
    email: "info@mercadothalesferraz.se.gov.br",
    telefoneContato: "(79) 3211-1234",
    localizacao: "Av. Ivo do Prado, Centro, Aracaju - SE",
    categoria: "Artesanato e Gastronomia",
    descricao: "Ponto turistico e comercial historico com artesanato, castanhas e gastronomia regional.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "06h as 17h",
    imagem: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&h=500&fit=crop&q=80",
    latitude: -10.9110,
    longitude: -37.0490,
    statusAberto: true,
    favoritada: false,
    tags: ["Cultura", "Castanhas", "Artesanato"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1565193998248-d5622035b131?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1531260796528-ae45a644fb20?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p9-${i + 1}`,
        comercioId: "c9",
        nome: `Artesanato Regional ${i + 1}`,
        descricao: `Produto tipico de Sergipe vendido no Mercado, exemplar ${i + 1}.`,
        preco: 25.00 + (i * 10),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.8,
    resumo_avaliacoes: "O melhor da cultura e culinaria sergipana.",
    redes_sociais: "N/A"
  },
  {
    id: "c10",
    usuarioId: "u10",
    nome: "Aju Calcados",
    email: "contato@ajucalcados.com.br",
    telefoneContato: "(79) 3214-5566",
    localizacao: "Calcadao, Centro, Aracaju - SE",
    categoria: "Calcados",
    descricao: "Loja especializada em calcados masculinos, femininos e infantis das melhores marcas.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=500&fit=crop&q=80",
    latitude: -10.9120,
    longitude: -37.0510,
    statusAberto: true,
    favoritada: false,
    tags: ["Tenis", "Sapatos", "Sandalias"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p10-${i + 1}`,
        comercioId: "c10",
        nome: `Calcado Aju ${i + 1}`,
        descricao: `Sapato or sandalia de alta durabilidade, modelo ${i + 1}.`,
        preco: 49.90 + (i * 20),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.2,
    resumo_avaliacoes: "Variedade de marcas e modelos para toda familia.",
    redes_sociais: "@ajucalcados"
  },
  {
    id: "c11",
    usuarioId: "u11",
    nome: "Narciso Enxovais",
    email: "vendas@narcisoenxovais.com.br",
    telefoneContato: "(79) 3211-7788",
    localizacao: "Rua Laranjeiras, Centro, Aracaju - SE",
    categoria: "Cama, Mesa e Banho",
    descricao: "Especialista em cama, mesa e banho com precos competitivos e grande estoque.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=500&fit=crop&q=80",
    latitude: -10.9112,
    longitude: -37.0518,
    statusAberto: true,
    favoritada: false,
    tags: ["Lencois", "Toalhas", "Cortinas"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583845845430-8c57203b9167?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p11-${i + 1}`,
        comercioId: "c11",
        nome: `Item Narciso ${i + 1}`,
        descricao: `Lencol or toalha de fio penteado Narciso, tipo ${i + 1}.`,
        preco: 19.90 + (i * 12),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.5,
    resumo_avaliacoes: "Precos imbativeis em enxovais.",
    redes_sociais: "@narcisoenxovais"
  },
  {
    id: "c12",
    usuarioId: "u12",
    nome: "O Boticario",
    email: "loja.centro@oboticario.com.br",
    telefoneContato: "(79) 3214-9900",
    localizacao: "Calcadao, Centro, Aracaju - SE",
    categoria: "Cosmeticos e Perfumaria",
    descricao: "Lider em perfumaria e cosmeticos com produtos de alta qualidade e presentes especiais.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&h=500&fit=crop&q=80",
    latitude: -10.9125,
    longitude: -37.0505,
    statusAberto: true,
    favoritada: false,
    tags: ["Perfumes", "Maquiagem", "Presentes"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p12-${i + 1}`,
        comercioId: "c12",
        nome: `Fragrancia Boticario ${i + 1}`,
        descricao: `Perfume or creme de sucesso O Boticario, edicao ${i + 1}.`,
        preco: 35.90 + (i * 15),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.9,
    resumo_avaliacoes: "Atendimento impecavel e fragrancias marcantes.",
    redes_sociais: "@oboticario"
  },
  {
    id: "c13",
    usuarioId: "u13",
    nome: "Cacau Show",
    email: "cacaushow.centro@gmail.com",
    telefoneContato: "(79) 3211-0011",
    localizacao: "Calcadao, Centro, Aracaju - SE",
    categoria: "Chocolataria",
    descricao: "Chocolateria premium com trufas, bombons e presentes deliciosos para qualquer ocasiao.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "09h as 18h",
    imagem: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=500&fit=crop&q=80",
    latitude: -10.9122,
    longitude: -37.0508,
    statusAberto: true,
    favoritada: false,
    tags: ["Chocolate", "Trufas", "Presentes"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p13-${i + 1}`,
        comercioId: "c13",
        nome: `Trufa ou Bombom ${i + 1}`,
        descricao: `Delicia de chocolate Cacau Show, sabor ${i + 1}.`,
        preco: 4.50 + (i * 5),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.7,
    resumo_avaliacoes: "Os melhores chocolates para presentear.",
    redes_sociais: "@cacaushow"
  },
  {
    id: "c14",
    usuarioId: "u14",
    nome: "Farmacia Pague Menos",
    email: "loja231@paguemenos.com.br",
    telefoneContato: "(79) 3214-2233",
    localizacao: "Rua Geru, Centro, Aracaju - SE",
    categoria: "Farmacia e Saude",
    descricao: "Farmacia completa with medicamentos, itens de higiene pessoal and atendimento farmaceutico.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "07h as 21h",
    imagem: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=800&h=500&fit=crop&q=80",
    latitude: -10.9118,
    longitude: -37.0512,
    statusAberto: true,
    favoritada: false,
    tags: ["Remedios", "Higiene", "Conveniencia"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p14-${i + 1}`,
        comercioId: "c14",
        nome: `Medicamento/Higiene ${i + 1}`,
        descricao: `Item de farmacia Pague Menos, referencia ${i + 1}.`,
        preco: 10.00 + (i * 7),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.4,
    resumo_avaliacoes: "Sempre com estoque completo e bons precos.",
    redes_sociais: "@paguemenos"
  },
  {
    id: "c15",
    usuarioId: "u15",
    nome: "Kalunga",
    email: "vendas.aju@kalunga.com.br",
    telefoneContato: "(79) 3211-4455",
    localizacao: "Centro, Aracaju - SE",
    categoria: "Papelaria e Informatica",
    descricao: "Maior distribuidora de materiais de escritorio, escolar e informatica do Brasil.",
    vendedorAmbulante: false,
    estacionamento: true,
    horarioFuncionamento: "08h as 18h",
    imagem: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&h=500&fit=crop&q=80",
    latitude: -10.9100,
    longitude: -37.0500,
    statusAberto: true,
    favoritada: false,
    tags: ["Escritorio", "Escolar", "Gadgets"],
    produtos: Array.from({ length: 30 }, (_, i) => {
      const imagens = [
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop&q=80",
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=400&fit=crop&q=80"
      ];
      return {
        id: `p15-${i + 1}`,
        comercioId: "c15",
        nome: `Material Kalunga ${i + 1}`,
        descricao: `Suprimento de escritorio or escolar Kalunga, item ${i + 1}.`,
        preco: 15.00 + (i * 25),
        imagem: imagens[i % 4]
      };
    }),
    avaliacoes: [],
    rating: 4.6,
    resumo_avaliacoes: "Tudo o que voce precisa para seu escritorio.",
    redes_sociais: "@kalungacom"
  }
];

export const mockEventos: Evento[] = [
  {
    id: 'e1',
    nome: 'Festival de Cultura do Centro',
    descricao: 'Celebracao da musica, arte e gastronomia local',
    inicio: '2026-03-25T10:00:00Z',
    fim: '2026-03-25T22:00:00Z',
    localizacao: 'Praca Fausto Cardoso',
    categoria: 'Cultura',
    latitude: -10.9110,
    longitude: -37.0528,
    imagem: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop&q=80'
  },
  {
    id: 'e2',
    nome: 'Feira de Artesanato da Praca Fausto Cardoso',
    descricao: 'Produtos locais, comidas tipicas e musica ao vivo.',
    inicio: '2026-05-15T09:00:00Z',
    fim: '2026-05-15T18:00:00Z',
    localizacao: 'Praca Fausto Cardoso, Centro',
    categoria: 'Cultura',
    latitude: -10.9128,
    longitude: -37.0501,
    imagem: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800&h=500&fit=crop&q=80'
  }
];

export const mockEstacionamentos: Estacionamento[] = [
  {
    id: 'e1',
    nome: 'Estacionamento Centro Aracaju',
    latitude: -10.9115,
    longitude: -37.0515,
    numeroVagas: 50,
    vagasOcupadas: 35,
    status: 'lotado',
    precoHora: 5.00,
    tempoPreco: 'hora'
  },
  {
    id: 'e2',
    nome: 'Parking Rua Joao Pessoa',
    latitude: -10.9125,
    longitude: -37.0510,
    numeroVagas: 30,
    vagasOcupadas: 28,
    status: 'lotado',
    precoHora: 6.00,
    tempoPreco: 'hora'
  },
  {
    id: 'e3',
    nome: 'Garagem Centro Shopping',
    latitude: -10.9100,
    longitude: -37.0520,
    numeroVagas: 100,
    vagasOcupadas: 45,
    status: 'livre',
    precoHora: 4.50,
    tempoPreco: 'hora'
  },
  {
    id: 'e4',
    nome: 'Estacionamento Praca General Valadao',
    latitude: -10.9110,
    longitude: -37.0505,
    numeroVagas: 40,
    vagasOcupadas: 10,
    status: 'livre',
    precoHora: 5.50,
    tempoPreco: 'hora'
  }
];
