import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './repositories/account.repository';
import { AccountPrismaRepository } from './repositories/account.prisma.repository';
import { AddressModule } from '../address/address.module';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [
		AccountController
	],
	providers: [
		PrismaService,
		AccountService,
		LocalStrategy,
		JwtStrategy,
		{
			provide: AccountRepository,
			useClass: AccountPrismaRepository
		}
	],
	imports: [
		AddressModule,
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY || "kenzie",
			signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || "24h" }
		})
	]
})
export class AccountModule { }
