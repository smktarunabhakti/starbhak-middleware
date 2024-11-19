import { db } from "../../../db";
import { users } from "../../../db/migrations/users-table-schema.ts";
import {eq} from "drizzle-orm";

interface registerResult {
    success: boolean,
    message: string
}

export const registerService = async (email: string, passwordHash: string, name: string): Promise<registerResult> => {
    await db.insert(users).values({
        email,
        passwordHash,
        name,
    });

    async function isEmailRegistered(email: string): Promise<boolean> {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result.length > 0;
    }

    if (await isEmailRegistered(email)) {
        return {
            success: false,
            message: "email sudah terdaftar" + 400
        } as registerResult;
    }

    if (!email || !name || !passwordHash) {
        return {
            success: false,
            message: "masukkan data diri anda secara lengkap"
        } as registerResult
    }

    return {
        success: true,
        message: "Berhasil registrasi"
    } as registerResult;
}