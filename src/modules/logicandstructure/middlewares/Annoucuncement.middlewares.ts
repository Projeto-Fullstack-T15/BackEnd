import { NextFunction, Request, Response } from "express";
import { ZodTypeAny, object } from "zod";
export const verifyBodyValid =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const dataWithoutId = { ...req.body };
    delete dataWithoutId.id;

    try {
      const validateBody = schema.parse(dataWithoutId);
      req.body = validateBody;
      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
