import { PrismaClient, Prisma } from '@prisma/client';

export type DbClient = PrismaClient;
export type DbTransaction = Prisma.TransactionClient;

export type ClientOrTransaction =
  | DbClient
  | DbTransaction;