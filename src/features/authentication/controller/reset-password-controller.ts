import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { resetPasswordService } from "../service/reset-password-service";
import type { StatusCode } from "hono/utils/http-status";

const resetPasswordController = new Hono();

resetPasswordController.post("/", async (c) => {
    try {
        const { email, token, newPass } = await c.req.json();

            const updateResult = await resetPasswordService(email, token, newPass)

            return c.json(updateResult.apiResponse, updateResult.status as StatusCode);
    } catch (error) {
        console.error("Reset password error:", error);
        return c.json(errorResponse("Internal server error"), 500);
    }
})

export default resetPasswordController