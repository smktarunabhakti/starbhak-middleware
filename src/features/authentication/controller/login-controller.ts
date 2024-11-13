import { Hono } from "hono";
import { login } from "../service/login-service";

const loginController = new Hono()

loginController.post("/", async (c) => {
    const {name, password} = await c.req.json()
    console.log(`Doing login with data: ${name}, ${password}`);

    const loginResult = await login(name, password)
    console.log(`Login result: ${loginResult}`);

    if (loginResult.success) {
        return c.json({
            message: "Login success"
        })
    } else {
        return c.json({
          message: "Login failed",
        });
    }
})

export default loginController