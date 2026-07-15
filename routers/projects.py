from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
from schemas import ProjectCreate, ProjectResponse
from services.project_service import (
    create_project,
    list_projects,
    get_project_by_id,
    recommend_projects
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("/", response_model=ProjectResponse)
def add_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_project(db, project, current_user.id)


@router.get("/", response_model=list[ProjectResponse])
def get_projects(
    category: str = None,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return list_projects(db, category)


@router.get("/recommend", response_model=list[ProjectResponse])
def get_recommended_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # MEMBER 3: replace with real recommendation logic
    return recommend_projects(db, current_user)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_project_by_id(db, project_id)