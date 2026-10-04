import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_BELBIN_ROLES, 
  SUITABLE_ROLE_ICONS, 
  getActiveRoles, 
  saveActiveRoles, 
  getRoleIcon,
  getRoleColor 
} from '../ai/xai';
import { supabase } from '../services/supabaseClient';
import { cleanStudentName } from '../utils/studentUtils';

const COLOR_PRESETS = [
  { name: 'Gold / Amber', hex: '#f59e0b' },
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Emerald Green', hex: '#10b981' },
  { name: 'Vibrant Pink', hex: '#ec4899' },
  { name: 'Purple / Violet', hex: '#8b5cf6' },
  { name: 'Teal / Cyan', hex: '#06b6d4' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Red', hex: '#ef4444' }
];

export const BelbinRoleModal = ({ 
  isOpen, 
  onClose, 
  students = [], 
  onStudentUpdated,
  onRolesChanged
}) => {
  if (!isOpen) return null;

  // Active roles loaded dynamically from localStorage / defaults
  const [roles, setRoles] = useState(() => getActiveRoles());
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || students[0]?.student_id || '');
  const [activeTab, setActiveTab] = useState('picker'); // 'picker' | 'survey' | 'manage'
  const [surveyAnswers, setSurveyAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
  const [savingStatus, setSavingStatus] = useState('');

  // New Role Form State
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleIcon, setNewRoleIcon] = useState('🎨');
  const [newRoleColor, setNewRoleColor] = useState('#8b5cf6');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [isAddingRole, setIsAddingRole] = useState(false);

  // Sync roles when changed
  const updateRolesList = (newRoles) => {
    setRoles(newRoles);
    saveActiveRoles(newRoles);
    if (onRolesChanged) onRolesChanged(newRoles);
  };

  const currentStudent = students.find(s => (s.id === selectedStudentId || s.student_id === selectedStudentId));

  // Count how many students currently hold each role
  const roleCounts = {};
  roles.forEach(r => { roleCounts[r.name] = 0; });
  students.forEach(s => {
    const rName = s.belbin_role || 'Technical Implementer';
    if (roleCounts[rName] !== undefined) {
      roleCounts[rName]++;
    } else {
      roleCounts[rName] = (roleCounts[rName] || 0) + 1;
    }
  });

  // Handle assigning a role to the selected student
  const handleRoleChange = async (roleName) => {
    if (!currentStudent) return;

    setSavingStatus('Updating role in database...');
    try {
      const studentDbId = currentStudent.id;
      const { error } = await supabase
        .from('students')
        .update({ belbin_role: roleName })
        .eq(studentDbId ? 'id' : 'student_id', studentDbId || currentStudent.student_id);

      if (!error) {
        onStudentUpdated(currentStudent.student_id, roleName);
        setSavingStatus(`✅ Saved "${roleName}" for ${cleanStudentName(currentStudent.full_name)}`);
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

  // Add a new custom role
  const handleAddRole = (e) => {
    e.preventDefault();
    const trimmed = newRoleName.trim();
    if (!trimmed) {
      alert("Please provide a name for the new role.");
      return;
    }

    // Check for duplicate name
    if (roles.some(r => r.name.toLowerCase() === trimmed.toLowerCase())) {
      alert(`A role named "${trimmed}" already exists.`);
      return;
    }

    const newRole = {
      id: trimmed.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: trimmed,
      icon: newRoleIcon || '⚡',
      color: newRoleColor || '#6366f1',
      desc: newRoleDesc.trim() || 'Custom academic project operational role.'
    };

    const updated = [...roles, newRole];
    updateRolesList(updated);
    setNewRoleName('');
    setNewRoleDesc('');
    setIsAddingRole(false);
    setSavingStatus(`✅ Added new role "${newRole.icon} ${newRole.name}"`);
    setTimeout(() => setSavingStatus(''), 3000);
  };

  // Remove a role
  const handleRemoveRole = async (roleToRemove) => {
    if (roles.length <= 1) {
      alert("At least one role must remain in the system.");
      return;
    }

    const assignedCount = roleCounts[roleToRemove.name] || 0;
    const confirmMsg = assignedCount > 0
      ? `Remove "${roleToRemove.icon} ${roleToRemove.name}"? ${assignedCount} student(s) currently assigned to this role will be reassigned to the default role.`
      : `Remove role "${roleToRemove.icon} ${roleToRemove.name}"?`;

    if (!window.confirm(confirmMsg)) return;

    const remainingRoles = roles.filter(r => r.id !== roleToRemove.id && r.name !== roleToRemove.name);
    const fallbackRole = remainingRoles[0]?.name || 'Technical Implementer';

    // Reassign affected students in local state and database
    if (assignedCount > 0) {
      students.forEach(async (st) => {
        if (st.belbin_role === roleToRemove.name) {
          onStudentUpdated(st.student_id, fallbackRole);
          try {
            await supabase
              .from('students')
              .update({ belbin_role: fallbackRole })
              .eq('student_id', st.student_id);
          } catch (e) {
            console.warn("Could not reassign in DB:", e);
          }
        }
      });
    }

    updateRolesList(remainingRoles);
    setSavingStatus(`🗑️ Removed role "${roleToRemove.name}".`);
    setTimeout(() => setSavingStatus(''), 3000);
  };

  // Reset to default roles
  const handleResetDefaults = () => {
    if (window.confirm("Reset role catalog to the 4 standard Belbin operational roles?")) {
      updateRolesList(DEFAULT_BELBIN_ROLES);
      setSavingStatus("🔄 Reset to 4 default Belbin roles.");
      setTimeout(() => setSavingStatus(''), 3000);
    }
  };

  // Survey Submit handler
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

    const roleObj = roles.find(r => r.id === topRoleKey) || roles[0];
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
        maxWidth: '840px',
        maxHeight: '92vh',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#f8fafc',
                  letterSpacing: '-0.02em'
                }}>
                  Belbin Team Role & Soft-Skill Profiler
                </h2>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#fde68a',
                  border: '1px solid rgba(245, 158, 11, 0.4)'
                }}>
                  {roles.length} Roles Active
                </span>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Profile behavioral archetypes to prevent mono-role bottlenecks (δ = 0.8x weight).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            ✕
          </button>
        </div>

        {/* STATUS BANNER */}
        {savingStatus && (
          <div style={{
            padding: '8px 24px',
            background: savingStatus.includes('🗑️') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            color: savingStatus.includes('🗑️') ? '#fca5a5' : '#6ee7b7',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {savingStatus}
          </div>
        )}

        {/* BODY */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* TARGET STUDENT SELECTOR */}
          <div style={{
            padding: '14px 16px',
            borderRadius: '14px',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>
              Target Undergraduate:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontSize: '13px',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {students.map((s) => (
                <option key={s.id || s.student_id} value={s.id || s.student_id}>
                  {s.student_id} — {cleanStudentName(s.full_name)} ({s.belbin_role || 'Technical Implementer'})
                </option>
              ))}
            </select>

            {currentStudent && (
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#cbd5e1' }}>
                <span>Current Role:</span>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: '#fde68a',
                  fontWeight: '700',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>{getRoleIcon(currentStudent.belbin_role)}</span>
                  <span>{currentStudent.belbin_role || 'Technical Implementer'}</span>
                </span>
              </div>
            )}
          </div>

          {/* TAB BUTTONS (Direct Selection, Survey, Manage Roles) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '10px'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('picker')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'picker' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                  color: activeTab === 'picker' ? '#fde68a' : '#94a3b8'
                }}
              >
                🎯 Direct Role Selection
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('survey')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'survey' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                  color: activeTab === 'survey' ? '#fde68a' : '#94a3b8'
                }}
              >
                📋 4-Question Behavioral Survey
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'manage' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                  color: activeTab === 'manage' ? '#c7d2fe' : '#94a3b8'
                }}
              >
                ⚙️ Manage Roles & Icons ({roles.length})
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveTab('manage');
                setIsAddingRole(true);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>➕ Add New Role</span>
            </button>
          </div>

          {/* ============================================================== */}
          {/* TAB 1: DIRECT ROLE SELECTION */}
          {/* ============================================================== */}
          {activeTab === 'picker' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {roles.map((role) => {
                const isSelected = currentStudent?.belbin_role === role.name;
                const assigned = roleCounts[role.name] || 0;

                return (
                  <div
                    key={role.id || role.name}
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
                      gap: '8px',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '22px' }}>{role.icon || '⚡'}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                          {assigned} student{assigned !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {isSelected && (
                        <span style={{ fontSize: '10px', fontWeight: '800', background: '#f59e0b', color: '#000', padding: '2px 8px', borderRadius: '6px' }}>
                          ASSIGNED ✓
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: isSelected ? '#fde68a' : '#f8fafc' }}>
                      {role.name}
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' }}>
                      {role.desc || role.description || 'Operational role archetype.'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: BEHAVIORAL SURVEY */}
          {/* ============================================================== */}
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
                    <span>Organize milestones, assign roles, and align team goals (Team Coordinator)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Set up the code repo, development environment, and start building features (Technical Implementer)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Conduct literature research, evaluate datasets, and examine algorithms (Research & Data Analyst)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q1" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q1: e.target.value })} />
                    <span>Review rubric compliance, structure report templates, and verify grading criteria (QA & Documentation)</span>
                  </label>
                </div>
              </div>

              {/* Q2 */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#e0e7ff', marginBottom: '8px' }}>
                  2. What type of work gives you the most satisfaction?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="coordinator" required onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Conducting team standups and ensuring everyone is unblocked</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Writing clean algorithms and resolving difficult technical bugs</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Finding actionable patterns and proving mathematical validity</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q2" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q2: e.target.value })} />
                    <span>Polishing document formatting, checking citations, and catching overlooked defects</span>
                  </label>
                </div>
              </div>

              {/* Q3 */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#e0e7ff', marginBottom: '8px' }}>
                  3. In the event of team disagreement, how do you respond?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q3" value="coordinator" required onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q3: e.target.value })} />
                    <span>Facilitate a compromise and steer the team back toward project deadlines</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q3" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q3: e.target.value })} />
                    <span>Build a quick prototype or proof-of-concept to let the code settle the debate</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q3" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q3: e.target.value })} />
                    <span>Objectively analyze the pros and cons using facts and empirical data</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q3" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q3: e.target.value })} />
                    <span>Check institutional guidelines and assignment rubrics to ensure compliance</span>
                  </label>
                </div>
              </div>

              {/* Q4 */}
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#e0e7ff', marginBottom: '8px' }}>
                  4. What do you consider your greatest asset to an engineering squad?
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q4" value="coordinator" required onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q4: e.target.value })} />
                    <span>Delegation, morale-boosting, and clear communication</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q4" value="implementer" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q4: e.target.value })} />
                    <span>Technical depth, speed of feature delivery, and endurance</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q4" value="analyst" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q4: e.target.value })} />
                    <span>Logical reasoning, problem deconstruction, and domain research</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="q4" value="finisher" onChange={(e) => setSurveyAnswers({ ...surveyAnswers, q4: e.target.value })} />
                    <span>Attention to detail, perfectionism, and zero tolerance for sloppy work</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  border: 'none',
                  color: '#000000',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                }}
              >
                ⚡ Diagnose & Assign Belbin Role
              </button>
            </form>
          )}

          {/* ============================================================== */}
          {/* TAB 3: MANAGE & CUSTOMIZE ROLES (ADD / REMOVE / ICONS) */}
          {/* ============================================================== */}
          {activeTab === 'manage' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* ADD ROLE FORM / DRAWER */}
              {isAddingRole ? (
                <div style={{
                  padding: '18px 20px',
                  borderRadius: '16px',
                  background: 'rgba(30, 41, 59, 0.75)',
                  border: '1px solid rgba(99, 102, 241, 0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✨</span> Create New Project Operational Role
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingRole(false)}
                      style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleAddRole} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#cbd5e1', marginBottom: '4px' }}>
                          Role Name:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. UI/UX Designer, DevOps & Cloud Specialist, AI/ML Engineer..."
                          value={newRoleName}
                          onChange={(e) => setNewRoleName(e.target.value)}
                          maxLength={48}
                          style={{
                            width: '100%',
                            padding: '9px 12px',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#f8fafc',
                            fontSize: '12px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#cbd5e1', marginBottom: '4px' }}>
                          Selected Icon:
                        </label>
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '8px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          border: `2px solid ${newRoleColor}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '22px'
                        }}>
                          {newRoleIcon}
                        </div>
                      </div>
                    </div>

                    {/* SUITABLE ICONS SELECTOR */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                        Choose Suitable Role Icon:
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                        gap: '6px',
                        background: 'rgba(15, 23, 42, 0.65)',
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}>
                        {SUITABLE_ROLE_ICONS.map((item) => (
                          <button
                            key={item.icon}
                            type="button"
                            title={item.label}
                            onClick={() => setNewRoleIcon(item.icon)}
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              fontSize: '18px',
                              background: newRoleIcon === item.icon ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                              border: newRoleIcon === item.icon ? '1px solid #818cf8' : '1px solid transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.1s ease'
                            }}
                          >
                            {item.icon}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* COLOR PRESET SELECTOR */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#cbd5e1', marginBottom: '6px' }}>
                        Accent Theme Color:
                      </label>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {COLOR_PRESETS.map((cp) => (
                          <button
                            key={cp.hex}
                            type="button"
                            title={cp.name}
                            onClick={() => setNewRoleColor(cp.hex)}
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: cp.hex,
                              border: newRoleColor === cp.hex ? '2px solid #ffffff' : '1px solid rgba(0, 0, 0, 0.3)',
                              cursor: 'pointer',
                              boxShadow: newRoleColor === cp.hex ? '0 0 8px #ffffff' : 'none'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* ROLE DESCRIPTION */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#cbd5e1', marginBottom: '4px' }}>
                        Short Description & Focus:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wireframes, component styling, design system and accessibility"
                        value={newRoleDesc}
                        onChange={(e) => setNewRoleDesc(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: '12px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setIsAddingRole(false)}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#cbd5e1',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: '7px 18px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                          border: 'none',
                          color: '#ffffff',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
                        }}
                      >
                        ➕ Save Role to Catalog
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(30, 41, 59, 0.4)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#f8fafc' }}>Customize Project Roles</strong>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Add specialized engineering roles or remove redundant archetypes.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setIsAddingRole(true)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      ➕ Add Role
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#cbd5e1',
                        cursor: 'pointer'
                      }}
                    >
                      🔄 Reset Defaults
                    </button>
                  </div>
                </div>
              )}

              {/* ROLES LIST WITH REMOVE BUTTON */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {roles.map((role) => {
                  const assigned = roleCounts[role.name] || 0;

                  return (
                    <div
                      key={role.id || role.name}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: `${role.color || '#6366f1'}22`,
                          border: `1px solid ${role.color || '#6366f1'}55`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px'
                        }}>
                          {role.icon || '⚡'}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '800', color: '#f8fafc' }}>
                              {role.name}
                            </span>
                            <span style={{
                              fontSize: '10px',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: assigned > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                              color: assigned > 0 ? '#6ee7b7' : '#94a3b8',
                              fontWeight: '700'
                            }}>
                              {assigned} student{assigned !== 1 ? 's' : ''} assigned
                            </span>
                          </div>
                          <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>
                            {role.desc || role.description || 'Custom role.'}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            handleRoleChange(role.name);
                            setActiveTab('picker');
                          }}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(99, 102, 241, 0.2)',
                            border: '1px solid rgba(99, 102, 241, 0.4)',
                            color: '#c7d2fe',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          Assign ➔
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveRole(role)}
                          title="Remove this role from catalog"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#fca5a5',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>🗑️</span>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* FOOTER */}
        <div style={{
          padding: '12px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>
            <span>Active Roles: <strong>{roles.length}</strong> | Target: <strong>{cleanStudentName(currentStudent?.full_name || 'None')}</strong></span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '7px 18px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#f8fafc',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
