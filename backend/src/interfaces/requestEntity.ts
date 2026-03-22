import type { Request } from 'express';
import type { AccessTokenPayload } from './cookiesEntity';

export interface RequestCustomVS extends Request {
    cookies: {
        accessToken?: string;
    };
    user?: AccessTokenPayload;
}

export interface RequestAuthVS extends Request {
    cookies: {
        accessToken: string;
    };
    user: AccessTokenPayload;
}