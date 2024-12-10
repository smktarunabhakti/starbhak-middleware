import { eq } from "drizzle-orm";
import { db } from "../../db";
import { subject } from "../../db/schemas/subjects-table-schema";
import type { Subject } from "../interfaces/subject-interface";

const getAllSubjects = async (): Promise<Subject[]> => {
  const collections = await db.select().from(subject);
  return collections as Subject[];
};

const getSubjectById = async (id: number): Promise<Subject> => {
  const [collection] = await db
    .select()
    .from(subject)
    .where(eq(subject.id, id))
    .limit(1);
  return collection as Subject;
};

const getSubjectByUuid = async (uuid: string): Promise<Subject> => {
  const [collection] = await db
    .select()
    .from(subject)
    .where(eq(subject.subjects_id, uuid))
    .limit(1);
  return collection as Subject;
};

const createSubject = async (createData: {
  name: string,
  isActive: boolean,
}): Promise<Subject> => {
  const [collection] = await db
    .insert(subject)
    .values({
      name: createData.name,
      isActive: createData.isActive,
    })
    .returning();
  return collection as Subject;
};

const updateSubject = async (
  uuid: string,
  updateData: {
    name?: string;
    isActive?: boolean;
  }
): Promise<Subject> => {
  const [collection] = await db
    .update(subject)
    .set(updateData)
    .where(eq(subject.subjects_id, uuid))
    .returning();
  return collection as Subject;
};

const deleteSubject = async (uuid: string): Promise<Subject> => {
  const [collection] = await db
    .delete(subject)
    .where(eq(subject.subjects_id, uuid))
    .returning();
  return collection as Subject;
};

export {
  getAllSubjects,
  getSubjectById,
  getSubjectByUuid,
  createSubject,
  updateSubject,
  deleteSubject,
};
