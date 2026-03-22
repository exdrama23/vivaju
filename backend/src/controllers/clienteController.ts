import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS, RequestCustomVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import Errors from "@utils/errorClasses"
import Argon2Utils from '@utils/argon2';
import { cadastroClienteSchema, editarClienteSchema } from '@validators/controllers/clienteControllerSchema';

export default class ClienteController {

    static async cadastroCliente(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const dto = cadastroClienteSchema.parse(req.body);
            const {senha, ...resto} = dto;
            const emailExiste = await prisma.cliente.findUnique({
                where: {email: dto.email}
            });
            if(emailExiste){
                throw new Errors.ConflictError("Ja tem cliente com esse email.")
            }
            const senhaHash = await Argon2Utils.hashPassword(senha);
            if(!senhaHash)
                throw new Errors.ServerError("Erro inesperado.");
            await prisma.cliente.create({
                data: {
                    ...resto,
                    senha: senhaHash
                }
            });
            ResponseVS(res, {message: 'Cadastro realizado com sucesso, já pode fazer login.'});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async editarCliente(req: RequestAuthVS, res: Response, next: NextFunction){
        try {
            const {id} = req.user;
            const dto = editarClienteSchema.parse(req.body);
            await prisma.cliente.update({
                where: {id},
                data: dto
            });
            ResponseVS(res, {message: 'Edição realizada com sucesso.'});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async buscarClientePorId(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const id = req.params.id as string;
            const cliente = await prisma.cliente.findUnique({
                where: {id},
                select: {
                    id: true,
                    email: true,
                    nome: true,
                    telefone: true,
                    dataAtualizacao: true,
                    dataCriacao: true
                }
            });
            if(!cliente)
                throw new Errors.NotFoundError("Cliente não encontrado.");
            ResponseVS(res, {data: cliente});
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

}