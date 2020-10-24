import {TokenService} from "../services/auth/TokenService.ts"
import {UserRepository} from "../db/user/UserRepository.ts";


export class TokenValidatorMiddleware {

    constructor() {
    }

    validateToken = function (roles: string[]) {
        return async (ctx: any, next: any) => {
            const token = ctx.request.headers.get("token");
            const tokenData: any = await TokenService.getTokenData(token);
            if (!tokenData?.isValid) {
                ctx.response.body = {message: "access denied."};
                return ctx.response;
            }
            const userId = tokenData.payload.userId;
            const userRepo = new UserRepository();
            const user: any = await userRepo.findById(userId);
            for (let role of roles) {
                if (!user.roles.includes(role)) {
                    ctx.response.body = {message: "access denied."};
                    return ctx.response;
                }
            }
            next();
        }
    }

}