import {Application} from "https://deno.land/x/oak/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import {config} from "https://deno.land/x/dotenv/mod.ts";
import router from "./router.ts"

config({safe: true})
const PORT = 3000;

const app = new Application();

//logger
app.use(async (ctx, next) => {
    await next();
    const ct = ctx.request.headers.get("content-type");
    const token = ctx.request.headers.get("Authorization")
    console.log(`${ctx.request.method} ${ctx.request.url} - content-type: ${ct} - token: ${(token) ? "true" : "false"}`);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = {msg: 'Something went wrong'}
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: PORT});