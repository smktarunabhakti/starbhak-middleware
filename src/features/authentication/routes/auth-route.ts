import { Hono } from "hono";
import loginController from '../controller/login-controller';
import registerController from '../controller/register-controller';

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/register", registerController)

export default authRoute