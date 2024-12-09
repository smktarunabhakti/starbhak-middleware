import { db } from "../../../db";
import { users } from "../../../db/schemas/users-table-schema.ts";
import {eq} from "drizzle-orm";
import byc from "bcrypt";
import { createUser } from "../../../common/model/user-model.ts";

interface registerResult {
    success: boolean,
    message: string
}

export const registerService = async (email: string, passwordHash: string, name: string): Promise<registerResult> => {

    async function isEmailRegistered(email: string): Promise<boolean> {
        const result = await db.select().from(users).where(eq(users.email, email));
        return result.length > 0;
    }

    if (await isEmailRegistered(email)) {
        return {
            success: false,
            message: "email sudah terdaftar"
        } as registerResult;
    }

    if (!email || !name || !passwordHash) {
        return {
            success: false,
            message: "masukkan data diri anda secara lengkap"
        } as registerResult
    }

    console.log("runned")

    await createUser(
        email,
        passwordHash,
        name,
        "7f9cce88-007c-4e63-aafa-bc349974805f"
    )

    return {
        success: true,
        message: "Berhasil registrasi"
    } as registerResult;
}