import { Hono } from "hono";
import loginController from '../controller/login-controller';
import registerController from '../controller/register-controller';
import logoutController from "../controller/logout-controller";

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/register", registerController)
authRoute.route("/logout", logoutController)

export default authRoute