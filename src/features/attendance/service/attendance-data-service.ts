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

        const findStudent = await db.select().from(student).where()

        const datas = await db.select().from(attendanceRecord).where(eq(attendanceRecord.student_id))

        return {
            success: true,
            message: "Getted All!",
            data: datas
        }
    }catch(e){
        throw e
    }
}