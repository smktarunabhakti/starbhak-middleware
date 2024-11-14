import { Hono } from "hono";
import { loginService } from "../service/login-service";
import type { JWTPayload } from "hono/utils/jwt/types";
import { jwt, sign } from "hono/jwt";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
const loginController = new Hono();

loginController.post("/", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json(errorResponse("Email dan password dibutuhkan!"), 400);
  }

  const loginResult = await loginService(email, password);

  if (!process.env.X_SECRET) {
    return c.json(errorResponse("Tidak bisa membuat token JWT"), 500);
  }

  const token = await sign(
    {
      email: email,
      exp: 5000,
    } as JWTPayload,
    process.env.X_SECRET
  );

  if (!loginResult.success) {
    return c.json(
        errorResponse(loginResult.message),
        500
    )
  }

  return c.json(successResponse(loginResult.message), 200);
});

export default loginController;
