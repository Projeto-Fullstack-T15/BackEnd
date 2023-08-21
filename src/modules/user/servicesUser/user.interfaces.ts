import { z } from "zod";
import {
  SchemaUpdateUserRequest,
  SchemaUpdateUserResponse,
} from "../../user/user.schemas";
import { DeepPartial } from "typeorm";
import { Announcement } from "../../announcement/announcement";

export type userUpdateResponse = z.infer<typeof SchemaUpdateUserResponse>;
export type userRequest = z.infer<typeof SchemaUpdateUserRequest>;
export type userUpdateRequest = DeepPartial<userRequest>;
export interface UserInterface {
  Name?: string;
  CPF?: string;
  email?: string;
  Phone?: string;
  BirthDate?: string | Date | undefined | Number;
  Description?: string;
  ID?: number | string;
  Password?: string;
  announcements?: Announcement[];
}
