import { Hono } from "hono";
import { resetPassword } from "../service/reset-password-service";
import { getById } from "../model/user-model";

const resetPassController = new Hono();

resetPassController.post("/", async (c) => {
    try{
        const {id,name,password} = await c.req.json();

        if(id === null) {
            return c.json({
                message: "Tidak dapat di update",
            }, 400)
        }

        const resultUpdate = resetPassword(id,name,password);

        if(resultUpdate.success) {
            return await c.json({
                message: resultUpdate.message,
            }, 200)
        }



    }
    catch(error) {
        return c.json({
            message: "Internal server error"
        }, 500)
    }
})

export default resetPassController;