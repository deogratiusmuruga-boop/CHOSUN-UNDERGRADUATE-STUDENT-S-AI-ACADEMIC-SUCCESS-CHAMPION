from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import Resource

# MEMBER 2 - Academic Resources
# This file is shared by materials.py, pastpapers.py, and resources.py
# Each router just calls these functions with a different "type" value.


def save_resource(
    db: Session,
    title: str,
    type: str,
    course: str,
    year: str,
    filename: str,
    filepath: str,
    uploaded_by: int
):
    resource = Resource(
        title=title,
        type=type,
        course=course,
        year=year,
        filename=filename,
        filepath=filepath,
        uploaded_by=uploaded_by
    )

    db.add(resource)
    db.commit()
    db.refresh(resource)

    return resource


def list_resources_by_type(db: Session, type: str, course: str = None):
    query = db.query(Resource).filter(Resource.type == type)

    if course:
        query = query.filter(Resource.course == course)

    return query.order_by(Resource.uploaded_at.desc()).all()


def list_all_resources(db: Session):
    return db.query(Resource).order_by(Resource.uploaded_at.desc()).all()


def get_resource_by_id(db: Session, resource_id: int):
    resource = db.query(Resource).filter(Resource.id == resource_id).first()

    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")

    return resource