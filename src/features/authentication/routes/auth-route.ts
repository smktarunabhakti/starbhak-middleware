import { Hono } from "hono";
import loginController from '../controller/login-controller';

const authRoute = new Hono()

authRoute.route("/login", loginController)

export default authRoute