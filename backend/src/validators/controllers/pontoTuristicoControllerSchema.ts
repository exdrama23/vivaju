import z from "zod";
import { stringSchema } from "../shared/basicsSchema";

export const buscarPontosTuristicosQuerySchema = z.strictObject({
    nome: stringSchema
        .optional(),
    pagina: z.coerce.number()
        .int()
        .min(1)
        .optional()
        .default(1)
});