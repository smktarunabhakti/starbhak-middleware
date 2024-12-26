import {integer, pgTable, text, timestamp} from "drizzle-orm/pg-core";

export const resetPasswordSession = pgTable("reset_password_session", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    otp: text().notNull(),
    token: text().notNull(),
    expire_at: timestamp().notNull(),
    email: text().notNull(),
});  