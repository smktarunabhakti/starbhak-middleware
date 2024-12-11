import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import {
  fetchTeachers,
  fetchTeacherById,
  fetchTeacherByUuid,
  addTeacher,
  editTeacher,
  removeTeacher,
} from "../service/teacher-service";

const teacherController = new Hono();

teacherController.get("/", async (c) => {
  try {
    const result = await fetchTeachers();
    return c.json(successResponse(result.message, { teachers: result.data }));
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching teachers", error!),
      500
    );
  }
});

teacherController.get("/id/:id", async (c) => {
  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  try {
    const id = parseInt(c.req.param("id") as string, 10);
    const result = await fetchTeacherById(id);

    return c.json(
      successResponse(result.message, { teacher: result.data }),
      result.success ? 200 : 404
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching teacher", error!),
      500
    );
  }
});

teacherController.get("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await fetchTeacherByUuid(uuid);

    return c.json(
      successResponse(result.message, { teacher: result.data }),
      result.success ? 200 : 404
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching teacher", error!),
      500
    );
  }
});

teacherController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[Teacher Controller] body: ", body);
    
    const result = await addTeacher(body);
    console.log("[Teacher Controller] result: ", result);

    return c.json(
      successResponse(result.message, { teacher: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while creating teacher", error!),
      500
    );
  }
});

teacherController.put("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const body = await c.req.json();
    const result = await editTeacher(uuid, body);

    return c.json(
      successResponse(result.message, { teacher: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while updating teacher", error!),
      500
    );
  }
});

teacherController.delete("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await removeTeacher(uuid);

    return c.json(
      successResponse(result.message, { teacher: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while deleting teacher", error!),
      500
    );
  }
});

export default teacherController;
