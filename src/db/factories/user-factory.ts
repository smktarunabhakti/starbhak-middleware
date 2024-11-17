import { db } from "..";
import type { User } from "../../common/interfaces/user-interface";
import { createUser } from "../../common/model/user-model";
import { users } from "../schema";

const userSeeds: User[] = [
  {
    id: "1",
    email: "farras@example.com",
    passwordHash: "hashedPassword1",
    name: "Farras",
    roleId: "user",
    isActive: true,
    lastLoginAt: new Date("2024-11-10T12:00:00Z"),
    refreshTokenHash: "refreshTokenHash1",
    createdAt: new Date("2024-01-15T08:30:00Z"),
    updatedAt: new Date("2024-11-10T12:00:00Z"),
  },
  {
    id: "2",
    email: "glenn@example.com",
    passwordHash: "hashedPassword2",
    name: "Glenn",
    roleId: "admin",
    isActive: true,
    lastLoginAt: new Date("2024-11-12T10:00:00Z"),
    refreshTokenHash: "refreshTokenHash2",
    createdAt: new Date("2024-02-20T09:45:00Z"),
    updatedAt: new Date("2024-11-12T10:00:00Z"),
  },
  {
    id: "3",
    email: "kenneth@example.com",
    passwordHash: "hashedPassword3",
    name: "Kenneth",
    roleId: "user",
    isActive: false,
    lastLoginAt: new Date("2024-11-05T14:20:00Z"),
    refreshTokenHash: "refreshTokenHash3",
    createdAt: new Date("2023-10-10T07:15:00Z"),
    updatedAt: new Date("2024-11-05T14:20:00Z"),
  },
  {
    id: "4",
    email: "affan@example.com",
    passwordHash: "hashedPassword4",
    name: "Affan",
    roleId: "user",
    isActive: true,
    lastLoginAt: new Date("2024-11-13T16:30:00Z"),
    refreshTokenHash: "refreshTokenHash4",
    createdAt: new Date("2024-03-30T10:25:00Z"),
    updatedAt: new Date("2024-11-13T16:30:00Z"),
  },
  {
    id: "5",
    email: "hilmi@example.com",
    passwordHash: "hashedPassword5",
    name: "Hilmi",
    roleId: "admin",
    isActive: true,
    lastLoginAt: new Date("2024-11-14T18:45:00Z"),
    refreshTokenHash: "refreshTokenHash5",
    createdAt: new Date("2023-11-01T13:50:00Z"),
    updatedAt: new Date("2024-11-14T18:45:00Z"),
  },
];

const seedUsers = async () => {
  for (const user of userSeeds) {
    try {
      console.log(`Inserting user: ${user.name}`);
      await createUser(user.email, user.passwordHash, user.name, user.roleId);
    } catch (error) {
      console.error(`Error inserting user ${user.name}:`, error);
    }
  }

  const allUsers = await db.select().from(users);
  console.log("All users in the database:", allUsers);
};

seedUsers();

