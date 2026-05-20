import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
  connectionString,
  ssl: connectionString?.includes('localhost') ? false : { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function surgery() {
  const lojaNome = "Grao Gourmet";
  const loja = await prisma.loja.findFirst({
    where: { nome: lojaNome }
  });

  if (!loja) {
    console.error(`Loja '${lojaNome}' não encontrada.`);
    return;
  }

  console.log(`Loja encontrada: ${loja.id}. Removendo produtos antigos...`);

  // Remove links antigos
  await prisma.produtoLoja.deleteMany({
    where: { lojaId: loja.id }
  });

  const cafeteriaGourmetImages = [
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/dhGqFYtvHyPNAQoD.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/jvfxdjZzIvTxwsBt.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/DiMvMwOeQLZgOAZO.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/QeJbTVpbnKWBxCLX.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/vqEFxZMHlQGRyUZB.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/ObCtoVbIOIXqjFVG.png",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/tVvpAhofeYHjrevP.png",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/lamATkXTGnUpWBPB.jpeg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/ITtvDHIcUIOSOfsS.jpg",
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663120180153/ukJVGVrZLiqEnpyg.jpg"
  ];

  const novosProdutos = [
    { nome: "Expresso Duplo", descricao: "Blend da casa intenso.", preco: 8.0, imagem: cafeteriaGourmetImages[0] },
    { nome: "Cappuccino Italiano", descricao: "Com cacau em po e canela.", preco: 12.0, imagem: cafeteriaGourmetImages[1] },
    { nome: "Flat White", descricao: "Leite vaporizado e cafe.", preco: 14.0, imagem: cafeteriaGourmetImages[2] },
    { nome: "Croissant de Chocolate", descricao: "Massa folhada e recheio.", preco: 10.0, imagem: cafeteriaGourmetImages[3] },
    { nome: "Pao de Queijo", descricao: "Porcao com 5 unidades.", preco: 15.0, imagem: cafeteriaGourmetImages[4] },
    { nome: "Bolo de Cenoura", descricao: "Com cobertura de brigadeiro.", preco: 12.0, imagem: cafeteriaGourmetImages[5] },
    { nome: "Toast de Avocado", descricao: "Pao integral e abacate.", preco: 22.0, imagem: cafeteriaGourmetImages[6] },
    { nome: "Iced Latte", descricao: "Refrescante com gelo.", preco: 16.0, imagem: cafeteriaGourmetImages[7] },
    { nome: "Cha Gelado", descricao: "Limao e hortela.", preco: 10.0, imagem: cafeteriaGourmetImages[8] },
    { nome: "Quiche Loraine", descricao: "Bacon e queijo.", preco: 18.0, imagem: cafeteriaGourmetImages[9] }
  ];

  for (const p of novosProdutos) {
    const produto = await prisma.produto.create({
      data: {
        nome: p.nome,
        descricao: p.descricao,
        imagem: p.imagem
      }
    });

    await prisma.produtoLoja.create({
      data: {
        lojaId: loja.id,
        produtoId: produto.id,
        preco: p.preco
      }
    });
  }

  console.log("Cirurgia concluída com sucesso!");
}

surgery()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

  