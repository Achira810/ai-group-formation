import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const ConstraintsModal = ({ 
  isOpen, 
  onClose, 
  students = [], 
  constraints = [], 
  onConstraintsChange 
}) => {
  if (!isOpen) return null;

  const [studentAId, setStudentAId] = useState('');
  const [studentBId, setStudentBId] = useState('');
  const [constraintType, setConstraintType] = useState('AFFINITY');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddConstraint = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentAId || !studentBId) {
      setErrorMsg('Please select two distinct students.');
      return;
    }

    if (studentAId === studentBId) {
      setErrorMsg('Student A and Student B cannot be the same student.');
      return;
    }

    // Check duplicate
    const exists = constraints.some(c => 
      (c.student_a_id === studentAId && c.student_b_id === studentBId) ||
      (c.student_a_id === studentBId && c.student_b_id === studentAId)
    );

    if (exists) {
      setErrorMsg('A constraint between these two students already exists.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        student_a_id: studentAId,
        student_b_id: studentBId,
        constraint_type: constraintType,
        notes: notes.trim() || (constraintType === 'AFFINITY' ? 'Must be in same team' : 'Must be in separate teams')
      };

      const { data, error } = await supabase.from('team_constraints').insert([payload]).select();

      if (error) {
        console.error("Supabase error:", error);
        setErrorMsg('Failed to save constraint: ' + error.message);
      } else {
        const newConstraint = data && data[0] ? data[0] : { ...payload, id: Date.now().toString() };
        onConstraintsChange([...constraints, newConstraint]);
        setStudentAId('');
        setStudentBId('');
        setNotes('');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConstraint = async (constraintId) => {
    try {
      await supabase.from('team_constraints').delete().eq('id', constraintId);
      onConstraintsChange(constraints.filter(c => c.id !== constraintId));
    } catch (err) {
      console.error("Delete constraint error:", err);
      onConstraintsChange(constraints.filter(c => c.id !== constraintId));
    }
  };

  const getStudentLabel = (sId) => {
    const s = students.find(item => item.id === sId || item.student_id === sId);
    if (!s) return sId;
    return `${s.student_id} - ${s.full_name}`;
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
        maxWidth: '820px',
        maxHeight: '90vh',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '1px solid rgba(192, 132, 252, 0.35)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px rgba(192, 132, 252, 0.2)',
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
              background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)',
              border: '1px solid rgba(192, 132, 252, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px'
            }}>
              🔗
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #f0abfc 0%, #f472b6 50%, #fbbf24 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Constraint Satisfaction Problem (CSP) Rules
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>
                Enforce Affinity (must pair) and Conflict (must separate) constraints with GA penalties
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
        <div style={{ flex: 1, overflowY: 'auto', padding: '22px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* ADD RULE FORM */}
          <form onSubmit={handleAddConstraint} style={{
            padding: '18px',
            borderRadius: '16px',
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(192, 132, 252, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#f0abfc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ➕ Create New Student Constraint Pair
            </div>

            {errorMsg && (
              <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '12px' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>Student 1</label>
                <select
                  value={studentAId}
                  onChange={(e) => setStudentAId(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontSize: '12px' }}
                >
                  <option value="">-- Select Student 1 --</option>
                  {students.map(s => (
                    <option key={s.id || s.student_id} value={s.id || s.student_id}>
                      {s.student_id} - {s.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>Student 2</label>
                <select
                  value={studentBId}
                  onChange={(e) => setStudentBId(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontSize: '12px' }}
                >
                  <option value="">-- Select Student 2 --</option>
                  {students.map(s => (
                    <option key={s.id || s.student_id} value={s.id || s.student_id}>
                      {s.student_id} - {s.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>Constraint Type</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setConstraintType('AFFINITY')}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      border: constraintType === 'AFFINITY' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                      background: constraintType === 'AFFINITY' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                      color: constraintType === 'AFFINITY' ? '#6ee7b7' : '#94a3b8'
                    }}
                  >
                    🤝 Affinity (Must Pair)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConstraintType('CONFLICT')}
                    style={{
                      flex: 1,
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      border: constraintType === 'CONFLICT' ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                      background: constraintType === 'CONFLICT' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                      color: constraintType === 'CONFLICT' ? '#fca5a5' : '#94a3b8'
                    }}
                  >
                    ⚡ Conflict (Must Separate)
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>Rationale / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Joint capstone prototype / work schedule conflict"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', color: '#f8fafc', fontSize: '12px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button
                type="submit"
                disabled={isSubmitting || students.length === 0}
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: isSubmitting || students.length === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
                }}
              >
                {isSubmitting ? 'Saving...' : '➕ Save Rule to Supabase'}
              </button>
            </div>
          </form>

          {/* ACTIVE CONSTRAINTS LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#e0e7ff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active Constraints ({constraints.length})
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                Penalized in GA Pareto Fitness (γ = 1.0x)
              </span>
            </div>

            {constraints.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '14px', border: '1px dashed rgba(255,255,255,0.1)', fontSize: '12px' }}>
                No affinity or conflict constraints defined yet. Add pairs using the form above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {constraints.map((c, idx) => {
                  const isAffinity = c.constraint_type === 'AFFINITY';
                  return (
                    <div
                      key={c.id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        background: 'rgba(30, 41, 59, 0.5)',
                        border: isAffinity ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '700',
                          background: isAffinity ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: isAffinity ? '#6ee7b7' : '#fca5a5',
                          border: isAffinity ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)'
                        }}>
                          {isAffinity ? '🤝 AFFINITY' : '⚡ CONFLICT'}
                        </span>
                        <div>
                          <div style={{ fontWeight: '600', color: '#f8fafc' }}>
                            <span>{getStudentLabel(c.student_a_id)}</span>
                            <span style={{ margin: '0 8px', color: '#818cf8' }}>↔</span>
                            <span>{getStudentLabel(c.student_b_id)}</span>
                          </div>
                          {c.notes && (
                            <div style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                              {c.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteConstraint(c.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          color: '#fca5a5',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                        title="Delete constraint"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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
