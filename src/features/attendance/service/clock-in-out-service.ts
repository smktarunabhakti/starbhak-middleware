import { and, eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { student as StudentSchema } from "../../../db/schemas/students-table-schema";
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema";

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

    if(findTapIn.length === 0){
        try{
            await db.insert(attendanceRecord).values({
                student_id: student.student_id,
                scheduled_clock_in: "17:50",
                scheduled_clock_out: "07:00",
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