import type { Request, Response, NextFunction } from 'express';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import CustomService from '@services/customService';
import { ResponseVS } from '@utils/response';
import type { RequestAuthVS } from '@interfaces/requestEntity';
import type { UUID } from 'crypto';

class CustomController {
    static async chatsCliente(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id } = authReq.user;
            const result = await CustomService.chatsCliente(id as UUID);
            ResponseVS(res, { data: result });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }

    static async chatsLoja(req: Request, res: Response, next: NextFunction) {
        try {
            const authReq = req as RequestAuthVS;
            const { id } = authReq.user;
            const result = await CustomService.chatsLoja(id as UUID);
            ResponseVS(res, { data: result });
        } catch (err) {
            next(err as ErrorCustomVS);
        }
    }
}

export default CustomController;
