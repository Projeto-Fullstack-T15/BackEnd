import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/user.prisma.repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
	providers: [
		UserService,
		PrismaService,
		{
			provide: UserRepository,
			useClass: UserPrismaRepository
		}
	],
	exports: [UserService]
})
export class UserModule { }
