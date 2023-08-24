import { IsString, MaxLength, MinLength, IsDateString } from "class-validator";
import { IsCPF } from "../validators/cpf.validator";

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	@MaxLength(30)
	name: string;

	@IsCPF()
	cpf: string;

	@IsDateString()
	birthday: Date;

	@IsString()
	@MaxLength(300)
	description: string;
}