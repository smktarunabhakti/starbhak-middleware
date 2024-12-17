import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const parents = pgTable("parents", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  parent_id: uuid("parent_id").defaultRandom().unique(),
  username: varchar("username"),
  user_id: uuid("user_id"),
  email: varchar("email").notNull().unique(),
  password: varchar("password"),
});