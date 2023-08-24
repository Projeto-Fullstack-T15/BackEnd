import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressRepository } from './repositories/address.repository';
import { AddressPrismaRepository } from './repositories/address.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
	providers: [
		AddressService,
		PrismaService,
		{
			provide: AddressRepository,
			useClass: AddressPrismaRepository
		}
	],
	exports: [AddressService]
})
export class AddressModule { }
