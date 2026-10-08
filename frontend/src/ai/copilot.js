/**
 * KDU AI Group Formation - Conversational Copilot & Dispute Advisor Engine
 * Provides dual-mode natural language intelligence for Lecturers & Students.
 */

export const QUICK_PROMPTS_LECTURER = [
  "Show cohort summary & tier breakdown",
  "Which teams have low academic balance?",
  "Which team is performing best?",
  "Check active constraint violations",
  "Explain the 3-stage AI pipeline",
  "How does Kaufman ICF anti-freerider work?"
];

export const QUICK_PROMPTS_ADVISOR = [
  "A team member is not contributing (free-riding)",
  "We have a conflict over technology stack / design",
  "How to distribute tasks fairly across roles?",
  "How should we plan our project milestones?",
  "Log a milestone dispute ticket"
];

const makeResult = (text, suggestions = [], action = null) => ({
  reply: text,
  response: text, // Dual compatibility
  text: text,
  suggestions,
  action
});

/**
 * Parses user message and generates contextual response with actions
 * @param {string} query - The user's input text
 * @param {string} mode - 'lecturer' | 'health_advisor'
 * @param {Object} context - Live cohort state { students, groups, constraints, clusterStats }
 * @returns {Object} { reply: string, response: string, text: string, suggestions: string[] }
 */
export const processCopilotQuery = (query, mode = 'lecturer', context = {}) => {
  const q = (query || '').toLowerCase().trim();
  const { students = [], groups = [], constraints = [], clusterStats = [] } = context;

  // -------------------------------------------------------------
  // UNIVERSAL GREETINGS & INTRODUCTIONS
  // -------------------------------------------------------------
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q.startsWith('hi ') ||
    q.startsWith('hello ') ||
    q.startsWith('hey ') ||
    q.includes('good morning') ||
    q.includes('good afternoon') ||
    q.includes('good evening') ||
    q.includes('who are you') ||
    q.includes('what can you do') ||
    q === 'help'
  ) {
    if (mode === 'lecturer') {
      return makeResult(
        `👋 **Hello! I am your KDU Group Formation AI Copilot.**\n\n` +
        `I am connected directly to your active cohort (${students.length} students, ${groups.length} formed teams).\n\n` +
        `Here is what you can ask me:\n` +
        `• 📊 *"Show cohort summary & tier breakdown"*\n` +
        `• ⚖️ *"Which teams have low academic balance?"*\n` +
        `• 🏆 *"Which team is performing best?"*\n` +
        `• 🔗 *"Check active constraint violations"*\n` +
        `• 🧬 *"Explain the 3-stage AI pipeline"*\n` +
        `• ⚖️ *"How does Kaufman ICF anti-freerider work?"*`,
        QUICK_PROMPTS_LECTURER
      );
    } else {
      return makeResult(
        `🛡️ **Hello! I am your KDU Student Team Health & Dispute Mediator.**\n\n` +
        `I assist student project groups with constructive conflict mediation, fair task distribution, sprint planning, and formal dispute logging.\n\n` +
        `How can I assist your group today?\n` +
        `• *"A team member is not contributing (free-riding)"*\n` +
        `• *"We have a conflict over technology stack / design"*\n` +
        `• *"How to distribute tasks fairly across roles?"*\n` +
        `• *"Log a milestone dispute ticket"*`,
        QUICK_PROMPTS_ADVISOR
      );
    }
  }

  // -------------------------------------------------------------
  // MODE: LECTURER COPILOT
  // -------------------------------------------------------------
  if (mode === 'lecturer') {
    // 1. Cohort Summary / Statistics
    if (q.includes('summary') || q.includes('how many') || q.includes('cohort') || q.includes('breakdown') || q.includes('roster') || q.includes('statistics')) {
      const n = students.length;
      if (n === 0) {
        return makeResult(
          "⚠️ No students are currently registered in the system. You can load the **KDU Sample Cohort (Demo)** button above, upload an Excel/PDF marksheet, or register students manually.",
          ["Load sample cohort", "How does the AI pipeline work?"]
        );
      }

      const faculties = new Set(students.map(s => s.faculty || 'Computing')).size;
      const programs = new Set(students.map(s => s.degree_program || s.degreeProgram || 'Computing')).size;
      const avgScore = (students.reduce((a, b) => a + (b.technical_score || b.technicalScore || 0), 0) / n).toFixed(1);
      const advanced = students.filter(s => (s.technical_score || s.technicalScore || 0) >= 83).length;
      const proficient = students.filter(s => {
        const sc = s.technical_score || s.technicalScore || 0;
        return sc >= 66 && sc < 83;
      }).length;
      const developing = n - advanced - proficient;

      return makeResult(
        `📊 **Active Cohort Overview**:\n\n` +
        `• **Total Undergraduates**: ${n}\n` +
        `• **Faculties Represented**: ${faculties} | **Degree Programmes**: ${programs}\n` +
        `• **Cohort Average Score**: **${avgScore}/100**\n` +
        `• **K-Means 3-Tier Stratification**:\n` +
        `  - 🟢 **Tier 3 (Advanced)**: ${advanced} students (${Math.round((advanced/n)*100)}%)\n` +
        `  - 🔵 **Tier 2 (Proficient)**: ${proficient} students (${Math.round((proficient/n)*100)}%)\n` +
        `  - 🟡 **Tier 1 (Developing)**: ${developing} students (${Math.round((developing/n)*100)}%)\n\n` +
        `Currently, **${groups.length} teams** are formed with **${constraints.length} active CSP rules**.`,
        ["Which teams have low academic balance?", "Which team is performing best?", "Check active constraint violations"]
      );
    }

    // 2. Best / Top Performing Teams
    if (q.includes('best') || q.includes('top') || q.includes('highest')) {
      if (groups.length === 0) {
        return makeResult(
          "No teams have been formed yet. Click **Run AI Formation** on the dashboard first.",
          ["Show cohort summary & tier breakdown"]
        );
      }

      const teamStats = groups.map((g, idx) => {
        const sum = g.reduce((tot, s) => tot + (s.technical_score || s.technicalScore || 0), 0);
        const avg = g.length > 0 ? (sum / g.length) : 0;
        const syn = g.synergy?.overallScore || 0;
        return { teamNum: idx + 1, avg, syn, count: g.length };
      }).sort((a, b) => (b.syn || b.avg) - (a.syn || a.avg));

      const top = teamStats[0];
      return makeResult(
        `🏆 **Top Performing Group: Team ${String(top.teamNum).padStart(2, '0')}**\n\n` +
        `• **Average Technical Score**: ${top.avg.toFixed(1)}/100\n` +
        `• **AI Synergy Rating**: **${top.syn > 0 ? top.syn + '%' : 'Calculated'}**\n` +
        `• **Team Size**: ${top.count} undergraduate members\n\n` +
        `This team demonstrates optimal academic parity and diverse role distribution.`,
        ["Which teams have low academic balance?", "Show cohort summary & tier breakdown"]
      );
    }

    // 3. Specific Team Inspection (e.g. "team 1", "team 2")
    const teamMatch = q.match(/team\s*(\d+)/i);
    if (teamMatch) {
      const tNum = parseInt(teamMatch[1], 10);
      if (tNum >= 1 && tNum <= groups.length) {
        const g = groups[tNum - 1];
        const sum = g.reduce((tot, s) => tot + (s.technical_score || s.technicalScore || 0), 0);
        const avg = g.length > 0 ? (sum / g.length).toFixed(1) : '0';
        const memberList = g.map(s => `  - **${s.full_name || s.student_id}** (${s.degree_program || 'Computing'}, ${s.belbin_role || 'Member'}, Score: ${s.technical_score || s.technicalScore})`).join('\n');

        return makeResult(
          `🔍 **Inspection: Team ${String(tNum).padStart(2, '0')}**\n\n` +
          `• **Members (${g.length})**:\n${memberList}\n\n` +
          `• **Team Mean Score**: **${avg}/100**\n` +
          `• **Synergy Score**: ${g.synergy?.overallScore ? g.synergy.overallScore + '%' : 'N/A'}\n` +
          `• **Rationale**: ${g.synergy?.rationale || 'Balanced team distribution.'}`,
          ["Which teams have low academic balance?", "Check active constraint violations"]
        );
      }
    }

    // 4. Low Balance / Score Teams
    if (q.includes('low') || q.includes('balance') || q.includes('weak') || q.includes('lowest')) {
      if (groups.length === 0) {
        return makeResult(
          "No teams have been generated yet! Click **Run AI Formation** to generate groups first.",
          ["Show cohort summary & tier breakdown"]
        );
      }

      const teamStats = groups.map((g, idx) => {
        const sum = g.reduce((tot, s) => tot + (s.technical_score || s.technicalScore || 0), 0);
        const avg = g.length > 0 ? (sum / g.length) : 0;
        return { teamNum: idx + 1, avg, count: g.length };
      }).sort((a, b) => a.avg - b.avg);

      const lowest = teamStats.slice(0, 3);
      const lines = lowest.map(t => `• **Team ${String(t.teamNum).padStart(2, '0')}**: Average Score ${t.avg.toFixed(1)} (${t.count} members)`);

      return makeResult(
        `⚠️ **Lowest Scoring Teams**:\n\n${lines.join('\n')}\n\n*Tip*: Use the **Drag-and-Drop Sandbox** below the results to manually transfer an Advanced tier lead if needed.`,
        ["Which teams lack an Advanced lead?", "List single-discipline teams"]
      );
    }

    // 5. Single Discipline Teams
    if (q.includes('single') || q.includes('discipline') || q.includes('monodisciplinary') || q.includes('diversity')) {
      if (groups.length === 0) {
        return makeResult(
          "Groups have not been generated yet. Run the formation algorithm to evaluate disciplinary diversity.",
          ["Show cohort summary & tier breakdown"]
        );
      }

      const singleDiscTeams = [];
      groups.forEach((g, idx) => {
        const programs = new Set(g.map(s => s.degree_program || s.degreeProgram || 'Computing'));
        if (programs.size === 1 && g.length > 1) {
          singleDiscTeams.push({ teamNum: idx + 1, program: Array.from(programs)[0], count: g.length });
        }
      });

      if (singleDiscTeams.length === 0) {
        return makeResult(
          `🎉 **Excellent Diversity!** All ${groups.length} teams have interdisciplinary representation across multiple degree programmes (0 single-discipline teams).`,
          ["Which teams have low academic balance?", "Check active constraint violations"]
        );
      }

      const lines = singleDiscTeams.map(t => `• **Team ${String(t.teamNum).padStart(2, '0')}**: All ${t.count} students are from *${t.program}*`);
      return makeResult(
        `⚠️ **Single-Discipline Teams Identified** (${singleDiscTeams.length} teams):\n\n${lines.join('\n')}\n\n*Suggestion*: Increase the **Cross-Discipline Diversity Weight (β)** in the settings sliders to penalize homogeneous groupings.`,
        ["Which teams have low academic balance?", "Show cohort summary & tier breakdown"]
      );
    }

    // 6. Missing Advanced Lead
    if (q.includes('lead') || q.includes('advanced') || q.includes('anchor')) {
      if (groups.length === 0) {
        return makeResult(
          "Please generate teams first to check tier leadership.",
          ["Show cohort summary & tier breakdown"]
        );
      }

      const missingLeads = [];
      groups.forEach((g, idx) => {
        const hasLead = g.some(s => (s.technical_score || s.technicalScore || 0) >= 83);
        if (!hasLead) missingLeads.push(idx + 1);
      });

      if (missingLeads.length === 0) {
        return makeResult(
          `✅ **Optimal Leadership**: Every team currently has at least one **Tier 3 (Advanced)** student assigned as a technical anchor!`,
          ["Show cohort summary & tier breakdown"]
        );
      }

      return makeResult(
        `⚠️ **Teams without an Advanced Lead**:\n\n• Team(s): **${missingLeads.map(t => `Team ${t}`).join(', ')}**\n\nThese teams may require academic mentoring support. Consider moving a high-performing student into these groups.`,
        ["Which teams have low academic balance?"]
      );
    }

    // 7. Constraints Violations
    if (q.includes('constraint') || q.includes('affinity') || q.includes('conflict') || q.includes('rule') || q.includes('csp')) {
      if (constraints.length === 0) {
        return makeResult(
          "No active affinity or conflict constraints are currently registered. You can define rules in the **CSP Constraint Rules** card above.",
          ["Show cohort summary & tier breakdown"]
        );
      }

      // Check violations
      const studentToGroupMap = new Map();
      groups.forEach((g, gIdx) => {
        g.forEach(s => studentToGroupMap.set(String(s.id || s.student_id || s.studentId), gIdx));
      });

      let violations = [];
      constraints.forEach(c => {
        const gA = studentToGroupMap.get(String(c.student_a_id || ''));
        const gB = studentToGroupMap.get(String(c.student_b_id || ''));
        if (gA !== undefined && gB !== undefined) {
          if (c.constraint_type === 'AFFINITY' && gA !== gB) {
            violations.push(`❌ **Affinity Violated**: Students must pair together, but are in Team ${gA + 1} and Team ${gB + 1}.`);
          } else if (c.constraint_type === 'CONFLICT' && gA === gB) {
            violations.push(`❌ **Conflict Violated**: Conflicting students must separate, but are both in Team ${gA + 1}.`);
          }
        }
      });

      if (violations.length === 0) {
        return makeResult(
          `✅ **All Constraints Satisfied!** All ${constraints.length} active affinity and conflict constraints are fully respected across generated teams.`,
          ["Show cohort summary & tier breakdown"]
        );
      }

      return makeResult(
        `⚠️ **Constraint Violations Found** (${violations.length}):\n\n${violations.join('\n')}\n\n*Fix*: Re-run the Genetic Algorithm with a higher **Constraint Weight (γ)**.`,
        ["Which teams have low academic balance?"]
      );
    }

    // 8. AI Engine & Algorithm Pipeline Explanation
    if (q.includes('algorithm') || q.includes('how does it work') || q.includes('pipeline') || q.includes('ai engine') || q.includes('k-means') || q.includes('genetic')) {
      return makeResult(
        `🧬 **KDU 3-Stage Hybrid AI Pipeline**:\n\n` +
        `1. **Stage 1: Fuzzy Logic Skill Profiling**\n` +
        `   Standardizes prerequisite grades, direct marks (0-100), and A/L Z-scores into smooth competency values.\n\n` +
        `2. **Stage 2: K-Means Clustering Tiering (k=3)**\n` +
        `   Segments cohort into Developing, Proficient, and Advanced tiers, feeding into a serpentine snake draft.\n\n` +
        `3. **Stage 3: Genetic Algorithm Balancing Engine**\n` +
        `   Executes 2,500 iterations of stochastic crossover and mutation optimizing a multi-objective Pareto fitness function:\n` +
        `   $F = \\alpha \\cdot \\text{Delta} + \\beta \\cdot \\text{Diversity} + \\gamma \\cdot \\text{Constraints} + \\delta \\cdot \\text{Roles}$`,
        ["How does Kaufman ICF anti-freerider work?", "Show cohort summary & tier breakdown"]
      );
    }

    // 9. Kaufman ICF & Grading Explanation
    if (q.includes('icf') || q.includes('grading') || q.includes('free rider') || q.includes('freerider') || q.includes('kaufman') || q.includes('peer')) {
      return makeResult(
        `⚖️ **Kaufman / Goldfinch Individual Contribution Factor (ICF)**:\n\n` +
        `• **4-Dimensional Peer Ratings**: Technical (T), Sprints (S), Communication (C), Quality (Q) rated 1-5.\n` +
        `• **Self-Bias Exclusion**: Evaluator self-ratings are removed.\n` +
        `• **Factor Formula**: $ICF_i = R_i / R_{group}$, clamped to $[0.00, 1.25]$.\n` +
        `• **Final Marks**: $S_{final} = S_{group} \\times ICF_i$.\n` +
        `• **Anti-Collusion**: Automatically flags mutual 5.0/5.0 rings where third-party teammates rate significantly lower.`,
        ["Show cohort summary & tier breakdown", "Which teams have low academic balance?"]
      );
    }

    // 10. Belbin Roles Explanation
    if (q.includes('belbin') || q.includes('role')) {
      return makeResult(
        `🎭 **Belbin Functional Team Roles**:\n\n` +
        `• 👑 **Team Coordinator**: Keeps schedules, milestone roadmaps, and sprint meetings.\n` +
        `• 💻 **Technical Implementer**: Core coding, database models, and algorithm integration.\n` +
        `• 📊 **Research Analyst**: Data validation, empirical benchmarks, and requirement specs.\n` +
        `• 📝 **QA Lead**: Edge-case testing, IEEE project report formatting, and submission defense.`,
        ["Show cohort summary & tier breakdown", "Explain the 3-stage AI pipeline"]
      );
    }

    // 11. Reports / Export
    if (q.includes('export') || q.includes('pdf') || q.includes('excel') || q.includes('download')) {
      return makeResult(
        `📄 **Team Export Options**:\n\n` +
        `• **Export PDF**: Generates a university-ready allocation report with synergy radar breakdowns.\n` +
        `• **Export Excel**: Generates structured `.xlsx` workbooks with student indices and marks.\n\n` +
        `Both buttons are located at the top-right of the **Allocated Student Groups** section.`,
        ["Show cohort summary & tier breakdown"]
      );
    }

    // Default Lecturer Fallback
    return makeResult(
      `I am your **KDU Group Formation Copilot**.\n\nI can analyze cohort distributions, explain team synergy scores, track constraints, and guide allocation adjustments.\n\nTry asking:\n` +
      `• *"Show cohort summary & tier breakdown"*\n` +
      `• *"Which teams have low academic balance?"*\n` +
      `• *"Which team is performing best?"*\n` +
      `• *"Check active constraint violations"*\n` +
      `• *"Explain the 3-stage AI pipeline"*`,
      QUICK_PROMPTS_LECTURER
    );
  }

  // -------------------------------------------------------------
  // MODE: STUDENT TEAM HEALTH & DISPUTE ADVISOR
  // -------------------------------------------------------------
  if (q.includes('free-riding') || q.includes('not contributing') || q.includes('inactive') || q.includes('slacking')) {
    return makeResult(
      `🛡️ **AI Guidance: Dealing with Free-Riding & Inactive Peers**\n\n` +
      `1. **Clarify Commitments**: Assign discrete sub-tasks with unambiguous 48-hour sprint deadlines.\n` +
      `2. **Transparent Commit History**: Track repository branches and GitHub pull requests so contributions are verifiable.\n` +
      `3. **Escalation Protocol**: If non-responsiveness persists, click **+ Log Ticket** in the banner above to create a formal dispute log for lecturer intervention.`,
      ["Log a milestone dispute ticket", "How to distribute tasks fairly across roles?"]
    );
  }

  if (q.includes('conflict') || q.includes('disagree') || q.includes('argument') || q.includes('technology')) {
    return makeResult(
      `🤝 **AI Guidance: Resolving Technical & Direction Conflicts**\n\n` +
      `• **Objective Evaluation Matrix**: Compare alternatives against ease of debugging, library compatibility, and KDU assignment rubrics.\n` +
      `• **Time-Boxed Spikes**: Spend 1 hour testing both approaches before taking a team vote.\n` +
      `• **Coordinator Tie-Breaker**: Grant final arbitration to the assigned **Team Coordinator**.`,
      ["How to distribute tasks fairly across roles?", "How should we plan our project milestones?"]
    );
  }

  if (q.includes('role') || q.includes('distribute') || q.includes('task') || q.includes('assign')) {
    return makeResult(
      `🎭 **Recommended Belbin Role Division for Capstone Projects**:\n\n` +
      `• 👑 **Team Coordinator**: Manages timeline, meeting minutes, and submission checklists.\n` +
      `• 💻 **Technical Implementer**: Owns database architecture, core coding, and API endpoints.\n` +
      `• 📊 **Research & Data Analyst**: Validates algorithms, prepares datasets, and benchmarks metrics.\n` +
      `• 📝 **QA & Documentation Lead**: Tests edge cases, formats IEEE report, and polishes presentation slides.`,
      ["How should we plan our project milestones?", "A team member is not contributing (free-riding)"]
    );
  }

  if (q.includes('milestone') || q.includes('plan') || q.includes('sprint') || q.includes('schedule')) {
    return makeResult(
      `📅 **Optimal 4-Stage Project Milestone Framework**:\n\n` +
      `• **Week 1-2 (Foundation)**: Requirements specification, data cleaning, and database schema setup.\n` +
      `• **Week 3-5 (Core AI Engine)**: Algorithm development (K-Means, Genetic Algorithm, Fuzzy logic).\n` +
      `• **Week 6-7 (Integration & UI)**: Full-stack connection, drag-and-drop testing, and report generation.\n` +
      `• **Week 8 (Benchmarking & Final Presentation)**: Empirical performance evaluation and report compilation.`,
      ["How to distribute tasks fairly across roles?", "A team member is not contributing (free-riding)"]
    );
  }

  if (q.includes('ticket') || q.includes('log') || q.includes('dispute ticket')) {
    return makeResult(
      `📝 **How to Log a Milestone Dispute Ticket**:\n\n` +
      `1. Click the purple **+ Log Ticket** button at the top of this drawer.\n` +
      `2. Select the target team, milestone name, contribution score (1-5), and factual notes.\n` +
      `3. Click **Save to Supabase** to log the ticket for lecturer review.`,
      ["A team member is not contributing (free-riding)", "How to distribute tasks fairly across roles?"]
    );
  }

  // Default Advisor Fallback
  return makeResult(
    `Welcome to the **Team Health & Dispute Resolution Advisor**.\n\nI provide objective conflict mediation, task delegation advice, and team dispute logging for undergraduate groups.\n\nSelect a common scenario below or describe your team's situation:`,
    QUICK_PROMPTS_ADVISOR
  );
};
