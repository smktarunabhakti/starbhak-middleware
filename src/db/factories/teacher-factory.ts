import { sql } from "drizzle-orm";
import { db } from "..";
import type { Teacher } from "../../common/interfaces/teacher-interface";
import { teacher } from "../schemas/teacher-table-schema";
import { createTeacher } from "../../common/model/teacher-model";

const teacherSeeds: Teacher[] = [
  {
    name: "Jane Smith",
    DoB: new Date("1980-08-22"),
    PoB: "Bandung",
    gender: "Female",
    email: "jane.smith@example.com",
    isActive: true,
    createdAt: new Date(),
  },
  {
    name: "Loona",
    DoB: new Date("1980-08-22"),
    PoB: "Bandung",
    gender: "Female",
    email: "loona@example.com",
    userId: "eb674718-3c37-4db6-a2a5-01f8e5bb6a3c",
    isActive: true,
    createdAt: new Date(),
  },
];

const seedTeachers = async () => {
  await db.execute(sql`TRUNCATE TABLE teachers RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the teachers table and reset identity\n");

  await db.delete(teacher);
  console.log("🗑️  Emptying the teachers table before seeding\n");

  for (const seed of teacherSeeds) {
    try {
      console.log(`➕ Inserting Teacher: ${seed.name}\n`);
      await createTeacher({
        name: seed.name!,
        DoB: seed.DoB!,
        PoB: seed.PoB!,
        gender: seed.gender!,
        email: seed.email!,
        userId: seed.userId!,
        isActive: seed.isActive!,
        createdAt: seed.createdAt!,
        teacherId: ""
      });
    } catch (error) {
      console.log(`❌ Error inserting Teacher ${seed.name}: `, error, "\n");
    }
  }

  const allTeachers = await db.select().from(teacher);
  console.log("✅ All teachers in the database:", allTeachers);
};

seedTeachers();
