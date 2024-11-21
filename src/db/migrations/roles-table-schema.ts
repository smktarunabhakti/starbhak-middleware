import { pgTable, uuid, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
    id: uuid("id").defaultRandom().primaryKey(), // UUID for unique role ID
    name: text("name").notNull(),  // Role name, e.g., 'Yayasan', 'Kepala Sekolah'
    description: text("description"), // Description of the role
    domain: text("domain").notNull(), // Domain or access URL for the role
    createdAt: timestamp("created_at").defaultNow() // Auto-set timestamp
});