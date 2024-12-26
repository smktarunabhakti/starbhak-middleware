import { Hono } from "hono";
import { addParent, editParent, fetchParent, fetchParentById, fetchParentByUuid, removeParent } from "../service/parent-service";
import { errorResponse, successResponse } from "../../../common/utils/api-response";

const parentController = new Hono()

parentController.get("/", async (c) => {
    try {
        const result = await fetchParent()
        return c.json(
            successResponse(result.message, {parents: result.data}),
            result.statusCode || 200
        )
    } catch (error) {
        return c.json(
            errorResponse("Unknown error occurred, please try again", error!),
            500
        )
    }
})

parentController.get('/id/:id', async (c) => {
    if (!c.req.param("id")) {
        return c.json(errorResponse("Required ID"), 400);
    }

    try{

        const id = parseInt(c.req.param("id") as string, 10);
        const result = await fetchParentById(id);
    
        if (result.success) {
          return c.json(
            successResponse(result.message, { majors: result.data }),
            200
          );
        } else {
          return c.json(
            successResponse(result.message, { majors: result.data }),
            result.statusCode || 404
          );
        }

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred, please try again", error!),
            500
        );
    }
})

parentController.get('/:uuid', async (c) => {
    try {
        const uuid = c.req.param("uuid");
        const result = await fetchParentByUuid(uuid);
        return c.json(
          successResponse(result.message, { majors: result.data }),
          result.statusCode || 200
        );
      } catch (error: unknown) {
        return c.json(
          errorResponse("Unknown error occurred, please try again", error!),
          500
        );
      }
})

parentController.post('/', async (c) => {
    try{

        const body = await c.req.json();
        console.log("Body: ", body);
        
        const result = await addParent(body);
        console.log("Result: ", result);
        

        return c.json(
        successResponse(result.message, { majors: result.data }),
        result.statusCode || 201
        );

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred while creating parent", error!),
            500
          );
    }
})

parentController.put('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const body = await c.req.json();
        const result = await editParent(uuid, body);

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

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred while updating parent", error!),
            500
        );
    }
})

parentController.delete('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const result = await removeParent(uuid);

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

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred while updating parent", error!),
            500
        );
    }
})

export default parentController