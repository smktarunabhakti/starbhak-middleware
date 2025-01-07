import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import type { JWTPayload } from "hono/utils/jwt/types";
import { verify } from "hono/jwt";
import { db } from "../../../db";
import { teacher } from "../../../db/schemas/teacher-table-schema";
import { eq } from "drizzle-orm";
import { schedules } from "../../../db/schemas/schedules-table-schema";
import { subject } from "../../../db/schemas/subjects-table-schema";
import { studyGroup } from "../../../db/schemas/study-groups-table-schema";

const scheduleController = new Hono();

scheduleController.post("/self/teacher", async (c) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return c.json(errorResponse("Required token!"), 400);
    }

    try {
        const _secret = process.env.X_SECRET;

        if (!_secret) {
        return c.json(
            errorResponse("Server tidak dapat memverifikasi token!"),
            500
        );
        }

        const decodedToken: JWTPayload = await verify(token, _secret);

        const { id } = decodedToken;

        const getProfile = await db.select().from(teacher).where(eq(teacher.user_id, id as string));

        if(!getProfile){
            return c.json(
                errorResponse("Server tidak dapat menemukan profile!"),
                500
            );
        }

        const profile = getProfile[0];

        const getSchedule = await db.select().from(schedules).where(eq(schedules.teacher_id, profile.teacher_id));

        let data: any[] = [];

        for (const e of getSchedule) {
            
            const findSub = await db.select().from(subject).where(eq(subject.subjects_id, e.subject_id ?? ""));
            const findStudyGroup = await db.select().from(studyGroup).where(eq(studyGroup.study_groups_id, e.study_group_id ?? ""));

            let subName, studyGroupName;

            if(findSub){
                subName = findSub[0].name;
            }

            if(findStudyGroup){
                studyGroupName = findStudyGroup[0].name;
            }

            data.push({
                ...e,
                subject_name: subName,
                study_group_name: studyGroupName,
            })
 
        }


        return c.json(successResponse("Success find self schedules data", data), 200);
    } catch (error) {
        return c.json(errorResponse("Failed find self schedules data"), 500);
    }
})

export default scheduleController;