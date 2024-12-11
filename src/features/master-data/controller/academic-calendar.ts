import { Hono } from "hono";
import { addAcademicCalendar, editAcademicCalendar, fetchAcademicCalendar, fetchAcademicCalendarById, fetchAcademicCalendarByUuid, removeAcademicCalendar } from "../service/academic-calendar";
import { errorResponse, successResponse } from "../../../common/utils/api-response";

const academicCalendarController = new Hono();

academicCalendarController.get('/', async (c) => {
    try {
        const result = await fetchAcademicCalendar();
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

academicCalendarController.get('/id/:id', async (c) => {
    if (!c.req.param("id")) {
        return c.json(errorResponse("Required ID"), 400);
    }

    try{

        const id = parseInt(c.req.param("id") as string, 10);
        const result = await fetchAcademicCalendarById(id);
    
        if (result.success) {
          return c.json(
            successResponse(result.message, { academicCalendar: result.data }),
            200
          );
        } else {
          return c.json(
            successResponse(result.message, { academicCalendar: result.data }),
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

academicCalendarController.get('/:uuid', async (c) => {
    try {
        const uuid = c.req.param("uuid");
        const result = await fetchAcademicCalendarByUuid(uuid);
        return c.json(
          successResponse(result.message, { academicCalendar: result.data }),
          result.statusCode || 200
        );
      } catch (error: unknown) {
        return c.json(
          errorResponse("Unknown error occurred, please try again", error!),
          500
        );
      }
})

academicCalendarController.post('/', async (c) => {
    try{

        const body = await c.req.json();
        console.log("Body: ", body);
        
        const result = await addAcademicCalendar(body);
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

academicCalendarController.put('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const body = await c.req.json();
        const result = await editAcademicCalendar(uuid, body);

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

academicCalendarController.delete('/:uuid', async (c) => {
    try{

        const uuid = c.req.param("uuid");
        const result = await removeAcademicCalendar(uuid);

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

export default academicCalendarController