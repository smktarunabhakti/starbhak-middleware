import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoute from "./features/authentication/routes/auth-route";
import attendanceRoute from "./features/attendance/routes/attendance-route";
import masterDataRoute from "./features/master-data/routes/master-data-route";
import { cors } from "hono/cors";
const app = new Hono();

app.use("*", logger());
app.use("*", cors({
  origin: "*",
}))

app.route("/api/v1/auth", authRoute)
app.route("/api/v1/attendance", attendanceRoute)
app.route("/api/v1/master-data", masterDataRoute)

app.get("/", (c) => {
  return c.text("hallo");
});

export default app;