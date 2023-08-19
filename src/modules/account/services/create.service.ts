import { hash } from "bcryptjs";
import { AppDataSource } from "../../../data-source";
import { Repository } from "typeorm";
import { Account } from "../account.entity";
import { CreateAccountRequest, CreateAccountResponse } from "../account.interfaces";
import * as userModule from "../../user";
import * as addressModule from "../../address";

export const create = async (
    data: CreateAccountRequest
): Promise<CreateAccountResponse> => {
    const accountRepository: Repository<Account> = AppDataSource.getRepository(Account);

    const { user, address, ...account } = data;

    const hashedPassword = await hash(account.password, 10);
    account.password = hashedPassword;

    const newAccount = accountRepository.create(account);
    await accountRepository.save(newAccount);

    const newUser = await userModule.services.create(user, newAccount);
    const newAddress = await addressModule.services.create(address, newAccount);

    const createdAccount = {
        ...newAccount,
        user: newUser,
        address: newAddress
    }

    const { password, ...createdAccountResponse } = createdAccount;

    return createdAccountResponse;
}