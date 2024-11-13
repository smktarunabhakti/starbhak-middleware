import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoute from "./features/authentication/routes/auth-route";
const app = new Hono();

app.use("*", logger());


app.get("/", (c) => c.text('Hono!'))

app.route("/api/v1/auth", authRoute)
app.get("/api/v1/auth/login", (c) => c.text("Access login"));

export default app;