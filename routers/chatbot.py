from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
from schemas import (
    ChatRequest,
    ChatResponse,
    StudyPlanRequest,
    GPATipsRequest,
    QuizRequest,
    ExplainRequest,
    ChatHistoryResponse
)
from services.chatbot_service import (
    get_chat_reply,
    generate_study_plan,
    generate_gpa_tips,
    generate_quiz,
    generate_explanation,
    get_user_chat_history
)

router = APIRouter(
    prefix="/chat",
    tags=["AI Chatbot"]
)


@router.post("/", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # MEMBER 1: real LLM logic lives in chatbot_service.py, not here
    return get_chat_reply(db, current_user.id, request.message)


@router.post("/study-plan")
def study_plan(
    request: StudyPlanRequest,
    current_user=Depends(get_current_user)
):
    return generate_study_plan(request)


@router.post("/gpa-tips")
def gpa_tips(
    request: GPATipsRequest,
    current_user=Depends(get_current_user)
):
    return generate_gpa_tips(request)


@router.post("/quiz")
def quiz(
    request: QuizRequest,
    current_user=Depends(get_current_user)
):
    return generate_quiz(request)


@router.post("/explain")
def explain(
    request: ExplainRequest,
    current_user=Depends(get_current_user)
):
    return generate_explanation(request)


@router.get("/history", response_model=list[ChatHistoryResponse])
def chat_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_user_chat_history(db, current_user.id)