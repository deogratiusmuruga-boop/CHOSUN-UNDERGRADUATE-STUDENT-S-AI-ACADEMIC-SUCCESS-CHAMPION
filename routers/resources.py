from fastapi import APIRouter

router = APIRouter(
    prefix="/resources",
    tags=["Academic Resources"]
)


@router.get("/")
def get_resources():

    return [
        {
            "id": 1,
            "title": "Operating Systems Notes",
            "course": "Operating Systems"
        },
        {
            "id": 2,
            "title": "Database Revision",
            "course": "Database Systems"
        }
    ]