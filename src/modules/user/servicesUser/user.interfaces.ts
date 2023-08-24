import { z } from "zod";
import { SchemaUpdateUserRequest } from "./user.schemas";
import { DeepPartial } from "typeorm";

export type userRequest = z.infer<typeof SchemaUpdateUserRequest>;
export type userUpdateRequest = DeepPartial<userRequest>;
