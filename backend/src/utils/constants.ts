import FormatUtils from "./format";

[
    'DATABASE_URL',
    'JWT_SECRET',
    'SHA256_KEY',
].forEach(variable => {
    if(!process.env[variable]) throw new Error(`Variável ${variable} não definida no ambiente!`);
});

export const JWT_SECRET = process.env.JWT_SECRET!;
export const IS_PRODUCTION = process.env.NODE_ENV?.toLowerCase() === 'production';
export const SHA256_KEY = process.env.SHA256_KEY!;