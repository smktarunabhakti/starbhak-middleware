import { eq } from "drizzle-orm";
import { db } from "../../db";
import { teacher } from "../../db/schemas/teacher-table-schema";
import type { Teacher } from "../interfaces/teacher-interface";

const getAllTeachers = async (): Promise<Teacher[]> => {
  const collections = await db.select().from(teacher);
  return collections as Teacher[];
};

const getTeacherById = async (id: number): Promise<Teacher> => {
  const [collection] = await db
    .select()
    .from(teacher)
    .where(eq(teacher.id, id))
    .limit(1);
  return collection as Teacher;
};

const getTeacherByUuid = async (uuid: string): Promise<Teacher> => {
  const [collection] = await db
    .select()
    .from(teacher)
    .where(eq(teacher.teacher_id, uuid))
    .limit(1);
  return collection as Teacher;
};

const createTeacher = async (
  teacher_id: string,
  name: string,
  DoB: Date | string,
  PoB: string,
  gender: string,
  email: string,
  isActive: boolean,
  createdAt: Date
): Promise<Teacher> => {
    const formattedDoB = DoB instanceof Date ? DoB.toISOString() : String(DoB)
  const [collection] = await db
    .insert(teacher)
    .values({
      teacher_id: teacher_id,
      name: name,
      DoB: formattedDoB,
      PoB: PoB,
      gender: gender,
      email: email,
      isActive: isActive,
      createdAt: createdAt,
    })
    .returning();
  return collection as Teacher;
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
        DoB: updateData.DoB instanceof Date ? updateData.DoB.toISOString() : String(updateData.DoB)
    }
  const [collection] = await db
    .update(teacher)
    .set(formattedUpdateData)
    .where(eq(teacher.teacher_id, uuid))
    .returning();
  return collection as Teacher;
};

const deleteTeacher = async (uuid: string): Promise<Teacher> => {
  const [collection] = await db
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
