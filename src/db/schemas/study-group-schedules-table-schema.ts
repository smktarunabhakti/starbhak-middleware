import {boolean, integer, pgEnum, pgTable, text, time, timestamp, uuid, varchar} from "drizzle-orm/pg-core"
import { studyGroup } from "./study-groups-table-schema";

export const studyGroupSchedules = pgTable("study_groups", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    study_groups_id: uuid("study_groups_id").references(() => studyGroup.study_groups_id),
    day_of_week: integer().notNull(),
    start_at: time("start_at").notNull(),
    end_at: time("end_at").notNull(), 
    isActive: boolean("is_active").default(true), 
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});