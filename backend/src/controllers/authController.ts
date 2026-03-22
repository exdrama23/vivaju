import prisma from '@configs/db';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
import type { RequestAuthVS, RequestCustomVS } from '@interfaces/requestEntity';
import { ResponseVS } from '@utils/response';
import type { Response, NextFunction } from 'express';
import Errors from "@utils/errorClasses"
import Argon2Utils from '@utils/argon2';
import { loginSchema } from '@validators/controllers/authControllerSchema';
import CookieUtils from '@utils/cookies';

export default class AuthController {

    static async loginLoja(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const dto = loginSchema.parse(req.body);
            const lojaPorEmail = await prisma.loja.findUnique({
                where: {email: dto.email},
                select: {
                    id: true,
                    nome: true,
                    senha: true
                }
            });
            if(!lojaPorEmail)
                throw new Errors.InvalidCredentialsError("Credenciais inválidas.");
            const senhaValida = await Argon2Utils.validatePassword(lojaPorEmail.senha, dto.senha);
            if(!senhaValida)
                throw new Errors.InvalidCredentialsError("Credenciais inválidas.");
            const accessToken = CookieUtils.generateAccessToken(lojaPorEmail.id, "loja");
            CookieUtils.saveCookieAccessToken(res, accessToken);
            ResponseVS(res, {
                message: "Logado com sucesso.",
                data: {
                    id: lojaPorEmail.id,
                    nome: lojaPorEmail.nome,
                    tipo: "comerciante"
                }
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async loginCliente(req: RequestCustomVS, res: Response, next: NextFunction){
        try {
            const dto = loginSchema.parse(req.body);
            const clientePorEmail = await prisma.cliente.findUnique({
                where: {email: dto.email},
                select: {
                    id: true,
                    nome: true,
                    senha: true
                }
            });
            if(!clientePorEmail)
                throw new Errors.InvalidCredentialsError("Credenciais inválidas.");
            const senhaValida = await Argon2Utils.validatePassword(clientePorEmail.senha, dto.senha);
            if(!senhaValida)
                throw new Errors.InvalidCredentialsError("Credenciais inválidas.");
            const accessToken = CookieUtils.generateAccessToken(clientePorEmail.id, "cliente");
            CookieUtils.saveCookieAccessToken(res, accessToken);
            ResponseVS(res, {
                message: "Logado com sucesso.",
                data: {
                    id: clientePorEmail.id,
                    nome: clientePorEmail.nome,
                    tipo: "cliente"
                }
            });
        } catch (err) {
            const erro = err as ErrorCustomVS;
            next(erro);
        }
    }

    static async logout(_req: RequestAuthVS, res: Response, next: NextFunction){
        CookieUtils.clearAllCookiesAuth(res);
        ResponseVS(res, {message: "Deslogado com sucesso."});
    }

}