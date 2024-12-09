import {boolean, integer, pgEnum, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { schoolYear } from "./school-years-table-schema";
import { teacher } from "./teacher-table-schema";
import { majors } from "./majors-table-schema";

export const studyGroupYearEnum = pgEnum('year', ['X', "XI", "XII"]);

export const studyGroup = pgTable("study_groups", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    study_groups_id: uuid("study_groups_id").defaultRandom().unique(),
    starting_school_years_id: uuid("starting_school_years_id").references(() => schoolYear.school_year_id),
    name: text("name").notNull(),
    homeroom_teacher_id: uuid("homeroom_teacher_id").references(() => teacher.teacher_id),
    counseling_teacher_id: uuid("counseling_teacher_id").references(() => teacher.teacher_id),
    year: studyGroupYearEnum(),
    major_id: uuid("major_id").references(() => majors.majors_id),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});