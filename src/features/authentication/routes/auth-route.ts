import { Hono } from "hono";
import refreshTokenController from "../controller/refreshToken-controller";
import loginController from "../controller/login-controller";
import registerController from "../controller/register-controller";
import logoutController from "../controller/logout-controller";
import ResetPass from "../controller/reset-password-controller";
import kodeOtp from "../controller/kode-otp-controller";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import { z } from "zod";
import { fetchUserById } from "../../master-data/service/user-service";
import type { User } from "../../../common/interfaces/user-interface";
import { db } from "../../../db";
import { userRoles } from "../../../db/schemas/user-roles-table-schema";
import { eq, name } from "drizzle-orm";
import { roles } from "../../../db/schemas/roles-table-schema";
import { teacher } from "../../../db/schemas/teacher-table-schema";
import { parents } from "../../../db/schemas/parents-table-schema";
import { student } from "../../../db/schemas/students-table-schema";

const authRoute = new Hono();

authRoute.route("/login", loginController);
authRoute.route("/logout", logoutController);
authRoute.route("/refresh-token", refreshTokenController);
authRoute.route("/register", registerController);
authRoute.route("/reset-password", ResetPass);
authRoute.route("/kode-otp", kodeOtp);

//Additional route here
authRoute.get("/self", async (c) => {
  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json(errorResponse("Required token!"), 400);
  }

  try {
    const _secret = process.env.X_SECRET;

    if (!_secret) {
      return c.json(
        errorResponse("Server tidak dapat memverifikasi token!"),
        500
      );
    }

    const decodedToken: JWTPayload = await verify(token, _secret);

    const { id } = decodedToken;

    const { data } = await fetchUserById(id as string);

    if (!data) {
      return c.json(errorResponse("User tidak ditemukan"), 404);
    }

    const currentUserRoles: object[] = [];
    const currentUserProfiles: object[] = [];

    const { passwordHash, refreshTokenHash, ...restUser } = data as User;
    const userRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, restUser.id as string));

    for (const ur of userRole) {
      const roleInfo = await db
        .select()
        .from(roles)
        .where(eq(roles.id, ur.roleId as string));

      for (const ri of roleInfo) {
        currentUserRoles.push({
          id: ri.id,
          name: ri.name,
        });

        if (ri.name == "Teacher") {
          console.log(`Found as Teacher, userID: ${restUser.id}`);
          const foundUser = await db
            .select()
            .from(teacher)
            .where(eq(teacher.user_id, restUser.id as string))
            .limit(1);
          console.log(foundUser);
          if (foundUser.length > 0) currentUserProfiles.push(foundUser[0]);
        }

        if (ri.name == "Parent") {
          console.log(`Found as Parent, userID: ${restUser.id}`);
          const foundUser = await db
            .select()
            .from(parents)
            .where(eq(parents.user_id, restUser.id as string))
            .limit(1);
          console.log(foundUser);
          if (foundUser.length > 0) currentUserProfiles.push(foundUser[0]);
        }

        if (ri.name == "Student") {
          console.log(`Found as Student, userID: ${restUser.id}`);
          const foundUser = await db
            .select()
            .from(student)
            .where(eq(student.user_id, restUser.id as string))
            .limit(1);
          console.log(foundUser);
          if (foundUser.length > 0) currentUserProfiles.push(foundUser[0]);
        }
      }
    }

    const finalResult: object = {
      ...restUser,
      profiles: currentUserProfiles,
      roles: currentUserRoles,
    };

    return c.json(successResponse("Success find self data", finalResult), 200);
  } catch (error) {
    return c.json(errorResponse("Failed find self data"), 500);
  }
});

export default authRoute;
