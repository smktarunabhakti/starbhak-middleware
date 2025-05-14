import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { student as StudentSchema } from "../../../db/schemas/students-table-schema";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { studyGroupSchedules } from "../../../db/schemas/study-group-schedules-table-schema";

export default async function clockInOutService (rfid: string) {
    const find = await db.select().from(StudentSchema).where(eq(StudentSchema.rfid, rfid))

    if(find.length === 0){
        return {
            success: false,
            message: "Siswa tidak ditemukan!"
        }
    }

    const student = find[0]

    //dont know if this gonna work lol
    const findTapIn = await db.select().from(attendanceRecord).where(
        and(
            eq(attendanceRecord.student_id, student.student_id!),
            eq(attendanceRecord.date, sql`NOW()`)
        )
    )

    const findSchedule = await db.select()
        .from(studyGroupSchedules)
        .where(
            and(
                eq(studyGroupSchedules.study_groups_id, student.study_groups_id!),
                sql`${studyGroupSchedules.day_of_week} = (SELECT EXTRACT('DoW' FROM CURRENT_DATE))`
            )
        )

    if(findTapIn.length === 0){
        try{
            await db.insert(attendanceRecord).values({
                student_id: student.student_id,
                scheduled_clock_in: findSchedule[0].start_at,
                scheduled_clock_out: findSchedule[findSchedule.length - 1].end_at,
                date: sql`NOW()`
            })

            return {
                success: true,
                message: "Berhasil Tap In!"
            }
        }catch(err){
            throw err
        }
    }

    try{
        await db.update(attendanceRecord).set({clock_out: sql`NOW()`}).where(eq(attendanceRecord.id, findTapIn[0].id))
    }catch(err){
        throw err
    }

    return {
        success: true,
        message: "Berhasil Tap Out!"
    }

    
}