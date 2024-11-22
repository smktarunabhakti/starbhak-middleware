import { Hono } from "hono";
import refreshTokenController from "../controller/refreshToken-controller";
import loginController from '../controller/login-controller';
import registerController from '../controller/register-controller';

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/refresh-token", refreshTokenController)
authRoute.route("/register", registerController)

export default authRoute