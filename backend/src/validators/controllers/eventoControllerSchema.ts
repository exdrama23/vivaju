import z from "zod";
import { stringSchema } from "../shared/basicsSchema";

export const buscarEventosQuerySchema = z.strictObject({
    situacao: z.enum(["acontecendo", "encerrado", "todos", "disponivel"])
        .optional()
        .default("disponivel"),
    nome: stringSchema
        .optional(),
    categoria: stringSchema
        .optional(),
    pagina: z.coerce.number()
        .int()
        .min(1)
        .optional()
        .default(1)
});