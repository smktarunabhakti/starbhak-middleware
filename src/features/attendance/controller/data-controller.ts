import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { GetAllAttendanceRecord } from "../service/attendance-data-service";
import { db } from "../../../db";
import { student } from "../../../db/schemas/students-table-schema";
import { and, between, eq, isNull, ne } from "drizzle-orm";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { attendancePermittance } from "../../../db/schemas/attendance-permittance-table-schema";
import { verify } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import { teacher } from "../../../db/schemas/teacher-table-schema";
import { studyGroup } from "../../../db/schemas/study-groups-table-schema";

const dataController = new Hono();

dataController.get("/get-all", async (c) => {
  const allRecord = await GetAllAttendanceRecord();

  return c.json(successResponse(allRecord.message, allRecord.data));
});

dataController.get("/get-class-attendance/:id", async (c) => {
  const id = c.req.param("id");

  if (!c.req.param("id")) {
    return c.json(errorResponse("Required ID"), 400);
  }

  let datas = [];

  const students = await db
    .select()
    .from(student)
    .where(eq(student.study_groups_id, id));

  const today = new Date();

  for (const elem of students) {
    let status = "ABSEN";

    let attendance = await db
      .select()
      .from(attendanceRecord)
      .where(
        and(
          eq(attendanceRecord.date, today.toISOString().split("T")[0]),
          eq(attendanceRecord.student_id, elem.student_id as string)
        )
      );

    if (attendance.length != 0) {
      status = "HADIR";
    }

    let permittance = await db
      .select()
      .from(attendancePermittance)
      .where(
        and(
          eq(attendancePermittance.date, today.toISOString().split("T")[0]),
          eq(attendancePermittance.student_id, elem.student_id as string),
          ne(attendancePermittance.type, "ALPHA")
        )
      );

    if (permittance.length != 0) {
      status = "IZIN";
    }

    datas.push({
      student_id: elem.student_id,
      name: elem.name,
      status: status,
    });
  }

  return c.json(successResponse("founded!", datas), 200);
});

dataController.get("/get-class-attendance/self/homeroom", async (c) => {
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

  const getStudyGroup = await db.select().from(studyGroup).where(eq(studyGroup.homeroom_teacher_id, getProfile[0].teacher_id))

  let datas = [];

  const students = await db
    .select()
    .from(student)
    .where(eq(student.study_groups_id, getStudyGroup[0].study_groups_id as string));

  const today = new Date();

  for (const elem of students) {
    let status = "ABSEN";

    let attendance = await db
      .select()
      .from(attendanceRecord)
      .where(
        and(
          eq(attendanceRecord.date, today.toISOString().split("T")[0]),
          eq(attendanceRecord.student_id, elem.student_id as string)
        )
      );

    if (attendance.length != 0) {
      status = "HADIR";
    }

    let permittance = await db
      .select()
      .from(attendancePermittance)
      .where(
        and(
          eq(attendancePermittance.date, today.toISOString().split("T")[0]),
          eq(attendancePermittance.student_id, elem.student_id as string),
          ne(attendancePermittance.type, "ALPHA")
        )
      );

    if (permittance.length != 0) {
      status = "IZIN";
    }

    datas.push({
      student_id: elem.student_id,
      name: elem.name,
      status: status,
    });
  }

  return c.json(successResponse("founded!", datas), 200);
});

dataController.get("/get-self-history/teacher", async (c) => {
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

  // Calculate dates
  const today = new Date();
  const oneYearBefore = new Date(today);
  oneYearBefore.setFullYear(today.getFullYear() - 1);

  const oneYearAfter = new Date(today);
  oneYearAfter.setFullYear(today.getFullYear() + 1);

  let datas: any = [];

  let permittance = await db
    .select()
    .from(attendancePermittance)
    .where(
      and(
        between(
          attendancePermittance.date,
          oneYearBefore.toISOString().split("T")[0],
          oneYearAfter.toISOString().split("T")[0]
        ),
        eq(
          attendancePermittance.teacher_id,
          getProfile[0].teacher_id as string
        ),
        isNull(attendancePermittance.student_id),
        ne(attendancePermittance.type, "ALPHA")
      )
    );

  for (const elem of permittance) {
    datas.push({
      date: elem.date,
      status: elem.type,
    });
  }

  return c.json(successResponse("founded!", datas), 200);
});

export default dataController;
