import { eq } from "drizzle-orm";
import { db } from "../../db";
import { student } from "../../db/schemas/students-table-schema";
import type { Student } from "../interfaces/student-interface";

const getAllStudents = async (): Promise<Student[]> => {
  const collections = await db.select().from(student);
  return collections as Student[];
};

const getStudentById = async (id: number): Promise<Student> => {
  const [collection] = await db
    .select()
    .from(student)
    .where(eq(student.id, id))
    .limit(1);
  return collection as Student;
};

const getStudentByUuid = async (uuid: string): Promise<Student> => {
  const [collection] = await db
    .select()
    .from(student)
    .where(eq(student.student_id, uuid))
    .limit(1);
  return collection as Student;
};

const createStudent = async (
  nisn: string,
  nipd: string,
  nik: string,
  rfid: string,
  name: string,
  DoB: Date | string,
  PoB: string,
  gender: string,
  email: string,
  starting_school_years_id: string,
  isActive: boolean,
): Promise<Student> => {
    let formattedDoB = DoB instanceof Date ? DoB.toISOString() : String(DoB)

  const [collection] = await db
    .insert(student)
    .values({
      nisn: nisn,
      nipd: nipd,
      nik: nik,
      rfid: rfid,
      name: name,
      DoB: formattedDoB,
      PoB: PoB,
      gender: gender,
      email: email,
      starting_school_years: starting_school_years_id,
      isActive: isActive,
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
    const formattedUpdateData = {
        ...updateData,
        DoB: updateData.DoB instanceof Date ? updateData.DoB.toISOString() : String(updateData.DoB) 
    }
  const [collection] = await db
    .update(student)
    .set(formattedUpdateData)
    .where(eq(student.student_id, uuid))
    .returning();
  return collection as Student;
};

const deleteStudent = async (uuid: string): Promise<Student> => {
  const [collection] = await db
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
