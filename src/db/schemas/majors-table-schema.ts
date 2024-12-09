import {boolean, integer, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { teacher } from "./teacher-table-schema";

export const majors = pgTable("majors", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    majors_id: uuid("majors_id").defaultRandom().unique(),
    majors_head_id: uuid("majors_head_id"), //store teacher id for kaprog wkwkwkwk
    name: varchar("name").notNull(),
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});