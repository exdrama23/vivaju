import jwt from 'jsonwebtoken';
import type { CookieOptions, Response } from 'express';
import { AccessTokenPayload } from '@interfaces/cookiesEntity';
import { JWT_SECRET } from './constants';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
};

class CookieUtils {

    static generateAccessToken(id: string, tipo: "loja" | "cliente") {
        const accessToken = jwt.sign({ id, tipo } satisfies AccessTokenPayload, JWT_SECRET, { expiresIn: '1d' });
        return accessToken;
    }

    static saveCookieAccessToken(res: Response, accessToken: string) {
        res.cookie('accessToken', accessToken, cookieOptions);
    }

    static clearCookieAccessToken(res: Response) {
        res.clearCookie('accessToken', cookieOptions);
    }

    static clearAllCookiesAuth(res: Response) {
        CookieUtils.clearCookieAccessToken(res);
    }

    static validateJWT(token: string) {
        try {
            jwt.verify(token, JWT_SECRET);
            return true;
        } catch {
            return false;
        }
    }

};

export default CookieUtils;