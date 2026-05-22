import ChatService from '@services/chatService';
import type { RequestAuthVS } from '@interfaces/requestEntity';
import type { Request, Response, NextFunction } from 'express';
import type { UUID } from 'crypto';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import { blockSchema, createChatSchema } from './chatControllerSchema';
import { ResponseVS } from '@utils/response';
import { uuidSchema } from '@validators/shared/basicsSchema';

class ChatController {

    static async createChat(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const dto = createChatSchema.parse(authReq.body);
            const { id } = authReq.user;
            const newChat = await ChatService.createChat(id as UUID, dto.lojaId as UUID);
            ResponseVS(res, { data: newChat }, 201);
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async verifyAvailable(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const chatId = uuidSchema.parse(authReq.params.id) as UUID;
            const { id: userId, tipo: userType } = authReq.user;
            const result = await ChatService.verifyAvailable(chatId, userId as UUID, userType);
            ResponseVS(res, {
                message: `Chat ${result ? '' : 'in'}disponível.`,
                data: { available: result }
            });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async listCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id } = authReq.user;
            const chats = await ChatService.listCliente(id as UUID);
            ResponseVS(res, { data: chats });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async listLoja(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id } = authReq.user;
            const chats = await ChatService.listLoja(id as UUID);
            ResponseVS(res, { data: chats });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async listIds(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id, tipo } = authReq.user;
            const chatsIds = await ChatService.listIds(id as UUID, tipo);
            ResponseVS(res, { data: chatsIds });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async disable(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id, tipo } = authReq.user;
            const chatId = uuidSchema.parse(authReq.params.id) as UUID;
            await ChatService.disable(id as UUID, tipo, chatId);
            ResponseVS(res, { message: 'Chat desabilitado com sucesso.' });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async block(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id, tipo } = authReq.user;
            const dto = blockSchema.parse(authReq.body);
            const chatId = uuidSchema.parse(authReq.params.id) as UUID;
            await ChatService.block(id as UUID, tipo, chatId, dto.blockStatus);
            ResponseVS(res, { message: `Chat ${dto.blockStatus ? 'bloqueado' : 'desbloqueado'} com sucesso.` });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id, tipo } = authReq.user;
            const chatId = uuidSchema.parse(authReq.params.id) as UUID;
            await ChatService.delete(id as UUID, tipo, chatId);
            ResponseVS(res, { message: 'Chat deletado com sucesso.' });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

}

export default ChatController;
