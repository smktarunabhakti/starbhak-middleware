import { sql } from "drizzle-orm";
import { db } from "..";
import type { Student } from "../../common/interfaces/student-interface";
import { student } from "../schemas/students-table-schema";
import { createStudent } from "../../common/model/student-model";

const studentSeeds: Student[] = [
  {
    nisn: "123456789",
    nipd: "12345",
    nik: "321654987",
    rfid: "RF1234",
    name: "John Doe",
    DoB: new Date("2005-06-15"),
    PoB: "Jakarta",
    gender: "Male",
    email: "john.doe@example.com",
    starting_school_years_id: "2024-2025",
    isActive: true,
  },
  {
    nisn: "987654321",
    nipd: "67890",
    nik: "654987321",
    rfid: "RF5678",
    name: "Jane Smith",
    DoB: new Date("2006-07-20"),
    PoB: "Bandung",
    gender: "Female",
    email: "jane.smith@example.com",
    starting_school_years_id: "2024-2025",
    isActive: true,
  },
];

const seedStudents = async () => {
  await db.execute(sql`TRUNCATE TABLE students RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the students table and reset identity\n");

  await db.delete(student);
  console.log("🗑️  Emptying the students table before seeding\n");

  for (const seed of studentSeeds) {
    try {
      console.log(`➕ Inserting Student: ${seed.name}\n`);
      await createStudent(
        seed.nisn!,
        seed.nipd!,
        seed.nik!,
        seed.rfid!,
        seed.name!,
        seed.DoB!,
        seed.PoB!,
        seed.gender!,
        seed.email!,
        seed.starting_school_years_id!,
        seed.isActive!
      );
    } catch (error) {
      console.log(`❌ Error inserting Student ${seed.name}: `, error, "\n");
    }
  }

  const allStudents = await db.select().from(student);
  console.log("✅ All students in the database:", allStudents);
};

seedStudents();
