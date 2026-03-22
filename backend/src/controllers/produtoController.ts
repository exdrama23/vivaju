import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import z from 'zod';
import { stringSchema } from '@validators/shared/basicsSchema';
import FormatUtils from '@utils/format';

export default class ProdutoController {

    static async adicionarProduto(req: RequestAuthVS, res: Response, next: NextFunction){
        try {
            const {id} = req.user;
            const dto = z.strictObject({
                nome: stringSchema
                    .min(1)
                    .max(150),
                preco: stringSchema
                    .regex(/^\d+(\.\d{1,2})?$/, "Preco inválido"),
                marca: stringSchema
                    .min(1)
                    .max(200)
                    .optional()
            }).parse(req.body);

            const nomeNormalizado = FormatUtils.normalizeString(dto.nome);

            const produtoLoja = await prisma.produtoLoja.create({
                data: {
                    loja: {
                        connect: { id }
                    },
                    preco: dto.preco,
                    ...(dto.marca ? { marca: dto.marca } : {}),
                    produto: {
                        connectOrCreate: {
                            where: { nome: nomeNormalizado },
                            create: { nome: nomeNormalizado }
                        }
                    }
                },
                include: {
                    produto: true
                }
            });

            ResponseVS(res, {
                message: 'Produto adicionado com sucesso à loja.',
                data: produtoLoja.produto
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}