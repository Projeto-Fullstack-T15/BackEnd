import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Account } from "./account.entity";
import { Repository } from "typeorm";

export const validateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	if (!req.headers.authorization) {
		throw new AppError("Missing authorization token", 401);
	}

	const token = req.headers.authorization.split(" ")[1];

	jwt.verify(
		token,
		process.env.SECRET_KEY!,
		(err: any, decoded: any) => {
			if (err) {
				throw new AppError(err.message, 401);
			}

			res.locals = {
				decoded,
				...res.locals,
			};

			return next();
		}
	);
};

export const ensureEmailIsntDuplicated = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	const accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
	const email = req.body.email as string;

	if (!email) {
		next();
	}

	const findAccount = await accountRepository.findOne({
		where: { email }
	});

	if (findAccount) {
		throw new AppError("Email already registered", 409);
	}

	next();
};