import { eq } from "drizzle-orm";
import { db } from "../../db";
import { schoolYear } from "../../db/schemas/school-years-table-schema";
import type { SchoolYear } from "../interfaces/school-years-interface";

const getAllSchoolYears = async (): Promise<SchoolYear[]> => {
  const collections = await db.select().from(schoolYear);
  return collections as SchoolYear[];
};

const getSchoolYearById = async (id: number): Promise<SchoolYear> => {
  const [collection] = await db
    .select()
    .from(schoolYear)
    .where(eq(schoolYear.id, id))
    .limit(1);
  return collection as SchoolYear;
};

const getSchoolYearByUuid = async (uuid: string): Promise<SchoolYear> => {
  const [collection] = await db
    .select()
    .from(schoolYear)
    .where(eq(schoolYear.school_year_id, uuid))
    .limit(1);
  return collection as SchoolYear;
};

const createSchoolYear = async (
  start: number,
  end: number,
  isActive: boolean,
): Promise<SchoolYear> => {
  const [collection] = await db
    .insert(schoolYear)
    .values({
      start: start,
      end: end,
      isActive: isActive,
    })
    .returning();
  return collection as SchoolYear;
};

const updateSchoolYear = async (
  uuid: string,
  updateData: {
    start?: number;
    end?: number;
    isActive?: boolean;
  }
): Promise<SchoolYear> => {
  const [collection] = await db
    .update(schoolYear)
    .set({
      ...updateData,
    })
    .where(eq(schoolYear.school_year_id, uuid))
    .returning();
  return collection as SchoolYear;
};

const deleteSchoolYear = async (uuid: string): Promise<SchoolYear> => {
  const [collection] = await db
    .delete(schoolYear)
    .where(eq(schoolYear.school_year_id, uuid))
    .returning();
  return collection as SchoolYear;
};

export {
  getAllSchoolYears,
  getSchoolYearById,
  getSchoolYearByUuid,
  createSchoolYear,
  updateSchoolYear,
  deleteSchoolYear,
};
