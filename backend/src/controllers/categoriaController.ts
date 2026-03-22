import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import z from 'zod';
import { stringSchema } from '@validators/shared/basicsSchema';
import FormatUtils from '@utils/format';

export default class CategoriaController {

    static async adicionarCategoria(req: RequestAuthVS, res: Response, next: NextFunction){
        try {
            const {id} = req.user;
            const dto = z.strictObject({
                nome: stringSchema
                    .min(1)
                    .max(150)
            }).parse(req.body);
            
            const nomeNormalizado = FormatUtils.normalizeString(dto.nome);

            const categoriaLoja = await prisma.categoriaLoja.create({
                data: {
                    loja: {
                        connect: { id }
                    },
                    categoria: {
                        connectOrCreate: {
                            where: { nome: nomeNormalizado },
                            create: { nome: nomeNormalizado }
                        }
                    }
                },
                include: {
                    categoria: true
                }
            });

            ResponseVS(res, { 
                message: 'Categoria adicionada com sucesso à loja.',
                data: categoriaLoja.categoria
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}