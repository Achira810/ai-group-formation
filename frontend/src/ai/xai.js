/**
 * KDU AI Group Formation - Explainable AI (XAI) & Team Synergy Engine
 * Evaluates multi-dimensional group fitness, explains formation rationale, 
 * and extracts 5-axis radar chart coordinates.
 */

export const BELBIN_ROLES = [
  { id: 'coordinator', name: 'Team Coordinator / Lead', icon: '👑', color: '#f59e0b', desc: 'Clarifies goals, delegates tasks, promotes decision making' },
  { id: 'implementer', name: 'Technical Implementer', icon: '💻', color: '#3b82f6', desc: 'Turns ideas into practical actions, core coding & architecture' },
  { id: 'analyst', name: 'Research & Data Analyst', icon: '📊', color: '#10b981', desc: 'Analyzes problem domains, validates logic, ensures accuracy' },
  { id: 'finisher', name: 'QA & Documentation Lead', icon: '📝', color: '#ec4899', desc: 'Maintains standards, polishes reports, ensures deadline adherence' }
];

/**
 * Calculates a comprehensive team synergy score (0 - 100%) and breakdown
 * @param {Array} team - Array of student objects in the team
 * @param {number} cohortMean - Overall cohort mean technical score
 * @returns {Object} Synergy metrics and qualitative rationale
 */
export const calculateTeamSynergy = (team, cohortMean = 75.0) => {
  if (!team || team.length === 0) {
    return {
      overallScore: 0,
      academicBalance: 0,
      diversityScore: 0,
      tierStratification: 0,
      roleBalance: 0,
      softSkillScore: 0,
      radarData: [50, 50, 50, 50, 50],
      rationale: 'Empty team.',
      badges: []
    };
  }

  const n = team.length;
  const techScores = team.map(s => s.technical_score || 70);
  const teamMean = techScores.reduce((a, b) => a + b, 0) / n;
  
  // 1. Academic Consistency (Internal variance & closeness to cohort mean)
  const variance = techScores.reduce((sum, score) => sum + Math.pow(score - teamMean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  const meanDelta = Math.abs(teamMean - cohortMean);
  // Lower stdDev & lower meanDelta = higher score
  const academicBalance = Math.max(20, Math.min(100, Math.round(100 - (stdDev * 1.5) - (meanDelta * 1.2))));

  // 2. Disciplinary Diversity
  const uniquePrograms = new Set(team.map(s => s.degree_program)).size;
  const diversityRatio = uniquePrograms / n;
  const diversityScore = Math.min(100, Math.round((diversityRatio * 70) + (uniquePrograms >= 2 ? 30 : 0)));

  // 3. K-Means Tier Stratification
  // Ideal team: At least 1 Advanced (>=83) and healthy balance of Proficient/Developing
  const advancedCount = team.filter(s => (s.technical_score || 0) >= 83).length;
  const developingCount = team.filter(s => (s.technical_score || 0) < 66).length;
  const proficientCount = n - advancedCount - developingCount;

  let tierStratification = 60;
  if (advancedCount >= 1) tierStratification += 20;
  if (proficientCount >= 1) tierStratification += 10;
  if (developingCount > 0 && advancedCount >= 1) tierStratification += 10; // Mentorship dynamic
  if (advancedCount === 0 && developingCount >= 2) tierStratification -= 20;
  tierStratification = Math.max(30, Math.min(100, tierStratification));

  // 4. Belbin Role Balance
  const rolesPresent = new Set(team.map(s => s.belbin_role || 'Technical Implementer')).size;
  const roleBalance = Math.min(100, Math.round((rolesPresent / Math.min(4, n)) * 100));

  // 5. Soft Skill Proficiency
  const softScores = team.map(s => s.soft_skill_score || 75);
  const avgSoftScore = Math.round(softScores.reduce((a, b) => a + b, 0) / n);

  // Overall Weighted Synergy
  const overallScore = Math.round(
    (academicBalance * 0.30) +
    (diversityScore * 0.25) +
    (tierStratification * 0.25) +
    (roleBalance * 0.10) +
    (avgSoftScore * 0.10)
  );

  // Badges
  const badges = [];
  if (uniquePrograms >= 2) badges.push({ text: `${uniquePrograms} Disciplines`, color: 'emerald' });
  if (advancedCount >= 1) badges.push({ text: `${advancedCount} Lead(s)`, color: 'indigo' });
  if (overallScore >= 85) badges.push({ text: 'High Synergy', color: 'amber' });
  if (rolesPresent >= 3) badges.push({ text: 'Balanced Roles', color: 'purple' });

  // Generate Explainable AI Rationale
  let rationaleParts = [];
  if (overallScore >= 85) {
    rationaleParts.push(`⭐ **High Academic & Disciplinary Synergy (${overallScore}%)**.`);
  } else if (overallScore >= 70) {
    rationaleParts.push(`✅ **Balanced Team Composition (${overallScore}%)**.`);
  } else {
    rationaleParts.push(`⚠️ **Moderate Synergy (${overallScore}%)**.`);
  }

  rationaleParts.push(`Average score is **${teamMean.toFixed(1)}** (Δ ${Math.abs(teamMean - cohortMean).toFixed(1)} from cohort mean).`);

  if (uniquePrograms >= 2) {
    rationaleParts.push(`Cross-faculty collaboration active with **${uniquePrograms} distinct degree programs** represented.`);
  } else {
    rationaleParts.push(`Monodisciplinary team: all members share the same degree programme.`);
  }

  if (advancedCount >= 1 && developingCount >= 1) {
    rationaleParts.push(`Excellent tier stratification: includes **${advancedCount} Advanced** student(s) to mentor **${developingCount} Developing** peer(s).`);
  } else if (advancedCount >= 1) {
    rationaleParts.push(`Anchored by **${advancedCount} Advanced** tier member(s).`);
  } else {
    rationaleParts.push(`Watch out: lacks an Advanced tier anchor; consider pairing with a senior specialist.`);
  }

  return {
    overallScore,
    academicBalance,
    diversityScore,
    tierStratification,
    roleBalance,
    softSkillScore: avgSoftScore,
    radarData: [academicBalance, diversityScore, tierStratification, roleBalance, avgSoftScore],
    rationale: rationaleParts.join(' '),
    badges,
    teamMean: Number(teamMean.toFixed(1)),
    uniquePrograms,
    advancedCount,
    rolesPresent
  };
};
