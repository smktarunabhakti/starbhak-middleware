import { sql } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import type { SchoolYear } from "../../common/interfaces/school-years-interface";
import { schoolYear as SchoolYearSchema } from "../schemas/school-years-table-schema";

const generateSchoolYearSeeds = async (): Promise<SchoolYear[]> => {

  const datas: SchoolYear[] = [
    {
      start: 2024,
      end: 2025
    },
    {
      start: 2025,
      end: 2026
    },
  ];

  return datas
}

const seedUsers = async () => {
  await db.execute(sql`TRUNCATE TABLE school_years RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the table and reset identity\n");

  await db.delete(SchoolYearSchema);
  console.log("🗑️  Emptying the users table before seeding\n");

  const schoolYearSeeds = await generateSchoolYearSeeds()

  for (const schoolYear of schoolYearSeeds) {
    try {
      console.log(`➕ Inserting: ${schoolYear.start} / ${schoolYear.end} \n`);
      await db.insert(SchoolYearSchema).values({
        start: schoolYear.start!,
        end: schoolYear.end!
      })
    } catch (error) {
      console.error(`❌ Error inserting ${schoolYear.start} / ${schoolYear.end}: `, error, "\n");
    }
  }

  const allSchoolYears = await db.select().from(SchoolYearSchema);
  console.log("✅ All data in the database:", allSchoolYears);
};

seedUsers();
