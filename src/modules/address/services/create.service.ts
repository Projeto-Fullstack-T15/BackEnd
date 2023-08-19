import { AppDataSource } from "../../../data-source";
import { Repository } from "typeorm";
import { CreateAddressRequest } from "../address.interfaces";
import { Address } from "../address.entity";
import { Account } from "../../account/account.entity";

export const create = async (
    data: CreateAddressRequest,
    account: Account
): Promise<Address> => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);

    const createdAddress = addressRepository.create({ ...data, account });
    await addressRepository.save(createdAddress);

    return createdAddress;
};
