import { sql } from "drizzle-orm";
import { db } from "..";
import type { AcademicCalendar } from "../../common/interfaces/academic-calendar-interface";
import { academicCalendar } from "../schemas/academic-calenders-table-schema";
import { createAcademicCalendar } from "../../common/model/academic-calender-model";

const academicCalendarSeeds: AcademicCalendar[] = [
    {
        name: "Libur kenaikan kelas",
        start_date: "20 Desember 2024",
        end_date: "10 Januari 2024",
        location: "Rumah masing masing",
        isHoliday: true,
        isCelebratedAtSchool: false,
    }
]

const seedAcademicCalendar = async () => {
  await db.execute(
    sql`TRUNCATE TABLE academic_calendars RESTART IDENTITY CASCADE`
  );
  console.log("🗑️  Truncated the table and reset identity\n");

  await db.delete(academicCalendar);
  console.log("🗑️  Emptying the academic_calendars table before seeding\n");

//   academicCalendarSeeds.forEach(async (seed, i) => {
//     try {
//       console.log(`➕ Inserting Academic Calendar: ${seed.name}\n`);
//       await createAcademicCalendar({
//         name: seed.name!,
//         start_date: seed.start_date!,
//         end_date: seed.end_date!,
//         location: seed.location!,
//         is_holiday: seed.isHoliday!,
//         is_celebrated_at_school: seed.isCelebratedAtSchool!,
//       });
//     } catch (error) {
//       console.log(`❌ Error inserting Academic calendar ${seed.name}: `, error, "\n");
//     }
//   });

  const allAcademicCalendars = await db.select().from(academicCalendar);
  console.log("✅ All data in the database:", allAcademicCalendars);
};

seedAcademicCalendar();
