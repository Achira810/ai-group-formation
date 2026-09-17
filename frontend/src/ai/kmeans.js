/**
 * KDU AI Group Formation System - K-Means Clustering Module
 * 
 * Unsupervised Machine Learning (Concept 2):
 * Stratifies the student cohort into distinct performance tiers (e.g., k=3: Developing, Proficient, Advanced)
 * based on their standardized Fuzzy Logic technical scores.
 * The resulting clusters are used to seed the initial population for the Genetic Algorithm (Concept 3),
 * ensuring balanced tier distribution across all teams.
 */

export function getStudentScore(student) {
  if (!student) return 50;
  const score = student.technical_score ?? student.technicalScore ?? student.fuzzyScore ?? student.score;
  const parsed = parseFloat(score);
  return isNaN(parsed) ? 50 : parsed;
}

/**
 * Runs K-Means clustering on the student dataset.
 * 
 * @param {Array} students - List of student objects with technical_score/fuzzyScore
 * @param {number} k - Number of clusters (default 3: Developing, Proficient, Advanced)
 * @param {number} maxIterations - Maximum iterations for convergence (default 50)
 * @returns {Object} { centroids, clusters, clusterStats }
 */
export function runKMeans(students, k = 3, maxIterations = 50) {
  if (!students || students.length === 0) {
    return { centroids: [], clusters: [], clusterStats: [] };
  }

  // Adjust k if cohort size is smaller than requested clusters
  const actualK = Math.min(k, students.length);
  if (actualK <= 1) {
    return {
      centroids: [students.reduce((acc, s) => acc + getStudentScore(s), 0) / students.length],
      clusters: [[...students]],
      clusterStats: [{ tier: 'Standard', count: students.length, mean: 50 }]
    };
  }

  // Extract and sort unique scores for robust quantile centroid initialization
  const scores = students.map(getStudentScore).sort((a, b) => a - b);
  const minScore = scores[0];
  const maxScore = scores[scores.length - 1];

  // Initialize centroids evenly spaced across the score range
  let centroids = [];
  if (maxScore === minScore) {
    centroids = Array.from({ length: actualK }, () => minScore);
  } else {
    for (let i = 0; i < actualK; i++) {
      const fraction = (i + 0.5) / actualK;
      centroids.push(minScore + fraction * (maxScore - minScore));
    }
  }

  let clusters = Array.from({ length: actualK }, () => []);

  for (let iter = 0; iter < maxIterations; iter++) {
    clusters = Array.from({ length: actualK }, () => []);

    // 1. Assignment Step: Assign each student to the nearest centroid
    for (const student of students) {
      const val = getStudentScore(student);
      let closestIdx = 0;
      let minDist = Math.abs(val - centroids[0]);

      for (let i = 1; i < actualK; i++) {
        const dist = Math.abs(val - centroids[i]);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      }
      clusters[closestIdx].push(student);
    }

    // 2. Update Step: Recompute centroids as cluster means
    let converged = true;
    for (let i = 0; i < actualK; i++) {
      if (clusters[i].length === 0) continue;
      const newMean = clusters[i].reduce((sum, s) => sum + getStudentScore(s), 0) / clusters[i].length;
      if (Math.abs(newMean - centroids[i]) > 0.001) {
        converged = false;
      }
      centroids[i] = newMean;
    }

    if (converged) break;
  }

  // Pair centroids with their clusters and sort ascending by centroid score
  const paired = centroids
    .map((c, idx) => ({ centroid: c, members: clusters[idx] }))
    .sort((a, b) => a.centroid - b.centroid);

  const tierLabels = actualK === 3 
    ? ['Developing (Tier 1)', 'Proficient (Tier 2)', 'Advanced (Tier 3)'] 
    : paired.map((_, i) => `Cluster ${i + 1}`);

  const sortedCentroids = paired.map(p => Math.round(p.centroid * 10) / 10);
  const sortedClusters = paired.map(p => p.members);

  // Tag students with cluster metadata immutably
  const taggedClusters = sortedClusters.map((clusterList, clusterIdx) =>
    clusterList.map(student => ({
      ...student,
      clusterId: clusterIdx,
      clusterTier: tierLabels[clusterIdx]
    }))
  );

  const clusterStats = paired.map((p, idx) => ({
    tier: tierLabels[idx],
    centroid: Math.round(p.centroid * 10) / 10,
    count: p.members.length
  }));

  return {
    centroids: sortedCentroids,
    clusters: taggedClusters,
    clusterStats
  };
}

/**
 * Stratifies students across teams using K-Means cluster tiers.
 * Distributes equal quotas of Advanced, Proficient, and Developing students across all teams
 * to produce a balanced initial population before Genetic Algorithm optimization.
 * 
 * @param {Array} students - Array of student records
 * @param {number} numTeams - Target number of teams
 * @param {number} k - Number of clusters (default 3)
 * @returns {Array<Array>} - Stratified initial teams
 */
export function stratifyByKMeans(students, numTeams, k = 3) {
  if (!students || students.length === 0 || numTeams <= 0) return [];

  const { clusters } = runKMeans(students, k);
  const initialTeams = Array.from({ length: numTeams }, () => []);

  let teamIndex = 0;
  let forward = true;

  // Distribute students cluster-by-cluster (e.g., High tier first, Mid tier second, Developing tier third)
  // in a serpentine (snake-draft) fashion across the teams
  for (let c = clusters.length - 1; c >= 0; c--) {
    const clusterStudents = [...clusters[c]].sort((a, b) => getStudentScore(b) - getStudentScore(a));

    for (const student of clusterStudents) {
      initialTeams[teamIndex].push(student);
      if (forward) {
        teamIndex++;
        if (teamIndex === numTeams) {
          teamIndex--;
          forward = false;
        }
      } else {
        teamIndex--;
        if (teamIndex < 0) {
          teamIndex++;
          forward = true;
        }
      }
    }
  }

  return initialTeams;
}
