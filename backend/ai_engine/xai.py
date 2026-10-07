"""
KDU AI Group Formation - Explainable AI (XAI) & Team Synergy Engine (Python)
Evaluates multi-dimensional group fitness, explains formation rationale, 
and extracts 5-axis radar chart coordinates.
"""
from typing import List, Dict, Any
import math
from .kmeans import get_student_score

def calculate_team_synergy(team: List[Dict[str, Any]], cohort_mean: float = 75.0) -> Dict[str, Any]:
    if not team:
        return {
            "overallScore": 0,
            "academicBalance": 0,
            "diversityScore": 0,
            "tierStratification": 0,
            "roleBalance": 0,
            "softSkillScore": 0,
            "radarData": [50, 50, 50, 50, 50],
            "rationale": "Empty team.",
            "badges": [],
            "teamMean": 0.0,
            "uniquePrograms": 0,
            "advancedCount": 0,
            "rolesPresent": 0
        }

    n = len(team)
    tech_scores = [get_student_score(s) for s in team]
    team_mean = sum(tech_scores) / n

    # 1. Academic Consistency (Internal variance & closeness to cohort mean)
    variance = sum((score - team_mean) ** 2 for score in tech_scores) / n
    std_dev = math.sqrt(variance)
    mean_delta = abs(team_mean - cohort_mean)
    academic_balance = max(20, min(100, round(100 - (std_dev * 1.5) - (mean_delta * 1.2))))

    # 2. Disciplinary Diversity
    unique_programs = len({s.get("degree_program") or s.get("degreeProgram") or "Computing" for s in team})
    diversity_ratio = unique_programs / n
    diversity_score = min(100, round((diversity_ratio * 70) + (30 if unique_programs >= 2 else 0)))

    # 3. K-Means Tier Stratification (Mentorship dynamic)
    advanced_count = sum(1 for s in team if get_student_score(s) >= 83.0)
    developing_count = sum(1 for s in team if get_student_score(s) < 66.0)
    proficient_count = n - advanced_count - developing_count

    tier_stratification = 60
    if advanced_count >= 1:
        tier_stratification += 20
    if proficient_count >= 1:
        tier_stratification += 10
    if developing_count > 0 and advanced_count >= 1:
        tier_stratification += 10
    if advanced_count == 0 and developing_count >= 2:
        tier_stratification -= 20
    tier_stratification = max(30, min(100, tier_stratification))

    # 4. Belbin Role Balance
    roles_present = len({s.get("belbin_role") or "Technical Implementer" for s in team})
    role_balance = min(100, round((roles_present / min(4, n)) * 100))

    # 5. Soft Skill Proficiency
    soft_scores = [
        float(s.get("soft_skill_score") or s.get("softSkillScore") or 75.0)
        for s in team
    ]
    avg_soft_score = round(sum(soft_scores) / n)

    # Overall Weighted Synergy
    overall_score = round(
        (academic_balance * 0.30)
        + (diversity_score * 0.25)
        + (tier_stratification * 0.25)
        + (role_balance * 0.10)
        + (avg_soft_score * 0.10)
    )

    # Badges
    badges = []
    if unique_programs >= 2:
        badges.append({"text": f"{unique_programs} Disciplines", "color": "emerald"})
    if advanced_count >= 1:
        badges.append({"text": f"{advanced_count} Lead(s)", "color": "indigo"})
    if overall_score >= 85:
        badges.append({"text": "High Synergy", "color": "amber"})
    if roles_present >= 3:
        badges.append({"text": "Balanced Roles", "color": "purple"})

    # Qualitative XAI Rationale
    rationale_parts = []
    if overall_score >= 85:
        rationale_parts.append(f"⭐ **High Academic & Disciplinary Synergy ({overall_score}%)**.")
    elif overall_score >= 70:
        rationale_parts.append(f"✅ **Balanced Team Composition ({overall_score}%)**.")
    else:
        rationale_parts.append(f"⚠️ **Moderate Synergy ({overall_score}%)**.")

    rationale_parts.append(
        f"Average score is **{team_mean:.1f}** (Δ {abs(team_mean - cohort_mean):.1f} from cohort mean)."
    )

    if unique_programs >= 2:
        rationale_parts.append(
            f"Cross-faculty collaboration active with **{unique_programs} distinct degree programs** represented."
        )
    else:
        rationale_parts.append("Monodisciplinary team: all members share the same degree programme.")

    if advanced_count >= 1 and developing_count >= 1:
        rationale_parts.append(
            f"Excellent tier stratification: includes **{advanced_count} Advanced** student(s) to mentor **{developing_count} Developing** peer(s)."
        )
    elif advanced_count >= 1:
        rationale_parts.append(f"Anchored by **{advanced_count} Advanced** tier member(s).")
    else:
        rationale_parts.append("Watch out: lacks an Advanced tier anchor; consider pairing with a senior specialist.")

    return {
        "overallScore": overall_score,
        "academicBalance": academic_balance,
        "diversityScore": diversity_score,
        "tierStratification": tier_stratification,
        "roleBalance": role_balance,
        "softSkillScore": avg_soft_score,
        "radarData": [academic_balance, diversity_score, tier_stratification, role_balance, avg_soft_score],
        "rationale": " ".join(rationale_parts),
        "badges": badges,
        "teamMean": round(team_mean, 1),
        "uniquePrograms": unique_programs,
        "advancedCount": advanced_count,
        "rolesPresent": roles_present
    }
