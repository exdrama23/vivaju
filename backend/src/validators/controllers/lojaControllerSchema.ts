import z from "zod";
import { booleanSchema, emailSchema, stringSchema } from "../shared/basicsSchema";
import { horaSchema, senhaSchema, telefoneSchema } from "../shared/utilsSchema";

export const cadastroLojaSchema = z.strictObject({
    nome: stringSchema
        .min(1, 'O nome da loja deve conter pelo menos 1 caractere')
        .max(150, 'O nome da loja deve conter no máximo 150 caracteres'),
    descricao: stringSchema
        .min(1, "No minimo 1 caractere.")
        .max(3000, "No max 30 caractere."),
    email: emailSchema,
    senha: senhaSchema,
    telefoneContato: telefoneSchema
        .nullable()
        .optional()
        .default(null),
    vendedorAmbulante: booleanSchema
        .optional()
        .default(false),
    cep: stringSchema
        .length(8, "CEP deve ter 8 digitos.")
        .optional(),
    logradouro: stringSchema
        .max(100, "No maximo 100 caracteres.")
        .optional(),
    numEndereco: stringSchema
        .max(20, "No maximo 20 caracteres.")
        .optional(),
    complemento: stringSchema
        .max(300, "No maximo 300 caracteres.")
        .optional(),
    estacionamento: booleanSchema
        .optional()
        .default(false),
    estacionamentoInfo: z.strictObject({
        preco: stringSchema
            .regex(/^\d+(\.\d{1,2})?$/, "Preco inválido"),
        tempoPreco: stringSchema
            .max(20, "No maximo 20 caracteres.")
    }).optional()
}).refine(obj=>(!obj.estacionamento || obj.estacionamentoInfo) && (obj.estacionamento || !obj.estacionamentoInfo),{
    message: 'Dados de estacionamento inconsistentes',
    path: ['estacionamentoInfo']
});
export type CadastroLojaDTO = z.output<typeof cadastroLojaSchema>;

export const editarLojaSchema = z.strictObject({
    nome: stringSchema
        .min(1, 'O nome da loja deve conter pelo menos 1 caractere')
        .max(150, 'O nome da loja deve conter no máximo 150 caracteres')
        .optional(),
    telefoneContato: telefoneSchema
        .nullable()
        .optional(),
    vendedorAmbulante: booleanSchema
        .optional(),
    cep: stringSchema
        .length(8, "CEP deve ter 8 digitos.")
        .nullable()
        .optional(),
    logradouro: stringSchema
        .max(100, "No maximo 100 caracteres.")
        .nullable()
        .optional(),
    numEndereco: stringSchema
        .max(20, "No maximo 20 caracteres.")
        .nullable()
        .optional(),
    complemento: stringSchema
        .max(300, "No maximo 300 caracteres.")
        .nullable()
        .optional(),
    estacionamento: booleanSchema
        .optional(),
    estacionamentoInfo: z.strictObject({
        preco: stringSchema
            .regex(/^\d+(\.\d{1,2})?$/, "Preco inválido"),
        tempoPreco: stringSchema
            .max(20, "No maximo 20 caracteres.")
    }).optional(),
    lojaFuncionamento: z.strictObject({
        segAbr: horaSchema
            .nullable()
            .optional(),
        segFec: horaSchema
            .nullable()
            .optional(),
        terAbr: horaSchema
            .nullable()
            .optional(),
        terFec: horaSchema
            .nullable()
            .optional(),
        quaAbr: horaSchema
            .nullable()
            .optional(),
        quaFec: horaSchema
            .nullable()
            .optional(),
        quiAbr: horaSchema
            .nullable()
            .optional(),
        quiFec: horaSchema
            .nullable()
            .optional(),
        sexAbr: horaSchema
            .nullable()
            .optional(),
        sexFec: horaSchema
            .nullable()
            .optional(),
        sabAbr: horaSchema
            .nullable()
            .optional(),
        sabFec: horaSchema
            .nullable()
            .optional(),
        domAbr: horaSchema
            .nullable()
            .optional(),
        domFec: horaSchema
            .nullable()
            .optional(),
        feriadoAbr: horaSchema
            .nullable()
            .optional(),
        feriadoFec: horaSchema
            .nullable()
            .optional(),
    }).optional()
}).refine(obj=>(!obj.estacionamento || obj.estacionamentoInfo) && (obj.estacionamento || !obj.estacionamentoInfo),{
    message: 'Dados de estacionamento inconsistentes',
    path: ['estacionamentoInfo']
});
export type EditarLojaDTO = z.output<typeof editarLojaSchema>;