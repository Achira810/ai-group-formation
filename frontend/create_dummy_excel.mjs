import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const studentsList = [
  { id: "D/CS/24/0001", name: "S. R. Achira Hathsidu", z: 2.1450 },
  { id: "D/CS/24/0002", name: "Piravahiny Muraleetharan", z: 2.3120 },
  { id: "D/CS/24/0003", name: "K. M. Kasun Bandara", z: 1.8420 },
  { id: "D/CS/24/0004", name: "T. D. Lakshan Niluminda", z: 1.6250 },
  { id: "D/CS/24/0005", name: "N. H. Shenal Fernando", z: 1.9540 },
  { id: "D/CS/24/0006", name: "M. A. Kavindi Jayasinghe", z: 2.2100 },
  { id: "D/CS/24/0007", name: "W. P. Dinuka Perera", z: 1.4320 },
  { id: "D/CS/24/0008", name: "B. M. Thisuri Silva", z: 1.7850 },
  { id: "D/CS/24/0009", name: "R. M. Sachithra Madusanka", z: 1.5120 },
  { id: "D/CS/24/0010", name: "H. G. Rashmika Senanayake", z: 2.0450 },
  { id: "D/CS/24/0011", name: "G. V. Malith Samarasinghe", z: 1.3890 },
  { id: "D/CS/24/0012", name: "K. L. Dilani Weerakkody", z: 1.8760 },
  { id: "D/CS/24/0013", name: "P. A. Nuwan Pradeep", z: 1.2540 },
  { id: "D/CS/24/0014", name: "A. B. Chathurika Wickramasinghe", z: 1.9980 },
  { id: "D/CS/24/0015", name: "S. K. Isuru Dananjaya", z: 1.4870 },
  { id: "D/CS/24/0016", name: "V. T. Anjana Karunaratne", z: 1.7210 },
  { id: "D/CS/24/0017", name: "J. M. Tharindu Dissanayake", z: 1.6340 },
  { id: "D/CS/24/0018", name: "D. S. Oshani Gunawardena", z: 2.1890 },
  { id: "D/CS/24/0019", name: "U. L. Vimukthi Jayawardena", z: 1.3450 },
  { id: "D/CS/24/0020", name: "R. A. Harsha Rathnayake", z: 1.5670 },
  { id: "D/CS/24/0021", name: "T. M. Pawani Alahakoon", z: 1.8120 },
  { id: "D/CS/24/0022", name: "K. P. Asanka Sandaruwan", z: 1.4110 },
  { id: "D/CS/24/0023", name: "S. N. Minoli Jayasuriya", z: 2.0780 },
  { id: "D/CS/24/0024", name: "E. M. Janith Kulatunga", z: 1.6950 },
  { id: "D/CS/24/0025", name: "M. D. Nadeesha Ranasinghe", z: 1.5230 }
];

// Seeded pseudorandom generator based on student index and module string
function getDeterministicMark(baseScore, varianceSeed, min = 45, max = 98) {
  let hash = 0;
  for (let i = 0; i < varianceSeed.length; i++) {
    hash = (hash << 5) - hash + varianceSeed.charCodeAt(i);
    hash |= 0;
  }
  const offset = (Math.abs(hash) % 19) - 9; // -9 to +9
  const result = Math.round(baseScore + offset);
  return Math.min(max, Math.max(min, result));
}

// 1. SEMESTER 1 DATASET
// Year 1 Semester I: Includes AL_ZSCORE, CS11012, CS11032, COE11013, CM11033, CM11102
const sem1Rows = studentsList.map((st, idx) => {
  // Convert Z-score (~1.2 - 2.4) to base tech score ~60 - 95
  const base = Math.round(((st.z - 1.0) / 1.5) * 30 + 65);
  return {
    "Student ID": st.id,
    "Full Name": st.name,
    "Degree Program": "BSc (Hons) Computer Science",
    "Academic Year": "Year 1",
    "Semester": "Semester I",
    "AL_ZSCORE": st.z,
    "CS11012": getDeterministicMark(base + 4, st.id + "_CS11012"), // Fundamentals of Programming
    "CS11032": getDeterministicMark(base, st.id + "_CS11032"),     // Foundation of CS
    "COE11013": getDeterministicMark(base - 3, st.id + "_COE11013"), // Systems Architecture
    "CM11033": getDeterministicMark(base + 2, st.id + "_CM11033"), // Probability & Statistics
    "CM11102": getDeterministicMark(base + 1, st.id + "_CM11102")  // Mathematics for Computing
  };
});

// 2. SEMESTER 2 DATASET
// Year 1 Semester II: Includes CS12012, CS12023 (OOP), CS12033 (Networks), SE12012, CM12052
const sem2Rows = studentsList.map((st, idx) => {
  const base = Math.round(((st.z - 1.0) / 1.5) * 30 + 66);
  return {
    "Student ID": st.id,
    "Full Name": st.name,
    "Degree Program": "BSc (Hons) Computer Science",
    "Academic Year": "Year 1",
    "Semester": "Semester II",
    "CS12023": getDeterministicMark(base + 5, st.id + "_CS12023"), // OOP (Prereq: CS11012)
    "CS12012": getDeterministicMark(base + 1, st.id + "_CS12012"), // Web Development
    "CS12033": getDeterministicMark(base - 2, st.id + "_CS12033"), // Computer Networks
    "SE12012": getDeterministicMark(base + 3, st.id + "_SE12012"), // Software Analysis
    "CM12052": getDeterministicMark(base, st.id + "_CM12052")      // Discrete Mathematics
  };
});

// 3. SEMESTER 3 DATASET
// Year 2 Semester III: Includes CS21012 (OS), CS21022 (Data Structures), CS21032 (Adv OOP), CS21042 (Adv Networks), SE21012
const sem3Rows = studentsList.map((st, idx) => {
  const base = Math.round(((st.z - 1.0) / 1.5) * 30 + 67);
  return {
    "Student ID": st.id,
    "Full Name": st.name,
    "Degree Program": "BSc (Hons) Computer Science",
    "Academic Year": "Year 2",
    "Semester": "Semester III",
    "CS21012": getDeterministicMark(base - 1, st.id + "_CS21012"), // Operating Systems
    "CS21022": getDeterministicMark(base + 4, st.id + "_CS21022"), // Data Structures & Algorithms
    "CS21032": getDeterministicMark(base + 3, st.id + "_CS21032"), // Advanced OOP
    "CS21042": getDeterministicMark(base, st.id + "_CS21042"),     // Adv Networks
    "SE21012": getDeterministicMark(base + 2, st.id + "_SE21012")  // Requirements Engineering
  };
});

function exportToXlsx(data, filename, sheetName) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Set widths
  ws['!cols'] = [
    { wch: 18 }, // Student ID
    { wch: 32 }, // Full Name
    { wch: 28 }, // Degree Program
    { wch: 15 }, // Year
    { wch: 15 }, // Semester
    { wch: 14 }, // Score 1
    { wch: 14 }, // Score 2
    { wch: 14 }, // Score 3
    { wch: 14 }, // Score 4
    { wch: 14 }, // Score 5
    { wch: 14 }  // Score 6
  ];

  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const outPublic = path.resolve('public', filename);
  const outRoot = path.resolve('..', filename);

  XLSX.writeFile(wb, outPublic);
  XLSX.writeFile(wb, outRoot);
  console.log(`Successfully generated: ${filename}`);
}

exportToXlsx(sem1Rows, "KDU_Students_Sem1.xlsx", "Semester_1_Results");
exportToXlsx(sem2Rows, "KDU_Students_Sem2.xlsx", "Semester_2_Results");
exportToXlsx(sem3Rows, "KDU_Students_Sem3.xlsx", "Semester_3_Results");
