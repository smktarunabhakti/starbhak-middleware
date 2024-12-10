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
        isActive: seed.isActive!,
        createdAt: seed.createdAt!,
      });
    } catch (error) {
      console.log(`❌ Error inserting Teacher ${seed.name}: `, error, "\n");
    }
  }

  const allTeachers = await db.select().from(teacher);
  console.log("✅ All teachers in the database:", allTeachers);
};

seedTeachers();
