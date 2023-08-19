import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";

export const deleteUserService = async (id: number): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOneOrFail({
    where: { ID: id },
  });
  await userRepository.remove(user);

  return user;
};
