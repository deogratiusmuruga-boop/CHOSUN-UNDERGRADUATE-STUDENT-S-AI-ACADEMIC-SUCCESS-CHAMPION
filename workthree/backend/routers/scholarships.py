from fastapi import APIRouter, Depends
from typing import List
from schemas import ScholarshipCreate, ScholarshipResponse
from services.scholarship_service import create_scholarship, list_scholarships, recommend_scholarships
from auth import get_current_user

router = APIRouter(prefix="/scholarships", tags=["Scholarships"])

@router.get("/", response_model=List[ScholarshipResponse])
def get_scholarships(category: str = None, current_user=Depends(get_current_user)):
    return list_scholarships(None, category)

@router.get("/recommend", response_model=List[ScholarshipResponse])
def get_recommended_scholarships(current_user=Depends(get_current_user)):
    return recommend_scholarships(None, current_user)

@router.post("/", response_model=ScholarshipResponse)
def add_scholarship(scholarship: ScholarshipCreate, current_user=Depends(get_current_user)):
    return create_scholarship(None, scholarship)
