import { sql } from "drizzle-orm";
import { db } from "..";
import { student } from "../schemas/students-table-schema";
import { createStudent } from "../../common/model/student-model";


async function getStudentSeed() {

  const starting_school_years_id = await db.execute(
    sql`SELECT school_year_id FROM school_years ORDER BY RANDOM() LIMIT 1`
  );
  
  const study_group_id = await db.execute(
    sql`SELECT study_groups_id FROM study_groups ORDER BY RANDOM() LIMIT 1`
  );

  const studentSeeds: any[] = [
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "7605382192",
      nipd: "142698",
      nik: "155487685076",
      rfid: "WAuf-0104",
      gender: "L",
      email: "cassandra66@williams.com",
      name: "Mathew Bond",
      DoB: "2007-07-12",
      PoB: "Lake Sandraview",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "2216002197",
      nipd: "327502",
      nik: "300882830476",
      rfid: "mpkg-3888",
      gender: "L",
      email: "cruzjonathan@yahoo.com",
      name: "Bonnie Sanders",
      DoB: "2018-05-21",
      PoB: "Jamesstad",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "8609591738",
      nipd: "378266",
      nik: "407643111894",
      rfid: "diQn-0795",
      gender: "P",
      email: "barbara33@anderson-hoffman.com",
      name: "Eric Gibbs",
      DoB: "2014-03-17",
      PoB: "Hayneshaven",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "3647882716",
      nipd: "497694",
      nik: "620634968406",
      rfid: "dKaB-3645",
      gender: "L",
      email: "james67@harris.com",
      name: "Alice Gray",
      DoB: "2012-07-19",
      PoB: "Glen Haven",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "7281362736",
      nipd: "496823",
      nik: "729482762372",
      rfid: "XAjP-5402",
      gender: "P",
      email: "kristen01@hammond.org",
      name: "Lucas Scott",
      DoB: "2015-12-05",
      PoB: "Oak Grove",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "2118505933",
      nipd: "682577",
      nik: "546829171982",
      rfid: "VXmi-9175",
      gender: "L",
      email: "thomas42@henderson.com",
      name: "Sophia Garcia",
      DoB: "2013-11-16",
      PoB: "Westertown",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "6251717930",
      nipd: "549102",
      nik: "842014748186",
      rfid: "GVnu-8829",
      gender: "P",
      email: "eric72@carter.com",
      name: "Isabella Brooks",
      DoB: "2017-03-22",
      PoB: "New Chester",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "4563937231",
      nipd: "412093",
      nik: "394150265984",
      rfid: "YkBo-2177",
      gender: "L",
      email: "williams33@rivera.com",
      name: "James Johnson",
      DoB: "2008-02-11",
      PoB: "Fort Collins",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "4526813642",
      nipd: "348905",
      nik: "943513069507",
      rfid: "LVof-1685",
      gender: "P",
      email: "mitchell12@moore.com",
      name: "Ryan Robinson",
      DoB: "2016-11-02",
      PoB: "Lakeville",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "8213709504",
      nipd: "458631",
      nik: "474302752078",
      rfid: "SZks-7492",
      gender: "L",
      email: "dylan67@black.com",
      name: "Zoe Davis",
      DoB: "2017-04-04",
      PoB: "Dale Park",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "5896120450",
      nipd: "308540",
      nik: "473850981232",
      rfid: "QHxd-3370",
      gender: "P",
      email: "jacob02@barker.com",
      name: "Emma Lee",
      DoB: "2016-09-08",
      PoB: "Riverside",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "4537926710",
      nipd: "328930",
      nik: "739084473200",
      rfid: "NCvl-7738",
      gender: "P",
      email: "lily01@williamson.com",
      name: "Ella Moore",
      DoB: "2011-10-27",
      PoB: "Southfield",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "9302340845",
      nipd: "194782",
      nik: "572926168903",
      rfid: "DFhv-4625",
      gender: "L",
      email: "heather01@green.com",
      name: "Andrew Watson",
      DoB: "2010-06-19",
      PoB: "Clifton City",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
    {
      study_groups_id: study_group_id.rows[0].study_groups_id as string,
      nisn: "8316723450",
      nipd: "183056",
      nik: "375417212891",
      rfid: "HjlM-3462",
      gender: "P",
      email: "sebastian08@holland.com",
      name: "Sarah Lee",
      DoB: "2012-05-14",
      PoB: "Kendall Park",
      starting_school_years: starting_school_years_id.rows[0].school_year_id as string
    },
  ];

  return studentSeeds
}



const seedStudents = async () => {

  const studentSeeds = await getStudentSeed()

  await db.execute(sql`TRUNCATE TABLE students RESTART IDENTITY CASCADE`);
  console.log("🗑️  Truncated the students table and reset identity\n");

  await db.delete(student);
  console.log("🗑️  Emptying the students table before seeding\n");

  console.log("Seed with data: ", studentSeeds);

  for (const seed of studentSeeds) {
    try {
      console.log(`➕ Inserting Student: ${seed.name}\n`);
      await createStudent(seed);
    } catch (error) {
      console.log(`❌ Error inserting Student ${seed.name}: `, error, "\n");
    }
  }

  const allStudents = await db.select().from(student);
  console.log("✅ All students in the database:", allStudents);
};

seedStudents();
