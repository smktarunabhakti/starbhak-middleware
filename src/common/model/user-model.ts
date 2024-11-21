import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import type { User } from "../interfaces/user-interface";

const getAllUsers = async (): Promise<User[]> => {
  const collections = await db.select().from(users);
  return collections as User[];
};

const getUserById = async (id: string): Promise<User> => {
  const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user[0] as User;
};

const getUserByEmail = async (email: string): Promise<User> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user[0] as User;
};

const getUserByName = async (name: string): Promise<User> => {
  const user = await db.select().from(users).where(eq(users.name, name));
  return user[0] as User;
};

const createUser = async (
  email: string,
  passwordHash: string,
  name: string,
  roleId: string
): Promise<User> => {
  const newUser = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      name,
      roleId,
    })
    .returning();
  return newUser[0] as User;
};

const updateUser = async (
  id: string,
  data: {
    email?: string;
    passwordHash?: string;
    name?: string;
    roleId?: string;
    isActive?: boolean;
    lastLoginAt?: Date;
    refreshTokenHash?: string;
    updatedAt?: Date;
  }
): Promise<User> => {
  const updatedUser = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return updatedUser[0] as User;
};

const deleteUser = async (id: string): Promise<User> => {
  const deletedUser = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
  return deletedUser[0] as User;
};

export {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};