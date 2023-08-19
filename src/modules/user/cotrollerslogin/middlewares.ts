import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { Repository } from "typeorm";

import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";
import { AppError, RequestError } from "../../../errors";

export async function verifyIdMiddUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const id: number = parseInt(req.params.id);

  const user: User | null = await userRepository.findOne({
    where: { ID: id },
  });

  if (!user) {
    throw new RequestError(404, "User not found");
  }

  next();
}

export const verifyTokenValidMidd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;
  if (!token) {
    throw new RequestError(401, "Invalid credentials");
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new RequestError(401, "Invalid credentials");
    }

    res.locals = {
      decoded,
      ...res.locals,
    };
    return next();
  });
};

export const verifyUserLogging = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { decoded } = res.locals;
  const id = parseInt(req.params.id);

  if (parseInt(decoded.sub) !== id) {
    const error = new RequestError(403, "Access forbidden");
    return next(error);
  }
  return next();
};
