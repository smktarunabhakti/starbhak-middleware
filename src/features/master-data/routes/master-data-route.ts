import { Hono } from "hono";
import studentController from "../controller/student-controller";
import teacherController from "../controller/teacher-controller";
import subjectController from "../controller/subject-controller";
import studyGroupController from "../controller/study-group-controller";

const masterDataRoute = new Hono()

masterDataRoute.route("/students", studentController)
masterDataRoute.route("/teachers", teacherController)
masterDataRoute.route("/subjects", subjectController)
masterDataRoute.route("/study-groups", studyGroupController)

export default masterDataRoute