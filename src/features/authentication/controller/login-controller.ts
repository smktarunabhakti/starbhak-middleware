import { Hono } from "hono";
import { login } from "../service/login-service";
import type { JWTPayload } from "hono/utils/jwt/types";
import { sign } from "hono/jwt";

const loginController = new Hono()

loginController.post("/", async (c) => {
    try {
        const {name, password} = await c.req.json()

        if (!name || !password) {
            return c.json({
                message: "Name and password are required"
            }, 400)
        }

        const loginResult = login(name, password)

        const payload: JWTPayload = {
            name:name,
            exp: 300000
        }

        const secret: string | undefined = process.env.X_SECRET;

        if (!secret) {
            return c.json({
                message: "Secret key not set, cannot generate JWT token"
            })
        }

        const token = await sign(payload, secret)


        if (loginResult.success) {
            return await c.json({
                message: loginResult.message,
                token: token
            }, 200)
        }

        return c.json({
            message: loginResult.message
        })
    } catch (error) {
        return c.json({
            message: "Internal server error"
        }, 500)
    }
})

export default loginController