import { sql } from "drizzle-orm";
import { db } from "..";
import type { User } from "../../common/interfaces/user-interface";
import { createUser } from "../../common/model/user-model";
import { roles } from "../migrations/roles-table-schema";
import { users } from "../schema";

const userSeeds: User[] = [
  {
    email: "farras@example.com",
    passwordHash: "hashedPassword1",
    name: "Farras",
    roleId: "fda8cd4f-a95b-4747-bb0c-610a3cd34d35",
    isActive: true,
    lastLoginAt: new Date("2024-11-10T12:00:00Z"),
    refreshTokenHash: "refreshTokenHash1",
  },
  {
    email: "glenn@example.com",
    passwordHash: "hashedPassword2",
    name: "Glenn",
    roleId: "fda8cd4f-a95b-4747-bb0c-610a3cd34d35",
    isActive: true,
    lastLoginAt: new Date("2024-11-12T10:00:00Z"),
    refreshTokenHash: "refreshTokenHash2",
  },
  {
    email: "kenneth@example.com",
    passwordHash: "hashedPassword3",
    name: "Kenneth",
    roleId: "fda8cd4f-a95b-4747-bb0c-610a3cd34d35",
    isActive: false,
    lastLoginAt: new Date("2024-11-05T14:20:00Z"),
    refreshTokenHash: "refreshTokenHash3",
  },
  {
    email: "affan@example.com",
    passwordHash: "hashedPassword4",
    name: "Affan",
    roleId: "fda8cd4f-a95b-4747-bb0c-610a3cd34d35",
    isActive: true,
    lastLoginAt: new Date("2024-11-13T16:30:00Z"),
    refreshTokenHash: "refreshTokenHash4",
  },
  {
    email: "hilmi@example.com",
    passwordHash: "hashedPassword5",
    name: "Hilmi",
    roleId: "fda8cd4f-a95b-4747-bb0c-610a3cd34d35",
    isActive: true,
    lastLoginAt: new Date("2024-11-14T18:45:00Z"),
    refreshTokenHash: "refreshTokenHash5",
  },
];

const seedUsers = async () => {
  await db.delete(users)
  console.log("🗑️  Emptying the users table before seeding\n");


  for (const user of userSeeds) {
    try {
      console.log(`➕ Inserting user: ${user.name}`);
      await createUser(user.email, user.passwordHash, user.name, user.roleId);
    } catch (error) {
      console.error(`❌ Error inserting user ${user.name}:`, error);
    }
  }

  const allUsers = await db.select().from(users);
  console.log("\n✅ All users in the database:", allUsers);
};

seedUsers();
