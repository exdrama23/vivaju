import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";

export const loginSchema = z.object({
    email: emailSchema,
    senha: stringSchema
});