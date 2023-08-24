import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRepository } from "./user.repository";
import { InternalServerErrorException } from "@nestjs/common/exceptions";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(
		private readonly db: PrismaService
	) { }

	public async createNewUser(data: CreateUserDto, account_id: number): Promise<User> {
		try {
			const newUser = await this.db.user.create({ data: { ...data, account_id } });

			return newUser;
		} catch (err) {
			throw new InternalServerErrorException(err, {
				cause: err,
				description: "An error ocurred when tried to create a new user"
			});
		}
	}

	public async getUserById(id: number): Promise<User> {
		try {
			const findUser = await this.db.user.findUnique({ where: { id } });

			return findUser;
		} catch (err) {
			throw new InternalServerErrorException(err, {
				cause: err,
				description: "An error ocurred when tried to search for user"
			});
		}
	}

	public async updateUser(user: User, data: UpdateUserDto): Promise<User> {
		try {
			const updatedUser = await this.db.user.update({
				data,
				where: { id: user.id }
			});

			return updatedUser;
		} catch (err) {
			throw new InternalServerErrorException(err, {
				cause: err,
				description: "An error ocurred when tried to update user"
			});
		}
	}

	public findUser(search: UpdateUserDto): Promise<User> {
		try {
			const findUser = this.db.user.findFirst({
				where: { ...search }
			});

			return findUser;
		} catch (err) {
			throw new InternalServerErrorException("An error ocurred when tried to find account");
		}
	}
}