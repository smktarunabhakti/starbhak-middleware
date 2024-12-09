import { Hono } from "hono";
import attendanceController from "../controller/attendance-controller";

const attendanceRoute = new Hono()

attendanceRoute.route("/", attendanceController)

export default attendanceRoute