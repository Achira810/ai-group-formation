/**
 * KDU AI Group Formation - Conversational Copilot & Dispute Advisor Engine
 * Provides dual-mode natural language intelligence for Lecturers & Students.
 */

export const QUICK_PROMPTS_LECTURER = [
  "Show cohort summary & tier breakdown",
  "Which teams have low academic balance?",
  "List single-discipline teams",
  "Check active constraint violations",
  "Which teams lack an Advanced lead?"
];

export const QUICK_PROMPTS_ADVISOR = [
  "A team member is not contributing (free-riding)",
  "We have a conflict over technology stack / design",
  "How to distribute tasks fairly across roles?",
  "How should we plan our project milestones?"
];

/**
 * Parses user message and generates contextual response with actions
 * @param {string} query - The user's input text
 * @param {string} mode - 'lecturer' | 'health_advisor'
 * @param {Object} context - Live cohort state { students, groups, constraints, clusterStats }
 * @returns {Object} { reply: string, action?: Object, suggestions: string[] }
 */
export const processCopilotQuery = (query, mode = 'lecturer', context = {}) => {
  const q = (query || '').toLowerCase().trim();
  const { students = [], groups = [], constraints = [], clusterStats = [] } = context;

  // -------------------------------------------------------------
  // MODE: LECTURER COPILOT
  // -------------------------------------------------------------
  if (mode === 'lecturer') {
    // 1. Cohort Summary / Statistics
    if (q.includes('summary') || q.includes('how many') || q.includes('cohort') || q.includes('breakdown')) {
      const n = students.length;
      if (n === 0) {
        return {
          reply: "No students are currently loaded in the system. You can upload an Excel/PDF file or add a student using the manual form above.",
          suggestions: ["Upload sample Excel file", "Add single student"]
        };
      }

      const faculties = new Set(students.map(s => s.faculty || 'Computing')).size;
      const programs = new Set(students.map(s => s.degree_program)).size;
      const avgScore = (students.reduce((a, b) => a + (b.technical_score || 0), 0) / n).toFixed(1);
      const advanced = students.filter(s => (s.technical_score || 0) >= 83).length;
      const proficient = students.filter(s => (s.technical_score || 0) >= 66 && (s.technical_score || 0) < 83).length;
      const developing = n - advanced - proficient;

      return {
        reply: `📊 **Active Cohort Overview**:\n\n` +
               `• **Total Undergraduates**: ${n}\n` +
               `• **Faculties**: ${faculties} | **Programmes**: ${programs}\n` +
               `• **Mean Technical Score**: ${avgScore}/100\n` +
               `• **K-Means Stratification**:\n` +
               `  - 🟢 **Tier 3 (Advanced)**: ${advanced} students (${Math.round((advanced/n)*100)}%)\n` +
               `  - 🔵 **Tier 2 (Proficient)**: ${proficient} students (${Math.round((proficient/n)*100)}%)\n` +
               `  - 🟡 **Tier 1 (Developing)**: ${developing} students (${Math.round((developing/n)*100)}%)\n\n` +
               `Currently, **${groups.length} teams** are formed.`,
        suggestions: ["Which teams have low academic balance?", "Check active constraint violations"]
      };
    }

    // 2. Low Balance / Score Teams
    if (q.includes('low') || q.includes('balance') || q.includes('weak') || q.includes('lowest')) {
      if (groups.length === 0) {
        return {
          reply: "No teams have been generated yet! Click **Run AI Formation** to generate groups first.",
          suggestions: ["Show cohort summary & tier breakdown"]
        };
      }

      const teamStats = groups.map((g, idx) => {
        const sum = g.reduce((tot, s) => tot + (s.technical_score || 0), 0);
        const avg = g.length > 0 ? (sum / g.length) : 0;
        return { teamNum: idx + 1, avg, count: g.length };
      }).sort((a, b) => a.avg - b.avg);

      const lowest = teamStats.slice(0, 3);
      const lines = lowest.map(t => `• **Team ${String(t.teamNum).padStart(2, '0')}**: Average Score ${t.avg.toFixed(1)} (${t.count} members)`);

      return {
        reply: `⚠️ **Lowest Scoring Teams**:\n\n${lines.join('\n')}\n\n*Tip*: Use the **Drag-and-Drop Sandbox** to balance these teams by moving a high-performing lead.`,
        suggestions: ["Which teams lack an Advanced lead?", "List single-discipline teams"]
      };
    }

    // 3. Single Discipline Teams
    if (q.includes('single') || q.includes('discipline') || q.includes('monodisciplinary') || q.includes('diversity')) {
      if (groups.length === 0) {
        return {
          reply: "Groups have not been generated yet. Run the formation algorithm to evaluate disciplinary diversity.",
          suggestions: ["Show cohort summary & tier breakdown"]
        };
      }

      const singleDiscTeams = [];
      groups.forEach((g, idx) => {
        const programs = new Set(g.map(s => s.degree_program));
        if (programs.size === 1 && g.length > 1) {
          singleDiscTeams.push({ teamNum: idx + 1, program: Array.from(programs)[0], count: g.length });
        }
      });

      if (singleDiscTeams.length === 0) {
        return {
          reply: `🎉 **Excellent Diversity!** All ${groups.length} teams have interdisciplinary representation across multiple degree programmes (0 single-discipline teams).`,
          suggestions: ["Which teams have low academic balance?", "Check active constraint violations"]
        };
      }

      const lines = singleDiscTeams.map(t => `• **Team ${String(t.teamNum).padStart(2, '0')}**: All ${t.count} students are from *${t.program}*`);
      return {
        reply: `⚠️ **Single-Discipline Teams Identified** (${singleDiscTeams.length} teams):\n\n${lines.join('\n')}\n\n*Suggestion*: Increase the **Cross-Discipline Diversity Weight (β)** in the settings sliders to penalize homogeneous groupings.`,
        suggestions: ["Which teams have low academic balance?", "Show cohort summary & tier breakdown"]
      };
    }

    // 4. Missing Advanced Lead
    if (q.includes('lead') || q.includes('advanced') || q.includes('anchor')) {
      if (groups.length === 0) {
        return { reply: "Please generate teams first to check tier leadership." };
      }

      const missingLeads = [];
      groups.forEach((g, idx) => {
        const hasLead = g.some(s => (s.technical_score || 0) >= 83);
        if (!hasLead) missingLeads.push(idx + 1);
      });

      if (missingLeads.length === 0) {
        return {
          reply: `✅ **Optimal Leadership**: Every team currently has at least one **Tier 3 (Advanced)** student assigned as a technical anchor!`,
          suggestions: ["Show cohort summary & tier breakdown"]
        };
      }

      return {
        reply: `⚠️ **Teams without an Advanced Lead**:\n\n• Team(s): **${missingLeads.map(t => `Team ${t}`).join(', ')}**\n\nThese teams may require academic mentoring support. Consider moving a high-performing student into these groups.`,
        suggestions: ["Which teams have low academic balance?"]
      };
    }

    // 5. Constraints Violations
    if (q.includes('constraint') || q.includes('affinity') || q.includes('conflict')) {
      if (constraints.length === 0) {
        return {
          reply: "No active affinity or conflict constraints are currently registered. You can define rules in the **Constraints & Affinities** modal.",
          suggestions: ["Open Constraints Manager", "Show cohort summary & tier breakdown"]
        };
      }

      // Check violations
      const studentToGroupMap = new Map();
      groups.forEach((g, gIdx) => {
        g.forEach(s => studentToGroupMap.set(s.id || s.student_id, gIdx));
      });

      let violations = [];
      constraints.forEach(c => {
        const gA = studentToGroupMap.get(c.student_a_id);
        const gB = studentToGroupMap.get(c.student_b_id);
        if (gA !== undefined && gB !== undefined) {
          if (c.constraint_type === 'AFFINITY' && gA !== gB) {
            violations.push(`❌ **Affinity Violated**: Students must be in same team, but are in Team ${gA + 1} and Team ${gB + 1}.`);
          } else if (c.constraint_type === 'CONFLICT' && gA === gB) {
            violations.push(`❌ **Conflict Violated**: Conflicting students are both placed in Team ${gA + 1}.`);
          }
        }
      });

      if (violations.length === 0) {
        return {
          reply: `✅ **All Constraints Satisfied!** All ${constraints.length} active affinity and conflict constraints are fully respected across generated teams.`,
          suggestions: ["Show cohort summary & tier breakdown"]
        };
      }

      return {
        reply: `⚠️ **Constraint Violations Found** (${violations.length}):\n\n${violations.join('\n')}\n\n*Fix*: Re-run the Genetic Algorithm with a higher **Constraint Weight (γ)**.`,
        suggestions: ["Which teams have low academic balance?"]
      };
    }

    // Default Lecturer Fallback
    return {
      reply: `I am your **KDU GroupFormation Copilot**. I can help you analyze cohort distributions, inspect team synergy, track constraints, and guide manual allocations.\n\nTry asking:\n• *"Show cohort summary & tier breakdown"*\n• *"Which teams have low academic balance?"*\n• *"List single-discipline teams"*\n• *"Check active constraint violations"*`,
      suggestions: QUICK_PROMPTS_LECTURER
    };
  }

  // -------------------------------------------------------------
  // MODE: STUDENT TEAM HEALTH & DISPUTE ADVISOR
  // -------------------------------------------------------------
  if (q.includes('free-riding') || q.includes('not contributing') || q.includes('inactive') || q.includes('slacking')) {
    return {
      reply: `🛡️ **AI Guidance: Dealing with Free-Riding & Inactive Peers**\n\n` +
             `1. **Clarify Commitments**: Often, silence is caused by role confusion or intimidation. In your next group meeting, assign concrete sub-tasks with strict 48-hour deadlines.\n` +
             `2. **Public Task Tracking**: Use Trello, GitHub Issues, or Google Sheets so individual commits/progress are visible to everyone.\n` +
             `3. **Escalation Protocol**: If the student remains uncommunicative after 3 days, log a formal **Team Health Milestone Ticket** below so the lecturer can intervene without disrupting team morale.`,
      suggestions: ["Log a milestone dispute ticket", "How to distribute tasks fairly across roles?"]
    };
  }

  if (q.includes('conflict') || q.includes('disagree') || q.includes('argument') || q.includes('technology')) {
    return {
      reply: `🤝 **AI Guidance: Resolving Technical & Direction Conflicts**\n\n` +
             `• **Decouple Emotion from Logic**: Create an objective matrix comparing options (e.g., Tech A vs Tech B) on learning curve, documentation, and university rubric compatibility.\n` +
             `• **Time-Boxed Prototyping**: Spend 2 hours building a tiny proof-of-concept for each approach before deciding.\n` +
             `• **Coordinator Decision**: If tied, delegate the final tie-breaking vote to the team's designated **Team Coordinator / Lead**.`,
      suggestions: ["How to distribute tasks fairly across roles?", "How should we plan our project milestones?"]
    };
  }

  if (q.includes('role') || q.includes('distribute') || q.includes('task') || q.includes('assign')) {
    return {
      reply: `🎭 **Recommended Belbin Role Division for Capstone Projects**:\n\n` +
             `• 👑 **Team Coordinator**: Manages timeline, meeting minutes, and submission checklists.\n` +
             `• 💻 **Technical Implementer**: Owns database architecture, core coding, and API endpoints.\n` +
             `• 📊 **Research & Data Analyst**: Validates algorithms, prepares datasets, and benchmarks metrics.\n` +
             `• 📝 **QA & Documentation Lead**: Tests edge cases, formats IEEE report, and polishes presentation slides.`,
      suggestions: ["How should we plan our project milestones?", "A team member is not contributing (free-riding)"]
    };
  }

  if (q.includes('milestone') || q.includes('plan') || q.includes('sprint') || q.includes('schedule')) {
    return {
      reply: `📅 **Optimal 4-Stage Project Milestone Framework**:\n\n` +
             `• **Week 1-2 (Foundation)**: Requirements specification, data cleaning, and database schema setup.\n` +
             `• **Week 3-5 (Core AI Engine)**: Algorithm development (K-Means, Genetic Algorithm, Fuzzy logic).\n` +
             `• **Week 6-7 (Integration & UI)**: Full-stack connection, drag-and-drop testing, and report generation.\n` +
             `• **Week 8 (Benchmarking & Final Presentation)**: Empirical performance evaluation and report compilation.`,
      suggestions: ["How to distribute tasks fairly across roles?", "A team member is not contributing (free-riding)"]
    };
  }

  // Default Advisor Fallback
  return {
    reply: `Welcome to the **Team Health & Dispute Resolution Advisor**.\n\nI provide objective conflict mediation, task delegation advice, and team dispute logging for undergraduate groups.\n\nSelect a common scenario below or describe your team's situation:`,
    suggestions: QUICK_PROMPTS_ADVISOR
  };
};
