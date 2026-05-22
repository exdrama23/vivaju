import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { RequestAuthVS } from '@interfaces/requestEntity';
import MessageService from '@services/messageService';
import { VSAuth } from '@middlewares/VSAuth';
import { ResponseVS } from '@utils/response';
import { uuidSchema } from '@validators/shared/basicsSchema';
import type { UUID } from 'crypto';
import z from 'zod';

const router = Router();

const createMessageSchema = z.object({
    chatId: uuidSchema,
    message: z.string().min(1).max(500)
});

router.post('/', VSAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as RequestAuthVS;
        const { chatId, message } = createMessageSchema.parse(authReq.body);
        const { id, tipo } = authReq.user;
        const newMessage = await MessageService.create(id as UUID, tipo, chatId as UUID, message);
        ResponseVS(res, { data: newMessage }, 201);
    } catch (err) {
        next(err);
    }
});

router.patch('/chat/:id/view', VSAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as RequestAuthVS;
        const chatId = uuidSchema.parse(authReq.params.id) as UUID;
        const { id, tipo } = authReq.user;
        await MessageService.viewAllByChat(id as UUID, tipo, chatId);
        ResponseVS(res, { message: 'Mensagens marcadas como lidas.' });
    } catch (err) {
        next(err);
    }
});

export default router;
