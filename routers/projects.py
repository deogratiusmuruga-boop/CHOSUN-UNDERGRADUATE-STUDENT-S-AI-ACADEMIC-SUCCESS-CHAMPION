from fastapi import APIRouter

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.get("/")
def projects():

    return [
        {
            "title": "AI Attendance System",
            "difficulty": "Intermediate"
        },
        {
            "title": "Student Recommendation System",
            "difficulty": "Advanced"
        }
    ]