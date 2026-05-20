import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient({
  // @ts-ignore - Prisma 7 exige um campo de conexão no construtor se não houver no schema,
  // mas usará a variável de ambiente DATABASE_URL automaticamente se o campo for omitido no schema.
  datasourceUrl: process.env.DATABASE_URL
});

export default prisma;