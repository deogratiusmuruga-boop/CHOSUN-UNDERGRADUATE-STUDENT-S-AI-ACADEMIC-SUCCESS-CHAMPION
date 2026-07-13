from dataclasses import dataclass, asdict
from typing import List, Optional


@dataclass
class StudentProject:
    id: str
    title: str
    department: str         # e.g., "Computer Engineering", "AI Software"
    difficulty: str         # "Beginner", "Intermediate", "Advanced"
    tech_stack: List[str]
    description: str
    github_template_url: str


CHOSUN_PROJECT_IDEAS: List[StudentProject] = [
    StudentProject(
        id="csu_proj_01",
        title="Chosun Campus Shuttle & Class Finder App",
        department="Computer Engineering",
        difficulty="Intermediate",
        tech_stack=["React Native", "FastAPI", "Kakao Maps API"],
        description="Real-time shuttle tracking and interactive building/classroom navigator for Chosun University Gwangju Campus.",
        github_template_url="https://github.com/example/chosun-shuttle-tracker"
    ),
    StudentProject(
        id="csu_proj_02",
        title="AI Academic Advisor & 4.5 GPA Planner",
        department="AI Software",
        difficulty="Intermediate",
        tech_stack=["Python", "Llama 3.1", "FastAPI", "PostgreSQL"],
        description="An AI chatbot that calculates 4.5 GPA grade projections, tracks prerequisite subjects, and recommends study plans.",
        github_template_url="https://github.com/example/chosun-academic-advisor"
    ),
    StudentProject(
        id="csu_proj_03",
        title="Automated Multilingual Course Material Summarizer",
        department="Global IT",
        difficulty="Beginner",
        tech_stack=["Python", "Streamlit", "OpenAI / Ollama"],
        description="Translates and summarizes Chosun University lecture notes and PDFs between Korean and English.",
        github_template_url="https://github.com/example/chosun-lecture-summarizer"
    )
]


def get_chosun_project_ideas(department: Optional[str] = None) -> List[dict]:
    """Retrieve curated student project ideas tailored for Chosun University courses."""
    if not department:
        return [asdict(p) for p in CHOSUN_PROJECT_IDEAS]
    
    return [
        asdict(p) for p in CHOSUN_PROJECT_IDEAS 
        if department.lower() in p.department.lower()
    ]


def get_portfolio_guidelines_chosun() -> dict:
    """Returns guidelines for Chosun undergraduates building capstone & job-ready portfolios."""
    return {
        "recommended_platforms": ["GitHub", "Velog / Tistory", "Notion Portfolio"],
        "key_requirements": [
            "Provide detailed README in both Korean and English.",
            "Include architecture diagrams matching system components.",
            "Deploy live demo using Vercel/Render or local Docker instructions."
        ]
    }