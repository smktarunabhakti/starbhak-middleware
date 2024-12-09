import { eq } from "drizzle-orm"
import { db } from "../../../db"
import { attendanceRecord } from "../../../db/schemas/attendance-records-table-schema"
import { student } from "../../../db/schemas/students-table-schema"

export async function GetAllAttendanceRecord() {
    try{
        const datas = await db.select().from(attendanceRecord)

        return {
            success: true,
            message: "Getted All!",
            data: datas
        }
    }catch(e){
        throw e
    }
}

export async function GetSelfAttendanceRecord(id: string) {
    try{

        const findStudent = await db.select().from(student).where(eq(student.user_id, id))

        const datas = await db.select().from(attendanceRecord).where(eq(attendanceRecord.student_id, findStudent[0].student_id!))

        return {
            success: true,
            message: "Getted yourself!",
            data: datas
        }
    }catch(e){
        throw e
    }
}