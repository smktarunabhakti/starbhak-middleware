import {boolean, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const schoolYear = pgTable("school_years", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    school_year_id: uuid("school_year_id").defaultRandom().unique(),
    start: integer().notNull(),
    end: integer().notNull(),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});