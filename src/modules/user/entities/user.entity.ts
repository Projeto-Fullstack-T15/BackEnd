import { Exclude } from "class-transformer";

export class User {
	readonly id: number;
	name: string;
	cpf: string;
	birthday: Date;
	description: string;

	@Exclude()
	account_id: number;
}