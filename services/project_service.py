from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Project

# MEMBER 3 - Projects
# Replace recommend_projects() with real logic later
# (e.g. matching by student interests/skills)


def create_project(db: Session, data, added_by: int):
    project = Project(
        title=data.title,
        description=data.description,
        category=data.category,
        link=data.link,
        added_by=added_by
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def list_projects(db: Session, category: str = None):
    query = db.query(Project)

    if category:
        query = query.filter(Project.category == category)

    return query.order_by(Project.created_at.desc()).all()


def get_project_by_id(db: Session, project_id: int):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


def recommend_projects(db: Session, current_user):
    # MEMBER 3: replace with real logic based on user's interests
    return db.query(Project).order_by(Project.created_at.desc()).limit(5).all()