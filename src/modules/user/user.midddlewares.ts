import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";

export const verifyTokenValidMidd = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError("Invalid credentials", 401);
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    res.locals = {
      decoded,
      ...res.locals,
    };
    return next();
  });
};
