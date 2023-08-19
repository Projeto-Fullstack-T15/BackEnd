import { z } from "zod";

export const CreateAddressSchema = z.object({
    zipCode: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string().nullable(),
});