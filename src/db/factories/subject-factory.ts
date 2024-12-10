import { sql } from "drizzle-orm";
import { db } from "..";
import type { Subject } from "../../common/interfaces/subject-interface";
import { subject } from "../schemas/subjects-table-schema";
import { createSubject } from "../../common/model/subject-model";

const subjectSeeds: Subject[] = [
  {
    name: "Mathematics",
    isActive: true,
  },
  {
    name: "Science",
    isActive: true,
  },
  {
    name: "English",
    isActive: true,
  },
];

const seedSubjects = async () => {
  await db.execute(sql`TRUNCATE TABLE subjects RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the subjects table and reset identity\n");

  await db.delete(subject);
  console.log("🗑️  Emptying the subjects table before seeding\n");

  for (const seed of subjectSeeds) {
    try {
      console.log(`➕ Inserting Subject: ${seed.name}\n`);
      await createSubject({
        name: seed.name!,
        isActive: seed.isActive!,
      });
    } catch (error) {
      console.log(`❌ Error inserting Subject ${seed.name}: `, error, "\n");
    }
  }

  const allSubjects = await db.select().from(subject);
  console.log("✅ All subjects in the database:", allSubjects);
};

seedSubjects();
