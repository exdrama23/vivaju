import type { Request, Response, NextFunction } from 'express';
import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS, RequestCustomVS } from '@interfaces/requestEntity';
import { cadastroLojaSchema, editarLojaSchema } from '@validators/controllers/lojaControllerSchema';
import { ResponseVS } from '@utils/response';
import Errors from "@utils/errorClasses"
import Argon2Utils from '@utils/argon2';
import FormatUtils from '@utils/format';
import z from 'zod';

export default class LojaController {

    static async cadastroLoja(req: Request, res: Response, next: NextFunction){
        try {
            const customReq = req as RequestCustomVS;
            const dto = cadastroLojaSchema.parse(customReq.body);
            const {senha, estacionamentoInfo, ...resto} = dto;
            const emailExiste = await prisma.loja.findUnique({
                where: {email: dto.email}
            });
            if(emailExiste){
                throw new Errors.ConflictError("Ja tem loja com esse email.")
            }
            const senhaHash = await Argon2Utils.hashPassword(senha);
            if(!senhaHash)
                throw new Errors.ServerError("Erro inesperado.");
            await prisma.loja.create({data: {
                ...resto,
                senha: senhaHash,
                ...(estacionamentoInfo ? {lojaEstacionamento: {
                    create: estacionamentoInfo
                }}:{}),
                nomeNormalizado: FormatUtils.normalizeString(resto.nome)
            }});
            ResponseVS(res, {message: 'Cadastro realizado com sucesso, já pode fazer login.'});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async editarLoja(req: Request, res: Response, next: NextFunction){
        try {
            const authReq = req as RequestAuthVS;
            const {id} = authReq.user;
            const dto = editarLojaSchema.parse(authReq.body);
            const { estacionamentoInfo, lojaFuncionamento, ...resto } = dto;
            await prisma.loja.update({
                where: {id},
                data: {
                    ...resto,
                    ...(estacionamentoInfo ? {
                        lojaEstacionamento:{
                            upsert: {
                                where: { lojaId: id },
                                create: estacionamentoInfo,
                                update: estacionamentoInfo
                            }
                        }
                    }: {}),
                    ...(lojaFuncionamento ? {
                        lojaFuncionamento:{
                            upsert: {
                                where: { lojaId: id },
                                create: lojaFuncionamento,
                                update: lojaFuncionamento
                            }
                        }
                    }: {}),
                    ...(resto.nome?{
                        nomeNormalizado: FormatUtils.normalizeString(resto.nome)
                    }:{})
                }
            });
            ResponseVS(res, {message: 'Edição realizada com sucesso.'});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarLojas(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = z.object({
                page: z.coerce.number()
                    .int()
                    .min(1)
                    .optional()
                    .default(1)
            }).parse(req.query);
            const lojas = await prisma.loja.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    latitude: true,
                    longitude: true,
                    imagem: true,
                    telefoneContato: true,
                    logradouro: true,
                    estacionamento: true,
                    categoriaLoja: {
                        select: {
                            categoria: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    produtoLoja: {
                        select: {
                            produto: true,
                            preco: true
                        }
                    },
                    lojaFuncionamento: true
                },
                where: {
                    // Remove strictly false filter to show shops that HAVE parking
                    // We can filter out items that are ONLY parking lots by checking their category if needed
                },
                orderBy: {
                    dataAtualizacao: 'desc'
                },
                skip: (query.page-1)*100,
                take: 100
            });
            ResponseVS(res, {data: lojas});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarLojasPorNome(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = z.object({
                page: z.coerce.number()
                    .int()
                    .min(1)
                    .optional()
                    .default(1)
            }).parse(req.query);
            const nome = req.params.nome as string;
            const lojas = await prisma.loja.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    latitude: true,
                    longitude: true,
                    imagem: true,
                    telefoneContato: true,
                    logradouro: true,
                    estacionamento: true,
                    categoriaLoja: {
                        select: {
                            categoria: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    produtoLoja: {
                        select: {
                            produto: true,
                            preco: true
                        }
                    },
                    lojaFuncionamento: true
                },
                where: {
                    estacionamento: false,
                    nomeNormalizado: {
                        contains: FormatUtils.normalizeString(nome)
                    }
                },
                orderBy: {
                    dataAtualizacao: 'desc'
                },
                skip: (query.page-1)*100,
                take: 100
            });
            ResponseVS(res, {data: lojas});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarLojasPorCategoria(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = z.object({
                page: z.coerce.number()
                    .int()
                    .min(1)
                    .optional()
                    .default(1)
            }).parse(req.query);
            const categoria = req.params.categoria as string;
            const lojas = await prisma.loja.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    latitude: true,
                    longitude: true,
                    imagem: true,
                    telefoneContato: true,
                    logradouro: true,
                    estacionamento: true,
                    categoriaLoja: {
                        select: {
                            categoria: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    produtoLoja: {
                        select: {
                            produto: true,
                            preco: true
                        }
                    },
                    lojaFuncionamento: true
                },
                where: {
                    estacionamento: false,
                    OR: [{
                        categoriaLoja: {
                            some: {
                                categoria: {
                                    nome: {
                                        contains: FormatUtils.normalizeString(categoria)
                                    }
                                }
                            }
                        }
                    },{
                        produtoLoja: {
                            some: {
                                produto: {
                                    categoriaProdutos: {
                                        some: {
                                            categoria: {
                                                nome: {
                                                    contains: FormatUtils.normalizeString(categoria)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }]
                },
                orderBy: {
                    dataAtualizacao: 'desc'
                },
                skip: (query.page-1)*100,
                take: 100
            });
            ResponseVS(res, {data: lojas});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarLojasPorProduto(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = z.object({
                page: z.coerce.number()
                    .int()
                    .min(1)
                    .optional()
                    .default(1)
            }).parse(req.query);
            const produto = req.params.produto as string;
            const lojas = await prisma.loja.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    latitude: true,
                    longitude: true,
                    imagem: true,
                    telefoneContato: true,
                    logradouro: true,
                    estacionamento: true,
                    categoriaLoja: {
                        select: {
                            categoria: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    produtoLoja: {
                        select: {
                            produto: true,
                            preco: true
                        }
                    },
                    lojaFuncionamento: true
                },
                where: {
                    produtoLoja: {
                        some: {
                            produto: {
                                nome: {
                                    contains: FormatUtils.normalizeString(produto)
                                }
                            }
                        }
                    }                    
                },
                orderBy: {
                    dataAtualizacao: 'desc'
                },
                skip: (query.page-1)*100,
                take: 100
            });
            ResponseVS(res, {data: lojas});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarLojaPorId(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const id = req.params.id as string;
            const loja = await prisma.loja.findUnique({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    dataCriacao: true,
                    dataAtualizacao: true,
                    cep: true,
                    complemento: true,
                    email: true,
                    estacionamento: true,
                    logradouro: true,
                    lojaEstacionamento: true,
                    numEndereco: true,
                    telefoneContato: true,
                    produtoLoja: {
                        select: {
                            produto: true
                        }
                    },
                    categoriaLoja: {
                        select: {
                            categoria: true
                        }
                    },
                    lojaFuncionamento: true
                },
                where: {id}
            });
            if(!loja)
                throw new Errors.NotFoundError("Loja não encontrada.")
            ResponseVS(res, {data: loja});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarEstacionamentos(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const query = z.object({
                page: z.coerce.number()
                    .int()
                    .min(1)
                    .optional()
                    .default(1)
            }).parse(req.query);
            const lojas = await prisma.loja.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    vendedorAmbulante: true,
                    lojaFuncionamento: true,
                    lojaEstacionamento: true
                },
                where: {
                    estacionamento: true,
                },
                orderBy: {
                    dataAtualizacao: 'desc'
                },
                skip: (query.page-1)*100,
                take: 100
            });
            ResponseVS(res, {data: lojas});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}