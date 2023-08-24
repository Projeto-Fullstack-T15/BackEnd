import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
	public abstract createNewUser(data: CreateUserDto, account_id: number): Promise<User>;
	public abstract getUserById(id: number): Promise<User>;
	public abstract updateUser(user: User, data: UpdateUserDto): Promise<User>;
	public abstract findUser(search: UpdateUserDto): Promise<User>;
}