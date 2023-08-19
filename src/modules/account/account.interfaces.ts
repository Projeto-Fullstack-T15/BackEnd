import { Address } from './../address/address.entity';
import { z } from "zod";
import { CreateAccountSchema, LoginAccountSchema } from "./account.schemas";
import { Account } from "./account.entity";
import { User } from "../user/user.entity";

export type CreateAccountRequest = z.infer<typeof CreateAccountSchema>;
export type LoginAccountRequest = z.infer<typeof LoginAccountSchema>;

export interface LoginAccountResponse {
    token: string;
}

export interface CreateAccountResponse extends Omit<Account, "password"> {
    user: User;
    address: Address;
}