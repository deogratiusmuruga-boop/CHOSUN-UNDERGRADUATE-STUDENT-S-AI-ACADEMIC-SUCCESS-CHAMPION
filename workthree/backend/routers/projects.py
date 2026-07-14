from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import List
import os, shutil
from schemas import ProjectResponse
from services.project_service import create_project_with_file, list_projects, recommend_projects
from auth import get_current_user

router = APIRouter(prefix="/projects", tags=["Projects"])
UPLOAD_DIR = "uploads/projects"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[ProjectResponse])
def get_projects(category: str = None, current_user=Depends(get_current_user)):
    return list_projects(None, category)

@router.get("/recommend", response_model=List[ProjectResponse])
def get_recommended_projects(current_user=Depends(get_current_user)):
    return recommend_projects(None, current_user)

@router.post("/upload", response_model=ProjectResponse)
def add_project_with_file(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    github_url: str = Form(None),
    file: UploadFile = File(None),
    current_user=Depends(get_current_user)
):
    file_path = None
    if file:
        file_path = os.path.join(UPLOAD_DIR, f"{current_user.id}_{file.filename}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

    project_data = {
        "title": title,
        "description": description,
        "category": category,
        "github_url": github_url,
        "file_path": file_path
    }
    return create_project_with_file(None, project_data, user_id=current_user.id)
