import { Hono } from "hono";
import studentController from "../controller/student-controller";
import teacherController from "../controller/teacher-controller";
import subjectController from "../controller/subject-controller";
import studyGroupController from "../controller/study-group-controller";
import schoolYearController from "../controller/school-year-controller";
import majorsController from "../controller/majors-controller";
import academicCalendarController from "../controller/academic-calendar";
import parentController from "../controller/parent-controller";
import parentStudentController from "../controller/parent-student-controller";
import { fetchTeachers } from "../service/teacher-service";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import type { Teacher } from "../../../common/interfaces/teacher-interface";
import { db } from "../../../db";
import { student } from "../../../db/schemas/students-table-schema";
import { eq } from "drizzle-orm";
import scheduleController from "../controller/schedule-controller";

const masterDataRoute = new Hono();

masterDataRoute.route("/students", studentController);
masterDataRoute.route("/teachers", teacherController);
masterDataRoute.route("/subjects", subjectController);
masterDataRoute.route("/study-groups", studyGroupController);
masterDataRoute.route("/school-year", schoolYearController);
masterDataRoute.route("/majors", majorsController);
masterDataRoute.route("/academic-calendar", academicCalendarController);
masterDataRoute.route("/parents", parentController);
masterDataRoute.route("/parent-student", parentStudentController);
masterDataRoute.route("/schedules", scheduleController)

/**
 * Additional route here
 * *
 */
masterDataRoute.get("/student", async (c) => {
  try {
    const {nisn} = await c.req.json()
    const foundStudent = await db.select().from(student).where(eq(student.nisn, nisn)).limit(1)

    if (!foundStudent) {
      return c.json(
        errorResponse("Cannot find user with provided user"),
        404
      )
    }

    const mappedStudent = foundStudent.map(student => {
      return {
        //Nanti aja deh
      }
    })

    return c.json(
      successResponse("Success fetch student", foundStudent[0])
    )
  } catch (error) {
    return c.json(
      errorResponse("Unknown error occurred while fetching teacher", error!),
      500
    );
  }
})
masterDataRoute.get("/all-teachers", async (c) => {
  try {
    const result = await fetchTeachers();

    let mapResult: Teacher[] = result.data
    let resFinal = mapResult.map(x => {
        return {
            teacher_id: x.teacher_id,
            name: x.name
        }
    })

    return c.json(
      successResponse(result.message, resFinal),
      result.statusCode
    );

    /**
     * "success": true,
    "message": "Success fetched teachers data!",
    "data": [
        {
            "id": 1,
            "teacher_id": "64ea9775-3895-4cff-bc19-5648b6b94e28",
            "DoB": "1980-08-22",
            "PoB": "Bandung",
            "gender": "Female",
            "email": "jane.smith@example.com",
            "name": "Jane Smith",
            "user_id": null,
            "isActive": true,
            "createdAt": "2024-12-13T00:33:36.566Z",
            "updatedAt": "2024-12-13T07:33:36.743Z"
        },
        {
            "id": 2,
            "teacher_id": "175ae1c6-2e36-4731-8068-727e1902d248",
            "DoB": "1980-08-22",
            "PoB": "Bandung",
            "gender": "Female",
            "email": "loona@example.com",
            "name": "Loona",
            "user_id": null,
            "isActive": true,
            "createdAt": "2024-12-13T00:33:36.566Z",
            "updatedAt": "2024-12-13T07:33:36.752Z"
        }
    ]
}
     */
  } catch (error) {
    return c.json(
      errorResponse("Unknown error occurred while fetching teacher", error!),
      500
    );
  }
});

export default masterDataRoute;
