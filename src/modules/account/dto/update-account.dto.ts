import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto, CreateAccountRequest } from './create-account.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UpdateAddressDto } from 'src/modules/address/dto/update-address.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) { }
export class UpdateAccountRequest extends PartialType(CreateAccountDto) {
    @ValidateNested({ each: true })
    @Type(() => UpdateUserDto)
    user?: UpdateUserDto;

    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    address?: UpdateAddressDto;
}