import {boolean, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const subject = pgTable("subjects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    subjects_id: uuid("subjects_id").defaultRandom().unique(),
    name: text('name'),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});