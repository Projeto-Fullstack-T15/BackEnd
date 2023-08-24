import { CreateAddressDto } from "src/modules/address/dto/create-address.dto";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { AccountType } from "@prisma/client";
import { IsEmail, IsEnum, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateAccountDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;

	@IsPhoneNumber("BR")
	phone: string;

	@IsEnum(AccountType)
	account_type: AccountType;
}

export class CreateAccountRequest extends CreateAccountDto {
	@ValidateNested({ each: true })
	@Type(() => CreateUserDto)
	user: CreateUserDto;

	@ValidateNested({ each: true })
	@Type(() => CreateAddressDto)
	address: CreateAddressDto;
}