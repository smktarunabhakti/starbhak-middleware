import fs from "fs";
import { db } from "..";
import { teacher } from "../schemas/teacher-table-schema";
import { and, eq, like, sql } from "drizzle-orm";
import { schedules } from "../schemas/schedules-table-schema";
import { registerService } from "../../features/authentication/service/register-service";
import { studyGroup } from "../schemas/study-groups-table-schema";
import { subject } from "../schemas/subjects-table-schema";

const TARGET_DIR = "./json/prod";

const KNOWN_TEACHERS_NOT_IN_SYSTEM = [
  {
    id: "TC202411050164",
    text: "Joy Widi Wibowo",
    id_school: "TB002",
    nama_sekolah: "SMK Taruna Bhakti",
  },
  {
    id: "TC202501140168",
    text: "Zaki Alfia Putra ",
    id_school: "TB002",
    nama_sekolah: "SMK Taruna Bhakti",
  },
];

const KNOWN_HOMEROOM_TEACHERS = [
  {
    name: "Syamsul Ma'arif, S.kom",
    study_group_name: "X TKJ 1",
  },
  {
    name: "Kasandra Fitriani Nurjanah, S.Pd",
    study_group_name: "X TKJ 2",
  },
  {
    name: "Aditya Septiayan S.Pd",
    study_group_name: "X TKJ 3",
  },

  {
    name: "Adam Taris",
    study_group_name: "X ANIMASI 1",
  },
  {
    name: "Sinta Nur Alifah",
    study_group_name: "X ANIMASI 2",
  },

  {
    name: "Ana Susilowati",
    study_group_name: "X RPL 1",
  },
  {
    name: "Ageng Subagja",
    study_group_name: "X RPL 2",
  },
  {
    name: "Hesti Herawati",
    study_group_name: "X RPL 3",
  },
  {
    name: "Miranda",
    study_group_name: "X RPL 4",
  },
  {
    name: "Ratna Wati",
    study_group_name: "X RPL 5",
  },

  {
    name: "Ika Rafika",
    study_group_name: "X PSPT 1",
  },
  {
    name: "Mohamad Ricky Sudrajat",
    study_group_name: "X PSPT 2",
  },
  {
    name: "Dwi Sustiawan",
    study_group_name: "X PSPT 3",
  },

  {
    name: "Fariz Achmad",
    study_group_name: "X TE",
  },

  {
    name: "Novita Ambarwati",
    study_group_name: "XI TKJ 1",
  },
  {
    name: "Kartino Afriandi",
    study_group_name: "XI TKJ 2",
  },
  {
    name: "Yossi Triana",
    study_group_name: "XI TKJ 3",
  },

  {
    name: "Sandi Andre",
    study_group_name: "XI ANIMASI 1",
  },
  {
    name: "Darma Wahyu",
    study_group_name: "XI ANIMASI 2",
  },
  {
    name: "Anisatum Mauwanah",
    study_group_name: "XI ANIMASI 3",
  },

  {
    name: "Yoga Sanjaya",
    study_group_name: "XI RPL 1",
  },
  {
    name: "Nabila Fitri",
    study_group_name: "XI RPL 2",
  },
  {
    name: "Drs. Abdul Rosyid",
    study_group_name: "XI RPL 3",
  },
  {
    name: "Shova Al-Marwah, S.Pd",
    study_group_name: "XI RPL 4",
  },

  {
    name: "Rina Wastati",
    study_group_name: "XI PSPT 1",
  },
  {
    name: "Sheila Riani",
    study_group_name: "XI PSPT 2",
  },

  {
    name: "Casdik",
    study_group_name: "XI TE",
  },

  {
    name: "Marfuatun",
    study_group_name: "XII TKJ 1",
  },
  {
    name: "Sugeng Santoso",
    study_group_name: "XII TKJ 2",
  },
  {
    name: "Maesitoh",
    study_group_name: "XII TKJ 3",
  },

  {
    name: "Agung Setiawan",
    study_group_name: "XII ANIMASI 1",
  },
  {
    name: "Yulfani Wulan Maulita",
    study_group_name: "XII ANIMASI 2",
  },
  {
    name: "Gebi Abda Mahes Multazam",
    study_group_name: "XII ANIMASI 3",
  },
  {
    name: "Annisa Anggi Rahayu",
    study_group_name: "XII ANIMASI 4",
  },

  {
    name: "Fatima Elvi Tarigan",
    study_group_name: "XII RPL 1",
  },
  {
    name: "Heni Siswati",
    study_group_name: "XII RPL 2",
  },
  {
    name: "Diva Susilowati",
    study_group_name: "XII RPL 3",
  },

  {
    name: "Nur Syafitri",
    study_group_name: "XII PSPT",
  },
  {
    name: "Abdul Hamid",
    study_group_name: "XII TE",
  },
];

async function insertScheduleDataAndCreateNewSubjectIfNotExist(
  scheduleDatas: any,
  teacher_id: string
) {
  let schedulePromiseMap = scheduleDatas.map(
    async (item: any): Promise<any> => {
      let splitClassName = item.study_group_name.split(" ");

      let grade = splitClassName[0].toUpperCase();

      let major = splitClassName[1].toUpperCase();

      let classNumber = splitClassName[2] ?? "";

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

      let subjectData = await db
        .select()
        .from(subject)
        .where(eq(subject.name, item.subject_name))
        .limit(1);

      if (studyGroupData.length == 0) {
        console.log(
          `Data not found ${item.teachers_name} ${item.study_group_name} ${item.subject_name}`
        );
        return;
      }

      if (subjectData.length == 0) {
        let newSubject = await db
          .insert(subject)
          .values({ name: item.subject_name });
        subjectData = await db
          .select()
          .from(subject)
          .where(eq(subject.name, item.subject_name))
          .limit(1);
      }

      return {
        teacher_id: teacher_id,
        subject_id: subjectData[0].subjects_id,
        day_of_week: item.day_of_week,
        start_at: item.start_at,
        end_at: item.end_at,
        study_group_id: studyGroupData[0].study_groups_id,
      };
    }
  );

  let scheduleDatasMap = await Promise.all(schedulePromiseMap);

  await db.insert(schedules).values(scheduleDatasMap);
}

async function getTeacherDataFromYSBMO(teacher_id: string) {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "SARPRAS-STARBHAK202502");
  myHeaders.append(
    "Authorization",
    "Basic To/WbnZk0DNtT1PJAOOaz+HdrU5eQQjBZbQHyYvmrDs="
  );

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://be-skol.yayasansetyabhakti.org:5203/api/v1/masterdata/list-profile?id_teacher=" +
        teacher_id,
      requestOptions
    );
    const result: any = await response.json();
    console.log("Data fetched successfully!");

    return result.data[0];
  } catch (error) {
    console.error(error);
  }
}

async function sleep(msec: number) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

async function findKnownTeacherNotInSystem(firstname: string) {
  return KNOWN_TEACHERS_NOT_IN_SYSTEM.find((teacher) =>
    teacher.text.toLowerCase().includes(firstname)
  );
}

//truncate all schedule and account table

async function truncateAllSchedules() {
  console.log("Truncating all schedules...");

  await db.execute(sql`TRUNCATE TABLE ${schedules} RESTART IDENTITY CASCADE`);

  console.log("All schedules truncated!\n");
}

async function veryFirstTimeSeeder() {
  let skippedTeachers: string[] = [];

  let teacherDone: string[] = [];

  let files = fs.readdirSync(TARGET_DIR);

  for (let i = 0; i < files.length; i++) {
    console.log(`Processing file ${files[i]}`);

    await sleep(750);

    let data: string = fs.readFileSync(`${TARGET_DIR}/${files[i]}`, "utf8");
    let jsonData: any[] = await JSON.parse(data);

    let teacherFirstName: string = jsonData[0].teachers_name
      ? jsonData[0].teachers_name.split(" ")[0]
      : jsonData[0].teacher_name.split(" ")[0];

    teacherFirstName = teacherFirstName.toLowerCase();

    let teacherExist = await db
      .select()
      .from(teacher)
      .where(like(sql`lower(${teacher.name})`, `${teacherFirstName}%`))
      .limit(1);

    console.log(teacherExist)

    let teacher_id: string | undefined, currTeacher: any;

    if (teacherExist.length == 0) {
      console.log("Teacher not exist!");
      // console.log(teacherFirstName);

      //await sleep(750);

      console.log("Checking known teacher list...");

      let knownTeacher = await findKnownTeacherNotInSystem(teacherFirstName);

      if (!knownTeacher) {
        console.log("Teacher not found in known teacher list!");
        console.log("Skipping teacher...");
        //await sleep(750);
        skippedTeachers.push(jsonData[0].teachers_name);
        continue;
      }

      teacher_id = knownTeacher.id;
    }

    if (teacherExist.length > 1) {
      console.log("Teacher exist!, but more than 1 teacher found!");
      console.log("Getting the right one...");
      //await sleep(750);

      let teacherSecondName: string = jsonData[0].teachers_name
        ? jsonData[0].teachers_name.split(" ")[1]
        : jsonData[0].teacher_name.split(" ")[1];
      teacherSecondName = teacherSecondName.toLowerCase();

      let foundedOne = teacherExist.find((teacher) =>
        teacher.name
          .toLowerCase()
          .includes(teacherFirstName + " " + teacherSecondName)
      );

      if (!foundedOne) {
        console.log("Teacher not found in known teacher list!");
        console.log("Skipping teacher...");
        //await sleep(750);
        skippedTeachers.push(jsonData[0].teachers_name);
        continue;
      }

      currTeacher = foundedOne;

      teacher_id = foundedOne.teacher_id;
    }


    if (teacherExist.length == 1) {
      console.log("Teacher exist!");
      //await sleep(750);
      currTeacher = teacherExist[0];
      teacher_id = teacherExist[0].teacher_id;
    }

    
    if(teacherFirstName == "dwi"){
      console.log("DAYUM, This Guy / Gal is A DWI, Searching for the correct one!!!!!!!")

      let teacherSecondName: string = jsonData[0].teachers_name
        ? jsonData[0].teachers_name.split(" ")[1]
        : jsonData[0].teacher_name.split(" ")[1];
      teacherSecondName = teacherSecondName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

      console.log(teacherFirstName + " " + teacherSecondName)

      teacherExist = await db
      .select()
      .from(teacher)
      .where(like(sql`lower(${teacher.name})`, `${teacherFirstName + " " + teacherSecondName}%`))
      .limit(1);

      console.log(teacherExist)

      if (teacherExist.length != 1) {
        console.log("Teacher not exist!");
        // console.log(teacherFirstName);
  
        await sleep(750);
  
        console.log("Checking known teacher list...");
  
        let knownTeacher = await findKnownTeacherNotInSystem(teacherFirstName);
  
        if (!knownTeacher) {
          console.log("Teacher not found in known teacher list!");
          console.log("Skipping teacher...");
          await sleep(750);
          skippedTeachers.push(jsonData[0].teachers_name);
          continue;
        }
  
        teacher_id = knownTeacher.id;
      }

      if (teacherExist.length == 1) {
        console.log("FOUNDED THE CORRECT DWI HOORAY!");
        await sleep(750);
        currTeacher = teacherExist[0];
        teacher_id = teacherExist[0].teacher_id;
      }

    }

    console.log("Teacher id: ", teacher_id);

    console.log("Checking if already have user account...");
    sleep(750);

    if (!currTeacher) {
      console.log("Teacher NULL!");

      if (!teacher_id) {
        console.log("Teacher id NULL!");
        console.log("Skipping teacher...");
        //await sleep(750);
        continue;
      }

      console.log("Getting teacher data from YSBMO...");
      let ysbmo_data = await getTeacherDataFromYSBMO(teacher_id);
      console.log("ysbmo_data: ", ysbmo_data);

      let { data, message } = await registerService(
        ysbmo_data.email,
        "12345678",
        ysbmo_data.full_name,
        "Teacher"
      );

      if (!data) {
        console.log("Failed to create user account!");
        console.log("Error: ", message);
        console.log("Skipping teacher...");
        //await sleep(750);
        continue;
      }

      currTeacher = await db
        .insert(teacher)
        .values({
          teacher_id: teacher_id,
          name: ysbmo_data.full_name,
          email: ysbmo_data.email,
          DoB: ysbmo_data.dob,
          PoB: ysbmo_data.pob,
          gender: ysbmo_data.gender == "MALE" ? "L" : "P",
          user_id: data.id,
        })
        .returning();

      console.log("Teacher profile created!");

      await sleep(750);
    }

    if (!currTeacher.user_id) {
      console.log("User account not connected!");
      console.log("Creating new user account...");
      //await sleep(750);
      console.log("\nTrying to find data From YSBMO...\n");
      let ysbmo_data = await getTeacherDataFromYSBMO(teacher_id as string);

      console.log("ysbmo_data: ", ysbmo_data);

      let { data, message } = await registerService(
        ysbmo_data.email,
        "12345678",
        ysbmo_data.full_name,
        "Teacher"
      );

      if (!data) {
        console.log("Failed to create user account!");
        console.log("Error: ", message);
        console.log("Skipping teacher...");
        await sleep(750);
        continue;
      }

      console.log(message);
      console.log("connecting to teacher profile...");

      await db
        .update(teacher)
        .set({ user_id: data.id })
        .where(eq(teacher.teacher_id, teacher_id as string));

      console.log("User account connected!");
      await sleep(750);
    }

    console.log("Account founded or done created!");

    console.log("Try inserting teaching schedule...");

    await insertScheduleDataAndCreateNewSubjectIfNotExist(
      jsonData,
      teacher_id as string
    );

    console.log("Teaching schedule inserted!");

    console.log("\n-----------------\n");

    teacherDone.push(jsonData[0].teachers_name ?? jsonData[0].teacher_name);
  }

  console.log("Skipped teachers: ", skippedTeachers);
  console.log("Teachers completed: ", teacherDone);
}

async function updateAllClassWithHomeRoomTeachers() {
  for (let i = 0; i < KNOWN_HOMEROOM_TEACHERS.length; i++) {
    let teach = KNOWN_HOMEROOM_TEACHERS[i];

    let teacherFirstName: string = teach.name.split(" ")[0];

    teacherFirstName = teacherFirstName.toLowerCase();

    let teacherExist = await db
      .select()
      .from(teacher)
      .where(like(sql`lower(${teacher.name})`, `%${teacherFirstName}%`))
      .limit(1);

    let teacher_id: string | undefined, currTeacher: any;

    if (teacherExist.length == 0) {
      console.log("Teacher not exist!");
      console.log(teacherFirstName);

      await sleep(750);

      console.log("Checking known teacher list...");

      let knownTeacher = await findKnownTeacherNotInSystem(teacherFirstName);

      if (!knownTeacher) {
        console.log("Teacher not found in known teacher list!");
        console.log("Skipping teacher...");
        await sleep(750);
        continue;
      }

      teacher_id = knownTeacher.id;
    }

    if (teacherExist.length > 1) {
      console.log("Teacher exist!, but more than 1 teacher found!");
      console.log("Getting the right one...");
      await sleep(750);

      let teacherSecondName: string = teach.name.split(" ")[1];
      teacherSecondName = teacherSecondName.toLowerCase();

      let foundedOne = teacherExist.find((teacher) =>
        teacher.name
          .toLowerCase()
          .includes(teacherFirstName + " " + teacherSecondName)
      );

      if (!foundedOne) {
        console.log("Teacher not found in known teacher list!");
        console.log("Skipping teacher...");
        await sleep(750);

        continue;
      }

      currTeacher = foundedOne;

      teacher_id = foundedOne.teacher_id;
    }

    if (teacherExist.length == 1) {
      console.log("Teacher exist!");
      await sleep(750);
      currTeacher = teacherExist[0];
      teacher_id = teacherExist[0].teacher_id;
    }

    let splitClassName = teach.study_group_name.split(" ");

    let grade: any = splitClassName[0].toUpperCase();

    let major = splitClassName[1].toUpperCase();

    let classNumber = splitClassName[2] ?? "";

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

    if (studyGroupData.length == 0) {
      console.log(`Study group ${teach.study_group_name} not found!`);
      continue;
    }

    await db
      .update(studyGroup)
      .set({homeroom_teacher_id: teacher_id})
      .where(eq(studyGroup.study_groups_id, studyGroupData[0].study_groups_id as string));
  }
}

await truncateAllSchedules();
await veryFirstTimeSeeder();
await updateAllClassWithHomeRoomTeachers();
