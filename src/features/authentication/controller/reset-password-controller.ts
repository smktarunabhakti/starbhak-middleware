import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { resetPasswordService } from "../service/reset-password-service";
import type { StatusCode } from "hono/utils/http-status";
import type { JWTPayload } from "hono/utils/jwt/types";
import { verify } from "hono/jwt";
import { getUserById } from "../../../common/model/user-model";
import { compareSync, hashSync } from "bcrypt";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { eq } from "drizzle-orm";

const resetPasswordController = new Hono();

resetPasswordController.post("/", async (c) => {
  try {
    const { email, token, newPass } = await c.req.json();

    const updateResult = await resetPasswordService(email, token, newPass);

    return c.json(updateResult.apiResponse, updateResult.status as StatusCode);
  } catch (error) {
    console.error("Reset password error:", error);
    return c.json(errorResponse("Internal server error"), 500);
  }
});

resetPasswordController.post("/very-first-time", async (c) => {
    try {
        const body = await c.req.json();
        console.log("[attendancePermittance Controller] body: ", body);

        if (!body.old_password || !body.new_password) {
          return c.json(errorResponse("Password Baru dan Password Lama Tidak Boleh Kosong!"), 400);
        }
    
        if (body.old_password != "12345678") {
          return c.json(errorResponse("Password Lama Bukan Default."), 400);
        }
    
        if (body.old_password == body.new_password) {
          return c.json(
            errorResponse("Password Lama dan Baru Tak Boleh Sama!"),
            400
          );
        }
    
        const token = c.req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
          return c.json(errorResponse("Required token!"), 400);
        }
    
        const _secret = process.env.X_SECRET;
    
        if (!_secret) {
          return c.json(
            errorResponse("Server tidak dapat memverifikasi token!"),
            500
          );
        }
    
        const decodedToken: JWTPayload = await verify(token, _secret);
    
        const { id } = decodedToken;
    
        var rules = [
          {
            exp: /[0-9]/,
            msg: "Password Harus Mengandung Angka Minimal 1",
          },
          {
            exp: /[a-z]/,
            msg: "Password Harus Mengandung Huruf Kecil Minimal 1",
          },
          {
            exp: /[A-Z]/,
            msg: "Password Harus Mengandung Huruf Besar Minimal 1",
          },
          {
            exp: /^.{8,20}$/,
            msg: "Password Harus 8-20 Karakter",
          },
          {
            exp: /^(?!.* )/,
            msg: "Password Tidak Boleh Mengandung Spasi",
          },
        ];
    
        let pass = true;
        let errMsg = ""
    
        for (let i = 0; i < rules.length; i++) {
          let rule = rules[i];
          if (!rule.exp.test(body.new_password)) {
            pass = false;
            errMsg = rule.msg;
            break;
          }
        }
    
        if (!pass) {
          return c.json(
            errorResponse(errMsg),
            400
          );
        }
    
        let user = await getUserById(id as string);
    
        if (!user) {
            return c.json(errorResponse("User tidak ditemukan"), 400);
        }
    
        if (!compareSync(body.old_password, user.passwordHash as string)) {
            return c.json(
                errorResponse("Password Lama Salah!"),
                400
            );
        }  
    
        let newPass = hashSync(body.new_password, 10);
    
        await db.update(users).set({passwordHash: newPass}).where(eq(users.id, id as string));
    
        return c.json(
          successResponse("Berhasil mengubah password"),
          200
        );
      } catch (error: any) {

        if (error.name === "JwtTokenExpired") {
          return c.json(errorResponse("Token expired"), 401);
        }
    

        return c.json(
            errorResponse("Unknown error occurred !", error!),
            400
          );
      }
});

export default resetPasswordController;