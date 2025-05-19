import { Hono } from "hono";
import {
  addAttendancePermittance,
  addAttendancePermittanceFromToDateSameExcuses,
  editAttendancePermittance,
  fetchAttendancePermitance,
  fetchAttendancePermittanceById,
  removeAttendancePermittance,
} from "../service/attendance-permittance-service";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import type { JWTPayload } from "hono/utils/jwt/types";
import { verify } from "hono/jwt";
import { db } from "../../../db";
import { teacher } from "../../../db/schemas/teacher-table-schema";
import { and, eq, sql } from "drizzle-orm";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { attendancePermittance } from "../../../db/schemas/attendance-permittance-table-schema";
import { studyGroupSchedules } from "../../../db/schemas/study-group-schedules-table-schema";
import { student } from "../../../db/schemas/students-table-schema";
import { create } from "node:domain";
import { createRecordLog } from "../service/attendance-confirmation-log-service";

const attendancePermittanceController = new Hono();

attendancePermittanceController.get("/", async (c) => {
  try {
    const result = await fetchAttendancePermitance();
    return c.json(
      successResponse(result.message, { attendancePermittances: result.data })
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse(
        "Unknown error occurred while fetching attendancePermittances",
        error!
      ),
      500
    );
  }
});

attendancePermittanceController.get("/id/:id", async (c) => {
  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  try {
    const id = parseInt(c.req.param("id") as string, 10);
    const result = await fetchAttendancePermittanceById(id);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.success ? 200 : 404
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse(
        "Unknown error occurred while fetching attendancePermittance",
        error!
      ),
      500
    );
  }
});

attendancePermittanceController.post("/", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[attendancePermittance Controller] body: ", body);

    if (body.student_id == null && body.teacher_id) {
      return c.json(
        errorResponse("No student id or teacher id provided!"),
        500
      );
    }

    const result = await addAttendancePermittance(body);
    console.log("[attendancePermittance Controller] result: ", result);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 201
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse(
        "Unknown error occurred while creating attendancePermittance",
        error!
      ),
      500
    );
  }
});

attendancePermittanceController.put("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const body = await c.req.json();
    const result = await editAttendancePermittance(id, body);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse(
        "Unknown error occurred while updating attendancePermittance",
        error!
      ),
      500
    );
  }
});

attendancePermittanceController.delete("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));
    const result = await removeAttendancePermittance(id);

    return c.json(
      successResponse(result.message, { attendancePermittance: result.data }),
      result.statusCode || 200
    );
  } catch (error: unknown) {
    return c.json(
      errorResponse(
        "Unknown error occurred while deleting attendancePermittance",
        error!
      ),
      500
    );
  }
});

attendancePermittanceController.post("/confirmation", async (c) => {
  try {
    const body = await c.req.json();
    console.log("[attendancePermittance Controller] body: ", body);

    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json(errorResponse("Required token!"), 400);
    }

    const _secret = process.env.X_SECRET;

    if (!_secret) {
      return c.json(
        errorResponse("Server tidak dapat memverifikasi token!"),
        500
      );
    }

    const decodedToken: JWTPayload = await verify(token, _secret);

    const { id } = decodedToken;

    const getProfile = await db
      .select()
      .from(teacher)
      .where(eq(teacher.user_id, id as string));

    for (const element of body.datas) {
      const { id: studentId, status } = element;

      const today = new Date();

      const attendance = await db
        .select()
        .from(attendanceRecord)
        .where(
          and(
            eq(attendanceRecord.student_id, studentId),
            eq(attendanceRecord.date, sql`now()`)
          )
        );

      if (status == "hadir") {
        if (attendance.length == 0) {
          const getStudent = await db
            .select()
            .from(student)
            .where(eq(student.student_id, studentId as string));

          const findSchedule = await db
            .select()
            .from(studyGroupSchedules)
            .where(
              and(
                eq(
                  studyGroupSchedules.study_groups_id,
                  getStudent[0].study_groups_id as string
                ),
                eq(studyGroupSchedules.day_of_week, today.getDay())
              )
            );

          await db.insert(attendanceRecord).values({
            student_id: studentId,
            scheduled_clock_in:
              findSchedule.length != 0 ? findSchedule[0].start_at : "07:00",
            scheduled_clock_out:
              findSchedule.length != 0 ? findSchedule[0].end_at : "17:00",
          });
        }

        await db.insert(attendancePermittance).values({
          student_id: studentId,
          description: "From Teacher Confirming!",
          type: "HADIR",
          status: "ACCEPTED",
          isActive: true,
          date: today.toDateString(),
          teacher_id: getProfile[0].teacher_id,
          createdAt: sql`NOW()`,
        });

        continue;
      }

      if (status == "izin") {
        await db.insert(attendancePermittance).values({
          student_id: studentId,
          description: "From Teacher Confirming!",
          type: "IZIN",
          status: "ACCEPTED",
          isActive: true,
          date: today.toDateString(),
          teacher_id: getProfile[0].teacher_id,
          createdAt: sql`NOW()`,
        });

        continue;
      }

      if (status == "sakit") {
        await db.insert(attendancePermittance).values({
          student_id: studentId,
          description: "From Teacher Confirming!",
          type: "SAKIT",
          status: "ACCEPTED",
          isActive: true,
          date: today.toDateString(),
          teacher_id: getProfile[0].teacher_id,
          createdAt: sql`NOW()`,
        });

        continue;
      }

      if (status == "absen") {
        await db.insert(attendancePermittance).values({
          student_id: studentId,
          description: "From Teacher Confirming!",
          type: "ALPHA",
          status: "ACCEPTED",
          isActive: true,
          date: today.toDateString(),
          teacher_id: getProfile[0].teacher_id,
          createdAt: sql`NOW()`,
        });

        continue;
      }
    }

    createRecordLog({
      date: new Date().toDateString(),
      studyGroupId: body.study_groups_id,
      teacherId: getProfile[0].teacher_id as string,
    });

    return c.json(successResponse("Confirmation complete!"), 200);
  } catch (error: any) {
    if (error.name === "JwtTokenExpired") {
      return c.json(errorResponse("Token expired"), 401);
    }

    return c.json(
      errorResponse("Unknown error occurred while confirming!", error!),
      500
    );
  }
});

attendancePermittanceController.post(
  "/create-permit-self/teacher",
  async (c) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json(errorResponse("Required token!"), 400);
    }

    try {
      const _secret = process.env.X_SECRET;

      if (!_secret) {
        return c.json(
          errorResponse("Server tidak dapat memverifikasi token!"),
          500
        );
      }

      const decodedToken: JWTPayload = await verify(token, _secret);

      const { id } = decodedToken;

      const getProfile = await db
        .select()
        .from(teacher)
        .where(eq(teacher.user_id, id as string));

      const body = await c.req.json();

      let result;

      if (body.end_date == null) {
        console.log("test");

        result = await addAttendancePermittance({
          type: "IZIN",
          description: body.excuses,
          date: new Date(body.start_date),
          status: "ACCEPTED",
          teacher_id: getProfile[0].teacher_id as string,
        });
      } else {
        result = await addAttendancePermittanceFromToDateSameExcuses(
          {
            type: "IZIN",
            excuses: body.excuses,
            teacher_id: getProfile[0].teacher_id as string,
          },
          new Date(body.start_date),
          new Date(body.end_date)
        );
      }

      return c.json(
        successResponse(result.message, result.data),
        result.statusCode || 201
      );
    } catch (error: any) {
      if (error.name === "JwtTokenExpired") {
        return c.json(errorResponse("Token expired"), 401);
      }

      return c.json(
        errorResponse(
          "Unknown error occurred while creating attendancePermittance",
          error!
        ),
        500
      );
    }
  }
);

export default attendancePermittanceController;
