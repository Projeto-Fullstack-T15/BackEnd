import { z } from "zod";
import { CreateAddressSchema } from "./address.schemas";

export type CreateAddressRequest = z.infer<typeof CreateAddressSchema>;