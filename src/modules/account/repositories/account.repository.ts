import { Account } from "@prisma/client";
import { CreateAccountDto } from "../dto/create-account.dto";
import { UpdateAccountDto } from "../dto/update-account.dto";

export abstract class AccountRepository {
	public abstract createNewAccount(data: CreateAccountDto): Promise<Account>;
	public abstract getAccountById(id: number): Promise<Account>;
	public abstract updateAccount(account: Account, data: UpdateAccountDto): Promise<Account>;
	public abstract deleteAccount(account: Account): Promise<void>;
	public abstract findAccount(search: UpdateAccountDto): Promise<Account>;
}