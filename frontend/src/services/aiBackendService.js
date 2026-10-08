/**
 * KDU AI Group Formation - Python AI Backend Service
 * 
 * 100% Pure Python Architecture:
 * All unsupervised Machine Learning (K-Means Clustering) and Genetic Algorithm
 * multi-objective optimization are executed exclusively via the Python FastAPI Backend.
 */

const rawBackendUrl = import.meta.env.VITE_PYTHON_BACKEND_URL;
export const PYTHON_BACKEND_URL = (
  rawBackendUrl && rawBackendUrl.trim() !== ''
    ? rawBackendUrl.trim().replace(/\/+$/, '')
    : (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '')
);

/**
 * Checks if the Python FastAPI backend is currently active and reachable.
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(`${PYTHON_BACKEND_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return { online: true, ...data };
    }
  } catch (err) {
    // Backend is offline or unreachable
  }
  return { online: false };
}

/**
 * Executes Team Optimization exclusively on the Python FastAPI AI Microservice.
 */
export async function optimizeTeamsAI({
  students,
  numTeams,
  iterations = 2500,
  weights,
  constraints,
  activeModule
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/optimize-teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students,
        numTeams,
        iterations,
        weights,
        constraints,
        activeModule
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      let msg = `Server responded with status ${response.status}`;
      if (errData.detail) {
        if (typeof errData.detail === 'string') {
          msg = errData.detail;
        } else if (Array.isArray(errData.detail)) {
          msg = errData.detail.map(d => `${d.loc ? d.loc.slice(1).join('.') + ': ' : ''}${d.msg}`).join('; ');
        } else {
          msg = JSON.stringify(errData.detail);
        }
      }
      throw new Error(msg);
    }

    const result = await response.json();
    const groups = (result.groups || []).map(g => {
      const teamArray = [...(g.members || [])];
      teamArray.synergy = g.synergy;
      teamArray.evaluatedModule = g.evaluatedModule || activeModule;
      return teamArray;
    });

    return {
      groups,
      clusterStats: result.clusterStats || [],
      bestFitness: result.bestFitness,
      executionTimeMs: result.executionTimeMs,
      source: 'python',
      success: true
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Python AI Engine request timed out. Please verify that backend is running.');
    }
    throw new Error(`Python AI Engine is unavailable: ${err.message}. Please start the backend: cd backend && python run.py`);
  }
}

/**
 * Executes Algorithmic Benchmarking exclusively on the Python FastAPI AI Microservice.
 */
export async function runBenchmarkAI({
  students,
  numTeams,
  weights,
  constraints
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/benchmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students,
        numTeams,
        weights,
        constraints
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      let msg = `Server responded with status ${response.status}`;
      if (errData.detail) {
        if (typeof errData.detail === 'string') {
          msg = errData.detail;
        } else if (Array.isArray(errData.detail)) {
          msg = errData.detail.map(d => `${d.loc ? d.loc.slice(1).join('.') + ': ' : ''}${d.msg}`).join('; ');
        } else {
          msg = JSON.stringify(errData.detail);
        }
      }
      throw new Error(msg);
    }

    const data = await response.json();
    return {
      results: data.results,
      source: 'python',
      success: true
    };
  } catch (err) {
    throw new Error(`Python Benchmark Engine is unavailable: ${err.message}. Please ensure the backend is running on http://127.0.0.1:8000`);
  }
}

/**
 * Executes K-Means Clustering on the Python FastAPI AI Microservice.
 */
export async function runKMeansAI(students, k = 3) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/kmeans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        students,
        k
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('[Python K-Means] Backend not reachable for clustering:', err.message);
    return { centroids: [], clusters: [], clusterStats: [] };
  }
}
