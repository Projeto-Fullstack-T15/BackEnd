import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";
import {
  UserInterface,
  userUpdateRequest,
  userUpdateResponse,
} from "./user.interfaces";
import {
  SchemaUpdateUserRequest,
  SchemaUpdateUserResponse,
} from "../user.schemas";
import { z } from "zod";
import { RequestError } from "../../../errors";
import { randomUUID } from "crypto";
import Mailgen from "mailgen";
import mailer, { createTransport } from "nodemailer";
import * as jwt from "jsonwebtoken";

export const deleteUserService = async (id: number): Promise<User> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOneOrFail({
    where: { ID: id },
  });
  await userRepository.remove(user);

  return user;
};

// export const updateUserService = async (
//   Data: userUpdateRequest,
//   id: number
// ): Promise<userUpdateResponse> => {
//
// const userRepository: Repository<User> = AppDataSource.getRepository(User);
//   const user: User | null = await contactRepository.findOne(id);
//   if (!user) {
//     throw new RequestError(404, `User with ID  not found`);
//   }

//   const qb = contactRepository.createQueryBuilder().update(User);

//   if (Data.Name !== undefined) {
//     qb.set({ Name: Data.Name });
//   }
//   if (Data.CPF !== undefined) {
//     qb.set({ CPF: Data.CPF });
//   }
//   if (Data.email !== undefined) {
//     qb.set({ email: Data.email });
//   }
//   if (Data.Phone !== undefined) {
//     qb.set({ Phone: Data.Phone });
//   }
//   if (Data.BirthDate !== undefined) {
//     qb.set({
//       BirthDate:
//         typeof Data.BirthDate === "string"
//           ? new Date(Data.BirthDate)
//           : Data.BirthDate,
//     });
//   }
//   if (Data.description !== undefined) {
//     qb.set({ Description: Data.description });
//   }
//   if (Data.Password !== undefined) {
//     qb.set({ Password: Data.Password });
//   }
//   if (Data.Description !== undefined) {
//     qb.set({ Description: Data.Description });
//   }
//   if (Data.announcements !== undefined) {
//     qb.set({ announcements: Data.announcements });
//   }

//   await qb.where("ID = :id", { id }).execute();

//   const updatedUser: User | undefined = await contactRepository.findOne(id);

//   if (!updatedUser) {
//     throw new RequestError(403, `Updated user not found`);
//   }

//   const returnContact: userUpdateResponse =
//     SchemaUpdateUserResponse.parse(updatedUser);

//   return returnContact;
// };\
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
    throw new RequestError(404, `User email not found`);
  }
  const tokenJwt: string | jwt.JwtPayload = jwt.sign(
    {
      user: user.ID,
      email: user.email,
    },
    String(process.env.SECRET_KEY!),
    {
      expiresIn: "24h",
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
