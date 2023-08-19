import { AppDataSource } from "../../../../data-source";
import { AppError } from "../../../../errors";
import { compare, hash } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Repository } from "typeorm";
import { User } from "../../../../entity/User";
import { TloginRequest, TreturnLogin } from "../user.login.interface";
import format from "pg-format";
import { QueryResult } from "pg";

export const createLoginService = async (
  loginData: TloginRequest
): Promise<{ token: string; user: TreturnLogin }> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });
  console.log(user);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = loginData.password == user.Password;

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      user: user.ID,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "24h",
      subject: String(user.ID),
    }
  );

  const loggedInClient: TreturnLogin = {
    ID: user.ID,
    email: user.email,
  };

  return { token, user: loggedInClient };
};
