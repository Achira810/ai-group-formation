/**
 * Kaufman / Goldfinch Individual Contribution Factor (ICF) Assessment Engine
 * 
 * Implements the Kaufman / Goldfinch peer evaluation formulation for academic team projects:
 * 1. Collects peer ratings across 4 key dimensions:
 *    - Technical Implementation (T)
 *    - Timeliness & Sprints (S)
 *    - Team Communication (C)
 *    - Code & Work Quality (Q)
 * 2. Excludes self-ratings by default to neutralize self-inflation bias.
 * 3. Computes each student's peer rating mean R_i:
 *    R_i = (1 / |P_i|) * sum_{j in P_i} [ (T_ji + S_ji + C_ji + Q_ji) / 4 ]
 * 4. Normalizes to Individual Contribution Factor (ICF):
 *    ICF_i = R_i / [ (1 / N) * sum_{k=1}^N R_k ]
 * 5. Applies clamping: ICF_clamped = max(minClamp, min(maxClamp, ICF_i)) (default [0.00, 1.25]).
 * 6. Computes Final Student Mark:
 *    S_{final, i} = min(100.0, S_group * ICF_clamped, i)
 * 7. Flags anomalies:
 *    - "Dominant Anchor" if ICF >= 1.20
 *    - "Severe Free-Rider" if ICF < 0.70
 *    - "Pairwise Mutual 5.0 Collusion Ring" if two peers rate each other 5.0/5.0 while
 *      ratings from other teammates have high standard deviation (> 1.50).
 */

export const EVALUATION_DIMENSIONS = [
  { key: 'technical_score', label: 'Technical Implementation', short: 'T', weight: 0.25 },
  { key: 'timeliness_score', label: 'Timeliness & Sprints', short: 'S', weight: 0.25 },
  { key: 'communication_score', label: 'Team Communication', short: 'C', weight: 0.25 },
  { key: 'quality_score', label: 'Code & Work Quality', short: 'Q', weight: 0.25 }
];

/**
 * Helper to safely extract an identifier string for a student object.
 */
export const getStudentIdKey = (student) => {
  if (!student) return '';
  return String(student.id || student.student_id || student.studentId || '');
};

/**
 * Computes standard deviation of a number array.
 */
export const computeStandardDeviation = (values = []) => {
  if (!values || values.length < 2) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (values.length - 1);
  return Math.sqrt(variance);
};

/**
 * Computes average incoming rating for a student across all peer evaluations.
 * Excludes self-ratings by default.
 * 
 * @param {string} studentKey - ID or student_id of evaluatee
 * @param {Array} evaluations - List of peer review records
 * @param {Object} options - { excludeSelf: true }
 * @returns {Object} { peerMean, evaluationsCount, dimensionAverages }
 */
export const calculateStudentPeerMean = (studentKey, evaluations = [], options = {}) => {
  const { excludeSelf = true } = options;

  // Filter incoming reviews for this student
  const incoming = evaluations.filter((ev) => {
    const evaluatee = String(ev.evaluatee_id || ev.evaluateeId || '');
    const evaluator = String(ev.evaluator_id || ev.evaluatorId || '');

    if (evaluatee !== String(studentKey)) return false;
    if (excludeSelf && evaluator === evaluatee) return false;
    return true;
  });

  if (incoming.length === 0) {
    return {
      peerMean: 0,
      evaluationsCount: 0,
      hasReviews: false,
      dimensionAverages: {
        technical: 0,
        timeliness: 0,
        communication: 0,
        quality: 0
      }
    };
  }

  let sumComposite = 0;
  let sumT = 0;
  let sumS = 0;
  let sumC = 0;
  let sumQ = 0;

  incoming.forEach((ev) => {
    const t = Number(ev.technical_score) || 3;
    const s = Number(ev.timeliness_score) || 3;
    const c = Number(ev.communication_score) || 3;
    const q = Number(ev.quality_score) || 3;

    sumT += t;
    sumS += s;
    sumC += c;
    sumQ += q;

    const rowComposite = (t + s + c + q) / 4;
    sumComposite += rowComposite;
  });

  const count = incoming.length;
  const peerMean = parseFloat((sumComposite / count).toFixed(3));

  return {
    peerMean,
    evaluationsCount: count,
    hasReviews: true,
    dimensionAverages: {
      technical: parseFloat((sumT / count).toFixed(2)),
      timeliness: parseFloat((sumS / count).toFixed(2)),
      communication: parseFloat((sumC / count).toFixed(2)),
      quality: parseFloat((sumQ / count).toFixed(2))
    }
  };
};

/**
 * Detects pairwise collusion rings (e.g. A and B giving each other 5.0 / 5.0,
 * while ratings received from other teammates exhibit standard deviation > 1.50).
 * 
 * @param {Array} students - List of students in the team
 * @param {Array} evaluations - List of peer evaluations
 * @returns {Array} List of collusion alert objects
 */
export const detectCollusionAndAnomalies = (students = [], evaluations = []) => {
  const flags = [];
  const n = students.length;
  if (n < 3) return flags; // Need at least 3 members to detect third-party divergence

  // Map students by ID
  const studentMap = new Map();
  students.forEach((s) => {
    studentMap.set(getStudentIdKey(s), s);
  });

  // Build pairwise lookup matrix: ratingsMatrix[evaluatorId][evaluateeId] = avgRating
  const matrix = {};
  evaluations.forEach((ev) => {
    const evaluator = String(ev.evaluator_id || ev.evaluatorId || '');
    const evaluatee = String(ev.evaluatee_id || ev.evaluateeId || '');
    if (!evaluator || !evaluatee || evaluator === evaluatee) return;

    if (!matrix[evaluator]) matrix[evaluator] = {};
    const t = Number(ev.technical_score) || 0;
    const s = Number(ev.timeliness_score) || 0;
    const c = Number(ev.communication_score) || 0;
    const q = Number(ev.quality_score) || 0;
    matrix[evaluator][evaluatee] = (t + s + c + q) / 4;
  });

  // Check all distinct pairs (i, j)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const idA = getStudentIdKey(students[i]);
      const idB = getStudentIdKey(students[j]);

      const ratingAtoB = matrix[idA]?.[idB];
      const ratingBtoA = matrix[idB]?.[idA];

      // Check if both gave each other perfect or near-perfect ratings (>= 4.90)
      if (ratingAtoB !== undefined && ratingBtoA !== undefined) {
        const isMutualFive = ratingAtoB >= 4.90 && ratingBtoA >= 4.90;

        if (isMutualFive) {
          // Gather ratings A received from third-party teammates (C != A, B)
          const thirdPartyRatingsToA = [];
          const thirdPartyRatingsToB = [];

          students.forEach((other) => {
            const idC = getStudentIdKey(other);
            if (idC !== idA && idC !== idB) {
              if (matrix[idC]?.[idA] !== undefined) {
                thirdPartyRatingsToA.push(matrix[idC][idA]);
              }
              if (matrix[idC]?.[idB] !== undefined) {
                thirdPartyRatingsToB.push(matrix[idC][idB]);
              }
            }
          });

          // Check divergence: standard deviation of other ratings or large gap from 5.0
          const allOtherRatings = [...thirdPartyRatingsToA, ...thirdPartyRatingsToB];
          if (allOtherRatings.length > 0) {
            const sdOther = computeStandardDeviation(allOtherRatings);
            const meanOther = allOtherRatings.reduce((a, b) => a + b, 0) / allOtherRatings.length;
            const divergence = 5.0 - meanOther;

            // Flag if other peers' standard deviation > 1.50 OR mean rating is much lower (divergence >= 1.50)
            if (sdOther >= 1.50 || divergence >= 1.50) {
              const nameA = students[i].full_name || students[i].student_id || `Student A`;
              const nameB = students[j].full_name || students[j].student_id || `Student B`;

              flags.push({
                type: 'MUTUAL_COLLUSION_RING',
                severity: 'HIGH',
                studentAId: idA,
                studentBId: idB,
                studentAName: nameA,
                studentBName: nameB,
                mutualRating: 5.0,
                otherPeerMean: parseFloat(meanOther.toFixed(2)),
                divergenceStdDev: parseFloat(sdOther.toFixed(2)),
                message: `⚠️ Mutual 5.0 Collusion Alert: ${nameA} and ${nameB} rated each other 5.0/5.0, but other teammates rated them significantly lower (Average from others: ${meanOther.toFixed(1)}/5.0, σ = ${sdOther.toFixed(2)}).`
              });
            }
          }
        }
      }
    }
  }

  return flags;
};

/**
 * Calculates Kaufman/Goldfinch Individual Contribution Factors (ICF) and adjusted marks
 * for a team of students based on peer evaluation records and a raw group score.
 * 
 * @param {Array} students - Array of student records in this group
 * @param {Array} evaluations - Array of peer evaluation records
 * @param {number} rawGroupScore - Rubric score awarded to group (0 - 100)
 * @param {Object} options - Config: { minClamp: 0.00, maxClamp: 1.25, excludeSelf: true }
 * @returns {Object} Comprehensive evaluation diagnostics & adjusted student marks
 */
export const calculateGroupICF = (
  students = [],
  evaluations = [],
  rawGroupScore = 80,
  options = {}
) => {
  const {
    minClamp = 0.00,
    maxClamp = 1.25,
    excludeSelf = true
  } = options;

  const validGroupScore = Math.max(0, Math.min(100, Number(rawGroupScore) || 0));
  const n = students.length;

  if (n === 0) {
    return {
      groupMeanRating: 0,
      rawGroupScore: validGroupScore,
      students: [],
      collusionFlags: [],
      freeRidersCount: 0,
      anchorsCount: 0,
      summaryRationale: 'No students in group.'
    };
  }

  // 1. Compute Peer Mean R_i for each student
  const studentMetrics = students.map((s) => {
    const key = getStudentIdKey(s);
    const peerRes = calculateStudentPeerMean(key, evaluations, { excludeSelf });
    return {
      student: s,
      key,
      peerMean: peerRes.peerMean,
      evaluationsCount: peerRes.evaluationsCount,
      hasReviews: peerRes.hasReviews,
      dimensionAverages: peerRes.dimensionAverages
    };
  });

  // 2. Compute denominator: Group Average Peer Rating
  // If some students have no reviews, handle gracefully by using 3.0 / 5.0 or available average
  const validRatings = studentMetrics.filter((m) => m.hasReviews).map((m) => m.peerMean);
  const groupMeanRating = validRatings.length > 0
    ? validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length
    : 0;

  // 3. Compute Normalized ICF & Clamped ICF
  let freeRidersCount = 0;
  let anchorsCount = 0;

  const calculatedStudents = studentMetrics.map((m) => {
    let icfRaw = 1.0;
    if (m.hasReviews && groupMeanRating > 0) {
      icfRaw = m.peerMean / groupMeanRating;
    }

    // Apply clamping threshold [minClamp, maxClamp]
    const icfClamped = Math.max(minClamp, Math.min(maxClamp, icfRaw));

    // Final mark calculation
    const finalScoreRaw = validGroupScore * icfClamped;
    const finalScore = parseFloat(Math.min(100.0, Math.max(0.0, finalScoreRaw)).toFixed(1));
    const scoreDelta = parseFloat((finalScore - validGroupScore).toFixed(1));

    // Classification Flags
    let status = 'BALANCED';
    let statusBadge = '✅ Balanced Contributor';
    let statusColor = '#10b981';

    if (icfClamped >= 1.20) {
      status = 'DOMINANT_ANCHOR';
      statusBadge = '🌟 Dominant Anchor';
      statusColor = '#818cf8';
      anchorsCount++;
    } else if (icfClamped < 0.70) {
      status = 'SEVERE_FREERIDER';
      statusBadge = '⚠️ Severe Free-Rider';
      statusColor = '#ef4444';
      freeRidersCount++;
    } else if (icfClamped < 0.85) {
      status = 'MODERATE_SLACKER';
      statusBadge = '📉 Below Average';
      statusColor = '#f59e0b';
    }

    return {
      id: m.student.id || m.key,
      student_id: m.student.student_id || m.key,
      full_name: m.student.full_name || 'Student',
      degree_program: m.student.degree_program || 'Computing',
      belbin_role: m.student.belbin_role || 'Member',
      peerMean: m.peerMean,
      evaluationsCount: m.evaluationsCount,
      hasReviews: m.hasReviews,
      dimensionAverages: m.dimensionAverages,
      icfRaw: parseFloat(icfRaw.toFixed(3)),
      icfClamped: parseFloat(icfClamped.toFixed(3)),
      rawGroupScore: validGroupScore,
      finalScore,
      scoreDelta,
      status,
      statusBadge,
      statusColor
    };
  });

  // 4. Anti-Collusion & Outlier Detection
  const collusionFlags = detectCollusionAndAnomalies(students, evaluations);

  // 5. Generate Natural-Language Summary Rationale
  let summaryRationale = `Evaluated ${n} team members against a raw group rubric score of ${validGroupScore}%. `;
  if (freeRidersCount > 0) {
    summaryRationale += `⚠️ Detected ${freeRidersCount} free-rider(s) (ICF < 0.70) with adjusted individual marks penalized according to peer consensus. `;
  }
  if (anchorsCount > 0) {
    summaryRationale += `🌟 Identified ${anchorsCount} dominant technical anchor(s) (ICF >= 1.20) receiving individual merit boosters up to ${maxClamp}x. `;
  }
  if (collusionFlags.length > 0) {
    summaryRationale += `🚨 Caution: ${collusionFlags.length} mutual 5.0 rating anomaly detected and flagged for lecturer review.`;
  }
  if (freeRidersCount === 0 && anchorsCount === 0 && collusionFlags.length === 0) {
    summaryRationale += `✅ Highly balanced participation across all members with consistent peer ratings.`;
  }

  return {
    groupMeanRating: parseFloat(groupMeanRating.toFixed(2)),
    rawGroupScore: validGroupScore,
    minClamp,
    maxClamp,
    students: calculatedStudents,
    collusionFlags,
    freeRidersCount,
    anchorsCount,
    summaryRationale
  };
};

/**
 * Generates realistic mock peer evaluations for a group of students based on a scenario.
 * Useful for interactive demonstrations and instant testing.
 * 
 * @param {Array} groupStudents - List of student objects
 * @param {string} scenario - 'balanced' | 'free_rider' | 'collusion'
 * @returns {Array} List of peer evaluation objects
 */
export const generateMockEvaluations = (groupStudents = [], scenario = 'free_rider') => {
  if (!groupStudents || groupStudents.length < 2) return [];

  const evals = [];
  const n = groupStudents.length;

  // Identify student roles for scenarios
  const anchorIndex = 0; // First student acts as anchor
  const freeRiderIndex = n > 2 ? n - 1 : 1; // Last student acts as free-rider
  const partnerIndex = 1; // Used in collusion scenario (0 and 1)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue; // Exclude self rating

      const evaluator = groupStudents[i];
      const evaluatee = groupStudents[j];
      const evaluatorId = getStudentIdKey(evaluator);
      const evaluateeId = getStudentIdKey(evaluatee);

      let t = 4;
      let s = 4;
      let c = 4;
      let q = 4;
      let notes = 'Consistent peer collaboration throughout sprints.';

      if (scenario === 'free_rider') {
        if (j === freeRiderIndex) {
          // Teammates rate free-rider poorly
          t = 1 + (i % 2); // 1 or 2
          s = 1;           // 1
          c = 2;           // 2
          q = 1 + (i % 2); // 1 or 2
          notes = 'Missed weekly milestone check-ins; minimal repository commits.';
        } else if (j === anchorIndex) {
          // Anchor gets top scores
          t = 5;
          s = 5;
          c = 4 + (i % 2);
          q = 5;
          notes = 'Spearheaded core backend & algorithm implementation; vital anchor.';
        } else {
          // Regular members
          t = 4;
          s = 4;
          c = 4;
          q = 4;
          notes = 'Solid contribution to project reports and testing.';
        }
      } else if (scenario === 'collusion') {
        // Students 0 and 1 collude: rate each other 5.0/5.0
        if ((i === 0 && j === 1) || (i === 1 && j === 0)) {
          t = 5;
          s = 5;
          c = 5;
          q = 5;
          notes = 'Flawless peer contribution across all areas!';
        } else if (j === 0 || j === 1) {
          // But third-party members rate 0 and 1 with low/moderate scores
          t = 2;
          s = 2;
          c = 3;
          q = 2;
          notes = 'Frequently worked privately without updating the rest of the team.';
        } else {
          t = 4;
          s = 4;
          c = 4;
          q = 4;
          notes = 'Good communication during team meetings.';
        }
      } else {
        // Balanced scenario: organic ratings around 4-5
        const variance = (i * 3 + j * 7) % 3; // 0, 1, or 2
        t = Math.min(5, 4 + (variance === 1 ? 1 : 0));
        s = Math.max(3, 4 - (variance === 2 ? 1 : 0));
        c = 4;
        q = Math.min(5, 4 + (variance === 0 ? 1 : 0));
        notes = 'Equitable contribution and active participation.';
      }

      evals.push({
        group_id: evaluator.group_id || 'demo-group-id',
        evaluator_id: evaluatorId,
        evaluatee_id: evaluateeId,
        evaluator_name: evaluator.full_name || evaluator.student_id,
        evaluatee_name: evaluatee.full_name || evaluatee.student_id,
        technical_score: t,
        timeliness_score: s,
        communication_score: c,
        quality_score: q,
        feedback_notes: notes
      });
    }
  }

  return evals;
};
