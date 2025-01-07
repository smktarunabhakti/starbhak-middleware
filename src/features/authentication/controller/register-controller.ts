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
import { createTeacher } from "../../../common/model/teacher-model.ts";
import { addTeacher } from "../../master-data/service/teacher-service.ts";
import { teacher } from "../../../db/schemas/teacher-table-schema.ts";
import { parents } from "../../../db/schemas/parents-table-schema.ts";

type BlankEnv = {}; // Replace with actual environment type if needed
type BlankSchema = {}; // Replace with actual schema type if needed

const registerController: Hono<BlankEnv, BlankSchema, "/"> = new Hono();

registerController.post("/teacher", async (c) => {

    const { email, name, username, passwordHash, DoB, PoB, gender, teacherId } = await c.req.json();

    try {
        registerValidation.parse({
            email: email,
            password: passwordHash,
            name: username,
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

    const registerResult = await registerService(email, passwordHash, username, "Teacher");

    if (!registerResult.success) {
        return c.json(errorResponse(registerResult.message), 500);
    }

    await db.insert(teacher).values({
        email,
        name,
        teacher_id: teacherId,
        user_id: registerResult.data!.id,
        DoB,
        PoB,
        gender,
    })

    return c.json(successResponse(registerResult.message), 200);
});

registerController.post("/parent", async (c) => {

    const { email, name, username, passwordHash } = await c.req.json();

    try {
        registerValidation.parse({
            email: email,
            password: passwordHash,
            name: username,
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

    const registerResult = await registerService(email, passwordHash, username, "Teacher");

    if (!registerResult.success) {
        return c.json(errorResponse(registerResult.message), 500);
    }

    await db.insert(parents).values({
        email,
        name,
        user_id: registerResult.data!.id,
    })

    return c.json(successResponse(registerResult.message), 200);
});

registerController.post("/student", async (c) => {

    const { email, name, username, passwordHash, DoB, PoB, gender, teacherId } = await c.req.json();

    try {
        registerValidation.parse({
            email: email,
            password: passwordHash,
            name: username,
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

    const registerResult = await registerService(email, passwordHash, username, "Teacher");

    if (!registerResult.success) {
        return c.json(errorResponse(registerResult.message), 500);
    }

    await db.insert(teacher).values({
        email,
        name,
        teacher_id: teacherId,
        user_id: registerResult.data!.id,
        DoB,
        PoB,
        gender,
    })

    return c.json(successResponse(registerResult.message), 200);
});

export default registerController;