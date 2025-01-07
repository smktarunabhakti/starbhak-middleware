import { sql } from "drizzle-orm";
import { db } from "..";
import type { Subject } from "../../common/interfaces/subject-interface";
import { subject } from "../schemas/subjects-table-schema";
import { createSubject } from "../../common/model/subject-model";
import { schedules } from "../schemas/schedules-table-schema";


const subjectSeeds: any[] = [
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 1,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },


    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 2,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },


    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 3,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },

    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 4,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },

    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 5,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },

    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "07:00",
        end_at: "08:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "08:00",
        end_at: "09:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "10:00",
        end_at: "11:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "11:00",
        end_at: "12:00",
        study_group_id: "b7c255a5-09a6-41fc-9ec8-a17c573766d1",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "12:00",
        end_at: "13:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "13:00",
        end_at: "14:00",
        study_group_id: "51d06a0b-b456-408a-83b2-a3dc060736c9",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "15:00",
        end_at: "16:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },
    {
        teacher_id: "TC202407310158",
        subject_id: "22740803-b997-47de-b4c2-1a4d29ac6df6",
        day_of_week: 6,
        start_at: "16:00",
        end_at: "17:00",
        study_group_id: "765af67e-705a-4a89-8f69-cef2627a054d",
    },

];

const seedSchedules = async () => {
  await db.execute(sql`TRUNCATE TABLE schedules RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the subjects table and reset identity\n");

  await db.delete(schedules);
  console.log("🗑️  Emptying the subjects table before seeding\n");

  for (const seed of subjectSeeds) {
    try {
      console.log(`➕ Inserting Subject: ${seed.name}\n`);
      await db.insert(schedules).values(seed)
    } catch (error) {
      console.log(`❌ Error inserting Subject ${seed.name}: `, error, "\n");
    }
  }

  const allSubjects = await db.select().from(schedules);
  console.log("✅ All subjects in the database:", allSubjects);
};

seedSchedules();
