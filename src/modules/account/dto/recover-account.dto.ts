import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RecoverAccountDto {
    @IsString()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    newPassword: string;
};

export class SendRecoverEmailDto {
    @IsEmail()
    email: string;
}