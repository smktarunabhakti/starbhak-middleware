import { Hono } from "hono";
import { loginService } from "../service/login-service";
import type { JWTPayload } from "hono/utils/jwt/types";
import { jwt, sign } from "hono/jwt";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { getUserByEmail } from "../../../common/model/user-model";
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

  return c.json(successResponse(loginResult.message), 200);
});

export default loginController;
