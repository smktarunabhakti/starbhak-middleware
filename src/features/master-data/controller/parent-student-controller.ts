import { Hono } from "hono";
import { errorResponse, successResponse } from "../../../common/utils/api-response";
import { db } from "../../../db";
import { parentStudent } from "../../../db/schemas/parent-student-schema";

const parentStudentController =  new Hono()

parentStudentController.post("/", async (c) => {
    const {parentId, studentId} = await c.req.json()

    if (!parentId || !studentId) {
        return c.json(
            errorResponse("parentId dan studentId dibutuhkan!"),
            400
        )
    }

    try {
        const newParentStudent = await db.insert(parentStudent).values({
            parentId: parentId,
            studenId: studentId
        }).returning()

        return c.json(
            successResponse("Berhasil menambahkan relasi Orangtua dan Murid!", newParentStudent),
            200
        )
    } catch (error) {
        return c.json(
            successResponse("Gagal tak diketahui!"),
            500
        )
    }
})

export default parentStudentController