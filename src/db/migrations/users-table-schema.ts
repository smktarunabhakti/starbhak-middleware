import {boolean, integer, pgTable, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {roles} from "./roles-table-schema.ts";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(), // UUID for unique user ID
    email: text("email").notNull().unique(), // Unique user email
    passwordHash: text("password_hash").notNull(), // Store hashed password for security
    name: text("name").notNull(), // Full name of the user
    roleId: uuid("role_id").references(() => roles.id), // Foreign key linking to roles table
    isActive: boolean("is_active").default(true), // Indicates if user account is active
    lastLoginAt: timestamp("last_login_at"), // Tracks last login
    refreshTokenHash: text("refresh_token_hash"), // Optional: hashed refresh token for re-auth
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});