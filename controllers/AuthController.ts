import {TokenService} from "../services/auth/TokenService.ts";
import {UserRepository} from "../db/user/UserRepository.ts";

export class AuthController {

    static EXP: number = 30000;

    constructor(private readonly tokenService: TokenService, private readonly userRepository: UserRepository) {
    }

    async login(ctx: any) {
        const body = await ctx.request.body().value;

        if (!body.email || !body.password) {
            ctx.response.body = "emali / password missing.";
            return ctx.response;
        }
        const user: any = await this.userRepository.findByEmail(body.email);
        if (user === undefined || user === null) {
            ctx.response.body = "wrong email / password";
            return ctx.response;
        }
        if (user.email == body.email && user.password == body.password) {
            const token = await this.tokenService.createToken(AuthController.EXP, {userId: user._id.$oid})
            ctx.response.body = {token: token};
            return ctx.response
        }
        ctx.response.body = "wrong email / password"
        return ctx.response
    }
}