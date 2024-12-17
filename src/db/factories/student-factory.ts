import { sql } from "drizzle-orm";
import { db } from "..";
import type { Student } from "../../common/interfaces/student-interface";
import { student } from "../schemas/students-table-schema";
import { createStudent } from "../../common/model/student-model";

const randomSchoolYear: string = await await db
  .execute(
    sql`SELECT school_year_id FROM school_years ORDER BY RANDOM() LIMIT 1`
  )
  .then((x) => {
    return x.rows[0].school_year_id as string;
  });

const studentSeeds: Student[] = [
  {
    nisn: "123456789",
    nipd: "12345",
    nik: "321654987",
    rfid: "RF1234",
    name: "Hilmi",
    user_id: "eb674718-3c37-4db6-a2a5-01f8e5bb6a3c",
    DoB: new Date("2005-06-15"),
    PoB: "Jakarta",
    gender: "Male",
    email: "hilmi.ari@example.com",
    starting_school_years_id: randomSchoolYear,
    isActive: true,
  },
];

const seedStudents = async () => {
  await db.execute(sql`TRUNCATE TABLE students RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the students table and reset identity\n");

  await db.delete(student);
  console.log("🗑️  Emptying the students table before seeding\n");

  console.log("Seed with data: ", studentSeeds);

  for (const seed of studentSeeds) {
    try {
      console.log(`➕ Inserting Student: ${seed.name}\n`);
      await createStudent({
        study_groups_id: seed.study_groups_id!,
        nisn: seed.nisn!,
        nipd: seed.nipd!,
        nik: seed.nik!,
        rfid: seed.rfid!,
        gender: seed.gender!,
        email: seed.email!,
        name: seed.name!,
        DoB: seed.DoB!,
        PoB: seed.PoB!,
        starting_school_years_id: seed.starting_school_years_id!,
        user_id: seed.user_id!,
        isActive: seed.isActive!,
      });
    } catch (error) {
      console.log(`❌ Error inserting Student ${seed.name}: `, error, "\n");
    }
  }

  const allStudents = await db.select().from(student);
  console.log("✅ All students in the database:", allStudents);
};

seedStudents();
