import { db } from "../../../db";
import { users } from "../../../db/migrations/users-table-schema.ts";

interface updateResult {
    success: boolean,
    message: string
}

export const UpdateService = async (email: string, passwordHash: string, name: string): Promise<updateResult> => {
    await db.update(users).set({
        email,
        passwordHash,
        name,
    });
    
    return {
        success: true,
        message: "Berhasil update"
    } as updateResult;
}