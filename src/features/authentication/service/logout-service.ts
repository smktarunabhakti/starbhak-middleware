import { db } from "../../../db";
import { users } from "../../../db/schemas/users-table-schema.ts";
import {eq} from "drizzle-orm"

export const removeToken = async (userId: string): Promise<boolean> => {
    try {
        // Update the user record to set the token to null
        await db
            .update(users)
            .set({refreshTokenHash: null})
            .where(eq(users.id, userId));  // Find by userId
        return true;
    } catch (error) {
        console.error('Error removing token:', error);
        return false;
    }
}