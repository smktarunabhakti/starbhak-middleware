import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { parents } from "./parents-table-schema";
import { student } from "./students-table-schema";

export const parentStudent = pgTable("parent_student", {
    parentId: uuid("parent_id").references(() => parents.id),
    studenId: uuid("student_id").references(() => student.student_id),
    createdAt: timestamp("created_at").defaultNow()
})