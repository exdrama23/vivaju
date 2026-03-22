// * Imports
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import CookieUtils from '@utils/cookies';
import type { Response, NextFunction } from 'express';
import type { RequestCustomVS } from '@interfaces/requestEntity';
import Errors from '@utils/errorClasses';
import CryptoUtils from '@utils/crypto';
import { AccessTokenPayload } from '@interfaces/cookiesEntity';

// * Chave secreta para o JWT
const JWT_SECRET = process.env.JWT_SECRET!;

// * Autenticação JWT
export async function VSAuth(req: RequestCustomVS, res: Response, next: NextFunction) {

    const { accessToken, } = req.cookies;

    if(!accessToken){
        CookieUtils.clearAllCookiesAuth(res);
        return next(new Errors.InvalidCredentialsError('Você não está logado.', 'VS_AUTH_REQUIRED'));
    }

    // * Inicializa user como null para depois atribuir os valores
    let user: AccessTokenPayload | null = null;

    const clearAndError = ()=>{
        CookieUtils.clearAllCookiesAuth(res);
        return next(new Errors.InvalidCredentialsError('Sessão inválida.', 'VS_AUTH_INVALID'));
    }

    try {
        // * Valida o access token
        user = jwt.verify(accessToken, JWT_SECRET) as AccessTokenPayload;
    } catch (erro) {
        if(erro instanceof TokenExpiredError){
            CookieUtils.clearAllCookiesAuth(res);
            return next(new Errors.InvalidCredentialsError('Sessão expirada.', 'VS_AUTH_EXPIRED'));
        } else {
            return clearAndError();
        }
    }

    // * Se der algum problema com user tem uma validação de garantia
    if (!user) {
        CookieUtils.clearAllCookiesAuth(res);
        return next(new Errors.InvalidCredentialsError('Não autenticado.', 'VS_AUTH_INVALID'));
    }
    // * Passa o user para a próxima função
    req.user = user;
    next();
}

export function apenasLoja(req: RequestCustomVS, _res: Response, next: NextFunction) {
    if (req.user?.tipo === "loja") return next();
    return next(new Errors.UnauthorizedError('Acesso apenas para empresas.', 'VS_AUTH_LIMITED_ACCESS'));
}

export function apenasCliente(req: RequestCustomVS, _res: Response, next: NextFunction) {
    if (req.user?.tipo === "cliente") return next();
    return next(new Errors.UnauthorizedError('Acesso apenas para clientes.', 'VS_AUTH_LIMITED_ACCESS'));
}
