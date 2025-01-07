import { eq } from "drizzle-orm";
import { db } from "../../db";
import { attendancePermittance } from "../../db/schemas/attendance-permittance-table-schema";
import type { AttenndancePermittance, statusEnum, typeEnum } from "../interfaces/attenndance-permittance-interface";

const getAllAttendancePermittances = async (): Promise<
  AttenndancePermittance[]
> => {
  const collections = await db.select().from(attendancePermittance);
  return collections as AttenndancePermittance[];
};

const getAttendancePermittanceById = async (
  id: number
): Promise<AttenndancePermittance> => {
  const collection = await db
    .select()
    .from(attendancePermittance)
    .where(eq(attendancePermittance.id, id))
    .limit(1);
  return collection[0] as AttenndancePermittance;
};

const createAttendancePermittance = async (createData: {
    student_id?: string
    description?: string
    date?: string | Date
    type: typeEnum
    status: statusEnum 
    teacher_id?: string
}): Promise<AttenndancePermittance> => {
    const formattedDate = createData.date instanceof Date ? createData.date.toDateString() : String(createData.date)

    try {
      
      const collection = await db
      .insert(attendancePermittance)
      .values({
          student_id: createData.student_id,
          description: createData.description,
          type: createData.type,
          status: createData.status,
          teacher_id: createData.teacher_id,
          isActive: true,
          date: formattedDate
      })
      .returning();


      return collection[0] as AttenndancePermittance;

    } catch (error) {
      
      console.log(error)

      throw error;
    }

};

const updateAttendancePermittance = async (
  id: number,
  updateData: {
    student_id?: string
    description?: string
    date?: string | Date
    type?: typeEnum
    status?: statusEnum 
    teacher_id?: string
    isActive?: boolean
  }
): Promise<AttenndancePermittance> => {
  const formattedUpdateData = {
    ...updateData,
    date:
      updateData.date !== undefined
        ? updateData.date instanceof Date
          ? updateData.date.toISOString()
          : String(updateData.date)
        : updateData.date,
  };
  const collection = await db
    .update(attendancePermittance)
    .set(formattedUpdateData)
    .where(eq(attendancePermittance.id, id))
    .returning();
  return collection[0] as AttenndancePermittance;
};

const deleteAttendancePermittance = async (
  id: number
): Promise<AttenndancePermittance> => {
  const collection = await db
    .delete(attendancePermittance)
    .where(eq(attendancePermittance.id, id))
    .returning();
  return collection[0] as AttenndancePermittance;
};

export {
  getAllAttendancePermittances,
  getAttendancePermittanceById,
  createAttendancePermittance,
  updateAttendancePermittance,
  deleteAttendancePermittance
}
