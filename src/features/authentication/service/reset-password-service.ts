import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { resetPasswordSession } from "../../../db/schemas/reset-password-session-schema.ts";
import { users } from "../../../db/schemas/users-table-schema.ts";
import { errorResponse, successResponse } from "../../../common/utils/api-response.ts";
import { compareSync, hashSync } from "bcrypt";

export const resetPasswordService = async (email: string, token: string, newPass: string) => {
    const items = await db.select().from(resetPasswordSession).where(eq(resetPasswordSession.email, email))

    if (!items) {
        return {apiResponse: errorResponse("No request is founded please make a new request to change password"),  status: 422};
    }

    const item = items[0];

    if(!compareSync(token, item.token)){
        return {apiResponse: errorResponse("False otp please try again!"), status: 401};
    }

    await db.update(users).set({
        passwordHash: hashSync(newPass, 10),
    }).where(eq(users.email, email))

    return {apiResponse: successResponse("Update"),  status: 200};
    
}