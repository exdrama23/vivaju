import prisma from '@configs/db';
import ChatModel from '@Models/chatModels';
import Errors from '@utils/errorClasses';
import { type UUID } from 'crypto';
import CryptoUtils from '@utils/crypto';
import { emitUserStatus } from '@sockets/chatSocket';

class ChatService {

  static async createChat(clienteId: string, lojaId: string) {
    const existingChat = await prisma.chat.findFirst({
        where: { clienteId, lojaId }
    });

    if (existingChat) return existingChat;

    const newChat = await ChatModel.create({
      clienteId,
      lojaId
    });

    return {
      ...newChat,
      mensagens: []
    };
  }

  static async verifyAvailable(chatId: string, userId: string, userType: 'cliente' | 'loja') {
    const chat = await ChatModel.findByIdAndUser(chatId, userId, userType);
    if (!chat) return false;

    const validUser = userId === (userType === 'cliente' ? chat.clienteId : chat.lojaId);
    if (!validUser || chat.bloqueado || chat.disabled) return false;

    return true;
  }

  private static decryptMessages<T extends { conteudo: string }>(messages: T[]): T[] {
    return messages.map(m => {
        try {
            return {
                ...m,
                conteudo: CryptoUtils.decrypt(m.conteudo)
            };
        } catch (err) {
            return m; // Retorna original se não for possível descriptografar (ex: mensagens antigas)
        }
    });
  }

  static async listCliente(clienteId: string) {
    const chats = await ChatModel.findManyWithMessagesByClienteId(clienteId);
    return chats.map((ct: any) => ({
      ...ct,
      mensagens: this.decryptMessages([...ct.mensagens].reverse())
    }));
  }

  static async listLoja(lojaId: string) {
    const chats = await ChatModel.findManyWithMessagesByLojaId(lojaId);
    return chats.map((ct: any) => ({
      ...ct,
      mensagens: this.decryptMessages([...ct.mensagens].reverse())
    }));
  }

  static async listIds(userId: string, userType: 'cliente' | 'loja') {
    return await ChatModel.findManyIdsByUser(userId, userType);
  }

  static async disable(userId: string, userType: 'cliente' | 'loja', chatId: string) {
    const chatData = await ChatModel.findByIdAndUser(chatId, userId, userType);
    if (!chatData) throw new Errors.NotFoundError('Chat não encontrado ou ele não é seu.');
    if (chatData.disabled) throw new Errors.ValidationError('O chat já está desabilitado.');

    const updateData = {
      disabled: true,
      disablerTipo: userType,
      disabledAt: new Date()
    };

    await ChatModel.updateDisabled(chatId, updateData);
    emitUserStatus(chatId, 'Offline', userId);
  }

  static async block(userId: string, userType: 'cliente' | 'loja', chatId: string, blockStatus: boolean) {
    const chatData = await ChatModel.findByIdAndUser(chatId, userId, userType);
    if (!chatData) throw new Errors.NotFoundError('Chat não encontrado ou ele não é seu.');
    if (chatData.disabled) throw new Errors.ValidationError('Este chat está desabilitado.');

    if (blockStatus && chatData.bloqueado) throw new Errors.ValidationError('Este chat já está bloqueado.');

    if (!blockStatus) {
      if (!chatData.bloqueado) throw new Errors.ValidationError('Este chat já está desbloqueado.');
      if (userType !== chatData.bloqueadorTipo) throw new Errors.UnauthorizedError('Apenas o usuário que bloqueou pode desbloquear o chat.');
    }

    await ChatModel.updateBlocked(chatId, {
      bloqueado: blockStatus,
      bloqueadorTipo: blockStatus ? userType : null
    });

    emitUserStatus(chatId, 'Offline', userId);
  }

  static async delete(userId: string, userType: 'cliente' | 'loja', chatId: string) {
    const chatData = await ChatModel.findByIdAndUser(chatId, userId, userType);
    if (!chatData) throw new Errors.NotFoundError('Chat não encontrado ou ele não é seu.');

    if (!chatData.disabled) throw new Errors.ValidationError('Apenas chats desabilitados podem ser deletados.');
    if (userType === chatData.disablerTipo) throw new Errors.UnauthorizedError('Apenas o outro usuário pode deletar o chat que você desabilitou.');

    await ChatModel.delete(chatId);
  }

}

export default ChatService;
