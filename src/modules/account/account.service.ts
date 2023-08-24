import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './repositories/account.repository';
import { Account } from './entities/account.entity';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AccountService {
	constructor(
		private readonly repository: AccountRepository,
		private readonly jwtService: JwtService,
		private readonly emailService: EmailService
	) { }

	public async createNew(data: CreateAccountDto): Promise<Account> {
		const newAccount = await this.repository.createNewAccount(data);

		return plainToInstance(Account, newAccount);
	}

	public async getOneById(id: number): Promise<Account> {
		const findAccount = await this.repository.getAccountById(id);

		if (!findAccount) {
			throw new NotFoundException("Account not found");
		}

		return plainToInstance(Account, findAccount);
	}

	public async update(id: number, data: UpdateAccountDto): Promise<Account> {
		const findAccount = await this.getOneById(id);
		const updatedAccount = await this.repository.updateAccount(findAccount, data);

		return plainToInstance(Account, updatedAccount);
	}

	public async remove(id: number): Promise<Account> {
		const findAccount = await this.getOneById(id);
		await this.repository.deleteAccount(findAccount);

		return plainToInstance(Account, findAccount);
	}

	public async validate(data: UpdateAccountDto): Promise<void> {
		const { email, phone } = data;

		const emailAlreadyRegistered = email && await this.repository.findAccount({ email });
		if (emailAlreadyRegistered) {
			throw new ConflictException("Email is already registered");
		}

		const phoneAlreadyRegistered = phone && await this.repository.findAccount({ phone });
		if (phoneAlreadyRegistered) {
			throw new ConflictException("Phone is already registered");
		}

		return;
	}

	public async validateLogin(email: string, password: string) {
		const account = await this.repository.findAccount({ email });
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
		const account = await this.repository.findAccount({ email });
		const token = this.jwtService.sign({ email, isAnnouncer: account.account_type === "ANNOUNCER" }, { subject: String(account.id) });

		return token;
	}

	public async sendRecoveryEmail(email: string): Promise<boolean> {
		const findUser = await this.repository.findAccount({ email });
		if (!findUser) {
			throw new NotFoundException("Email isnt registered");
		}

		const token = this.jwtService.sign({ email });
		const recoveryLink = `${process.env.FRONTEND_RECOVER_URL}?token=${token}`;

		try {
			await this.emailService.sendMail(
				email,
				'Password Recovery',
				`Click on this link to reset your password: ${recoveryLink}`
			);

			return;
		} catch {
			throw new InternalServerErrorException("Failed to send en");
		}
	}

	public async resetPassword(token: string, newPassword: string) {
		try {
			const decoded = this.jwtService.verify(token);
			const email = decoded.email;

			const findUser = await this.repository.findAccount({ email });
			if (!findUser) {
				throw new Error();
			}

			await this.repository.updateAccount(findUser, { password: newPassword });

			return;
		} catch (error) {
			throw new UnauthorizedException("Invalid token");
		}
	}
}

