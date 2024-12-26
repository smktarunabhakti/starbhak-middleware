import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { addUser, editUser, fetchUserById, fetchUsers, removeUser } from "../service/user-service";

const userController = new Hono();

userController.get("/", async (c) => {
  try {
    const result = await fetchUsers();
    return c.json(successResponse(result.message, { users: result.data }));
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching users", error!),
      500
    );
  }
});

userController.get("/id/:id", async (c) => {
  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  try {
    const id = String(c.req.param("id"));
    const result = await fetchUserById(id);

    return c.json(
      successResponse(result.message, { user: result.data }),
      result.success ? 200 : 404
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while fetching user", error!),
      500
    );
  }
});

userController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[user Controller] body: ", body);

    const result = await addUser(body);
    console.log("[user Controller] result: ", result);

    return c.json(
      successResponse(result.message, { user: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while creating user", error!),
      500
    );
  }
});

userController.put("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const body = await c.req.json();
    const result = await editUser(uuid, body);

    return c.json(
      successResponse(result.message, { user: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while updating user", error!),
      500
    );
  }
});

userController.delete("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await removeUser(uuid);

    return c.json(
      successResponse(result.message, { user: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while deleting user", error!),
      500
    );
  }
});

export default userController;
