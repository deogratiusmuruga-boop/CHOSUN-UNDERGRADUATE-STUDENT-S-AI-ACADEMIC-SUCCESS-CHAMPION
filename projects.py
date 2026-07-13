from dataclasses import dataclass, asdict
from typing import List, Optional


@dataclass
class Opportunity:
    id: str
    title: str
    organization: str
    type: str  # "Scholarship", "Internship", "Competition", "Grant", "Exchange Program"
    amount_or_stipend: Optional[str]
    min_gpa: float
    eligible_majors: List[str]
    deadline: str
    description: str
    application_url: str


# Sample dataset aligning with image categories
SAMPLE_OPPORTUNITIES: List[Opportunity] = [
    Opportunity(
        id="opp_01",
        title="Global STEM Merit Scholarship",
        organization="Tech Forward Foundation",
        type="Scholarship",
        amount_or_stipend="$5,000",
        min_gpa=3.5,
        eligible_majors=["Computer Science", "Engineering"],
        deadline="2026-11-30",
        description="Merit-based award for high-performing undergraduates.",
        application_url="https://example.org/stem-scholarship"
    ),
    Opportunity(
        id="opp_02",
        title="AI Research Internship",
        organization="OpenLab AI",
        type="Internship",
        amount_or_stipend="$30/hr",
        min_gpa=3.2,
        eligible_majors=["Computer Science", "Data Science"],
        deadline="2026-10-15",
        description="Hands-on experience with LLM finetuning and evaluation.",
        application_url="https://example.org/ai-internship"
    ),
    Opportunity(
        id="opp_03",
        title="Global Exchange & Study Abroad Grant",
        organization="International Student Network",
        type="Exchange Program",
        amount_or_stipend="Full Tuition + Stipend",
        min_gpa=3.0,
        eligible_majors=["All"],
        deadline="2026-12-01",
        description="Semester-long exchange program at partner universities.",
        application_url="https://example.org/exchange"
    )
]


def get_all_opportunities(opportunity_type: Optional[str] = None) -> List[dict]:
    """Retrieve opportunities, optionally filtered by type (Scholarship, Internship, etc.)."""
    if not opportunity_type:
        return [asdict(o) for o in SAMPLE_OPPORTUNITIES]
    
    return [
        asdict(o) for o in SAMPLE_OPPORTUNITIES 
        if o.type.lower() == opportunity_type.lower()
    ]


def recommend_opportunities(user_gpa: float, user_major: str) -> List[dict]:
    """Match user profile against requirements (GPA and Major eligibility)."""
    recommendations = []
    for opp in SAMPLE_OPPORTUNITIES:
        if user_gpa >= opp.min_gpa:
            major_match = "All" in opp.eligible_majors or any(
                m.lower() == user_major.lower() for m in opp.eligible_majors
            )
            if major_match:
                recommendations.append(asdict(opp))
    return recommendations