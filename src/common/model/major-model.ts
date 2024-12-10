import { eq } from "drizzle-orm";
import { db } from "../../db";
import { majors } from "../../db/schemas/majors-table-schema";
import type { Major } from "../interfaces/major-interface";

const getAllMajors = async (): Promise<Major[]> => {
  const collections = await db.select().from(majors);
  return collections as Major[];
};

const getMajorById = async (id: number): Promise<Major> => {
  const [collection] = await db
    .select()
    .from(majors)
    .where(eq(majors.id, id))
    .limit(1);
  return collection as Major;
};

const getMajorByUuid = async (uuid: string): Promise<Major> => {
  const [collection] = await db
    .select()
    .from(majors)
    .where(eq(majors.majors_id, uuid))
    .limit(1);
  return collection as Major;
};

const createMajor = async (createData: {
  name: string,
  majors_head_id: string
}): Promise<Major> => {
  const [collection] = await db
    .insert(majors)
    .values({
      name: createData.name,
      majors_head_id: createData.majors_head_id,
    })
    .returning();
  return collection as Major;
};

const updateMajor = async (
  uuid: string,
  updateData: {
    majors_head_id?: string | number;
    name?: string;
    isActive?: boolean;
  }
): Promise<Major> => {
  const formattedUpdateData = {
    ...updateData,
    majors_head_id:
      updateData.majors_head_id === undefined
        ? null
        : String(updateData.majors_head_id),
  };
  const [collection] = await db
    .update(majors)
    .set({
      ...formattedUpdateData,
    })
    .where(eq(majors.majors_id, uuid))
    .returning();
  return collection as Major;
};

const deleteMajor = async (uuid: string): Promise<Major> => {
  const [collection] = await db
    .delete(majors)
    .where(eq(majors.majors_id, uuid))
    .returning();
  return collection as Major;
};

export {
  getAllMajors,
  getMajorById,
  getMajorByUuid,
  createMajor,
  updateMajor,
  deleteMajor,
};