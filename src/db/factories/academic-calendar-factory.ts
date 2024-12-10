import { sql } from "drizzle-orm";
import { db } from "..";
import type { AcademicCalendar } from "../../common/interfaces/academic-calendar-interface";
import { academicCalendar } from "../schemas/academic-calenders-table-schema";
import { createAcademicCalendar } from "../../common/model/academic-calender-model";

const academicCalendarSeeds: AcademicCalendar[] = [
  {
    name: "Libur kenaikan kelas",
    start_date: "2024-12-20",
    end_date: "2024-01-10",
    location: "Rumah masing masing",
    isHoliday: true,
    isCelebratedAtSchool: false,
    start_at: "08:00",
    end_at: "15:00",
    isActive: true,
    createdAt: new Date(),
  },
];

const seedAcademicCalendar = async () => {
  await db.execute(
    sql`TRUNCATE TABLE academic_calendars RESTART IDENTITY CASCADE`
  );
  console.log("🗑️  Truncated the table and reset identity\n");

  await db.delete(academicCalendar);
  console.log("🗑️  Emptying the academic_calendars table before seeding\n");

  for (const seed of academicCalendarSeeds) {
    try {
      console.log(`➕ Inserting Academic Calendar: ${seed.name}\n`);
      await createAcademicCalendar({
        name: seed.name!,
        start_date: seed.start_date as string,
        end_date: seed.end_date as string,
        location: seed.location!,
        is_holiday: seed.isHoliday!,
        is_celebrated_at_school: seed.isCelebratedAtSchool!,
        start_at: seed.start_at!,
        end_at: seed.end_at!,
        isActive: seed.isActive!,
      });
    } catch (error) {
      console.log(
        `❌ Error inserting Academic calendar ${seed.name}: `,
        error,
        "\n"
      );
    }
  }

  const allAcademicCalendars = await db.select().from(academicCalendar);
  console.log("✅ All data in the database:", allAcademicCalendars);
};

seedAcademicCalendar();
