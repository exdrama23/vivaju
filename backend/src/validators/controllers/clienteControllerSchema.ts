import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";
import { senhaSchema, telefoneSchema } from "../shared/utilsSchema";

export const cadastroClienteSchema = z.object({
    email: emailSchema,
    senha: senhaSchema,
    telefone: telefoneSchema
        .optional(),
    nome: stringSchema
        .min(1, 'O nome deve conter pelo menos 1 caractere')
        .max(150, 'O nome deve conter no máximo 150 caracteres')
});

export const editarClienteSchema = z.object({
    telefone: telefoneSchema
        .nullable()
        .optional(),
    nome: stringSchema
        .min(1, 'O nome deve conter pelo menos 1 caractere')
        .max(150, 'O nome deve conter no máximo 150 caracteres')
        .optional()
});