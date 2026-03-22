import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS, RequestCustomVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import Errors from "@utils/errorClasses"
import FormatUtils from '@utils/format';
import { buscarPontosTuristicosQuerySchema } from '@validators/controllers/pontoTuristicoControllerSchema';

export default class PontoTuristicoController {

    static async buscarPontosTuristicos(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = buscarPontosTuristicosQuerySchema.parse(req.query);
            const where = {
                ...(query.nome?{
                    nomeNormalizado: {
                        contains: FormatUtils.normalizeString(query.nome)
                    }
                }:{})
            };
            const pontos = await prisma.pontoTuristico.findMany({
                where,
                skip: (query.pagina-1)*10,
                take: 10
            });
            ResponseVS(res, {
                data: pontos
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}