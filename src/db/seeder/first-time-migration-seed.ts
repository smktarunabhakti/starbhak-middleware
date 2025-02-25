import { and, eq, name } from "drizzle-orm";
import { db } from "..";
import type { StudyGroup } from "../../common/interfaces/study-group-interface";
import type { Teacher } from "../../common/interfaces/teacher-interface";
import { majors } from "../schemas/majors-table-schema";
import { studyGroup } from "../schemas/study-groups-table-schema";
import { teacher } from "../schemas/teacher-table-schema";
import { schoolYear } from "../schemas/school-years-table-schema";
import { registerService } from "../../features/authentication/service/register-service";
import { subject } from "../schemas/subjects-table-schema";
import { schedules } from "../schemas/schedules-table-schema";

async function firstTimeSeeder(): Promise<void> {
  let response: any, result: any;
  // Seed your database here
  console.log("First time migration seed");

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };

  try {
  response = await fetch("https://absensi.smktarunabhakti.net:3995/api/guru", requestOptions);
  result = await response.json();
  console.log(result)
  } catch (error) {
    console.error(error);
  };

  await db.insert(teacher).values(
    await result.data.filter((e: any) => e.nip != "TC202407310158").map((item: any, i: number): Teacher => ({
        id: item.id,
        name: item.name,
        teacher_id: item.nip,
        email: `dummy${i}@gmail.com`,
        gender: item.jk,
        PoB: item.tempat_lahir,
        DoB: item.tgl_lahir,
        isActive: true,
    }))
  );

  try {
  response = await fetch("https://absensi.smktarunabhakti.net:3995/api/kelas", requestOptions);
  result = await response.json();
  console.log(result)
  } catch (error) {
    console.error(error);
  };

  let promiseMap = result.map(async (item: any): Promise<StudyGroup> => {

    let splitClassName = item.name.split(" ");

    let grade = splitClassName[0];

    let major = splitClassName[1];

    let classNumber = splitClassName[2] ?? ""

    console.log(` ${major} ${classNumber}`)

    if(major == "TJKT"){
      major = "TKJ"
    } else if (major == "PPLG"){
      major = "RPL"
    } else if (major == "TEI") {
      major = "TE"
    } else if (major == "BRF") {
      major = "PSPT"
    }

    let year;

    if(grade == "X"){
      year = 2024
    }else if(grade == "XI"){
      year = 2023
    }else if(grade == "XII"){
      year = 2022
    }

    let majorDB = await db.select().from(majors).where(eq(majors.name, major)).limit(1)

    console.log(item.name)
    console.log(majorDB)

    let startSchoolYear = await db.select().from(schoolYear).where(eq(schoolYear.start, year as number)).limit(1)

    return {
      name: `${major} ${classNumber}`,
      year: grade,
      major_id: majorDB[0].majors_id as string,
      starting_school_years_id: startSchoolYear[0].school_year_id as string,
      isActive: true,
    }
  })

  let datas = await Promise.all(promiseMap)

  console.log(datas)

  await db.insert(studyGroup).values(datas)

  let accountSeeder: any[] = [
    {
      email: "agung.setiawan.st@gmail.com",
      name: "Agung Setiawan",
    },
    {
      email: "hamidabdul003@gmail.com",
      name: "Abdul Hamid",
    },
    {
      email: "yositriana1999@gmail.com",
      name: "Yossi Triana",
    },
  ]

  for (const element of accountSeeder) {
    let { data, message } =  await registerService(element.email, "12345678", element.name, "Teacher")

    if(data == null){
      console.log(message)
      continue
    }

    console.log(data)

    // finding teacher id

    let teacherData = await db.select().from(teacher).where(eq(teacher.name, element.name)).limit(1)

    console.log(teacherData)

    // update teacher data
    await db.update(teacher).set({
      user_id: data.id,
      email: element.email,
    }).where(eq(teacher.id, teacherData[0].id))

  }

  let scheduleDatas: any[] = [
    // bu yosi 1
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "10:50",
      end_at: "11:35",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "11:35",
      end_at: "12:20",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "12:40",
      end_at: "13:25",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "13:25",
      end_at: "14:10",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "14:10",
      end_at: "14:50",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "14:50",
      end_at: "15:30",
      study_group_name: "X TKJ 3",
    },

    //bu yossi 2
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 3",
    },

    //bu yossi 3
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "10:50",
      end_at: "11:35",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "11:35",
      end_at: "12:20",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "12:40",
      end_at: "13:25",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "13:25",
      end_at: "14:10",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "14:10",
      end_at: "14:50",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 3,
      start_at: "14:50",
      end_at: "15:30",
      study_group_name: "X TKJ 4",
    },

    //bu yossi 4
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 4,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 4,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 4,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 4",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "KJD",
      day_of_week: 4,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 4",
    },

    //bu yossi 5
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "08:30",
      end_at: "09:00",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "09:00",
      end_at: "09:30",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "09:50",
      end_at: "10:15",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "10:15",
      end_at: "10:40",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "10:40",
      end_at: "11:05",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "11:05",
      end_at: "11:30",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "13:00",
      end_at: "13:35",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "13:35",
      end_at: "14:05",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "14:05",
      end_at: "14:40",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "14:40",
      end_at: "15:15",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "15:35",
      end_at: "16:05",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Yossi Triana",
      subject_name: "TLJ",
      day_of_week: 5,
      start_at: "16:05",
      end_at: "16:40",
      study_group_name: "XI TKJ 3",
    },

    //pa hamid 1
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "10:50",
      end_at: "11:35",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "11:35",
      end_at: "12:20",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "12:40",
      end_at: "13:25",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "13:25",
      end_at: "14:10",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "14:10",
      end_at: "14:50",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 1,
      start_at: "14:50",
      end_at: "15:30",
      study_group_name: "X TKJ 1",
    },

    //pa hamid 2
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "07:30",
      end_at: "08:15",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "08:15",
      end_at: "09:00",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "09:00",
      end_at: "09:45",
      study_group_name: "X TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KJD",
      day_of_week: 2,
      start_at: "09:45",
      end_at: "10:30",
      study_group_name: "X TKJ 1",
    },

    //pa hamid 5
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 5,
      start_at: "09:50",
      end_at: "10:15",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 5,
      start_at: "10:15",
      end_at: "10:40",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 5,
      start_at: "10:40",
      end_at: "11:05",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 5,
      start_at: "11:05",
      end_at: "11:30",
      study_group_name: "XI TKJ 2",
    },

    //pa hamid 6
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "07:00",
      end_at: "07:40",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "07:40",
      end_at: "08:20",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "08:20",
      end_at: "09:00",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "09:00",
      end_at: "09:40",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "13:00",
      end_at: "13:35",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "13:35",
      end_at: "14:05",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "14:05",
      end_at: "14:40",
      study_group_name: "XI TKJ 1",
    },
    {
      teachers_name: "Abdul Hamid",
      subject_name: "KAI",
      day_of_week: 6,
      start_at: "14:40",
      end_at: "15:15",
      study_group_name: "XI TKJ 1",
    },

    //pa agung 1
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "07:30",
      end_at: "08:05",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "08:05",
      end_at: "08:40",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "08:40",
      end_at: "09:15",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "09:15",
      end_at: "09:50",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "10:10",
      end_at: "10:45",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "10:45",
      end_at: "11:20",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "11:20",
      end_at: "11:55",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 1,
      start_at: "11:55",
      end_at: "12:30",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "13:00",
      end_at: "13:35",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "13:35",
      end_at: "14:05",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "14:05",
      end_at: "14:40",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "14:40",
      end_at: "15:15",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "15:35",
      end_at: "16:10",
      study_group_name: "XI TKJ 3",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "AIJ",
      day_of_week: 1,
      start_at: "16:10",
      end_at: "16:45",
      study_group_name: "XI TKJ 3",
    },

    //pa agung 2
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "13:00",
      end_at: "13:35",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "13:35",
      end_at: "14:05",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "14:05",
      end_at: "14:40",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "14:40",
      end_at: "15:15",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "15:35",
      end_at: "16:05",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "16:05",
      end_at: "16:40",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "16:40",
      end_at: "17:15",
      study_group_name: "XI TKJ 2",
    },
    {
      teachers_name: "Agung Setiawan",
      subject_name: "ASJ",
      day_of_week: 2,
      start_at: "17:15",
      end_at: "17:50",
      study_group_name: "XI TKJ 2",
    },
  ];

  let schedulePromiseMap = scheduleDatas.map(async (item: any): Promise<any> => {
    let teacherData = await db.select().from(teacher).where(eq(teacher.name, item.teachers_name)).limit(1)

    let splitClassName = item.study_group_name.split(" ");

    let grade = splitClassName[0];

    let major = splitClassName[1];

    let classNumber = splitClassName[2] ?? ""

    let studyGroupData = await db.select().from(studyGroup).where(
      and(
        eq(studyGroup.name, `${major} ${classNumber}`),
        eq(studyGroup.year, grade)
      )
    ).limit(1)

    let subjectData = await db.select().from(subject).where(eq(subject.name, item.subject_name)).limit(1)

    if(teacherData.length == 0 || studyGroupData.length == 0 || subjectData.length == 0){
      console.log(`Data not found ${item.teachers_name} ${item.study_group_name} ${item.subject_name}`)
      return
    }

    return {
      teacher_id: teacherData[0].teacher_id,
      subject_id: subjectData[0].subjects_id,
      day_of_week: item.day_of_week,
      start_at: item.start_at,
      end_at: item.end_at,
      study_group_id: studyGroupData[0].study_groups_id,
      
    }
  })

  let scheduleDatasMap = await Promise.all(schedulePromiseMap)

  await db.insert(schedules).values(scheduleDatasMap)

  console.log("First time migration seed done");
}

await firstTimeSeeder();
