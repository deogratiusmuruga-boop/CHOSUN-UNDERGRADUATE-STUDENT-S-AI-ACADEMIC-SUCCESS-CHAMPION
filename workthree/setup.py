import os

# Define file contents
files = {
    "workthree/backend/requirements.txt": """fastapi
uvicorn
sqlalchemy
pydantic
python-multipart
passlib[bcrypt]
pyjwt
""",

    "workthree/backend/schemas.py": """from pydantic import BaseModel
from typing import Optional, List

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
""",

    "workthree/backend/services/project_service.py": """dummy_projects = [
    {"id": 1, "title": "AI Resume Parser", "description": "Extracts skills from PDF resumes.", "category": "AI", "github_url": "https://github.com", "owner_id": 1, "file_path": None},
    {"id": 2, "title": "Portfolio Web App", "description": "React & FastAPI portfolio template.", "category": "Web", "github_url": "https://github.com", "owner_id": 1, "file_path": None}
]

def list_projects(db, category=None):
    if category:
        return [p for p in dummy_projects if category.lower() in p["category"].lower()]
    return dummy_projects

def recommend_projects(db, user):
    return dummy_projects[:1]

def create_project_with_file(db, project_data, user_id):
    new_proj = {"id": len(dummy_projects) + 1, "owner_id": user_id, **project_data}
    dummy_projects.append(new_proj)
    return new_proj
""",

    "workthree/backend/services/scholarship_service.py": """dummy_scholarships = [
    {"id": 1, "title": "Tech Future Scholarship", "organization": "Tech Corp", "amount": 2500.0, "deadline": "2026-12-01", "category": "STEM", "eligibility": "GPA > 3.0"},
    {"id": 2, "title": "Global Innovators Grant", "organization": "Innovate Inc", "amount": 5000.0, "deadline": "2026-11-15", "category": "AI", "eligibility": "Undergraduate"}
]

def list_scholarships(db, category=None):
    return dummy_scholarships

def recommend_scholarships(db, user):
    return dummy_scholarships[:1]

def create_scholarship(db, scholarship_data):
    new_s = {"id": len(dummy_scholarships) + 1, **scholarship_data.dict()}
    dummy_scholarships.append(new_s)
    return new_s
""",

    "workthree/backend/routers/projects.py": """from fastapi import APIRouter, UploadFile, File, Form
from typing import List
import os, shutil
from schemas import ProjectResponse
from services.project_service import create_project_with_file, list_projects, recommend_projects

router = APIRouter(prefix="/projects", tags=["Projects"])
UPLOAD_DIR = "uploads/projects"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[ProjectResponse])
def get_projects(category: str = None):
    return list_projects(None, category)

@router.get("/recommend", response_model=List[ProjectResponse])
def get_recommended_projects():
    return recommend_projects(None, None)

@router.post("/upload", response_model=ProjectResponse)
def add_project_with_file(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    github_url: str = Form(None),
    file: UploadFile = File(None)
):
    file_path = None
    if file:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    project_data = {
        "title": title,
        "description": description,
        "category": category,
        "github_url": github_url,
        "file_path": file_path
    }
    return create_project_with_file(None, project_data, user_id=1)
""",

    "workthree/backend/routers/scholarships.py": """from fastapi import APIRouter
from typing import List
from schemas import ScholarshipCreate, ScholarshipResponse
from services.scholarship_service import create_scholarship, list_scholarships, recommend_scholarships

router = APIRouter(prefix="/scholarships", tags=["Scholarships"])

@router.get("/", response_model=List[ScholarshipResponse])
def get_scholarships(category: str = None):
    return list_scholarships(None, category)

@router.get("/recommend", response_model=List[ScholarshipResponse])
def get_recommended_scholarships():
    return recommend_scholarships(None, None)

@router.post("/", response_model=ScholarshipResponse)
def add_scholarship(scholarship: ScholarshipCreate):
    return create_scholarship(None, scholarship)
""",

    "workthree/backend/app.py": """from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import projects, scholarships

app = FastAPI(title="Work Three API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(scholarships.router)

@app.get("/")
def home():
    return {"status": "Backend running for Member 3"}
"""
}

# Create directories and files
for filepath, content in files.items():
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ Backend files created successfully inside workthree/backend!")