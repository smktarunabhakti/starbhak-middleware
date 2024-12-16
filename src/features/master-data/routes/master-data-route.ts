import { Hono } from "hono";
import studentController from "../controller/student-controller";
import teacherController from "../controller/teacher-controller";
import subjectController from "../controller/subject-controller";
import studyGroupController from "../controller/study-group-controller";
import schoolYearController from "../controller/school-year-controller";
import majorsController from "../controller/majors-controller";
import academicCalendarController from "../controller/academic-calendar";
import parentController from "../controller/parent-controller";
import parentStudentController from "../controller/parent-student-controller";

const masterDataRoute = new Hono()

masterDataRoute.route("/students", studentController)
masterDataRoute.route("/teachers", teacherController)
masterDataRoute.route("/subjects", subjectController)
masterDataRoute.route("/study-groups", studyGroupController)
masterDataRoute.route("/school-year", schoolYearController)
masterDataRoute.route("/majors", majorsController)
masterDataRoute.route("/academic-calendar", academicCalendarController)
masterDataRoute.route("/parents", parentController)
masterDataRoute.route("/parent-student", parentStudentController)

export default masterDataRoute