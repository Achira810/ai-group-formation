import * as XLSX from 'xlsx';
import DOMPurify from 'dompurify';
import { cleanStudentName } from '../utils/studentUtils.js';

export const safeSanitize = (val) => {
  if (!val) return '';
  const str = String(val).trim();
  if (typeof DOMPurify !== 'undefined' && typeof DOMPurify.sanitize === 'function') {
    return DOMPurify.sanitize(str);
  }
  return str.replace(/[<>]/g, '');
};

// Helper to convert grade letters or GPA to numeric 0-100 score
export const gradeToScore = (val) => {
  if (val === null || val === undefined) return 75;
  const str = String(val).trim().toUpperCase();

  // If already numeric (e.g. 85, 72.5)
  const num = parseFloat(str);
  if (!isNaN(num)) {
    if (num <= 4.2) {
      // GPA mapping
      if (num >= 3.7) return 95;
      if (num >= 3.3) return 85;
      if (num >= 3.0) return 78;
      if (num >= 2.5) return 68;
      if (num >= 2.0) return 58;
      return 48;
    }
    return Math.min(100, Math.max(20, Math.round(num)));
  }

  // Letter grades
  if (str === 'A+' || str === 'A') return 95;
  if (str === 'A-') return 88;
  if (str === 'B+') return 82;
  if (str === 'B') return 75;
  if (str === 'B-') return 70;
  if (str === 'C+') return 65;
  if (str === 'C') return 60;
  if (str === 'C-') return 55;
  if (str === 'D+') return 50;
  if (str === 'D') return 45;
  if (str === 'E' || str === 'F') return 35;

  return 75;
};

// Downloads the official KDU Faculty of Computing Examination Results Spreadsheet (Marks Format.xlsx)
export const downloadKDUMarksheetTemplate = (faculty, degree, year, semester, modules, sampleStudents = []) => {
  try {
    const link = document.createElement('a');
    link.href = '/Marks_Format.xlsx';
    link.setAttribute('download', 'Marks Format.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  } catch (err) {
    console.warn("Could not download /Marks_Format.xlsx directly, falling back to generator:", err);
  }

  const wb = XLSX.utils.book_new();

  // Construct structured rows mirroring official KDU format
  const rows = [];
  rows.push(["GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY"]);
  rows.push([faculty.toUpperCase()]);
  rows.push([`RESULTS OF ${degree.toUpperCase()} DEGREE`]);
  rows.push([`ACADEMIC YEAR: ${year.toUpperCase()} - ${semester.toUpperCase()}`]);
  rows.push([]); // Blank row

  // Header Row 1: Subject Codes
  const headerCodeRow = ["SR NO", "SVC NO / REGT NO", "SVC", "RANK", "NAME OF CANDIDATES"];
  // Header Row 2: Subject Names
  const headerNameRow = ["", "", "", "", ""];
  // Header Row 3: Sub columns (Marks / Grade)
  const headerSubRow = ["", "", "", "", ""];

  modules.forEach((mod) => {
    headerCodeRow.push(mod.code, "");
    headerNameRow.push(mod.name, `(${mod.credits})`);
    headerSubRow.push("Marks (0-100)", "Grade");
  });

  headerCodeRow.push("SGPA", "REMARKS");
  headerNameRow.push("", "");
  headerSubRow.push("", "");

  rows.push(headerCodeRow);
  rows.push(headerNameRow);
  rows.push(headerSubRow);

  // Student rows
  const studentsToExport = sampleStudents && sampleStudents.length > 0 ? sampleStudents : [
    { student_id: "D/COE/25/0019", full_name: "S. R. Achira Hathsidu", rank: "Officer Cadet" },
    { student_id: "D/COE/25/0020", full_name: "Piravahiny Muraleetharan", rank: "Day Scholar" },
    { student_id: "D/COE/25/0021", full_name: "K. M. K. Bandara", rank: "Day Scholar" },
    { student_id: "D/COE/25/0022", full_name: "T. D. L. Niluminda", rank: "Day Scholar" },
    { student_id: "D/COE/25/0023", full_name: "W. S. Muthugala", rank: "Day Scholar" },
    { student_id: "D/COE/25/0024", full_name: "Kasun Perera", rank: "Day Scholar" }
  ];

  studentsToExport.forEach((st, idx) => {
    const row = [
      idx + 1,
      st.student_id || `D/CE/25/00${idx + 1}`,
      "NAVY",
      st.rank || "Day Scholar",
      st.full_name || `Student ${idx + 1}`
    ];

    modules.forEach((mod) => {
      // If student has a recorded score, use it; otherwise provide a realistic sample mark (65-95)
      const existingScore = st.module_scores?.[mod.code] ?? (75 + ((idx * 7 + mod.code.charCodeAt(mod.code.length - 1)) % 22));
      const grade = existingScore >= 90 ? "A+" : existingScore >= 80 ? "A" : existingScore >= 70 ? "B" : "C+";
      row.push(existingScore, grade);
    });

    row.push(3.55, "PASS");
    rows.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Set column widths for readability
  ws['!cols'] = [
    { wch: 8 },  // SR NO
    { wch: 22 }, // REGT NO
    { wch: 10 }, // SVC
    { wch: 16 }, // RANK
    { wch: 32 }  // NAME
  ];
  modules.forEach(() => {
    ws['!cols'].push({ wch: 14 }, { wch: 10 });
  });
  ws['!cols'].push({ wch: 10 }, { wch: 14 });

  XLSX.utils.book_append_sheet(wb, ws, "Exam_Results");

  const cleanDegreeName = degree.replace(/[^a-zA-Z0-9]/g, "_");
  const fileName = `KDU_Results_${cleanDegreeName}_${year}_${semester}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

// Parser supporting official KDU multi-row layout (e.g. Marks Format.xlsx) and standard tabular spreadsheets
export const parseKDUMultiModuleSheet = (rawData, availableModules = []) => {
  if (!rawData || rawData.length === 0) return [];

  // Check if rawData is array-of-arrays (AOA) or array-of-objects
  let isAoa = Array.isArray(rawData[0]);
  if (!isAoa) {
    return parseFlatModuleSheet(rawData, availableModules);
  }

  const rows = rawData;
  let idColIdx = -1;
  let nameColIdx = -1;
  let subheaderRowIdx = -1;
  let maxSubheaderMatches = 0;
  let subjects = []; // { code, col, span: [startCol, endCol] }

  // 1. Identify subheader row (the row with highest count of FINAL, CAS, ES, GR markers)
  for (let r = 0; r < Math.min(25, rows.length); r++) {
    const row = rows[r];
    if (!Array.isArray(row)) continue;
    let matches = 0;
    for (let c = 0; c < row.length; c++) {
      const val = String(row[c] || '').trim().toUpperCase();
      if (val === 'GR' || val.includes('FINAL') || val.includes('CAS') || val.includes('ES (100%)')) {
        matches++;
      }
    }
    if (matches >= 3 && matches > maxSubheaderMatches) {
      maxSubheaderMatches = matches;
      subheaderRowIdx = r;
    }
  }

  // 2. Locate Subject Codes across rows 0-15 and detect ID & Name columns
  for (let r = 0; r < Math.min(18, rows.length); r++) {
    const row = rows[r];
    if (!Array.isArray(row)) continue;

    for (let c = 0; c < row.length; c++) {
      const cellVal = String(row[c] || '').trim();
      const upper = cellVal.toUpperCase().replace(/[\.\/\_\-]/g, ' ');

      // Detect ID Column
      if (idColIdx === -1 && (
        upper.includes("SVC NO") || upper.includes("INDEX NO") || upper.includes("STUDENT ID") || upper.includes("REG NO") || upper.includes("REGT NO")
      )) {
        idColIdx = c;
      }

      // Detect Candidate Name Column
      if (nameColIdx === -1 && (
        upper.includes("CANDIDATE") || upper.includes("FULL NAME") || upper.includes("STUDENT NAME")
      )) {
        nameColIdx = c;
      }

      // Detect Subject Codes (e.g. CM11033, CS11012, etc.)
      const codeMatch = cellVal.match(/\b([A-Z]{2,4}\d{4,5}[A-Z]?)\b/);
      if (codeMatch) {
        const foundCode = codeMatch[1];
        if (!subjects.some(s => s.code === foundCode)) {
          subjects.push({
            code: foundCode,
            col: c
          });
        }
      }
    }
  }

  // Fallback defaults if ID / Name columns found in typical KDU positions
  if (idColIdx === -1) idColIdx = 1;
  if (nameColIdx === -1) nameColIdx = 4;

  // Determine subject column spans (each subject spans until the next subject or +5 columns)
  subjects.sort((a, b) => a.col - b.col);
  for (let i = 0; i < subjects.length; i++) {
    const nextCol = subjects[i + 1] ? subjects[i + 1].col : subjects[i].col + 5;
    subjects[i].span = [subjects[i].col, nextCol - 1];
  }

  // 3. Data start row is strictly after subheader row (or row 13 fallback)
  const dataStartRowIdx = subheaderRowIdx !== -1 ? subheaderRowIdx + 1 : 13;

  // 4. Parse Student Records & Subject Scores
  const parsedStudents = [];
  const seen = new Set();

  for (let r = dataStartRowIdx; r < rows.length; r++) {
    const row = rows[r];
    if (!row) continue;

    const rawId = String(row[idColIdx] || '').trim();
    const rawName = String(row[nameColIdx] || '').trim();
    const combined = (rawId + ' ' + rawName).toUpperCase();

    // Skip empty or header/metadata rows
    if (!rawId && !rawName) continue;
    if (
      combined.includes("INDEX") ||
      combined.includes("CANDIDATE") ||
      combined.includes("SUBJECT NUMBER") ||
      combined.includes("SUBJECT WEIGHTS") ||
      combined.includes("CREDITS") ||
      combined.includes("GPA")
    ) {
      continue;
    }

    const studentId = safeSanitize(rawId || `STU-${parsedStudents.length + 1}`).slice(0, 30);
    const fullName = cleanStudentName(rawName || `Student ${studentId}`);
    const lowerId = studentId.toLowerCase();

    if (seen.has(lowerId)) continue;
    seen.add(lowerId);

    const moduleScores = {};

    subjects.forEach((s) => {
      let finalMark = null;
      let gradeMark = null;
      let anyMark = null;

      // Scan all subcolumns within this subject's column span
      for (let c = s.span[0]; c <= s.span[1]; c++) {
        const subheader = String(rows[subheaderRowIdx]?.[c] || '').toUpperCase();
        const cellVal = row[c];
        if (cellVal !== undefined && cellVal !== null && String(cellVal).trim() !== '') {
          const numVal = parseFloat(cellVal);
          if (subheader.includes("FINAL") && !isNaN(numVal)) {
            finalMark = gradeToScore(cellVal);
          } else if ((subheader === "GR" || subheader.includes("GR")) && gradeMark === null) {
            gradeMark = gradeToScore(cellVal);
          } else if (!isNaN(numVal) && anyMark === null) {
            anyMark = gradeToScore(cellVal);
          }
        }
      }

      const chosenScore = finalMark ?? gradeMark ?? anyMark;
      if (chosenScore !== null && chosenScore !== undefined) {
        moduleScores[s.code] = chosenScore;
      }
    });

    parsedStudents.push({
      student_id: studentId,
      full_name: fullName,
      module_scores: moduleScores,
      technical_score: Object.values(moduleScores)[0] || 75
    });
  }

  if (parsedStudents.length > 0) return parsedStudents;

  return [];
};

// Parser for flat standard spreadsheets (Student ID, Name, CS11012, etc.)
export const parseFlatModuleSheet = (rawData, availableModules = []) => {
  const parsedStudents = [];
  const seen = new Set();

  rawData.forEach((row, index) => {
    // Detect ID
    const rawId = row["Student ID"] || row["StudentId"] || row["SVC NO / REGT NO"] || row["Reg No"] || row["ID"] || `STU-${index + 1}`;
    const studentId = safeSanitize(String(rawId).trim()).slice(0, 30);
    const lowerId = studentId.toLowerCase();
    if (seen.has(lowerId)) return;
    seen.add(lowerId);

    // Detect Name
    const rawName = row["Full Name"] || row["NAME OF CANDIDATES"] || row["Name"] || row["Candidate Name"] || `Student ${studentId}`;
    const fullName = cleanStudentName(String(rawName));

    // Detect all module scores across row keys
    const moduleScores = {};
    Object.keys(row).forEach((colName) => {
      const val = row[colName];
      if (val === undefined || val === null || val === '') return;

      // Check if colName contains a module code or matches an available module
      const codeMatch = colName.match(/\b([A-Z]{2,4}\d{4,5}[A-Z]?)\b/);
      if (codeMatch) {
        moduleScores[codeMatch[1]] = gradeToScore(val);
      } else {
        const matchingModule = availableModules.find(
          m => m.name.toLowerCase() === colName.toLowerCase() || colName.toLowerCase().includes(m.code.toLowerCase())
        );
        if (matchingModule) {
          moduleScores[matchingModule.code] = gradeToScore(val);
        }
      }
    });

    const defaultScore = row["Score"] || row["GPA"] || row["Z-Score"] || Object.values(moduleScores)[0] || 75;

    parsedStudents.push({
      student_id: studentId,
      full_name: fullName,
      degree_program: row["Degree Program"] || row["Program"] || row["Degree"] || "BSc (Hons) Computer Science",
      academicYear: row["Academic Year"] || row["Year"] || "1st Year",
      module_scores: moduleScores,
      technical_score: gradeToScore(defaultScore)
    });
  });

  return parsedStudents;
};
