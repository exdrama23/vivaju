import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";
import { senhaSchema, telefoneSchema } from "../shared/utilsSchema";

export const cadastroClienteSchema = z.strictObject({
    email: emailSchema,
    senha: senhaSchema,
    telefone: telefoneSchema
        .optional(),
    nome: stringSchema
        .min(1, 'O nome deve conter pelo menos 1 caractere')
        .max(150, 'O nome deve conter no máximo 150 caracteres')
});

export const editarClienteSchema = z.strictObject({
    telefone: telefoneSchema
        .nullable()
        .optional(),
    nome: stringSchema
        .min(1, 'O nome deve conter pelo menos 1 caractere')
        .max(150, 'O nome deve conter no máximo 150 caracteres')
        .optional()
});