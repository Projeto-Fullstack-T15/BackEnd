import { UserService } from './../user/user.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req, ForbiddenException, HttpCode } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountRequest } from './dto/create-account.dto';
import { UpdateAccountRequest } from './dto/update-account.dto';
import { AddressService } from '../address/address.service';
import { LoginAccountDto } from './dto/login-account.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RecoverAccountDto, SendRecoverEmailDto } from './dto/recover-account.dto';

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
	@UseGuards(JwtAuthGuard)
	public async findOne(@Req() req: any, @Param('id') id: string) {
		const tokenContainThisId: boolean = req.user.id === +id;

		if (!tokenContainThisId) {
			throw new ForbiddenException("Invalid token for this user")
		}

		return await this.accountService.getOneById(+id);
	}

	@Patch(':id')
	@UseGuards(JwtAuthGuard)
	public async update(@Param('id') id: string, @Body() data: UpdateAccountRequest) {
		const { user, address, ...account } = data;

		if (!Object.keys(data).length) {
			throw new BadRequestException("Body shouldn't be empty")
		}

		if (user?.cpf) {
			await this.userService.validate({ cpf: user.cpf });
		}

		if (account?.email || account?.phone) {
			await this.accountService.validate(account)
		}

		const updatedAccount = account && await this.accountService.update(+id, account);
		const updatedUser = user && await this.userService.update(+id, user);
		const updatedAddress = address && await this.addressService.update(+id, address);

		updatedAccount.user = updatedUser;
		updatedAccount.address = updatedAddress;

		return updatedAccount;
	}

	@Delete(':id')
	@UseGuards(JwtAuthGuard)
	public async remove(@Req() req: any, @Param('id') id: string) {
		const tokenContainThisId: boolean = req.user.id === +id;

		if (!tokenContainThisId) {
			throw new ForbiddenException("Invalid token for this user")
		}

		return await this.accountService.remove(+id);
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	public async login(@Body() data: LoginAccountDto) {
		const { email } = data;
		const token = await this.accountService.generateToken(email);

		return { token };
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	public async getOneByToken(@Req() req: any) {
		return await this.accountService.getOneById(req.user.id);
	}

	@HttpCode(200)
	@Post('reset-password')
	public async sendEmailResetPassword(
		@Body() data: SendRecoverEmailDto
	) {
		await this.accountService.sendEmailResetPassword(data.email);

		return { message: 'Reset token has been successfuly sent' };
	}

	@Patch('reset-password/:token')
	public async resetPassword(
		@Param('token') token: string,
		@Body() data: RecoverAccountDto
	) {
		await this.accountService.resetPassword(data.password, token);

		return { message: 'Password was successfuly reset' };
	}
}
