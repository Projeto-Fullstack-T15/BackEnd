import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppError } from "../errors";
import { User } from "../entity/User";

const ensureEmailWontRepeat = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userRepository = getRepository(User);

    const userWithEmail = await userRepository.findOne({
        where: {
            email: req.body.email
        }
    });

    if (userWithEmail) {
        throw new AppError("O e-mail já foi cadastrado", 409);
    }

    next();
};

export { ensureEmailWontRepeat };
