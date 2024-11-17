import { eq } from "drizzle-orm";
import { db } from "../../db";
import { roles } from "../../db/migrations/roles-table-schema";
import type { Role } from "../interfaces/role-interface";

const getAllRoles = async (): Promise<Role[]> => {
  const collections = await db.select().from(roles);
  return collections as Role[];
};

const getRoleById = async (id: string): Promise<Role> => {
  const role = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  return role[0] as Role;
};

const createRole = async (
  name: string,
  description: string,
  domain: string,
): Promise<Role> => {
  const newRole = await db
    .insert(roles)
    .values({
      name,
      description,
      domain,
    })
    .returning();
  return newRole[0] as Role;
};

const updateRole = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    domain?: string;
  }
): Promise<Role> => {
  const updatedRole = await db
    .update(roles)
    .set(data)
    .where(eq(roles.id, id))
    .returning();
  return updatedRole[0] as Role;
};

const deleteRole = async (id: string): Promise<Role> => {
  const deletedRole = await db
    .delete(roles)
    .where(eq(roles.id, id))
    .returning();
  return deletedRole[0] as Role;
};

export { getAllRoles, getRoleById, createRole, updateRole, deleteRole };