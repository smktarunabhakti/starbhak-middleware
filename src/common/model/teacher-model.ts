import { ConsoleLogWriter, eq } from "drizzle-orm";
import { db } from "../../db";
import { teacher } from "../../db/schemas/teacher-table-schema";
import type { Teacher } from "../interfaces/teacher-interface";

const getAllTeachers = async (): Promise<Teacher[]> => {
  try {
    const collections = await db.select().from(teacher);
    return collections as Teacher[];
  } catch (error: any) {
    throw error.message;
  }
  
};

const getTeacherById = async (id: number): Promise<Teacher> => {
  const collection = await db
    .select()
    .from(teacher)
    .where(eq(teacher.id, id))
    .limit(1);

  return collection[0] as Teacher;
};

const getTeacherByUuid = async (uuid: string): Promise<Teacher> => {
  const collection = await db
    .select()
    .from(teacher)
    .where(eq(teacher.teacher_id, uuid))
    .limit(1);
  return collection[0] as Teacher;
};

const createTeacher = async (createData: {
  name: string;
  DoB?: Date | string;
  PoB?: string;
  gender?: string;
  userId?: string;
  email: string;
  isActive: boolean;
  teacherId: string;
}): Promise<Teacher> => {
  
  console.log("[TeacherModel] createData: ", createData);

  let formattedDoB =
    createData.DoB instanceof Date
      ? createData.DoB.toISOString()
      : String(createData.DoB);

  console.log("[TeacherModel] DoB: ", formattedDoB);

  // console.log(createData)

  try {
    const collection = await db
    .insert(teacher)
    .values({
      name: createData.name,
      DoB: formattedDoB,
      PoB: createData.PoB,
      teacher_id: createData.teacherId,
      gender: createData.gender,
      email: createData.email,
      user_id: createData.userId,
      isActive: createData.isActive,
    })
    .returning();
  
    return collection as Teacher;
  } catch (error:any) {
    throw error;
  }


};

const updateTeacher = async (
  uuid: string,
  updateData: {
    name?: string;
    DoB?: Date | string;
    PoB?: string;
    gender?: string;
    email?: string;
    isActive?: boolean;
    updatedAt?: Date;
  }
): Promise<Teacher> => {
  const formattedUpdateData = {
    ...updateData,
    DoB:
      updateData.DoB !== undefined
        ? updateData.DoB instanceof Date
          ? updateData.DoB.toISOString()
          : String(updateData.DoB)
        : updateData.DoB,
  };
  const collection = await db
    .update(teacher)
    .set(formattedUpdateData)
    .where(eq(teacher.teacher_id, uuid))
    .returning();
  return collection[0] as Teacher;
};

const deleteTeacher = async (uuid: string): Promise<Teacher> => {
  const collection = await db
    .delete(teacher)
    .where(eq(teacher.teacher_id, uuid))
    .returning();
  return collection as Teacher;
};

export {
  getAllTeachers,
  getTeacherById,
  getTeacherByUuid,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
