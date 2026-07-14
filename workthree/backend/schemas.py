from pydantic import BaseModel
from typing import Optional

class ProjectCreate(BaseModel):
    title: str
    description: str
    category: str
    github_url: Optional[str] = None

class ProjectResponse(ProjectCreate):
    id: int
    owner_id: int
    file_path: Optional[str] = None

    class Config:
        from_attributes = True

class ScholarshipCreate(BaseModel):
    title: str
    organization: str
    amount: float
    deadline: str
    category: str
    eligibility: str

class ScholarshipResponse(ScholarshipCreate):
    id: int

    class Config:
        from_attributes = True
