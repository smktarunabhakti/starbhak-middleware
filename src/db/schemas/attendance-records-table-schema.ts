import {boolean, date, integer, pgTable, text, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { student } from "./students-table-schema";

export const attendanceRecord = pgTable("attendance_records", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    student_id: uuid("student_id").references(() => student.student_id),
    date: date("date").defaultNow(),
    clock_in: time("clock_in").defaultNow(),
    scheduled_clock_in: time("scheduled_clock_in"),
    clock_out: time("clock_out"),
    scheduled_clock_out: time("scheduled_clock_out"),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});