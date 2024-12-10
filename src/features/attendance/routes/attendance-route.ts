import { Hono } from "hono";
import attendanceController from "../controller/attendance-controller";
import { jwt } from "hono/jwt";
import dataController from "../controller/data-controller";

const attendanceRoute = new Hono()

attendanceRoute.use("/*", jwt({
    secret: process.env.X_SECRET,
}))

attendanceRoute.route("/", attendanceController)
attendanceRoute.route("/data", dataController)

export default attendanceRoute