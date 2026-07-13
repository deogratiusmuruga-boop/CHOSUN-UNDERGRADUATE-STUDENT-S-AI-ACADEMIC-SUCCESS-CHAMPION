from dataclasses import dataclass, asdict
from typing import List, Optional


@dataclass
class ChosunScholarship:
    id: str
    title_kr: str
    title_en: str
    category: str  # "Academic", "Language", "Improvement", "External"
    min_gpa: float # Chosun Univ scale max is 4.5
    topik_level: Optional[int]
    benefit: str
    description: str


# Dataset aligned with official Chosun University Undergraduate Regulations
CHOSUN_SCHOLARSHIPS: List[ChosunScholarship] = [
    ChosunScholarship(
        id="csu_sch_01",
        title_kr="성적장학금 (최우수)",
        title_en="Academic Achievement Scholarship (Full)",
        category="Academic",
        min_gpa=4.2,
        topik_level=None,
        benefit="100% Tuition Waiver",
        description="Awarded to current students with a previous semester GPA of 4.2 or higher."
    ),
    ChosunScholarship(
        id="csu_sch_02",
        title_kr="성적장학금 (우수 1)",
        title_en="Academic Achievement Scholarship (50%)",
        category="Academic",
        min_gpa=3.8,
        topik_level=None,
        benefit="50% Tuition Waiver",
        description="Awarded to students with a previous semester GPA between 3.8 and 4.19."
    ),
    ChosunScholarship(
        id="csu_sch_03",
        title_kr="성적장학금 (우수 2)",
        title_en="Academic Achievement Scholarship (33%)",
        category="Academic",
        min_gpa=3.5,
        topik_level=None,
        benefit="33% Tuition Waiver",
        description="Awarded to students with a previous semester GPA between 3.5 and 3.79."
    ),
    ChosunScholarship(
        id="csu_sch_04",
        title_kr="성적장학금 (장려)",
        title_en="Academic Achievement Scholarship (25%)",
        category="Academic",
        min_gpa=3.0,
        topik_level=None,
        benefit="25% Tuition Waiver",
        description="Awarded to students with a previous semester GPA between 3.0 and 3.49."
    ),
    ChosunScholarship(
        id="csu_sch_05",
        title_kr="성적 JUMP 장학금",
        title_en="GPA JUMP Scholarship",
        category="Improvement",
        min_gpa=0.0,
        topik_level=None,
        benefit="300,000 - 900,000 KRW Grant",
        description="Awarded to students who significantly improve their GPA compared to the previous semester."
    ),
    ChosunScholarship(
        id="csu_sch_06",
        title_kr="TOPIK 장학금",
        title_en="TOPIK Proficiency Scholarship",
        category="Language",
        min_gpa=0.0,
        topik_level=4,
        benefit="500,000 - 900,000 KRW Grant",
        description="Awarded upon achieving or upgrading to TOPIK Level 4 or higher."
    )
]


def get_chosun_scholarships(user_gpa: float, user_topik: int = 0) -> List[dict]:
    """
    Evaluates a Chosun University student's GPA (out of 4.5) and TOPIK level
    to recommend all eligible internal and external scholarships.
    """
    eligible = []
    for sch in CHOSUN_SCHOLARSHIPS:
        # Check GPA condition
        if user_gpa >= sch.min_gpa:
            # Check TOPIK requirement if applicable
            if sch.topik_level and user_topik < sch.topik_level:
                continue
            eligible.append(asdict(sch))
            
    return eligible


def get_gpa_improvement_target(current_gpa: float) -> dict:
    """Calculates the next scholarship tier for Chosun University students."""
    if current_gpa < 3.0:
        return {"next_tier": 3.0, "benefit": "25% Tuition Waiver", "gap": round(3.0 - current_gpa, 2)}
    elif current_gpa < 3.5:
        return {"next_tier": 3.5, "benefit": "33% Tuition Waiver", "gap": round(3.5 - current_gpa, 2)}
    elif current_gpa < 3.8:
        return {"next_tier": 3.8, "benefit": "50% Tuition Waiver", "gap": round(3.8 - current_gpa, 2)}
    elif current_gpa < 4.2:
        return {"next_tier": 4.2, "benefit": "100% Tuition Waiver", "gap": round(4.2 - current_gpa, 2)}
    else:
        return {"next_tier": 4.5, "benefit": "Maximum Academic Tier Maintained!", "gap": 0.0}