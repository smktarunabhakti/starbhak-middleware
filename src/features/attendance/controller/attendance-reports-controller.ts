import { Hono } from "hono";
import {
  errorResponse,
  successResponse,
} from "../../../common/utils/api-response";
import { db } from "../../../db";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { and, between, eq } from "drizzle-orm";
import { student } from "../../../db/schemas/students-table-schema";
import { attendancePermittance } from "../../../db/schemas/attendance-permittance-table-schema";
import { schedules } from "../../../db/schemas/schedules-table-schema";
import { subject } from "../../../db/schemas/subjects-table-schema";
import { teacher } from "../../../db/schemas/teacher-table-schema";

const attendanceReportsController = new Hono();

attendanceReportsController.get("/daily", async (c) => {
  try {
    let { date, study_groups_id } = c.req.query();

    if (!date) {
      date = new Date().toISOString().split("T")[0]; // Default to today's date
    }

    if (!study_groups_id) {
      return c.json(errorResponse("Study group ID is required"), 400);
    }

    const result = await db
      .select()
      .from(student)
      .leftJoin(
        attendanceRecord,
        and(
          eq(student.student_id, attendanceRecord.student_id),
          eq(attendanceRecord.date, date)
        )
      )
      .where(eq(student.study_groups_id, study_groups_id));

    const resultPermittance = await db
      .select({
        attendancePermittance: attendancePermittance,
      })
      .from(attendancePermittance)
      .innerJoin(
        student,
        eq(attendancePermittance.student_id, student.student_id)
      )
      .where(
        and(
          eq(attendancePermittance.date, date),
          eq(student.study_groups_id, study_groups_id)
        )
      );

    let hourlyRecord = [];

    const day_of_week: number = new Date(date).getDay();

    let schedule = await db
      .select({
        start_at: schedules.start_at,
        end_at: schedules.end_at,
        subject_name: subject.name,
        teacher_name: teacher.name,
        study_groups_id: schedules.study_group_id,
        day_of_week: schedules.day_of_week,
      })
      .from(schedules)
      .innerJoin(
        subject,
        eq(schedules.subject_id, subject.subjects_id)
      )
      .innerJoin(
        teacher,
        eq(schedules.teacher_id, teacher.teacher_id)
      )
      .where(
        and(
          eq(schedules.study_group_id, study_groups_id),
          eq(schedules.day_of_week, day_of_week)
        )
      );

    hourlyRecord = result.map(({ students, attendance_records }) => {
      const studentPermittance = resultPermittance.filter(
        (perm) => perm.attendancePermittance.student_id === students.student_id
      );

      let status;

      if (attendance_records == null) {
        status = "ALPHA";
        if (studentPermittance != null) {
          status =
            studentPermittance.length > 0
              ? studentPermittance[studentPermittance.length - 1]
                  .attendancePermittance.type
              : "ALPHA";
        }

        return {
          student_id: students.student_id,
          name: students.name,
          status: status,
          study_groups_id: students.study_groups_id,
          all_day: true,
          check_in: null,
          check_out: null,
          scheduled_clock_in:
            schedule.length != 0 ? schedule[0].start_at : "07:00",
          scheduled_clock_out:
            schedule.length != 0
              ? schedule[schedule.length - 1].end_at
              : "17:00",
        };
      }

      return {
        student_id: students.student_id,
        name: students.name,
        status: "HADIR",
        study_groups_id: students.study_groups_id,
        all_day: studentPermittance == null ? true : false,
        checkpoint:
          studentPermittance == null
            ? null
            : studentPermittance.map((perm) => ({
                type: perm.attendancePermittance.type,
                status: perm.attendancePermittance.status,
                description: perm.attendancePermittance.description,
                date: perm.attendancePermittance.date,
                createdAt: perm.attendancePermittance.createdAt,
                teacher_id: perm.attendancePermittance.teacher_id,
              })),
        check_in: attendance_records.clock_in,
        check_out: attendance_records.clock_out,
        scheduled_clock_in:
          schedule.length != 0 ? schedule[0].start_at : "07:00",
        scheduled_clock_out:
          schedule.length != 0 ? schedule[schedule.length - 1].end_at : "17:00",
      };
    });

    return c.json(
      successResponse("Success fetching attendance reports!", {
        date: date,
        study_groups_id: study_groups_id,
        attendance_records: hourlyRecord,
        schedule: schedule.length != 0 ? schedule : null,
      })
    );
  } catch (error) {
    console.error('[attendanceReportsController:"/daily"] error: ', error);
    throw error;
  }
});

attendanceReportsController.get("/monthly", async (c) => {
  try {
    const today = new Date();

    let [month, year]: [month: number, year: number] = [
      today.getMonth() + 1,
      today.getFullYear(),
    ];

    let { p_month, p_year, study_groups_id } = c.req.query();

    if (p_month) {
      month = parseInt(p_month);
    }

    if (p_year) {
      year = parseInt(p_year);
    }

    if (!study_groups_id) {
      return c.json(errorResponse("Study group ID is required"), 400);
    }

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, 0);

    const result = await db
      .select()
      .from(student)
      .leftJoin(
        attendanceRecord,
        eq(student.student_id, attendanceRecord.student_id)
      )
      .where(
        and(
          eq(student.study_groups_id, study_groups_id),
          between(
            attendanceRecord.date,
            startDate.toLocaleDateString("en-CA"),
            endDate.toLocaleDateString("en-CA")
          )
        )
      );

    return c.json(
      successResponse("Success fetching attendance reports!", {
        month: month,
        year: year,
        study_groups_id: study_groups_id,
        attendance_records: result
      })
    );
  } catch (error) {
    console.error('[attendanceReportsController:"/monthly"] error: ', error);
    throw error;
  }
});

export default attendanceReportsController;
