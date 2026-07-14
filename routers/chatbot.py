from fastapi import APIRouter
from pydantic import BaseModel
from services.chatbot_service import ask_ai

router = APIRouter(
    prefix="/chat",
    tags=["AI Chatbot"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/")
def chat(request: ChatRequest):

    return ask_ai(request.message)