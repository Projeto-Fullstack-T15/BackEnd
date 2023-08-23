import { z } from "zod";
export const SchemaUpdateUserRequest = z
  .object({
    ID: z.number().optional(),
    Name: z.string().optional(),
    CPF: z.string().optional(),
    email: z.string().optional(),
    Phone: z.string().optional(),
    Password: z.string().optional(),
    BirthDate: z.string().optional(),
    description: z.string().optional(),
  })
  .omit({
    ID: true,
    Password: true,
  })
  .partial();
