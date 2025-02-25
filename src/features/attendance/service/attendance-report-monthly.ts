// Import the required library
import ExcelJS from "exceljs";

interface AttendanceData {
  nama: string;
  kelas: string;
  tanggal: string;
  status: string;
}

async function generateExcel(data: AttendanceData[], year: number, month: number): Promise<void> {
  // Generate an array of dates for the given month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return `${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`;
  });

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  // Create the header row
  const header = ["No", "Nama", "Kelas", ...dates];
  worksheet.addRow(header);

  // Populate the data rows
  data.forEach((item, index) => {
    const row = [
      index + 1, // No
      item.nama, // Nama
      item.kelas, // Kelas
    ];

    // Add the status for each date in the month
    dates.forEach((date) => {
      row.push(item.tanggal === date ? item.status : "-");
    });

    worksheet.addRow(row);
  });

  // Apply styles for status-based coloring
  worksheet.eachRow((row: any , rowIndex: any) => {
    if (rowIndex === 1) return; // Skip header row

    row.eachCell((cell: any, colIndex: any) => {
      if (colIndex > 3) { // Start coloring from the date columns
        if (cell.value === "Hadir") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "C6EFCE" }, // Green
          };
        } else if (cell.value === "Absen" || cell.value === "-") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFC7CE" }, // Red
          };
        } else if (cell.value === "Izin") {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFEB9C" }, // Yellow
          };
        }
      }
    });
  });

  // Write the workbook to a file
  await workbook.xlsx.writeFile("Attendance.xlsx");
  console.log("Attendance.xlsx has been created");
}

// Example data
const data: AttendanceData[] = [
  {
    nama: "Udin Rahmat",
    kelas: "XI PPLG 1",
    tanggal: "01-01-2025",
    status: "Hadir",
  },
  {
    nama: "Budi Santoso",
    kelas: "XI PPLG 2",
    tanggal: "02-01-2025",
    status: "Absen",
  },
  {
    nama: "Siti Aminah",
    kelas: "XI PPLG 3",
    tanggal: "01-01-2025",
    status: "Izin",
  },
  {
    nama: "Andi Wijaya",
    kelas: "XI PPLG 1",
    tanggal: "03-01-2025",
    status: "Hadir",
  },
  {
    nama: "Rina Marlina",
    kelas: "XI PPLG 2",
    tanggal: "04-01-2025",
    status: "Absen",
  },
  {
    nama: "Eka Setiawan",
    kelas: "XI PPLG 3",
    tanggal: "05-01-2025",
    status: "Hadir",
  },
  {
    nama: "Lia Permata",
    kelas: "XI PPLG 1",
    tanggal: "06-01-2025",
    status: "Izin",
  },
  {
    nama: "Fajar Nugraha",
    kelas: "XI PPLG 2",
    tanggal: "07-01-2025",
    status: "Hadir",
  },
  {
    nama: "Dewi Sartika",
    kelas: "XI PPLG 3",
    tanggal: "08-01-2025",
    status: "Absen",
  },
  {
    nama: "Hendra Kurniawan",
    kelas: "XI PPLG 1",
    tanggal: "09-01-2025",
    status: "Hadir",
  },
  {
    nama: "Maria Sulastri",
    kelas: "XI PPLG 2",
    tanggal: "10-01-2025",
    status: "Izin",
  },
  {
    nama: "Rudi Hartono",
    kelas: "XI PPLG 3",
    tanggal: "11-01-2025",
    status: "Absen",
  },
  {
    nama: "Tina Wulandari",
    kelas: "XI PPLG 1",
    tanggal: "12-01-2025",
    status: "Hadir",
  },
  {
    nama: "Fikri Maulana",
    kelas: "XI PPLG 2",
    tanggal: "13-01-2025",
    status: "Izin",
  },
  {
    nama: "Yuni Kartika",
    kelas: "XI PPLG 3",
    tanggal: "14-01-2025",
    status: "Hadir",
  },
  {
    nama: "Eko Susanto",
    kelas: "XI PPLG 1",
    tanggal: "15-01-2025",
    status: "Absen",
  },
  {
    nama: "Nina Setiani",
    kelas: "XI PPLG 2",
    tanggal: "16-01-2025",
    status: "Hadir",
  },
  {
    nama: "Dani Priyanto",
    kelas: "XI PPLG 3",
    tanggal: "17-01-2025",
    status: "Izin",
  },
  {
    nama: "Fitri Ramadhani",
    kelas: "XI PPLG 1",
    tanggal: "18-01-2025",
    status: "Absen",
  },
  {
    nama: "Adi Santoso",
    kelas: "XI PPLG 2",
    tanggal: "19-01-2025",
    status: "Hadir",
  },
];

// Generate the Excel file for January 2025
generateExcel(data, 2025, 1);
