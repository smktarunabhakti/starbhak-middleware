import { Hono } from "hono";
import refreshTokenController from "../controller/refreshToken-controller";
import loginController from '../controller/login-controller';
import registerController from '../controller/register-controller';
import logoutController from "../controller/logout-controller";
import ResetPass from "../controller/reset-password-controller";
import kodeOtp from "../controller/kode-otp-controller";

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/logout", logoutController)
authRoute.route("/refresh-token", refreshTokenController)
authRoute.route("/register", registerController)
authRoute.route("/reset-password", ResetPass)
authRoute.route("/kode-otp", kodeOtp)

export default authRoute