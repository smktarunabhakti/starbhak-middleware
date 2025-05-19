import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { student as StudentSchema } from "../../../db/schemas/students-table-schema";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { studyGroupSchedules } from "../../../db/schemas/study-group-schedules-table-schema";
import { schedules } from "../../../db/schemas/schedules-table-schema";

function roundTime(timeStr: string) {
    // Check format: HH:mm
    const match = /^(\d{1,2}):(\d{2})$/.exec(timeStr);
    if (!match) return null;
  
    let hour = parseInt(match[1], 10);
    let minute = parseInt(match[2], 10);
  
    // Validate ranges
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return null;
    }
  
    // Convert to minutes for comparison
    const totalMinutes = hour * 60 + minute;
    const noon = 12 * 60;
  
    return totalMinutes < noon ? '07:00' : '13:00';
  }

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

    console.log(findTapIn)

    console.log(student.study_groups_id)

    const findSchedule = await db.select()
        .from(schedules)
        .where(
            and(
                eq(schedules.study_group_id, student.study_groups_id!),
                sql`${schedules.day_of_week} = (SELECT EXTRACT('DoW' FROM CURRENT_DATE))`
            )
        )

        let start_at, end_at
        if(findSchedule.length > 0){
            start_at = roundTime(findSchedule[0].start_at)
            end_at = findSchedule[findSchedule.length - 1].end_at
        } else {
            start_at = "07:00"
            end_at = "17:00"
        };


    if(findTapIn.length === 0){
        try{
            await db.insert(attendanceRecord).values({
                student_id: student.student_id,
                scheduled_clock_in: start_at,
                scheduled_clock_out: end_at,
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