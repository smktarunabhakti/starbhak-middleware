import {boolean, date, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { schoolYear } from "./school-years-table-schema";
import { studyGroup } from "./study-groups-table-schema";

export const student = pgTable("students", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    student_id: uuid("student_id").defaultRandom().unique(),
    study_groups_id: uuid("study_groups_id").references(() => studyGroup.study_groups_id),
    nisn: text("nisn").unique(),
    nipd: text('nipd').unique(),
    nik: text('nik').unique(),
    rfid: text("rfid").unique(),
    gender: text('gender'),
    email: text("email").notNull().unique(), 
    name: text("name").notNull(),
    DoB: date("dob"), 
    PoB: text("pob"),
    starting_school_years: uuid("starting_school_years_id").references(() => schoolYear.school_year_id),
    user_id: uuid("user_id"),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});