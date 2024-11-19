import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { UpdateService } from "../service/reset-password-service";

const ResetPass = new Hono();

ResetPass.post("/", async (c) => {
    try {
        const { email, passwordHash, name } = await c.req.json();

            const updateResult = UpdateService(email,passwordHash,name);
            
            if(!(await updateResult).success) {
                return c.json(errorResponse((await updateResult).message), 500);
            }

            return c.json(successResponse((await updateResult).message), 200);
    } catch (error) {
        console.error("Reset password error:", error);
        return c.json(errorResponse("Internal server error"), 500);
    }
})

export default ResetPass