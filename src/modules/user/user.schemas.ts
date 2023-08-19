import { z } from "zod";
export const SchemaUpdateUserRequest = z
  .object({
    ID: z.number(),
    Name: z.string(),
    CPF: z.string(),
    email: z.string(),
    Phone: z.string(),
    Password: z.string(),
    BirthDate: z.string().or(z.date()),
    description: z.string(),
  })
  .omit({
    ID: true,
    Password: true,
    BirthDate: true,
  })
  .partial();
export const SchemaUpdateUserResponse = z.object({
  ID: z.number(),
  Name: z.string(),
  CPF: z.string(),
  email: z.string(),
  Phone: z.string(),
  Password: z.string(),
  BirthDate: z.string().or(z.date()),
  description: z.string(),
});
