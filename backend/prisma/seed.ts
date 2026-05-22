import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import argon2 from 'argon2';
import deburr from 'lodash/deburr';
import { mockComercios, mockEventos, mockEstacionamentos } from './mockData';

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

  await prisma.produtoLoja.deleteMany({});
  await prisma.categoriaProduto.deleteMany({});
  await prisma.produto.deleteMany({});
  await prisma.evento.deleteMany({});
  await prisma.lojaEstacionamento.deleteMany({});

  for (const item of mockComercios) {
    const categoria = await prisma.categoria.upsert({
      where: { nome: item.categoria },
      update: {},
      create: { nome: item.categoria },
    });

    const loja = await prisma.loja.upsert({
      where: { email: item.email },
      update: {
        nome: item.nome,
        nomeNormalizado: normalizeString(item.nome),
        descricao: item.descricao,
        vendedorAmbulante: item.vendedorAmbulante,
        estacionamento: item.estacionamento,
        latitude: item.latitude,
        longitude: item.longitude,
        imagem: item.imagem,
        telefoneContato: item.telefoneContato,
        logradouro: item.localizacao,
      },
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
        logradouro: item.localizacao,
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
      update: {
        nome: item.nome,
        nomeNormalizado: normalizeString(item.nome),
        descricao: 'Estacionamento seguro no centro.',
        vendedorAmbulante: false,
        estacionamento: true,
        latitude: item.latitude,
        longitude: item.longitude,
        imagem: null,
      },
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
