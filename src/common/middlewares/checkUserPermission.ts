import type { Context, MiddlewareHandler, Next } from "hono";
import { errorResponse } from "../utils/api-response";
import { verify } from "hono/utils/jwt/jwt";
import tokenValidation from "../../features/authentication/validation/refreshToken-validation";
import { getUserById } from "../model/user-model";
import { getRoleById } from "../model/role-model";

export const checkUserPermission = (roles: string[]) => {
    return async (c: Context, next: Next) => {
        const authHeader = c.req.header("Authorization")
        if (!authHeader) {
            return c.json(
                errorResponse("No token provided"),
                401
            )
        }
        const token = authHeader.replace("Bearer ", "");
        try {
            const SECRET = process.env.X_SECRET;

            if (!SECRET) {
                return c.json(
                    errorResponse("Server tidak dapat memverifikasi token"),
                    500
                );
            }

            const decodedToken = await verify(token, SECRET);

            const parsedToken = tokenValidation.safeParse(decodedToken);

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

            const foundUser = await getUserById(id);
            console.log(foundUser);
            
            const foundRole = await getRoleById(foundUser.roleId!)
            console.log(foundRole);

            // ???

            await next()
        } catch (error: any) {

            if(error.name === "JwtTokenExpired"){
                return c.json(errorResponse("Token expired"), 401);
              }

            return c.json(errorResponse("Token tidak valid"), 401);
        }
    }
}


// export const checkUserPermission: MiddlewareHandler = async (c, next) => {
//     const authHeader = c.req.header("Authorization")
//     if (!authHeader) {
//         return c.json(
//             errorResponse("No token provided"),
//             401
//         )
//     }
//     const token = authHeader.replace("Bearer ", "");
//     try {
//         const SECRET = process.env.X_SECRET;

//         if (!SECRET) {
//             return c.json(
//                 errorResponse("Server tidak dapat memverifikasi token"),
//                 500
//             );
//         }

//         const decodedToken = await verify(token, SECRET);

//         const parsedToken = tokenValidation.safeParse(decodedToken);

//         if (!parsedToken.success) {
//             return c.json(
//                 errorResponse(
//                     "Token tidak valid: Struktur tidak sesuai",
//                     parsedToken.error.errors
//                 ),
//                 400
//             );
//         }

//         const { id, exp } = parsedToken.data;

//         console.log(`Destruct | id:${id} | exp:${exp}`);

//         await next()
//     } catch (error) {
//         return c.json(errorResponse("Token tidak valid"), 401);
//     }
// }