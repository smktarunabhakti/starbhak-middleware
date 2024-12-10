import { eq } from "drizzle-orm";
import { db } from "../../db";
import { academicCalendar } from "../../db/schemas/academic-calenders-table-schema";
import type { AcademicCalendar } from "../interfaces/academic-calendar-interface";

const getAllAcademicCalendar = async (): Promise<AcademicCalendar[]> => {
  const collections = await db.select().from(academicCalendar);
  return collections as AcademicCalendar[];
};

const getAcademicCalendarById = async (
  id: number
): Promise<AcademicCalendar> => {
  const collection = await db
    .select()
    .from(academicCalendar)
    .where(eq(academicCalendar.id, id))
    .limit(1);
  return collection as AcademicCalendar;
};

const getAcademicCalendarByUuid = async (
  uuid: string
): Promise<AcademicCalendar> => {
  const collection = await db
    .select()
    .from(academicCalendar)
    .where(eq(academicCalendar.academic_calendars_id, uuid))
    .limit(1);
  return collection as AcademicCalendar;
};

const createAcademicCalendar = async (createData: {
  name: string;
  start_date: string;
  end_date: string;
  location: string;
  is_holiday: boolean;
  is_celebrated_at_school: boolean;
  start_at: string;
  end_at: string;
  isActive: boolean;
}): Promise<AcademicCalendar> => {
  const newAcademicCalendar = await db
    .insert(academicCalendar)
    .values(createData)
    .returning();
  return newAcademicCalendar as AcademicCalendar;
};

const updateAcademicCalendar = async (
  uuid: string,
  updateData: {
    name: string;
    start_date: string;
    end_date: string;
    location: string;
    is_holiday: boolean;
    is_celebrated_at_school: boolean;
    start_at: string;
    end_at: string;
    isActive: boolean;
  }
): Promise<AcademicCalendar> => {
  const updatedAcademicCalendar = await db
    .update(academicCalendar)
    .set(updateData)
    .where(eq(academicCalendar.academic_calendars_id, uuid))
    .returning();
  return updatedAcademicCalendar as AcademicCalendar;
};

const deleteAcademicCalendar = async (
  uuid: string
): Promise<AcademicCalendar> => {
  const deletedAcademicCalendar = await db
    .delete(academicCalendar)
    .where(eq(academicCalendar.academic_calendars_id, uuid))
    .returning();
  return deleteAcademicCalendar as AcademicCalendar;
};

export {
  getAllAcademicCalendar,
  getAcademicCalendarById,
  getAcademicCalendarByUuid,
  createAcademicCalendar,
  updateAcademicCalendar,
  deleteAcademicCalendar,
};
