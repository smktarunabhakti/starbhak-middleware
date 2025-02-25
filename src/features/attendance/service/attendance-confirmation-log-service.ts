import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { attendanceConfirmationLogs } from "../../../db/schemas/attendance-confirmation-log-tables-schema";
import { schedules } from "../../../db/schemas/schedules-table-schema";
import { teacher } from "../../../db/schemas/teacher-table-schema";
import { studyGroup } from "../../../db/schemas/study-groups-table-schema";

export async function createRecordLog(data: {
  teacherId?: string;
  date?: string;
  studyGroupId?: string;
}) {
  try {
    await db.insert(attendanceConfirmationLogs).values(data);

    return true;
  } catch (error) {
    throw error;
  }
}

export async function fetchRecordLogs() {
  try {
    const result = await db.select().from(attendanceConfirmationLogs);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function generateDataTeacherNotConfirming() {
  try {
    const today = new Date();

    const result = await db
      .select()
      .from(attendanceConfirmationLogs)
      .where(eq(attendanceConfirmationLogs.date, today.toISOString()));

    const mapRecordByTeacher = result.reduce((acc: any, curr) => {
      if (!acc[curr.teacherId!]) {
        acc[curr.teacherId!] = [];
      }

      if (!acc[curr.teacherId!].includes(curr.studyGroupId)) {
        acc[curr.teacherId!].push(curr.studyGroupId);
      }

      return acc;
    }, {});

    // get today schedule

    const todaySchedule = await db
      .select()
      .from(schedules)
      .where(eq(schedules.day_of_week, today.getDay()));

    const mapScheduleByTeacher = todaySchedule.reduce((acc: any, curr) => {

      if (!acc[curr.teacher_id!]) {
        acc[curr.teacher_id!] = [];
      }

      if (!acc[curr.teacher_id!].includes(curr.study_group_id)) {
        acc[curr.teacher_id!].push(curr.study_group_id);
      }
      return acc;
    }, {});

    const teacherNotConfirming = await Object.keys(mapScheduleByTeacher).reduce(
      async (acc: any, curr) => {
        let notConfirming;

        if(mapRecordByTeacher[curr] != null){
            notConfirming = mapScheduleByTeacher[curr].filter(
                (studyGroupId: string) =>
                  !mapRecordByTeacher[curr].includes(studyGroupId)
              ); 
        }else{
            notConfirming = mapScheduleByTeacher[curr];
        }

        if (notConfirming.length != 0) {
          let teacherProfile = await db
            .select()
            .from(teacher)
            .where(eq(teacher.teacher_id, curr as string))
            .limit(1);

          let notConfirmingNamesGet = notConfirming.map(
            async (studyGroupId: string) => {
              let group = await db
                .select()
                .from(studyGroup)
                .where(eq(studyGroup.study_groups_id, studyGroupId))
                .limit(1);

              return `${group[0].year} ${group[0].name}`;
            }
          );

          const notConfirmingNames = await Promise.all(notConfirmingNamesGet);

          acc.push({
            teacherId: curr,
            teacherName: teacherProfile[0].name,
            studyGroups: notConfirmingNames,
          });
        }

        return acc;
      },
      []
    );

    return teacherNotConfirming;
  } catch (error) {
    throw error;
  }
}
