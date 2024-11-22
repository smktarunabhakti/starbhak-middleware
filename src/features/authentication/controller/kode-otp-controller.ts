import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { otpService } from "../service/kode-otp-service";
import { getUserByEmail } from "../../../common/model/user-model";
const kodeOtp = new Hono();
const otpStore = new Map<string, { code: string;}>();

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

kodeOtp.post("/", async (c) => {
    try{
        const { email } = await c.req.json();

        const user = await getUserByEmail(email);

        if (!user) {
            return c.json(errorResponse("User not found"), 404);
        }

        const otp = generateOTP();

        const codeOtpResult = await otpService(email,'Starbhak-OTP',`
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

export default kodeOtp