import { z } from "zod";
import { CreateAccountSchema, LoginAccountSchema, RetrieveAccountSchema } from "./account.schemas";

export type AccountType = "buyer" | "announcer";
export type CreateAccountRequest = z.infer<typeof CreateAccountSchema>;
export type CreateAccountResponse = z.infer<typeof RetrieveAccountSchema>;
export type LoginAccountRequest = z.infer<typeof LoginAccountSchema>;

export interface LoginAccountResponse {
    token: string;
}