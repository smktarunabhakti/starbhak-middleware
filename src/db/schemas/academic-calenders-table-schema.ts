import {boolean, date, integer, pgTable, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const academicCalendar = pgTable("academic_calendars", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    academic_calendars_id: uuid("academic_calendars_id").defaultRandom().unique(),
    name: varchar("name"),
    start_date: date("start_date"),
    end_date: date("end_date"),
    location: varchar('location'),
    isHoliday: boolean("is_holiday").notNull().default(false),
    isCelebratedAtSchool: boolean("is_celebrated_at_school").notNull().default(false),
    start_at: time("start_at"),
    end_at: time("end_at"), 
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});