import { Server, Socket } from 'socket.io';
import type { UUID } from 'crypto';
import ChatModel from '@Models/chatModels';
import { ioEmitToRoom } from './instanceSocket';

export interface UserStatusData {
    status: 'Online' | 'Offline';
    userId?: string;
    chatId: string;
}

export interface ReceivedMessageData {
    chatId: string;
    id: string;
    text: string;
    userType: 'cliente' | 'loja';
}

export interface TypingData {
    chatId: string;
    userId: string;
    isTyping: boolean;
}

export interface ReadMessagesData {
    chatId: string;
    userId: string;
}

export const emitUserStatus = (chatId: string, status: 'Online' | 'Offline', userId?: string) => {
    ioEmitToRoom(`chat:${chatId}`, 'userStatus', { status, userId, chatId } as UserStatusData);
}

export const emitReceivedMessage = (data: ReceivedMessageData) => {
    ioEmitToRoom(`chat:${data.chatId}`, 'receivedMessage', data);
}

export const emitTyping = (data: TypingData) => {
    ioEmitToRoom(`chat:${data.chatId}`, 'userTyping', data);
}

export const emitReadMessages = (data: ReadMessagesData) => {
    ioEmitToRoom(`chat:${data.chatId}`, 'messagesRead', data);
}

export const setupChat = (io: Server, socket: Socket) => {

    const user = socket.data.user;

    socket.on('joinChats', async (callback?: any) => {
        try {
            // Apenas entra em salas que o usuário realmente participa
            const chats = await ChatModel.findManyIdsByUser(user.id, user.tipo);

            for (const chat of chats) {
                const chatRoom = `chat:${chat.id}`;
                socket.join(chatRoom);
                emitUserStatus(chat.id, 'Online', user.id);
            }

            callback?.({ status: 'success' });
        } catch (err) {
            console.error('Socket joinChats error:', err);
            callback?.({ status: 'error', message: 'Erro ao conectar aos seus chats' });
        }
    });

    socket.on('joinChat', async (chatId: UUID, callback?: any) => {
        try {
            // Re-validação rigorosa de participação no chat específico
            const chat = await ChatModel.findByIdAndUser(chatId, user.id, user.tipo);
            if (!chat) throw new Error('Acesso negado ao chat.');

            const chatRoom = `chat:${chatId}`;
            socket.join(chatRoom);
            emitUserStatus(chatId, 'Online', user.id);

            callback?.({ status: 'success', message: 'Conectado ao chat com segurança.' });
        } catch (err) {
            callback?.({ status: 'error', message: 'Não foi possível entrar nesta conversa.' });
        }
    });

    socket.on('typing', async (data: { chatId: string, isTyping: boolean }) => {
        // Verifica se o usuário está na sala antes de emitir (opcional, mas seguro)
        if (socket.rooms.has(`chat:${data.chatId}`)) {
            socket.to(`chat:${data.chatId}`).emit('userTyping', {
                chatId: data.chatId,
                userId: user.id,
                isTyping: data.isTyping
            });
        }
    });

    socket.on('markAsRead', (data: { chatId: string }) => {
        if (socket.rooms.has(`chat:${data.chatId}`)) {
            socket.to(`chat:${data.chatId}`).emit('messagesRead', {
                chatId: data.chatId,
                userId: user.id
            });
        }
    });

    socket.on('leaveRoom', (chatId: string) => {
        socket.leave(`chat:${chatId}`);
        emitUserStatus(chatId, 'Offline', user.id);
    });

    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
            if (room.startsWith('chat:')) {
                const chatId = room.split(':')[1];
                emitUserStatus(chatId, 'Offline', user.id);
            }
        });
    });

}
