import { Hono } from "hono";
import studentController from "../controller/student-controller";

const masterDataRoute = new Hono()

masterDataRoute.route("/students", studentController)

export default masterDataRoute