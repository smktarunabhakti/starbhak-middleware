import * as crypto from "node:crypto";
import byc, { compareSync } from "bcrypt";
import { db } from '../../../db';
import { resetPasswordSession } from '../../../db/schemas/reset-password-session-schema';
import { asc, desc, eq } from "drizzle-orm";
import { errorResponse, successResponse, type apiResponse } from "../../../common/utils/api-response";
import type { StatusCode } from "hono/utils/http-status";

export async function generateOTP(email: string) {

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    //generate token
    const token = crypto.randomBytes(128).toString("hex");

    const hashedToken = byc.hashSync(token, 10)
    const hashedOtp = byc.hashSync(`${otp}`, 10)

    const now = new Date();

    // store email and token with otp to db
    await db.insert(resetPasswordSession).values({
        email: email,
        expire_at: new Date(now.getTime() + 7 * 60 * 1000),
        otp: hashedOtp,
        token: hashedToken,
    })

    return otp
}


export const confirmOtpService = async (email:string, otp: string): Promise<{apiResponse: apiResponse, status: StatusCode }> => {
    const items = await db.select().from(resetPasswordSession).where(eq(resetPasswordSession.email, email)).orderBy(desc(resetPasswordSession.id));

    if (!items) {
        return {apiResponse: errorResponse("No request is founded please make a new request to change password"),  status: 422};
    }

    const item = items[0];

    if(!compareSync(`${otp}`, item.otp)){
        return {apiResponse: errorResponse("False otp please try again!"), status: 401};
    }

    const now = new Date();

    if (item.expire_at.getTime() < now.getTime()){
        return {apiResponse: errorResponse("Otp Expired!"), status: 410};
    };

    //generate token
    const token = crypto.randomBytes(128).toString("hex");

    const hashedToken = byc.hashSync(token, 10)

    await db.update(resetPasswordSession).set({
        token: hashedToken,
        expire_at: new Date(now.getTime() + 7 * 60 * 1000),
    }).where(eq(resetPasswordSession.email, email))

    return {apiResponse: successResponse("Success to confirm that you are in fact real! (probably)", { token }), status: 200};
}