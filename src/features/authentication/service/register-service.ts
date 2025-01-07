import { db } from "../../../db";
import { users } from "../../../db/schemas/users-table-schema.ts";
import {eq} from "drizzle-orm";
import byc from "bcrypt";
import { createUser } from "../../../common/model/user-model.ts";
import { roles } from "../../../db/schemas/roles-table-schema.ts";
import type { User } from "../../../common/interfaces/user-interface.ts";

interface registerResult {
    success: boolean,
    message: string,
    data?: User,
}

export const registerService = async (email: string, passwordHash: string, name: string, role: string): Promise<registerResult> => {

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

    const roleCol = await db.select().from(roles).where(eq(roles.name, role))

    if(!roleCol){
        return {
            success: false,
            message: "Role tidak ada!"
        } as registerResult
    }

    const createdUser = await createUser(
        email,
        passwordHash,
        name,
        roleCol[0].id,
    )

    return {
        success: true,
        message: "Berhasil registrasi",
        data: createdUser,
    } as registerResult;
}