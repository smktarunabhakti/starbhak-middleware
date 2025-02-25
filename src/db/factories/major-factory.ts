import { sql } from "drizzle-orm";
import { db } from "..";
import type { Major } from "../../common/interfaces/major-interface";
import { majors } from "../schemas/majors-table-schema";
import { createMajor } from "../../common/model/major-model";

const majorSeeds: Major[] = [

  {
    name: "TKJ",
  },

  {
    name: "ANIMASI",
  },

  {
    name: "RPL",
  },

  {
    name: "TE",
  },
  
  {
    name: "PSPT",
  },
];

const seedMajors = async () => {
  await db.execute(sql`TRUNCATE TABLE majors RESTART IDENTITY CASCADE`);
  console.log("🗑️ Truncated the majors table and reset identity\n");

  await db.delete(majors);
  console.log("🗑️ Emptying the majors table before seeding\n");

  for (const majorSeed of majorSeeds) {
    try {
      console.log(`➕ Inserting major: ${majorSeed.name}\n`);
      await createMajor({
        name: majorSeed.name!,
        majors_head_id: majorSeed.majors_head_id as string,
      });
    } catch (error) {
      console.error(`❌ Error inserting major ${majorSeed.name}:`, error, "\n");
    }
  }

  const allMajors = await db.select().from(majors);
  console.log("✅ Done\n\nAll majors in the database:", allMajors);
};

seedMajors();
