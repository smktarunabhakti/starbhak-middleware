import { sql } from "drizzle-orm";
import { db } from "..";
import type { StudyGroupSchedule } from "../../common/interfaces/study-group-schedule-interface";
import { studyGroup } from "../schemas/study-groups-table-schema";
import { createStudyGroup } from "../../common/model/study-group-model";
import type { StudyGroup } from "../../common/interfaces/study-group-interface";

const generateStudyGroupSeeds = async (
  q: number
): Promise<StudyGroup[]> => {
  const starting_school_years_id = await db.execute(
    sql`SELECT school_year_id FROM school_years ORDER BY RANDOM() LIMIT 1`
  );

  const homeroom_teacher_id = await db.execute(
    sql`SELECT teacher_id FROM teachers ORDER BY RANDOM() LIMIT 1`
  );

  const counseling_teacher_id = await db.execute(
    sql`SELECT teacher_id FROM teachers ORDER BY RANDOM() LIMIT 1`
  );

  const major_id = await db.execute(
    sql`SELECT majors_id FROM majors ORDER BY RANDOM() LIMIT 1`
  );

  // console.log(starting_school_years_id.rows[0].school_year_id);
  // console.log(homeroom_teacher_id.rows[0].teacher_id);
  // console.log(counseling_teacher_id.rows[0].teacher_id);
  // console.log(major_id.rows[0].majors_id);
  
  return [
    {
      starting_school_years_id: starting_school_years_id.rows[0]
        .school_year_id as string,
      name: "PPLG 1",
      homeroom_teacher_id: homeroom_teacher_id.rows[0].teacher_id as string,
      counseling_teacher_id: counseling_teacher_id.rows[0].teacher_id as string,
      year: "X",
      major_id: major_id.rows[0].majors_id as string,
      isActive: true,
    },
    {
      starting_school_years_id: starting_school_years_id.rows[0]
        .school_year_id as string,
      name: "PPLG 2",
      homeroom_teacher_id: homeroom_teacher_id.rows[0].teacher_id as string,
      counseling_teacher_id: counseling_teacher_id.rows[0].teacher_id as string,
      year: "X",
      major_id: major_id.rows[0].majors_id as string,
      isActive: true,
    },
    {
      starting_school_years_id: starting_school_years_id.rows[0]
        .school_year_id as string,
      name: "PPLG 3",
      homeroom_teacher_id: homeroom_teacher_id.rows[0].teacher_id as string,
      counseling_teacher_id: counseling_teacher_id.rows[0].teacher_id as string,
      year: "X",
      major_id: major_id.rows[0].majors_id as string,
      isActive: true,
    },
  ];
};

generateStudyGroupSeeds(1)

const studyGroupSeeds: StudyGroup[] = await generateStudyGroupSeeds(2) ;

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
