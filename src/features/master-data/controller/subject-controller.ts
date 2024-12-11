import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { fetchSubjects, fetchSubjectById, fetchSubjectByUuid, addSubject, editSubject, removeSubject } from "../service/subject-service";

const subjectController = new Hono()

subjectController.get("/", async (c) => {
    try {
        const result = await fetchSubjects();
        return c.json(
            successResponse(result.message, { subjects: result.data }),
            result.statusCode || 200
        )
    } catch (error) {
        return c.json(
            errorResponse("Unknown error occurres while fetching subjects", error!),
            500
        )
    }
})

subjectController.get("/:uuid", async (c) => {
    try {
        const uuid = c.req.param("uuid")
        const result = await fetchSubjectByUuid(uuid)
        return c.json(
            successResponse(result.message, { subject: result.data }),
            result.success ? 200 : 404
        )
    } catch (error) {
        return c.json(
          errorResponse(
            "Unknown error occurres while fetching subjects",
            error!
          ),
          500
        );
    }
})

subjectController.get("/id/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id") as string, 10);
      const result = await fetchSubjectById(id);
      console.log(result);
      
      return c.json(
        successResponse(result.message, { subject: result.data }),
        result.success ? 200 : 404
      );
    } catch (error) {
      return c.json(
        errorResponse("Unknown error occurred while fetching subjects", error!),
        500
      );
    }
})

subjectController.post("/", async (c) => {
    try {
      const body = await c.req.json();
      const result = await addSubject(body);
      return c.json(
        successResponse(result.message, { subject: result.data }),
        result.statusCode || 201
      );
    } catch (error: unknown) {
      return c.json(
        errorResponse("Unknown error occurred while creating subject", error!),
        500
      );
    }
})

subjectController.put("/:uuid", async (c) => {
    try {
      const uuid = c.req.param("uuid");
      const body = await c.req.json();
      const result = await editSubject(uuid, body);

      return c.json(
        successResponse(result.message, { subject: result.data }),
        result.statusCode || 200
      );
    } catch (error: unknown) {
      return c.json(
        errorResponse("Unknown error occurred while updating subject", error!),
        500
      );
    }
})

subjectController.delete("/:uuid", async (c) => {
    try {
      const uuid = c.req.param("uuid");
      const result = await removeSubject(uuid);

      return c.json(
        successResponse(result.message, { subject: result.data }),
        result.statusCode || 200
      );
    } catch (error: unknown) {
      return c.json(
        errorResponse("Unknown error occurred while deleting subject", error!),
        500
      );
    }
})

export default subjectController