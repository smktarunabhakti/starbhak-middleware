import { Hono } from "hono";
import loginController from '../controller/login-controller';
import refreshTokenController from "../controller/refreshToken-controller";

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/refresh-token", refreshTokenController)

export default authRoute