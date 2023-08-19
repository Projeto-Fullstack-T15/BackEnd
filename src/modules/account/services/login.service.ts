import { LoginAccountRequest, LoginAccountResponse } from './../account.interfaces';
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors";
import { Account } from "../account.entity";
import "dotenv/config";
import { compare } from 'bcryptjs';

const INVALID_CREDENTIALS_MESSAGE = "Invalid credentials";
const TOKEN_EXPIRATION_TIME = String(process.env.JWT_EXPIRATION_TIME) || "24h";
const SECRET_KEY = String(process.env.JWT_SECRET_KEY) || "i_love_mvc";

export const login = async (
	input: LoginAccountRequest
): Promise<LoginAccountResponse> => {
	const accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
	const findAccount: Account | null = await accountRepository.findOne({ where: { email: input.email } });


	if (!findAccount || !await compare(input.password, findAccount.password)) {
		throw new AppError(INVALID_CREDENTIALS_MESSAGE, 401);
	}

	const token: string = jwt.sign(
		{ accountId: findAccount.id },
		SECRET_KEY,
		{
			expiresIn: TOKEN_EXPIRATION_TIME,
			subject: String(findAccount.id),
		}
	);

	return { token };
};
