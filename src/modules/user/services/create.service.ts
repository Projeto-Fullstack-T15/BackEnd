import { AppDataSource } from "../../../data-source";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUserRequest } from "../user.interfaces";
import { Account } from "../../account/account.entity";

export const create = async (
    data: CreateUserRequest,
    account: Account
): Promise<User> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const createdUser = userRepository.create({ ...data, account });
    await userRepository.save(createdUser);

    return createdUser;
};
