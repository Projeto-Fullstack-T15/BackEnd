import { AccountType } from "@prisma/client";
import { Exclude } from "class-transformer";
import { Address } from "src/modules/address/entities/address.entity";
import { User } from "src/modules/user/entities/user.entity";

export class Account {
	readonly id: number;
	email: string;

	@Exclude()
	password: string;

	@Exclude()
	reset_token: string;

	phone: string;
	account_type: AccountType;
	address: Address;
	user: User;
	created_at: Date;
	last_updated_at: Date;
}