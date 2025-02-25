import { date, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const attendanceConfirmationLogs = pgTable("attendance_confirmation_log", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    teacherId: varchar("name"),
    date: date("date"),
    studyGroupId: uuid("study_group_id"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});