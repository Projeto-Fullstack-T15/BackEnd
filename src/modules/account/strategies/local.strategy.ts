import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AccountService } from "../account.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AccountService) {
        super({
            usernameField: "email",
            passwordField: "password"
        });
    };

    public async validate(email: string, password: string) {
        const account = await this.authService.validateLogin(email, password);
        if (!account) {
            throw new UnauthorizedException("Invalid credentials")
        }

        return account;
    };
};