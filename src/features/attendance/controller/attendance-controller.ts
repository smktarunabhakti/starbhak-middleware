import { Hono } from "hono";
import clockInService from "../service/clock-in-service";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import clockOutService from "../service/clock-out-service";
import { GetAllAttendanceRecord } from "../service/attendance-data-service";

const attendanceController = new Hono();

attendanceController.post("/check-in", async (c) => {
    const { rfid } = await c.req.json()

    //add validation here
    if(rfid == null) {
        return c.json(errorResponse("Rfid required"))
    }
    const attendanceRes = await clockInService(rfid)

    if(!attendanceRes.success){
        return c.json(errorResponse(attendanceRes.message))
    }

    return c.json(successResponse(attendanceRes.message))
})

attendanceController.post("/check-out", async (c) => {
    const { rfid } = await c.req.json()

    //add validation here
    if(rfid == null) {
        return c.json(errorResponse("Rfid required"))
    }

    const attendanceRes = await clockOutService(rfid)

    if(!attendanceRes.success){
        return c.json(errorResponse(attendanceRes.message))
    }

    return c.json(successResponse(attendanceRes.message))
})



export default attendanceController