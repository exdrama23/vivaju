import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import argon2 from 'argon2';
import deburr from 'lodash/deburr';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: connectionString?.includes('localhost') ? false : { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function normalizeString(str: string): string {
  return deburr(str.trim().toLowerCase()).replace(/\s+/g, '-');
}

async function main() {
  const passwordHash = await argon2.hash('password123');

  const mockComercios = [
    {
      nome: "Burger Prime Aracaju",
      email: "contato@burgerprime.com",
      telefoneContato: "79999990001",
      categoria: "Hamburgueria",
      descricao: "Hambúrgueres artesanais com ingredientes premium.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/oAhfkRqFdjhHwPYZ.png",
      latitude: -10.909351,
      longitude: -37.048942,
      logradouro: "Av. Beira Mar, Centro, Aracaju - SE",
      produtos: [
        { nome: "Classic Burger", descricao: "Pao brioche, carne 180g e queijo.", preco: 25.0, imagem: "https://images.pexels.com/photos/15953047/pexels-photo-15953047.jpeg" },
        { nome: "Bacon Lovers", descricao: "Muito bacon crocante e cheddar.", preco: 32.0, imagem: "https://images.pexels.com/photos/10771362/pexels-photo-10771362.jpeg" },
        { nome: "Cheddar Melt", descricao: "Cheddar cremoso e cebola caramelizada.", preco: 30.0, imagem: "https://images.pexels.com/photos/15735255/pexels-photo-15735255.jpeg" },
        { nome: "Veggie Burger", descricao: "Hamburguer de grao de bico e alface.", preco: 28.0, imagem: "https://images.pexels.com/photos/12336023/pexels-photo-12336023.jpeg" },
        { nome: "Double Monster", descricao: "Duas carnes de 180g e dobro de queijo.", preco: 45.0, imagem: "https://images.pexels.com/photos/34407501/pexels-photo-34407501.jpeg" },
        { nome: "Batata Rustica", descricao: "Porcao de batatas com alecrim.", preco: 15.0, imagem: "https://images.pexels.com/photos/8299597/pexels-photo-8299597.jpeg" },
        { nome: "Onion Rings", descricao: "Aneis de cebola empanados.", preco: 12.0, imagem: "https://images.pexels.com/photos/29392059/pexels-photo-29392059.jpeg" },
        { nome: "Milkshake Morango", descricao: "Cremoso com pedacos de fruta.", preco: 18.0, imagem: "https://images.pexels.com/photos/19424569/pexels-photo-19424569.jpeg" },
        { nome: "Refrigerante Lata", descricao: "Gelado 350ml.", preco: 6.0, imagem: "https://images.pexels.com/photos/5860659/pexels-photo-5860659.jpeg" },
        { nome: "Petit Gateau", descricao: "Bolo quente com sorvete.", preco: 22.0, imagem: "https://images.pexels.com/photos/33674405/pexels-photo-33674405.jpeg" }
      ]
    },
    {
      nome: "Pizzaria Napoli",
      email: "napoli@pizza.com",
      telefoneContato: "79999990002",
      categoria: "Pizzaria",
      descricao: "Pizzas no forno a lenha com massa fermentada lentamente.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/QYDHVuyywGuQqGYf.png",
      latitude: -10.912179,
      longitude: -37.051790,
      logradouro: "Rua das Flores, Centro, Aracaju - SE",
      produtos: [
        { nome: "Pizza Margherita", descricao: "Molho de tomate, mussarela e manjericao.", preco: 45.0, imagem: "https://images.pexels.com/photos/31450842/pexels-photo-31450842.jpeg" },
        { nome: "Pizza Calabresa", descricao: "Calabresa fatiada e cebola.", preco: 48.0, imagem: "https://images.pexels.com/photos/31094810/pexels-photo-31094810.jpeg" },
        { nome: "Pizza Quatro Queijos", descricao: "Mussarela, provolone, parmesao e gorgonzola.", preco: 55.0, imagem: "https://images.pexels.com/photos/33592983/pexels-photo-33592983.jpeg" },
        { nome: "Pizza Pepperoni", descricao: "Pepperoni com queijo especial.", preco: 58.0, imagem: "https://images.pexels.com/photos/31450847/pexels-photo-31450847.jpeg" },
        { nome: "Pizza Portuguesa", descricao: "Ovo, presunto, cebola e ervilha.", preco: 52.0, imagem: "https://images.pexels.com/photos/33457563/pexels-photo-33457563.jpeg" },
        { nome: "Pizza Vegetariana", descricao: "Mix de legumes e queijo.", preco: 50.0, imagem: "https://images.pexels.com/photos/33592995/pexels-photo-33592995.jpeg" },
        { nome: "Calzone", descricao: "Pizza fechada recheada.", preco: 42.0, imagem: "https://images.pexels.com/photos/36642831/pexels-photo-36642831.jpeg" },
        { nome: "Bruschetta", descricao: "Pao italiano com tomate.", preco: 20.0, imagem: "https://images.pexels.com/photos/5639423/pexels-photo-5639423.jpeg" },
        { nome: "Vinho Tinto", descricao: "Taca de vinho da casa.", preco: 18.0, imagem: "https://images.pexels.com/photos/30609362/pexels-photo-30609362.jpeg" },
        { nome: "Tiramisu", descricao: "Sobremesa tipica italiana.", preco: 25.0, imagem: "https://images.pexels.com/photos/27305271/pexels-photo-27305271.jpeg" }
      ]
    },
    {
      nome: "Sakura Sushi",
      email: "sakura@sushi.com",
      telefoneContato: "79999990003",
      categoria: "Sushi",
      descricao: "Culinária japonesa tradicional com peixes frescos selecionados.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/KAMHcXlDOQYOxsPl.png",
      latitude: -10.911785,
      longitude: -37.050009,
      logradouro: "Praça do Farol, Centro, Aracaju - SE",
      produtos: [
        { nome: "Combinado 20 Pecas", descricao: "Mix de sushis e sashimis.", preco: 85.0, imagem: "https://images.pexels.com/photos/31393443/pexels-photo-31393443.jpeg" },
        { nome: "Temaki Salmao", descricao: "Cone de alga com arroz e salmao.", preco: 30.0, imagem: "https://images.pexels.com/photos/28992230/pexels-photo-28992230.jpeg" },
        { nome: "Hot Roll", descricao: "Sushi frito com molho tare.", preco: 28.0, imagem: "https://images.pexels.com/photos/28992214/pexels-photo-28992214.jpeg" },
        { nome: "Sashimi Salmao", descricao: "10 fatias de salmao fresco.", preco: 45.0, imagem: "https://images.pexels.com/photos/36292348/pexels-photo-36292348.jpeg" },
        { nome: "Uramaki Philadelphia", descricao: "Arroz, salmao e cream cheese.", preco: 25.0, imagem: "https://images.pexels.com/photos/12659887/pexels-photo-12659887.jpeg" },
        { nome: "Sunomono", descricao: "Salada de pepino agridoce.", preco: 15.0, imagem: "https://images.pexels.com/photos/12077975/pexels-photo-12077975.jpeg" },
        { nome: "Yakissoba", descricao: "Macarrao com legumes e carne.", preco: 40.0, imagem: "https://images.pexels.com/photos/15298785/pexels-photo-15298785.jpeg" },
        { nome: "Guioza", descricao: "Pasteis japoneses grelhados.", preco: 22.0, imagem: "https://images.pexels.com/photos/2098120/pexels-photo-2098120.jpeg" },
        { nome: "Saque Dose", descricao: "Bebida fermentada tradicional.", preco: 15.0, imagem: "https://images.pexels.com/photos/30683023/pexels-photo-30683023.jpeg" },
        { nome: "Mochi", descricao: "Bolinho de arroz doce.", preco: 12.0, imagem: "https://images.pexels.com/photos/16049660/pexels-photo-16049660.jpeg" }
      ]
    },
    {
      nome: "Sabor do Nordeste",
      email: "nordeste@sabor.com",
      telefoneContato: "79999990004",
      categoria: "Comida Nordestina",
      descricao: "O melhor da culinária regional com temperos autênticos.",
      vendedorAmbulante: true,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/NMCgxieGTCbYoEuV.jpg",
      latitude: -10.909723,
      longitude: -37.049674,
      logradouro: "Mercado Central, Centro, Aracaju - SE",
      produtos: [
        { nome: "Prato nordestino", descricao: "Arroz, mistura de feijão e pedaços de frango frito.", preco: 60.0, imagem: "https://images.pexels.com/photos/34284708/pexels-photo-34284708.jpeg" },
        { nome: "Feijão Nordestino", descricao: "feijao fradinho temperado com tomates.", preco: 40.0, imagem: "https://images.pexels.com/photos/16976664/pexels-photo-16976664.jpeg" },
        { nome: "Prato simples", descricao: "Peixe cozido com batata, aroz, salada e feijão", preco: 75.0, imagem: "https://images.pexels.com/photos/36921557/pexels-photo-36921557.png" },
        { nome: "Bobo de Camarao", descricao: "Creme de macaxeira com camarao.", preco: 80.0, imagem: "https://images.pexels.com/photos/17598224/pexels-photo-17598224.jpeg" },
        { nome: "Sarapatel", descricao: "Prato regional bem temperado.", preco: 35.0, imagem: "https://images.pexels.com/photos/34035523/pexels-photo-34035523.jpeg" },
        { nome: "Macaxeira Frita", descricao: "Porcao crocante.", preco: 15.0, imagem: "https://images.pexels.com/photos/8066270/pexels-photo-8066270.jpeg" },
        { nome: "Queijo Coalho Grelhado", descricao: "Com mel de engenho.", preco: 12.0, imagem: "https://images.pexels.com/photos/8751408/pexels-photo-8751408.jpeg" },
        { nome: "Tapioca de banana", descricao: "Tapioca quentinha com banana.", preco: 10.0, imagem: "https://images.pexels.com/photos/25639532/pexels-photo-25639532.jpeg" },
        { nome: "Cuscuz com Ovo", descricao: "Cuscuz de milho tradicional.", preco: 8.0, imagem: "https://images.pexels.com/photos/15584741/pexels-photo-15584741.jpeg" },
        { nome: "Pudim", descricao: "Doce caseiro em calda.", preco: 12.0, imagem: "https://images.pexels.com/photos/34234278/pexels-photo-34234278.png" }
      ]
    },
    {
      nome: "La Trattoria",
      email: "trattoria@italiana.com",
      telefoneContato: "79999990005",
      categoria: "Italiana",
      descricao: "Massas frescas e vinhos selecionados em um ambiente acolhedor.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/ZGyiejxLzhGOGlyX.png",
      latitude: -10.912162,
      longitude: -37.051773,
      logradouro: "Alameda das Cores, Centro, Aracaju - SE",
      produtos: [
        { nome: "Lasanha Bolonhesa", descricao: "Massa fresca com carne e queijo.", preco: 50.0, imagem: "https://images.pexels.com/photos/5949888/pexels-photo-5949888.jpeg" },
        { nome: "Fettuccine Alfredo", descricao: "Molho branco e parmesao.", preco: 45.0, imagem: "https://images.pexels.com/photos/11220208/pexels-photo-11220208.jpeg" }
      ]
    },
    {
      nome: "Texas Steakhouse",
      email: "texas@steak.com",
      telefoneContato: "79999990006",
      categoria: "Steakhouse",
      descricao: "Texas Steakhouse: cortes nobres grelhados na brasa com o estilo americano.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778786350/4a62c1f1-5336-4f96-8c4a-4ff8cc93ce40.png",
      latitude: -10.909449,
      longitude: -37.050166,
      logradouro: "Av. Adelia Franco, Centro, Aracaju - SE",
      produtos: [
        { nome: "Ribeye Steak", descricao: "Corte macio de 300g.", preco: 95.0, imagem: "https://images.pexels.com/photos/34574561/pexels-photo-34574561.jpeg" },
        { nome: "Picanha Nobre", descricao: "Grelhada na parrilla.", preco: 88.0, imagem: "https://images.pexels.com/photos/20896462/pexels-photo-20896462.jpeg" }
      ]
    },
    {
      nome: "Marisqueira Aju",
      email: "contato@marisqueira.com",
      telefoneContato: "79999990007",
      categoria: "Frutos do Mar",
      descricao: "Peixes e mariscos capturados diariamente.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/qCfsKDxLZaJjMCoy.png",
      latitude: -10.909553,
      longitude: -37.050278,
      logradouro: "Orla da Atalaia, Centro, Aracaju - SE",
      produtos: [
        { nome: "Grelhado de Peixe", descricao: "File de peixe com legumes.", preco: 65.0, imagem: "https://images.pexels.com/photos/15112757/pexels-photo-15112757.jpeg" },
        { nome: "Camarao ao Alho e Oleo", descricao: "Porcao farta de camarao.", preco: 78.0, imagem: "https://images.pexels.com/photos/8697543/pexels-photo-8697543.jpeg" }
      ]
    },
    {
      nome: "Horta Urbana",
      email: "contato@hortaurbana.com",
      telefoneContato: "79999990008",
      categoria: "Vegano",
      descricao: "Gastronomia plant-based with organic and flavorful ingredients.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/bBzakxnkgIRwQtyb.png",
      latitude: -10.912134,
      longitude: -37.052526,
      logradouro: "Rua do Estilo, Centro, Aracaju - SE",
      produtos: [
        { nome: "Bowl Mediterraneo", descricao: "Mix de graos e vegetais assados.", preco: 38.0, imagem: "https://images.pexels.com/photos/8286759/pexels-photo-8286759.jpeg" },
        { nome: "Burger Vegano", descricao: "Hamburguer de lentilha e maionese verde.", preco: 32.0, imagem: "https://images.pexels.com/photos/15010291/pexels-photo-15010291.jpeg" }
      ]
    },
    {
      nome: "La Fiesta Mexicana",
      email: "fiesta@mexicano.com",
      telefoneContato: "79999990009",
      categoria: "Mexicana",
      descricao: "A explosão de cores e sabores do México direto em Aracaju.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778786731/f4b9f177-e10a-4a84-b341-6e17860b07f6.png",
      latitude: -10.909021,
      longitude: -37.050084,
      logradouro: "Calçadão Sul, Centro, Aracaju - SE",
      produtos: [
        { nome: "Tacos Al Pastor", descricao: "Tortillas de milho com porco.", preco: 35.0, imagem: "https://images.pexels.com/photos/18574183/pexels-photo-18574183.jpeg" },
        { nome: "Burrito Supreme", descricao: "Carne, feijão, arroz e queijo", preco: 40.0, imagem: "https://images.pexels.com/photos/18007687/pexels-photo-18007687.jpeg" }
      ]
    },
    {
      nome: "Pampa Churrascaria",
      email: "pampa@churrasco.com",
      telefoneContato: "79999990010",
      categoria: "Churrascaria",
      descricao: "Tradicao gaucha com os melhores cortes de carne bovina.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778786858/74263049-dd70-48c3-8805-5408e074f5fc.png",
      latitude: -10.909265,
      longitude: -37.049870,
      logradouro: "Rodovia Sul, Centro, Aracaju - SE",
      produtos: [
        { nome: "Rodizio Completo", descricao: "Acesso total ao buffet e carnes.", preco: 89.0, imagem: "https://images.pexels.com/photos/34574561/pexels-photo-34574561.jpeg" }
      ]
    },
    {
      nome: "C&A",
      email: "moda@gmail.com",
      telefoneContato: "79999991011",
      categoria: "Moda",
      descricao: "Roupa casual, social, vestidos com alto padrão.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778786833/afff914e-d58c-4618-bbe1-7c5f350c4d2b.png",
      latitude: -10.909514,
      longitude: -37.048777,
      logradouro: "Rua do Comércio, Centro, Aracaju - SE",
      produtos: [
        { nome: "Camisa Polo", descricao: "Algodao pima em varias cores.", preco: 120.0, imagem: "https://images.pexels.com/photos/12246169/pexels-photo-12246169.jpeg" }
      ]
    },
    {
      nome: "Donna Bella",
      email: "donna@bella.com",
      telefoneContato: "79999991012",
      categoria: "Moda Feminina",
      descricao: "Moda feminina para todas as ocasiões com estilo e elegância.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778788903/d2d96eb5-63ec-4b20-ab42-f566504f33ed.png",
      latitude: -10.909900,
      longitude: -37.051357,
      logradouro: "Calçadão da Praia, Centro, Aracaju - SE",
      produtos: [
        { nome: "Vestido Floral", descricao: "Leve e ideal para o verao.", preco: 150.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/tiEKbSmvdONrDPPG.webp" }
      ]
    },
    {
      nome: "Supermercado Viva",
      email: "sac@viva.com",
      telefoneContato: "79999991013",
      categoria: "Supermercado",
      descricao: "Variedade, frescor e preços baixos para sua família.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778788914/000ae9a8-a20d-4812-894d-a09fe6e65d36.png",
      latitude: -10.909498,
      longitude: -37.050390,
      logradouro: "Av. Coelho e Campos, Centro, Aracaju - SE",
      produtos: [
        { nome: "Arroz Branco 5kg", descricao: "Tipo 1, graos selecionados.", preco: 25.0, imagem: "https://res.cloudinary.com/dtskn1ns3/image/upload/v1778625014/75e89ff0-9702-4a55-96f7-ec7dab27379d.png" }
      ]
    },
    {
      nome: "Farmacia Central",
      email: "contato@farmaciacentral.com",
      telefoneContato: "79999991014",
      categoria: "Farmácia",
      descricao: "Sua saúde em boas mãos com assistência farmacêutica de qualidade.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778788924/b3ed9dda-7cae-43e8-9a54-6f42da3cb5f2.png",
      latitude: -10.911823,
      longitude: -37.051239,
      logradouro: "Praca Fausto Cardoso, Centro, Aracaju - SE",
      produtos: [
        { nome: "Paracetamol 750mg", descricao: "Analgésico e antitérmico.", preco: 15.0, imagem: "https://res.cloudinary.com/dtskn1ns3/image/upload/v1778626607/3ccd8219-b697-4426-8f4c-772f6501ab21.png" }
      ]
    },
    {
      nome: "Papelaria Criativa",
      email: "vendas@criativa.com",
      telefoneContato: "79999991015",
      categoria: "Papelaria",
      descricao: "Tudo para escritório, escola e artesanato em um só lugar.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778788927/bfcd236c-3091-481b-9a6e-99a362dbe5ca.png",
      latitude: -10.909791,
      longitude: -37.049978,
      logradouro: "Rua do Ouvidor, Centro, Aracaju - SE",
      produtos: [
        { nome: "Caderno Universitario", descricao: "10 materias capa dura.", preco: 25.0, imagem: "https://res.cloudinary.com/dtskn1ns3/image/upload/v1778627514/b2413de4-e531-4989-8af6-746772eb665a.png" }
      ]
    },
    {
      nome: "Tech World Informática",
      email: "vendas@techworld.com",
      telefoneContato: "79999991016",
      categoria: "Informática",
      descricao: "As melhores marcas de hardware, notebooks e acessórios.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778843733/82fbca35-3d62-47d2-874e-9e375b8b6fc1.png",
      latitude: -10.912288,
      longitude: -37.050602,
      logradouro: "Shopping RioMar, Centro, Aracaju - SE",
      produtos: [
        { nome: "Notebook i5 8GB", descricao: "SSD 256GB, tela Full HD.", preco: 3500.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/tFdOhBohziHmARqz.jpg" }
      ]
    },
    {
      nome: "Livraria Saber",
      email: "contato@saber.com",
      telefoneContato: "79999991017",
      categoria: "Livraria",
      descricao: "Um refúgio para os amantes da leitura com títulos nacionais e importados.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778844509/sabedoria_do_saber.png",
      latitude: -10.910251,
      longitude: -37.050774,
      logradouro: "Rua Santa Luzia, Centro, Aracaju - SE",
      produtos: [
        { nome: "O Senhor dos Aneis", descricao: "Edicao de colecionador.", preco: 95.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/flSeDMtLGwMANsNP.jpg" }
      ]
    },
    {
      nome: "Pizzaria Bella Italia",
      email: "bella@italia.com",
      telefoneContato: "79988880018",
      categoria: "Pizzaria",
      descricao: "Sabores autenticos da Italia em massas artesanais.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845342/6b50b912-ad40-47c7-a1e7-65f40f7175c4.png",
      latitude: -10.909850,
      longitude: -37.051848,
      logradouro: "Rua Augusta, Centro, Aracaju - SE",
      produtos: [
        { nome: "Pizza de Pesto", descricao: "Molho pesto e queijo brie.", preco: 65.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/zlVaucBSqqsnNWMB.jpg" }
      ]
    },
    {
      nome: "Sushi Zen",
      email: "contato@sushizen.com",
      telefoneContato: "79988880019",
      categoria: "Sushi",
      descricao: "Equilibrio e frescor em cada peca de sushi.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845358/2052623d-59fe-4553-a4a3-cd840e621ea5.png",
      latitude: -10.910624,
      longitude: -37.049529,
      logradouro: "Av. Jorge Amado, Centro, Aracaju - SE",
      produtos: [
        { nome: "Combo Zen 30", descricao: "Selecao do chef com 30 pecas.", preco: 120.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/arYMquHutpAoctxj.jpg" }
      ]
    },
    {
      nome: "Dragao Dourado",
      email: "contato@dragaodourado.com",
      telefoneContato: "79988880020",
      categoria: "Comida Chinesa",
      descricao: "Tradicao milenar em pratos fartos e saborosos.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845372/0e85a431-c6a7-4001-ab7f-a11f7f7e7c5a.png",
      latitude: -10.909819,
      longitude: -37.050135,
      logradouro: "Rua Siriri, Centro, Aracaju - SE",
      produtos: [
        { nome: "Yakissoba Especial", descricao: "Carne, frango e legumes.", preco: 48.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/FcOYUnzlQtwoxjqJ.jpg" }
      ]
    },
    {
      nome: "Grao Gourmet",
      email: "cafe@graogourmet.com",
      telefoneContato: "79988880021",
      categoria: "Cafeteria Gourmet",
      descricao: "Cafes especiais de origens selecionadas e acompanhamentos finos.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845366/b39b2063-ddd9-4dbc-8771-d7aa3bb89685.png",
      latitude: -10.909559,
      longitude: -37.052131,
      logradouro: "Orla da Atalaia, Centro, Aracaju - SE",
      produtos: [
        { nome: "Expresso Duplo", descricao: "Blend da casa intenso.", preco: 8.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/dhGqFYtvHyPNAQoD.jpg" }
      ]
    },
    {
      nome: "Gelato Supremo",
      email: "gelato@supremo.com",
      telefoneContato: "79988880022",
      categoria: "Sorveteria Premium",
      descricao: "Gelatos artesanais feitos diariamente com frutas frescas.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845500/e261ef61-6228-4dc5-80c3-4b4f33f09134.png",
      latitude: -10.909888,
      longitude: -37.050719,
      logradouro: "Av. Beira Mar, Centro, Aracaju - SE",
      produtos: [
        { nome: "Gelato de Pistache", descricao: "Pistache italiano puro.", preco: 18.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/JykqsOEFyDOeNYDR.jpeg" }
      ]
    },
    {
      nome: "Kids World",
      email: "vendas@kidsworld.com",
      telefoneContato: "79988880023",
      categoria: "Loja de Brinquedos",
      descricao: "Onde a imaginacao ganha vida para criancas de todas as idades.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/suKfClXvCrLBlnkB.png",
      latitude: -10.908740,
      longitude: -37.051575,
      logradouro: "Shopping RioMar, Centro, Aracaju - SE",
      produtos: [
        { nome: "Robo Inteligente", descricao: "Caminha e fala frases.", preco: 280.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/VRWmUlkZETujpLVQ.webp" }
      ]
    },
    {
      nome: "Jardim Encantado",
      email: "flores@jardim.com",
      telefoneContato: "79988880024",
      categoria: "Floricultura",
      descricao: "Flores e arranjos exclusivos para momentos inesqueciveis.",
      vendedorAmbulante: true,
      estacionamento: false,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/vhFCgdlyRSkfbgPY.jpg",
      latitude: -10.910826,
      longitude: -37.049505,
      logradouro: "Praca Fausto Cardoso, Centro, Aracaju - SE",
      produtos: [
        { nome: "Buque de Girassois", descricao: "5 flores grandes e vibrantes.", preco: 85.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/aXsjDwpyOvnsrYLm.jpg" }
      ]
    },
    {
      nome: "Arte no Papel",
      email: "vendas@artenopapel.com",
      telefoneContato: "79988880025",
      categoria: "Papelaria Criativa",
      descricao: "Materiais para artistas e estudantes que amam criar.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845546/09f121d0-daf5-4ef2-b924-6f972a57d174.png",
      latitude: -10.909499,
      longitude: -37.050062,
      logradouro: "Rua do Ouvidor, Centro, Aracaju - SE",
      produtos: [
        { nome: "Canetas Brush Pen", descricao: "Kit com 12 cores dual tip.", preco: 65.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/QDEpTNiyPgNLDelK.jpg" }
      ]
    },
    {
      nome: "Glamour Make",
      email: "sac@glamourmake.com",
      telefoneContato: "79988880026",
      categoria: "Loja de Maquiagem",
      descricao: "Cosmeticos de luxo e acessorios para sua beleza diaria.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845663/caecef18-92e6-45a6-b137-05cb3819a309.png",
      latitude: -10.911082,
      longitude: -37.050503,
      logradouro: "Rua Santa Luzia, Centro, Aracaju - SE",
      produtos: [
        { nome: "Base Matte Fluida", descricao: "Cobertura alta e natural.", preco: 150.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/WvCsAnyoSSZkPqUD.jpg" }
      ]
    },
    {
      nome: "Forte Construcoes",
      email: "vendas@forteconstrucoes.com",
      telefoneContato: "79988880027",
      categoria: "Materiais de Construção",
      descricao: "Do alicerce ao acabamento, tudo para sua obra.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/SmbSASNbPhfdQHBk.png",
      latitude: -10.909444,
      longitude: -37.051962,
      logradouro: "Av. Coelho e Campos, Centro, Aracaju - SE",
      produtos: [
        { nome: "Cimento 50kg", descricao: "Alta resistencia inicial.", preco: 35.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/WCEdDsqtUZLhkSYi.jpg" }
      ]
    },
    {
      nome: "Vinho & Sabor",
      email: "contato@vinhosabor.com",
      telefoneContato: "79988880028",
      categoria: "Adega de Vinhos",
      descricao: "Rótulos selecionados das melhores regiões vinicolas do mundo.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845663/caecef18-92e6-45a6-b137-05cb3819a309.png",
      latitude: -10.911283,
      longitude: -37.051966,
      logradouro: "Av. Hermes Fontes, Centro, Aracaju - SE",
      produtos: [
        { nome: "Malbec Argentino", descricao: "Reserva 2022 encorpado.", preco: 95.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/letHcvPWzGZRfvil.jpg" }
      ]
    },
    {
      nome: "Acordes & Notas",
      email: "musica@acordes.com",
      telefoneContato: "79988880029",
      categoria: "Loja de Instrumentos Musicais",
      descricao: "Som de qualidade com os melhores instrumentos e acessorios.",
      vendedorAmbulante: false,
      estacionamento: true,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778785731/41e9d04f-23bb-47da-9c52-67ac38784c3e.png",
      latitude: -10.911672,
      longitude: -37.051434,
      logradouro: "Rua do Comércio, Centro, Aracaju - SE",
      produtos: [
        { nome: "Violao de Aco", descricao: "Sonoridade brilhante e macia.", preco: 650.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/weWtEDXgdmSwdpor.jpg" }
      ]
    },
    {
      nome: "Pet Care",
      email: "contato@petcare.com",
      telefoneContato: "79988880030",
      categoria: "Pet Shop",
      descricao: "Tudo para o seu melhor amigo, de racao a banho e tosa.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/XqDvTpTwVCFFnmyU.jpg",
      latitude: -10.911654,
      longitude: -37.051360,
      logradouro: "Av. Adelia Franco, Centro, Aracaju - SE",
      produtos: [
        { nome: "Racao Premium 10kg", descricao: "Para caes adultos porte medio.", preco: 180.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/YlRmlWkxiRpeXVBv.jpg" }
      ]
    },
    {
      nome: "Tempo & Estilo",
      email: "contato@tempoestilo.com",
      telefoneContato: "79988880031",
      categoria: "Relojoaria",
      descricao: "Ponteiros que marcam sua elegancia e pontualidade.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/hdblTejwQXkaWMwj.png",
      latitude: -10.910202,
      longitude: -37.051100,
      logradouro: "Shopping Jardins, Centro, Aracaju - SE",
      produtos: [
        { nome: "Relogio Cronografo", descricao: "Aco inoxidavel e resistente a agua.", preco: 850.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/AcQoWzfEtmCJntDC.jpeg" }
      ]
    },
    {
      nome: "Joias & Brilho",
      email: "vendas@joiasbrilho.com",
      telefoneContato: "79988880032",
      categoria: "Bijuterias",
      descricao: "Acessorios que realcam sua beleza com brilho e cor.",
      vendedorAmbulante: false,
      estacionamento: false,
      imagem: "https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778845898/372c4207-a449-4545-933b-9fd987a2a66f.png",
      latitude: -10.910289,
      longitude: -37.048964,
      logradouro: "Calçadão Joao Pessoa, Centro, Aracaju - SE",
      produtos: [
        { nome: "Maxi Brinco Dourado", descricao: "Design moderno e leve.", preco: 45.0, imagem: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/LUUPlQFdlvKaXLDT.jpg" }
      ]
    }
  ];

  const mockEventos = [
    {
      nome: 'Semana da Consciência Negra', 
      descricao: 'Palestras, rodas de conversa e exposições sobre cultura afro-brasileira.',
      inicio: '2026-11-17T09:00:00Z',
      fim: '2026-11-20T20:00:00Z',
      localizacao: 'Praça General Valadão',
      categoria: 'Cultura',
      latitude: -10.910474,
      longitude: -37.051740,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778391038/WhatsApp_Image_2026-05-10_at_02.27.38_1_up4b2s.jpg',
    },
    {
      nome: 'Exposição de Patrimônio Histórico', 
      descricao: 'Exposição fotográfica sobre a arquitetura e memória do centro de Aracaju.',
      inicio: '2026-09-01T09:00:00Z',
      fim: '2026-09-07T18:00:00Z',
      localizacao: 'Museu da Gente Sergipana',
      categoria: 'Cultura',
      latitude: -10.911340,
      longitude: -37.049339,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/c_crop,ar_4:3/v1778394099/VIVAJUcard_yvhx7c.png',
    },
    {
      nome: 'Feira do Livro de Sergipe', 
      descricao: 'Autores locais, lançamentos, contação de histórias e oficinas literárias.',
      inicio: '2026-10-05T08:00:00Z',
      fim: '2026-10-14T20:00:00Z',
      localizacao: 'Calçadão da João Pessoa',
      categoria: 'Educação',
      latitude: -10.909480,
      longitude: -37.050933,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394774/Feira_do_Livro_Sergipe_banner_202605100323_wlrxra.jpg',
    },
    {
      nome: 'Olimpíada Municipal de ciências, matemática e escrita', 
      descricao: 'Competições de ciências, matemática e redação para estudantes da rede pública.',
      inicio: '2026-07-20T07:00:00Z',
      fim: '2026-07-20T17:00:00Z',
      localizacao: 'Centro de Convenções de Aracaju',
      categoria: 'Educação',
      latitude: -10.909515,
      longitude: -37.051657,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778395180/WhatsApp_Image_2026-05-10_at_03.38.07_cflepc.jpg',
    },
    {
      nome: 'Semana da Educação para o Futuro', 
      descricao: 'Workshops sobre tecnologia, inovação e mercado de trabalho para jovens.',
      inicio: '2026-06-08T08:00:00Z',
      fim: '2026-06-12T18:00:00Z',
      localizacao: 'Praça Fausto Cardoso',
      categoria: 'Educação',
      latitude: -10.908896,
      longitude: -37.051110,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394909/WhatsApp_Image_2026-05-10_at_03.32.41_nykslc.jpg',
    },
    {
      nome: 'Semana de Trânsito Seguro', 
      descricao: 'Ações educativas sobre segurança viária com simulações e distribuição de materiais.',
      inicio: '2026-09-18T08:00:00Z',
      fim: '2026-09-22T17:00:00Z',
      localizacao: 'Avenida Barão de Maruim',
      categoria: 'Segurança',
      latitude: -10.909307,
      longitude: -37.051620,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394662/Semana_de_Tr%C3%A2nsito_Seguro_202605100318_s9hcsp.jpg',
    },
    {
      nome: 'Encontro Comunitário de Segurança Pública', 
      descricao: 'Diálogo entre moradores, guarda municipal e polícia sobre prevenção à violência.',
      inicio: '2026-08-29T09:00:00Z',
      fim: '2026-08-29T13:00:00Z',
      localizacao: 'Mercado Municipal Antonio Franco',
      categoria: 'Segurança',
      latitude: -10.911098,
      longitude: -37.050612,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394591/Encontro_Seguran%C3%A7a_P%C3%BAblica_centr__202605100308_ndhpko.jpg',
    },
    {
      nome: 'Treinamento de Primeiros Socorros', 
      descricao: 'Capacitação gratuita em RCP, engasgo e atendimento a emergências para a população.',
      inicio: '2026-10-24T08:00:00Z',
      fim: '2026-10-24T16:00:00Z',
      localizacao: 'Praça Camerino',
      categoria: 'Segurança',
      latitude: -10.908910,
      longitude: -37.049389,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394868/Treinamento_Primeiros_Socorros_e__202605100327_rdru4a.jpg',
    },
    {
      nome: 'Exposição de Carros Clássicos', 
      descricao: 'Dezenas de veículos históricos e muscle cars reunidos no centro de Aracaju.',
      inicio: '2026-07-25T09:00:00Z',
      fim: '2026-07-26T18:00:00Z',
      localizacao: 'Praça General Valadão',
      categoria: 'Automobilismo',
      latitude: -10.909908,
      longitude: -37.051722,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778392458/Exposi%C3%A7%C3%A3o_de_Carros_Cl%C3%A1ssicos_Ar__202605100252_agkhum.jpg',
    },
    {
      nome: 'Feira do Produtor Local', 
      descricao: 'Agricultores e artesãos sergipanos comercializando produtos frescos e regionais.',
      inicio: '2026-08-15T06:00:00Z',
      fim: '2026-08-15T13:00:00Z',
      localizacao: 'Mercado Municipal Antonio Franco',
      categoria: 'Mercado Local',
      latitude: -10.908786,
      longitude: -37.049162,
      imagem: 'https://res.cloudinary.com/do3tpbbsj/image/upload/q_auto/f_auto/v1778394616/Feira_Produtor_Local_Aracaju_202605100314_a6i2wq.jpg',
    },
  ];

  const mockEstacionamentos = [
    {
      nome: 'Estacionamento Central',
      latitude: -10.910694,
      longitude: -37.050180,
      numeroVagas: 100,
      vagasOcupadas: 45,
      precoHora: 5.0,
      tempoPreco: 'hora'
    },
    {
      nome: 'Park Atalaia',
      latitude: -10.908654,
      longitude: -37.050631,
      numeroVagas: 50,
      vagasOcupadas: 48,
      precoHora: 8.0,
      tempoPreco: 'hora'
    }
  ];

  for (const item of mockComercios) {
    const categoria = await prisma.categoria.upsert({
      where: { nome: item.categoria },
      update: {},
      create: { nome: item.categoria },
    });

    const loja = await prisma.loja.upsert({
      where: { email: item.email },
      update: {},
      create: {
        email: item.email,
        senha: passwordHash,
        nome: item.nome,
        nomeNormalizado: normalizeString(item.nome),
        descricao: item.descricao,
        vendedorAmbulante: item.vendedorAmbulante,
        estacionamento: item.estacionamento,
        latitude: item.latitude,
        longitude: item.longitude,
        imagem: item.imagem,
        telefoneContato: item.telefoneContato,
        logradouro: item.logradouro,
      },
    });

    await prisma.categoriaLoja.upsert({
      where: { lojaId_categoriaId: { lojaId: loja.id, categoriaId: categoria.id } },
      update: {},
      create: { lojaId: loja.id, categoriaId: categoria.id },
    });

    if (item.produtos) {
      for (const prodItem of item.produtos) {
        const produto = await prisma.produto.create({
          data: {
            nome: prodItem.nome,
            descricao: prodItem.descricao,
            imagem: prodItem.imagem,
            categoriaProdutos: {
              create: { categoriaId: categoria.id }
            }
          }
        });

        await prisma.produtoLoja.create({
          data: {
            lojaId: loja.id,
            produtoId: produto.id,
            preco: prodItem.preco,
          }
        });
      }
    }
  }

  for (const item of mockEventos) {
    await prisma.evento.create({
      data: {
        nome: item.nome,
        nomeNormalizado: normalizeString(item.nome),
        descricao: item.descricao,
        inicio: new Date(item.inicio),
        fim: new Date(item.fim),
        localizacao: item.localizacao,
        categoria: item.categoria,
      }
    });
  }

  for (const item of mockEstacionamentos) {
    const email = `${normalizeString(item.nome)}@viva.com`;
    const categoria = await prisma.categoria.upsert({
      where: { nome: 'Estacionamento' },
      update: {},
      create: { nome: 'Estacionamento' },
    });

    const loja = await prisma.loja.upsert({
      where: { email },
      update: {},
      create: {
        email,
        senha: passwordHash,
        nome: item.nome,
        nomeNormalizado: normalizeString(item.nome),
        descricao: 'Estacionamento seguro no centro.',
        vendedorAmbulante: false,
        estacionamento: true,
        latitude: item.latitude,
        longitude: item.longitude,
        imagem: null,
      },
    });

    await prisma.categoriaLoja.upsert({
      where: { lojaId_categoriaId: { lojaId: loja.id, categoriaId: categoria.id } },
      update: {},
      create: { lojaId: loja.id, categoriaId: categoria.id },
    });

    await prisma.lojaEstacionamento.upsert({
      where: { lojaId: loja.id },
      update: {
        preco: item.precoHora,
        tempoPreco: item.tempoPreco,
      },
      create: {
        lojaId: loja.id,
        preco: item.precoHora,
        tempoPreco: item.tempoPreco,
      },
    });
  }

  console.log("Migration finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

