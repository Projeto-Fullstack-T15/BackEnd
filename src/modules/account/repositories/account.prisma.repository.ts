import { PrismaService } from "src/database/prisma.service";
import { CreateAccountDto } from "../dto/create-account.dto";
import { UpdateAccountDto } from "../dto/update-account.dto";
import { Account } from "@prisma/client";
import { AccountRepository } from "./account.repository";
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AccountPrismaRepository implements AccountRepository {
	constructor(
		private readonly db: PrismaService
	) { }

	public async createNewAccount(data: CreateAccountDto): Promise<Account> {
		try {
			const newAccount = await this.db.account.create({ data });

			return newAccount;
		} catch (err) {
			throw new InternalServerErrorException("An error ocurred when tried to create account");
		}
	}

	public async getAccountById(id: number): Promise<Account> {
		try {
			const findAccount = await this.db.account.findUnique({
				where: { id }, include: {
					address: true, user: true
				}
			});

			return findAccount;
		} catch (err) {
			throw new InternalServerErrorException("An error ocurred when tried to search account");
		}
	}

	public async updateAccount(account: Account, data: UpdateAccountDto): Promise<Account> {
		try {
			const updatedAccount = await this.db.account.update({
				data,
				where: { id: account.id }
			});

			return updatedAccount;
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException("An error ocurred when tried to update account");
		}
	}

	public async deleteAccount(account: Account): Promise<void> {
		try {
			await this.db.account.delete({
				where: { id: account.id }
			});

			return;
		} catch (err) {
			throw new InternalServerErrorException("An error ocurred when tried to delete account");
		}
	}

	public async findAccount(search: UpdateAccountDto): Promise<Account> {
		try {
			const findAccount = await this.db.account.findFirst({
				where: { ...search }
			});

			return findAccount;
		} catch (err) {
			throw new InternalServerErrorException("An error ocurred when tried to find account");
		}
	}
}