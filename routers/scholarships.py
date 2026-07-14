from fastapi import APIRouter

router = APIRouter(
    prefix="/scholarships",
    tags=["Scholarships"]
)


@router.get("/")
def scholarships():

    return [
        {
            "title": "Google Scholarship",
            "deadline": "2026-09-15"
        },
        {
            "title": "Government Scholarship",
            "deadline": "2026-10-01"
        }
    ]