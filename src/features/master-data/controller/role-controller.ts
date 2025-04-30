import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { fetchAllRoles } from "../service/role-service";

const roleController = new Hono();

roleController.get("/", async (c) => {
    try {
        const result = await fetchAllRoles();
        return c.json(
          successResponse(result.message, { roles: result.data }),
          200
        );
      } catch (error: unknown) {
        return c.json(
          errorResponse("Unknown error occurred, please try again", error!),
          500
        );
      }
})

export default roleController;