import { sendEmail } from "../../../common/utils/email-service";
import { generateDataTeacherNotConfirming } from "./attendance-confirmation-log-service";

async function generateReport() {

    let data: any[] = []; //await generateDataTeacherNotConfirming();

    let today = new Date();

    let todayId = Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",  
    }).format(today);
    
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 800px; margin: 0 auto;">
        <h1 style="text-align: center; color:rgb(31, 29, 29);">Laporan Absensi Kelas - ${todayId}</h1>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Ini adalah daftar guru yang tidak melakukan absensi di kelas hari ini!
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Nama Guru</th>
              <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Kelompok Studi</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (teacher: any) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${teacher.teacherName}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${teacher.studyGroups.join(", ")}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  
    return html;
  }

  const emailContent = await generateReport();


  function isIndonesianTime17() {
    const now = new Date();
  
    const jakartaTime = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);

    return jakartaTime === "17:00";
  }
  
  if (isIndonesianTime17()) {
    console.log(await sendEmail("abagaswitjaksono@gmail.com", "Laporan Absensi Kelas", emailContent));
  } else {
    console.log("It's not 17:00 in Indonesian time yet.");
  }
  


