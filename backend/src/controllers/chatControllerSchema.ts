import { booleanSchema, uuidSchema } from "@validators/shared/basicsSchema";
import z from "zod";

export const createChatSchema = z.strictObject({
    lojaId: uuidSchema
});
export type CreateChatDTO = z.output<typeof createChatSchema>;

export const blockSchema = z.strictObject({
    blockStatus: booleanSchema
});
export type BlockDTO = z.output<typeof blockSchema>;
