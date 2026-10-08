"""
KDU AI Group Formation System - FastAPI Microservice
Core AI Backend for K-Means Clustering, Genetic Algorithm Optimization, and Explainable AI (XAI)
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import time
import sys

from ai_engine.kmeans import run_kmeans, get_student_score
from ai_engine.genetic_algorithm import run_genetic_algorithm
from ai_engine.benchmarking import run_full_benchmark_suite
from ai_engine.xai import calculate_team_synergy

app = FastAPI(
    title="KDU AI Group Formation Engine",
    description="Intelligent 3-Stage Hybrid AI Pipeline (Fuzzy Logic, K-Means Clustering, Genetic Algorithm) for Balanced Student Team Optimization",
    version="2.0.0"
)

# Enable CORS so the React frontend can communicate seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OptimizeRequest(BaseModel):
    students: List[Dict[str, Any]]
    numTeams: int = Field(default=3, ge=1)
    iterations: int = Field(default=2500, ge=10, le=10000)
    weights: Optional[Dict[str, Any]] = None
    constraints: Optional[List[Dict[str, Any]]] = None
    activeModule: Optional[Any] = None

class BenchmarkRequest(BaseModel):
    students: List[Dict[str, Any]]
    numTeams: int = Field(default=3, ge=1)
    weights: Optional[Dict[str, Any]] = None
    constraints: Optional[List[Dict[str, Any]]] = None

class KMeansRequest(BaseModel):
    students: List[Dict[str, Any]]
    k: int = Field(default=3, ge=1, le=10)

@app.get("/")
@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "KDU AI Group Formation Python Microservice",
        "version": "2.0.0",
        "python_version": sys.version,
        "docs_url": "/docs"
    }

@app.post("/optimize-teams")
@app.post("/api/optimize-teams")
def optimize_teams(payload: OptimizeRequest):
    if not payload.students:
        raise HTTPException(status_code=400, detail="Student roster cannot be empty.")

    t0 = time.perf_counter()

    # Stage 1 & 2: K-Means Clustering Tier Stratification
    k_result = run_kmeans(payload.students, k=3)
    cluster_stats = k_result["clusterStats"]

    # Stage 3: Genetic Algorithm Balancing Engine
    ga_result = run_genetic_algorithm(
        students=payload.students,
        num_teams=payload.numTeams,
        iterations=payload.iterations,
        weights=payload.weights,
        constraints=payload.constraints,
        seed_method="kmeans"
    )

    best_groups = ga_result["groups"]

    # Calculate cohort mean
    total_tech = sum(get_student_score(s) for s in payload.students)
    cohort_mean = total_tech / len(payload.students) if payload.students else 75.0

    # For seamless frontend consumption, return formatted groups with metadata
    formatted_groups = []
    for g in best_groups:
        synergy = calculate_team_synergy(g, cohort_mean=cohort_mean)
        formatted_groups.append({
            "members": g,
            "synergy": synergy,
            "evaluatedModule": payload.activeModule
        })

    t1 = time.perf_counter()
    execution_time_ms = round((t1 - t0) * 1000.0, 2)

    return {
        "success": True,
        "groups": formatted_groups,
        "rawGroups": best_groups,
        "clusterStats": cluster_stats,
        "bestFitness": ga_result["bestFitness"],
        "convergenceHistory": ga_result["convergenceHistory"],
        "executionTimeMs": execution_time_ms
    }

@app.post("/benchmark")
@app.post("/api/benchmark")
def run_benchmark(payload: BenchmarkRequest):
    if not payload.students:
        raise HTTPException(status_code=400, detail="Student roster cannot be empty.")

    t0 = time.perf_counter()
    results = run_full_benchmark_suite(
        students=payload.students,
        num_teams=payload.numTeams,
        weights=payload.weights,
        constraints=payload.constraints
    )
    t1 = time.perf_counter()

    return {
        "success": True,
        "results": results,
        "totalExecutionTimeMs": round((t1 - t0) * 1000.0, 2)
    }

@app.post("/kmeans")
@app.post("/api/kmeans")
def run_kmeans_endpoint(payload: KMeansRequest):
    if not payload.students:
        raise HTTPException(status_code=400, detail="Student roster cannot be empty.")

    result = run_kmeans(payload.students, k=payload.k)
    return {
        "success": True,
        **result
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
