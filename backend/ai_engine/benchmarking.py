"""
KDU AI Group Formation - Comparative Algorithmic Benchmarking Suite (Python)
Evaluates 4 group formation algorithms side-by-side:
1. Random Allocation (Baseline)
2. Greedy Snake Draft (Heuristic)
3. Pure Genetic Algorithm (Stochastic Search)
4. Hybrid K-Means + Genetic Algorithm (Our System)
"""
from typing import List, Dict, Any, Optional
import time
import random
import copy
from .kmeans import get_student_score
from .genetic_algorithm import evaluate_fitness, run_genetic_algorithm

def calculate_team_means(groups: List[List[Dict[str, Any]]]) -> List[float]:
    means = []
    for group in groups:
        if not group:
            means.append(0.0)
        else:
            means.append(sum(get_student_score(s) for s in group) / len(group))
    return means

def calculate_variance(means: List[float]) -> float:
    if len(means) <= 1:
        return 0.0
    avg = sum(means) / len(means)
    var = sum((m - avg) ** 2 for m in means) / len(means)
    return round(var, 2)

def calculate_diversity_rate(groups: List[List[Dict[str, Any]]]) -> float:
    if not groups:
        return 0.0
    diverse_count = 0
    for g in groups:
        if len(g) <= 1:
            diverse_count += 1
            continue
        unique_programs = {s.get("degree_program") or s.get("degreeProgram") or "Computing" for s in g}
        if len(unique_programs) >= 2:
            diverse_count += 1
    return round((diverse_count / len(groups)) * 100.0, 1)

def run_random_allocation(students: List[Dict[str, Any]], num_teams: int) -> Dict[str, Any]:
    t0 = time.perf_counter()
    shuffled = copy.deepcopy(students)
    random.shuffle(shuffled)
    groups = [[] for _ in range(num_teams)]

    for idx, s in enumerate(shuffled):
        groups[idx % num_teams].append(s)

    t1 = time.perf_counter()
    means = calculate_team_means(groups)
    fitness = evaluate_fitness(groups)

    return {
        "algorithm": "Random Allocation (Baseline)",
        "groups": groups,
        "executionTimeMs": round((t1 - t0) * 1000.0, 2),
        "variance": calculate_variance(means),
        "diversityRate": calculate_diversity_rate(groups),
        "fitnessScore": round(fitness, 2),
        "convergenceHistory": [round(fitness, 1)]
    }

def run_greedy_snake_draft(students: List[Dict[str, Any]], num_teams: int) -> Dict[str, Any]:
    t0 = time.perf_counter()
    sorted_students = sorted(students, key=lambda s: get_student_score(s), reverse=True)
    groups = [[] for _ in range(num_teams)]

    team_idx = 0
    direction = 1

    for s in sorted_students:
        groups[team_idx].append(s)
        if direction == 1:
            if team_idx == num_teams - 1:
                direction = -1
            else:
                team_idx += 1
        else:
            if team_idx == 0:
                direction = 1
            else:
                team_idx -= 1

    t1 = time.perf_counter()
    means = calculate_team_means(groups)
    fitness = evaluate_fitness(groups)

    return {
        "algorithm": "Greedy Snake Draft (Heuristic)",
        "groups": groups,
        "executionTimeMs": round((t1 - t0) * 1000.0, 2),
        "variance": calculate_variance(means),
        "diversityRate": calculate_diversity_rate(groups),
        "fitnessScore": round(fitness, 2),
        "convergenceHistory": [round(fitness, 1)]
    }

def run_pure_ga(
    students: List[Dict[str, Any]],
    num_teams: int,
    iterations: int = 1500,
    weights: Optional[Dict[str, float]] = None,
    constraints: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    t0 = time.perf_counter()
    ga_result = run_genetic_algorithm(
        students,
        num_teams,
        iterations=iterations,
        weights=weights,
        constraints=constraints,
        seed_method="random"
    )
    t1 = time.perf_counter()

    groups = ga_result["groups"]
    means = calculate_team_means(groups)

    return {
        "algorithm": "Pure Genetic Algorithm (Stochastic)",
        "groups": groups,
        "executionTimeMs": round((t1 - t0) * 1000.0, 2),
        "variance": calculate_variance(means),
        "diversityRate": calculate_diversity_rate(groups),
        "fitnessScore": ga_result["bestFitness"],
        "convergenceHistory": ga_result["convergenceHistory"]
    }

def run_hybrid_kmeans_ga(
    students: List[Dict[str, Any]],
    num_teams: int,
    iterations: int = 2500,
    weights: Optional[Dict[str, float]] = None,
    constraints: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    t0 = time.perf_counter()
    ga_result = run_genetic_algorithm(
        students,
        num_teams,
        iterations=iterations,
        weights=weights,
        constraints=constraints,
        seed_method="kmeans"
    )
    t1 = time.perf_counter()

    groups = ga_result["groups"]
    means = calculate_team_means(groups)

    return {
        "algorithm": "Hybrid K-Means + GA (Our System)",
        "groups": groups,
        "executionTimeMs": round((t1 - t0) * 1000.0, 2),
        "variance": calculate_variance(means),
        "diversityRate": calculate_diversity_rate(groups),
        "fitnessScore": ga_result["bestFitness"],
        "convergenceHistory": ga_result["convergenceHistory"]
    }

def run_full_benchmark_suite(
    students: List[Dict[str, Any]],
    num_teams: int,
    weights: Optional[Dict[str, float]] = None,
    constraints: Optional[List[Dict[str, Any]]] = None
) -> List[Dict[str, Any]]:
    random_res = run_random_allocation(students, num_teams)
    greedy_res = run_greedy_snake_draft(students, num_teams)
    pure_ga_res = run_pure_ga(students, num_teams, 1500, weights, constraints)
    hybrid_res = run_hybrid_kmeans_ga(students, num_teams, 2500, weights, constraints)

    return [random_res, greedy_res, pure_ga_res, hybrid_res]
