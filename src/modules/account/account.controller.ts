import { UserService } from './../user/user.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto/create-account.dto';
import { UpdateAccountRequest } from './dto/update-account.dto';
import { AddressService } from '../address/address.service';
import { LoginAccountDto } from './dto/login-account.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('api/accounts')
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly addressService: AddressService,
		private readonly userService: UserService
	) { }

	@Post()
	public async create(@Body() data: CreateAccountRequest) {
		const { user, address, ...account } = data;

		await this.userService.validate(user);

		const newAccount = await this.accountService.createNew(account);
		const newUser = await this.userService.createNew(user, newAccount.id);
		const newAddress = await this.addressService.createNew(address, newAccount.id);

		newAccount.user = newUser;
		newAccount.address = newAddress;

		return newAccount;
	}

	@Get(':id')
	public async findOne(@Param('id') id: string) {
		return this.accountService.getOneById(+id);
	}

	@Patch(':id')
	public async update(@Param('id') id: string, @Body() data: UpdateAccountRequest) {
		const { user, address, ...account } = data;

		if (!Object.keys(data).length) {
			throw new BadRequestException("Body shouldn't be empty")
		}

		if (user?.cpf) {
			await this.userService.validate(user);
		}

		if (account?.email || account?.phone) {
			await this.accountService.validate(account)
		}

		const updatedAccount = account && await this.accountService.update(+id, account);
		const updatedUser = user && await this.userService.update(updatedAccount.user.id, user);
		const updatedAddress = address && await this.addressService.update(updatedAccount.address.id, address);

		updatedAccount.user = updatedUser;
		updatedAccount.address = updatedAddress;

		return updatedAccount;
	}

	@Delete(':id')
	public async remove(@Param('id') id: string) {
		return this.accountService.remove(+id);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	public async login(@Body() data: LoginAccountDto) {
		const { email } = data;

		return await this.accountService.generateToken(email);
	}
}
