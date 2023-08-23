import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { User } from "../../../../entity/User";
import Mailgen from "mailgen";
import { createTransport } from "nodemailer";
import * as jwt from "jsonwebtoken";
import { AppError } from "../../../../errors";

export const sendEmail = async (token: string, user: User) => {
  const mailGen = new Mailgen({
    theme: "default",
    product: {
      name: "Reset password",
      link: "http://localhost:8000/",
    },
  });
  const email = {
    body: {
      name: user.Name,
      intro: "Reset your password",
      action: {
        instructions:
          "Para que seja possível o reset de senha, por favor, clique no botão abaixo",
        button: {
          color: "#0099FF",
          text: "Reset your password",
          link: `http://localhost:8000/api/users/new-password/${token}`,
        },
      },
      outro: "Need Help? Please, send me a email",
    },
  };
  const emailBody = mailGen.generate(email);
  return emailBody;
};
export const sendEmailServices = async (email: string): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError(`User email not found`);
  }
  const tokenJwt: string | jwt.JwtPayload = jwt.sign(
    {
      user: user.ID,
      email: user.email,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "2d",
      subject: String(user.ID),
    }
  );

  const emailSend = await sendEmail(tokenJwt, user);
  const transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "reset password",
    html: emailSend,
  });
  return tokenJwt;
};
export const newUpdate = async (
  password: string,
  token: string
): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
  const oldUserData: User | null = await userRepository.findOneBy({
    email: decoded.email as any,
  });

  const newUserData: User = userRepository.create({
    ...oldUserData,
    Password: password,
  });
  await userRepository.save(newUserData);

  return newUserData;
};
