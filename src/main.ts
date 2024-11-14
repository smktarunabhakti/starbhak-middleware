import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoute from "./features/authentication/routes/auth-route";
import { db } from "./db";
import { users } from "./db/migrations/users-table-schema";
const app = new Hono();

app.use("*", logger());

app.route("/api/v1/auth", authRoute)

export default app;