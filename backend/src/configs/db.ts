import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient({
    log: ['error', 'warn']
} as any);

export default prisma;