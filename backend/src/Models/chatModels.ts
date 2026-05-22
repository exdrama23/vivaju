import prisma from '@configs/db';
import type { UUID } from 'crypto';
import { ClientOrTransaction } from '@interfaces/prismaEntity';

class ChatModel {

    static async create(data: { clienteId: string, lojaId: string }, db: ClientOrTransaction = prisma) {
        return await db.chat.create({
            data: data as any,
            select: {
                id: true,
                clienteId: true,
                lojaId: true,
                bloqueado: true,
                bloqueadorTipo: true,
                dataCriacao: true,
                loja: {
                    select: {
                        id: true,
                        nome: true,
                        imagem: true
                    }
                },
                cliente: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        });
    }

    static async updateDisabled(id: string, data: { disabled: boolean, disablerTipo: string | null, disabledAt: Date | null }, db: ClientOrTransaction = prisma) {
        await db.chat.update({
            where: { id: id as any },
            data
        });
    }

    static async updateBlocked(id: string, data: { bloqueado: boolean, bloqueadorTipo: string | null }, db: ClientOrTransaction = prisma) {
        await db.chat.update({
            where: { id: id as any },
            data
        });
    }

    static async delete(id: string, db: ClientOrTransaction = prisma) {
        await db.chat.delete({ where: { id: id as any } });
    }

    static async findByIdAndUser(id: string, userId: string, userType: 'cliente' | 'loja', db: ClientOrTransaction = prisma) {
        return await db.chat.findFirst({
            where: {
                id: id as any,
                ...(userType === 'cliente' ?
                    { clienteId: userId as any } :
                    { lojaId: userId as any }
                )
            },
            select: {
                id: true,
                bloqueado: true,
                bloqueadorTipo: true,
                clienteId: true,
                lojaId: true,
                disabled: true,
                disablerTipo: true
            }
        });
    }

    static async findManyWithMessagesByClienteId(clienteId: string, db: ClientOrTransaction = prisma) {
        return await db.chat.findMany({
            where: {
                clienteId: clienteId as any,
                disabled: false
            },
            orderBy: { dataCriacao: 'desc' },
            select: {
                id: true,
                lojaId: true,
                clienteId: true,
                bloqueado: true,
                bloqueadorTipo: true,
                dataCriacao: true,
                loja: {
                    select: {
                        id: true,
                        nome: true,
                        imagem: true
                    }
                },
                mensagens: {
                    select: {
                        id: true,
                        conteudo: true,
                        enviadoPor: true,
                        lida: true,
                        dataCriacao: true
                    },
                    orderBy: {
                        dataCriacao: 'desc'
                    },
                    take: 100
                }
            }
        });
    }

    static async findManyWithMessagesByLojaId(lojaId: string, db: ClientOrTransaction = prisma) {
        return await db.chat.findMany({
            where: {
                lojaId: lojaId as any,
                disabled: false
            },
            orderBy: { dataCriacao: 'desc' },
            select: {
                id: true,
                lojaId: true,
                clienteId: true,
                bloqueado: true,
                bloqueadorTipo: true,
                dataCriacao: true,
                cliente: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                mensagens: {
                    select: {
                        id: true,
                        conteudo: true,
                        enviadoPor: true,
                        lida: true,
                        dataCriacao: true
                    },
                    orderBy: {
                        dataCriacao: 'desc'
                    },
                    take: 100
                }
            }
        });
    }

    static async findManyIdsByUser(userId: string, userType: 'cliente' | 'loja', db: ClientOrTransaction = prisma) {
        return await db.chat.findMany({
            select: { id: true },
            where: {
                ...(userType === 'cliente' ? {
                    clienteId: userId as any
                } : {
                    lojaId: userId as any
                }),
                disabled: false,
                bloqueado: false
            }
        });
    }

}

export default ChatModel;
