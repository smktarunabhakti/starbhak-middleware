import { Hono } from "hono";
import { addMajors, editMajors, fetchMajors, fetchMajorsById, fetchMajorsByUuid, removeMajors } from "../service/majors-service";
import { errorResponse, successResponse } from "../../../common/utils/api-response";

const majorsController = new Hono();

majorsController.get('/', async (c) => {
    try {
        const result = await fetchMajors();
        return c.json(
          successResponse(result.message, { schoolYear: result.data }),
          200
        );
      } catch (error: unknown) {
        return c.json(
          errorResponse("Unknown error occurred, please try again", error!),
          500
        );
      }
})

majorsController.get('/id/:id', async (c) => {
    if (!c.req.param("id")) {
        return c.json(errorResponse("Required ID"), 400);
    }

    try{

        const id = parseInt(c.req.param("id") as string, 10);
        const result = await fetchMajorsById(id);
    
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

majorsController.get('/:uuid', async (c) => {
    try {
        const uuid = c.req.param("uuid");
        const result = await fetchMajorsByUuid(uuid);
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

majorsController.post('/', async (c) => {
    try{

        const body = await c.req.json();
        console.log("Body: ", body);
        
        const result = await addMajors(body);
        console.log("Result: ", result);
        

        return c.json(
        successResponse(result.message, { majors: result.data }),
        result.statusCode || 201
        );

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred while creating student", error!),
            500
          );
    }
})

majorsController.put('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const body = await c.req.json();
        const result = await editMajors(uuid, body);

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
            errorResponse("Unknown error occurred while updating student", error!),
            500
        );
    }
})

majorsController.delete('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const result = await removeMajors(uuid);

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
            errorResponse("Unknown error occurred while updating student", error!),
            500
        );
    }
})

export default majorsController