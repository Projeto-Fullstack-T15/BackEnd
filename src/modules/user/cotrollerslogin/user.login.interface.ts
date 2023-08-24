import { z } from "zod";
import {
  createLoginSchema,
  createTokenResponseSchema,
  loggedInClient,
} from "./user.schemas.login";
type TloginRequest = z.infer<typeof createLoginSchema>;
type TreturnLogin = z.infer<typeof loggedInClient>;
type TtokenLoginResponse = z.infer<typeof createTokenResponseSchema>;
export { TloginRequest, TtokenLoginResponse, TreturnLogin };
