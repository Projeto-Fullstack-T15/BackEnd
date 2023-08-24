import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository
    ) { }

    public async createNew(data: CreateUserDto, account_id: number): Promise<User> {
        const newUser = await this.repository.createNewUser(data, account_id);

        return plainToInstance(User, newUser);
    }

    public async update(account_id: number, data: UpdateUserDto): Promise<User> {
        const updatedUser = await this.repository.updateUser(account_id, data);

        return plainToInstance(User, updatedUser);
    }

    public async validate(data: { cpf: string }): Promise<void> {
        const { cpf } = data;
        const cpfAlreadyRegistered = await this.repository.findUser({ cpf });

        if (cpfAlreadyRegistered) {
            throw new ConflictException("CPF is already registered");
        }

        return;
    }
}
