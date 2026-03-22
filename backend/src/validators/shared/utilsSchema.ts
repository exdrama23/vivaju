import { stringSchema } from "./basicsSchema";

export const senhaSchema = stringSchema
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/\d/, 'A senha deve conter pelo menos um número');

export const telefoneSchema = stringSchema
    .max(13, 'O telefone deve conter no máximo 13 dígitos numéricos')
    .regex(/^\d*$/, 'O telefone deve conter apenas dígitos numéricos');

export const funcionarioUsernameSchema = stringSchema
    .min(1, 'O username do funcionário deve conter pelo menos 1 caractere')
    .max(50, 'O username do funcionário deve conter no máximo 50 caracteres')
    .toUpperCase();

export const horaSchema = stringSchema.regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Hora inválida (use HH:MM)"
    );