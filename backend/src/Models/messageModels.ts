import prisma from '@configs/db';
import type { UUID } from 'crypto';
import { ClientOrTransaction } from '@interfaces/prismaEntity';

class MessageModel {

    static async create(data: { conteudo: string, enviadoPor: string, chatId: UUID }, db: ClientOrTransaction = prisma) {
        return await db.mensagem.create({
            data,
            select: { id: true }
        });
    }

    static async updateManyStatusByChatIdAndUserType(chatId: UUID, userType: 'cliente' | 'loja', db: ClientOrTransaction = prisma) {
        await db.mensagem.updateMany({
            where: {
                chatId,
                lida: false,
                enviadoPor: userType === 'cliente' ? 'loja' : 'cliente'
            },
            data: {
                lida: true
            }
        });
    }

    static async delete(id: UUID, db: ClientOrTransaction = prisma) {
        await db.mensagem.delete({ where: { id } });
    }

    static async findById(id: UUID, db: ClientOrTransaction = prisma) {
        return await db.mensagem.findUnique({
            where: { id },
            select: {
                chat: {
                    select: {
                        clienteId: true,
                        lojaId: true,
                        disabled: true
                    }
                }
            }
        });
    }

    static async findByIdAndUserType(id: UUID, userType: 'cliente' | 'loja', db: ClientOrTransaction = prisma) {
        return await db.mensagem.findUnique({
            where: {
                id,
                enviadoPor: userType
            },
            select: {
                dataCriacao: true,
                chat: {
                    select: {
                        clienteId: true,
                        lojaId: true,
                        disabled: true
                    }
                }
            }
        });
    }

}

export default MessageModel;
