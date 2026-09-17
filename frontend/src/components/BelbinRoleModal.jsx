import React, { useState } from 'react';
import { BELBIN_ROLES } from '../ai/xai';
import { supabase } from '../services/supabaseClient';

export const BelbinRoleModal = ({ 
  isOpen, 
  onClose, 
  students = [], 
  onStudentUpdated 
}) => {
  if (!isOpen) return null;

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || students[0]?.student_id || '');
  const [activeTab, setActiveTab] = useState('picker'); // 'picker' | 'survey'
  const [surveyAnswers, setSurveyAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [savingStatus, setSavingStatus] = useState('');

  const currentStudent = students.find(s => (s.id === selectedStudentId || s.student_id === selectedStudentId));

  const handleRoleChange = async (roleName) => {
    if (!currentStudent) return;

    setSavingStatus('Updating...');
    try {
      const studentDbId = currentStudent.id;
      const { error } = await supabase
        .from('students')
        .update({ belbin_role: roleName })
        .eq(studentDbId ? 'id' : 'student_id', studentDbId || currentStudent.student_id);

      if (!error) {
        onStudentUpdated(currentStudent.student_id, roleName);
        setSavingStatus(`✅ Saved "${roleName}" for ${currentStudent.full_name}`);
      } else {
        onStudentUpdated(currentStudent.student_id, roleName);
        setSavingStatus(`✅ Updated role in memory.`);
      }
    } catch (err) {
      console.error(err);
      onStudentUpdated(currentStudent.student_id, roleName);
      setSavingStatus(`✅ Updated role in memory.`);
    }

    setTimeout(() => setSavingStatus(''), 3000);
  };

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    const counts = { coordinator: 0, implementer: 0, analyst: 0, finisher: 0 };
    Object.values(surveyAnswers).forEach(val => {
      if (counts[val] !== undefined) counts[val]++;
    });

    let topRoleKey = 'implementer';
    let max = -1;
    Object.entries(counts).forEach(([k, v]) => {
      if (v > max) {
        max = v;
        topRoleKey = k;
      }
    });

    const roleObj = BELBIN_ROLES.find(r => r.id === topRoleKey) || BELBIN_ROLES[1];
    handleRoleChange(roleObj.name);
    setActiveTab('picker');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'rgba(7, 11, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      overflowY: 'auto'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '780px',
        maxHeight: '90vh',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '1px solid rgba(251, 191, 36, 0.35)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(251, 191, 36, 0.15)',
        borderRadius: '24px',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>

        {/* HEADER */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(217, 119, 6, 0.3) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🎭
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #fde68a 0%, #fbbf24 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Belbin Team Role & Soft-Skill Profiler
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>
                Profile behavioral archetypes to prevent mono-role bottlenecks (δ = 0.8x weight)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* STUDENT SELECTOR */}
          <div style={{
            padding: '14px 18px',
            borderRadius: '14px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>
                Target Undergraduate:
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontSize: '12px' }}
              >
                {students.map(s => (
                  <option key={s.id || s.student_id} value={s.id || s.student_id}>
                    {s.student_id} - {s.full_name} ({s.belbin_role || 'Technical Implementer'})
                  </option>
                ))}
              </select>
            </div>

            {currentStudent && (
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Assigned Belbin Role</span>
                <span style={{
                  display: 'inline-block',
                  marginTop: '4px',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#fde68a',
                  border: '1px solid rgba(245, 158, 11, 0.4)'
                }}>
                  {currentStudent.belbin_role || 'Technical Implementer'}
                </span>
              </div>
            )}
          </div>

          {/* TAB SWITCHER */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('picker')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'picker' ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
                color: activeTab === 'picker' ? '#fde68a' : '#94a3b8'
              }}
            >
              Direct Role Selection
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('survey')}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'survey' ? 'rgba(245, 158, 11, 0.3)' : 'transparent',
                color: activeTab === 'survey' ? '#fde68a' : '#94a3b8'
              }}
            >
              4-Question Behavioral Survey
            </button>
          </div>

          {savingStatus && (
            <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', fontSize: '12px' }}>
              {savingStatus}
            </div>
          )}

          {/* TAB 1: PICKER */}
          {activeTab === 'picker' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {BELBIN_ROLES.map((role) => {
                const isSelected = currentStudent?.belbin_role === role.name;
                const icons = { coordinator: '👑', implementer: '💻', analyst: '📊', finisher: '📝' };

                return (
                  <div
                    key={role.id}
                    onClick={() => handleRoleChange(role.name)}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(245, 158, 11, 0.18)' : 'rgba(30, 41, 59, 0.45)',
                      border: isSelected ? '2px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px' }}>{icons[role.id] || '⚡'}</span>
                      {isSelected && (
                        <span style={{ fontSize: '10px', fontWeight: '800', background: '#f59e0b', color: '#000', padding: '2px 6px', borderRadius: '4px' }}>
                          ASSIGNED ✓
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: isSelected ? '#fde68a' : '#f8fafc' }}>
                      {role.name}
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
                      {role.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SURVEY */}
          {activeTab === 'survey' && (
            <form onSubmit={handleSurveySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Answer 4 quick behavioral prompts to automatically diagnose the optimal Belbin operational archetype for this student:
              </div>

              {/* Q1 */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#e0e7ff', marginBottom: '8px' }}>
                  1. When starting a major team project, what is your initial instinct?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="coordinator" required onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Organize milestones, assign roles, and align team goals</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Set up the code repo, development environment, and start building features</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Conduct literature research, evaluate datasets, and examine algorithms</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Review rubric compliance, structure report templates, and verify grading criteria</span>
                  </label>
                </div>
              </div>

              {/* Q2 */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#e0e7ff', marginBottom: '8px' }}>
                  2. In high-pressure sprint deadlines, what do you naturally focus on?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="coordinator" required onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Maintaining communication and clearing team blockages</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Writing core code and fixing build errors directly</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Validating accuracy, precision metrics, and mathematical logic</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Proofreading documentation and ensuring spotless formatting</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '9px 20px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  Diagnose & Assign Optimal Role
                </button>
              </div>
            </form>
          )}

        </div>

        {/* FOOTER */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(15, 23, 42, 0.7)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
