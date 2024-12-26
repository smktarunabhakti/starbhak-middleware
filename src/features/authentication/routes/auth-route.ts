import { Hono } from "hono";
import refreshTokenController from "../controller/refreshToken-controller";
import loginController from '../controller/login-controller';
import registerController from '../controller/register-controller';
import logoutController from "../controller/logout-controller";
import resetPasswordController from "../controller/reset-password-controller";
import kodeOtpController from "../controller/kode-otp-controller";

const authRoute = new Hono()

authRoute.route("/login", loginController)
authRoute.route("/logout", logoutController)
authRoute.route("/refresh-token", refreshTokenController)
authRoute.route("/register", registerController)
authRoute.route("/reset-password", resetPasswordController)
authRoute.route("/kode-otp", kodeOtpController)

export default authRoute