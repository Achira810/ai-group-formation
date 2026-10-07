"""
KDU AI Group Formation System - K-Means Clustering Module (Python)

Unsupervised Machine Learning (Concept 2):
Stratifies the student cohort into distinct performance tiers (k=3: Developing, Proficient, Advanced)
based on their standardized Fuzzy Logic technical scores.
"""
from typing import List, Dict, Any
import math

def get_student_score(student: Dict[str, Any]) -> float:
    if not student:
        return 50.0
    val = (
        student.get("technical_score")
        if student.get("technical_score") is not None
        else student.get("technicalScore")
        if student.get("technicalScore") is not None
        else student.get("fuzzyScore")
        if student.get("fuzzyScore") is not None
        else student.get("score")
    )
    try:
        score = float(val)
        return 50.0 if math.isnan(score) else score
    except (TypeError, ValueError):
        return 50.0

def run_kmeans(students: List[Dict[str, Any]], k: int = 3, max_iterations: int = 50) -> Dict[str, Any]:
    if not students:
        return {"centroids": [], "clusters": [], "clusterStats": []}

    actual_k = min(k, len(students))
    if actual_k <= 1:
        mean_score = sum(get_student_score(s) for s in students) / len(students)
        return {
            "centroids": [round(mean_score, 1)],
            "clusters": [[dict(s) for s in students]],
            "clusterStats": [{"tier": "Standard", "count": len(students), "centroid": round(mean_score, 1), "mean": 50}]
        }

    scores = sorted([get_student_score(s) for s in students])
    min_score = scores[0]
    max_score = scores[-1]

    centroids = []
    if max_score == min_score:
        centroids = [float(min_score) for _ in range(actual_k)]
    else:
        for i in range(actual_k):
            fraction = (i + 0.5) / actual_k
            centroids.append(min_score + fraction * (max_score - min_score))

    clusters: List[List[Dict[str, Any]]] = [[] for _ in range(actual_k)]

    for _ in range(max_iterations):
        clusters = [[] for _ in range(actual_k)]

        # 1. Assignment Step
        for s in students:
            val = get_student_score(s)
            closest_idx = 0
            min_dist = abs(val - centroids[0])
            for i in range(1, actual_k):
                dist = abs(val - centroids[i])
                if dist < min_dist:
                    min_dist = dist
                    closest_idx = i
            clusters[closest_idx].append(s)

        # 2. Update Step
        converged = True
        for i in range(actual_k):
            if not clusters[i]:
                continue
            new_mean = sum(get_student_score(s) for s in clusters[i]) / len(clusters[i])
            if abs(new_mean - centroids[i]) > 0.001:
                converged = False
            centroids[i] = new_mean

        if converged:
            break

    # Pair centroids with clusters and sort ascending by centroid score
    paired = []
    for idx, c in enumerate(centroids):
        paired.append({"centroid": c, "members": clusters[idx]})
    paired.sort(key=lambda x: x["centroid"])

    if actual_k == 3:
        tier_labels = ["Developing (Tier 1)", "Proficient (Tier 2)", "Advanced (Tier 3)"]
    else:
        tier_labels = [f"Cluster {i + 1}" for i in range(actual_k)]

    sorted_centroids = [round(p["centroid"], 1) for p in paired]
    sorted_clusters = [p["members"] for p in paired]

    # Tag students with cluster metadata
    tagged_clusters = []
    for cluster_idx, members in enumerate(sorted_clusters):
        tagged_members = []
        for s in members:
            tagged_s = dict(s)
            tagged_s["clusterId"] = cluster_idx
            tagged_s["clusterTier"] = tier_labels[cluster_idx]
            tagged_members.append(tagged_s)
        tagged_clusters.append(tagged_members)

    cluster_stats = []
    for idx, p in enumerate(paired):
        cluster_stats.append({
            "tier": tier_labels[idx],
            "centroid": round(p["centroid"], 1),
            "count": len(p["members"])
        })

    return {
        "centroids": sorted_centroids,
        "clusters": tagged_clusters,
        "clusterStats": cluster_stats
    }

def stratify_by_kmeans(students: List[Dict[str, Any]], num_teams: int, k: int = 3) -> List[List[Dict[str, Any]]]:
    if not students or num_teams <= 0:
        return []

    kmeans_res = run_kmeans(students, k)
    clusters = kmeans_res["clusters"]
    initial_teams: List[List[Dict[str, Any]]] = [[] for _ in range(num_teams)]

    team_index = 0
    forward = True

    # Serpentine (snake-draft) distribution: High tier first, descending
    for c in range(len(clusters) - 1, -1, -1):
        cluster_students = sorted(clusters[c], key=lambda s: get_student_score(s), reverse=True)
        for student in cluster_students:
            initial_teams[team_index].append(student)
            if forward:
                team_index += 1
                if team_index == num_teams:
                    team_index -= 1
                    forward = False
            else:
                team_index -= 1
                if team_index < 0:
                    team_index += 1
                    forward = True

    return initial_teams
