import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/address.repository';
import { Address } from './entities/address.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressService {
	constructor(
		private readonly repository: AddressRepository
	) { }

	public async createNew(data: CreateAddressDto, account_id: number): Promise<Address> {
		const newAddress = await this.repository.createNewAddress(data, account_id);

		return plainToInstance(Address, newAddress);
	}

	public async getOneById(id: number): Promise<Address> {
		const findAddress = await this.repository.getAddressById(id);

		if (!findAddress) {
			throw new NotFoundException("Address not found");
		}

		return plainToInstance(Address, findAddress);
	}

	public async update(id: number, data: UpdateAddressDto): Promise<Address> {
		const findAddress = await this.getOneById(id);
		const updatedAddress = await this.repository.updateAddress(findAddress, data);

		return plainToInstance(Address, updatedAddress);
	}
}
