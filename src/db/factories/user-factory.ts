import { sql } from "drizzle-orm";
import { db } from "..";
import type { User } from "../../common/interfaces/user-interface";
import { createUser } from "../../common/model/user-model";
import { roles } from "../schemas/roles-table-schema";
import { users } from "../schema";

const generateUserSeeds = async (): Promise<User[]> => {
  const roleIds = await Promise.all(
    Array.from({ length: 5 }, async () => {
      const result = await db.execute(
        sql`SELECT id FROM roles ORDER BY RANDOM() LIMIT 1`
      );
      return result.rows[0]?.id as string;
    })
  );

  const userDatas: User[] = [
    {
      email: "farras@example.com",
      passwordHash: "hashedPassword1",
      name: "Farras",
      roleId: roleIds[0],
      isActive: true,
      lastLoginAt: new Date("2024-11-10T12:00:00Z"),
      refreshTokenHash: "refreshTokenHash1",
    },
    {
      email: "glenn@example.com",
      passwordHash: "hashedPassword2",
      name: "Glenn",
      roleId: roleIds[1],
      isActive: true,
      lastLoginAt: new Date("2024-11-12T10:00:00Z"),
      refreshTokenHash: "refreshTokenHash2",
    },
    {
      email: "kenneth@example.com",
      passwordHash: "hashedPassword3",
      name: "Kenneth",
      roleId: roleIds[2],
      isActive: false,
      lastLoginAt: new Date("2024-11-05T14:20:00Z"),
      refreshTokenHash: "refreshTokenHash3",
    },
    {
      email: "affan@example.com",
      passwordHash: "hashedPassword4",
      name: "Affan",
      roleId: roleIds[3],
      isActive: true,
      lastLoginAt: new Date("2024-11-13T16:30:00Z"),
      refreshTokenHash: "refreshTokenHash4",
    },
    {
      email: "hilmi@example.com",
      passwordHash: "hashedPassword5",
      name: "Hilmi",
      roleId: roleIds[4],
      isActive: true,
      lastLoginAt: new Date("2024-11-14T18:45:00Z"),
      refreshTokenHash: "refreshTokenHash5",
    },
  ];

  return userDatas
}

const seedUsers = async () => {
  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the roles table and reset identity\n");

  await db.delete(users);
  console.log("🗑️  Emptying the users table before seeding\n");

  const userSeeds = await generateUserSeeds()

  for (const user of userSeeds) {
    try {
      console.log(`➕ Inserting user: ${user.name}\n`);
      await createUser(user.email, user.passwordHash, user.name, user.roleId);
    } catch (error) {
      console.error(`❌ Error inserting user ${user.name}:`, error, "\n");
    }
  }

  const allUsers = await db.select().from(users);
  console.log("✅ All users in the database:", allUsers);
};

seedUsers();
