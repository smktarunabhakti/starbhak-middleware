import { Hono } from "hono";
import { verify, sign } from "hono/jwt";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import {
  getUserByEmail,
  getUserById,
  updateUser,
} from "../../../common/model/user-model";
import type { JWTPayload } from "hono/utils/jwt/types";
import type { User } from "../../../common/interfaces/user-interface";
import { z } from "zod";
import tokenValidation from "../validation/refreshToken-validation";

const refreshTokenController = new Hono();

refreshTokenController.post("/", async (c) => {
  const oldToken = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!oldToken) {
    return c.json(errorResponse("Token diperlukan!"), 400);
  }

  try {
    const SECRET = process.env.X_SECRET;

    if (!SECRET) {
      return c.json(
        errorResponse("Server tidak dapat memverifikasi token"),
        500
      );
    }

    const decoded: unknown = await verify(oldToken, SECRET);

    const parsedToken = tokenValidation.safeParse(decoded);
    if (!parsedToken.success) {
      return c.json(
        errorResponse(
          "Token tidak valid: Struktur tidak sesuai",
          parsedToken.error.errors
        ),
        400
      );
    }

    const { id, exp } = parsedToken.data;

    const user: User = await getUserById(id);
    if (!user) {
      return c.json(errorResponse("User tidak ditemukan"), 404);
    }

    const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime - exp > ONE_WEEK_IN_SECONDS) {
      return c.json(
        errorResponse(
          "Token kedaluwarsa lebih dari 1 minggu, login ulang diperlukan"
        ),
        401
      );
    }

    const newExp = currentTime + ONE_WEEK_IN_SECONDS;
    const newToken = await sign(
      {
        id: id,
        exp: newExp,
      } as JWTPayload,
      SECRET
    );

    await updateUser(id, {
      refreshTokenHash: newToken,
      updatedAt: new Date(),
    });

    return c.json(
      successResponse("Token berhasil diperbarui", { token: newToken }),
      200
    );
  } catch (error) {
    return c.json(errorResponse("Token tidak valid"), 401);
  }
});

export default refreshTokenController;
