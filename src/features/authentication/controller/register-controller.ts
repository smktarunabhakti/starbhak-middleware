import { Hono } from "hono";
import { registerService } from "../service/register-service.ts";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { users } from "../../../db/migrations/users-table-schema.ts";
import { db } from "../../../db";
import { and, eq } from "drizzle-orm";

type BlankEnv = {}; // Replace with actual environment type if needed
type BlankSchema = {}; // Replace with actual schema type if needed

const registerController: Hono<BlankEnv, BlankSchema, "/"> = new Hono();

registerController.post("/", async (c) => {
    const { email, name, passwordHash } = await c.req.json();

    if (!email || !name ||!passwordHash) {
        return c.json(errorResponse("Email dan password dibutuhkan!"), 400);
    }

    const registerResult = await registerService(email, name, passwordHash);

    if (!registerResult.success) {
        return c.json(errorResponse(registerResult.message), 500);
    }

    return c.json(successResponse(registerResult.message), 200);
});

export default registerController;