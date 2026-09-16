import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import heroBanner from './assets/hero-banner.jpg';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// KDU Eke Thiyena All Faculties and Degrees Data
const campusData = {
  "Faculty of Computing": [
    "BSc (Hons) Computer Science", 
    "BSc (Hons) Software Engineering", 
    "BSc (Hons) Computer Engineering", 
    "BSc (Hons) Information Technology", 
    "BSc (Hons) Information Systems",
    "BSc (Hons) Data Science"
  ],
  "Faculty of Engineering": [
    "Civil Engineering", 
    "Mechanical Engineering", 
    "Electrical & Electronic Engineering", 
    "Electronic & Telecommunication", 
    "Aeronautical Engineering", 
    "Biomedical Engineering",
    "Naval Architecture & Marine Engineering"
  ],
  "Faculty of Management, Social Sciences & Humanities": [
    "BSc Management & Technical Sciences", 
    "BSc Logistics Management", 
    "BSc Social Sciences", 
    "BA in Applied Data Science Communication"
  ],
  "Faculty of Allied Health Sciences": [
    "BSc (Hons) Nursing", 
    "BSc (Hons) Physiotherapy", 
    "BSc (Hons) Medical Laboratory Sciences", 
    "BSc (Hons) Radiography", 
    "BSc (Hons) Radiotherapy", 
    "BSc (Hons) Pharmacy"
  ],
  "Faculty of Built Environment & Spatial Sciences": [
    "Bachelor of Architecture", 
    "BSc (Hons) Quantity Surveying", 
    "BSc (Hons) Spatial Sciences"
  ],
  "Faculty of Law": [
    "Bachelor of Laws (LLB)"
  ],
  "Faculty of Technology": [
    "BTech (Hons) in ICT", 
    "BTech (Hons) in Biosystems Technology"
  ],
  "Faculty of Criminal Justice": [
    "BSc in Criminology & Criminal Justice"
  ],
  "Faculty of Defence & Strategic Studies": [
    "BSc in Strategic Studies & International Relations"
  ]
};

const cleanStudentName = (name) => {
  if (!name) return 'Student';
  let cleaned = String(name)
    .replace(/^undefined\s*/gi, '')
    .replace(/\s*\(Hons\).*/gi, '')
    .replace(/\s*-\s*(BSc|BTech|Civil|Software|Data Science|Computer Science|IT|ICT|Logistics|Nursing|Management|Spatial|Quantity|Law|Criminology|Strategic).*/gi, '')
    .replace(/,\s*Social Sciences & Humanities.*/gi, '')
    .replace(/\s*(Civil|Engineering|Computing|Logistics|Humanities|Management|Science|Data|Software|Architecture|Nursing|Pharmacy)\s*$/gi, '')
    .trim();

  return cleaned || 'Student';
};

// Helper for avatar initials and colors
const getInitials = (name) => {
  const cleaned = cleanStudentName(name);
  if (!cleaned) return 'ST';
  const parts = cleaned.split(' ');
  if (parts.length >= 2 && parts[0] && parts[1] && parts[0][0] && parts[1][0]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
};

const getAvatarBg = (id) => {
  const colors = [
    'linear-gradient(135deg, #6366f1, #4f46e5)',
    'linear-gradient(135deg, #06b6d4, #0891b2)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #f59e0b, #d97706)',
    'linear-gradient(135deg, #ec4899, #db2777)',
    'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  ];
  let charCodeSum = 0;
  for (let i = 0; i < id.length; i++) charCodeSum += id.charCodeAt(i);
  return colors[charCodeSum % colors.length];
};

function App() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const [previewStudents, setPreviewStudents] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    studentId: '', 
    fullName: '', 
    academicYear: '1st Year',
    faculty: 'Faculty of Computing', 
    program: 'BSc (Hons) Computer Science', 
    scoreValue: ''
  });

  const [allocationMode, setAllocationMode] = useState('groupSize'); 
  const [allocationValue, setAllocationValue] = useState(''); 

  const downloadSampleExcel = () => {
    const sampleData = [
      {
        "Student ID": "D/BIT/24/0001",
        "Full Name": "Achira Hathsidu",
        "Academic Year": "1st Year",
        "Faculty": "Faculty of Computing",
        "Degree Program": "BSc (Hons) Computer Science",
        "Score": 1.854
      },
      {
        "Student ID": "D/BIT/24/0002",
        "Full Name": "Kasun Perera",
        "Academic Year": "2nd Year",
        "Faculty": "Faculty of Computing",
        "Degree Program": "BSc (Hons) Software Engineering",
        "Score": 3.75
      },
      {
        "Student ID": "D/ENG/24/0010",
        "Full Name": "Nimali Silva",
        "Academic Year": "1st Year",
        "Faculty": "Faculty of Engineering",
        "Degree Program": "Civil Engineering",
        "Score": 1.92
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "KDU_Student_Upload_Template.xlsx");
  };

  const parsePdfFile = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullTextLines = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      let linesMap = {};
      textContent.items.forEach(item => {
        if (!item.str || item.str.trim() === '') return;
        const y = Math.round(item.transform[5]);
        if (!linesMap[y]) linesMap[y] = [];
        linesMap[y].push({ x: item.transform[4], str: item.str });
      });

      const sortedY = Object.keys(linesMap).sort((a, b) => Number(b) - Number(a));

      sortedY.forEach(y => {
        const lineItems = linesMap[y].sort((a, b) => a.x - b.x);
        const lineStr = lineItems.map(it => it.str).join(' ').trim();
        if (lineStr) fullTextLines.push(lineStr);
      });
    }

    const existingIdsSet = new Set(students.map(s => s.student_id?.toLowerCase().trim()));
    const seenInFileSet = new Set();
    const parsedStudents = [];

    const studentIdRegex = /(D\/[A-Z0-9\/\-\_]+|[A-Z]{2,4}\/[A-Z0-9\/\-\_]+|[A-Z]{2,5}-\d{3,5}|\bSTU-\d+\b)/i;

    fullTextLines.forEach((line) => {
      const idMatch = line.match(studentIdRegex);
      if (!idMatch) return;

      const studentId = idMatch[0].trim();
      const lowerId = studentId.toLowerCase();

      const numbersMatch = line.match(/\b\d+(\.\d+)?\b/g);
      let scoreVal = 0;
      if (numbersMatch) {
        const floats = numbersMatch.map(n => parseFloat(n)).filter(n => !isNaN(n) && n > 0 && n <= 4.2);
        if (floats.length > 0) {
          scoreVal = floats[floats.length - 1];
        }
      }

      let rawName = line.replace(studentId, '').replace(/\b\d+(\.\d+)?\b/g, '').replace(/1st Year|2nd Year|3rd Year|4th Year|Faculty of \w+|BSc|Engineering|Computing|Management/gi, '').trim();
      let namePart = cleanStudentName(rawName);
      if (!namePart || namePart.length < 2) namePart = `Student ${studentId}`;

      const academicYear = line.includes('1st Year') ? '1st Year' : line.includes('2nd Year') ? '2nd Year' : line.includes('3rd Year') ? '3rd Year' : line.includes('4th Year') ? '4th Year' : '1st Year';
      const degreeProgram = 'BSc (Hons) Computer Science';

      const isDuplicate = existingIdsSet.has(lowerId) || seenInFileSet.has(lowerId);
      seenInFileSet.add(lowerId);

      const calculatedTechScore = calculateFuzzyScore(academicYear, scoreVal);
      const fullDegree = `${academicYear} - ${degreeProgram}`;

      parsedStudents.push({
        student_id: studentId,
        full_name: namePart,
        degree_program: fullDegree,
        technical_score: calculatedTechScore,
        soft_skill_score: 75,
        rawScore: scoreVal,
        academicYear: academicYear,
        isDuplicate: isDuplicate
      });
    });

    return parsedStudents;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.pdf')) {
        const parsed = await parsePdfFile(file);
        if (!parsed || parsed.length === 0) {
          alert("No student records detected in the PDF file. Please ensure the PDF contains Student IDs (e.g. D/BIT/24/0001) and Scores.");
          return;
        }
        setPreviewStudents(parsed);
        setShowPreviewModal(true);
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsName = wb.SheetNames[0];
            const ws = wb.Sheets[wsName];
            const rawData = XLSX.utils.sheet_to_json(ws);

            if (!rawData || rawData.length === 0) {
              alert("No data found in the uploaded file.");
              return;
            }

            const existingIdsSet = new Set(students.map(s => s.student_id?.toLowerCase().trim()));
            const seenInFileSet = new Set();

            const parsed = rawData.map((row, index) => {
              const rawId = row["Student ID"] || row["StudentId"] || row["ID"] || `STU-${index + 1}`;
              const studentId = String(rawId).trim();
              const lowerId = studentId.toLowerCase();
              const fullName = row["Full Name"] || row["Name"] || row["FullName"] || "Unknown Student";
              const academicYear = row["Academic Year"] || row["Year"] || "1st Year";
              const faculty = row["Faculty"] || "Faculty of Computing";
              const degreeProgram = row["Degree Program"] || row["Program"] || row["Degree"] || "BSc (Hons) Computer Science";
              const score = row["Score"] || row["GPA"] || row["Z-Score"] || row["ZScore"] || 0;

              const isDuplicate = existingIdsSet.has(lowerId) || seenInFileSet.has(lowerId);
              seenInFileSet.add(lowerId);

              const calculatedTechScore = calculateFuzzyScore(academicYear, score);
              const fullDegree = `${academicYear} - ${degreeProgram}`;

              return {
                student_id: studentId,
                full_name: String(fullName).trim(),
                degree_program: fullDegree,
                technical_score: calculatedTechScore,
                soft_skill_score: 75,
                rawScore: score,
                academicYear: academicYear,
                isDuplicate: isDuplicate
              };
            });

            setPreviewStudents(parsed);
            setShowPreviewModal(true);
          } catch (err) {
            console.error("Excel parse error:", err);
            alert("Failed to parse file. Please ensure it is a valid .xlsx, .xls, .csv or .pdf file.");
          }
        };
        reader.readAsBinaryString(file);
      }
    } catch (err) {
      console.error("File parse error:", err);
      alert(`Error reading file: ${err.message}`);
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleConfirmBatchImport = async () => {
    const validStudents = previewStudents.filter(s => !s.isDuplicate);
    if (validStudents.length === 0) {
      alert("All records in this file are duplicate Student IDs. No new records to import.");
      return;
    }

    const payload = validStudents.map(s => ({
      student_id: s.student_id,
      full_name: s.full_name,
      degree_program: s.degree_program,
      technical_score: s.technical_score,
      soft_skill_score: s.soft_skill_score
    }));

    const { error } = await supabase.from('students').insert(payload);

    if (!error) {
      const skippedCount = previewStudents.length - validStudents.length;
      alert(`Successfully imported ${payload.length} new students!${skippedCount > 0 ? ` (${skippedCount} duplicate IDs skipped)` : ''}`);
      fetchStudents();
      setShowPreviewModal(false);
      setPreviewStudents([]);
    } else {
      console.error("Batch import error:", error);
      alert(`Error saving imported students: ${error.message}`);
    }
  };

  useEffect(() => {
    clearOnStartup();
  }, []);

  const clearOnStartup = async () => {
    try {
      await supabase.from('students').delete().not('id', 'is', null);
    } catch (err) {
      console.log("Startup clear error:", err);
    }
    setStudents([]);
    setGroups([]);
  };

  const fetchStudents = async () => {
    let { data, error } = await supabase.from('students').select('*');
    if (error) console.log("Error:", error);
    else setStudents(data || []);
  };

  const calculateFuzzyScore = (academicYear, scoreVal) => {
    let val = parseFloat(scoreVal) || 0;
    let score = 50;

    if (academicYear === '1st Year') {
      // Z-Score mapping (0.0 to 3.0+)
      if (val >= 2.0) score = 95;
      else if (val >= 1.6) score = 85;
      else if (val >= 1.2) score = 75;
      else if (val >= 0.8) score = 65;
      else score = 55;
    } else {
      // GPA mapping (0.0 to 4.0)
      if (val >= 3.7) score = 95;
      else if (val >= 3.3) score = 85;
      else if (val >= 3.0) score = 78;
      else if (val >= 2.5) score = 68;
      else if (val >= 2.0) score = 58;
      else score = 45;
    }

    return score > 100 ? 100 : score;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const trimmedId = formData.studentId.trim();

    const isDuplicate = students.some(
      (s) => s.student_id?.toLowerCase().trim() === trimmedId.toLowerCase()
    );

    if (isDuplicate) {
      alert(`Student ID "${trimmedId}" is already registered. Duplicate Student IDs are not allowed!`);
      return;
    }

    const calculatedTechScore = calculateFuzzyScore(formData.academicYear, formData.scoreValue);
    const degreeWithYear = `${formData.academicYear} - ${formData.program}`;
    
    const { error } = await supabase.from('students').insert([
      {
        student_id: trimmedId,
        full_name: formData.fullName.trim(),
        degree_program: degreeWithYear, 
        technical_score: calculatedTechScore,
        soft_skill_score: 75 
      }
    ]);

    if (!error) {
      fetchStudents(); 
      setFormData({...formData, studentId: '', fullName: '', scoreValue: ''}); 
    } else {
      console.error('Error adding student:', error);
      alert(`Error adding student: ${error.message}`);
    }
  };

  const handleDeleteStudent = async (studentDbId) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', studentDbId);

    if (!error) {
      fetchStudents();
    } else {
      alert(`Error removing student: ${error.message}`);
    }
  };

  const handleResetStudents = async () => {
    if (students.length === 0) {
      alert('There are no students to clear.');
      return;
    }

    const confirmed = window.confirm(
      `This will permanently delete all ${students.length} registered students from Supabase. Continue?`
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from('students')
      .delete()
      .not('id', 'is', null);

    if (error) {
      console.error('Error clearing students:', error);
      alert(`Error clearing students: ${error.message}`);
      return;
    }

    setStudents([]);
    setGroups([]);
  };

  const runAIEngine = () => {
    if (students.length === 0) {
      alert("No students available to form groups.");
      return;
    }

    setIsOptimizing(true);

    setTimeout(() => {
      const targetVal = parseInt(allocationValue, 10);
      if (isNaN(targetVal) || targetVal <= 0) {
        alert("Please enter a valid number for allocation.");
        setIsOptimizing(false);
        return;
      }

      let numTeams = 0;
      if (allocationMode === 'groupSize') {
        numTeams = Math.ceil(students.length / targetVal);
      } else {
        numTeams = targetVal;
      }

      if (numTeams <= 0 || numTeams > students.length) {
        alert("Invalid allocation settings.");
        setIsOptimizing(false);
        return;
      }

      let sortedStudents = [...students].sort((a, b) => b.technical_score - a.technical_score);
      let currentGroups = Array.from({ length: numTeams }, () => []);

      let forward = true;
      let teamIndex = 0;
      sortedStudents.forEach((student) => {
        currentGroups[teamIndex].push(student);
        if (forward) {
          teamIndex++;
          if (teamIndex === numTeams) { teamIndex--; forward = false; }
        } else {
          teamIndex--;
          if (teamIndex < 0) { teamIndex++; forward = true; }
        }
      });

      const getSystemDifference = (groupsState) => {
        let maxAvg = -Infinity;
        let minAvg = Infinity;
        let penalty = 0;

        groupsState.forEach(group => {
          if (group.length === 0) return;
          let sum = group.reduce((tot, s) => tot + s.technical_score, 0);
          let avg = sum / group.length;

          if (avg > maxAvg) maxAvg = avg;
          if (avg < minAvg) minAvg = avg;

          let uniquePrograms = new Set(group.map(s => s.degree_program));
          if (uniquePrograms.size < 2 && group.length > 1) {
            penalty += 10; 
          }
        });

        return (maxAvg - minAvg) + penalty;
      };

      let bestGroups = currentGroups.map(g => [...g]);
      let bestDiff = getSystemDifference(bestGroups);

      for (let iteration = 0; iteration < 2500; iteration++) {
        let testGroups = bestGroups.map(g => [...g]); 

        let g1Index = Math.floor(Math.random() * numTeams);
        let g2Index = Math.floor(Math.random() * numTeams);
        if (g1Index === g2Index) continue;

        let group1 = testGroups[g1Index];
        let group2 = testGroups[g2Index];
        if (group1.length === 0 || group2.length === 0) continue;

        let s1Index = Math.floor(Math.random() * group1.length);
        let s2Index = Math.floor(Math.random() * group2.length);

        let temp = group1[s1Index];
        group1[s1Index] = group2[s2Index];
        group2[s2Index] = temp;

        let newDiff = getSystemDifference(testGroups);

        if (newDiff < bestDiff) {
          bestGroups = testGroups;
          bestDiff = newDiff;
        }
      }

      setGroups(bestGroups); 
      setIsOptimizing(false);
    }, 400);
  };

  const downloadGroupsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59);
    doc.text('KDU AI Group Formation Results', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    const tableRows = groups.flatMap((group, groupIndex) => group.map((student, studentIndex) => [
      studentIndex === 0 ? `Team ${String(groupIndex + 1).padStart(2, '0')}` : '',
      student.student_id,
      student.full_name,
      student.degree_program
    ]));

    autoTable(doc, {
      startY: 35,
      head: [['Team', 'Student ID', 'Name', 'Degree Program']],
      body: tableRows,
      theme: 'grid',
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 9,
        cellPadding: 5,
        lineColor: [226, 232, 240],
        lineWidth: 0.3,
        textColor: [51, 65, 85],
        valign: 'middle'
      },
      headStyles: {
        fillColor: [79, 70, 229],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'left'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        0: { cellWidth: 26, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 38 },
        2: { cellWidth: 50 },
        3: { cellWidth: 'auto' }
      },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(`Page ${data.pageNumber}`, pageWidth - 14, 290, { align: 'right' });
      }
    });

    doc.save('kdu-ai-group-formation-results.pdf');
  };

  const downloadGroupsExcel = () => {
    if (groups.length === 0) return;

    const exportRows = groups.flatMap((group, groupIndex) => 
      group.map((student) => ({
        "Team": `Team ${String(groupIndex + 1).padStart(2, '0')}`,
        "Student ID": student.student_id,
        "Full Name": cleanStudentName(student.full_name),
        "Degree Program": student.degree_program
      }))
    );

    const ws = XLSX.utils.json_to_sheet(exportRows);
    ws['!cols'] = [
      { wch: 12 },
      { wch: 18 },
      { wch: 30 },
      { wch: 45 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AI Teams Allocation");
    XLSX.writeFile(wb, "KDU_AI_Group_Formation_Results.xlsx");
  };

  const filteredStudents = students.filter(s => 
    s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.degree_program?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const avgTechScore = students.length > 0 
    ? (students.reduce((acc, curr) => acc + (curr.technical_score || 0), 0) / students.length).toFixed(1)
    : 0;

  return (
    <div className="modern-root">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background-color: #0f172a;
          color: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .modern-root {
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          padding: 24px 16px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-content {
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        /* Hero Banner */
        .hero-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 28px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
        }

        .hero-img-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
          overflow: hidden;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.75) contrast(1.1);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.65) 50%, rgba(15, 23, 42, 0.4) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 32px 40px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.2);
          border: 1px solid rgba(129, 140, 248, 0.3);
          color: #818cf8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          width: fit-content;
          margin-bottom: 12px;
        }

        .hero-title {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 15px;
          color: #94a3b8;
          margin: 0;
          max-width: 600px;
          line-height: 1.5;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .stat-val {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 13px;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }

        /* Panel Glass */
        .glass-panel {
          background: rgba(30, 41, 59, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 28px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .panel-title {
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Entry Form Grid */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
        }

        .col-2 { grid-column: span 2; }
        .col-3 { grid-column: span 3; }
        .col-4 { grid-column: span 4; }
        .col-6 { grid-column: span 6; }
        .col-12 { grid-column: span 12; }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e1;
          letter-spacing: 0.3px;
        }

        .modern-input, .modern-select {
          width: 100%;
          padding: 12px 14px;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .modern-input:focus, .modern-select:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
        }

        .modern-select option {
          background: #0f172a;
          color: #ffffff;
        }

        /* Buttons */
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.45);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .btn-danger {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-danger:hover {
          background: rgba(239, 68, 68, 0.3);
          color: #ffffff;
        }

        .btn-action-pdf {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-action-pdf:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.45);
        }

        /* Allocation Selector */
        .alloc-container {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .alloc-options {
          display: flex;
          background: #0f172a;
          padding: 4px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .alloc-tab {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .alloc-tab.active {
          background: #6366f1;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
        }

        .btn-run-ai {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 14px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-run-ai:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 24px -5px rgba(16, 185, 129, 0.55);
        }

        /* Modern Table */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .modern-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
          background: #0f172a;
        }

        .modern-table th {
          background: rgba(30, 41, 59, 0.9);
          padding: 14px 16px;
          color: #cbd5e1;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modern-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
        }

        .modern-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        /* Student Avatar Cell */
        .student-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 700;
          font-size: 13px;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        /* Score Pill */
        .score-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .score-bar-track {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
          min-width: 60px;
        }

        .score-bar-fill {
          height: 100%;
          border-radius: 9999px;
        }

        /* Teams Display Grid */
        .teams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .team-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: border-color 0.2s ease;
        }

        .team-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
        }

        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .team-title {
          font-size: 18px;
          font-weight: 700;
          color: #818cf8;
          margin: 0;
        }

        .team-score-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .team-member-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
          gap: 12px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .member-name {
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
          margin: 0;
        }

        .member-degree {
          font-size: 11px;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .col-2, .col-3, .col-4, .col-6 { grid-column: span 12; }
          .hero-img-wrapper { height: 200px; }
          .hero-title { font-size: 24px; }
          .hero-overlay { padding: 20px; }
          .alloc-container { flex-direction: column; align-items: stretch; }
          .teams-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container">
        
        {/* HERO BANNER */}
        <div className="hero-card">
          <div className="hero-img-wrapper">
            <img src={heroBanner} alt="KDU AI Group Formation" className="hero-img" />
            <div className="hero-overlay">
              <div className="hero-badge">
                ✨ KDU ACADEMIC AI SYSTEM
              </div>
              <h1 className="hero-title">AI Group Formation System</h1>
              <p className="hero-subtitle">
                Automated student team optimization powered by Fuzzy Logic Skill Profiling and Genetic Algorithm Balancing.
              </p>
            </div>
          </div>
        </div>

        {/* STATS DASHBOARD */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              🎓
            </div>
            <div>
              <p className="stat-val">{students.length}</p>
              <p className="stat-label">Registered Students</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              ⚡
            </div>
            <div>
              <p className="stat-val">{groups.length}</p>
              <p className="stat-label">Formed Teams</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              📊
            </div>
            <div>
              <p className="stat-val">{avgTechScore}</p>
              <p className="stat-label">Avg AI Technical Score</p>
            </div>
          </div>
        </div>

        {/* STUDENT REGISTRATION FORM PANEL */}
        <div className="glass-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span>➕</span> Register Student Profile
            </h2>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn-secondary" onClick={downloadSampleExcel}>
                <span>📥</span> Download Excel Template
              </button>

              <label className="btn-primary" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', cursor: 'pointer', margin: 0 }}>
                <span>📁</span> {isUploading ? 'Parsing File...' : 'Upload Excel / CSV / PDF'}
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv, .pdf"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          <form onSubmit={handleAddStudent} className="form-grid">
            <div className="input-group col-2">
              <label className="input-label">Student ID</label>
              <input
                className="modern-input"
                value={formData.studentId}
                placeholder="e.g. D/BIT/24/0001"
                required
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>

            <div className="input-group col-3">
              <label className="input-label">Full Name</label>
              <input
                className="modern-input"
                value={formData.fullName}
                placeholder="e.g. Achira Hathsidu"
                required
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="input-group col-2">
              <label className="input-label">Academic Year</label>
              <select
                className="modern-select"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value, scoreValue: '' })}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div className="input-group col-3">
              <label className="input-label">Faculty</label>
              <select
                className="modern-select"
                value={formData.faculty}
                onChange={(e) => {
                  const selectedFaculty = e.target.value;
                  setFormData({
                    ...formData,
                    faculty: selectedFaculty,
                    program: campusData[selectedFaculty][0]
                  });
                }}
              >
                {Object.keys(campusData).map((faculty) => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>

            <div className="input-group col-4">
              <label className="input-label">Degree Program</label>
              <select
                className="modern-select"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              >
                {campusData[formData.faculty].map((degree) => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>

            {formData.academicYear === '1st Year' ? (
              <div className="input-group col-2">
                <label className="input-label">A/L Z-Score</label>
                <input
                  className="modern-input"
                  type="number"
                  step="0.0001"
                  min="0"
                  max="3.5"
                  value={formData.scoreValue}
                  placeholder="e.g. 1.854"
                  required
                  onChange={(e) => setFormData({ ...formData, scoreValue: e.target.value })}
                />
              </div>
            ) : (
              <div className="input-group col-2">
                <label className="input-label">GPA (0.0 - 4.0)</label>
                <input
                  className="modern-input"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={formData.scoreValue}
                  placeholder="e.g. 3.75"
                  required
                  onChange={(e) => setFormData({ ...formData, scoreValue: e.target.value })}
                />
              </div>
            )}

            <div className="col-3" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <span>✨</span> Add Student Profile
              </button>
            </div>
          </form>
        </div>

        {/* REGISTERED STUDENTS LIST PANEL */}
        <div className="glass-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span>📋</span> Registered Student Roster ({filteredStudents.length})
            </h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                className="modern-input"
                style={{ width: '220px', padding: '8px 12px' }}
                placeholder="🔍 Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="btn-secondary" onClick={handleResetStudents}>
                Clear All Data
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>ID</th>
                  <th>Degree Program</th>
                  <th>AI Tech Score</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                      No students registered yet. Add a student using the form above.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const score = student.technical_score || 0;
                    const fillColor = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
                    
                    return (
                      <tr key={student.id}>
                        <td>
                          <div className="student-cell">
                            <div className="avatar-circle" style={{ background: getAvatarBg(student.student_id || 'ST') }}>
                              {getInitials(student.full_name)}
                            </div>
                            <span style={{ fontWeight: '600' }}>{cleanStudentName(student.full_name)}</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'monospace', color: '#818cf8' }}>{student.student_id}</td>
                        <td>{student.degree_program}</td>
                        <td>
                          <div className="score-bar-wrapper">
                            <div className="score-bar-track">
                              <div className="score-bar-fill" style={{ width: `${score}%`, background: fillColor }}></div>
                            </div>
                            <span style={{ fontWeight: '700', color: fillColor }}>{score}</span>
                          </div>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn-danger" onClick={() => handleDeleteStudent(student.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI ALLOCATION CONTROLS PANEL */}
        <div className="glass-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span>🧠</span> AI Team Formation Configurator
            </h2>
          </div>

          <div className="alloc-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="input-label" style={{ fontSize: '14px' }}>Allocation Rule:</span>
              <div className="alloc-options">
                <button
                  type="button"
                  className={`alloc-tab ${allocationMode === 'groupSize' ? 'active' : ''}`}
                  onClick={() => setAllocationMode('groupSize')}
                >
                  Max Members per Team
                </button>
                <button
                  type="button"
                  className={`alloc-tab ${allocationMode === 'teamCount' ? 'active' : ''}`}
                  onClick={() => setAllocationMode('teamCount')}
                >
                  Exact Number of Teams
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="input-label" style={{ fontSize: '14px' }}>
                {allocationMode === 'groupSize' ? 'Max Students per Group:' : 'Total Teams:'}
              </span>
              <input
                className="modern-input"
                type="number"
                min="1"
                placeholder="e.g. 5"
                style={{ width: '90px', textAlign: 'center', fontWeight: '700' }}
                value={allocationValue}
                onChange={(e) => setAllocationValue(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-run-ai" onClick={runAIEngine} disabled={isOptimizing}>
            {isOptimizing ? '⏳ Running Genetic Optimizer...' : '⚡ Generate AI Balanced Teams'}
          </button>
        </div>

        {/* AI GENERATED TEAMS RESULTS GRID */}
        {groups.length > 0 && (
          <div className="glass-panel">
            <div className="panel-header">
              <h2 className="panel-title" style={{ color: '#34d399' }}>
                <span>🎯</span> Optimized Team Allocations ({groups.length} Teams)
              </h2>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button className="btn-action-pdf" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }} onClick={downloadGroupsExcel}>
                  <span>📗</span> Export Excel (.xlsx)
                </button>
                <button className="btn-action-pdf" onClick={downloadGroupsPDF}>
                  <span>📄</span> Export PDF Report
                </button>
              </div>
            </div>

            <div className="teams-grid">
              {groups.map((group, groupIndex) => {
                const avgScore = group.length > 0
                  ? (group.reduce((sum, s) => sum + s.technical_score, 0) / group.length).toFixed(1)
                  : '0.0';

                const uniqueDegrees = new Set(group.map(s => s.degree_program)).size;

                return (
                  <div key={groupIndex} className="team-card">
                    <div className="team-header">
                      <h3 className="team-title">Team {String(groupIndex + 1).padStart(2, '0')}</h3>
                      <div className="team-score-badge">
                        Avg Tech Score: {avgScore}
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', gap: '10px' }}>
                      <span>👥 {group.length} Members</span>
                      <span>🎓 {uniqueDegrees} Disciplines</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {group.map((student) => (
                        <div key={student.id} className="team-member-item">
                          <div className="member-info">
                            <div className="avatar-circle" style={{ width: '30px', height: '30px', fontSize: '11px', background: getAvatarBg(student.student_id || 'ST') }}>
                              {getInitials(student.full_name)}
                            </div>
                            <div>
                              <p className="member-name">{cleanStudentName(student.full_name)}</p>
                              <p className="member-degree">{student.degree_program}</p>
                            </div>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#818cf8' }}>
                            {student.technical_score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EXCEL IMPORT BATCH PREVIEW MODAL */}
        {showPreviewModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="panel-header" style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', margin: 0 }}>
                <h3 className="panel-title" style={{ margin: 0 }}>
                  <span>📊</span> Confirm Excel Batch Import ({previewStudents.length} Students)
                </h3>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => { setShowPreviewModal(false); setPreviewStudents([]); }}
                >
                  ✕ Close
                </button>
              </div>

              <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: 0 }}>
                  The following records were parsed from your file. Please verify calculated AI Technical Scores before importing:
                </p>

                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student ID</th>
                        <th>Full Name</th>
                        <th>Degree Program</th>
                        <th>File Score</th>
                        <th>Calculated AI Tech Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewStudents.map((s, idx) => (
                        <tr key={idx} style={{ opacity: s.isDuplicate ? 0.6 : 1, background: s.isDuplicate ? 'rgba(239, 68, 68, 0.08)' : 'transparent' }}>
                          <td>{idx + 1}</td>
                          <td style={{ fontFamily: 'monospace', color: s.isDuplicate ? '#f87171' : '#818cf8', fontWeight: 'bold' }}>
                            {s.student_id}
                            {s.isDuplicate && (
                              <span style={{ marginLeft: '8px', fontSize: '11px', background: 'rgba(239,68,68,0.2)', color: '#f87171', padding: '2px 6px', borderRadius: '4px' }}>
                                ⚠️ Duplicate (Skipped)
                              </span>
                            )}
                          </td>
                          <td style={{ fontWeight: '600' }}>{s.full_name}</td>
                          <td>{s.degree_program}</td>
                          <td>{s.rawScore}</td>
                          <td>
                            <span style={{ fontWeight: '700', color: s.isDuplicate ? '#94a3b8' : s.technical_score >= 75 ? '#10b981' : '#f59e0b' }}>
                              {s.technical_score}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#0f172a' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => { setShowPreviewModal(false); setPreviewStudents([]); }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                  onClick={handleConfirmBatchImport}
                >
                  <span>✅</span> Confirm & Save {previewStudents.filter(s => !s.isDuplicate).length} New Students
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;