import { Hono } from "hono";
import attendanceController from "../controller/attendance-controller";
import dataController from "../controller/data-controller";
import attendancePermittanceController from "../controller/attendance-permittance-controller";
import attendanceReportsController from "../controller/attendance-reports-controller";

const attendanceRoute = new Hono()

// attendanceRoute.use("/*", jwt({
//     secret: process.env.X_SECRET,
// }))

attendanceRoute.route("/", attendanceController)
attendanceRoute.route("/data", dataController)
attendanceRoute.route("/attendance-permittance", attendancePermittanceController)
attendanceRoute.route("/reports", attendanceReportsController)

export default attendanceRoute