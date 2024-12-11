import { Hono } from "hono";
import { getAllSchoolYears } from "../../../common/model/school-year-model";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { addSchoolYear, editSchoolYear, fetchSchoolYear, fetchSchoolYearById, fetchSchoolYearByUuid, removeSchoolYear } from "../service/school-year-service";
import { uuid } from "drizzle-orm/pg-core";

const schoolYearController = new Hono();

schoolYearController.get('/', async (c) => {
    try {
        const result = await fetchSchoolYear();
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

schoolYearController.get('/id/:id', async (c) => {

    if (!c.req.param("id")) {
        return c.json(errorResponse("Required ID"), 400);
    }

    try{

        const id = parseInt(c.req.param("id") as string, 10);
        const result = await fetchSchoolYearById(id);
    
        if (result.success) {
          return c.json(
            successResponse(result.message, { schoolYear: result.data }),
            200
          );
        } else {
          return c.json(
            successResponse(result.message, { schoolYear: result.data }),
            result.statusCode || 404
          );
        }

    }catch(error: unknown) {
        return c.json(
            errorResponse("Unknown error occurred, please try again", error!),
            500
        );
    }

} )

schoolYearController.get('/:uuid', async (c) => {
    try {
        const uuid = c.req.param("uuid");
        const result = await fetchSchoolYearByUuid(uuid);
        return c.json(
          successResponse(result.message, { schoolYear: result.data }),
          result.statusCode || 200
        );
      } catch (error: unknown) {
        return c.json(
          errorResponse("Unknown error occurred, please try again", error!),
          500
        );
      }
})

schoolYearController.post('/', async (c) => {
    try{

        const start = await c.req.json();
        const end = await c.req.json();
        const isActive = await c.req.json();

        console.log("Body: ", start,end,isActive);
        
        const result = await addSchoolYear(start,end,isActive);
        console.log("Result: ", result);
        

        return c.json(
        successResponse(result.message, { schoolYear: result.data }),
        result.statusCode || 201
        );

    }catch(error: unknown) {

        return c.json(
            errorResponse("Unknown error occurred while creating student", error!),
            500
          );

    }
})

schoolYearController.put('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const body = await c.req.json();
        const result = await editSchoolYear(uuid, body);

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

schoolYearController.delete('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const result = await removeSchoolYear(uuid);

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

export default schoolYearController