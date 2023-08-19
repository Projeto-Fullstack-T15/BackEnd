import { z } from "zod";
import { CreateUserSchema } from './user.schemas';

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
