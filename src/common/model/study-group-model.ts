import { eq } from "drizzle-orm";
import { db } from "../../db";
import { studyGroup } from "../../db/schemas/study-groups-table-schema";
import type { StudyGroupSchedule } from "../interfaces/study-group-schedule-interface";

const getAllStudyGroups = async (): Promise<StudyGroupSchedule[]> => {
  const collections = await db.select().from(studyGroup);
  return collections as StudyGroupSchedule[];
};

const getStudyGroupById = async (id: number): Promise<StudyGroupSchedule> => {
  const [collection] = await db
    .select()
    .from(studyGroup)
    .where(eq(studyGroup.id, id))
    .limit(1);
  return collection as StudyGroupSchedule;
};

const getStudyGroupByUuid = async (
  uuid: string
): Promise<StudyGroupSchedule> => {
  const [collection] = await db
    .select()
    .from(studyGroup)
    .where(eq(studyGroup.study_groups_id, uuid))
    .limit(1);
  return collection as StudyGroupSchedule;
};

const createStudyGroup = async (
  study_groups_id: string,
  starting_school_years_id: string,
  name: string,
  homeroom_teacher_id: string,
  counseling_teacher_id: string,
  year: "X" | "XI" | "XII",
  major_id: string,
  isActive: boolean,
): Promise<StudyGroupSchedule> => {
  const [collection] = await db
    .insert(studyGroup)
    .values({
      study_groups_id: study_groups_id,
      starting_school_years_id: starting_school_years_id,
      name: name,
      homeroom_teacher_id: homeroom_teacher_id,
      counseling_teacher_id: counseling_teacher_id,
      year: year,
      major_id: major_id,
      isActive: isActive,
    })
    .returning();
  return collection as StudyGroupSchedule;
};

const updateStudyGroup = async (
  uuid: string,
  updateData: {
    starting_school_years_id?: string;
    name?: string;
    homeroom_teacher_id?: string;
    counseling_teacher_id?: string;
    year?: "X" | "XI" | "XII";
    major_id?: string;
    isActive?: boolean;
  }
): Promise<StudyGroupSchedule> => {
  const [collection] = await db
    .update(studyGroup)
    .set(updateData)
    .where(eq(studyGroup.study_groups_id, uuid))
    .returning();
  return collection as StudyGroupSchedule;
};

const deleteStudyGroup = async (uuid: string): Promise<StudyGroupSchedule> => {
  const [collection] = await db
    .delete(studyGroup)
    .where(eq(studyGroup.study_groups_id, uuid))
    .returning();
  return collection as StudyGroupSchedule;
};

export {
  getAllStudyGroups,
  getStudyGroupById,
  getStudyGroupByUuid,
  createStudyGroup,
  updateStudyGroup,
  deleteStudyGroup,
};
