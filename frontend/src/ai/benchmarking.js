/**
 * KDU AI Group Formation - Comparative Algorithmic Benchmarking Suite
 * Evaluates 4 group formation algorithms side-by-side:
 * 1. Random Allocation (Baseline)
 * 2. Greedy Snake Draft (Heuristic)
 * 3. Pure Genetic Algorithm (Stochastic Search)
 * 4. Hybrid K-Means + Genetic Algorithm (Your System)
 */

import { stratifyByKMeans } from './kmeans';

// Helper: Calculate group mean scores
export const calculateTeamMeans = (groups) => {
  return groups.map(group => {
    if (group.length === 0) return 0;
    const sum = group.reduce((acc, s) => acc + (s.technical_score || 0), 0);
    return sum / group.length;
  });
};

// Helper: Calculate variance of team means
export const calculateVariance = (means) => {
  if (means.length <= 1) return 0;
  const avg = means.reduce((a, b) => a + b, 0) / means.length;
  const variance = means.reduce((sum, m) => sum + Math.pow(m - avg, 2), 0) / means.length;
  return Number(variance.toFixed(2));
};

// Helper: Calculate interdisciplinary diversity compliance (% of teams with >= 2 degree programs)
export const calculateDiversityRate = (groups) => {
  if (groups.length === 0) return 0;
  let diverseCount = 0;
  groups.forEach(g => {
    if (g.length <= 1) {
      diverseCount++;
      return;
    }
    const uniquePrograms = new Set(g.map(s => s.degree_program)).size;
    if (uniquePrograms >= 2) diverseCount++;
  });
  return Number(((diverseCount / groups.length) * 100).toFixed(1));
};

// Helper: Multi-objective fitness function for GA
export const evaluateFitness = (groups, weights = { alpha: 1.0, beta: 1.0, gamma: 1.0, delta: 0.8 }, constraints = []) => {
  let maxAvg = -Infinity;
  let minAvg = Infinity;
  let disciplinePenalty = 0;
  let constraintPenalty = 0;
  let rolePenalty = 0;

  // Student to group map for fast constraint lookups
  const studentToGroupMap = new Map();
  groups.forEach((g, gIdx) => {
    g.forEach(s => studentToGroupMap.set(s.id || s.student_id, gIdx));
  });

  groups.forEach(group => {
    if (group.length === 0) return;
    const sum = group.reduce((tot, s) => tot + (s.technical_score || 0), 0);
    const avg = sum / group.length;

    if (avg > maxAvg) maxAvg = avg;
    if (avg < minAvg) minAvg = avg;

    // Disciplinary diversity penalty
    const uniquePrograms = new Set(group.map(s => s.degree_program));
    if (uniquePrograms.size < 2 && group.length > 1) {
      disciplinePenalty += 10;
    }

    // Belbin role coverage penalty
    const roles = new Set(group.map(s => s.belbin_role || 'Technical Implementer'));
    if (roles.size < Math.min(3, group.length)) {
      rolePenalty += 5;
    }
  });

  // Constraints penalty (Affinity / Conflict)
  constraints.forEach(c => {
    const gA = studentToGroupMap.get(c.student_a_id);
    const gB = studentToGroupMap.get(c.student_b_id);
    if (gA !== undefined && gB !== undefined) {
      if (c.constraint_type === 'AFFINITY' && gA !== gB) {
        constraintPenalty += 25; // Heavily penalize separating affinity pair
      } else if (c.constraint_type === 'CONFLICT' && gA === gB) {
        constraintPenalty += 30; // Heavily penalize grouping conflicting students together
      }
    }
  });

  const academicRange = (maxAvg === -Infinity || minAvg === Infinity) ? 0 : (maxAvg - minAvg);

  return (academicRange * (weights.alpha || 1.0)) +
         (disciplinePenalty * (weights.beta || 1.0)) +
         (constraintPenalty * (weights.gamma || 1.0)) +
         (rolePenalty * (weights.delta || 0.8));
};

// 1. Random Allocation
export const runRandomAllocation = (students, numTeams) => {
  const t0 = performance.now();
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  const groups = Array.from({ length: numTeams }, () => []);

  shuffled.forEach((s, idx) => {
    groups[idx % numTeams].push(s);
  });

  const t1 = performance.now();
  const means = calculateTeamMeans(groups);

  return {
    algorithm: 'Random Allocation (Baseline)',
    groups,
    executionTimeMs: Number((t1 - t0).toFixed(2)),
    variance: calculateVariance(means),
    diversityRate: calculateDiversityRate(groups),
    fitnessScore: Number(evaluateFitness(groups).toFixed(2)),
    convergenceHistory: [evaluateFitness(groups)]
  };
};

// 2. Greedy Snake Draft
export const runGreedySnakeDraft = (students, numTeams) => {
  const t0 = performance.now();
  // Sort descending by technical score
  const sorted = [...students].sort((a, b) => (b.technical_score || 0) - (a.technical_score || 0));
  const groups = Array.from({ length: numTeams }, () => []);

  let teamIdx = 0;
  let direction = 1; // 1 = forward, -1 = reverse

  sorted.forEach(s => {
    groups[teamIdx].push(s);
    if (direction === 1) {
      if (teamIdx === numTeams - 1) {
        direction = -1; // Reverse snake
      } else {
        teamIdx++;
      }
    } else {
      if (teamIdx === 0) {
        direction = 1; // Forward snake
      } else {
        teamIdx--;
      }
    }
  });

  const t1 = performance.now();
  const means = calculateTeamMeans(groups);

  return {
    algorithm: 'Greedy Snake Draft (Heuristic)',
    groups,
    executionTimeMs: Number((t1 - t0).toFixed(2)),
    variance: calculateVariance(means),
    diversityRate: calculateDiversityRate(groups),
    fitnessScore: Number(evaluateFitness(groups).toFixed(2)),
    convergenceHistory: [evaluateFitness(groups)]
  };
};

// 3. Pure Genetic Algorithm (Without K-Means Seeding)
export const runPureGA = (students, numTeams, iterations = 1500, weights, constraints) => {
  const t0 = performance.now();
  // Uniform random initial seeding
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  let bestGroups = Array.from({ length: numTeams }, () => []);
  shuffled.forEach((s, idx) => bestGroups[idx % numTeams].push(s));

  let bestFitness = evaluateFitness(bestGroups, weights, constraints);
  const convergenceHistory = [Number(bestFitness.toFixed(1))];

  for (let iter = 0; iter < iterations; iter++) {
    const testGroups = bestGroups.map(g => [...g]);
    const g1 = Math.floor(Math.random() * numTeams);
    const g2 = Math.floor(Math.random() * numTeams);
    if (g1 === g2) continue;
    if (testGroups[g1].length === 0 || testGroups[g2].length === 0) continue;

    const s1 = Math.floor(Math.random() * testGroups[g1].length);
    const s2 = Math.floor(Math.random() * testGroups[g2].length);

    // Swap mutation
    const temp = testGroups[g1][s1];
    testGroups[g1][s1] = testGroups[g2][s2];
    testGroups[g2][s2] = temp;

    const newFitness = evaluateFitness(testGroups, weights, constraints);
    if (newFitness < bestFitness) {
      bestGroups = testGroups;
      bestFitness = newFitness;
    }

    if (iter % Math.floor(iterations / 10) === 0) {
      convergenceHistory.push(Number(bestFitness.toFixed(1)));
    }
  }

  const t1 = performance.now();
  const means = calculateTeamMeans(bestGroups);

  return {
    algorithm: 'Pure Genetic Algorithm (Stochastic)',
    groups: bestGroups,
    executionTimeMs: Number((t1 - t0).toFixed(2)),
    variance: calculateVariance(means),
    diversityRate: calculateDiversityRate(bestGroups),
    fitnessScore: Number(bestFitness.toFixed(2)),
    convergenceHistory
  };
};

// 4. Hybrid K-Means + Genetic Algorithm (Your Core System)
export const runHybridKMeansGA = (students, numTeams, iterations = 2500, weights, constraints) => {
  const t0 = performance.now();
  // K-Means Stratified Seeding
  let bestGroups = stratifyByKMeans(students, numTeams, 3);
  let bestFitness = evaluateFitness(bestGroups, weights, constraints);
  const convergenceHistory = [Number(bestFitness.toFixed(1))];

  for (let iter = 0; iter < iterations; iter++) {
    const testGroups = bestGroups.map(g => [...g]);
    const g1 = Math.floor(Math.random() * numTeams);
    const g2 = Math.floor(Math.random() * numTeams);
    if (g1 === g2) continue;
    if (testGroups[g1].length === 0 || testGroups[g2].length === 0) continue;

    const s1 = Math.floor(Math.random() * testGroups[g1].length);
    const s2 = Math.floor(Math.random() * testGroups[g2].length);

    // Swap mutation
    const temp = testGroups[g1][s1];
    testGroups[g1][s1] = testGroups[g2][s2];
    testGroups[g2][s2] = temp;

    const newFitness = evaluateFitness(testGroups, weights, constraints);
    if (newFitness < bestFitness) {
      bestGroups = testGroups;
      bestFitness = newFitness;
    }

    if (iter % Math.floor(iterations / 10) === 0) {
      convergenceHistory.push(Number(bestFitness.toFixed(1)));
    }
  }

  const t1 = performance.now();
  const means = calculateTeamMeans(bestGroups);

  return {
    algorithm: 'Hybrid K-Means + GA (Our System)',
    groups: bestGroups,
    executionTimeMs: Number((t1 - t0).toFixed(2)),
    variance: calculateVariance(means),
    diversityRate: calculateDiversityRate(bestGroups),
    fitnessScore: Number(bestFitness.toFixed(2)),
    convergenceHistory
  };
};

/**
 * Runs all 4 algorithms on the active student cohort
 */
export const runFullBenchmarkSuite = (students, numTeams, weights, constraints) => {
  const randomRes = runRandomAllocation(students, numTeams);
  const greedyRes = runGreedySnakeDraft(students, numTeams);
  const pureGaRes = runPureGA(students, numTeams, 1500, weights, constraints);
  const hybridRes = runHybridKMeansGA(students, numTeams, 2500, weights, constraints);

  return [randomRes, greedyRes, pureGaRes, hybridRes];
};
