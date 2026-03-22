import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS, RequestCustomVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import Errors from "@utils/errorClasses"
import { buscarEventosQuerySchema } from '@validators/controllers/eventoControllerSchema';
import FormatUtils from '@utils/format';

export default class EventoController {

    static async buscarEventos(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = buscarEventosQuerySchema.parse(req.query);
            const { pagina, situacao, categoria, nome } = query;
            const AND: object[] = [];
            const agora = new Date();
            switch (situacao) {
                case 'disponivel':
                    AND.push({
                        fim: {
                            gte: agora
                        }
                    })
                    break;
                case 'encerrado':
                    AND.push({
                        fim: {
                            lte: agora
                        }
                    })
                    break;
                case 'acontecendo':
                    AND.push(
                        {
                            fim: {
                                gte: agora
                            }
                        },
                        {
                            inicio: {
                                lte: agora
                            }
                        }
                    )
                    break;
                default:
                    break;
            }
            if(categoria){
                AND.push({
                    categoria: {
                        contains: FormatUtils.normalizeString(categoria)
                    }
                })
            }
            if(nome){
                AND.push({
                    nomeNormalizado: {
                        contains: FormatUtils.normalizeString(nome)
                    }
                })
            }
            const eventos = await prisma.evento.findMany({
                where: {
                    AND
                },
                skip: (pagina-1)*10,
                take: 10
            });
            ResponseVS(res, {
                data: eventos
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}