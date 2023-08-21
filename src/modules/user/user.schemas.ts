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
export const SchemaUpdateUserResponse = z.object({
  ID: z.number(),
  Name: z.string(),
  CPF: z.string(),
  email: z.string(),
  Phone: z.string(),
  Password: z.string(),
  BirthDate: z.string().optional(),
  description: z.string(),
});
