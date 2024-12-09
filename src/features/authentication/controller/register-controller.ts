import { Hono } from "hono";
import { registerService } from "../service/register-service.ts";
import { users } from "../../../db/schemas/users-table-schema.ts";
import { db } from "../../../db";
import { and, eq } from "drizzle-orm";
import registerValidation from "../validation/register-validation";
import type { z } from "zod";
import {
    errorResponse,
    successResponse,
} from "../../../common/utils/api-response";

type BlankEnv = {}; // Replace with actual environment type if needed
type BlankSchema = {}; // Replace with actual schema type if needed

const registerController: Hono<BlankEnv, BlankSchema, "/"> = new Hono();

registerController.post("/", async (c) => {

    const { email, name, passwordHash } = await c.req.json();

    try {
        registerValidation.parse({
            email: email,
            password: passwordHash,
            name: name,
        });
    } catch (error) {
        return c.json(
            errorResponse(
                "Data tidak terdaftar!",
                (error as z.ZodError).errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                }))
            )
        );
    }

    const registerResult = await registerService(email, passwordHash, name);

    if (!registerResult.success) {
        return c.json(errorResponse(registerResult.message), 500);
    }

    return c.json(successResponse(registerResult.message), 200);
});

export default registerController;