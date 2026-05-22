import prisma from '@configs/db';
import type { UUID } from 'crypto';
import CryptoUtils from '@utils/crypto';

class CustomService {

    private static decryptMessages<T extends { conteudo: string }>(messages: T[]): T[] {
        return messages.map(m => {
            try {
                return {
                    ...m,
                    conteudo: CryptoUtils.decrypt(m.conteudo)
                };
            } catch (err) {
                return m;
            }
        });
    }

    static async chatsCliente(clienteId: string) {
        const chats = await prisma.chat.findMany({
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

        const formattedChats = chats.map((ct: any) => ({
            ...ct,
            mensagens: this.decryptMessages([...ct.mensagens].reverse())
        }));

        return { chats: formattedChats };
    }

    static async chatsLoja(lojaId: string) {
        const chats = await prisma.chat.findMany({
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

        const formattedChats = chats.map((ct: any) => ({
            ...ct,
            mensagens: this.decryptMessages([...ct.mensagens].reverse())
        }));

        return { chats: formattedChats };
    }

}

export default CustomService;
