import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto, CreateAccountRequest } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) { }
export class UpdateAccountRequest extends PartialType(CreateAccountRequest) { }