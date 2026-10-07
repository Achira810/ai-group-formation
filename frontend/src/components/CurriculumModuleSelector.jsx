import React, { useState, useMemo, useEffect } from 'react';
import {
  KDU_FACULTIES,
  CAMPUS_FACULTY_DEGREES,
  DEGREE_CURRICULUM,
  getSemestersForYear,
  getPrerequisiteRecommendation,
  getAvailablePriorModules,
  getAllPrerequisiteRecommendations
} from '../data/curriculumData';

export const CurriculumModuleSelector = ({
  selectedFaculty,
  setSelectedFaculty,
  selectedDegree,
  setSelectedDegree,
  selectedYear,
  setSelectedYear,
  selectedSemester,
  setSelectedSemester,
  selectedModuleCode,
  setSelectedModuleCode,
  availableModules = [],
  activeModule,
  onDownloadTemplate,
  filterByDegree,
  setFilterByDegree,
  moduleStats,
  evaluationMode = 'prerequisite',
  setEvaluationMode,
  selectedPrerequisiteCode,
  setSelectedPrerequisiteCode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL'); // 'ALL' | 'COMPULSORY' | 'ELECTIVE'

  // Degrees available dynamically under any selected faculty
  const availableDegrees = selectedFaculty && CAMPUS_FACULTY_DEGREES[selectedFaculty]
    ? CAMPUS_FACULTY_DEGREES[selectedFaculty]
    : selectedFaculty === "Faculty of Computing"
      ? Object.keys(DEGREE_CURRICULUM)
      : [];

  const availableSemesters = selectedYear ? getSemestersForYear(selectedYear) : [];

  const handleFacultyChange = (newFac) => {
    setSelectedFaculty(newFac);
    setSelectedDegree('');
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedModuleCode('');
    setSearchQuery('');
  };

  const handleDegreeChange = (newDeg) => {
    setSelectedDegree(newDeg);
    setSelectedYear('');
    setSelectedSemester('');
    setSelectedModuleCode('');
    setSearchQuery('');
  };

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
    setSelectedSemester('');
    setSelectedModuleCode('');
    setSearchQuery('');
  };

  const handleSemesterChange = (newSem) => {
    setSelectedSemester(newSem);
    setSelectedModuleCode('');
    setSearchQuery('');
  };

  // Filter modules by search query & category
  const filteredModules = useMemo(() => {
    if (!availableModules || availableModules.length === 0) return [];
    let list = availableModules;

    if (filterCategory !== 'ALL') {
      list = list.filter(m => (m.category || '').toUpperCase() === filterCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m =>
        m.code.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q) ||
        (m.category && m.category.toLowerCase().includes(q)) ||
        (m.credits && m.credits.toLowerCase().includes(q))
      );
    }

    return list;
  }, [availableModules, searchQuery, filterCategory]);

  const isCascadingComplete = Boolean(selectedFaculty && selectedDegree && selectedYear && selectedSemester);

  const isSem1 = useMemo(() => {
    const sem = (selectedSemester || '').toLowerCase().trim();
    return sem === 'semester i' || sem === 'semester 1' || sem === 'sem 1' || sem === 'sem i' || sem === '1';
  }, [selectedSemester]);

  const prerequisiteInfo = useMemo(() => {
    return activeModule ? getPrerequisiteRecommendation(activeModule.code) : null;
  }, [activeModule]);

  const allPrerequisites = useMemo(() => {
    if (!activeModule) return [];
    return getAllPrerequisiteRecommendations(
      activeModule,
      selectedFaculty,
      selectedDegree,
      selectedYear,
      selectedSemester
    );
  }, [activeModule, selectedFaculty, selectedDegree, selectedYear, selectedSemester]);

  const availablePriorModules = useMemo(() => {
    return getAvailablePriorModules(selectedFaculty, selectedDegree, selectedYear, selectedSemester);
  }, [selectedFaculty, selectedDegree, selectedYear, selectedSemester]);

  // Automatically sync recommended prerequisite code (or AL_ZSCORE for 1st Sem)
  useEffect(() => {
    if (setSelectedPrerequisiteCode) {
      if (isSem1) {
        setSelectedPrerequisiteCode('AL_ZSCORE');
      } else if (allPrerequisites.length > 0) {
        setSelectedPrerequisiteCode(allPrerequisites.map(p => p.code).join(', '));
      } else if (activeModule && prerequisiteInfo?.code) {
        setSelectedPrerequisiteCode(prerequisiteInfo.code);
      } else {
        setSelectedPrerequisiteCode('');
      }
    }
  }, [activeModule?.code, prerequisiteInfo?.code, isSem1, allPrerequisites, setSelectedPrerequisiteCode]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.9) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.35)',
      borderRadius: '16px',
      padding: '22px 24px',
      marginBottom: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎓</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.3px' }}>
              Academic Curriculum & Module-Specific Competency Profiler
            </h3>
          </div>
          <p style={{ margin: '4px 0 0 34px', fontSize: '12px', color: '#94a3b8' }}>
            Select Faculty, Degree, Year and Semester to search and load syllabus modules for AI group balancing
          </p>
        </div>

        <button
          type="button"
          onClick={onDownloadTemplate}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 16px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#ffffff',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
            transition: 'all 0.2s ease'
          }}
          title="Download official KDU examination marksheet Excel template"
        >
          <span>📥</span> Download KDU Marksheet Template (.xlsx)
        </button>
      </div>

      {/* 4-Step Cascading Selectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {/* 1. Faculty */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
            1. Faculty {selectedFaculty ? '✓' : ''}
          </label>
          <select
            className="modern-select"
            value={selectedFaculty}
            onChange={(e) => handleFacultyChange(e.target.value)}
            style={{ width: '100%', fontSize: '13px', padding: '10px 12px', borderRadius: '10px', borderColor: selectedFaculty ? '#6366f1' : 'rgba(255,255,255,0.15)' }}
          >
            <option value="">-- Select Faculty --</option>
            {KDU_FACULTIES.map((fac) => (
              <option key={fac} value={fac}>{fac}</option>
            ))}
          </select>
        </div>

        {/* 2. Degree Program */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
            2. Degree Program {selectedDegree ? '✓' : ''}
          </label>
          <select
            className="modern-select"
            value={selectedDegree}
            onChange={(e) => handleDegreeChange(e.target.value)}
            disabled={!selectedFaculty}
            style={{
              width: '100%',
              fontSize: '13px',
              padding: '10px 12px',
              borderRadius: '10px',
              opacity: !selectedFaculty ? 0.5 : 1,
              cursor: !selectedFaculty ? 'not-allowed' : 'pointer',
              borderColor: selectedDegree ? '#6366f1' : 'rgba(255,255,255,0.15)'
            }}
          >
            <option value="">-- Select Degree Program --</option>
            {availableDegrees.map((deg) => (
              <option key={deg} value={deg}>{deg}</option>
            ))}
          </select>
        </div>

        {/* 3. Academic Year */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
            3. Academic Year {selectedYear ? '✓' : ''}
          </label>
          <select
            className="modern-select"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            disabled={!selectedDegree}
            style={{
              width: '100%',
              fontSize: '13px',
              padding: '10px 12px',
              borderRadius: '10px',
              opacity: !selectedDegree ? 0.5 : 1,
              cursor: !selectedDegree ? 'not-allowed' : 'pointer',
              borderColor: selectedYear ? '#6366f1' : 'rgba(255,255,255,0.15)'
            }}
          >
            <option value="">-- Select Academic Year --</option>
            <option value="Year 1">Year 1 (1st Year)</option>
            <option value="Year 2">Year 2 (2nd Year)</option>
            <option value="Year 3">Year 3 (3rd Year)</option>
            <option value="Year 4">Year 4 (4th Year)</option>
          </select>
        </div>

        {/* 4. Semester */}
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
            4. Semester {selectedSemester ? '✓' : ''}
          </label>
          <select
            className="modern-select"
            value={selectedSemester}
            onChange={(e) => handleSemesterChange(e.target.value)}
            disabled={!selectedYear}
            style={{
              width: '100%',
              fontSize: '13px',
              padding: '10px 12px',
              borderRadius: '10px',
              opacity: !selectedYear ? 0.5 : 1,
              cursor: !selectedYear ? 'not-allowed' : 'pointer',
              borderColor: selectedSemester ? '#6366f1' : 'rgba(255,255,255,0.15)'
            }}
          >
            <option value="">-- Select Semester --</option>
            {availableSemesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Module Search & Selector Container */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.65)',
        border: '1px solid rgba(129, 140, 248, 0.25)',
        borderRadius: '14px',
        padding: '16px 18px',
        marginBottom: '16px'
      }}>
        {/* Title & Guidance Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📘</span> Target Subject for Team Formation:
            {isCascadingComplete && (
              <span style={{ fontSize: '11px', background: 'rgba(99, 102, 241, 0.25)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                {availableModules.length} Modules in {selectedSemester}
              </span>
            )}
          </label>
          <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: '500' }}>
            ⚡ Student technical scores automatically adjust based on aptitude in this subject
          </span>
        </div>

        {!isCascadingComplete ? (
          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px dashed rgba(148, 163, 184, 0.25)',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '13px'
          }}>
            👉 Please select <strong>Faculty</strong>, <strong>Degree</strong>, <strong>Academic Year</strong>, and <strong>Semester</strong> above to search and choose a module.
          </div>
        ) : (
          <div>
            {/* Search Input Bar & Quick Filters */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>
                  🔍
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search module by code or name (e.g. CS11012, Database, Programming, Math)..."
                  style={{
                    width: '100%',
                    padding: '10px 36px 10px 36px',
                    borderRadius: '10px',
                    background: '#0f172a',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    color: '#f8fafc',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '2px 6px'
                    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {['ALL', 'COMPULSORY', 'ELECTIVE'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      border: '1px solid',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      background: filterCategory === cat ? 'rgba(99, 102, 241, 0.35)' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: filterCategory === cat ? '#818cf8' : 'rgba(255, 255, 255, 0.1)',
                      color: filterCategory === cat ? '#ffffff' : '#94a3b8'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Dropdown Select (Quick Selector) */}
            <div style={{ marginBottom: '12px' }}>
              <select
                className="modern-select"
                value={selectedModuleCode}
                onChange={(e) => setSelectedModuleCode(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '13px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  background: '#1e293b',
                  color: selectedModuleCode ? '#f8fafc' : '#94a3b8',
                  border: selectedModuleCode ? '1.5px solid #6366f1' : '1px solid rgba(255,255,255,0.2)',
                  fontWeight: '600'
                }}
              >
                <option value="">-- Choose Module from list ({availableModules.length} available) --</option>
                {availableModules.map((mod) => (
                  <option key={mod.code} value={mod.code}>
                    [{mod.code}] {mod.name} — {mod.credits} ({mod.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Filtered Search Results Cards (Click to Select) */}
            {filteredModules.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '8px',
                maxHeight: '180px',
                overflowY: 'auto',
                padding: '4px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {filteredModules.map((mod) => {
                  const isSelected = mod.code === selectedModuleCode;
                  return (
                    <div
                      key={mod.code}
                      onClick={() => setSelectedModuleCode(mod.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected ? '1.5px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <span style={{
                          background: isSelected ? '#6366f1' : 'rgba(99, 102, 241, 0.2)',
                          color: '#ffffff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          fontFamily: 'monospace',
                          flexShrink: 0
                        }}>
                          {mod.code}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: isSelected ? '#ffffff' : '#cbd5e1',
                          fontWeight: isSelected ? '600' : '400',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {mod.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '10px',
                          color: mod.category === 'COMPULSORY' ? '#34d399' : '#fcd34d',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '2px 5px',
                          borderRadius: '4px'
                        }}>
                          {mod.credits}
                        </span>
                        {isSelected && <span style={{ color: '#818cf8', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' }}>
                No modules match "<strong>{searchQuery}</strong>". Try a different code or subject name.
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEMESTER-BASED EVALUATION BASIS (DISPLAY ONLY - NO SELECTION CONTROLS) */}
      {selectedSemester && isSem1 ? (
        <div style={{
          marginBottom: '16px',
          padding: '14px 18px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '26px' }}>🎯</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Evaluation Basis: G.C.E. A/L Z-Score</span>
                <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.3)', color: '#c7d2fe', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(99, 102, 241, 0.5)', fontWeight: '700' }}>
                  1ST SEMESTER INTAKE
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4' }}>
                {activeModule ? (
                  <>Students have not sat for university exams in <strong>{activeModule.name}</strong> yet. In 1st Semester, the AI engine automatically balances teams based on students' <strong>G.C.E. A/L Z-Score</strong> foundation.</>
                ) : (
                  <>1st Semester students have no prior university exam marks. The AI engine automatically uses students' <strong>G.C.E. A/L Z-Score</strong> as the competency metric.</>
                )}
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(99, 102, 241, 0.25)',
            border: '1.5px solid #818cf8',
            color: '#e0e7ff',
            fontSize: '12px',
            fontWeight: '800',
            whiteSpace: 'nowrap'
          }}>
            <span>🎯</span>
            <span>A/L Intake Z-Score Benchmark</span>
          </div>
        </div>
      ) : selectedSemester && !isSem1 && activeModule ? (
        <div style={{
          marginBottom: '16px',
          padding: '16px 20px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '26px' }}>🔗</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span>Related Prerequisite Subjects for [{activeModule.code}] from Prior Semesters</span>
                  <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.25)', color: '#6ee7b7', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.5)', fontWeight: '700' }}>
                    {allPrerequisites.length > 1 ? `CUMULATIVE BENCHMARK (${allPrerequisites.length} MODULES)` : 'AUTOMATIC BENCHMARK'}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4' }}>
                  Students haven't taken the final exam for <strong>{activeModule.name}</strong> yet. The AI engine automatically balances teams by aggregating students' competency across <strong>all matching foundational subjects from preceding semesters</strong>:
                </p>
              </div>
            </div>
          </div>

          {/* List of ALL matching prerequisite subjects from prior semesters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '10px',
            marginTop: '2px'
          }}>
            {allPrerequisites.length > 0 ? (
              allPrerequisites.map((prereq) => (
                <div
                  key={prereq.code}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(16, 185, 129, 0.16)',
                    border: '1.5px solid rgba(16, 185, 129, 0.55)',
                    color: '#a7f3d0'
                  }}
                >
                  <span style={{ fontSize: '16px', marginTop: '2px' }}>⭐</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: '800', color: '#6ee7b7', fontSize: '12px' }}>
                        [{prereq.code}]
                      </span>
                      <span style={{ fontWeight: '700', fontSize: '12px', color: '#f8fafc' }}>
                        {prereq.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                      {prereq.semesterLabel && (
                        <span style={{
                          fontSize: '10px',
                          background: 'rgba(99, 102, 241, 0.25)',
                          color: '#c7d2fe',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          border: '1px solid rgba(99, 102, 241, 0.45)',
                          fontWeight: '600'
                        }}>
                          {prereq.semesterLabel}
                        </span>
                      )}
                      {prereq.reason && (
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                          • {prereq.reason}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.18)',
                border: '1.5px solid #10b981',
                color: '#a7f3d0',
                fontSize: '12px',
                fontWeight: '700'
              }}>
                <span>⭐</span>
                <span style={{ fontFamily: 'monospace', fontWeight: '800' }}>[{prerequisiteInfo?.code || 'PREREQ'}]</span>
                <span style={{ fontWeight: '700' }}>{prerequisiteInfo?.name || 'Foundational Subject'}</span>
              </div>
            )}
          </div>
        </div>
      ) : selectedSemester && !isSem1 && !activeModule ? (
        <div style={{
          marginBottom: '16px',
          padding: '12px 18px',
          borderRadius: '12px',
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px dashed rgba(129, 140, 248, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '22px' }}>💡</span>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>
            <strong style={{ color: '#c7d2fe' }}>{selectedSemester} Evaluation:</strong> Choose a target subject above. The AI engine will automatically link and display its foundational prerequisite subject from previous semesters.
          </div>
        </div>
      ) : null}

      {/* Active Module Live Stats Bar (only when a module is selected) */}
      {activeModule ? (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 18px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#4f46e5',
              color: '#ffffff',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}>
              {activeModule.code}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#e0e7ff' }}>
              {activeModule.name}
            </span>
            <span style={{
              fontSize: '11px',
              color: activeModule.category === 'COMPULSORY' ? '#34d399' : '#fcd34d',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              {activeModule.credits} • {activeModule.category}
            </span>
          </div>

          {/* Cohort Stats for this Module */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8' }}>
              {isSem1 ? 'A/L Intake Avg: ' : 'Prereq Avg: '}
              <strong style={{ color: '#38bdf8' }}>{moduleStats?.avg || 0}%</strong>
            </span>
            <span style={{ color: '#94a3b8' }}>
              Top: <strong style={{ color: '#34d399' }}>{moduleStats?.max || 0}%</strong>
            </span>
            <span style={{ color: '#94a3b8' }}>
              Min: <strong style={{ color: '#f87171' }}>{moduleStats?.min || 0}%</strong>
            </span>
            <span style={{ color: '#94a3b8' }}>
              Students: <strong style={{ color: '#c7d2fe' }}>{moduleStats?.count || 0}</strong>
            </span>

            {/* Filter Toggle */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginLeft: '6px' }}>
              <input
                type="checkbox"
                checked={filterByDegree}
                onChange={(e) => setFilterByDegree(e.target.checked)}
                style={{ accentColor: '#6366f1' }}
              />
              <span style={{ fontSize: '11px', color: '#cbd5e1' }}>Filter to this Degree only</span>
            </label>
          </div>
        </div>
      ) : (
        <div style={{
          padding: '10px 16px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
          color: '#64748b',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>ℹ️</span> No module currently selected. Choose a subject above to evaluate technical scores.
        </div>
      )}
    </div>
  );
};
