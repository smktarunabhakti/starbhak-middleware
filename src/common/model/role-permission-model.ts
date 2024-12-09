import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { rolePermissions } from "../../db/schemas/permissions-table-schema";
import type { rolePermission } from "../interfaces/rolePermission-interface";

const getAllRolesPermissions = async (): Promise<rolePermission[]> => {
  const collections = await db.select().from(rolePermissions);
  return collections as rolePermission[];
};

const getRolePermissionByRoleId = async (
  roleId: string
): Promise<rolePermission> => {
  const rolePermission = await db
    .select()
    .from(rolePermissions)
    .where(eq(rolePermissions.roleId, roleId))
    .limit(1);
  return rolePermission[0] as rolePermission;
};

const getRolePermissionByPermissionId = async (
  permissionId: string
): Promise<rolePermission> => {
  const rolePermission = await db
    .select()
    .from(rolePermissions)
    .where(eq(rolePermissions.permissionId, permissionId))
    .limit(1);
  return rolePermission[0] as rolePermission;
};

const createRolePermission = async (
  roleId: string,
  permissionId: string,
  createdAt: Date
): Promise<rolePermission> => {
  const newRolePermission = await db
    .insert(rolePermissions)
    .values({
      roleId,
      permissionId,
      createdAt,
    })
    .returning();
  return newRolePermission[0] as rolePermission;
};

const updateRolePermission = async (
  roleId: string,
  permissionId: string,
  data: {
    createdAt?: Date;
  }
): Promise<rolePermission> => {
  const updatedRolePermission = await db
    .update(rolePermissions)
    .set(data)
    .where(
      and(
        eq(rolePermissions.roleId, roleId),
        eq(rolePermissions.permissionId, permissionId)
      )
    )
    .returning();
  return updatedRolePermission[0] as rolePermission;
};

const deleteRolePermission = async (
  roleId: string,
  permissionId: string
): Promise<rolePermission> => {
  const deletedRolePermission = await db
    .delete(rolePermissions)
    .where(
      and(
        eq(rolePermissions.roleId, roleId),
        eq(rolePermissions.permissionId, permissionId)
      )
    )
    .returning();
  return deletedRolePermission[0] as rolePermission;
};

export {
  getAllRolesPermissions,
  getRolePermissionByRoleId,
  getRolePermissionByPermissionId,
  createRolePermission,
  updateRolePermission,
  deleteRolePermission,
};