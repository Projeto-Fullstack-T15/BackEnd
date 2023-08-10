import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = this.constructor.name; // Define o nome da classe como o nome do erro
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // Mantém o protótipo correto da classe
  }
}
const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }
  console.log(err);
  return res.status(500).json({
    message: "Internal server error",
  });
};
export { AppError, handleErrors };

// function saveErrorOnLog(json: Object) {
//   const errorDate = new Date().toISOString();
//   const filePath = path.join(
//     __dirname,
//     `localFiles`,
//     `errors`,
//     `error_${errorDate}.json`
//   );

//   writeFileSync(filePath, JSON.stringify(json));
// }
