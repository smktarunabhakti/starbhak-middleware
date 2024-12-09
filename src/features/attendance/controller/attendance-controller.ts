import { Hono } from "hono";
import clockInService from "../service/clock-in-service";

const attendanceController = new Hono();

attendanceController.post("/check-in", async (c) => {
    const { rfid } = await c.req.json()

    //add validation here

    const attendanceRes = await clockInService(rfid)


})

export default attendanceController