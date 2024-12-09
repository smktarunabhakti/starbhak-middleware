import {boolean, integer, pgTable, text, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { teacher } from "./teacher-table-schema";
import { subject } from "./subjects-table-schema";
import { studyGroup } from "./study-groups-table-schema";

export const schedules = pgTable("schedules", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    schedules_id: uuid("schedules_id").defaultRandom().unique(),
    teacher_id: uuid("teacher_id").references(() => teacher.teacher_id),
    subject_id: uuid("subject_id").references(() => subject.subjects_id),
    study_group_id: uuid("study_group_id").references(() => studyGroup.study_groups_id),
    day_of_week: integer().notNull(),
    start_at: time("start_at").notNull(),
    end_at: time("end_at").notNull(), 
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});