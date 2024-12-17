import { eq } from "drizzle-orm";
import { db } from "../../db";
import { student } from "../../db/schemas/students-table-schema";
import type { Student } from "../interfaces/student-interface";

const getAllStudents = async (): Promise<Student[] | null> => {
  const collections = await db.select().from(student);
  return collections.length > 0 ? collections as Student[] : null;
};

const getStudentById = async (id: number): Promise<Student | null> => {
  const collection = await db
    .select()
    .from(student)
    .where(eq(student.id, id))
    .limit(1);
  return collection.length > 0 ? collection as Student : null;
};

const getStudentByUuid = async (uuid: string): Promise<Student | null> => {

  const collection = await db
    .select()
    .from(student)
    .where(eq(student.student_id, uuid))
    .limit(1);
  
  return collection.length > 0 ? collection as Student : null;
};

const createStudent = async (createData: { 
  study_groups_id: string;
  nisn: string;
  nipd: string;
  nik: string;
  rfid: string;
  gender: string;
  email: string;
  name: string;
  DoB: Date | string;
  PoB: string;
  starting_school_years_id: string;
  user_id: string;
  isActive: boolean;
}): Promise<Student> => {
    let formattedDoB =
      createData.DoB instanceof Date
        ? createData.DoB.toISOString()
        : String(createData.DoB);
  
  const collection = await db
    .insert(student)
    .values({
      study_groups_id: createData.study_groups_id!,
      nisn: createData.nisn!,
      nipd: createData.nipd!,
      nik: createData.nik!,
      rfid: createData.rfid!,
      gender: createData.gender!,
      email: createData.email!,
      name: createData.name!,
      DoB: formattedDoB,
      PoB: createData.PoB!,
      starting_school_years: createData.starting_school_years_id!,
      user_id: createData.user_id!,
      isActive: createData.isActive!,
    })
    .returning();
  return collection as Student;
};

const updateStudent = async (
  uuid: string,
  updateData: {
    nisn?: string;
    nipd?: string;
    nik?: string;
    rfid?: string;
    name?: string;
    DoB?: Date | string;
    PoB?: string;
    gender?: string;
    email?: string;
    starting_school_years_id?: string;
    isActive?: boolean;
  }
): Promise<Student> => {
    console.info("[Model] updateData: ", updateData);
    
    const formattedUpdateData = {
      ...updateData,
      DoB:
        updateData.DoB !== undefined
          ? updateData.DoB instanceof Date
            ? updateData.DoB.toISOString()
            : String(updateData.DoB)
          : updateData.DoB,
    };

    console.info("[Model] formattedUpdateData: ", formattedUpdateData);

  const collection = await db
    .update(student)
    .set(formattedUpdateData)
    .where(eq(student.student_id, uuid))
    .returning();
  return collection as Student;
};

const deleteStudent = async (uuid: string): Promise<Student> => {
  const collection = await db
    .delete(student)
    .where(eq(student.student_id, uuid))
    .returning();
  return collection as Student;
};

export {
  getAllStudents,
  getStudentById,
  getStudentByUuid,
  createStudent,
  updateStudent,
  deleteStudent,
};
