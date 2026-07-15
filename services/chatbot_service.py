from sqlalchemy.orm import Session
from models import ChatHistory

import chatbot_engine


def _get_history_as_messages(db: Session, user_id: int, limit: int = 10):
    rows = (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.created_at.desc())
        .limit(limit)
        .all()
    )
    rows = list(reversed(rows))  # oldest first

    messages = []
    for row in rows:
        messages.append({"role": "user", "content": row.message})
        messages.append({"role": "assistant", "content": row.reply})

    return messages


def get_chat_reply(db: Session, user_id: int, message: str):
    history = _get_history_as_messages(db, user_id)

    result = chatbot_engine.handle_message(message, history)

    if result["error"]:
        return {"reply": f"Sorry, something went wrong: {result['error']}"}

    reply = result["response"]

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
    message = (
        f"Create a study plan for {request.subject}. "
        f"Goal: {request.goal}. Time available: {request.time_available}."
    )
    result = chatbot_engine.handle_message(message)
    if result["error"]:
        return {"study_plan": f"Sorry, something went wrong: {result['error']}"}
    return {"study_plan": result["response"]}


def generate_gpa_tips(request):
    subjects_str = ", ".join(request.subjects)
    message = (
        f"My GPA is {request.current_gpa} and I want to reach "
        f"{request.target_gpa}. My subjects are {subjects_str}. "
        f"How can I improve my grade?"
    )
    result = chatbot_engine.handle_message(message)
    if result["error"]:
        return {"tips": f"Sorry, something went wrong: {result['error']}"}
    return {"tips": result["response"]}


def generate_quiz(request):
    message = f"Give me a quiz with {request.num_questions} questions about {request.topic}."
    result = chatbot_engine.handle_message(message)
    if result["error"]:
        return {"questions": f"Sorry, something went wrong: {result['error']}"}
    return {"questions": result["response"]}


def generate_explanation(request):
    message = f"Explain {request.topic}"
    result = chatbot_engine.handle_message(message)
    if result["error"]:
        return {"explanation": f"Sorry, something went wrong: {result['error']}"}
    return {"explanation": result["response"]}


def get_user_chat_history(db: Session, user_id: int):
    return (
        db.query(ChatHistory)
        .filter(ChatHistory.user_id == user_id)
        .order_by(ChatHistory.created_at.desc())
        .all()
    )