import { sql } from "drizzle-orm";
import { db } from "..";
import { schedules } from "../schemas/schedules-table-schema";

async function getScheduleSeed() {
  const study_group_ids = await db.execute(
    sql`SELECT study_groups_id FROM study_groups ORDER BY RANDOM() LIMIT 3`
  );

  const subject_id = await db.execute(
    sql`SELECT subjects_id FROM subjects ORDER BY RANDOM() LIMIT 1`
  );

  const subjectSeeds: any[] = [
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 1,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },

    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 2,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },

    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 3,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },

    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 4,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },

    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 5,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },

    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "07:00",
      end_at: "08:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "08:00",
      end_at: "09:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "10:00",
      end_at: "11:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "11:00",
      end_at: "12:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "12:00",
      end_at: "13:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "13:00",
      end_at: "14:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "15:00",
      end_at: "16:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
    {
      teacher_id: "TC202407310158",
      subject_id: subject_id.rows[0].subjects_id as string,
      day_of_week: 6,
      start_at: "16:00",
      end_at: "17:00",
      study_group_id: study_group_ids.rows[Math.floor(Math.random() * 3)]
        .study_groups_id as string,
    },
  ];

  return subjectSeeds;
}

const seedSchedules = async () => {
  const scheduleSeeds = await getScheduleSeed();

  await db.execute(sql`TRUNCATE TABLE schedules RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the subjects table and reset identity\n");

  await db.delete(schedules);
  console.log("🗑️  Emptying the subjects table before seeding\n");

  for (const seed of scheduleSeeds) {
    try {
      console.log(`➕ Inserting Subject: ${seed.name}\n`);
      await db.insert(schedules).values(seed);
    } catch (error) {
      console.log(`❌ Error inserting Subject ${seed.name}: `, error, "\n");
    }
  }

  const allSubjects = await db.select().from(schedules);
  console.log("✅ All subjects in the database:", allSubjects);
};

seedSchedules();
