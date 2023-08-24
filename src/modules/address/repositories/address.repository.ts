import { UpdateAddressDto } from './../dto/update-address.dto';
import { CreateAddressDto } from "../dto/create-address.dto";
import { Address } from '@prisma/client';

export abstract class AddressRepository {
    public abstract createNewAddress(data: CreateAddressDto, account_id: number): Promise<Address>;
    public abstract getAddressById(id: number): Promise<Address>;
    public abstract updateAddress(account_id: number, data: UpdateAddressDto): Promise<Address>;
}