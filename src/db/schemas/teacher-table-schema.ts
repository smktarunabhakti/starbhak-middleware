import {boolean, date, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { users } from "./users-table-schema";

export const teacher = pgTable("teachers", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    teacher_id: varchar("teacher_id").notNull().unique(),
    DoB: date("dob"), //date of birth
    PoB: text("pob"), //place of birth
    gender: text('gender'),
    email: text("email").notNull().unique(), 
    name: text("name").notNull(),
    user_id: uuid("user_id"),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});