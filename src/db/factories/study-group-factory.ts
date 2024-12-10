import { sql } from "drizzle-orm";
import { db } from "..";
import type { StudyGroupSchedule } from "../../common/interfaces/study-group-schedule-interface";
import { studyGroup } from "../schemas/study-groups-table-schema";
import { createStudyGroup } from "../../common/model/study-group-model";

const studyGroupSeeds: StudyGroupSchedule[] = [
  {
    starting_school_years_id: "ab5662bd-2912-4bd9-bbf9-8691b71ea33d",
    name: "Science Group",
    homeroom_teacher_id: "970e5913-b05c-4dff-a706-5c43611afbc1",
    counseling_teacher_id: "970e5913-b05c-4dff-a706-5c43611afbc1",
    year: "X",
    major_id: "a0c2fcb4-71e4-4990-8ce3-ec70b54c218f",
    isActive: true,
  },
];

const seedStudyGroups = async () => {
  await db.execute(sql`TRUNCATE TABLE study_groups RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the study_groups table and reset identity\n");

  await db.delete(studyGroup);
  console.log("🗑️  Emptying the study_groups table before seeding\n");

  for (const seed of studyGroupSeeds) {
    try {
      console.log(`➕ Inserting Study Group: ${seed.name}\n`);
      await createStudyGroup({
        starting_school_years_id: seed.starting_school_years_id!,
        name: seed.name!,
        homeroom_teacher_id: seed.homeroom_teacher_id!,
        counseling_teacher_id: seed.counseling_teacher_id!,
        year: seed.year!,
        major_id: seed.major_id!,
        isActive: seed.isActive!,
      });
    } catch (error) {
      console.log(`❌ Error inserting Study Group ${seed.name}: `, error, "\n");
    }
  }

  const allStudyGroups = await db.select().from(studyGroup);
  console.log("✅ All study groups in the database:", allStudyGroups);
};

seedStudyGroups();
