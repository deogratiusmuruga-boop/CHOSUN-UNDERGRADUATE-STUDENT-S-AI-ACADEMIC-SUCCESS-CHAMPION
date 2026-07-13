from dataclasses import dataclass, asdict
from typing import List, Optional


@dataclass
class ProjectIdea:
    id: str
    title: str
    domain: str             # e.g., "AI/ML", "Web Dev", "Data Science"
    difficulty: str         # "Beginner", "Intermediate", "Advanced"
    tech_stack: List[str]
    description: str
    guidelines: List[str]   # Step-by-step development guidelines
    recommended_datasets: List[str]


# Sample dataset supporting Portfolio Builder and Project Ideas
SAMPLE_PROJECTS: List[ProjectIdea] = [
    ProjectIdea(
        id="proj_01",
        title="AI-Powered Study Planner & GPA Tracker",
        domain="AI/ML",
        difficulty="Intermediate",
        tech_stack=["Python", "FastAPI", "React", "Llama 3.1"],
        description="An intelligent schedule manager that plans study blocks based on course syllabi.",
        guidelines=[
            "Set up FastAPI backend and connect SQLite/PostgreSQL database.",
            "Integrate Llama 3.1 via Ollama or Groq API for text generation.",
            "Build a React dashboard displaying GPA metrics and calendar."
        ],
        recommended_datasets=["Kaggle Student Performance Dataset", "Synthetic Quiz Data"]
    ),
    ProjectIdea(
        id="proj_02",
        title="Automated PDF Summarizer & Quiz Generator",
        domain="NLP",
        difficulty="Beginner",
        tech_stack=["Python", "LangChain", "ChromaDB"],
        description="Extract key concepts from past papers and generate practice quizzes automatically.",
        guidelines=[
            "Parse PDF materials into chunked text.",
            "Generate embeddings using ChromaDB or FAISS.",
            "Query vector DB to produce 5-question multiple choice quizzes."
        ],
        recommended_datasets=["ArXiv CS Papers Dataset"]
    )
]


def get_project_ideas(domain: Optional[str] = None) -> List[dict]:
    """Fetch project ideas, optionally filtered by domain."""
    if not domain:
        return [asdict(p) for p in SAMPLE_PROJECTS]
    return [asdict(p) for p in SAMPLE_PROJECTS if p.domain.lower() == domain.lower()]


def get_portfolio_builder_config(user_projects: List[dict]) -> dict:
    """Generates structured data to help student present their projects (e.g. GitHub/Portfolio link)."""
    return {
        "portfolio_summary": f"User has completed {len(user_projects)} projects.",
        "github_integration_status": "Ready for export",
        "suggested_tags": list({tech for p in user_projects for tech in p.get("tech_stack", [])}),
        "portfolio_template_sections": [
            "Project Demo / Live Link",
            "System Architecture Diagram",
            "Key Features & Tech Stack",
            "Installation & Usage Setup"
        ]
    }