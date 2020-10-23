import {validateJwt} from "https://deno.land/x/djwt/validate.ts";
import {makeJwt, setExpiration, Jose, Payload} from "https://deno.land/x/djwt/create.ts";

export class TokenService {
    static ALGORITHM: any = "HS256";
    static KEY: string = (Deno.env.get('JWT_ACCES_TOKEN_SECRET') || "your-secret")

    constructor() {
    }

    async createToken(exp: number, data: any) {
        const payload: Payload = {
            ...data,
            exp: setExpiration(exp),
        };

        const header: Jose = {
            alg: "HS256",
            typ: "JWT",
        };
        const token = (await makeJwt({header, payload, key: TokenService.KEY}));

        return token;
    }

    static async isValidToken(jwt: string) {
        const isValid = (await validateJwt({jwt, key: TokenService.KEY, algorithm: TokenService.ALGORITHM})).isValid
        return isValid;
    }

    static async getTokenData(jwt: string) {
        if (!jwt) return;
        const data = (await validateJwt({jwt, key: TokenService.KEY, algorithm: TokenService.ALGORITHM}))
        return data;
    }

}