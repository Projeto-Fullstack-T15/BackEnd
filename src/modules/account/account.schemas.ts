import { z } from "zod";
import { CreateUserSchema } from "../user/user.schemas";
import { CreateAddressSchema } from "../address/address.schemas";

export const CreateAccountSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    phone: z.string().min(10).max(14),
    accountType: z.enum(["buyer", "announcer"]),
    user: CreateUserSchema,
    address: CreateAddressSchema
});

export const LoginAccountSchema = CreateAccountSchema.pick({ email: true, password: true });
export const RetrieveAccountSchema = CreateAccountSchema.omit({ password: true });

