import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import {users} from "./users-table-schema.ts";
import {roles} from "./roles-table-schema.ts";

export const userRoles = pgTable("user_roles", {
    userId: uuid("user_id").references(() => users.id),
    roleId: uuid("role_id").references(() => roles.id),
    createdAt: timestamp("created_at").defaultNow()
});