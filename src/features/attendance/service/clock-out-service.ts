import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { student as StudentSchema } from "../../../db/schemas/students-table-schema";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";
import { studyGroupSchedules } from "../../../db/schemas/study-group-schedules-table-schema";

export default async function clockOutService (rfid: string) {
    const today = new Date().toISOString().split('T');
    const find = await db.select().from(StudentSchema).where(eq(StudentSchema.rfid, rfid))

    if(!find){
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
            eq(attendanceRecord.date, today[0])
        )
    )

    if(!findTapIn){
        return {
            success: false,
            message: "Tap In tidak ditemukan!"
        }
    }

    try{
        await db.update(attendanceRecord).set({clock_out: today[1]}).where(eq(attendanceRecord.id, findTapIn[0].id))
    }catch(err){
        throw err
    }

    return {
        success: true,
        message: "Berhasil Tap Out!"
    }

    
}