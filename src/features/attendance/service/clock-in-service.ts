import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { student as StudentSchema } from "../../../db/schemas/students-table-schema";
import { studyGroupSchedules } from "../../../db/schemas/study-group-schedules-table-schema";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";

export default async function clockInService (rfid: string) {
    const find = await db.select().from(StudentSchema).where(eq(StudentSchema.rfid, rfid))

    if(!find){
        return {
            success: false,
            message: "Siswa tidak ditemukan!"
        }
    }

    const student = find[0]

    //dont know if this gonna work lol
    const findSchedule = await db.select()
    .from(studyGroupSchedules)
    .where(
        and(
            eq(studyGroupSchedules.study_groups_id, student.study_groups_id!),
            sql`${studyGroupSchedules.day_of_week} = (SELECT EXTRACT('DoW' FROM CURRENT_DATE))`
        )
    )

    if(!findSchedule){
        return {
            success: false,
            message: "Jadwal tidak ditemukan!"
        }
    }

    try{
        await db.insert(attendanceRecord).values({
            student_id: student.student_id,
            scheduled_clock_in: findSchedule[0].start_at,
            scheduled_clock_out: findSchedule[0].end_at,
        })
    }catch(err){
        throw err
    }

    return {
        success: true,
        message: "Berhasil Tap In!"
    }

}