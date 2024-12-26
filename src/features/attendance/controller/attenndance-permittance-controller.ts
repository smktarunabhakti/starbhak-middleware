import { Hono } from "hono";
import { addAttendancePermittance, editAttendancePermittance, fetchAttendancePermitance, fetchAttendancePermittanceById, removeAttendancePermittance } from "../service/attenndance-permittance-service";
import { errorResponse, successResponse } from "../../../common/utils/api-response";

const attendancePermittanceController = new Hono();

attendancePermittanceController.get("/", async (c) => {
  try {
    const result = await fetchAttendancePermitance();
    return c.json(successResponse(result.message, { attendancePermittances: result.data }));
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching attendancePermittances", error!),
      500
    );
  }
});

attendancePermittanceController.get("/id/:id", async (c) => {
  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  try {
    const id = parseInt(c.req.param("id") as string, 10);
    const result = await fetchAttendancePermittanceById(id);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.success ? 200 : 404
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching attendancePermittance", error!),
      500
    );
  }
});

attendancePermittanceController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[attendancePermittance Controller] body: ", body);
    
    const result = await addAttendancePermittance(body);
    console.log("[attendancePermittance Controller] result: ", result);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while creating attendancePermittance", error!),
      500
    );
  }
});

attendancePermittanceController.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const result = await editAttendancePermittance(id, body);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while updating attendancePermittance", error!),
      500
    );
  }
});

attendancePermittanceController.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const result = await removeAttendancePermittance(id);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while deleting attendancePermittance", error!),
      500
    );
  }
});

export default attendancePermittanceController;