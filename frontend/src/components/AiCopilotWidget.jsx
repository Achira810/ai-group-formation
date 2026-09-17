import React, { useState, useEffect, useRef } from 'react';
import { processCopilotQuery, QUICK_PROMPTS_LECTURER, QUICK_PROMPTS_ADVISOR } from '../ai/copilot';
import { supabase } from '../services/supabaseClient';

export const AiCopilotWidget = ({ 
  students = [], 
  groups = [], 
  constraints = [], 
  clusterStats = [] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('lecturer'); // 'lecturer' | 'health_advisor'
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'copilot',
      text: "👋 Hello! I am your **KDU GroupFormation AI Copilot**.\n\nAsk me about cohort statistics, team score balance, constraint violations, or switch to **Dispute Advisor** mode for student team conflict resolution.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Dispute ticket modal form states
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);
  const [milestoneTitle, setMilestoneTitle] = useState('Milestone 1 - Initial Prototype');
  const [contributionScore, setContributionScore] = useState(3);
  const [disputeFeedback, setDisputeFeedback] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Load past chat messages from Supabase on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          const loaded = data.reverse().map(m => ({
            id: m.id,
            sender: m.sender,
            text: m.message,
            timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setMessages(loaded);
        }
      } catch (err) {
        console.warn("Could not load chat history from Supabase:", err);
      }
    };
    fetchChatHistory();
  }, []);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      await supabase.from('chat_messages').insert([{
        sender: 'user',
        mode: mode,
        message: text
      }]);
    } catch (e) {
      console.warn(e);
    }

    setTimeout(async () => {
      const result = processCopilotQuery(text, mode, {
        students,
        groups,
        constraints,
        clusterStats
      });

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'copilot',
        text: result.response,
        suggestions: result.suggestions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      try {
        await supabase.from('chat_messages').insert([{
          sender: 'copilot',
          mode: mode,
          message: result.response
        }]);
      } catch (e) {
        console.warn(e);
      }
    }, 450);
  };

  const handleCreateDisputeTicket = async (e) => {
    e.preventDefault();
    if (!disputeFeedback.trim()) return;

    setTicketStatus('Submitting to Supabase...');
    try {
      const { error } = await supabase.from('team_health_logs').insert([{
        group_id: null,
        milestone_name: milestoneTitle,
        reported_by: null,
        contribution_score: contributionScore,
        peer_feedback: disputeFeedback,
        dispute_status: 'OPEN'
      }]);

      if (!error) {
        setTicketStatus('✅ Dispute Ticket recorded in Supabase!');
        setTimeout(() => {
          setShowDisputeForm(false);
          setTicketStatus('');
          setDisputeFeedback('');
          handleSendMessage(`I logged a dispute ticket for Team ${selectedGroupIdx + 1} regarding "${milestoneTitle}". How can we address this workload disparity?`);
        }, 1200);
      } else {
        setTicketStatus(`⚠️ Failed: ${error.message}`);
      }
    } catch (err) {
      setTicketStatus(`⚠️ Error: ${err.message}`);
    }
  };

  const currentPrompts = mode === 'lecturer' ? QUICK_PROMPTS_LECTURER : QUICK_PROMPTS_ADVISOR;

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9990 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 10px 28px rgba(99, 102, 241, 0.45)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transition: 'transform 0.2s ease'
          }}
          title="KDU AI Copilot & Dispute Advisor"
        >
          <span>{isOpen ? '✕' : '💬'}</span>
        </button>
      </div>

      {/* FLOATING CHAT DRAWER */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 9995,
          width: '420px',
          maxWidth: 'calc(100vw - 32px)',
          height: '580px',
          maxHeight: 'calc(100vh - 120px)',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(16px)'
        }}>

          {/* HEADER */}
          <div style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(99, 102, 241, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                {mode === 'lecturer' ? '🎓' : '🛡️'}
              </span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>KDU AI Copilot</span>
                  <span style={{ fontSize: '9px', fontWeight: '800', background: 'rgba(99, 102, 241, 0.3)', color: '#a5b4fc', padding: '1px 5px', borderRadius: '4px' }}>
                    STAGE 3
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                  {mode === 'lecturer' ? 'Lecturer Allocation Assistant' : 'Team Health & Dispute Mediator'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}
            >
              ✕
            </button>
          </div>

          {/* MODE TABS */}
          <div style={{ display: 'flex', background: 'rgba(10, 15, 26, 0.7)', padding: '4px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', gap: '4px' }}>
            <button
              type="button"
              onClick={() => setMode('lecturer')}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: mode === 'lecturer' ? 'rgba(99, 102, 241, 0.35)' : 'transparent',
                color: mode === 'lecturer' ? '#ffffff' : '#94a3b8'
              }}
            >
              🎓 Lecturer Copilot
            </button>
            <button
              type="button"
              onClick={() => setMode('health_advisor')}
              style={{
                flex: 1,
                padding: '6px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                background: mode === 'health_advisor' ? 'rgba(168, 85, 247, 0.35)' : 'transparent',
                color: mode === 'health_advisor' ? '#ffffff' : '#94a3b8'
              }}
            >
              🛡️ Dispute Advisor
            </button>
          </div>

          {/* DISPUTE TICKET BUTTON BANNER */}
          {mode === 'health_advisor' && (
            <div style={{ padding: '8px 14px', background: 'rgba(112, 26, 117, 0.25)', borderBottom: '1px solid rgba(192, 132, 252, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
              <span style={{ color: '#f0abfc', fontWeight: '500' }}>Active peer grievance?</span>
              <button
                onClick={() => setShowDisputeForm(true)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#a855f7',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                + Log Ticket
              </button>
            </div>
          )}

          {/* MESSAGES STREAM */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg) => {
              const isBot = msg.sender === 'copilot';
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isBot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    lineHeight: '1.45',
                    background: isBot ? 'rgba(30, 41, 59, 0.85)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    border: isBot ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                    color: '#f8fafc',
                    boxShadow: isBot ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}>
                    <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>

                    {isBot && msg.suggestions && msg.suggestions.length > 0 && (
                      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {msg.suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sug)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '10px',
                              background: 'rgba(99, 102, 241, 0.25)',
                              border: '1px solid rgba(99, 102, 241, 0.4)',
                              color: '#c7d2fe',
                              cursor: 'pointer'
                            }}
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '9px', color: '#64748b', marginTop: '3px', padding: '0 4px' }}>
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ fontSize: '11px', color: '#818cf8', fontStyle: 'italic', padding: '4px' }}>
                AI Copilot is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPTS */}
          <div style={{ padding: '6px 12px', background: 'rgba(10, 15, 26, 0.6)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {currentPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '10px',
                  fontWeight: '600',
                  background: 'rgba(30, 41, 59, 0.7)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#cbd5e1',
                  cursor: 'pointer'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT BAR */}
          <div style={{ padding: '12px 14px', background: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder={mode === 'lecturer' ? "Ask about team balance, constraints..." : "Describe a grievance or request mediation..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                background: '#0f172a',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f8fafc',
                fontSize: '12px'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim()}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                color: '#ffffff',
                cursor: !inputVal.trim() ? 'not-allowed' : 'pointer',
                opacity: !inputVal.trim() ? 0.5 : 1,
                fontSize: '13px'
              }}
            >
              ➤
            </button>
          </div>

        </div>
      )}

      {/* DISPUTE FORM MODAL */}
      {showDisputeForm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10005, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(7, 11, 20, 0.8)', backdropFilter: 'blur(8px)' }}>
          <div style={{ width: '100%', maxWidth: '440px', background: '#0f172a', border: '1px solid rgba(192, 132, 252, 0.35)', borderRadius: '18px', padding: '20px', color: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#f0abfc' }}>
                🛡️ Log Milestone Dispute Ticket
              </h3>
              <button onClick={() => setShowDisputeForm(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
            </div>

            {ticketStatus && (
              <div style={{ padding: '8px', fontSize: '11px', borderRadius: '6px', background: 'rgba(168,85,247,0.2)', color: '#f0abfc' }}>
                {ticketStatus}
              </div>
            )}

            <form onSubmit={handleCreateDisputeTicket} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>Target Team</label>
                <select
                  value={selectedGroupIdx}
                  onChange={(e) => setSelectedGroupIdx(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}
                >
                  {groups.map((_, gIdx) => (
                    <option key={gIdx} value={gIdx}>Team {String(gIdx + 1).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>Milestone Name</label>
                <input
                  type="text"
                  required
                  value={milestoneTitle}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>
                  Contribution Rating: {contributionScore} / 5
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={contributionScore}
                  onChange={(e) => setContributionScore(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#a855f7' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>Factual Description / Evidence</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Explain workload imbalance or missed deadline..."
                  value={disputeFeedback}
                  onChange={(e) => setDisputeFeedback(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowDisputeForm(false)} style={{ padding: '6px 12px', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '6px 14px', borderRadius: '6px', background: '#a855f7', border: 'none', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>Save to Supabase</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
