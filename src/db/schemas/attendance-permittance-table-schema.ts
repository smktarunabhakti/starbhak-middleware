import {boolean, date, integer, pgEnum, pgTable, text, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { student } from "./students-table-schema";

export const attendancePermittanceTypeEnum = pgEnum('attendancePermittanceType', ['IZIN', "SAKIT", "ALPHA"]);
export const attendancePermittanceStatusEnum = pgEnum('attendancePermittanceStatus', ["ACCEPTED", "DENIED", "PENDING"]);

export const attenndancePermittance = pgTable("attendance_permittance", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    student_id: uuid("student_id").references(() => student.student_id),
    description: text("description"),
    date: date("date"),
    type: attendancePermittanceTypeEnum(),
    status: attendancePermittanceStatusEnum(),
    teacher_id: uuid("teacher_id"),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});