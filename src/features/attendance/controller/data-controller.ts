import { Hono } from "hono";
import { successResponse } from "../../../common/utils/api-response";
import { GetAllAttendanceRecord } from "../service/attendance-data-service";

const dataController = new Hono()

dataController.get("/get-all", async (c) => {
    const allRecord = await GetAllAttendanceRecord()

    return c.json(successResponse(allRecord.message, allRecord.data))
})

dataController.get("/get-self", async (c) => {

    const payload = c.get('jwtPayload')

    // const allRecord = await GetSelfAttendanceRecord()

    return c.json(successResponse("testing", payload))
})

export default dataController