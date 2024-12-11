import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { addStudyGroup, editStudyGroup, fetchStudyGroupById, fetchStudyGroupByUuid, fetchStudyGroups, removeStudyGroup } from "../service/study-groups-service";

const studyGroupController = new Hono();

studyGroupController.get("/", async (c) => {
  try {
    const result = await fetchStudyGroups();
    return c.json(
      successResponse(result.message, { studyGroups: result.data }),
      result.statusCode || 200
    );
  } catch (error) {
    return c.json(
      errorResponse("Unknown error occurres while fetching studyGroups", error!),
      500
    );
  }
});

studyGroupController.get("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await fetchStudyGroupByUuid(uuid);
    return c.json(
      successResponse(result.message, { studyGroup: result.data }),
      result.success ? 200 : 404
    );
  } catch (error) {
    return c.json(
      errorResponse("Unknown error occurres while fetching studyGroups", error!),
      500
    );
  }
});

studyGroupController.get("/id/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id") as string, 10);
    const result = await fetchStudyGroupById(id);
    console.log(result);

    return c.json(
      successResponse(result.message, { studyGroup: result.data }),
      result.success ? 200 : 404
    );
  } catch (error) {
    return c.json(
      errorResponse("Unknown error occurred while fetching studyGroups", error!),
      500
    );
  }
});

studyGroupController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = await addStudyGroup(body);
    return c.json(
      successResponse(result.message, { studyGroup: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while creating studyGroup", error!),
      500
    );
  }
});

studyGroupController.put("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const body = await c.req.json();
    const result = await editStudyGroup(uuid, body);

    return c.json(
      successResponse(result.message, { studyGroup: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while updating studyGroup", error!),
      500
    );
  }
});

studyGroupController.delete("/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const result = await removeStudyGroup(uuid);

    return c.json(
      successResponse(result.message, { studyGroup: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse("Unknown error occurred while deleting studyGroup", error!),
      500
    );
  }
});

export default studyGroupController;
