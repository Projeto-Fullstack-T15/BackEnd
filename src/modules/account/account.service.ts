import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repositories/account.repository';
import { Account } from './entities/account.entity';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/utils/mail/mail.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AccountService {
	constructor(
		private readonly db: AccountRepository,
		private readonly jwtService: JwtService,
		private readonly mailService: MailService
	) { }

	public async createNew(data: CreateAccountDto): Promise<Account> {
		const newAccount = await this.db.createNewAccount(data);

		return plainToInstance(Account, newAccount);
	}

	public async getOneById(id: number): Promise<Account> {
		const findAccount = await this.db.getAccountById(id);

		if (!findAccount) {
			throw new NotFoundException("Account not found");
		}

		return plainToInstance(Account, findAccount);
	}

	public async update(id: number, data: UpdateAccountDto): Promise<Account> {
		const findAccount = await this.getOneById(id);
		const updatedAccount = await this.db.updateAccount(findAccount, data);

		return plainToInstance(Account, updatedAccount);
	}

	public async remove(id: number): Promise<Account> {
		const findAccount = await this.getOneById(id);
		await this.db.deleteAccount(findAccount);

		return plainToInstance(Account, findAccount);
	}

	public async validate(data: UpdateAccountDto): Promise<void> {
		const { email, phone } = data;

		const emailAlreadyRegistered = email && await this.db.findAccount({ email });
		if (emailAlreadyRegistered) {
			throw new ConflictException("Email is already registered");
		}

		const phoneAlreadyRegistered = phone && await this.db.findAccount({ phone });
		if (phoneAlreadyRegistered) {
			throw new ConflictException("Phone is already registered");
		}

		return;
	}

	public async validateLogin(email: string, password: string) {
		const account = await this.db.findAccount({ email });
		if (!account) {
			throw new UnauthorizedException("Invalid credentials")
		}

		const passwordMatch = password === account.password;
		if (!passwordMatch) {
			throw new UnauthorizedException("Invalid credentials")
		}

		return plainToInstance(Account, account);
	}

	public async generateToken(email: string) {
		const account = await this.db.findAccount({ email });
		const token = this.jwtService.sign({ email, isAnnouncer: account.account_type === "ANNOUNCER" }, { subject: String(account.id) });

		return token;
	}

	public async sendEmailResetPassword(email: string) {
		const user = await this.db.findAccount({ email });

		if (!user) {
			throw new NotFoundException("Account not found");
		}

		const reset_token = randomUUID();

		await this.db.updateAccount(user, { reset_token });
		const { to, subject, text } = await this.mailService.resetPasswordTemplate(email, reset_token);
		await this.mailService.sendEmail(to, subject, text);
	}

	public async resetPassword(password: string, reset_token: string) {
		const user = await this.db.findAccount({ reset_token });

		if (!user) {
			throw new UnauthorizedException("Invalid token");
		}

		await this.db.updateAccount(user, { password, reset_token: null });
	}
}

