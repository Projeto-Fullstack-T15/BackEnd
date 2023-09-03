import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RecoverAccountDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    password: string;
};

export class SendRecoverEmailDto {
    @IsEmail()
    email: string;
}