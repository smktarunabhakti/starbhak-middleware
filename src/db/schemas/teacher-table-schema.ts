import {boolean, date, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const teacher = pgTable("teachers", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    teacher_id: uuid("teacher_id").unique(),
    DoB: date("dob"), //date of birth
    PoB: text("pob"), //place of birth
    gender: text('gender'),
    email: text("email").notNull().unique(), 
    name: text("name").notNull(),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});