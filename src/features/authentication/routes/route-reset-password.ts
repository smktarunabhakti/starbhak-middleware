import { Hono } from "hono";
import resetPassController from "../controller/reset-password-controller";

const authRoute = new Hono();

authRoute.route('/reset-password', resetPassController);

export default authRoute