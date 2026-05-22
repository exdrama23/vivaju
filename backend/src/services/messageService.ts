import ChatModel from '../Models/chatModels';
import Errors from '@utils/errorClasses';
import type { UUID } from 'crypto';
import MessageModel from '@Models/messageModels';
import { emitReceivedMessage, emitUserStatus } from '@sockets/chatSocket';
import { emitNotification } from '@sockets/notificationSocket';
import prisma from '@configs/db';
import CryptoUtils from '@utils/crypto';

class MessageService {

  private static async canCreate(userId: UUID, userType: 'cliente' | 'loja', chatId: UUID) {
    const chat = await ChatModel.findByIdAndUser(chatId, userId, userType);
    
    if (!chat) throw new Errors.NotFoundError('Chat fornecido não existe ou não pertence a você.');

    // Verificação estrita de propriedade
    const isOwner = userType === 'cliente' ? chat.clienteId === userId : chat.lojaId === userId;
    if (!isOwner) throw new Errors.UnauthorizedError('Você não tem permissão para enviar mensagens neste chat.', 'CHAT_UNAUTHORIZED_SENDER');

    if (chat.bloqueado) throw new Errors.UnauthorizedError('Este chat está bloqueado e não aceita novas mensagens.', 'CHAT_BLOCKED');
    if (chat.disabled) throw new Errors.UnauthorizedError('Este chat foi desativado.', 'CHAT_DISABLED');
    
    return chat;
  }

  static async create(userId: UUID, userType: 'cliente' | 'loja', chatId: UUID, conteudo: string) {
    const chat = await this.canCreate(userId, userType, chatId);

    const encryptedContent = CryptoUtils.encrypt(conteudo);

    const newMessage = await MessageModel.create({
      conteudo: encryptedContent,
      enviadoPor: userType,
      chatId: chatId
    });

    emitUserStatus(chatId, 'Online', userId);
    emitReceivedMessage({
      chatId,
      id: newMessage.id as UUID,
      text: conteudo,
      userType: userType as 'cliente' | 'loja'
    });

    // Enviar Notificação
    const recipientId = userType === 'cliente' ? chat.lojaId : chat.clienteId;
    
    // Buscar nome do remetente para a notificação
    let senderName = 'Alguém';
    if (userType === 'cliente') {
        const c = await prisma.cliente.findUnique({ where: { id: userId }, select: { nome: true } });
        if (c) senderName = c.nome;
    } else {
        const l = await prisma.loja.findUnique({ where: { id: userId }, select: { nome: true } });
        if (l) senderName = l.nome;
    }

    emitNotification(recipientId as UUID, {
        chatId,
        senderName,
        text: conteudo
    });

    return newMessage;
  }

  static async viewAllByChat(userId: UUID, userType: 'cliente' | 'loja', chatId: UUID) {
    const chat = await ChatModel.findByIdAndUser(chatId, userId, userType);
    if (!chat) throw new Errors.NotFoundError('Chat fornecido não existe ou não pertence a você.');

    await MessageModel.updateManyStatusByChatIdAndUserType(chatId, userType);
  }

  static async delete(userId: UUID, userType: 'cliente' | 'loja', messageId: UUID) {
    const message = await MessageModel.findByIdAndUserType(messageId, userType);
    if (!message) throw new Errors.NotFoundError('Mensagem fornecida não existe ou não foi enviada por você.');

    const chat = message.chat;
    const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

    // Validação de tempo e propriedade do chat original
    if (
      message.dataCriacao < thirtyMinAgo ||
      chat.disabled ||
      userId !== (userType === 'cliente' ? chat.clienteId : chat.lojaId)
    ) {
      throw new Errors.UnauthorizedError('Não é possível deletar esta mensagem no momento.');
    }

    await MessageModel.delete(messageId);
  }

}

export default MessageService;
