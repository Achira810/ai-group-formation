"""
KDU AI Group Formation System - Genetic Algorithm Optimizer (Python)

Stage 3 Balancing Engine (Concept 3):
Multi-objective Genetic Algorithm optimizing:
- Academic equity across teams (minimizing delta between highest and lowest team means)
- Interdisciplinary degree diversity (COE, SE, CS, IT, IS, DS mix)
- Belbin functional team roles coverage
- Soft/Hard CSP constraint satisfaction (Affinity pairings & Conflict separations)
"""
from typing import List, Dict, Any, Optional
import random
import copy
from .kmeans import stratify_by_kmeans, get_student_score

def evaluate_fitness(
    groups: List[List[Dict[str, Any]]],
    weights: Optional[Dict[str, float]] = None,
    constraints: Optional[List[Dict[str, Any]]] = None
) -> float:
    if weights is None:
        weights = {"alpha": 1.0, "beta": 1.0, "gamma": 1.0, "delta": 0.8}
    if constraints is None:
        constraints = []

    max_avg = float("-inf")
    min_avg = float("inf")
    discipline_penalty = 0.0
    constraint_penalty = 0.0
    role_penalty = 0.0

    # Student to group index map for O(1) constraint verification
    student_to_group = {}
    for g_idx, group in enumerate(groups):
        for s in group:
            s_id = str(s.get("id") or s.get("student_id") or s.get("studentId"))
            student_to_group[s_id] = g_idx

    for group in groups:
        if not group:
            continue
        tech_scores = [get_student_score(s) for s in group]
        avg = sum(tech_scores) / len(group)

        if avg > max_avg:
            max_avg = avg
        if avg < min_avg:
            min_avg = avg

        # Disciplinary diversity penalty
        unique_programs = {s.get("degree_program") or s.get("degreeProgram") or "Computing" for s in group}
        if len(unique_programs) < 2 and len(group) > 1:
            discipline_penalty += 10.0

        # Belbin role coverage penalty
        roles = {s.get("belbin_role") or "Technical Implementer" for s in group}
        if len(roles) < min(3, len(group)):
            role_penalty += 5.0

    # Hard/Soft Constraints penalty (Affinity vs Conflict)
    for c in constraints:
        s_a = str(c.get("student_a_id") or "")
        s_b = str(c.get("student_b_id") or "")
        g_a = student_to_group.get(s_a)
        g_b = student_to_group.get(s_b)

        if g_a is not None and g_b is not None:
            c_type = str(c.get("constraint_type") or "").upper()
            if c_type == "AFFINITY" and g_a != g_b:
                constraint_penalty += 25.0
            elif c_type == "CONFLICT" and g_a == g_b:
                constraint_penalty += 30.0

    academic_range = 0.0 if (max_avg == float("-inf") or min_avg == float("inf")) else (max_avg - min_avg)

    alpha = weights.get("alpha", 1.0)
    beta = weights.get("beta", 1.0)
    gamma = weights.get("gamma", 1.0)
    delta = weights.get("delta", 0.8)

    return (
        (academic_range * alpha)
        + (discipline_penalty * beta)
        + (constraint_penalty * gamma)
        + (role_penalty * delta)
    )

def run_genetic_algorithm(
    students: List[Dict[str, Any]],
    num_teams: int,
    iterations: int = 2500,
    weights: Optional[Dict[str, float]] = None,
    constraints: Optional[List[Dict[str, Any]]] = None,
    seed_method: str = "kmeans"
) -> Dict[str, Any]:
    if not students or num_teams <= 0:
        return {"groups": [], "bestFitness": 0.0, "convergenceHistory": []}

    # 1. Seeding stage
    if seed_method == "kmeans":
        current_groups = stratify_by_kmeans(students, num_teams, 3)
    else:
        # Uniform random shuffle baseline
        shuffled = copy.deepcopy(students)
        random.shuffle(shuffled)
        current_groups = [[] for _ in range(num_teams)]
        for idx, s in enumerate(shuffled):
            current_groups[idx % num_teams].append(s)

    best_groups = [list(g) for g in current_groups]
    best_fitness = evaluate_fitness(best_groups, weights, constraints)
    convergence_history = [round(best_fitness, 1)]

    step_interval = max(1, iterations // 10)

    # 2. Stochastic Mutation & Balancing Loop
    for it in range(iterations):
        if num_teams < 2:
            break

        g1 = random.randint(0, num_teams - 1)
        g2 = random.randint(0, num_teams - 1)
        if g1 == g2:
            continue
        if len(best_groups[g1]) == 0 or len(best_groups[g2]) == 0:
            continue

        s1_idx = random.randint(0, len(best_groups[g1]) - 1)
        s2_idx = random.randint(0, len(best_groups[g2]) - 1)

        # Clone for candidate test
        test_groups = [list(g) for g in best_groups]
        test_groups[g1][s1_idx], test_groups[g2][s2_idx] = test_groups[g2][s2_idx], test_groups[g1][s1_idx]

        new_fitness = evaluate_fitness(test_groups, weights, constraints)
        if new_fitness < best_fitness:
            best_groups = test_groups
            best_fitness = new_fitness

        if it % step_interval == 0:
            convergence_history.append(round(best_fitness, 1))

    return {
        "groups": best_groups,
        "bestFitness": round(best_fitness, 2),
        "convergenceHistory": convergence_history
    }
