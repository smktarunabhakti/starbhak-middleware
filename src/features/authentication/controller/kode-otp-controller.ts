import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { confirmOtpService, generateOTP } from "../service/kode-otp-service";
import { getUserByEmail } from "../../../common/model/user-model";
import { sendEmail } from "../../../common/utils/email-service";
import { ConsoleLogWriter } from "drizzle-orm";


const otpController = new Hono();

otpController.post("/", async (c) => {
    try{
        const { email } = await c.req.json();

        const user = await getUserByEmail(email);

        if (!user) {
            return c.json(errorResponse("User not found"), 404);
        }

        const otp = await generateOTP(email);  

        const codeOtpResult = await sendEmail(email,'Starbhak-OTP',`
            <h2>Reset Password Verification</h2>
            <p>Your OTP Code is: <strong>${otp}</strong></p>
            <p>If you didn't request this, please ignore this email.</p>   
        `);
        
        return c.json(successResponse("OTP sent successfully"), 200);

    } catch (error) {
        console.error("Send OTP error:", error);
        return c.json(errorResponse("Failed to send OTP"), 500);
    }
})

otpController.post("/confirm", async (c) => {
    try {
        const { email, otp } = await c.req.json();

        console.log("Confirm OTP:", email, otp);

        const confirmRes = await confirmOtpService(email, otp);

        return c.json(confirmRes.apiResponse, confirmRes.status);
    } catch (error) {
        console.error("Failed OTP error:", error);
        return c.json(errorResponse("Failed to Confirm OTP"), 500);
    }
})

export default otpController