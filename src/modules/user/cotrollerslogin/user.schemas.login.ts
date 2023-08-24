import { z } from "zod";
export const createLoginSchema = z.object({
  email: z.string().max(45).email(),
  password: z.string().max(120),
});
export const createTokenResponseSchema = z.object({
  token: z.string(),
});

export const loggedInClient = z.object({
  email: z.string().email(),
  ID: z.number(),
});
