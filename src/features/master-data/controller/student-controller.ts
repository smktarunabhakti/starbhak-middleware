import { Hono } from "hono";
import {
  fetchStudents,
  fetchStudentById,
  fetchStudentByUuid,
  addStudent,
  editStudent,
  removeStudent,
} from "../service/student-service";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";

const studentController = new Hono();

studentController.get("/", async (c) => {
  try {
    const result = await fetchStudents();
    return c.json(
      successResponse(result.message, { students: result.data }),
      200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred, please try again", error!),
      500
    );
  }
});

studentController.get("/id/:id", async (c) => {
  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  try {
    const id = parseInt(c.req.param("id") as string, 10);
    const result = await fetchStudentById(id);

    if (result.success) {
      return c.json(
        successResponse(result.message, { student: result.data }),
        200
      );
    } else {
      return c.json(
        successResponse(result.message, { student: result.data }),
        result.statusCode || 404
      );
    }
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred, please try again", error!),
      500
    );
  }
});

studentController.get("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await fetchStudentByUuid(uuid);
    return c.json(
      successResponse(result.message, { student: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred, please try again", error!),
      500
    );
  }
});

studentController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("Body: ", body);
    
    const result = await addStudent(body);
    console.log("Result: ", result);
    

    return c.json(
      successResponse(result.message, { student: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while creating student", error!),
      500
    );
  }
});

studentController.put("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const body = await c.req.json();
    const result = await editStudent(uuid, body);

    if (result.success) {
      return c.json(
        successResponse(result.message, result.data),
        result.statusCode || 200
      );
    } else {
      return c.json(
        successResponse(result.message, result.data),
        result.statusCode || 404
      );
    }
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while updating student", error!),
      500
    );
  }
});

studentController.delete("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await removeStudent(uuid);

    if (result.success) {
      return c.json(
        successResponse(result.message, result.data),
        result.statusCode || 200
      );
    } else {
      return c.json(
        successResponse(result.message, result.data),
        result.statusCode || 404
      );
    }
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while deleting student", error!),
      500
    );
  }
});

export default studentController;
