import { pgTable, uuid, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import {roles} from "./roles-table-schema.ts";

export const permissions = pgTable("permissions", {
    id: uuid("id").defaultRandom().primaryKey(), // Unique permission ID
    name: text("name").notNull(), // Permission name, e.g., 'VIEW_ACADEMIC_RECORDS'
    description: text("description"), // Description of the permission
    createdAt: timestamp("created_at").defaultNow()
});

// src/db/schema/role_permissions.ts
export const rolePermissions = pgTable("role_permissions", {
    roleId: uuid("role_id").references(() => roles.id),
    permissionId: uuid("permission_id").references(() => permissions.id),
    createdAt: timestamp("created_at").defaultNow()
});