import type { Comercio, Evento, Estacionamento } from "@/types/global";

export interface ComercioExtendido extends Comercio {
  localizacao: string;
  resumo_avaliacoes: string;
  redes_sociais: string;
  rating: number;
  horarioFuncionamento: string;
  tempoEntrega?: string;
  taxaEntrega?: number;
}


// ==================== IMAGE ARRAYS BY CATEGORY ====================

// Adega de Vinhos
export const adegadeVinhosImages = [
  "https://cdn.pixabay.com/photo/2015/11/03/09/03/wine-1019864_1280.jpg",
];

// Bijuterias
export const bijuteriasImages = [
  "https://cdn.pixabay.com/photo/2016/11/22/19/05/woman-1850078_1280.jpg",
];

// Cafeteria Gourmet
export const cafeteriaGourmetImages = [
  "https://cdn.pixabay.com/photo/2015/05/31/15/07/coffee-792113_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/16/22/25/espresso-571002_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/09/04/18/39/coffee-2714970_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/10/28/food-691010_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/01/29/14/41/cheese-bread-5961233_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/21/08/07/food-2664421_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/06/15/15/40/milkshake-809961_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/23/15/52/juice-1614768_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/24/10/54/quiche-501140_1280.jpg",
];

// Churrascaria
export const churrascariaImages = [
  "https://cdn.pixabay.com/photo/2016/03/27/21/59/meat-1284440_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/11/15/22/meat-762635_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/01/07/15/food-2362678_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/09/23/45/cocktail-2053919_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
];

// Comida Chinesa
export const comidaChinesaImages = [
  "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712661_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/11/12/13/14/chicken-2942444_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/04/04/17/22/meal-1307604_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/11/15/22/meat-762635_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/26/01/17/dumplings-3039535_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/12/18/59/spring-rolls-2634970_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/19/20/59/food-494606_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/07/02/20/37/cup-829527_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_1280.jpg",
];

// Comida Nordestina
export const comidaNordestinaImages = [
  "https://cdn.pixabay.com/photo/2014/10/19/20/59/food-494606_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/11/15/22/meat-762635_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/21/23/28/beans-575631_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/09/15/19/24/seafood-1672521_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/06/25/11/59/shrimp-1478752_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/01/07/15/food-2362678_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/01/29/14/41/cheese-bread-5961233_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/05/01/01/pancake-2998412_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/09/12/12/35/maize-2742231_1280.jpg",
];

// Farmácia
export const farmciaImages = [
  "https://cdn.pixabay.com/photo/2015/09/21/14/24/pharmacy-949915_1280.jpg",
];

// Floricultura
export const floriculturaImages = [
  "https://cdn.pixabay.com/photo/2017/08/07/19/43/handmade-2607109_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/00/basket-1868591_1280.jpg",
];

// Frutos do Mar
export const frutosdoMarImages = [
  "https://cdn.pixabay.com/photo/2016/09/15/19/24/seafood-1672521_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/06/25/11/59/shrimp-1478752_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/30/13/49/shrimp-2021115_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/10/15/11/41/risotto-2853298_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/09/39/cup-690234_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/02/12/32/acai-918451_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/23/15/52/juice-1614768_1280.jpg",
];

// Hamburgueria
export const hamburgueriaImages = [
  "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/06/13/11/burger-661706_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/19/08/burger-1238305_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/13/03/02/burger-1976198_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/05/04/fries-1867443_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/21/42/pizza-1239054_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/06/15/15/40/milkshake-809961_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
];

// Informática
export const informticaImages = [
  "https://cdn.pixabay.com/photo/2015/01/08/18/25/desk-593327_1280.jpg",
];

// Italiana
export const italianaImages = [
  "https://cdn.pixabay.com/photo/2017/01/26/02/06/pasta-2009590_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/10/13/41/pasta-716256_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/10/24/18/13/gnocchi-3770857_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/25/15/34/ravioli-2680486_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/10/15/11/41/risotto-2853298_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/23/14/37/food-1853259_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/03/09/03/wine-1019864_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/31/10/56/tiramisu-2191018_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/09/39/cup-690234_1280.jpg",
];

// Livraria
export const livrariaImages = [
  "https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg",
];

// Loja de Brinquedos
export const lojadeBrinquedosImages = [
  "https://cdn.pixabay.com/photo/2014/11/05/15/57/teddy-bear-518034_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
];

// Loja de Instrumentos Musicais
export const lojadeInstrumentosMusicaisImages = [
  "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_1280.jpg",
];

// Loja de Maquiagem
export const lojadeMaquiagemImages = [
  "https://cdn.pixabay.com/photo/2017/08/05/21/36/perfume-2585727_1280.jpg",
];

// Materiais de Construção
export const materiaisdeConstruoImages = [
  "https://cdn.pixabay.com/photo/2017/08/01/23/51/tools-2568858_1280.jpg",
];

// Mexicana
export const mexicanaImages = [
  "https://cdn.pixabay.com/photo/2014/11/05/16/00/tacos-518041_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/02/20/27/taco-1018962_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/06/29/20/09/mexican-2456038_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/05/15/58/nachos-518037_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/21/23/28/quesadilla-575630_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/21/23/28/enchiladas-575630_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/11/15/appetizer-1869132_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/09/23/45/cocktail-2053919_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/10/21/whiskey-690540_1280.jpg",
];

// Moda Feminina
export const modaFemininaImages = [
  "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
];

// Moda Masculina
export const modaMasculinaImages = [
  "https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_1280.jpg",
];

// Papelaria
export const papelariaImages = [
  "https://cdn.pixabay.com/photo/2015/01/20/12/51/office-605503_1280.jpg",
];

// Papelaria Criativa
export const papelariaCriativaImages = [
  "https://cdn.pixabay.com/photo/2015/01/20/12/51/office-605503_1280.jpg",
];

// Pet Shop
export const petShopImages = [
  "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
];

// Pizzaria
export const pizzariaImages = [
  "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/07/08/10/51/pizza-835783_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/03/05/21/42/pizza-1239054_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068283_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/06/12/04/pizza-2591905_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/13/08/focaccia-1869711_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/10/09/19/29/salad-2834549_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/23/15/52/juice-1614768_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/10/21/whiskey-690540_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/02/18/20/dessert-2278931_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/05/17/15/30/pizza-5182153_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/07/08/12/34/pizza-386717_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/04/09/09/22/pizza-1317699_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/09/30/15/13/pizza-2802332_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/10/01/22/39/bruschetta-5619836_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/03/09/03/wine-1019864_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/31/10/56/tiramisu-2191018_1280.jpg",
];

// Relojoaria
export const relojoariaImages = [
  "https://cdn.pixabay.com/photo/2014/07/31/23/10/watch-407096_1280.jpg",
];

// Sorveteria Premium
export const sorveteriaPremiumImages = [
  "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/23/09/chocolate-693633_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/06/15/15/40/milkshake-809961_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/12/16/22/25/espresso-571002_1280.jpg",
];

// Steakhouse
export const steakhouseImages = [
  "https://cdn.pixabay.com/photo/2016/03/27/21/59/meat-1284440_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/11/15/22/meat-762635_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/29/17/28/sausages-3048123_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/19/20/59/food-494606_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/05/04/fries-1867443_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/15/14/51/salad-768601_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/10/21/whiskey-690540_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
];

// Supermercado
export const supermercadoImages = [
  "https://cdn.pixabay.com/photo/2016/11/22/19/08/shop-1850100_1280.jpg",
];

// Sushi
export const sushiImages = [
  "https://cdn.pixabay.com/photo/2017/10/16/09/01/sushi-2856545_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/13/08/sushi-1869708_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/04/04/18/07/poke-bowl-2202534_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/18/52/sushi-1850029_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/05/15/57/shimeji-518032_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/12/18/59/spring-rolls-2634970_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/07/08/56/sushi-2291971_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/10/00/41/food-715542_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/03/24/09/37/tea-2170617_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/07/15/08/cookie-756601_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/18/15/03/sushi-1835193_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/09/20/14/09/sunomono-1682591_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712661_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/12/26/01/17/dumplings-3039535_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/10/21/whiskey-690540_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/22/18/52/cake-1850011_1280.jpg",
];

// Vegano
export const veganoImages = [
  "https://cdn.pixabay.com/photo/2017/06/29/19/57/vegetables-2456012_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/15/17/meal-2069021_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/02/20/27/taco-1018962_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/11/15/appetizer-1869132_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/08/23/15/52/juice-1614768_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/03/09/03/wine-1019864_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/15/14/51/salad-768601_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/10/24/10/54/quiche-501140_1280.jpg",
];


export const mockHybridSliderData = [
  {
    id: "h1",
    nome: "Experiencia Gastronomica",
    categoria: "Restaurantes",
    imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1779197304/comercio_1_yiwzzr.png",
    tipo: "imagem"
  },
  {
    id: "h2",
    nome: "Liquidacao de Verao",
    categoria: "Promocao Especial",
    imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1779216906/comercio_2_ticju6.png",
    tipo: "imagem"
  },
  {
    id: "h3",
    nome: "Moda e Estilo",
    categoria: "Shopping",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-in-a-fashion-store-40156-large.mp4",
    tipo: "video"
  },
  {
    id: "h4",
    nome: "Artesanato Regional",
    categoria: "Feira de Negocios",
    imagem: floriculturaImages[11],
    tipo: "imagem"
  }
];

export const mockVideoSliderComerciais = [
  {
    id: "v1",
    nome: "Gastronomia Premium",
    categoria: "Restaurantes",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-professional-kitchen-41031-large.mp4"
  },
  {
    id: "v2",
    nome: "Tendencias de Moda",
    categoria: "Shopping",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-in-a-fashion-store-40156-large.mp4"
  },
  {
    id: "v3",
    nome: "Eventos e Shows",
    categoria: "Eventos",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-with-lights-and-smoke-40155-large.mp4"
  }
];

export const mockStoreSliderComerciais = [
  {
    id: "cs1",
    nome: "Ofertas do Centro",
    categoria: "Promocao Especial",
    horarioFuncionamento: "08:00 - 18:00",
    imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1779197304/comercio_1_yiwzzr.png",
    descricao: "As melhores ofertas da regiao central."
  },
  {
    id: "cs2",
    nome: "Cultura Local",
    categoria: "Feira de Negocios",
    horarioFuncionamento: "09:00 - 20:00",
    imagem: floriculturaImages[10],
    descricao: "Valorize o produtor local e nossa cultura."
  },
  {
    id: "cs3",
    nome: "Sabor no Calcadao",
    categoria: "Evento Gourmet",
    horarioFuncionamento: "11:00 - 23:00",
    imagem: cafeteriaGourmetImages[0],
    descricao: "Sabores irresistiveis para voce aproveitar."
  }
];

export const mockComercios: ComercioExtendido[] = [
  {
    id: "c1",
    usuarioId: "u1",
    nome: "Burger Prime Aracaju",
    email: "contato@burgerprime.com",
    telefoneContato: "79999990001",
    categoria: "Hamburgueria",
    descricao: "Hambúrgueres artesanais com ingredientes premium.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: hamburgueriaImages[9],
    latitude: -10.911,
    longitude: -37.051,
    localizacao: "Av. Beira Mar, 100",
    resumo_avaliacoes: "Excelente sabor e atendimento.",
    redes_sociais: "@burgerprimeaju",
    rating: 4.8,
    horarioFuncionamento: "18:00 - 23:00",
    tempoEntrega: "30-45 min",
    taxaEntrega: 5.0,
    statusAberto: true,
    tags: ["burger", "artesanal"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c1-p1", comercioId: "c1", nome: "Classic Burger", descricao: "Pao brioche, carne 180g e queijo.", preco: 25.0, imagem: veganoImages[10] },
      { id: "c1-p2", comercioId: "c1", nome: "Bacon Lovers", descricao: "Muito bacon crocante e cheddar.", preco: 32.0, imagem: hamburgueriaImages[11] },
      { id: "c1-p3", comercioId: "c1", nome: "Cheddar Melt", descricao: "Cheddar cremoso e cebola caramelizada.", preco: 30.0, imagem: hamburgueriaImages[12] },
      { id: "c1-p4", comercioId: "c1", nome: "Veggie Burger", descricao: "Hamburguer de grao de bico e alface.", preco: 28.0, imagem: hamburgueriaImages[12] },
      { id: "c1-p5", comercioId: "c1", nome: "Double Monster", descricao: "Duas carnes de 180g e dobro de queijo.", preco: 45.0, imagem: hamburgueriaImages[12] },
      { id: "c1-p6", comercioId: "c1", nome: "Batata Rustica", descricao: "Porcao de batatas com alecrim.", preco: 15.0, imagem: steakhouseImages[13] },
      { id: "c1-p7", comercioId: "c1", nome: "Onion Rings", descricao: "Aneis de cebola empanados.", preco: 12.0, imagem: pizzariaImages[14] },
      { id: "c1-p8", comercioId: "c1", nome: "Milkshake Morango", descricao: "Cremoso com pedacos de fruta.", preco: 18.0, imagem: sorveteriaPremiumImages[10] },
      { id: "c1-p9", comercioId: "c1", nome: "Refrigerante Lata", descricao: "Gelado 350ml.", preco: 6.0, imagem: hamburgueriaImages[16] },
      { id: "c1-p10", comercioId: "c1", nome: "Petit Gateau", descricao: "Bolo quente com sorvete.", preco: 22.0, imagem: veganoImages[16] }
    ]
  },
  {
    id: "c2",
    usuarioId: "u2",
    nome: "Pizzaria Napoli",
    email: "napoli@pizza.com",
    telefoneContato: "79999990002",
    categoria: "Pizzaria",
    descricao: "Pizzas no forno a lenha com massa fermentada lentamente.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: pizzariaImages[4],
    latitude: -10.912,
    longitude: -37.052,
    localizacao: "Rua das Flores, 45",
    resumo_avaliacoes: "A melhor massa da cidade.",
    redes_sociais: "@pizzarianapoli",
    rating: 4.7,
    horarioFuncionamento: "18:00 - 00:00",
    tempoEntrega: "40-55 min",
    taxaEntrega: 7.0,
    statusAberto: true,
    tags: ["pizza", "italiana"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c2-p1", comercioId: "c2", nome: "Pizza Margherita", descricao: "Molho de tomate, mussarela e manjericao.", preco: 45.0, imagem: pizzariaImages[12] },
      { id: "c2-p2", comercioId: "c2", nome: "Pizza Calabresa", descricao: "Calabresa fatiada e cebola.", preco: 48.0, imagem: pizzariaImages[13] },
      { id: "c2-p3", comercioId: "c2", nome: "Pizza Quatro Queijos", descricao: "Mussarela, provolone, parmesao e gorgonzola.", preco: 55.0, imagem: pizzariaImages[14] },
      { id: "c2-p4", comercioId: "c2", nome: "Pizza Pepperoni", descricao: "Pepperoni com queijo especial.", preco: 58.0, imagem: pizzariaImages[15] },
      { id: "c2-p5", comercioId: "c2", nome: "Pizza Portuguesa", descricao: "Ovo, presunto, cebola e ervilha.", preco: 52.0, imagem: pizzariaImages[5] },
      { id: "c2-p6", comercioId: "c2", nome: "Pizza Vegetariana", descricao: "Mix de legumes e queijo.", preco: 50.0, imagem: pizzariaImages[16] },
      { id: "c2-p7", comercioId: "c2", nome: "Calzone", descricao: "Pizza fechada recheada.", preco: 42.0, imagem: pizzariaImages[14] },
      { id: "c2-p8", comercioId: "c2", nome: "Bruschetta", descricao: "Pao italiano com tomate.", preco: 20.0, imagem: pizzariaImages[16] },
      { id: "c2-p9", comercioId: "c2", nome: "Vinho Tinto", descricao: "Taca de vinho da casa.", preco: 18.0, imagem: veganoImages[0] },
      { id: "c2-p10", comercioId: "c2", nome: "Tiramisu", descricao: "Sobremesa tipica italiana.", preco: 25.0, imagem: pizzariaImages[12] }
    ]
  },
  {
    id: "c3",
    usuarioId: "u3",
    nome: "Sakura Sushi",
    email: "sakura@sushi.com",
    telefoneContato: "79999990003",
    categoria: "Sushi",
    descricao: "Culinária japonesa tradicional com peixes frescos selecionados.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: sushiImages[12],
    latitude: -10.913,
    longitude: -37.053,
    localizacao: "Praça do Farol, 12",
    resumo_avaliacoes: "Peixe muito fresco.",
    redes_sociais: "@sakurasushiaju",
    rating: 4.9,
    horarioFuncionamento: "19:00 - 23:30",
    tempoEntrega: "45-60 min",
    taxaEntrega: 10.0,
    statusAberto: true,
    tags: ["sushi", "japanese"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c3-p1", comercioId: "c3", nome: "Combinado 20 Pecas", descricao: "Mix de sushis e sashimis.", preco: 85.0, imagem: sushiImages[11] },
      { id: "c3-p2", comercioId: "c3", nome: "Temaki Salmao", descricao: "Cone de alga com arroz e salmao.", preco: 30.0, imagem: sushiImages[12] },
      { id: "c3-p3", comercioId: "c3", nome: "Hot Roll", descricao: "Sushi frito com molho tare.", preco: 28.0, imagem: sushiImages[12] },
      { id: "c3-p4", comercioId: "c3", nome: "Sashimi Salmao", descricao: "10 fatias de salmao fresco.", preco: 45.0, imagem: sushiImages[12] },
      { id: "c3-p5", comercioId: "c3", nome: "Uramaki Philadelphia", descricao: "Arroz, salmao e cream cheese.", preco: 25.0, imagem: sushiImages[12] },
      { id: "c3-p6", comercioId: "c3", nome: "Sunomono", descricao: "Salada de pepino agridoce.", preco: 15.0, imagem: sushiImages[12] },
      { id: "c3-p7", comercioId: "c3", nome: "Yakissoba", descricao: "Macarrao com legumes e carne.", preco: 40.0, imagem: sushiImages[12] },
      { id: "c3-p8", comercioId: "c3", nome: "Guioza", descricao: "Pasteis japoneses grelhados.", preco: 22.0, imagem: sushiImages[12] },
      { id: "c3-p9", comercioId: "c3", nome: "Saque Dose", descricao: "Bebida fermentada tradicional.", preco: 15.0, imagem: sushiImages[11] },
      { id: "c3-p10", comercioId: "c3", nome: "Mochi", descricao: "Bolinho de arroz doce.", preco: 12.0, imagem: sushiImages[10] }
    ]
  },
  {
    id: "c4",
    usuarioId: "u4",
    nome: "Sabor do Nordeste",
    email: "nordeste@sabor.com",
    telefoneContato: "79999990004",
    categoria: "Comida Nordestina",
    descricao: "O melhor da culinária regional com temperos autênticos.",
    vendedorAmbulante: true,
    estacionamento: true,
    imagem: steakhouseImages[13],
    latitude: -10.914,
    longitude: -37.054,
    localizacao: "Mercado Central, Box 08",
    resumo_avaliacoes: "Comida caseira maravilhosa.",
    redes_sociais: "@sabordonordeste",
    rating: 4.6,
    horarioFuncionamento: "11:00 - 16:00",
    tempoEntrega: "25-35 min",
    taxaEntrega: 4.0,
    statusAberto: true,
    tags: ["nordestina", "regional"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c4-p1", comercioId: "c4", nome: "Carne de Sol", descricao: "Com pirao e arroz.", preco: 60.0, imagem: steakhouseImages[13] },
      { id: "c4-p2", comercioId: "c4", nome: "Baiao de Dois", descricao: "Arroz, feijao fradinho e queijo coalho.", preco: 40.0, imagem: comidaNordestinaImages[12] },
      { id: "c4-p3", comercioId: "c4", nome: "Moqueca de Peixe", descricao: "Peixe cozido no leite de coco.", preco: 75.0, imagem: frutosdoMarImages[13] },
      { id: "c4-p4", comercioId: "c4", nome: "Bobo de Camarao", descricao: "Creme de macaxeira com camarao.", preco: 80.0, imagem: frutosdoMarImages[14] },
      { id: "c4-p5", comercioId: "c4", nome: "Sarapatel", descricao: "Prato regional bem temperado.", preco: 35.0, imagem: steakhouseImages[13] },
      { id: "c4-p6", comercioId: "c4", nome: "Macaxeira Frita", descricao: "Porcao crocante.", preco: 15.0, imagem: comidaNordestinaImages[14] },
      { id: "c4-p7", comercioId: "c4", nome: "Queijo Coalho Grelhado", descricao: "Com mel de engenho.", preco: 12.0, imagem: comidaNordestinaImages[7] },
      { id: "c4-p8", comercioId: "c4", nome: "Tapioca de Coco", descricao: "Tapioca quentinha com coco ralado.", preco: 10.0, imagem: comidaNordestinaImages[16] },
      { id: "c4-p9", comercioId: "c4", nome: "Cuscuz com Ovo", descricao: "Cuscuz de milho tradicional.", preco: 8.0, imagem: comidaNordestinaImages[16] },
      { id: "c4-p10", comercioId: "c4", nome: "Doce de Leite", descricao: "Doce caseiro em calda.", preco: 12.0, imagem: steakhouseImages[13] }
    ]
  },
  {
    id: "c5",
    usuarioId: "u5",
    nome: "La Trattoria",
    email: "trattoria@italiana.com",
    telefoneContato: "79999990005",
    categoria: "Italiana",
    descricao: "Massas frescas e vinhos selecionados em um ambiente acolhedor.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: italianaImages[12],
    latitude: -10.915,
    longitude: -37.055,
    localizacao: "Alameda das Cores, 202",
    resumo_avaliacoes: "Ambiente fantastico e massas ótimas.",
    redes_sociais: "@latrattoriaaju",
    rating: 4.8,
    horarioFuncionamento: "12:00 - 15:00, 19:00 - 23:00",
    tempoEntrega: "40-50 min",
    taxaEntrega: 8.0,
    statusAberto: true,
    tags: ["italiana", "massas"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c5-p1", comercioId: "c5", nome: "Lasanha Bolonhesa", descricao: "Massa fresca com carne e queijo.", preco: 50.0, imagem: veganoImages[12] },
      { id: "c5-p2", comercioId: "c5", nome: "Fettuccine Alfredo", descricao: "Molho branco e parmesao.", preco: 45.0, imagem: italianaImages[12] },
      { id: "c5-p3", comercioId: "c5", nome: "Gnocchi ao Pesto", descricao: "Nhoque artesanal com molho pesto.", preco: 42.0, imagem: italianaImages[12] },
      { id: "c5-p4", comercioId: "c5", nome: "Ravioli de Abobora", descricao: "Manteiga de salvia e nozes.", preco: 48.0, imagem: italianaImages[12] },
      { id: "c5-p5", comercioId: "c5", nome: "Risoto Cogumelos", descricao: "Mix de cogumelos frescos.", preco: 55.0, imagem: italianaImages[8] },
      { id: "c5-p6", comercioId: "c5", nome: "Carpaccio", descricao: "Laminas de carne e alcaparras.", preco: 38.0, imagem: italianaImages[12] },
      { id: "c5-p7", comercioId: "c5", nome: "Spaghetti Carbonara", descricao: "Pancetta, ovos e parmesao.", preco: 46.0, imagem: italianaImages[12] },
      { id: "c5-p8", comercioId: "c5", nome: "Taca de Vinho", descricao: "Vinho tinto seco.", preco: 25.0, imagem: veganoImages[0] },
      { id: "c5-p9", comercioId: "c5", nome: "Panna Cotta", descricao: "Sobremesa de nata e frutas.", preco: 20.0, imagem: pizzariaImages[12] },
      { id: "c5-p10", comercioId: "c5", nome: "Agua Mineral", descricao: "500ml sem gas.", preco: 5.0, imagem: italianaImages[8] }
    ]
  },
  {
    id: "c6",
    usuarioId: "u6",
    nome: "Texas Steakhouse",
    email: "texas@steak.com",
    telefoneContato: "79999990006",
    categoria: "Steakhouse",
    descricao: "Cortes nobres grelhados na brasa com o estilo americano.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: steakhouseImages[12],
    latitude: -10.916,
    longitude: -37.056,
    localizacao: "Av. Adelia Franco, 500",
    resumo_avaliacoes: "Cortes perfeitos.",
    redes_sociais: "@texassteakaju",
    rating: 4.7,
    horarioFuncionamento: "12:00 - 23:00",
    tempoEntrega: "45-60 min",
    taxaEntrega: 10.0,
    statusAberto: true,
    tags: ["steakhouse", "carnes"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c6-p1", comercioId: "c6", nome: "Ribeye Steak", descricao: "Corte macio de 300g.", preco: 95.0, imagem: steakhouseImages[12] },
      { id: "c6-p2", comercioId: "c6", nome: "Picanha Nobre", descricao: "Grelhada na parrilla.", preco: 88.0, imagem: steakhouseImages[12] },
      { id: "c6-p3", comercioId: "c6", nome: "Costela BBQ", descricao: "Costela de porco com molho barbecue.", preco: 75.0, imagem: steakhouseImages[12] },
      { id: "c6-p4", comercioId: "c6", nome: "T-Bone", descricao: "Corte com osso super suculento.", preco: 110.0, imagem: steakhouseImages[13] },
      { id: "c6-p5", comercioId: "c6", nome: "Linguica Artesanal", descricao: "Porcao de linguica temperada.", preco: 35.0, imagem: steakhouseImages[11] },
      { id: "c6-p6", comercioId: "c6", nome: "Pao de Alho", descricao: "Recheado com muito queijo.", preco: 18.0, imagem: steakhouseImages[13] },
      { id: "c6-p7", comercioId: "c6", nome: "Batata Recheada", descricao: "Com bacon e sour cream.", preco: 28.0, imagem: steakhouseImages[13] },
      { id: "c6-p8", comercioId: "c6", nome: "Salada Caesar", descricao: "Mix de folhas e frango grelhado.", preco: 32.0, imagem: veganoImages[13] },
      { id: "c6-p9", comercioId: "c6", nome: "Cerveja Artesanal", descricao: "Garrafa 500ml local.", preco: 22.0, imagem: sushiImages[11] },
      { id: "c6-p10", comercioId: "c6", nome: "Brownie de Chocolate", descricao: "Com calda quente.", preco: 20.0, imagem: veganoImages[16] }
    ]
  },
  {
    id: "c7",
    usuarioId: "u7",
    nome: "Marisqueira Aju",
    email: "contato@marisqueira.com",
    telefoneContato: "79999990007",
    categoria: "Frutos do Mar",
    descricao: "Peixes e mariscos capturados diariamente.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: frutosdoMarImages[13],
    latitude: -10.917,
    longitude: -37.057,
    localizacao: "Orla da Atalaia, s/n",
    resumo_avaliacoes: "Frutos do mar fresquinhos.",
    redes_sociais: "@marisqueiraaju",
    rating: 4.8,
    horarioFuncionamento: "11:30 - 22:00",
    tempoEntrega: "40-55 min",
    taxaEntrega: 12.0,
    statusAberto: true,
    tags: ["seafood", "frutosdomar"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c7-p1", comercioId: "c7", nome: "Grelhado de Peixe", descricao: "File de peixe com legumes.", preco: 65.0, imagem: frutosdoMarImages[13] },
      { id: "c7-p2", comercioId: "c7", nome: "Camarao ao Alho e Oleo", descricao: "Porcao farta de camarao.", preco: 78.0, imagem: frutosdoMarImages[14] },
      { id: "c7-p3", comercioId: "c7", nome: "Casquinha de Siri", descricao: "Tradicional e gratinada.", preco: 20.0, imagem: frutosdoMarImages[13] },
      { id: "c7-p4", comercioId: "c7", nome: "Polvo Grelhado", descricao: "Com batatas ao murro.", preco: 95.0, imagem: frutosdoMarImages[14] },
      { id: "c7-p5", comercioId: "c7", nome: "Lula a Dore", descricao: "Aneis de lula empanados.", preco: 45.0, imagem: frutosdoMarImages[8] },
      { id: "c7-p6", comercioId: "c7", nome: "Caldeirada", descricao: "Mix de frutos do mar cozidos.", preco: 120.0, imagem: frutosdoMarImages[13] },
      { id: "c7-p7", comercioId: "c7", nome: "Risoto de Camarao", descricao: "Cremoso com camaroes médios.", preco: 72.0, imagem: italianaImages[8] },
      { id: "c7-p8", comercioId: "c7", nome: "Vinho Branco", descricao: "Ideal para acompanhar peixes.", preco: 80.0, imagem: italianaImages[8] },
      { id: "c7-p9", comercioId: "c7", nome: "Sorvete de Fruta", descricao: "Refrescante sobremesa.", preco: 15.0, imagem: frutosdoMarImages[8] },
      { id: "c7-p10", comercioId: "c7", nome: "Agua de Coco", descricao: "Natural da fruta.", preco: 8.0, imagem: veganoImages[11] }
    ]
  },
  {
    id: "c8",
    usuarioId: "u8",
    nome: "Horta Urbana",
    email: "contato@hortaurbana.com",
    telefoneContato: "79999990008",
    categoria: "Vegano",
    descricao: "Gastronomia plant-based with organic and flavorful ingredients.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: veganoImages[16],
    latitude: -10.918,
    longitude: -37.058,
    localizacao: "Rua do Estilo, 102",
    resumo_avaliacoes: "Comida vegana surpreendente.",
    redes_sociais: "@hortaurbanaaju",
    rating: 4.6,
    horarioFuncionamento: "11:30 - 21:00",
    tempoEntrega: "30-40 min",
    taxaEntrega: 5.0,
    statusAberto: true,
    tags: ["vegan", "healthy"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c8-p1", comercioId: "c8", nome: "Bowl Mediterraneo", descricao: "Mix de graos e vegetais assados.", preco: 38.0, imagem: veganoImages[16] },
      { id: "c8-p2", comercioId: "c8", nome: "Burger Vegano", descricao: "Hamburguer de lentilha e maionese verde.", preco: 32.0, imagem: veganoImages[10] },
      { id: "c8-p3", comercioId: "c8", nome: "Lasanha de Abobrinha", descricao: "Massa de abobrinha e molho de castanha.", preco: 42.0, imagem: veganoImages[12] },
      { id: "c8-p4", comercioId: "c8", nome: "Tacos de Jaca", descricao: "Proteina de jaca temperada e guacamole.", preco: 30.0, imagem: veganoImages[4] },
      { id: "c8-p5", comercioId: "c8", nome: "Homus com Paes", descricao: "Pasta de grao de bico artesanal.", preco: 22.0, imagem: veganoImages[8] },
      { id: "c8-p6", comercioId: "c8", nome: "Suco Verde", descricao: "Couve, limao e gengibre.", preco: 14.0, imagem: veganoImages[11] },
      { id: "c8-p7", comercioId: "c8", nome: "Kombucha", descricao: "Bebida fermentada refrescante.", preco: 18.0, imagem: veganoImages[0] },
      { id: "c8-p8", comercioId: "c8", nome: "Brownie Vegano", descricao: "Chocolate 70% e farinha de amendoas.", preco: 15.0, imagem: veganoImages[16] },
      { id: "c8-p9", comercioId: "c8", nome: "Salada de Graca", descricao: "Folhas, sementes e molho de mostarda.", preco: 25.0, imagem: veganoImages[13] },
      { id: "c8-p10", comercioId: "c8", nome: "Quiche de Alho Poro", descricao: "Massa sem gluten e recheio cremoso.", preco: 16.0, imagem: veganoImages[12] }
    ]
  },
  {
    id: "c9",
    usuarioId: "u9",
    nome: "La Fiesta Mexicana",
    email: "fiesta@mexicano.com",
    telefoneContato: "79999990009",
    categoria: "Mexicana",
    descricao: "A explosão de cores e sabores do México direto em Aracaju.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: mexicanaImages[4],
    latitude: -10.919,
    longitude: -37.059,
    localizacao: "Calçadão Sul, 15",
    resumo_avaliacoes: "Guacamole delicioso.",
    redes_sociais: "@lafiestaaju",
    rating: 4.5,
    horarioFuncionamento: "18:00 - 00:00",
    tempoEntrega: "35-45 min",
    taxaEntrega: 6.0,
    statusAberto: true,
    tags: ["mexican", "tacos"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c9-p1", comercioId: "c9", nome: "Tacos Al Pastor", descricao: "Tortillas de milho com porco.", preco: 35.0, imagem: veganoImages[4] },
      { id: "c9-p2", comercioId: "c9", nome: "Burrito Supreme", descricao: "Carne, feijao, arroz e queijo.", preco: 40.0, imagem: mexicanaImages[5] },
      { id: "c9-p3", comercioId: "c9", nome: "Nachos com Chili", descricao: "Crocantes com molho picante.", preco: 38.0, imagem: mexicanaImages[6] },
      { id: "c9-p4", comercioId: "c9", nome: "Quesadilla", descricao: "Tortilla de trigo com queijo derretido.", preco: 32.0, imagem: mexicanaImages[7] },
      { id: "c9-p5", comercioId: "c9", nome: "Enchiladas", descricao: "Tortillas enroladas com molho verde.", preco: 42.0, imagem: mexicanaImages[8] },
      { id: "c9-p6", comercioId: "c9", nome: "Guacamole", descricao: "Porcao grande com totopos.", preco: 25.0, imagem: veganoImages[8] },
      { id: "c9-p7", comercioId: "c9", nome: "Fajitas de Pollo", descricao: "Tiras de frango grelhadas.", preco: 55.0, imagem: mexicanaImages[4] },
      { id: "c9-p8", comercioId: "c9", nome: "Margarita", descricao: "Drink classico de tequila.", preco: 28.0, imagem: mexicanaImages[15] },
      { id: "c9-p9", comercioId: "c9", nome: "Churros", descricao: "Com doce de leite ou chocolate.", preco: 15.0, imagem: sushiImages[10] },
      { id: "c9-p10", comercioId: "c9", nome: "Cerveja Sol", descricao: "Long neck gelada com limao.", preco: 12.0, imagem: sushiImages[11] }
    ]
  },
  {
    id: "c10",
    usuarioId: "u10",
    nome: "Pampa Churrascaria",
    email: "pampa@churrasco.com",
    telefoneContato: "79999990010",
    categoria: "Churrascaria",
    descricao: "Tradicao gaucha com os melhores cortes de carne bovina.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: steakhouseImages[12],
    latitude: -10.920,
    longitude: -37.060,
    localizacao: "Rodovia Sul, km 01",
    resumo_avaliacoes: "Carnes no ponto certo.",
    redes_sociais: "@pampaju",
    rating: 4.8,
    horarioFuncionamento: "11:00 - 16:00, 19:00 - 23:00",
    tempoEntrega: "45-55 min",
    taxaEntrega: 15.0,
    statusAberto: true,
    tags: ["churrasco", "carnes"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c10-p1", comercioId: "c10", nome: "Rodizio Completo", descricao: "Acesso total ao buffet e carnes.", preco: 89.0, imagem: steakhouseImages[12] },
      { id: "c10-p2", comercioId: "c10", nome: "Espeto de Picanha", descricao: "Corte selecionado e macio.", preco: 95.0, imagem: steakhouseImages[12] },
      { id: "c10-p3", comercioId: "c10", nome: "Costela 12 Horas", descricao: "Assada lentamente no fogo de chao.", preco: 75.0, imagem: steakhouseImages[12] },
      { id: "c10-p4", comercioId: "c10", nome: "Cupim Casqueirado", descricao: "Muito saboroso e suculento.", preco: 65.0, imagem: steakhouseImages[12] },
      { id: "c10-p5", comercioId: "c10", nome: "Maminha na Brasa", descricao: "Acompanha farofa e vinagrete.", preco: 55.0, imagem: steakhouseImages[13] },
      { id: "c10-p6", comercioId: "c10", nome: "Coracao de Frango", descricao: "Porcao petisco clássica.", preco: 25.0, imagem: steakhouseImages[12] },
      { id: "c10-p7", comercioId: "c10", nome: "Abacaxi Grelhado", descricao: "Com canela e acucar.", preco: 12.0, imagem: comidaNordestinaImages[14] },
      { id: "c10-p8", comercioId: "c10", nome: "Maionese Caseira", descricao: "Receita tradicional da casa.", preco: 15.0, imagem: comidaNordestinaImages[14] },
      { id: "c10-p9", comercioId: "c10", nome: "Caipirinha", descricao: "Limao, acucar e cachaca.", preco: 20.0, imagem: mexicanaImages[15] },
      { id: "c10-p10", comercioId: "c10", nome: "Pudim de Leite", descricao: "Sobremesa favorita do brasileiro.", preco: 12.0, imagem: veganoImages[16] }
    ]
  },
  {
    id: "c11",
    usuarioId: "u11",
    nome: "Homem Elegante",
    email: "moda@homem.com",
    telefoneContato: "79999991011",
    categoria: "Moda Masculina",
    descricao: "Roupas masculinas do casual ao social com alto padrão.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: modaMasculinaImages[11],
    latitude: -10.921,
    longitude: -37.061,
    localizacao: "Rua do Comércio, 12",
    resumo_avaliacoes: "Peças de otima qualidade.",
    redes_sociais: "@homemeleganteaju",
    rating: 4.6,
    horarioFuncionamento: "08:00 - 18:00",
    statusAberto: true,
    tags: ["moda", "masculina"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c11-p1", comercioId: "c11", nome: "Camisa Polo", descricao: "Algodao pima em varias cores.", preco: 120.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p2", comercioId: "c11", nome: "Calca Jeans Slim", descricao: "Lavagem escura e corte moderno.", preco: 180.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p3", comercioId: "c11", nome: "Bermuda Chino", descricao: "Ideal para dias quentes.", preco: 90.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p4", comercioId: "c11", nome: "Camiseta Basica", descricao: "Algodao premium super macio.", preco: 50.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p5", comercioId: "c11", nome: "Blazer Social", descricao: "Corte italiano slim fit.", preco: 450.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p6", comercioId: "c11", nome: "Sapato Social", descricao: "Couro legitimo feito a mao.", preco: 320.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p7", comercioId: "c11", nome: "Cinto de Couro", descricao: "Acessorios essenciais.", preco: 85.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p8", comercioId: "c11", nome: "Jaqueta de Couro", descricao: "Estilo e durabilidade.", preco: 600.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p9", comercioId: "c11", nome: "Relogio Analogico", descricao: "Pulseira de aco inox.", preco: 250.0, imagem: modaMasculinaImages[11] },
      { id: "c11-p10", comercioId: "c11", nome: "Meias Estampadas", descricao: "Kit com 3 unidades.", preco: 40.0, imagem: modaMasculinaImages[11] }
    ]
  },
  {
    id: "c12",
    usuarioId: "u12",
    nome: "Donna Bella",
    email: "donna@bella.com",
    telefoneContato: "79999991012",
    categoria: "Moda Feminina",
    descricao: "Moda feminina para todas as ocasiões com estilo e elegância.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: modaFemininaImages[11],
    latitude: -10.922,
    longitude: -37.062,
    localizacao: "Calçadão da Praia, 80",
    resumo_avaliacoes: "Colecoes maravilhosas.",
    redes_sociais: "@donnabellaaju",
    rating: 4.7,
    horarioFuncionamento: "09:00 - 19:00",
    statusAberto: true,
    tags: ["moda", "feminina"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c12-p1", comercioId: "c12", nome: "Vestido Floral", descricao: "Leve e ideal para o verao.", preco: 150.0, imagem: modaFemininaImages[11] },
      { id: "c12-p2", comercioId: "c12", nome: "Blusa de Seda", descricao: "Toque suave e caimento perfeito.", preco: 120.0, imagem: modaFemininaImages[11] },
      { id: "c12-p3", comercioId: "c12", nome: "Saia Midi", descricao: "Elegancia para the trabalho.", preco: 110.0, imagem: modaFemininaImages[11] },
      { id: "c12-p4", comercioId: "c12", nome: "Calca Pantalona", descricao: "Corte amplo e confortavel.", preco: 140.0, imagem: modaFemininaImages[11] },
      { id: "c12-p5", comercioId: "c12", nome: "Macacao Longo", descricao: "Peca unica sofisticada.", preco: 220.0, imagem: modaFemininaImages[11] },
      { id: "c12-p6", comercioId: "c12", nome: "Bolsa de Couro", descricao: "Acessorio de alta durabilidade.", preco: 350.0, imagem: modaFemininaImages[11] },
      { id: "c12-p7", comercioId: "c12", nome: "Sandalia de Salto", descricao: "Conforto e beleza nos pés.", preco: 180.0, imagem: modaFemininaImages[11] },
      { id: "c12-p8", comercioId: "c12", nome: "Colar Perola", descricao: "Joia delicada e classica.", preco: 95.0, imagem: modaFemininaImages[11] },
      { id: "c12-p9", comercioId: "c12", nome: "Cardigan Leve", descricao: "Para as noites frescas.", preco: 85.0, imagem: modaFemininaImages[11] },
      { id: "c12-p10", comercioId: "c12", nome: "Oculos de Sol", descricao: "Protecao com estilo.", preco: 130.0, imagem: modaFemininaImages[11] }
    ]
  },
  {
    id: "c13",
    usuarioId: "u13",
    nome: "Supermercado Viva",
    email: "sac@viva.com",
    telefoneContato: "79999991013",
    categoria: "Supermercado",
    descricao: "Variedade, frescor e preços baixos para sua família.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: supermercadoImages[12],
    latitude: -10.923,
    longitude: -37.063,
    localizacao: "Av. Coelho e Campos, 150",
    resumo_avaliacoes: "Tudo que preciso encontro aqui.",
    redes_sociais: "@supermercadoviva",
    rating: 4.5,
    horarioFuncionamento: "07:00 - 22:00",
    statusAberto: true,
    tags: ["mercado", "compras"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c13-p1", comercioId: "c13", nome: "Arroz Branco 5kg", descricao: "Tipo 1, graos selecionados.", preco: 25.0, imagem: supermercadoImages[12] },
      { id: "c13-p2", comercioId: "c13", nome: "Feijao Carioca 1kg", descricao: "Cozimento rapido.", preco: 8.0, imagem: supermercadoImages[12] },
      { id: "c13-p3", comercioId: "c13", nome: "Oleo de Soja", descricao: "900ml refinado.", preco: 6.5, imagem: supermercadoImages[12] },
      { id: "c13-p4", comercioId: "c13", nome: "Leite Integral 1L", descricao: "Rico em calcio.", preco: 5.5, imagem: supermercadoImages[12] },
      { id: "c13-p5", comercioId: "c13", nome: "Cafe Torrado 500g", descricao: "Aroma intenso.", preco: 18.0, imagem: supermercadoImages[12] },
      { id: "c13-p6", comercioId: "c13", nome: "Acucar Refinado 1kg", descricao: "Solubilidade extra.", preco: 4.5, imagem: supermercadoImages[12] },
      { id: "c13-p7", comercioId: "c13", nome: "Macarrao Espaguete", descricao: "Massa com ovos 500g.", preco: 4.0, imagem: supermercadoImages[12] },
      { id: "c13-p8", comercioId: "c13", nome: "Detergente Liquido", descricao: "Neutro 500ml.", preco: 2.5, imagem: supermercadoImages[12] },
      { id: "c13-p9", comercioId: "c13", nome: "Papel Higienico", descricao: "Folha dupla 12 rolos.", preco: 15.0, imagem: supermercadoImages[12] },
      { id: "c13-p10", comercioId: "c13", nome: "Sabao em Po 1kg", descricao: "Limpeza profunda.", preco: 12.0, imagem: supermercadoImages[12] }
    ]
  },
  {
    id: "c14",
    usuarioId: "u14",
    nome: "Farmacia Central",
    email: "contato@farmaciacentral.com",
    telefoneContato: "79999991014",
    categoria: "Farmácia",
    descricao: "Sua saúde em boas mãos com assistência farmacêutica de qualidade.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: farmciaImages[12],
    latitude: -10.924,
    longitude: -37.064,
    localizacao: "Praca Fausto Cardoso, 10",
    resumo_avaliacoes: "Atendimento rapido e precos bons.",
    redes_sociais: "@farmacentralaju",
    rating: 4.8,
    horarioFuncionamento: "24 horas",
    statusAberto: true,
    tags: ["saude", "remedios"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c14-p1", comercioId: "c14", nome: "Paracetamol 750mg", descricao: "Analgésico e antitérmico.", preco: 15.0, imagem: farmciaImages[12] },
      { id: "c14-p2", comercioId: "c14", nome: "Vitamina C 1g", descricao: "Efervescente 10 unidades.", preco: 20.0, imagem: farmciaImages[12] },
      { id: "c14-p3", comercioId: "c14", nome: "Alcool em Gel", descricao: "Higiene das maos 500ml.", preco: 12.0, imagem: farmciaImages[12] },
      { id: "c14-p4", comercioId: "c14", nome: "Protetor Solar FPS 50", descricao: "Protecao contra raios UV.", preco: 45.0, imagem: farmciaImages[12] },
      { id: "c14-p5", comercioId: "c14", nome: "Sabonete Liquido", descricao: "Glicerinado neutro.", preco: 18.0, imagem: farmciaImages[12] },
      { id: "c14-p6", comercioId: "c14", nome: "Creme Dental", descricao: "Acao branqueadora.", preco: 8.5, imagem: farmciaImages[12] },
      { id: "c14-p7", comercioId: "c14", nome: "Fralda G 40 unidades", descricao: "Conforto para o bebe.", preco: 55.0, imagem: farmciaImages[12] },
      { id: "c14-p8", comercioId: "c14", nome: "Shampoo Anticaspa", descricao: "Tratamento eficaz.", preco: 30.0, imagem: farmciaImages[12] },
      { id: "c14-p9", comercioId: "c14", nome: "Escova de Dente", descricao: "Cerdas macias.", preco: 12.0, imagem: farmciaImages[12] },
      { id: "c14-p10", comercioId: "c14", nome: "Mascara Descartavel", descricao: "Pacote com 50 unidades.", preco: 25.0, imagem: farmciaImages[12] }
    ]
  },
  {
    id: "c15",
    usuarioId: "u15",
    nome: "Papelaria Criativa",
    email: "vendas@criativa.com",
    telefoneContato: "79999991015",
    categoria: "Papelaria",
    descricao: "Tudo para escritório, escola e artesanato em um só lugar.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: papelariaCriativaImages[8],
    latitude: -10.925,
    longitude: -37.065,
    localizacao: "Rua do Ouvidor, 44",
    resumo_avaliacoes: "Muitas opcoes de materiais.",
    redes_sociais: "@papelariacriativa",
    rating: 4.6,
    horarioFuncionamento: "08:00 - 18:00",
    statusAberto: true,
    tags: ["papelaria", "escolar"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c15-p1", comercioId: "c15", nome: "Caderno Universitario", descricao: "10 materias capa dura.", preco: 25.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p2", comercioId: "c15", nome: "Caneta Azul", descricao: "Escrita suave pacote com 3.", preco: 5.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p3", comercioId: "c15", nome: "Lapis de Cor 24 cores", descricao: "Qualidade artistica.", preco: 40.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p4", comercioId: "c15", nome: "Agenda 2026", descricao: "Organize seu dia.", preco: 35.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p5", comercioId: "c15", nome: "Mochila Escolar", descricao: "Resistente e espacosa.", preco: 120.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p6", comercioId: "c15", nome: "Estojo Duplo", descricao: "Organizacao garantida.", preco: 30.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p7", comercioId: "c15", nome: "Resma Papel A4", descricao: "500 folhas brancas.", preco: 28.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p8", comercioId: "c15", nome: "Grampeador Metal", descricao: "Alta durabilidade.", preco: 15.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p9", comercioId: "c15", nome: "Calculadora Cientifica", descricao: "Ideal para estudantes.", preco: 65.0, imagem: papelariaCriativaImages[8] },
      { id: "c15-p10", comercioId: "c15", nome: "Tinta Guache", descricao: "Kit com 6 cores.", preco: 12.0, imagem: papelariaCriativaImages[8] }
    ]
  },
  {
    id: "c16",
    usuarioId: "u16",
    nome: "Tech World Informática",
    email: "vendas@techworld.com",
    telefoneContato: "79999991016",
    categoria: "Informática",
    descricao: "As melhores marcas de hardware, notebooks e acessórios.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: informticaImages[12],
    latitude: -10.926,
    longitude: -37.066,
    localizacao: "Shopping RioMar, Piso L1",
    resumo_avaliacoes: "Preços competitivos e otima assistencia.",
    redes_sociais: "@techworldaju",
    rating: 4.9,
    horarioFuncionamento: "10:00 - 22:00",
    statusAberto: true,
    tags: ["tecnologia", "computadores"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c16-p1", comercioId: "c16", nome: "Notebook i5 8GB", descricao: "SSD 256GB, tela Full HD.", preco: 3500.0, imagem: informticaImages[12] },
      { id: "c16-p2", comercioId: "c16", nome: "Mouse Gamer", descricao: "RGB com 12000 DPI.", preco: 150.0, imagem: informticaImages[12] },
      { id: "c16-p3", comercioId: "c16", nome: "Teclado Mecanico", descricao: "Switch Blue, padrao ABNT2.", preco: 250.0, imagem: informticaImages[12] },
      { id: "c16-p4", comercioId: "c16", nome: "Monitor 24 Pol", descricao: "Painel IPS, 75Hz.", preco: 850.0, imagem: informticaImages[12] },
      { id: "c16-p5", comercioId: "c16", nome: "Roteador WiFi 6", descricao: "Alta velocidade e cobertura.", preco: 300.0, imagem: informticaImages[12] },
      { id: "c16-p6", comercioId: "c16", nome: "Headset Gamer", descricao: "Som surround 7.1.", preco: 200.0, imagem: informticaImages[12] },
      { id: "c16-p7", comercioId: "c16", nome: "Impressora Multifuncional", descricao: "Tanque de tinta colorido.", preco: 950.0, imagem: informticaImages[12] },
      { id: "c16-p8", comercioId: "c16", nome: "SSD 480GB", descricao: "Upgrade de velocidade.", preco: 180.0, imagem: informticaImages[12] },
      { id: "c16-p9", comercioId: "c16", nome: "Webcam Full HD", descricao: "Ideal for home office.", preco: 120.0, imagem: informticaImages[12] },
      { id: "c16-p10", comercioId: "c16", nome: "Pendrive 64GB", descricao: "Armazenamento portatil.", preco: 45.0, imagem: informticaImages[12] }
    ]
  },
  {
    id: "c17",
    usuarioId: "u17",
    nome: "Livraria Saber",
    email: "contato@saber.com",
    telefoneContato: "79999991017",
    categoria: "Livraria",
    descricao: "Um refúgio para os amantes da leitura com títulos nacionais e importados.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: livrariaImages[12],
    latitude: -10.927,
    longitude: -37.067,
    localizacao: "Rua Santa Luzia, 15",
    resumo_avaliacoes: "Selecao de livros incrivel.",
    redes_sociais: "@livrariasaberaju",
    rating: 4.8,
    horarioFuncionamento: "09:00 - 19:00",
    statusAberto: true,
    tags: ["livros", "leitura"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c17-p1", comercioId: "c17", nome: "O Senhor dos Aneis", descricao: "Edicao de colecionador.", preco: 95.0, imagem: livrariaImages[12] },
      { id: "c17-p2", comercioId: "c17", nome: "Dom Casmurro", descricao: "Classico de Machado de Assis.", preco: 30.0, imagem: livrariaImages[12] },
      { id: "c17-p3", comercioId: "c17", nome: "Harry Potter 1", descricao: "A Pedra Filosofal.", preco: 45.0, imagem: livrariaImages[12] },
      { id: "c17-p4", comercioId: "c17", nome: "1984 George Orwell", descricao: "Distopia clássica.", preco: 35.0, imagem: livrariaImages[12] },
      { id: "c17-p5", comercioId: "c17", nome: "Box Sherlock Holmes", descricao: "Todas as historias do detetive.", preco: 120.0, imagem: livrariaImages[12] },
      { id: "c17-p6", comercioId: "c17", nome: "Caderneta de Notas", descricao: "Papel de alta gramatura.", preco: 25.0, imagem: livrariaImages[12] },
      { id: "c17-p7", comercioId: "c17", nome: "Luminaria de Leitura", descricao: "Clip para livros.", preco: 40.0, imagem: livrariaImages[12] },
      { id: "c17-p8", comercioId: "c17", nome: "Marcador Magnético", descricao: "Kit com 5 unidades.", preco: 15.0, imagem: livrariaImages[12] },
      { id: "c17-p9", comercioId: "c17", nome: "Dicionario de Ingles", descricao: "Edicao atualizada.", preco: 55.0, imagem: livrariaImages[12] },
      { id: "c17-p10", comercioId: "c17", nome: "Quebra-cabeca Literário", descricao: "1000 pecas tema livros.", preco: 70.0, imagem: livrariaImages[12] }
    ]
  },
  {
    id: "c18",
    usuarioId: "u18",
    nome: "Pizzaria Bella Italia",
    email: "bella@italia.com",
    telefoneContato: "79988880018",
    categoria: "Pizzaria",
    descricao: "Sabores autenticos da Italia em massas artesanais.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: pizzariaImages[4],
    latitude: -10.930,
    longitude: -37.070,
    localizacao: "Rua Augusta, 400",
    resumo_avaliacoes: "Excelente custo beneficio.",
    redes_sociais: "@bellaitaliaaju",
    rating: 4.6,
    horarioFuncionamento: "18:00 - 23:30",
    tempoEntrega: "30-45 min",
    taxaEntrega: 5.0,
    statusAberto: true,
    tags: ["pizza", "italiana"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c18-p1", comercioId: "c18", nome: "Pizza de Pesto", descricao: "Molho pesto e queijo brie.", preco: 65.0, imagem: pizzariaImages[4] },
      { id: "c18-p2", comercioId: "c18", nome: "Pizza de Rucula", descricao: "Tomate seco e mussarela de bufala.", preco: 60.0, imagem: pizzariaImages[5] },
      { id: "c18-p3", comercioId: "c18", nome: "Calzone de Frango", descricao: "Recheio cremoso com catupiry.", preco: 45.0, imagem: pizzariaImages[14] },
      { id: "c18-p4", comercioId: "c18", nome: "Pizza Doce", descricao: "Chocolate com morangos frescos.", preco: 50.0, imagem: pizzariaImages[7] },
      { id: "c18-p5", comercioId: "c18", nome: "Pizza de Camarao", descricao: "Camaroes médios e alho poro.", preco: 75.0, imagem: pizzariaImages[8] },
      { id: "c18-p6", comercioId: "c18", nome: "Focaccia Alecrim", descricao: "Pao italiano com sal grosso.", preco: 25.0, imagem: pizzariaImages[8] },
      { id: "c18-p7", comercioId: "c18", nome: "Salada Caprese", descricao: "Tomate, mussarela e manjericao.", preco: 35.0, imagem: pizzariaImages[9] },
      { id: "c18-p8", comercioId: "c18", nome: "Suco de Uva", descricao: "Integral 500ml.", preco: 15.0, imagem: veganoImages[11] },
      { id: "c18-p9", comercioId: "c18", nome: "Cerveja Long Neck", descricao: "Gelada 355ml.", preco: 10.0, imagem: sushiImages[11] },
      { id: "c18-p10", comercioId: "c18", nome: "Cannoli", descricao: "Doce siciliano com ricota.", preco: 18.0, imagem: pizzariaImages[12] }
    ]
  },
  {
    id: "c19",
    usuarioId: "u19",
    nome: "Sushi Zen",
    email: "contato@sushizen.com",
    telefoneContato: "79988880019",
    categoria: "Sushi",
    descricao: "Equilibrio e frescor em cada peca de sushi.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: sushiImages[11],
    latitude: -10.931,
    longitude: -37.071,
    localizacao: "Av. Jorge Amado, 50",
    resumo_avaliacoes: "Peixe de alta qualidade.",
    redes_sociais: "@sushizenaju",
    rating: 4.9,
    horarioFuncionamento: "19:00 - 00:00",
    tempoEntrega: "40-55 min",
    taxaEntrega: 8.0,
    statusAberto: true,
    tags: ["sushi", "japonesa"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c19-p1", comercioId: "c19", nome: "Combo Zen 30", descricao: "Selecao do chef com 30 pecas.", preco: 120.0, imagem: sushiImages[12] },
      { id: "c19-p2", comercioId: "c19", nome: "Nigiri de Atum", descricao: "6 unidades de atum fresco.", preco: 40.0, imagem: sushiImages[11] },
      { id: "c19-p3", comercioId: "c19", nome: "Poke Salmao", descricao: "Tigela com arroz e acompanhamentos.", preco: 55.0, imagem: sushiImages[12] },
      { id: "c19-p4", comercioId: "c19", nome: "Uramaki Ebi", descricao: "Camarao empanado e cream cheese.", preco: 35.0, imagem: sushiImages[12] },
      { id: "c19-p5", comercioId: "c19", nome: "Shimeji na Manteiga", descricao: "Porcao de cogumelos quentes.", preco: 30.0, imagem: sushiImages[12] },
      { id: "c19-p6", comercioId: "c19", nome: "Harumaki de Carne", descricao: "Rolinho primavera crocante.", preco: 15.0, imagem: sushiImages[12] },
      { id: "c19-p7", comercioId: "c19", nome: "Temaki Philadelphia", descricao: "Salmao, cream cheese e cebolinha.", preco: 32.0, imagem: sushiImages[12] },
      { id: "c19-p8", comercioId: "c19", nome: "Sashimi de Polvo", descricao: "8 fatias finas de polvo.", preco: 50.0, imagem: sushiImages[12] },
      { id: "c19-p9", comercioId: "c19", nome: "Saque Junmai", descricao: "Garrafa pequena 300ml.", preco: 60.0, imagem: sushiImages[12] },
      { id: "c19-p10", comercioId: "c19", nome: "Tempura de Sorvete", descricao: "Sobremesa frita e gelada.", preco: 25.0, imagem: sushiImages[12] }
    ]
  },
  {
    id: "c20",
    usuarioId: "u20",
    nome: "Dragao Dourado",
    email: "contato@dragaodourado.com",
    telefoneContato: "79988880020",
    categoria: "Comida Chinesa",
    descricao: "Tradicao milenar em pratos fartos e saborosos.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: sushiImages[12],
    latitude: -10.932,
    longitude: -37.072,
    localizacao: "Rua Siriri, 120",
    resumo_avaliacoes: "Melhor Yakissoba da cidade.",
    redes_sociais: "@dragaodouradoaju",
    rating: 4.5,
    horarioFuncionamento: "11:00 - 15:00, 18:30 - 22:30",
    tempoEntrega: "35-50 min",
    taxaEntrega: 6.0,
    statusAberto: true,
    tags: ["chinesa", "yakissoba"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c20-p1", comercioId: "c20", nome: "Yakissoba Especial", descricao: "Carne, frango e legumes.", preco: 48.0, imagem: sushiImages[12] },
      { id: "c20-p2", comercioId: "c20", nome: "Frango Xadrez", descricao: "Com amendoim e pimentao.", preco: 42.0, imagem: comidaChinesaImages[12] },
      { id: "c20-p3", comercioId: "c20", nome: "Carne com Batata", descricao: "Tiras de carne e batatas fritas.", preco: 45.0, imagem: steakhouseImages[12] },
      { id: "c20-p4", comercioId: "c20", nome: "Arroz Colorido", descricao: "Presunto, ovo e cebolinha.", preco: 25.0, imagem: comidaChinesaImages[12] },
      { id: "c20-p5", comercioId: "c20", nome: "Lombo Agridoce", descricao: "Com abacaxi e molho especial.", preco: 40.0, imagem: steakhouseImages[13] },
      { id: "c20-p6", comercioId: "c20", nome: "Guioza Suino", descricao: "6 unidades no vapor.", preco: 22.0, imagem: sushiImages[12] },
      { id: "c20-p7", comercioId: "c20", nome: "Rolinho Primavera", descricao: "Legumes crocantes.", preco: 8.0, imagem: sushiImages[12] },
      { id: "c20-p8", comercioId: "c20", nome: "Banana Caramelizada", descricao: "Com gergelim.", preco: 15.0, imagem: steakhouseImages[13] },
      { id: "c20-p9", comercioId: "c20", nome: "Cha de Jasmim", descricao: "Bebida tradicional quente.", preco: 10.0, imagem: comidaChinesaImages[14] },
      { id: "c20-p10", comercioId: "c20", nome: "Biscoito da Sorte", descricao: "Mensagem surpresa.", preco: 2.0, imagem: comidaChinesaImages[8] }
    ]
  },
  {
    id: "c21",
    usuarioId: "u21",
    nome: "Grao Gourmet",
    email: "cafe@graogourmet.com",
    telefoneContato: "79988880021",
    categoria: "Cafeteria Gourmet",
    descricao: "Cafes especiais de origens selecionadas e acompanhamentos finos.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: cafeteriaGourmetImages[0],
    latitude: -10.933,
    longitude: -37.073,
    localizacao: "Orla da Atalaia, Quiosque 4",
    resumo_avaliacoes: "Melhor expresso de Aracaju.",
    redes_sociais: "@graogourmetaju",
    rating: 4.8,
    horarioFuncionamento: "08:00 - 20:00",
    tempoEntrega: "20-30 min",
    taxaEntrega: 4.0,
    statusAberto: true,
    tags: ["cafe", "gourmet"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c21-p1", comercioId: "c21", nome: "Expresso Duplo", descricao: "Blend da casa intenso.", preco: 8.0, imagem: sorveteriaPremiumImages[0] },
      { id: "c21-p2", comercioId: "c21", nome: "Cappuccino Italiano", descricao: "Com cacau em po e canela.", preco: 12.0, imagem: cafeteriaGourmetImages[0] },
      { id: "c21-p3", comercioId: "c21", nome: "Flat White", descricao: "Leite vaporizado e cafe.", preco: 14.0, imagem: cafeteriaGourmetImages[0] },
      { id: "c21-p4", comercioId: "c21", nome: "Croissant de Chocolate", descricao: "Massa folhada e recheio.", preco: 10.0, imagem: cafeteriaGourmetImages[0] },
      { id: "c21-p5", comercioId: "c21", nome: "Pao de Queijo", descricao: "Porcao com 5 unidades.", preco: 15.0, imagem: comidaNordestinaImages[7] },
      { id: "c21-p6", comercioId: "c21", nome: "Bolo de Cenoura", descricao: "Com cobertura de brigadeiro.", preco: 12.0, imagem: comidaChinesaImages[8] },
      { id: "c21-p7", comercioId: "c21", nome: "Toast de Avocado", descricao: "Pao integral e abacate.", preco: 22.0, imagem: cafeteriaGourmetImages[9] },
      { id: "c21-p8", comercioId: "c21", nome: "Iced Latte", descricao: "Refrescante com gelo.", preco: 16.0, imagem: sorveteriaPremiumImages[10] },
      { id: "c21-p9", comercioId: "c21", nome: "Cha Gelado", descricao: "Limao e hortela.", preco: 10.0, imagem: veganoImages[11] },
      { id: "c21-p10", comercioId: "c21", nome: "Quiche Loraine", descricao: "Bacon e queijo.", preco: 18.0, imagem: veganoImages[12] }
    ]
  },
  {
    id: "c22",
    usuarioId: "u22",
    nome: "Gelato Supremo",
    email: "gelato@supremo.com",
    telefoneContato: "79988880022",
    categoria: "Sorveteria Premium",
    descricao: "Gelatos artesanais feitos diariamente com frutas frescas.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: sorveteriaPremiumImages[12],
    latitude: -10.934,
    longitude: -37.074,
    localizacao: "Av. Beira Mar, 2000",
    resumo_avaliacoes: "Sabores unicos e cremosos.",
    redes_sociais: "@gelatosupremoaju",
    rating: 4.9,
    horarioFuncionamento: "11:00 - 22:00",
    tempoEntrega: "15-25 min",
    taxaEntrega: 3.0,
    statusAberto: true,
    tags: ["sorvete", "gelato"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c22-p1", comercioId: "c22", nome: "Gelato de Pistache", descricao: "Pistache italiano puro.", preco: 18.0, imagem: sorveteriaPremiumImages[12] },
      { id: "c22-p2", comercioId: "c22", nome: "Gelato de Chocolate", descricao: "Belga 70% cacau.", preco: 16.0, imagem: sorveteriaPremiumImages[12] },
      { id: "c22-p3", comercioId: "c22", nome: "Sorbet de Morango", descricao: "Sem leite, pura fruta.", preco: 15.0, imagem: sorveteriaPremiumImages[10] },
      { id: "c22-p4", comercioId: "c22", nome: "Gelato de Avela", descricao: "Com pedacos crocantes.", preco: 17.0, imagem: sushiImages[10] },
      { id: "c22-p5", comercioId: "c22", nome: "Casquinha Artesanal", descricao: "Feita na hora.", preco: 5.0, imagem: sorveteriaPremiumImages[12] },
      { id: "c22-p6", comercioId: "c22", nome: "Milkshake de Baunilha", descricao: "Com favas naturais.", preco: 22.0, imagem: sorveteriaPremiumImages[10] },
      { id: "c22-p7", comercioId: "c22", nome: "Petit Gateau", descricao: "Com uma bola de gelato.", preco: 28.0, imagem: veganoImages[16] },
      { id: "c22-p8", comercioId: "c22", nome: "Affogato", descricao: "Expresso com gelato.", preco: 18.0, imagem: sorveteriaPremiumImages[0] },
      { id: "c22-p9", comercioId: "c22", nome: "Copo Familiar 500ml", descricao: "Escolha ate 3 sabores.", preco: 45.0, imagem: sorveteriaPremiumImages[12] },
      { id: "c22-p10", comercioId: "c22", nome: "Picolé Gourmet", descricao: "Banho de chocolate.", preco: 12.0, imagem: sorveteriaPremiumImages[12] }
    ]
  },
  {
    id: "c23",
    usuarioId: "u23",
    nome: "Kids World",
    email: "vendas@kidsworld.com",
    telefoneContato: "79988880023",
    categoria: "Loja de Brinquedos",
    descricao: "Onde a imaginacao ganha vida para criancas de todas as idades.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: lojadeBrinquedosImages[12],
    latitude: -10.935,
    longitude: -37.075,
    localizacao: "Shopping RioMar, Piso L2",
    resumo_avaliacoes: "Muitas novidades.",
    redes_sociais: "@kidsworldaju",
    rating: 4.7,
    horarioFuncionamento: "10:00 - 22:00",
    statusAberto: true,
    tags: ["brinquedos", "kids"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c23-p1", comercioId: "c23", nome: "Robo Inteligente", descricao: "Caminha e fala frases.", preco: 280.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p2", comercioId: "c23", nome: "Pista de Loop", descricao: "Inclui 2 carrinhos velozes.", preco: 150.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p3", comercioId: "c23", nome: "Kit de Cozinha", descricao: "Com fogao e panelinhas.", preco: 110.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p4", comercioId: "c23", nome: "Urso Gigante", descricao: "1 metro de fofura.", preco: 250.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p5", comercioId: "c23", nome: "Quebra-cabeca 3D", descricao: "Monumento historico.", preco: 85.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p6", comercioId: "c23", nome: "Lego City", descricao: "Delegacia de policia.", preco: 350.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p7", comercioId: "c23", nome: "Boneco Heroi", descricao: "Com luz e som.", preco: 95.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p8", comercioId: "c23", nome: "Patinete 3 Rodas", descricao: "Estabilidade para os pequenos.", preco: 180.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p9", comercioId: "c23", nome: "Mascara de Dinossauro", descricao: "Abre a boca e ruge.", preco: 130.0, imagem: lojadeBrinquedosImages[12] },
      { id: "c23-p10", comercioId: "c23", nome: "Jogo de Magica", descricao: "Aprenda 50 truques.", preco: 75.0, imagem: lojadeBrinquedosImages[12] }
    ]
  },
  {
    id: "c24",
    usuarioId: "u24",
    nome: "Jardim Encantado",
    email: "flores@jardim.com",
    telefoneContato: "79988880024",
    categoria: "Floricultura",
    descricao: "Flores e arranjos exclusivos para momentos inesqueciveis.",
    vendedorAmbulante: true,
    estacionamento: false,
    imagem: floriculturaImages[10],
    latitude: -10.936,
    longitude: -37.076,
    localizacao: "Praca Fausto Cardoso, Box 2",
    resumo_avaliacoes: "Arranjos lindissimos.",
    redes_sociais: "@jardimencantadoaju",
    rating: 4.8,
    horarioFuncionamento: "07:30 - 18:30",
    statusAberto: true,
    tags: ["flores", "presentes"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c24-p1", comercioId: "c24", nome: "Buque de Girassois", descricao: "5 flores grandes e vibrantes.", preco: 85.0, imagem: floriculturaImages[11] },
      { id: "c24-p2", comercioId: "c24", nome: "Rosa Unitaria", descricao: "Embalada com laco de cetim.", preco: 15.0, imagem: floriculturaImages[10] },
      { id: "c24-p3", comercioId: "c24", nome: "Vaso de Violetas", descricao: "Diversas cores disponiveis.", preco: 25.0, imagem: floriculturaImages[10] },
      { id: "c24-p4", comercioId: "c24", nome: "Bonsai de Jabuticaba", descricao: "Arvore em miniatura.", preco: 180.0, imagem: floriculturaImages[10] },
      { id: "c24-p5", comercioId: "c24", nome: "Cesta de Orquideas", descricao: "Luxuoso arranjo misto.", preco: 250.0, imagem: floriculturaImages[10] },
      { id: "c24-p6", comercioId: "c24", nome: "Kalanchoe no Vaso", descricao: "Flor da fortuna colorida.", preco: 30.0, imagem: floriculturaImages[10] },
      { id: "c24-p7", comercioId: "c24", nome: "Terrario de Cactos", descricao: "Ecossistema em vidro.", preco: 95.0, imagem: floriculturaImages[10] },
      { id: "c24-p8", comercioId: "c24", nome: "Sementes de Rosas", descricao: "Pacote com 20 sementes.", preco: 12.0, imagem: floriculturaImages[10] },
      { id: "c24-p9", comercioId: "c24", nome: "Adubo Organico", descricao: "Saco de 1kg reforcado.", preco: 20.0, imagem: floriculturaImages[10] },
      { id: "c24-p10", comercioId: "c24", nome: "Vaso de Barro", descricao: "Artesanato local decorado.", preco: 40.0, imagem: floriculturaImages[11] }
    ]
  },
  {
    id: "c25",
    usuarioId: "u25",
    nome: "Arte no Papel",
    email: "vendas@artenopapel.com",
    telefoneContato: "79988880025",
    categoria: "Papelaria Criativa",
    descricao: "Materiais para artistas e estudantes que amam criar.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: papelariaCriativaImages[8],
    latitude: -10.937,
    longitude: -37.077,
    localizacao: "Rua do Ouvidor, 15",
    resumo_avaliacoes: "Muitos itens exclusivos.",
    redes_sociais: "@artenopapelaju",
    rating: 4.6,
    horarioFuncionamento: "08:00 - 18:00",
    statusAberto: true,
    tags: ["papelaria", "arte"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c25-p1", comercioId: "c25", nome: "Canetas Brush Pen", descricao: "Kit com 12 cores dual tip.", preco: 65.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p2", comercioId: "c25", nome: "Caderno Pontilhado", descricao: "Ideal para Bullet Journal.", preco: 55.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p3", comercioId: "c25", nome: "Washi Tapes", descricao: "Conjunto com 5 rolos decorados.", preco: 25.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p4", comercioId: "c25", nome: "Estojo Holografico", descricao: "Espacoso e moderno.", preco: 35.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p5", comercioId: "c25", nome: "Aquarela Profissional", descricao: "Pastilha com 24 cores.", preco: 120.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p6", comercioId: "c25", nome: "Pinceis de Agua", descricao: "Set com 3 tamanhos.", preco: 40.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p7", comercioId: "c25", nome: "Bloco de Desenho", descricao: "Papel 200g para artes.", preco: 30.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p8", comercioId: "c25", nome: "Carimbos Decorativos", descricao: "Kit com temas de plantas.", preco: 45.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p9", comercioId: "c25", nome: "Grampeador Rose Gold", descricao: "Elegancia na sua mesa.", preco: 28.0, imagem: papelariaCriativaImages[8] },
      { id: "c25-p10", comercioId: "c25", nome: "Planners 2026", descricao: "Organizacao completa anual.", preco: 80.0, imagem: papelariaCriativaImages[8] }
    ]
  },
  {
    id: "c26",
    usuarioId: "u26",
    nome: "Glamour Make",
    email: "sac@glamourmake.com",
    telefoneContato: "79988880026",
    categoria: "Loja de Maquiagem",
    descricao: "Cosmeticos de luxo e acessorios para sua beleza diaria.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: lojadeMaquiagemImages[4],
    latitude: -10.938,
    longitude: -37.078,
    localizacao: "Rua Santa Luzia, 88",
    resumo_avaliacoes: "Melhores marcas importadas.",
    redes_sociais: "@glamourmakeaju",
    rating: 4.9,
    horarioFuncionamento: "09:00 - 20:00",
    statusAberto: true,
    tags: ["make", "beleza"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c26-p1", comercioId: "c26", nome: "Base Matte Fluida", descricao: "Cobertura alta e natural.", preco: 150.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p2", comercioId: "c26", nome: "Paleta de Sombras", descricao: "18 tons nudes e cintilantes.", preco: 120.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p3", comercioId: "c26", nome: "Batom Vermelho", descricao: "Acabamento aveludado.", preco: 45.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p4", comercioId: "c26", nome: "Rimel Curvador", descricao: "Efeito cilios posticos.", preco: 60.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p5", comercioId: "c26", nome: "Iluminador Compacto", descricao: "Brilho intenso e duradouro.", preco: 55.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p6", comercioId: "c26", nome: "Delineador em Caneta", descricao: "Traco preciso e a prova d'agua.", preco: 38.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p7", comercioId: "c26", nome: "Kit de Pinceis", descricao: "7 peças profissionais.", preco: 110.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p8", comercioId: "c26", nome: "Blush Rosado", descricao: "Efeito saude imediato.", preco: 42.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p9", comercioId: "c26", nome: "Esponja de Mistura", descricao: "Maciez e espalhabilidade.", preco: 25.0, imagem: lojadeMaquiagemImages[4] },
      { id: "c26-p10", comercioId: "c26", nome: "Fixador de Maquiagem", descricao: "Spray refrescante 100ml.", preco: 50.0, imagem: lojadeMaquiagemImages[4] }
    ],
    // estacionamento: false
  },
  {
    id: "c27",
    usuarioId: "u27",
    nome: "Forte Construcoes",
    email: "vendas@forteconstrucoes.com",
    telefoneContato: "79988880027",
    categoria: "Materiais de Construção",
    descricao: "Do alicerce ao acabamento, tudo para sua obra.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: materiaisdeConstruoImages[4],
    latitude: -10.939,
    longitude: -37.079,
    localizacao: "Av. Coelho e Campos, 800",
    resumo_avaliacoes: "Entrega rapida e precos baixos.",
    redes_sociais: "@forteconstrucoesaju",
    rating: 4.6,
    horarioFuncionamento: "07:30 - 18:00",
    statusAberto: true,
    tags: ["construcao", "obra"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c27-p1", comercioId: "c27", nome: "Cimento 50kg", descricao: "Alta resistencia inicial.", preco: 35.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p2", comercioId: "c27", nome: "Tinta Acrilica 18L", descricao: "Branco gelo rendimento extra.", preco: 280.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p3", comercioId: "c27", nome: "Furadeira Impacto", descricao: "Potencia 600W com maleta.", preco: 220.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p4", comercioId: "c27", nome: "Piso Ceramico", descricao: "Caixa com 2.5m2 amadeirado.", preco: 85.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p5", comercioId: "c27", nome: "Argamassa ACIII", descricao: "Uso interno e externo 20kg.", preco: 45.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p6", comercioId: "c27", nome: "Kit de Chaves", descricao: "Fenda e Philips 6 pecas.", preco: 60.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p7", comercioId: "c27", nome: "Torneira Gourmet", descricao: "Flexivel com jato duplo.", preco: 180.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p8", comercioId: "c27", nome: "Luminaria Plafon", descricao: "LED 18W embutir.", preco: 35.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p9", comercioId: "c27", nome: "Escada Alumínio", descricao: "5 degraus reforçada.", preco: 150.0, imagem: materiaisdeConstruoImages[4] },
      { id: "c27-p10", comercioId: "c27", nome: "Saco de Cal 20kg", descricao: "Para pintura e reboco.", preco: 18.0, imagem: materiaisdeConstruoImages[4] }
    ]
  },
  {
    id: "c28",
    usuarioId: "u28",
    nome: "Vinho & Sabor",
    email: "contato@vinhosabor.com",
    telefoneContato: "79988880028",
    categoria: "Adega de Vinhos",
    descricao: "Rótulos selecionados das melhores regiões vinicolas do mundo.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: veganoImages[0],
    latitude: -10.940,
    longitude: -37.080,
    localizacao: "Av. Hermes Fontes, 500",
    resumo_avaliacoes: "Selecao de vinhos impecavel.",
    redes_sociais: "@vinhosaboraju",
    rating: 4.9,
    horarioFuncionamento: "10:00 - 21:00",
    statusAberto: true,
    tags: ["vinho", "adega"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c28-p1", comercioId: "c28", nome: "Malbec Argentino", descricao: "Reserva 2022 encorpado.", preco: 95.0, imagem: veganoImages[0] },
      { id: "c28-p2", comercioId: "c28", nome: "Chardonnay Chileno", descricao: "Notas de frutas tropicais.", preco: 75.0, imagem: veganoImages[0] },
      { id: "c28-p3", comercioId: "c28", nome: "Espumante Brut", descricao: "Metodo tradicional 750ml.", preco: 120.0, imagem: veganoImages[0] },
      { id: "c28-p4", comercioId: "c28", nome: "Vinho Rose", descricao: "Leve e refrescante para o verao.", preco: 65.0, imagem: veganoImages[0] },
      { id: "c28-p5", comercioId: "c28", nome: "Vinho do Porto", descricao: "Doce e fortificado.", preco: 180.0, imagem: veganoImages[0] },
      { id: "c28-p6", comercioId: "c28", nome: "Taca de Cristal", descricao: "Set com 2 unidades.", preco: 110.0, imagem: veganoImages[0] },
      { id: "c28-p7", comercioId: "c28", nome: "Saca-rolhas Alavanca", descricao: "Facilidade e precisao.", preco: 55.0, imagem: veganoImages[0] },
      { id: "c28-p8", comercioId: "c28", nome: "Decanter de Vidro", descricao: "Para aeracao do vinho.", preco: 140.0, imagem: veganoImages[0] },
      { id: "c28-p9", comercioId: "c28", nome: "Queijo Parmesao", descricao: "Peca de 300g maturada.", preco: 45.0, imagem: veganoImages[0] },
      { id: "c28-p10", comercioId: "c28", nome: "Antepasto de Berinjela", descricao: "Pote de 200g artesanal.", preco: 25.0, imagem: veganoImages[0] }
    ]
  },
  {
    id: "c29",
    usuarioId: "u29",
    nome: "Acordes & Notas",
    email: "musica@acordes.com",
    telefoneContato: "79988880029",
    categoria: "Loja de Instrumentos Musicais",
    descricao: "Som de qualidade com os melhores instrumentos e acessorios.",
    vendedorAmbulante: false,
    estacionamento: true,
    imagem: lojadeInstrumentosMusicaisImages[8],
    latitude: -10.941,
    longitude: -37.081,
    localizacao: "Rua do Comércio, 150",
    resumo_avaliacoes: "Atendimento de musicos para musicos.",
    redes_sociais: "@acordesnotasaju",
    rating: 4.8,
    horarioFuncionamento: "09:00 - 18:30",
    statusAberto: true,
    tags: ["musica", "instrumentos"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c29-p1", comercioId: "c29", nome: "Violao de Aco", descricao: "Sonoridade brilhante e macia.", preco: 650.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p2", comercioId: "c29", nome: "Guitarra Strato", descricao: "3 captadores single coil.", preco: 1200.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p3", comercioId: "c29", nome: "Teclado 61 Teclas", descricao: "Com sensibilidade ao toque.", preco: 950.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p4", comercioId: "c29", nome: "Cajon de Madeira", descricao: "Percussao versatil.", preco: 350.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p5", comercioId: "c29", nome: "Amplificador 15W", descricao: "Ideal para estudo em casa.", preco: 480.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p6", comercioId: "c29", nome: "Encordoamento Aco", descricao: "Kit 0.10 completo.", preco: 45.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p7", comercioId: "c29", nome: "Palhetas Sortidas", descricao: "Pacote com 10 unidades.", preco: 20.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p8", comercioId: "c29", nome: "Cabo P10 3m", descricao: "Blindagem anti-ruido.", preco: 55.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p9", comercioId: "c29", nome: "Suporte de Chao", descricao: "Para violao ou guitarra.", preco: 65.0, imagem: lojadeInstrumentosMusicaisImages[8] },
      { id: "c29-p10", comercioId: "c29", nome: "Afinador Digital", descricao: "Clip para headstock.", preco: 40.0, imagem: lojadeInstrumentosMusicaisImages[8] }
    ]
  },
  {
    id: "c30",
    usuarioId: "u30",
    nome: "Pet Care",
    email: "contato@petcare.com",
    telefoneContato: "79988880030",
    categoria: "Pet Shop",
    descricao: "Tudo para o seu melhor amigo, de racao a banho e tosa.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: petShopImages[4],
    latitude: -10.942,
    longitude: -37.082,
    localizacao: "Av. Adelia Franco, 100",
    resumo_avaliacoes: "Cuidado e carinho com os pets.",
    redes_sociais: "@petcareaju",
    rating: 4.7,
    horarioFuncionamento: "08:00 - 19:00",
    statusAberto: true,
    tags: ["pet", "animal"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c30-p1", comercioId: "c30", nome: "Racao Premium 10kg", descricao: "Para caes adultos porte medio.", preco: 180.0, imagem: petShopImages[4] },
      { id: "c30-p2", comercioId: "c30", nome: "Petisco Dental", descricao: "Limpeza dos dentes e hálito.", preco: 25.0, imagem: petShopImages[4] },
      { id: "c30-p3", comercioId: "c30", nome: "Shampoo para Pets", descricao: "Hipoalergenico 500ml.", preco: 35.0, imagem: petShopImages[4] },
      { id: "c30-p4", comercioId: "c30", nome: "Cama Macia G", descricao: "Conforto para o sono do pet.", preco: 120.0, imagem: petShopImages[4] },
      { id: "c30-p5", comercioId: "c30", nome: "Coleira Ajustavel", descricao: "Com guia de 1.2m.", preco: 55.0, imagem: petShopImages[4] },
      { id: "c30-p6", comercioId: "c30", nome: "Brinquedo Mordedor", descricao: "Borracha resistente.", preco: 28.0, imagem: petShopImages[4] },
      { id: "c30-p7", comercioId: "c30", nome: "Caixa de Transporte", descricao: "Seguranca em viagens.", preco: 150.0, imagem: petShopImages[4] },
      { id: "c30-p8", comercioId: "c30", nome: "Arranhador para Gatos", descricao: "Com 3 niveis e brinquedo.", preco: 95.0, imagem: petShopImages[4] },
      { id: "c30-p9", comercioId: "c30", nome: "Comedouro Inox", descricao: "Antiderrapante 500ml.", preco: 30.0, imagem: petShopImages[4] },
      { id: "c30-p10", comercioId: "c30", nome: "Areia Sanitaria 4kg", descricao: "Absorcao de odores.", preco: 22.0, imagem: petShopImages[4] }
    ]
  },
  {
    id: "c31",
    usuarioId: "u31",
    nome: "Tempo & Estilo",
    email: "contato@tempoestilo.com",
    telefoneContato: "79988880031",
    categoria: "Relojoaria",
    descricao: "Ponteiros que marcam sua elegancia e pontualidade.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: relojoariaImages[16],
    latitude: -10.943,
    longitude: -37.083,
    localizacao: "Shopping Jardins, Piso L1",
    resumo_avaliacoes: "Relogios de luxo e casuais.",
    redes_sociais: "@tempoestiloaju",
    rating: 4.9,
    horarioFuncionamento: "10:00 - 22:00",
    statusAberto: true,
    tags: ["relogios", "luxo"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c31-p1", comercioId: "c31", nome: "Relogio Cronografo", descricao: "Aco inoxidavel e resistente a agua.", preco: 850.0, imagem: relojoariaImages[16] },
      { id: "c31-p2", comercioId: "c31", nome: "Relogio de Pulso Classico", descricao: "Pulseira de couro legitimo.", preco: 450.0, imagem: relojoariaImages[16] },
      { id: "c31-p3", comercioId: "c31", nome: "Relogio Digital Sport", descricao: "Com cronometro e alarme.", preco: 250.0, imagem: relojoariaImages[16] },
      { id: "c31-p4", comercioId: "c31", nome: "Relogio Feminino Gold", descricao: "Com cristais delicados.", preco: 600.0, imagem: relojoariaImages[16] },
      { id: "c31-p5", comercioId: "c31", nome: "Smartwatch Elite", descricao: "Notificacoes e saude.", preco: 1200.0, imagem: relojoariaImages[16] },
      { id: "c31-p6", comercioId: "c31", nome: "Relogio de Parede Retro", descricao: "Decorativo em metal.", preco: 180.0, imagem: relojoariaImages[16] },
      { id: "c31-p7", comercioId: "c31", nome: "Pulseira de Aco", descricao: "Reposicao para varios modelos.", preco: 85.0, imagem: relojoariaImages[16] },
      { id: "c31-p8", comercioId: "c31", nome: "Bateria de Relogio", descricao: "Troca inclusa no valor.", preco: 30.0, imagem: relojoariaImages[16] },
      { id: "c31-p9", comercioId: "c31", nome: "Caixa para Relogios", descricao: "Capacidade para 6 unidades.", preco: 110.0, imagem: relojoariaImages[16] },
      { id: "c31-p10", comercioId: "c31", nome: "Relogio Minimalista", descricao: "Design clean e moderno.", preco: 380.0, imagem: relojoariaImages[16] }
    ]
  },
  {
    id: "c32",
    usuarioId: "u32",
    nome: "Joias & Brilho",
    email: "vendas@joiasbrilho.com",
    telefoneContato: "79988880032",
    categoria: "Bijuterias",
    descricao: "Acessorios que realcam sua beleza com brilho e cor.",
    vendedorAmbulante: false,
    estacionamento: false,
    imagem: bijuteriasImages[0],
    latitude: -10.944,
    longitude: -37.084,
    localizacao: "Calçadão Joao Pessoa, 200",
    resumo_avaliacoes: "Muitas opcoes de brincos.",
    redes_sociais: "@joiasbrilhoaju",
    rating: 4.7,
    horarioFuncionamento: "08:30 - 18:30",
    statusAberto: true,
    tags: ["bijuterias", "acessorios"],
    favoritada: false,
    avaliacoes: [],
    produtos: [
      { id: "c32-p1", comercioId: "c32", nome: "Maxi Brinco Dourado", descricao: "Design moderno e leve.", preco: 45.0, imagem: bijuteriasImages[0] },
      { id: "c32-p2", comercioId: "c32", nome: "Colar de Perolas", descricao: "Bijuteria fina e elegante.", preco: 35.0, imagem: bijuteriasImages[0] },
      { id: "c32-p3", comercioId: "c32", nome: "Pulseira com Berloques", descricao: "Personalize do seu jeito.", preco: 55.0, imagem: bijuteriasImages[0] },
      { id: "c32-p4", comercioId: "c32", nome: "Anel com Pedra", descricao: "Ajustavel e brilhante.", preco: 25.0, imagem: bijuteriasImages[0] },
      { id: "c32-p5", comercioId: "c32", nome: "Tiara de Veludo", descricao: "Acessorio para cabelo.", preco: 20.0, imagem: bijuteriasImages[0] },
      { id: "c32-p6", comercioId: "c32", nome: "Tornozeleira de Conchas", descricao: "Estilo praiano e verao.", preco: 15.0, imagem: bijuteriasImages[0] },
      { id: "c32-p7", comercioId: "c32", nome: "Kit de Aneis", descricao: "5 unidades para falange.", preco: 30.0, imagem: bijuteriasImages[0] },
      { id: "c32-p8", comercioId: "c32", nome: "Choker de Strass", descricao: "Para brilhar em festas.", preco: 40.0, imagem: bijuteriasImages[0] },
      { id: "c32-p9", comercioId: "c32", nome: "Presilhas de Cabelo", descricao: "Par decorado com brilhos.", preco: 12.0, imagem: bijuteriasImages[0] },
      { id: "c32-p10", comercioId: "c32", nome: "Relogio Bijuteria", descricao: "Acessorio funcional e lindo.", preco: 75.0, imagem: bijuteriasImages[0] }
    ]
  }
];

export const mockEventos: Evento[] = [
  {
    id: 'e1',
    nome: 'Festival de Cultura de Aracaju',
    descricao: 'Celebracao da musica, arte e gastronomia regional',
    inicio: '2026-06-20T18:00:00Z',
    fim: '2026-06-25T23:59:00Z',
    localizacao: 'Praca Fausto Cardoso',
    categoria: 'Cultura',
    latitude: -10.911,
    longitude: -37.051,
    imagem: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg'
  },
  {
    id: 'e2',
    nome: 'Feira Gastronomica',
    descricao: 'Sabores do mundo reunidos no centro de Aracaju.',
    inicio: '2026-07-10T11:00:00Z',
    fim: '2026-07-12T22:00:00Z',
    localizacao: 'Orla da Atalaia',
    categoria: 'Gastronomia',
    latitude: -10.915,
    longitude: -37.055,
    imagem: 'https://cdn.pixabay.com/photo/2016/11/29/13/08/sushi-1869708_1280.jpg'
  }
];

export const mockEstacionamentos: Estacionamento[] = [
  {
    id: 'est1',
    nome: 'Estacionamento Central',
    latitude: -10.911,
    longitude: -37.051,
    numeroVagas: 100,
    vagasOcupadas: 45,
    status: 'livre',
    precoHora: 5.0,
    tempoPreco: 'hora'
  },
  {
    id: 'est2',
    nome: 'Park Atalaia',
    latitude: -10.915,
    longitude: -37.055,
    numeroVagas: 50,
    vagasOcupadas: 48,
    status: 'lotado',
    precoHora: 8.0,
    tempoPreco: 'hora'
  }
];
