import z from "zod";
import { emailSchema, stringSchema } from "../shared/basicsSchema";

export const loginSchema = z.strictObject({
    email: emailSchema,
    senha: stringSchema
});