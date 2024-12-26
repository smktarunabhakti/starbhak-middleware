import { eq } from "drizzle-orm";
import { db } from "../../db";
import { attenndancePermittance } from "../../db/schemas/attendance-permittance-table-schema";
import type { AttenndancePermittance, statusEnum, typeEnum } from "../interfaces/attenndance-permittance-interface";

const getAllAttenndancePermittances = async (): Promise<
  AttenndancePermittance[]
> => {
  const collections = await db.select().from(attenndancePermittance);
  return collections as AttenndancePermittance[];
};

const getAttenndancePermittanceById = async (
  id: number
): Promise<AttenndancePermittance> => {
  const collection = await db
    .select()
    .from(attenndancePermittance)
    .where(eq(attenndancePermittance.id, id))
    .limit(1);
  return collection[0] as AttenndancePermittance;
};

const createAttenndancePermittance = async (createData: {
    student_id: string
    description: string
    date: string | Date
    type: typeEnum
    status: statusEnum 
    teacher_id: string
    isActive: boolean
}): Promise<AttenndancePermittance> => {
    const formattedDate = createData.date instanceof Date ? createData.date.toISOString() : String(createData.date)

  const collection = await db
    .insert(attenndancePermittance)
    .values({
        student_id: createData.student_id,
        description: createData.description,
        type: createData.type,
        status: createData.status,
        teacher_id: createData.teacher_id,
        isActive: createData.isActive,
        date: formattedDate
    })
    .returning();

  return collection[0] as AttenndancePermittance;
};

const updateAttenndancePermittance = async (
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
    .update(attenndancePermittance)
    .set(formattedUpdateData)
    .where(eq(attenndancePermittance.id, id))
    .returning();
  return collection[0] as AttenndancePermittance;
};

const deleteAttenndancePermittance = async (
  id: number
): Promise<AttenndancePermittance> => {
  const collection = await db
    .delete(attenndancePermittance)
    .where(eq(attenndancePermittance.id, id))
    .returning();
  return collection[0] as AttenndancePermittance;
};

export {
  getAllAttenndancePermittances,
  getAttenndancePermittanceById,
  createAttenndancePermittance,
  updateAttenndancePermittance,
  deleteAttenndancePermittance
}
