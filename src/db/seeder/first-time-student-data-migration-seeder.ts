import { and, eq } from "drizzle-orm";
import { db } from "..";
import type { Student } from "../../common/interfaces/student-interface";
import { majors } from "../schemas/majors-table-schema";
import { schoolYear } from "../schemas/school-years-table-schema";
import { studyGroup } from "../schemas/study-groups-table-schema";
import { student } from "../schemas/students-table-schema";

async function getStudentAndInsert(): Promise<void> {
  let response: any, result: any;

  const requestOptions: RequestInit = {
    method: "POST",
    redirect: "follow",
  };

  console.log("Fetching data from API...");

  //   try {
  response = await fetch(
    "https://absensi.smktarunabhakti.net:3995/api/siswa",
    requestOptions
  );
  result = await response.json();
//   console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   };
  console.log("Data fetched successfully!");

  console.log("Transforming data...");

  let data = result;

  let dataMapped = data.map(async (item: any, i: number): Promise<Student> => {
    let splitClassName = item.nama_kelas.split(" ");

    let grade = splitClassName[0];

    let major = splitClassName[1];

    let classNumber = splitClassName[2] ?? "";

    if (major == "TJKT") {
      major = "TKJ";
    } else if (major == "PPLG") {
      major = "RPL";
    } else if (major == "TEI") {
      major = "TE";
    } else if (major == "BRF") {
      major = "PSPT";
    }

    let year;

    if (grade == "X") {
      year = 2024;
    } else if (grade == "XI") {
      year = 2023;
    } else if (grade == "XII") {
      year = 2022;
    }

    let studyGroupData = await db
      .select()
      .from(studyGroup)
      .where(
        and(
          eq(studyGroup.name, `${major} ${classNumber}`),
          eq(studyGroup.year, grade)
        )
      )
      .limit(1);

    let startSchoolYear = await db
      .select()
      .from(schoolYear)
      .where(eq(schoolYear.start, year as number))
      .limit(1);

    return {
      name: item.nama_siswa,
      rfid: item.rfid,
      nipd: item.nis,
      nisn: item.nik,
      nik:  "student" + i,
      DoB: item.tgl_lahir,
      PoB: item.tempat_lahir,
      email: "student" + i + "@gmail.com",
      gender: item.jk,
      study_groups_id: studyGroupData[0].study_groups_id as string,
      starting_school_years_id: startSchoolYear[0].school_year_id as string,
      isActive: true,
    };
  });

    let dataResolved = await Promise.all(dataMapped);

    console.log("Data transformed successfully!");

    console.log("Inserting data to database...");

   await db.insert(student).values(dataResolved);

    console.log("Data inserted successfully!");
}

await getStudentAndInsert();