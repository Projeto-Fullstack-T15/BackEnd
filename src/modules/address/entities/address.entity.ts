import { Exclude } from "class-transformer";

export class Address {
	readonly id: number;
	zip_code: string;
	state: string;
	city: string;
	street: string;
	number: string;
	complement: string;

	@Exclude()
	account_id: number;
}
