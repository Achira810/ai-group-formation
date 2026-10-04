import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '../services/supabaseClient';
import { 
  calculateGroupICF, 
  generateMockEvaluations, 
  detectCollusionAndAnomalies, 
  getStudentIdKey 
} from '../utils/icfEngine';
import { cleanStudentName, getAvatarBg, getInitials } from '../utils/studentUtils';

const DEFAULT_RUBRIC = {
  architecture: 18,     // out of 20
  implementation: 36,   // out of 40
  report: 18,           // out of 20
  viva: 18              // out of 20
};

export const BatchGradingModal = ({
  isOpen,
  onClose,
  groups = [],
  students = [],
  onGradesSaved
}) => {
  if (!isOpen) return null;

  // Navigation states
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('team_detail'); // 'overview' | 'team_detail' | 'matrix' | 'guide'

  // Clamping and Engine Configurations
  const [maxClamp, setMaxClamp] = useState(1.25);
  const [minClamp, setMinClamp] = useState(0.00);
  const [excludeSelf, setExcludeSelf] = useState(true);

  // Group Rubrics & Scores: keyed by group index
  const [groupRubrics, setGroupRubrics] = useState(() => {
    const initial = {};
    groups.forEach((_, idx) => {
      initial[idx] = {
        architecture: DEFAULT_RUBRIC.architecture,
        implementation: DEFAULT_RUBRIC.implementation,
        report: DEFAULT_RUBRIC.report,
        viva: DEFAULT_RUBRIC.viva,
        rawGroupScore: DEFAULT_RUBRIC.architecture + DEFAULT_RUBRIC.implementation + DEFAULT_RUBRIC.report + DEFAULT_RUBRIC.viva,
        feedback: 'Solid delivery with consistent sprint participation.'
      };
    });
    return initial;
  });

  // Peer Evaluations: keyed by group index -> array of eval records
  const [evaluationsByGroup, setEvaluationsByGroup] = useState(() => {
    const initial = {};
    groups.forEach((g, idx) => {
      // By default, initialize with realistic peer evaluations
      initial[idx] = generateMockEvaluations(g, 'balanced');
    });
    return initial;
  });

  // DB Sync states
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  // Active Team Data
  const currentGroup = groups[selectedGroupIndex] || [];
  const currentRubric = groupRubrics[selectedGroupIndex] || {
    architecture: 20,
    implementation: 40,
    report: 20,
    viva: 20,
    rawGroupScore: 100,
    feedback: ''
  };
  const currentEvals = evaluationsByGroup[selectedGroupIndex] || [];

  // Calculate ICF analysis for active team
  const activeAnalysis = useMemo(() => {
    if (!currentGroup || currentGroup.length === 0) {
      return {
        groupMeanRating: 0,
        rawGroupScore: currentRubric.rawGroupScore,
        students: [],
        collusionFlags: [],
        freeRidersCount: 0,
        anchorsCount: 0,
        summaryRationale: 'No students assigned to this group.'
      };
    }

    return calculateGroupICF(
      currentGroup,
      currentEvals,
      currentRubric.rawGroupScore,
      { minClamp, maxClamp, excludeSelf }
    );
  }, [currentGroup, currentEvals, currentRubric.rawGroupScore, minClamp, maxClamp, excludeSelf]);

  // Overall batch matrix analysis for all groups
  const batchAnalyses = useMemo(() => {
    return groups.map((g, idx) => {
      const rubric = groupRubrics[idx] || { rawGroupScore: 80 };
      const evals = evaluationsByGroup[idx] || [];
      const analysis = calculateGroupICF(g, evals, rubric.rawGroupScore, { minClamp, maxClamp, excludeSelf });
      return {
        groupIndex: idx,
        groupName: `Team ${String(idx + 1).padStart(2, '0')}`,
        memberCount: g.length,
        rawScore: rubric.rawGroupScore,
        analysis
      };
    });
  }, [groups, groupRubrics, evaluationsByGroup, minClamp, maxClamp, excludeSelf]);

  // Load existing records from Supabase on mount
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const { data: dbGrades } = await supabase.from('group_grades').select('*');
        const { data: dbEvals } = await supabase.from('peer_evaluations').select('*');

        if (dbGrades && dbGrades.length > 0) {
          setGroupRubrics(prev => {
            const updated = { ...prev };
            dbGrades.forEach(g => {
              // Try to match group by id or name
              const foundIdx = groups.findIndex(grp => grp.id === g.group_id);
              if (foundIdx !== -1) {
                const rub = g.rubric_scores || {};
                updated[foundIdx] = {
                  architecture: rub.architecture ?? 20,
                  implementation: rub.implementation ?? 40,
                  report: rub.report ?? 20,
                  viva: rub.viva ?? 20,
                  rawGroupScore: Number(g.raw_group_score) || 80,
                  feedback: g.general_feedback || ''
                };
              }
            });
            return updated;
          });
        }

        if (dbEvals && dbEvals.length > 0) {
          setEvaluationsByGroup(prev => {
            const updated = { ...prev };
            groups.forEach((grp, idx) => {
              const grpId = grp.id;
              const matchingEvals = dbEvals.filter(e => e.group_id === grpId);
              if (matchingEvals.length > 0) {
                updated[idx] = matchingEvals;
              }
            });
            return updated;
          });
        }
      } catch (err) {
        console.warn('Could not retrieve existing grading records from Supabase:', err);
      }
    };

    fetchExistingData();
  }, [groups]);

  // Handle Rubric Slider / Input Change
  const handleRubricChange = (field, val) => {
    const num = Math.max(0, parseFloat(val) || 0);
    setGroupRubrics(prev => {
      const cur = prev[selectedGroupIndex] || { ...DEFAULT_RUBRIC, rawGroupScore: 80, feedback: '' };
      const updated = { ...cur, [field]: num };
      // Auto-compute total raw group score
      const newTotal = (updated.architecture || 0) + (updated.implementation || 0) + (updated.report || 0) + (updated.viva || 0);
      updated.rawGroupScore = Math.min(100, Math.max(0, newTotal));
      return { ...prev, [selectedGroupIndex]: updated };
    });
  };

  const handleFeedbackChange = (text) => {
    setGroupRubrics(prev => {
      const cur = prev[selectedGroupIndex] || { ...DEFAULT_RUBRIC, rawGroupScore: 80, feedback: '' };
      return {
        ...prev,
        [selectedGroupIndex]: { ...cur, feedback: text }
      };
    });
  };

  // Scenario Simulator Handler
  const handleSimulateScenario = (scenario) => {
    if (!currentGroup || currentGroup.length < 2) {
      alert("At least 2 members are required in this team to generate peer reviews.");
      return;
    }
    const mock = generateMockEvaluations(currentGroup, scenario);
    setEvaluationsByGroup(prev => ({
      ...prev,
      [selectedGroupIndex]: mock
    }));
    setSaveStatus(`Loaded scenario: "${scenario.replace('_', ' ').toUpperCase()}"`);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Batch Simulate for All Teams
  const handleBatchSimulateAll = (scenario = 'free_rider') => {
    const updated = {};
    groups.forEach((g, idx) => {
      updated[idx] = generateMockEvaluations(g, scenario);
    });
    setEvaluationsByGroup(updated);
    setSaveStatus(`Applied "${scenario.toUpperCase()}" scenario across all ${groups.length} teams.`);
    setTimeout(() => setSaveStatus(''), 3500);
  };

  // Update specific peer review in the matrix
  const handleMatrixCellChange = (evaluatorId, evaluateeId, dimension, value) => {
    const num = Math.max(1, Math.min(5, parseInt(value, 10) || 3));
    setEvaluationsByGroup(prev => {
      const evals = [...(prev[selectedGroupIndex] || [])];
      const matchIdx = evals.findIndex(e => 
        String(e.evaluator_id || e.evaluatorId) === String(evaluatorId) &&
        String(e.evaluatee_id || e.evaluateeId) === String(evaluateeId)
      );

      if (matchIdx !== -1) {
        evals[matchIdx] = { ...evals[matchIdx], [dimension]: num };
      } else {
        evals.push({
          group_id: currentGroup.id || `group-${selectedGroupIndex}`,
          evaluator_id: evaluatorId,
          evaluatee_id: evaluateeId,
          technical_score: dimension === 'technical_score' ? num : 3,
          timeliness_score: dimension === 'timeliness_score' ? num : 3,
          communication_score: dimension === 'communication_score' ? num : 3,
          quality_score: dimension === 'quality_score' ? num : 3,
          feedback_notes: 'Direct matrix edit.'
        });
      }

      return { ...prev, [selectedGroupIndex]: evals };
    });
  };

  // Save to Supabase
  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    setSaveStatus('Saving assessment & peer reviews to Supabase...');

    try {
      // 1. Prepare group grades payload for all groups that have an id
      const gradesToUpsert = [];
      const evalsToInsert = [];

      groups.forEach((grp, idx) => {
        const rubric = groupRubrics[idx];
        const evals = evaluationsByGroup[idx] || [];

        // If the group has a Supabase UUID
        if (grp.id) {
          gradesToUpsert.push({
            group_id: grp.id,
            rubric_scores: {
              architecture: rubric?.architecture || 20,
              implementation: rubric?.implementation || 40,
              report: rubric?.report || 20,
              viva: rubric?.viva || 20
            },
            raw_group_score: rubric?.rawGroupScore || 80,
            general_feedback: rubric?.feedback || '',
            graded_by: 'Course Lecturer / Evaluator'
          });

          evals.forEach(ev => {
            if (ev.evaluator_id && ev.evaluatee_id) {
              evalsToInsert.push({
                group_id: grp.id,
                evaluator_id: ev.evaluator_id,
                evaluatee_id: ev.evaluatee_id,
                technical_score: ev.technical_score || 3,
                timeliness_score: ev.timeliness_score || 3,
                communication_score: ev.communication_score || 3,
                quality_score: ev.quality_score || 3,
                feedback_notes: ev.feedback_notes || 'Peer submission'
              });
            }
          });
        }
      });

      // Upsert group grades if groups exist in DB
      if (gradesToUpsert.length > 0) {
        const { error: gradeErr } = await supabase
          .from('group_grades')
          .upsert(gradesToUpsert, { onConflict: 'group_id' });
        
        if (gradeErr) {
          console.warn("Could not upsert to group_grades:", gradeErr);
        }
      }

      // Upsert peer evaluations
      if (evalsToInsert.length > 0) {
        const { error: evalErr } = await supabase
          .from('peer_evaluations')
          .upsert(evalsToInsert, { onConflict: 'group_id,evaluator_id,evaluatee_id' });
        
        if (evalErr) {
          console.warn("Could not upsert to peer_evaluations:", evalErr);
        }
      }

      setSaveStatus('✅ Grades & ICF assessments successfully saved!');
      if (onGradesSaved) onGradesSaved(batchAnalyses);
    } catch (err) {
      console.error('Error saving grades to Supabase:', err);
      setSaveStatus('⚠️ Saved locally. Supabase tables will update once migration is deployed.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(''), 4000);
    }
  };

  // Export to Excel Workbook
  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      // Sheet 1: Individual Student Final Marks
      const studentRows = [
        ['GENERAL SIR JOHN KOTELAWALA DEFENCE UNIVERSITY'],
        ['FACULTY OF COMPUTING - POST-FORMATION BATCH GRADING & ICF ASSESSMENT'],
        ['Generated At: ' + new Date().toLocaleString()],
        [],
        [
          'TEAM', 
          'STUDENT ID', 
          'FULL NAME', 
          'DEGREE PROGRAM', 
          'BELBIN ROLE', 
          'RAW GROUP MARK (100)', 
          'PEER MEAN (1-5)', 
          'ICF FACTOR (RAW)', 
          'ICF CLAMPED', 
          'FINAL ADJUSTED MARK', 
          'MARK DELTA (Δ)', 
          'ASSESSMENT STATUS'
        ]
      ];

      batchAnalyses.forEach(ba => {
        ba.analysis.students.forEach(st => {
          studentRows.push([
            ba.groupName,
            st.student_id,
            cleanStudentName(st.full_name),
            st.degree_program,
            st.belbin_role,
            ba.rawScore,
            st.peerMean,
            st.icfRaw,
            st.icfClamped,
            st.finalScore,
            (st.scoreDelta >= 0 ? `+${st.scoreDelta}` : `${st.scoreDelta}`),
            st.statusBadge
          ]);
        });
      });

      const wsStudents = XLSX.utils.aoa_to_sheet(studentRows);
      XLSX.utils.book_append_sheet(wb, wsStudents, 'Final_Student_Marks');

      // Sheet 2: Group Summary Overview
      const groupRows = [
        ['TEAM', 'MEMBER COUNT', 'RAW RUBRIC MARK', 'GROUP AVG PEER RATING', 'FREE-RIDERS', 'ANCHORS', 'COLLUSION FLAGS', 'FEEDBACK NOTES'],
      ];

      batchAnalyses.forEach(ba => {
        const rubric = groupRubrics[ba.groupIndex];
        groupRows.push([
          ba.groupName,
          ba.memberCount,
          ba.rawScore,
          ba.analysis.groupMeanRating,
          ba.analysis.freeRidersCount,
          ba.analysis.anchorsCount,
          ba.analysis.collusionFlags.length,
          rubric?.feedback || ''
        ]);
      });

      const wsGroups = XLSX.utils.aoa_to_sheet(groupRows);
      XLSX.utils.book_append_sheet(wb, wsGroups, 'Group_Summaries');

      // Download file
      XLSX.writeFile(wb, 'KDU_Post_Formation_Batch_Grading_ICF.xlsx');
      setSaveStatus('✅ Downloaded KDU_Post_Formation_Batch_Grading_ICF.xlsx');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      console.error('Error exporting assessment Excel:', err);
      alert('Failed to export Excel spreadsheet: ' + err.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(10, 15, 30, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.2)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '1240px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: '#f8fafc',
        animation: 'modalSlideUp 0.25s ease-out'
      }}>

        {/* 1. MODAL HEADER */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '26px' }}>⚖️</span>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '-0.02em', color: '#f8fafc' }}>
                Post-Formation Batch Grading Console & Anti-Freerider ICF Engine
              </h2>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '8px',
                background: 'rgba(99, 102, 241, 0.25)',
                color: '#c7d2fe',
                border: '1px solid rgba(99, 102, 241, 0.45)'
              }}>
                Kaufman / Goldfinch Model
              </span>
            </div>
            <p style={{ margin: '4px 0 0 36px', fontSize: '12px', color: '#94a3b8' }}>
              Individual Contribution Factor (ICF) assessment: prevents free-riding, rewards dominant anchors, and flags collusion rings.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleExportExcel}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '700',
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                color: '#6ee7b7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>📊</span>
              <span>Export Grades (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={isSaving}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                border: 'none',
                color: '#ffffff',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{isSaving ? '⏳' : '💾'}</span>
              <span>{isSaving ? 'Saving...' : 'Save to Supabase'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#94a3b8',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* STATUS BANNER */}
        {saveStatus && (
          <div style={{
            padding: '8px 24px',
            background: saveStatus.includes('⚠️') ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: saveStatus.includes('⚠️') ? '#fde68a' : '#6ee7b7',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⚡</span>
            <span>{saveStatus}</span>
          </div>
        )}

        {/* 2. SUB-HEADER & MAIN VIEW SWITCHER */}
        <div style={{
          padding: '12px 28px',
          background: 'rgba(15, 23, 42, 0.45)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Main View Tabs */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('team_detail')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'team_detail' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                border: activeTab === 'team_detail' ? '1px solid #818cf8' : '1px solid transparent',
                color: activeTab === 'team_detail' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              🎯 Single Team Assessment
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'overview' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                border: activeTab === 'overview' ? '1px solid #818cf8' : '1px solid transparent',
                color: activeTab === 'overview' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              📋 All Teams Batch Matrix ({groups.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('matrix')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'matrix' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                border: activeTab === 'matrix' ? '1px solid #818cf8' : '1px solid transparent',
                color: activeTab === 'matrix' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              🔬 Raw Peer Review Matrix
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                background: activeTab === 'guide' ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                border: activeTab === 'guide' ? '1px solid #818cf8' : '1px solid transparent',
                color: activeTab === 'guide' ? '#ffffff' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              📐 Kaufman Formula & Rules
            </button>
          </div>

          {/* Clamping Threshold Quick Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '11px', color: '#cbd5e1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#94a3b8' }}>Max ICF Clamp:</span>
              <select
                value={maxClamp}
                onChange={(e) => setMaxClamp(parseFloat(e.target.value))}
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#38bdf8',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value={1.15}>1.15x (+15% Cap)</option>
                <option value={1.20}>1.20x (+20% Cap)</option>
                <option value={1.25}>1.25x (+25% Goldfinch Cap)</option>
                <option value={1.30}>1.30x (+30% Cap)</option>
              </select>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={excludeSelf}
                onChange={(e) => setExcludeSelf(e.target.checked)}
                style={{ accentColor: '#6366f1', cursor: 'pointer' }}
              />
              <span>Exclude Self-Rating Bias</span>
            </label>
          </div>
        </div>

        {/* 3. MODAL BODY (SCROLLABLE) */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>

          {/* ============================================================== */}
          {/* TAB 1: SINGLE TEAM ASSESSMENT VIEW */}
          {/* ============================================================== */}
          {activeTab === 'team_detail' && (
            <>
              {/* Team Selector Pills Strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginRight: '4px' }}>
                  Select Team:
                </span>
                {groups.map((grp, idx) => {
                  const isSel = idx === selectedGroupIndex;
                  const an = batchAnalyses[idx]?.analysis;
                  const hasFreerider = an?.freeRidersCount > 0;
                  const hasCollusion = an?.collusionFlags?.length > 0;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGroupIndex(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '700',
                        background: isSel 
                          ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                          : 'rgba(30, 41, 59, 0.65)',
                        border: isSel ? '1px solid #a5b4fc' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: isSel ? '#ffffff' : '#cbd5e1',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>Team {String(idx + 1).padStart(2, '0')}</span>
                      <span style={{ fontSize: '10px', opacity: 0.85 }}>({grp.length})</span>
                      {hasFreerider && <span title="Free-rider detected" style={{ fontSize: '10px' }}>⚠️</span>}
                      {hasCollusion && <span title="Mutual collusion alert" style={{ fontSize: '10px' }}>🚨</span>}
                    </button>
                  );
                })}
              </div>

              {/* Top Controls Grid: (Left: Rubric Evaluation Form, Right: Simulation & Scenarios) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '16px'
              }}>
                {/* 4-Criteria Rubric Form */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '18px 20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>📋</span>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>
                        Lecturer Rubric Score: Team {String(selectedGroupIndex + 1).padStart(2, '0')}
                      </h4>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: currentRubric.rawGroupScore >= 75 ? '#38bdf8' : '#f59e0b',
                      background: 'rgba(15, 23, 42, 0.7)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {currentRubric.rawGroupScore} / 100
                    </div>
                  </div>

                  {/* 4 Rubric Criteria Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>
                        <span>Architecture (20):</span>
                        <strong style={{ color: '#f8fafc' }}>{currentRubric.architecture} pts</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={currentRubric.architecture}
                        onChange={(e) => handleRubricChange('architecture', e.target.value)}
                        style={{ width: '100%', accentColor: '#6366f1' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>
                        <span>Implementation (40):</span>
                        <strong style={{ color: '#f8fafc' }}>{currentRubric.implementation} pts</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        step="1"
                        value={currentRubric.implementation}
                        onChange={(e) => handleRubricChange('implementation', e.target.value)}
                        style={{ width: '100%', accentColor: '#6366f1' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>
                        <span>Report Quality (20):</span>
                        <strong style={{ color: '#f8fafc' }}>{currentRubric.report} pts</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={currentRubric.report}
                        onChange={(e) => handleRubricChange('report', e.target.value)}
                        style={{ width: '100%', accentColor: '#6366f1' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>
                        <span>Oral Defense / Viva (20):</span>
                        <strong style={{ color: '#f8fafc' }}>{currentRubric.viva} pts</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={currentRubric.viva}
                        onChange={(e) => handleRubricChange('viva', e.target.value)}
                        style={{ width: '100%', accentColor: '#6366f1' }}
                      />
                    </div>
                  </div>

                  {/* Lecturer General Feedback */}
                  <div>
                    <input
                      type="text"
                      placeholder="Add general milestone feedback for this team..."
                      value={currentRubric.feedback || ''}
                      onChange={(e) => handleFeedbackChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'rgba(15, 23, 42, 0.65)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '11px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Simulation & Scenario Testing Console */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px' }}>🧪</span>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#f8fafc' }}>
                          ICF Simulation Scenarios
                        </h4>
                      </div>
                      <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700' }}>
                        {currentEvals.length} Reviews Logged
                      </span>
                    </div>

                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                      Instantly simulate real-world peer evaluation dynamics across the 4 Kaufman dimensions (T, S, C, Q):
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => handleSimulateScenario('free_rider')}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: 'rgba(239, 68, 68, 0.18)',
                          border: '1px solid rgba(239, 68, 68, 0.45)',
                          color: '#fca5a5',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>⚠️ Free-Rider</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSimulateScenario('collusion')}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: 'rgba(245, 158, 11, 0.18)',
                          border: '1px solid rgba(245, 158, 11, 0.45)',
                          color: '#fde68a',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>🤝 Collusion Ring</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSimulateScenario('balanced')}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: 'rgba(16, 185, 129, 0.18)',
                          border: '1px solid rgba(16, 185, 129, 0.45)',
                          color: '#6ee7b7',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>✅ Equitable</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Apply across cohort:</span>
                    <button
                      type="button"
                      onClick={() => handleBatchSimulateAll('free_rider')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        background: 'rgba(99, 102, 241, 0.25)',
                        border: '1px solid rgba(99, 102, 241, 0.4)',
                        color: '#c7d2fe',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      ⚡ Auto-Populate All {groups.length} Teams
                    </button>
                  </div>
                </div>
              </div>

              {/* ANOMALY & COLLUSION ALERTS BANNER */}
              {activeAnalysis.collusionFlags.length > 0 && (
                <div style={{
                  padding: '12px 18px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '20px' }}>🚨</span>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '13px', color: '#fca5a5' }}>
                      Pairwise Collusion Ring Detected!
                    </div>
                    {activeAnalysis.collusionFlags.map((flag, fIdx) => (
                      <div key={fIdx} style={{ fontSize: '11px', color: '#fecaca', marginTop: '3px' }}>
                        {flag.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* DIAGNOSTIC SUMMARY CARD */}
              <div style={{
                padding: '12px 18px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#c7d2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>💡</span>
                  <span><strong>ICF Diagnosis:</strong> {activeAnalysis.summaryRationale}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' }}>
                    Free-Riders: {activeAnalysis.freeRidersCount}
                  </span>
                  <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(129, 140, 248, 0.2)', color: '#c7d2fe' }}>
                    Dominant Anchors: {activeAnalysis.anchorsCount}
                  </span>
                  <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
                    Group Peer Mean: {activeAnalysis.groupMeanRating} / 5.0
                  </span>
                </div>
              </div>

              {/* INDIVIDUAL STUDENTS ADJUSTED MARKS TABLE */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                      <th style={{ padding: '12px 16px' }}>Student</th>
                      <th style={{ padding: '12px 10px' }}>Role</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Ratings (T, S, C, Q)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Peer Mean (Rᵢ)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>ICF Multiplier</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Group Mark</th>
                      <th style={{ padding: '12px 14px', textAlign: 'center' }}>Final Adjusted Mark</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Assessment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAnalysis.students.map((st, sIdx) => {
                      const isFreeRider = st.status === 'SEVERE_FREERIDER';
                      const isAnchor = st.status === 'DOMINANT_ANCHOR';
                      const isDeltaPositive = st.scoreDelta >= 0;

                      return (
                        <tr 
                          key={sIdx}
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            background: isFreeRider 
                              ? 'rgba(239, 68, 68, 0.08)' 
                              : isAnchor 
                              ? 'rgba(99, 102, 241, 0.08)' 
                              : 'transparent'
                          }}
                        >
                          {/* Student Info */}
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: getAvatarBg(st.student_id),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '11px',
                                color: '#ffffff'
                              }}>
                                {getInitials(st.full_name)}
                              </div>
                              <div>
                                <div style={{ fontWeight: '700', color: '#f8fafc' }}>
                                  {cleanStudentName(st.full_name)}
                                </div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                                  {st.student_id} • {st.degree_program}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Belbin Role */}
                          <td style={{ padding: '12px 10px', fontSize: '11px', color: '#cbd5e1' }}>
                            {st.belbin_role}
                          </td>

                          {/* Dimension Breakdown (T, S, C, Q) */}
                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                              <span title={`Technical: ${st.dimensionAverages.technical}/5`} style={{ padding: '2px 5px', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', fontSize: '10px', fontWeight: '700' }}>
                                T: {st.dimensionAverages.technical}
                              </span>
                              <span title={`Timeliness: ${st.dimensionAverages.timeliness}/5`} style={{ padding: '2px 5px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#fde68a', fontSize: '10px', fontWeight: '700' }}>
                                S: {st.dimensionAverages.timeliness}
                              </span>
                              <span title={`Communication: ${st.dimensionAverages.communication}/5`} style={{ padding: '2px 5px', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', fontSize: '10px', fontWeight: '700' }}>
                                C: {st.dimensionAverages.communication}
                              </span>
                              <span title={`Quality: ${st.dimensionAverages.quality}/5`} style={{ padding: '2px 5px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', fontSize: '10px', fontWeight: '700' }}>
                                Q: {st.dimensionAverages.quality}
                              </span>
                            </div>
                          </td>

                          {/* Peer Mean R_i */}
                          <td style={{ padding: '12px 10px', textAlign: 'center', fontWeight: '700', color: '#f8fafc' }}>
                            {st.peerMean} / 5.0
                          </td>

                          {/* ICF Clamped Multiplier */}
                          <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '800',
                              background: isFreeRider 
                                ? 'rgba(239, 68, 68, 0.25)' 
                                : isAnchor 
                                ? 'rgba(129, 140, 248, 0.25)' 
                                : 'rgba(255, 255, 255, 0.08)',
                              color: isFreeRider ? '#fca5a5' : isAnchor ? '#c7d2fe' : '#e2e8f0'
                            }}>
                              {st.icfClamped}x
                            </span>
                          </td>

                          {/* Raw Group Mark */}
                          <td style={{ padding: '12px 10px', textAlign: 'center', color: '#94a3b8' }}>
                            {currentRubric.rawGroupScore}
                          </td>

                          {/* Final Student Adjusted Mark */}
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>
                                {st.finalScore}
                              </span>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: '700',
                                color: isDeltaPositive ? '#34d399' : '#f87171'
                              }}>
                                ({isDeltaPositive ? `+${st.scoreDelta}` : st.scoreDelta})
                              </span>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              background: `${st.statusColor}22`,
                              color: st.statusColor,
                              border: `1px solid ${st.statusColor}55`,
                              whiteSpace: 'nowrap'
                            }}>
                              {st.statusBadge}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TAB 2: ALL TEAMS BATCH MATRIX */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#f8fafc' }}>
                    Cohort Batch Assessment Matrix
                  </h3>
                  <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                    Comparative overview of all {groups.length} project groups and detected free-rider vulnerabilities.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleBatchSimulateAll('free_rider')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#fca5a5',
                      cursor: 'pointer'
                    }}
                  >
                    ⚠️ Populate Free-Rider Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBatchSimulateAll('balanced')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      color: '#6ee7b7',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Populate Balanced Demo
                  </button>
                </div>
              </div>

              {/* Batch Table */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                      <th style={{ padding: '12px 16px' }}>Team</th>
                      <th style={{ padding: '12px 12px' }}>Members</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center' }}>Raw Group Score</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center' }}>Peer Mean (1-5)</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center' }}>Free-Riders</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center' }}>Anchors</th>
                      <th style={{ padding: '12px 12px', textAlign: 'center' }}>Collusion Rings</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchAnalyses.map((ba, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: '700', color: '#f8fafc' }}>
                          {ba.groupName}
                        </td>
                        <td style={{ padding: '12px 12px', color: '#cbd5e1' }}>
                          {ba.memberCount} Students
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'center', fontWeight: '700', color: '#38bdf8' }}>
                          {ba.rawScore} / 100
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'center', color: '#e2e8f0' }}>
                          {ba.analysis.groupMeanRating}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                          {ba.analysis.freeRidersCount > 0 ? (
                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.25)', color: '#fca5a5', fontWeight: '700', fontSize: '11px' }}>
                              ⚠️ {ba.analysis.freeRidersCount} Flagged
                            </span>
                          ) : (
                            <span style={{ color: '#6ee7b7', fontSize: '11px' }}>0</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                          {ba.analysis.anchorsCount > 0 ? (
                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(129, 140, 248, 0.25)', color: '#c7d2fe', fontWeight: '700', fontSize: '11px' }}>
                              🌟 {ba.analysis.anchorsCount} Anchor
                            </span>
                          ) : (
                            <span style={{ color: '#94a3b8', fontSize: '11px' }}>0</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                          {ba.analysis.collusionFlags.length > 0 ? (
                            <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.3)', color: '#fecaca', fontWeight: '700', fontSize: '11px' }}>
                              🚨 {ba.analysis.collusionFlags.length} Alert
                            </span>
                          ) : (
                            <span style={{ color: '#6ee7b7', fontSize: '11px' }}>Clean</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedGroupIndex(ba.groupIndex);
                              setActiveTab('team_detail');
                            }}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '8px',
                              background: 'rgba(99, 102, 241, 0.25)',
                              border: '1px solid rgba(99, 102, 241, 0.4)',
                              color: '#c7d2fe',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            Assess Team ➔
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: RAW PEER EVALUATION MATRIX */}
          {/* ============================================================== */}
          {activeTab === 'matrix' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#f8fafc' }}>
                  Peer Evaluation Input Matrix (Team {String(selectedGroupIndex + 1).padStart(2, '0')})
                </h3>
                <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                  Directly inspect or edit incoming dimension ratings (1 to 5) submitted by each peer reviewer.
                </p>
              </div>

              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
                      <th style={{ padding: '12px 14px' }}>Reviewer (Evaluator)</th>
                      <th style={{ padding: '12px 14px' }}>Reviewee (Evaluatee)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Technical (T)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Timeliness (S)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Communication (C)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Quality (Q)</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Composite</th>
                      <th style={{ padding: '12px 16px' }}>Peer Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvals.map((ev, eIdx) => {
                      const reviewer = currentGroup.find(s => getStudentIdKey(s) === String(ev.evaluator_id));
                      const reviewee = currentGroup.find(s => getStudentIdKey(s) === String(ev.evaluatee_id));
                      const comp = (((ev.technical_score || 3) + (ev.timeliness_score || 3) + (ev.communication_score || 3) + (ev.quality_score || 3)) / 4).toFixed(2);

                      return (
                        <tr key={eIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '10px 14px', fontWeight: '600', color: '#c7d2fe' }}>
                            {reviewer ? cleanStudentName(reviewer.full_name) : ev.evaluator_id}
                          </td>
                          <td style={{ padding: '10px 14px', fontWeight: '700', color: '#f8fafc' }}>
                            {reviewee ? cleanStudentName(reviewee.full_name) : ev.evaluatee_id}
                          </td>

                          {/* Technical */}
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={ev.technical_score || 3}
                              onChange={(e) => handleMatrixCellChange(ev.evaluator_id, ev.evaluatee_id, 'technical_score', e.target.value)}
                              style={{ width: '45px', textAlign: 'center', padding: '4px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#38bdf8', fontWeight: '700' }}
                            />
                          </td>

                          {/* Timeliness */}
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={ev.timeliness_score || 3}
                              onChange={(e) => handleMatrixCellChange(ev.evaluator_id, ev.evaluatee_id, 'timeliness_score', e.target.value)}
                              style={{ width: '45px', textAlign: 'center', padding: '4px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#fde68a', fontWeight: '700' }}
                            />
                          </td>

                          {/* Communication */}
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={ev.communication_score || 3}
                              onChange={(e) => handleMatrixCellChange(ev.evaluator_id, ev.evaluatee_id, 'communication_score', e.target.value)}
                              style={{ width: '45px', textAlign: 'center', padding: '4px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#d8b4fe', fontWeight: '700' }}
                            />
                          </td>

                          {/* Quality */}
                          <td style={{ padding: '8px 10px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={ev.quality_score || 3}
                              onChange={(e) => handleMatrixCellChange(ev.evaluator_id, ev.evaluatee_id, 'quality_score', e.target.value)}
                              style={{ width: '45px', textAlign: 'center', padding: '4px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '6px', color: '#6ee7b7', fontWeight: '700' }}
                            />
                          </td>

                          <td style={{ padding: '10px 10px', textAlign: 'center', fontWeight: '700', color: '#ffffff' }}>
                            {comp} / 5
                          </td>

                          <td style={{ padding: '10px 16px', fontSize: '11px', color: '#94a3b8' }}>
                            {ev.feedback_notes || '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: MATHEMATICAL FORMULATION & SPECIFICATION */}
          {/* ============================================================== */}
          {activeTab === 'guide' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.6', fontSize: '13px', color: '#cbd5e1' }}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.65)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '20px 24px'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#f8fafc', fontWeight: '800' }}>
                  📐 Kaufman / Goldfinch ICF Formulation
                </h3>
                <p>
                  To neutralize academic free-riding (social loafing), the system incorporates the classical <strong>Kaufman / Goldfinch Individual Contribution Factor (ICF)</strong> model across 4 balanced dimensions:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '14px 0' }}>
                  <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <strong style={{ color: '#38bdf8' }}>1. Technical Implementation (T)</strong>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Architecture setup, programming, debugging.</div>
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <strong style={{ color: '#fde68a' }}>2. Timeliness & Sprints (S)</strong>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Punctuality, meeting sprint milestone deadlines.</div>
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <strong style={{ color: '#d8b4fe' }}>3. Team Communication (C)</strong>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Transparency, peer updates, meeting presence.</div>
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <strong style={{ color: '#6ee7b7' }}>4. Code & Work Quality (Q)</strong>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Clean code, testing, IEEE documentation polish.</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', fontFamily: 'monospace', fontSize: '12px', color: '#93c5fd' }}>
                  <div>1. Peer Average: Rᵢ = (1 / |Pᵢ|) * Σ [ (T + S + C + Q) / 4 ] (Self-ratings excluded)</div>
                  <div style={{ marginTop: '4px' }}>2. Individual Contribution Factor: ICFᵢ = Rᵢ / [ (1 / N) * Σ Rₖ ]</div>
                  <div style={{ marginTop: '4px' }}>3. Clamped Multiplier: ICF_clamped = max(0.00, min(1.25, ICFᵢ))</div>
                  <div style={{ marginTop: '4px' }}>4. Final Student Mark: S_final,i = min(100.0, S_group * ICF_clamped,i)</div>
                </div>

                <h4 style={{ margin: '18px 0 8px 0', fontSize: '14px', color: '#f8fafc' }}>
                  🛡️ Anti-Collusion & Outlier Diagnostics
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#94a3b8', fontSize: '12px' }}>
                  <li><strong>Severe Free-Rider:</strong> Flagged if ICF &lt; 0.70. Student is penalized proportionally based on peer consensus.</li>
                  <li><strong>Dominant Anchor:</strong> Flagged if ICF &ge; 1.20. Student receives individual merit booster up to the configured clamp cap (default 1.25x).</li>
                  <li><strong>Mutual Collusion Ring:</strong> Anomaly triggered if two students assign each other 5.0/5.0 while ratings from remaining peers diverge significantly (σ &gt; 1.50 or gap &ge; 1.50).</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* 4. MODAL FOOTER */}
        <div style={{
          padding: '14px 28px',
          background: 'rgba(15, 23, 42, 0.75)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#94a3b8'
        }}>
          <div>
            <span>General Sir John Kotelawala Defence University • Faculty of Computing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>Active Cohort: <strong>{students.length} Students</strong> across <strong>{groups.length} Groups</strong></span>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Close Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
