from sqlalchemy.orm import Session
from models import ChatHistory

from llm import generate_response
from prompt_builder import (
    build_chat_prompt,
    build_study_plan_prompt,
    build_gpa_tips_prompt,
    build_quiz_prompt,
    build_explanation_prompt
)


def get_chat_reply(db: Session, user_id: int, message: str):
    prompt = build_chat_prompt(message)
    reply = generate_response(prompt)

    entry = ChatHistory(
        user_id=user_id,
        message=message,
        reply=reply
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)

    return {"reply": reply}


def generate_study_plan(request):
    prompt = build_study_plan_prompt(
        request.subject,
        request.goal,
        request.time_available
    )
    return {"study_plan": generate_response(prompt)}


def generate_gpa_tips(request):
    prompt = build_gpa_tips_prompt(
        request.current_gpa,
        request.target_gpa,
        request.subjects
    )
    return {"tips": generate_response(prompt)}


def generate_quiz(request):
    prompt = build_quiz_prompt(request.topic, request.num_questions)
    return {"questions": generate_response(prompt)}


def generate_explanation(request):
    prompt = build_explanation_prompt(request.topic)
    return {"explanation": generate_response(prompt)}


def get_user_chat_history(db: Session, user_id: int):
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.created_at.desc())
        .all()
    )