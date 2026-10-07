"""
KDU AI Group Formation System - Core AI Engine Package (Python)
"""
from .kmeans import run_kmeans, stratify_by_kmeans, get_student_score
from .genetic_algorithm import run_genetic_algorithm, evaluate_fitness
from .benchmarking import run_full_benchmark_suite, run_random_allocation, run_greedy_snake_draft, run_pure_ga, run_hybrid_kmeans_ga
from .xai import calculate_team_synergy

__all__ = [
    "run_kmeans",
    "stratify_by_kmeans",
    "get_student_score",
    "run_genetic_algorithm",
    "evaluate_fitness",
    "run_full_benchmark_suite",
    "run_random_allocation",
    "run_greedy_snake_draft",
    "run_pure_ga",
    "run_hybrid_kmeans_ga",
    "calculate_team_synergy"
]
