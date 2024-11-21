import { eq } from "drizzle-orm";
import { db } from "../../db";
import { permissions } from "../../db/migrations/permissions-table-schema";
import type { Permission } from "../interfaces/permission-interface";

const getAllPermissions = async (): Promise<Permission[]> => {
  const collections = await db.select().from(permissions);
  return collections as Permission[];
};

const getPermissionById = async (id: string): Promise<Permission> => {
  const permission = await db
    .select()
    .from(permissions)
    .where(eq(permissions.id, id))
    .limit(1);
  return permission[0] as Permission;
};

const createPermission = async (
  id: string,
  name: string,
  description: string,
  createdAt: Date
): Promise<Permission> => {
  const newPermission = await db
    .insert(permissions)
    .values({
      id,
      name,
      description,
      createdAt,
    })
    .returning();
  return newPermission[0] as Permission;
};

const updatePermission = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    createdAt?: Date;
  }
): Promise<Permission> => {
  const updatedPermission = await db
    .update(permissions)
    .set(data)
    .where(eq(permissions.id, id))
    .returning();
  return updatedPermission[0] as Permission;
};

const deletePermission = async (id: string): Promise<Permission> => {
  const deletedPermission = await db
    .delete(permissions)
    .where(eq(permissions.id, id))
    .returning();
  return deletedPermission[0] as Permission;
};

export {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
};