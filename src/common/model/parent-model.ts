import { eq } from "drizzle-orm";
import { db } from "../../db";
import { parents } from "../../db/schemas/parents-table-schema";
import type { Parent } from "../interfaces/parent-interface";
import type { Teacher } from "../interfaces/teacher-interface";

const getAllParent = async (): Promise<Parent[]> => {
  const collections = await db.select().from(parents);
  return collections as Parent[];
};

const getParentById = async (id: number): Promise<Parent> => {
    const collection = await db.select().from(parents).where(eq(parents.id, id)).limit(1)
    return collection[0] as Parent
}

const getParentByUuid = async (uuid: string): Promise<Parent> => {
    const collection = await db.select().from(parents).where(eq(parents.parent_id, uuid)).limit(1)
    return collection[0] as Parent
}

const 
createParent = async (createData: {
    username: string,
    email: string, 
    password: string
}): Promise<Parent> => {
    const newParent = await db.insert(parents).values(createData).returning()
    return newParent[0] as Parent
}

const updateParent = async (uuid: string, updateData: {
    username?: string,
    email?: string, 
    password?: string
}): Promise<Teacher> => {
    const updatedParent = await db.update(parents).set(updateData).where(eq(parents.parent_id, uuid)).returning()
    return updatedParent[0] as Parent
}


const deleteParent = async (uuid: string): Promise<Parent> => {
    const deletedParent = await db.delete(parents).where(eq(parents.parent_id, uuid)).returning()
    return deletedParent[0] as Parent
}

export {
    getAllParent,
    getParentById,
    getParentByUuid,
    createParent,
    updateParent,
    deleteParent
}
