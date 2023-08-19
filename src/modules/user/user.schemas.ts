import { z } from "zod";

export const CreateUserSchema = z.object({
	name: z.string().min(3).max(30),
	cpf: z.string().length(11),
	birthday: z.date(),
	description: z.string().max(300),
});