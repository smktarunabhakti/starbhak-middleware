import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { userRoles } from "../../db/schemas/user-roles-table-schema";
import type { UserRole } from "../interfaces/userRole-interface";

const getAllUsersRoles = async (): Promise<UserRole[]> => {
  const collections = await db.select().from(userRoles);
  return collections as UserRole[];
};

const getUserRoleByUserId = async (userId: string): Promise<UserRole> => {
  const userRole = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId))
    .limit(1);
  return userRole[0] as UserRole;
};

const getUserRoleByRoleId = async (roleId: string): Promise<UserRole> => {
  const userRole = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.roleId, roleId))
    .limit(1);
  return userRole[0] as UserRole;
};

const createUserRole = async (
  userId: string,
  roleId: string,
  createdAt: Date
): Promise<UserRole> => {
  const newUserRole = await db
    .insert(userRoles)
    .values({
      userId,
      roleId,
      createdAt,
    })
    .returning();
  return newUserRole[0] as UserRole;
};

const updateUserRole = async (
  userId: string,
  roleId: string,
  data: {
    createdAt?: Date;
  }
): Promise<UserRole> => {
  const updatedUserRole = await db
    .update(userRoles)
    .set(data)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
    .returning();
  return updatedUserRole[0] as UserRole;
};

const deleteUserRole = async (
  userId: string,
  roleId: string
): Promise<UserRole> => {
  const deletedUserRole = await db
    .delete(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId)))
    .returning();
  return deletedUserRole[0] as UserRole;
};

export {
  getAllUsersRoles,
  getUserRoleByUserId,
  getUserRoleByRoleId,
  createUserRole,
  updateUserRole,
  deleteUserRole,
};
