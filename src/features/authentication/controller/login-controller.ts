import { Hono } from "hono";
import { loginService } from "../service/login-service";
import type { JWTPayload } from "hono/utils/jwt/types";
import { jwt, sign } from "hono/jwt";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { getUserByEmail, updateUser } from "../../../common/model/user-model";
import loginValidation from "../validation/login-validation";
import type { z } from "zod";
const loginController = new Hono();

loginController.post("/", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json(errorResponse("Email dan password dibutuhkan!"), 400);
  }

  try {
    loginValidation.parse({
      email: email,
      password: password,
    });
  } catch (error) {
    return c.json(
      errorResponse(
        "Email atau password tidak valid!",
        (error as z.ZodError).errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        }))
      )
    );
  }

  const loginResult = await loginService(email, password);

  if (!process.env.X_SECRET) {
    return c.json(errorResponse("Tidak bisa membuat token JWT"), 500);
  }

  if (!loginResult.success) {
    return c.json(errorResponse(loginResult.message), 500);
  }

  const { id } = await getUserByEmail(email);
  const exp = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60 * 1000) / 1000;

  const token = await sign(
    {
      id: id,
      exp: exp,
    } as JWTPayload,
    process.env.X_SECRET
  );

  if (!id) {
    return c.json(errorResponse("Tidak bisa menemukan id"), 500);
  }

  await updateUser(id, {
    lastLoginAt: new Date(),
    refreshTokenHash: token,
    updatedAt: new Date(),
  });

  return c.json(successResponse(loginResult.message, { token: token }), 200);
});

export default loginController;
