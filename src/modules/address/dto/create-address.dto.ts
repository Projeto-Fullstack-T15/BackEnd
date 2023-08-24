import { IsString, } from "class-validator";

export class CreateAddressDto {
	@IsString()
	zip_code: string;

	@IsString()
	state: string;

	@IsString()
	city: string;

	@IsString()
	street: string;

	@IsString()
	number: string;

	@IsString()
	complement: string;
}
