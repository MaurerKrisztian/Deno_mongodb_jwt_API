import {Router} from "https://deno.land/x/oak/mod.ts";
import {UserRepository} from "./db/user/UserRepository.ts";
import {UserController} from "./controllers/userController.ts";
import {ProfileController} from "./controllers/ProfileController.ts";
import {AuthController} from "./controllers/AuthController.ts";
import {TokenService} from "./services/auth/TokenService.ts";
import {TokenValidatorMiddleware} from "./middlewares/TokenValidatorMiddleware.ts";

//controllers
const userController = new UserController();
const profileController = new ProfileController();
const authController = new AuthController(new TokenService(), new UserRepository());

//middlewares
const validatorMiddleware = new TokenValidatorMiddleware();
const requiredRole = validatorMiddleware.validateToken;


const router = new Router();

// User routes
router
    .get("/", requiredRole(['admin']), async (context: any) => {
        context.response.body = "Api is working."
    })
    .get("/users", async (context) => {
        context.response = await userController.getAll(context);
    })
    .get("/users/:id", async (context) => {
        context.response = await userController.getById(context);
    })
    .post("/users", async (context) => {
        context.response = await userController.create(context);
    })
    .put("/users/:id", async (context) => {
        context.response = await userController.update(context);
    })
    .delete("/users", async (context) => {
        context.response = await userController.delete(context);
    })

// profile routes
router
    .get("/profile", async (context) => {
        context.response = await profileController.getAll(context);
    })
    .post("/profile", async (context) => {
        context.response = await profileController.create(context);
    })

//Authentication routes
router
    .post("/login", async (context) => {
        context.response = await authController.login(context);
    })


export default router;