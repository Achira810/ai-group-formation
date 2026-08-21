import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

function App() {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]); 
  
  const [formData, setFormData] = useState({
    studentId: '', 
    fullName: '', 
    faculty: 'Faculty of Computing', 
    program: 'BSc (Hons) Computer Science', 
    gpa: '', 
    githubActivity: 'High'
  });

  const [allocationMode, setAllocationMode] = useState('groupSize'); 
  const [allocationValue, setAllocationValue] = useState(5); 

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    let { data, error } = await supabase.from('students').select('*');
    if (error) console.log("Error:", error);
    else setStudents(data || []);
  };

  const calculateFuzzyScore = (gpa, activity) => {
    let score = 30; 
    let gpaValue = parseFloat(gpa) || 0;

    if (gpaValue >= 3.5) score += 50;
    else if (gpaValue >= 3.0) score += 40;
    else if (gpaValue >= 2.5) score += 30;
    else if (gpaValue >= 2.0) score += 15;

    if (activity === 'High') score += 20;
    else if (activity === 'Medium') score += 10;

    return score > 100 ? 100 : score;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const calculatedTechScore = calculateFuzzyScore(formData.gpa, formData.githubActivity);
    
    const { error } = await supabase.from('students').insert([
      {
        student_id: formData.studentId,
        full_name: formData.fullName,
        degree_program: formData.program, 
        technical_score: calculatedTechScore,
        soft_skill_score: 75 
      }
    ]);

    if (!error) {
      fetchStudents(); 
      alert(`Student Added! AI Calculated Tech Score: ${calculatedTechScore}`);
      setFormData({...formData, studentId: '', fullName: '', gpa: ''}); 
    } else {
      alert("Error adding student. Check if ID already exists.");
    }
  };

  const runAIEngine = () => {
    if (students.length === 0) {
      alert("No students available to form groups.");
      return;
    }

    let numTeams = 0;
    if (allocationMode === 'groupSize') {
      numTeams = Math.ceil(students.length / allocationValue);
    } else {
      numTeams = allocationValue;
    }

    if (numTeams <= 0 || numTeams > students.length) {
      alert("Invalid allocation settings.");
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

    for (let iteration = 0; iteration < 2000; iteration++) {
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
  };

  const downloadGroupsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setTextColor(25, 135, 84);
    doc.text('KDU AI Group Formation Results', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
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
        fontSize: 10,
        cellPadding: 5,
        lineColor: [210, 214, 220],
        lineWidth: 0.3,
        textColor: [33, 37, 41],
        valign: 'middle'
      },
      headStyles: {
        fillColor: [25, 135, 84],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 250, 247]
      },
      columnStyles: {
        0: { cellWidth: 26, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 38 },
        2: { cellWidth: 48 },
        3: { cellWidth: 'auto' }
      },
      didDrawPage: (data) => {
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(`Page ${data.pageNumber}`, pageWidth - 14, 290, { align: 'right' });
      }
    });

    doc.save('kdu-ai-group-formation-results.pdf');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>KDU AI Group Formation System</h1>
      
      <div style={{ background: '#f8f9fa', padding: '20px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3 style={{ marginTop: '0', color: '#495057' }}>Campus-Wide Student Entry</h3>
        <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          
          <input value={formData.studentId} placeholder="Student ID" required onChange={(e) => setFormData({...formData, studentId: e.target.value})} style={{ padding: '8px', flex: '1', border: '1px solid #ced4da', borderRadius: '4px', minWidth: '150px' }} />
          <input value={formData.fullName} placeholder="Full Name" required onChange={(e) => setFormData({...formData, fullName: e.target.value})} style={{ padding: '8px', flex: '1.5', border: '1px solid #ced4da', borderRadius: '4px', minWidth: '200px' }} />
          
          <select 
            value={formData.faculty} 
            onChange={(e) => {
              const selectedFaculty = e.target.value;
              setFormData({
                ...formData, 
                faculty: selectedFaculty, 
                program: campusData[selectedFaculty][0] 
              })
            }} 
            style={{ padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', flex: '2', minWidth: '250px' }}
          >
            {Object.keys(campusData).map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>

          <select 
            value={formData.program} 
            onChange={(e) => setFormData({...formData, program: e.target.value})} 
            style={{ padding: '8px', border: '1px solid #ced4da', borderRadius: '4px', flex: '2', minWidth: '250px' }}
          >
            {campusData[formData.faculty].map(degree => (
              <option key={degree} value={degree}>{degree}</option>
            ))}
          </select>

          <input type="number" step="0.01" min="0" max="4.2" value={formData.gpa} placeholder="GPA" required onChange={(e) => setFormData({...formData, gpa: e.target.value})} style={{ padding: '8px', width: '90px', border: '1px solid #ced4da', borderRadius: '4px' }} />

          <select value={formData.githubActivity} onChange={(e) => setFormData({...formData, githubActivity: e.target.value})} style={{ padding: '8px', border: '1px solid #ced4da', borderRadius: '4px' }}>
            <option value="High">GitHub: High</option>
            <option value="Medium">GitHub: Medium</option>
            <option value="Low">GitHub: Low</option>
          </select>

          <button type="submit" style={{ background: '#0d6efd', color: 'white', border: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
            Add
          </button>
        </form>
      </div>

      <h2>Registered Students</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginBottom: '20px', background: 'white' }}>
        <thead style={{ background: '#212529', color: 'white' }}>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Program</th>
            <th>AI Tech Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td>{student.student_id}</td>
              <td>{student.full_name}</td>
              <td>{student.degree_program}</td>
              <td style={{ color: '#dc3545', fontWeight: 'bold' }}>{student.technical_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ background: '#e0f7fa', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #b2ebf2', display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center' }}>
        <strong style={{ color: '#006064' }}>Allocation Rule:</strong>
        <select value={allocationMode} onChange={(e) => setAllocationMode(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #00838f', outline: 'none' }}>
          <option value="groupSize">Max Students per Group</option>
          <option value="teamCount">Exact Number of Teams</option>
        </select>
        
        <input type="number" min="1" value={allocationValue} onChange={(e) => setAllocationValue(Number(e.target.value))} style={{ padding: '8px', width: '80px', borderRadius: '4px', border: '1px solid #00838f', textAlign: 'center', outline: 'none' }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={runAIEngine} style={{ padding: '15px 30px', fontSize: '18px', background: '#198754', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontWeight: 'bold' }}>
          Run AI Allocation Engine
        </button>
      </div>

      {groups.length > 0 && (
        <div style={{ marginTop: '40px', padding: '25px', background: '#f1f3f5', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <h2 style={{ color: '#0dcaf0', margin: '0' }}>AI Balanced Inter-Faculty Teams</h2>
            <button onClick={downloadGroupsPDF} style={{ padding: '10px 16px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>
              Download Groups PDF
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white' }}>
              <thead style={{ background: '#198754', color: 'white' }}>
                <tr>
                  <th>Team</th>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Degree Program</th>
                  <th style={{ textAlign: 'center' }}>Average Tech Score</th>
                </tr>
              </thead>
              <tbody>
                {groups.flatMap((group, groupIndex) => {
                  const averageScore = group.length > 0
                    ? (group.reduce((sum, student) => sum + student.technical_score, 0) / group.length).toFixed(2)
                    : '0.00';

                  return group.map((student, studentIndex) => (
                    <tr key={`${groupIndex}-${student.id}`} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ fontWeight: 'bold', color: '#198754' }}>{studentIndex === 0 ? `Team ${String(groupIndex + 1).padStart(2, '0')}` : ''}</td>
                      <td>{student.student_id}</td>
                      <td>{student.full_name}</td>
                      <td>{student.degree_program}</td>
                      <td style={{ textAlign: 'center', color: '#0d6efd', fontWeight: 'bold' }}>{studentIndex === 0 ? averageScore : ''}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;